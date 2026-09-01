import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";
import { sendWelcomeEmail } from "@/lib/sendWelcomeEmail";
import { sendOwnerNotification } from "@/lib/sendOwnerNotification";
import { logger } from "@/lib/logger";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Stripe-signature saknas." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Ogiltig Stripe-signatur." }, { status: 400 });
  }

  logger.info("webhook_received", { type: event.type });

  const db = createServiceClient();

  switch (event.type) {

    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email   = session.customer_email ?? session.metadata?.email ?? "";
      const stripeCustomerId = session.customer as string;
      if (!email) break;

      const { data: existing } = await db
        .from("customers")
        .select("id")
        .eq("email", email)
        .single();

      if (existing) {
        await db
          .from("customers")
          .update({ stripe_customer_id: stripeCustomerId, subscription_status: "active" })
          .eq("id", existing.id);
        logger.info("bot_created", { event: "reactivated", customerId: existing.id, email });
        const { data: reactivated } = await db.from("customers").select("login_token").eq("id", existing.id).single();
        sendWelcomeEmail(email, existing.id, reactivated?.login_token ?? undefined).catch((e) =>
          logger.error("welcome_email_failed", { error: String(e) })
        );
        sendOwnerNotification({ customerEmail: email, customerId: existing.id, loginToken: reactivated?.login_token ?? undefined, isReactivation: true }).catch((e) =>
          logger.error("owner_notification_failed", { error: String(e) })
        );
      } else {
        const { data: created } = await db
          .from("customers")
          .insert({ email, stripe_customer_id: stripeCustomerId, subscription_status: "active" })
          .select("id, login_token")
          .single();

        if (created) {
          await db.from("bot_settings").insert({ customer_id: created.id });
          logger.info("bot_created", { event: "new", customerId: created.id, email });
          sendWelcomeEmail(email, created.id, created.login_token ?? undefined).catch((e) =>
            logger.error("welcome_email_failed", { error: String(e) })
          );
          sendOwnerNotification({ customerEmail: email, customerId: created.id, loginToken: created.login_token ?? undefined, isReactivation: false }).catch((e) =>
            logger.error("owner_notification_failed", { error: String(e) })
          );
        }
      }
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      await db
        .from("customers")
        .update({ subscription_status: "active" })
        .eq("stripe_customer_id", invoice.customer as string);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      await db
        .from("customers")
        .update({ subscription_status: "past_due" })
        .eq("stripe_customer_id", invoice.customer as string);
      logger.warn("payment_failed", { stripeCustomerId: invoice.customer });
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await db
        .from("customers")
        .update({ subscription_status: "inactive" })
        .eq("stripe_customer_id", sub.customer as string);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
