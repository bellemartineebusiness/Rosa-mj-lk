import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Ej tillgänglig i produktion." }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (!body?.company_name) {
    return NextResponse.json({ error: "company_name krävs." }, { status: 400 });
  }

  const db = createServiceClient();
  const devEmail = "dev@bellemartinee.se";

  try {
    // Hitta eller skapa dev-kund
    let customerId: string;
    const { data: existing } = await db
      .from("customers")
      .select("id")
      .eq("email", devEmail)
      .single();

    if (existing) {
      customerId = existing.id;
    } else {
      const { data: created, error } = await db
        .from("customers")
        .insert({ email: devEmail, subscription_status: "active" })
        .select("id")
        .single();
      if (error || !created) throw new Error(error?.message ?? "Kunde inte skapa kund.");
      customerId = created.id;
    }

    // Sätt alltid subscription_status till active för dev
    await db
      .from("customers")
      .update({ subscription_status: "active" })
      .eq("id", customerId);

    // Upserta bot_settings
    await db.from("bot_settings").upsert({
      customer_id: customerId,
      company_name: body.company_name.trim(),
      opening_hours: body.opening_hours?.trim() ?? "",
      prices: body.prices?.trim() ?? "",
      phone: body.phone?.trim() ?? "",
      address: body.address?.trim() ?? "",
      system_prompt: body.system_prompt?.trim() ?? "",
      tone: body.tone ?? "friendly",
    }, { onConflict: "customer_id" });

    // Ersätt knowledge_base
    await db.from("knowledge_base").delete().eq("customer_id", customerId);
    const entries: { customer_id: string; title: string; content: string }[] = [];
    if (body.opening_hours?.trim()) entries.push({ customer_id: customerId, title: "Öppettider", content: body.opening_hours.trim() });
    if (body.prices?.trim()) entries.push({ customer_id: customerId, title: "Priser", content: body.prices.trim() });
    if (body.phone?.trim()) entries.push({ customer_id: customerId, title: "Telefon", content: body.phone.trim() });
    if (body.address?.trim()) entries.push({ customer_id: customerId, title: "Adress", content: body.address.trim() });
    if (entries.length > 0) await db.from("knowledge_base").insert(entries);

    return NextResponse.json({ customerId });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("dev-setup error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
