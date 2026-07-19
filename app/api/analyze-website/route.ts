import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { checkRateLimit } from "@/lib/rateLimit";

function getIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? req.headers.get("x-real-ip") ?? "unknown";
}

const SUBPAGES = [
  "", // startsidan
  "/om-oss", "/about", "/about-us",
  "/tjanster", "/services", "/behandlingar",
  "/priser", "/pricing", "/pris",
  "/kontakt", "/contact",
  "/faq", "/vanliga-fragor",
  "/produkter", "/products",
];

async function fetchPage(url: string): Promise<string> {
  try {
    const res = await fetch(`https://r.jina.ai/${url}`, {
      headers: { Accept: "text/plain", "X-Return-Format": "text" },
      signal: AbortSignal.timeout(12000),
    });
    if (!res.ok) return "";
    const text = await res.text();
    return text.slice(0, 6000);
  } catch {
    return "";
  }
}

export async function POST(req: NextRequest) {
  const ipLimit = await checkRateLimit(getIp(req));
  if (!ipLimit.allowed) return NextResponse.json({ error: "För många förfrågningar. Försök igen senare." }, { status: 429 });

  const { url } = await req.json();
  if (!url) return NextResponse.json({ error: "URL saknas" }, { status: 400 });

  const base = url.replace(/\/$/, "");

  const pages = await Promise.all(
    SUBPAGES.map((path) => fetchPage(base + path))
  );

  const combined = pages
    .filter((p) => p.length > 100)
    .map((p, i) => `### ${SUBPAGES[i] || "Startsida"}\n${p}`)
    .join("\n\n---\n\n");

  if (!combined) {
    return NextResponse.json({ error: "Kunde inte hämta webbplatsen" }, { status: 400 });
  }

  const truncated = combined.slice(0, 30000);

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const completion = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 4000,
    temperature: 0,
    messages: [
      {
        role: "user",
        content: `Du är ett precist extraktionsverktyg. Din enda uppgift är att kopiera och strukturera information som redan finns i webbplatstexten nedan. Du skapar INGENTING nytt.

HÅRD REGEL — NOLL HALLUCINERINGAR:
- Skriv ENBART information som finns ordagrant eller direkt framgår av webbplatstexten nedan.
- Hitta ALDRIG på priser, tjänster, öppettider, namn, telefonnummer, adresser eller andra fakta.
- Om ett pris inte nämns i texten → skriv inget pris.
- Om en tjänst inte beskrivs i texten → ta inte med den.
- Om du är minsta osäker på om något verkligen står i texten → utelämna det helt.
- Du får INTE dra slutsatser, fylla i luckor eller anta något som inte explicit står i texten.

Svara BARA med giltig JSON utan annan text i detta exakta format:
{
  "sections": [
    { "title": "Rubriken", "content": "Innehållet exakt som det framgår av texten..." }
  ],
  "structured": {
    "company_name": "Företagsnamnet eller null",
    "opening_hours": "Öppettider rad för rad, t.ex. Måndag-fredag: 09:00-18:00\\nLördag: 10:00-16:00\\nSöndag: Stängt, eller null om ej hittat",
    "prices": "Prislista rad för rad exakt som i texten, eller null om ej hittat",
    "phone": "Telefonnummer eller null",
    "address": "Adress eller null"
  }
}

Extrahera 4–8 sektioner. Fokusera på: tjänster, priser, öppettider, kontaktuppgifter, om företaget, vanliga frågor, bokningsinfo.
Utelämna navigering, cookietext, sidfot-boilerplate och teknisk kod.
Slå ihop information om samma ämne från olika sidor.
Skriv som löpande text, inte punktlistor.

Webbplatstext att extrahera från:
${truncated}`,
      },
    ],
  });

  const raw = completion.content[0].type === "text" ? completion.content[0].text : "";
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) return NextResponse.json({ error: "Kunde inte tolka svaret från AI" }, { status: 500 });

  try {
    const parsed = JSON.parse(match[0]);
    return NextResponse.json({
      sections: parsed.sections ?? [],
      structured: parsed.structured ?? {},
    });
  } catch {
    return NextResponse.json({ error: "Ogiltigt JSON från AI" }, { status: 500 });
  }
}
