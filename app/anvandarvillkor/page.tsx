import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Användarvillkor – Belle Martineé",
  robots: { index: true },
};

export default function Anvandarvillkor() {
  const updated = "12 juni 2026";

  return (
    <main className="min-h-screen bg-secondary py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-[#8e8e93] hover:text-secondary-foreground transition-colors mb-8 block">
          ← Tillbaka till startsidan
        </Link>

        <h1 className="text-4xl font-semibold text-secondary-foreground tracking-tight mb-2">Användarvillkor</h1>
        <p className="text-sm text-[#8e8e93] mb-10">Senast uppdaterad: {updated}</p>

        <div className="flex flex-col gap-8 text-secondary-foreground">

          <section>
            <h2 className="text-base font-semibold mb-2">1. Om tjänsten</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Belle Martineé (org.nr 061028-1818) tillhandahåller AI-drivna chattbottar som företag kan bädda in på sin webbplats. Tjänsten hanterar kundfrågor, samlar leads och tar emot bokningsförfrågningar automatiskt dygnet runt.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">2. Vad tjänsten gör</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm mb-3">Tjänsten inkluderar:</p>
            <ul className="text-[#6e6e73] text-sm leading-relaxed space-y-1.5 ml-4 list-disc">
              <li>En AI-chattbot konfigurerad för ditt företag</li>
              <li>Insamling av leads (namn, e-post, telefon, ärende)</li>
              <li>Mottagning av bokningsförfrågningar</li>
              <li>E-postnotiser till dig när nya leads eller bokningar inkommer</li>
              <li>Dashboard för att anpassa botens innehåll och ton</li>
              <li>Inbäddningskod för din webbplats</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">3. Vad tjänsten inte gör</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm mb-3">Tjänsten garanterar inte:</p>
            <ul className="text-[#6e6e73] text-sm leading-relaxed space-y-1.5 ml-4 list-disc">
              <li>Att alla kundsvar är korrekta — AI kan göra misstag</li>
              <li>Automatisk bekräftelse av bokningar — det sker manuellt av dig</li>
              <li>100 % drifttid — vi strävar efter hög tillgänglighet men kan inte garantera det</li>
              <li>Att boten ersätter mänsklig kundtjänst i komplexa ärenden</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">4. Betalningsvillkor</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Tjänsten faktureras månadsvis i förskott via Stripe. Priset framgår vid köptillfället. Betalning sker med kort. Faktura skickas automatiskt till din registrerade e-postadress.
            </p>
            <p className="text-[#6e6e73] leading-relaxed text-sm mt-2">
              Vid utebliven betalning pausas boten tills betalningen är genomförd. Abonnemanget förnyas automatiskt varje månad tills det sägs upp.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">5. Uppsägning</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Du kan säga upp tjänsten när som helst utan bindningstid. Klicka på "Hantera prenumeration" i din dashboard eller kontakta oss på{" "}
              <a href="mailto:support@bellemartinee.se" className="text-[#E8440A] hover:underline">support@bellemartinee.se</a>. Tjänsten fortsätter till slutet av innevarande betalningsperiod.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">6. Provperiod och ångerrätt</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Alla nya abonnemang inkluderar en gratis provperiod på 30 dagar. Under provperioden debiteras inget. Om du avslutar abonnemanget innan provperioden löper ut betalar du ingenting. Efter provperiodens slut dras första månadsavgiften automatiskt. Har du frågor eller vill avsluta kontaktar du oss på{" "}
              <a href="mailto:support@bellemartinee.se" className="text-[#E8440A] hover:underline">support@bellemartinee.se</a>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">7. Ditt ansvar</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Du ansvarar för att den information du lägger in i dashboarden (priser, öppettider, instruktioner) är korrekt. Du ansvarar även för att boten inte används för att sprida vilseledande, olaglig eller skadlig information.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">8. Ansvarsbegränsning</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Belle Martineé ansvarar inte för indirekta skador, utebliven vinst eller följdskador som uppstår till följd av användning av tjänsten. Vårt totala ansvar är under alla omständigheter begränsat till det belopp du betalat för tjänsten under den senaste månaden.
            </p>
            <p className="text-[#6e6e73] leading-relaxed text-sm mt-2">
              AI-genererade svar är automatiserade och kan innehålla fel. Du bör kontrollera viktig information innan den kommuniceras vidare till dina kunder.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">9. Personuppgifter</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Vi behandlar personuppgifter i enlighet med vår{" "}
              <Link href="/integritetspolicy" className="text-[#E8440A] hover:underline">integritetspolicy</Link>. Leads och bokningar som samlas via din bot lagras i vår databas och är tillgängliga för dig i dashboarden.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">10. Ändringar</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Vi kan uppdatera dessa villkor. Vid väsentliga ändringar informeras du via e-post senast 14 dagar innan ändringen träder i kraft.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">11. Kontakt</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Belle Martineé · Org.nr 061028-1818 · Godkänd för F-skatt<br />
              <a href="mailto:support@bellemartinee.se" className="text-[#E8440A] hover:underline">support@bellemartinee.se</a>
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
