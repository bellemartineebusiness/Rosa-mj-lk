import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { sendWelcomeEmail } from "@/lib/sendWelcomeEmail";

function checkPin(req: NextRequest) {
  const pin = req.headers.get("x-admin-pin");
  return pin === process.env.ADMIN_PIN;
}

export async function GET(req: NextRequest) {
  if (!checkPin(req)) return NextResponse.json({ error: "Ej behörig." }, { status: 401 });

  const db = createServiceClient();
  const { data: customers } = await db
    .from("customers")
    .select("id, email, subscription_status, messages_used_this_month, created_at")
    .order("created_at", { ascending: false });

  const list = customers ?? [];
  const stats = {
    total:    list.length,
    active:   list.filter((c) => c.subscription_status === "active").length,
    inactive: list.filter((c) => c.subscription_status === "inactive").length,
    past_due: list.filter((c) => c.subscription_status === "past_due").length,
    messages: list.reduce((sum, c) => sum + (c.messages_used_this_month ?? 0), 0),
  };

  return NextResponse.json({ customers: list, stats });
}

export async function POST(req: NextRequest) {
  if (!checkPin(req)) return NextResponse.json({ error: "Ej behörig." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const { customerId, action } = body ?? {};
  if (!customerId || !action) return NextResponse.json({ error: "Ogiltiga parametrar." }, { status: 400 });

  const db = createServiceClient();

  if (action === "activate") {
    await db.from("customers").update({ subscription_status: "active" }).eq("id", customerId);
    return NextResponse.json({ ok: true });
  }

  if (action === "deactivate") {
    await db.from("customers").update({ subscription_status: "inactive" }).eq("id", customerId);
    return NextResponse.json({ ok: true });
  }

  if (action === "resend") {
    const { data: customer } = await db.from("customers").select("email").eq("id", customerId).single();
    if (!customer?.email) return NextResponse.json({ error: "Kunden saknar email." }, { status: 400 });
    await sendWelcomeEmail(customer.email, customerId);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Okänd action." }, { status: 400 });
}
