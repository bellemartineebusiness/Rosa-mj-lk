import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function POST() {
  const db = createServiceClient();
  const email = "test@dev.local";

  // Hämta eller skapa testkund
  let customerId: string | null = null;

  const { data: existing } = await db
    .from("customers")
    .select("id")
    .eq("email", email)
    .single();

  if (existing) {
    customerId = existing.id;
    // Se till att subscription_status är active
    await db.from("customers").update({ subscription_status: "active" }).eq("id", customerId);
  } else {
    const { data: created, error } = await db
      .from("customers")
      .insert({ email, subscription_status: "active" })
      .select("id")
      .single();

    if (error || !created) {
      return NextResponse.json({ error: error?.message ?? "Kunde inte skapa testkund." }, { status: 500 });
    }
    customerId = created.id;
  }

  // Skapa bot_settings om det saknas
  const { data: existingSettings } = await db
    .from("bot_settings")
    .select("customer_id")
    .eq("customer_id", customerId)
    .single();

  if (!existingSettings) {
    await db.from("bot_settings").insert({
      customer_id: customerId,
      company_name: "Testföretaget",
      system_prompt: "Du är en hjälpsam kundtjänstassistent för Testföretaget. Svara på svenska.",
    });
  }

  return NextResponse.json({ customerId });
}
