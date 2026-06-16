import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

// Enkel testroute — ingen Supabase eller Prisma, bara Claude direkt
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Ej tillgänglig i produktion." }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.messages) {
    return NextResponse.json({ error: "Ogiltigt format." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const messages = body.messages
    .slice(-10)
    .map((m: { role: string; content: string }) => ({
      role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
      content: String(m.content ?? "").slice(0, 500),
    }));

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      system: "Du är en testbot för Belle Martinée. Svara på svenska och var hjälpsam. Berätta att du är en testbot om någon frågar.",
      messages,
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Kunde inte nå AI:n." }, { status: 500 });
  }
}
