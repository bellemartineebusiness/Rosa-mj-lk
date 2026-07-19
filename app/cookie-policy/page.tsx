import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie-policy – Belle Martineé",
  robots: { index: true },
};

export default function CookiePolicy() {
  const updated = "12 juni 2026";

  return (
    <main className="min-h-screen bg-secondary py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-[#8e8e93] hover:text-secondary-foreground transition-colors mb-8 block">
          ← Tillbaka till startsidan
        </Link>

        <h1 className="text-4xl font-semibold text-secondary-foreground tracking-tight mb-2">Cookie-policy</h1>
        <p className="text-sm text-[#8e8e93] mb-10">Senast uppdaterad: {updated}</p>

        <div className="flex flex-col gap-8 text-secondary-foreground">

          <section>
            <h2 className="text-base font-semibold mb-2">Vad är cookies?</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Cookies är små textfiler som sparas i din webbläsare när du besöker en webbplats. De används för att webbplatsen ska fungera korrekt och för att förbättra din upplevelse.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">Vilka cookies använder vi?</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm mb-4">
              Vi använder endast tekniskt nödvändiga cookies. Vi använder inga spårningscookies, reklamcookies eller analysverktyg som Google Analytics.
            </p>
            <div className="bg-white rounded-xl border border-[#e8e8e8] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary border-b border-[#e8e8e8]">
                    <th className="text-left px-4 py-3 text-xs font-normal uppercase tracking-[0.15em] text-[#8e8e93]">Cookie</th>
                    <th className="text-left px-4 py-3 text-xs font-normal uppercase tracking-[0.15em] text-[#8e8e93]">Syfte</th>
                    <th className="text-left px-4 py-3 text-xs font-normal uppercase tracking-[0.15em] text-[#8e8e93]">Varaktighet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#f0f0f0]">
                    <td className="px-4 py-3 text-secondary-foreground font-mono text-xs">__session</td>
                    <td className="px-4 py-3 text-[#6e6e73] text-sm">Håller dig inloggad i dashboarden</td>
                    <td className="px-4 py-3 text-[#6e6e73] text-sm">Session</td>
                  </tr>
                  <tr className="border-t border-[#f0f0f0]">
                    <td className="px-4 py-3 text-secondary-foreground font-mono text-xs">__stripe_mid</td>
                    <td className="px-4 py-3 text-[#6e6e73] text-sm">Betalningshantering via Stripe (bedrägeriförebyggande)</td>
                    <td className="px-4 py-3 text-[#6e6e73] text-sm">1 år</td>
                  </tr>
                  <tr className="border-t border-[#f0f0f0]">
                    <td className="px-4 py-3 text-secondary-foreground font-mono text-xs">__stripe_sid</td>
                    <td className="px-4 py-3 text-[#6e6e73] text-sm">Sessionscookie för Stripe-betalning</td>
                    <td className="px-4 py-3 text-[#6e6e73] text-sm">30 min</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">Tredjepartscookies</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Stripe sätter egna cookies vid betalning. Du kan läsa mer om dessa i{" "}
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#E8440A] hover:underline">
                Stripes integritetspolicy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">Kan jag stänga av cookies?</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Du kan blockera cookies i din webbläsare, men notera att vissa delar av webbplatsen (som inloggning i dashboarden och betalning) inte fungerar utan tekniska cookies.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">Kontakt</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Frågor? Hör av dig på{" "}
              <a href="mailto:info@bellemartinee.se" className="text-[#E8440A] hover:underline">
                info@bellemartinee.se
              </a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
