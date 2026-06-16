import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { sendWelcomeEmail } from "@/lib/sendWelcomeEmail";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Ange en giltig e-postadress." }, { status: 400 });
  }

  const db = createServiceClient();
  const { data: customer } = await db
    .from("customers")
    .select("id, subscription_status")
    .eq("email", email)
    .single();

  if (!customer) {
    return NextResponse.json({
      ok: true,
      message: "Om vi hittar ett konto skickar vi länken inom 1 minut.",
    });
  }

  if (customer.subscription_status !== "active") {
    return NextResponse.json({ error: "Ingen aktiv prenumeration hittades för denna e-post." }, { status: 403 });
  }

  try {
    await sendWelcomeEmail(email, customer.id);
    logger.info("resend_link_sent", { customerId: customer.id, email });
  } catch (err) {
    logger.error("resend_link_failed", { error: String(err), email });
    return NextResponse.json({ error: "Kunde inte skicka mailet. Försök igen eller kontakta support." }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    message: "Din länk har skickats! Kolla din inkorg (och skräppost).",
  });
}
