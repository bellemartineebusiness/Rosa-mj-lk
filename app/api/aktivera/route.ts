import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = body?.email?.trim();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Ogiltig e-postadress." }, { status: 400 });
  }

  const db = createServiceClient();

  // Hitta befintlig kund eller skapa ny
  const { data: existing } = await db
    .from("customers")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    await db.from("customers").update({ subscription_status: "active" }).eq("id", existing.id);
    return NextResponse.json({ customerId: existing.id });
  }

  const { data: created, error } = await db
    .from("customers")
    .insert({ email, subscription_status: "active" })
    .select("id")
    .single();

  if (error || !created) {
    return NextResponse.json({ error: error?.message ?? "Kunde inte skapa konto." }, { status: 500 });
  }

  await db.from("bot_settings").insert({ customer_id: created.id });

  return NextResponse.json({ customerId: created.id });
}
