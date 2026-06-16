import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const customerId = req.nextUrl.searchParams.get("customerId");
  if (!customerId) return NextResponse.json({ error: "customerId saknas." }, { status: 400 });

  const db = createServiceClient();

  const { data: customer } = await db
    .from("customers")
    .select("id, email, subscription_status, messages_used_this_month")
    .eq("id", customerId)
    .single();

  if (!customer) return NextResponse.json({ error: "Kunden hittades inte." }, { status: 404 });

  const { data: settings } = await db
    .from("bot_settings")
    .select("*")
    .eq("customer_id", customerId)
    .single();

  const { data: kb } = await db
    .from("knowledge_base")
    .select("id, title, content")
    .eq("customer_id", customerId)
    .order("created_at");

  const { data: leads } = await db
    .from("leads")
    .select("id, action, name, email, phone, date, time, status, created_at")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false })
    .limit(50);

  return NextResponse.json({ customer, settings: settings ?? null, knowledge_base: kb ?? [], leads: leads ?? [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.customerId) return NextResponse.json({ error: "customerId saknas." }, { status: 400 });

  const db = createServiceClient();

  // Verifiera att kunden faktiskt existerar
  const { data: customer } = await db
    .from("customers")
    .select("id")
    .eq("id", body.customerId)
    .single();

  if (!customer) return NextResponse.json({ error: "Kunden hittades inte." }, { status: 404 });

  const { customerId, knowledge_base: kb, ...settingsFields } = body;

  // Upsert bot_settings
  await db.from("bot_settings").upsert(
    { customer_id: customerId, ...settingsFields, updated_at: new Date().toISOString() },
    { onConflict: "customer_id" },
  );

  // Ersätt knowledge_base om den skickas med
  if (Array.isArray(kb)) {
    await db.from("knowledge_base").delete().eq("customer_id", customerId);
    if (kb.length > 0) {
      await db.from("knowledge_base").insert(
        kb
          .filter((e: { title?: string; content?: string }) => e.title && e.content)
          .map((e: { title: string; content: string }) => ({
            customer_id: customerId,
            title: e.title.trim(),
            content: e.content.trim(),
          })),
      );
    }
  }

  return NextResponse.json({ ok: true });
}
