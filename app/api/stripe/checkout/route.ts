import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

function siteUrl(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  const host = req.headers.get("host") ?? "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { email, priceId } = body;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Ogiltig e-postadress." }, { status: 400 });
  }

  const priceMap: Record<string, string | undefined> = {
    starter: process.env.STRIPE_PRICE_ID_STARTER,
    growth:  process.env.STRIPE_PRICE_ID_GROWTH,
    pro:     process.env.STRIPE_PRICE_ID_PRO,
  };

  const resolvedPriceId =
    (typeof priceId === "string" && priceMap[priceId.toLowerCase()]) ||
    priceId ||
    process.env.STRIPE_PRICE_ID;

  if (!resolvedPriceId || resolvedPriceId.startsWith("price_") === false) {
    return NextResponse.json({ error: "Ogiltigt eller saknat pris-ID." }, { status: 500 });
  }

  const base = siteUrl(req);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: resolvedPriceId, quantity: 1 }],
      success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/#tjanster`,
      metadata: { email },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Okänt fel från Stripe.";
    console.error("Stripe checkout error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
