import { redirect } from "next/navigation";
import { createServiceClient } from "@/lib/supabase";
import { sendWelcomeEmail } from "@/lib/sendWelcomeEmail";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  let customerId: string | null = null;

  if (session_id) {
    const { stripe } = await import("@/lib/stripe");
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const email = session.customer_email ?? "";
    const stripeCustomerId = session.customer as string;

    if (email) {
      const db = createServiceClient();

      // Försök hitta befintlig kund
      const { data: existing } = await db
        .from("customers")
        .select("id, login_token")
        .eq("email", email)
        .single();

      if (existing) {
        customerId = existing.id;
        await sendWelcomeEmail(email, existing.id, existing.login_token ?? undefined).catch(console.error);
        if (existing.login_token) {
          redirect(`/dashboard/${existing.id}?token=${existing.login_token}`);
        }
      } else {
        // Webhook hann inte — skapa kunden direkt
        const { data: created } = await db
          .from("customers")
          .insert({ email, stripe_customer_id: stripeCustomerId, subscription_status: "active" })
          .select("id, login_token")
          .single();

        if (created) {
          await db.from("bot_settings").insert({ customer_id: created.id });
          customerId = created.id;
          await sendWelcomeEmail(email, created.id, created.login_token ?? undefined).catch(console.error);
          if (created.login_token) {
            redirect(`/dashboard/${created.id}?token=${created.login_token}`);
          }
        }
      }
    }
  }

  if (customerId) {
    redirect(`/dashboard/${customerId}`);
  }

  // Fallback om redirect inte skedde
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-6">
        <div className="w-12 h-12 rounded-full bg-[#E8440A]/10 flex items-center justify-center">
          <span className="text-2xl">⏳</span>
        </div>
        <h1 className="text-2xl font-semibold text-white tracking-tight">Din AI aktiveras</h1>
        <p className="text-white/60 text-sm leading-relaxed">
          Din betalning är bekräftad. Aktiveringen tar normalt under 1 minut — du får ett mail till din inkorg med din personliga länk.
        </p>
        <p className="text-white/40 text-xs">
          Om inget händer inom 2 minuter, använd länken nedan för att få din åtkomstlänk igen.
        </p>
        <a
          href="/resend-link"
          className="mt-2 px-6 py-3 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
        >
          Skicka länken igen →
        </a>
        <p className="text-white/30 text-xs">
          Eller kontakta{" "}
          <a href="mailto:support@bellemartinee.se" className="text-white/50 hover:text-white transition-colors">
            support@bellemartinee.se
          </a>
        </p>
      </div>
    </div>
  );
}
