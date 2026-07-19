import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";
import { buildSystemPrompt } from "@/lib/buildSystemPrompt";
import { createServiceClient } from "@/lib/supabase";
import { getSlotsForDate, formatDate } from "@/lib/availability";

const DEMO_CUSTOMER_ID = "0fb2136e-af25-4534-ba57-db34db4dc32a";

const COMPLEX_SIGNALS = [
  "boka", "bokning", "boka tid", "boka in", "ny tid", "lediga tider",
  "avboka", "avbokning", "omboka", "ombokning", "ändra tid", "flytta",
  "avbryta", "annullera",
  "passar", "tveksam", "osäker", "vet inte", "jämför", "varför ska",
  "är det värt", "värt det", "fungerar det för", "mitt företag", "min bransch",
  "passa mig", "passa oss", "behöver jag", "skillnad", "istället för",
  "bättre än", "jämfört med", "övertygad", "rätt val", "tvekar",
  "hjälp mig förstå", "hur fungerar", "vad menas", "kan ni",
];

function selectModel(messages: { role: string; content: string }[]): string {
  const last = [...messages].reverse().find((m) => m.role === "user")?.content?.toLowerCase() ?? "";
  return COMPLEX_SIGNALS.some((s) => last.includes(s))
    ? "claude-sonnet-4-6"
    : "claude-haiku-4-5-20251001";
}

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 10;

function getIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  const ipLimit = await checkRateLimit(getIp(req));
  if (!ipLimit.allowed) {
    return NextResponse.json({ error: ipLimit.reason }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.messages)) {
    return NextResponse.json({ error: "messages krävs." }, { status: 400 });
  }

  const messages = (body.messages as { role: string; content: string }[])
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
      content: String(m.content ?? "").slice(0, MAX_MESSAGE_LENGTH),
    }));

  let systemPrompt: string;
  try {
    systemPrompt = await buildSystemPrompt(DEMO_CUSTOMER_ID);
  } catch {
    systemPrompt = "Du är en hjälpsam kundtjänstassistent. Svara på svenska.";
  }

  // Injicera lediga tider om ett datum nämns
  try {
    const db = createServiceClient();
    const { data: settings } = await db
      .from("bot_settings")
      .select("opening_hours, closed_dates")
      .eq("customer_id", DEMO_CUSTOMER_ID)
      .single();

    if (settings?.opening_hours) {
      const allText = messages.map((m) => m.content).join(" ");
      const dateMatch = allText.match(/\d{4}-\d{2}-\d{2}/);
      if (dateMatch) {
        const dateStr = dateMatch[0];
        const allSlots = getSlotsForDate(settings.opening_hours, dateStr, settings.closed_dates ?? undefined);
        if (allSlots.length > 0) {
          const { data: bookedLeads } = await db
            .from("leads")
            .select("time")
            .eq("customer_id", DEMO_CUSTOMER_ID)
            .eq("date", dateStr)
            .eq("status", "active");
          const bookedTimes = new Set((bookedLeads ?? []).map((l) => l.time));
          const freeSlots = allSlots.filter((s) => !bookedTimes.has(s));
          const label = formatDate(dateStr);
          systemPrompt += freeSlots.length > 0
            ? `\n\nLEDIGA TIDER ${label.toUpperCase()}: ${freeSlots.join(", ")}. Använd BARA dessa tider när du föreslår eller bekräftar bokningar den dagen.`
            : allSlots.length > 0
              ? `\n\nINGA LEDIGA TIDER ${label.toUpperCase()}: Alla tider är fullbokade. Föreslå ett annat datum.`
              : `\n\nSTÄNGT ${label.toUpperCase()}: Vi är stängda den dagen. Informera kunden och föreslå ett annat datum.`;
        }
      }
    }
  } catch { /* ignorera om tillgänglighetsinjektion misslyckas */ }

  try {
    const model = selectModel(messages);
    const response = await new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY }).messages.create({
      model,
      max_tokens: 512,
      system: systemPrompt,
      messages,
    }, { timeout: 25000 });

    const raw = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");

    let reply = raw;
    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        reply = parsed.message ?? raw;
      }
    } catch { /* använd råtext om JSON-parsning misslyckas */ }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Demo chat error:", err);
    return NextResponse.json({ error: "Kunde inte nå AI:n. Försök igen." }, { status: 500 });
  }
}
