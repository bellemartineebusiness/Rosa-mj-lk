import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { customerId } = await req.json().catch(() => ({}));
  if (!customerId) return NextResponse.json({ error: "customerId saknas." }, { status: 400 });

  const db = createServiceClient();
  const { data: customer } = await db
    .from("customers")
    .select("stripe_customer_id")
    .eq("id", customerId)
    .single();

  if (!customer?.stripe_customer_id) {
    return NextResponse.json({ error: "Ingen Stripe-kund hittades." }, { status: 404 });
  }

  const returnUrl = `${req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL}/dashboard/${customerId}`;

  const session = await stripe.billingPortal.sessions.create({
    customer: customer.stripe_customer_id,
    return_url: returnUrl,
  });

  return NextResponse.json({ url: session.url });
}
