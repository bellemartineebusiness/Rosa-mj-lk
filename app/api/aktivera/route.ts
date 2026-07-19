import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const pin = req.headers.get("x-admin-pin");
  if (!pin || pin !== process.env.ADMIN_PIN) {
    return NextResponse.json({ error: "Ej behörig." }, { status: 401 });
  }

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
    const { data: withToken } = await db.from("customers").select("login_token").eq("id", existing.id).single();
    return NextResponse.json({ customerId: existing.id, loginToken: withToken?.login_token ?? null });
  }

  const { data: created, error } = await db
    .from("customers")
    .insert({ email, subscription_status: "active" })
    .select("id, login_token")
    .single();

  if (error || !created) {
    return NextResponse.json({ error: error?.message ?? "Kunde inte skapa konto." }, { status: 500 });
  }

  await db.from("bot_settings").insert({ customer_id: created.id });

  return NextResponse.json({ customerId: created.id, loginToken: created.login_token ?? null });
}
