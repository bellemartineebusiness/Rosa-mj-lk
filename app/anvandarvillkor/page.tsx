import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Användarvillkor – Belle Martineé",
  robots: { index: true },
};

export default function Anvandarvillkor() {
  const updated = "12 juni 2026";

  return (
    <main className="min-h-screen bg-[#fdf8e8] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-[#700143] hover:underline mb-8 block">
          ← Tillbaka till startsidan
        </Link>

        <h1 className="text-4xl font-extrabold text-[#1a0010] mb-2">Användarvillkor</h1>
        <p className="text-sm text-[#7a4060] mb-10">Senast uppdaterad: {updated}</p>

        <div className="flex flex-col gap-8 text-[#1a0010]">

          <section>
            <h2 className="text-xl font-bold mb-2">1. Om tjänsten</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Belle Martineé (org.nr 061028-1818) tillhandahåller AI-drivna chattbottar som företag kan bädda in på sin webbplats. Tjänsten hanterar kundfrågor, samlar leads och tar emot bokningsförfrågningar automatiskt dygnet runt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">2. Vad tjänsten gör</h2>
            <p className="text-[#7a4060] leading-relaxed mb-2">Tjänsten inkluderar:</p>
            <ul className="list-disc list-inside text-[#7a4060] leading-relaxed space-y-1 ml-1">
              <li>En AI-chattbot konfigurerad för ditt företag</li>
              <li>Insamling av leads (namn, e-post, telefon, ärende)</li>
              <li>Mottagning av bokningsförfrågningar</li>
              <li>E-postnotiser till dig när nya leads eller bokningar inkommer</li>
              <li>Dashboard för att anpassa botens innehåll och ton</li>
              <li>Inbäddningskod för din webbplats</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">3. Vad tjänsten inte gör</h2>
            <p className="text-[#7a4060] leading-relaxed mb-2">Tjänsten garanterar inte:</p>
            <ul className="list-disc list-inside text-[#7a4060] leading-relaxed space-y-1 ml-1">
              <li>Att alla kundsvar är korrekta — AI kan göra misstag</li>
              <li>Automatisk bekräftelse av bokningar — det sker manuellt av dig</li>
              <li>100 % drifttid — vi strävar efter hög tillgänglighet men kan inte garantera det</li>
              <li>Att boten ersätter mänsklig kundtjänst i komplexa ärenden</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">4. Betalningsvillkor</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Tjänsten faktureras månadsvis i förskott via Stripe. Priset framgår vid köptillfället. Betalning sker med kort. Faktura skickas automatiskt till din registrerade e-postadress.
            </p>
            <p className="text-[#7a4060] leading-relaxed mt-2">
              Vid utebliven betalning pausas boten tills betalningen är genomförd. Abonnemanget förnyas automatiskt varje månad tills det sägs upp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">5. Uppsägning</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Du kan säga upp tjänsten när som helst utan bindningstid. Uppsägning sker direkt i din dashboard eller via e-post till <a href="mailto:support@bellemartinee.se" className="text-[#700143] hover:underline">support@bellemartinee.se</a>. Tjänsten fortsätter till slutet av innevarande betalningsperiod.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">6. Ångerrätt</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Som konsument har du 14 dagars ångerrätt från köpdatum. Du kan testa tjänsten och ändå begära full återbetalning inom 14 dagar om du inte är nöjd. Kontakta <a href="mailto:support@bellemartinee.se" className="text-[#700143] hover:underline">support@bellemartinee.se</a> för att begära återbetalning.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">7. Ditt ansvar</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Du ansvarar för att den information du lägger in i dashboarden (priser, öppettider, instruktioner) är korrekt. Du ansvarar även för att boten inte används för att sprida vilseledande, olaglig eller skadlig information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">8. Ansvarsbegränsning</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Belle Martineé ansvarar inte för indirekta skador, utebliven vinst eller följdskador som uppstår till följd av användning av tjänsten. Vårt totala ansvar är under alla omständigheter begränsat till det belopp du betalat för tjänsten under den senaste månaden.
            </p>
            <p className="text-[#7a4060] leading-relaxed mt-2">
              AI-genererade svar är automatiserade och kan innehålla fel. Du bör kontrollera viktig information innan den kommuniceras vidare till dina kunder.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">9. Personuppgifter</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Vi behandlar personuppgifter i enlighet med vår <Link href="/integritetspolicy" className="text-[#700143] hover:underline">integritetspolicy</Link>. Leads och bokningar som samlas via din bot lagras i vår databas och är tillgängliga för dig i dashboarden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">10. Ändringar</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Vi kan uppdatera dessa villkor. Vid väsentliga ändringar informeras du via e-post senast 14 dagar innan ändringen träder i kraft.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">11. Kontakt</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Belle Martineé · Org.nr 061028-1818 · Godkänd för F-skatt<br />
              <a href="mailto:support@bellemartinee.se" className="text-[#700143] hover:underline">support@bellemartinee.se</a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
