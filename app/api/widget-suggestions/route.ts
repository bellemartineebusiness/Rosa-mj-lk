import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createServiceClient } from "@/lib/supabase";
import { checkRateLimit } from "@/lib/rateLimit";

function getIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? req.headers.get("x-real-ip") ?? "unknown";
}

export async function GET(req: NextRequest) {
  const ipLimit = await checkRateLimit(getIp(req));
  if (!ipLimit.allowed) return NextResponse.json({ suggestions: [] });

  const customerId = req.nextUrl.searchParams.get("customerId");
  if (!customerId) return NextResponse.json({ suggestions: [] });

  const db = createServiceClient();
  const [{ data: settings }, { data: kb }] = await Promise.all([
    db.from("bot_settings").select("company_name").eq("customer_id", customerId).single(),
    db.from("knowledge_base").select("title, content").eq("customer_id", customerId).order("created_at"),
  ]);

  if (!kb || kb.length === 0) {
    return NextResponse.json({
      suggestions: ["Vad kan ni hjälpa mig med?", "Hur bokar jag en tid?", "Vad kostar det?"],
    });
  }

  const kbText = kb.map((k) => `## ${k.title}\n${k.content}`).join("\n\n").slice(0, 4000);
  const companyName = settings?.company_name || "företaget";

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const res = await anthropic.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    messages: [
      {
        role: "user",
        content: `Baserat på denna information om ${companyName}, generera 3 korta och konkreta frågor som en ny kund troligen vill fråga. Frågorna ska vara max 6 ord, naturliga och relevanta.

Svara BARA med en JSON-array, ingen annan text:
["Fråga 1?", "Fråga 2?", "Fråga 3?"]

Företagsinfo:
${kbText}`,
      },
    ],
  });

  const raw = res.content[0].type === "text" ? res.content[0].text : "";
  const match = raw.match(/\[[\s\S]*?\]/);
  if (!match) return NextResponse.json({ suggestions: ["Vad kan ni hjälpa mig med?", "Hur bokar jag en tid?", "Vad kostar det?"] });

  try {
    const suggestions = JSON.parse(match[0]);
    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: ["Vad kan ni hjälpa mig med?", "Hur bokar jag en tid?", "Vad kostar det?"] });
  }
}
