import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie-policy – Belle Martineé",
  robots: { index: true },
};

export default function CookiePolicy() {
  const updated = "12 juni 2026";

  return (
    <main className="min-h-screen bg-[#fdf8e8] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-[#700143] hover:underline mb-8 block">
          ← Tillbaka till startsidan
        </Link>

        <h1 className="text-4xl font-extrabold text-[#1a0010] mb-2">Cookie-policy</h1>
        <p className="text-sm text-[#7a4060] mb-10">Senast uppdaterad: {updated}</p>

        <div className="flex flex-col gap-8 text-[#1a0010]">

          <section>
            <h2 className="text-xl font-bold mb-2">Vad är cookies?</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Cookies är små textfiler som sparas i din webbläsare när du besöker en webbplats. De används för att webbplatsen ska fungera korrekt och för att förbättra din upplevelse.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">Vilka cookies använder vi?</h2>
            <p className="text-[#7a4060] leading-relaxed mb-4">
              Vi använder endast tekniskt nödvändiga cookies. Vi använder inga spårningscookies, reklamcookies eller analysverktyg som Google Analytics.
            </p>
            <div className="border border-[#e8d8c0] rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f5ead8]">
                    <th className="text-left px-4 py-3 text-[#700143] font-semibold">Cookie</th>
                    <th className="text-left px-4 py-3 text-[#700143] font-semibold">Syfte</th>
                    <th className="text-left px-4 py-3 text-[#700143] font-semibold">Varaktighet</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[#e8d8c0]">
                    <td className="px-4 py-3 text-[#1a0010] font-mono text-xs">__session</td>
                    <td className="px-4 py-3 text-[#7a4060]">Håller dig inloggad i dashboarden</td>
                    <td className="px-4 py-3 text-[#7a4060]">Session</td>
                  </tr>
                  <tr className="border-t border-[#e8d8c0]">
                    <td className="px-4 py-3 text-[#1a0010] font-mono text-xs">__stripe_mid</td>
                    <td className="px-4 py-3 text-[#7a4060]">Betalningshantering via Stripe (bedrägeriförebyggande)</td>
                    <td className="px-4 py-3 text-[#7a4060]">1 år</td>
                  </tr>
                  <tr className="border-t border-[#e8d8c0]">
                    <td className="px-4 py-3 text-[#1a0010] font-mono text-xs">__stripe_sid</td>
                    <td className="px-4 py-3 text-[#7a4060]">Sessionscookie för Stripe-betalning</td>
                    <td className="px-4 py-3 text-[#7a4060]">30 min</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">Tredjepartscookies</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Stripe sätter egna cookies vid betalning. Du kan läsa mer om dessa i{" "}
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#700143] hover:underline">
                Stripes integritetspolicy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">Kan jag stänga av cookies?</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Du kan blockera cookies i din webbläsare, men notera att vissa delar av webbplatsen (som inloggning i dashboarden och betalning) inte fungerar utan tekniska cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">Kontakt</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Frågor? Hör av dig på{" "}
              <a href="mailto:info@bellemartinee.se" className="text-[#700143] hover:underline">
                info@bellemartinee.se
              </a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
