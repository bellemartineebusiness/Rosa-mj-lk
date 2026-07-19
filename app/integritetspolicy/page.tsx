import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integritetspolicy – Belle Martineé",
  robots: { index: true },
};

export default function Integritetspolicy() {
  const updated = "3 juli 2026";

  return (
    <main className="min-h-screen bg-secondary py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-sm text-[#8e8e93] hover:text-secondary-foreground transition-colors mb-8 block">
          ← Tillbaka till startsidan
        </Link>

        <h1 className="text-4xl font-semibold text-secondary-foreground tracking-tight mb-2">Integritetspolicy</h1>
        <p className="text-sm text-[#8e8e93] mb-10">Senast uppdaterad: {updated}</p>

        <div className="flex flex-col gap-8 text-secondary-foreground">

          <section>
            <h2 className="text-base font-semibold mb-2">1. Personuppgiftsansvarig</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Belle Martineé, Stockholm, Sverige.<br />
              E-post: <a href="mailto:info@bellemartinee.se" className="text-[#E8440A] hover:underline">info@bellemartinee.se</a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">2. Vilka uppgifter samlar vi in?</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm mb-3">Vi samlar in följande uppgifter beroende på hur du interagerar med oss:</p>
            <ul className="text-[#6e6e73] text-sm leading-relaxed space-y-1.5 ml-4 list-disc">
              <li><strong className="text-secondary-foreground">Kontaktformulär:</strong> namn, e-postadress, företagsnamn (frivilligt) och ditt meddelande</li>
              <li><strong className="text-secondary-foreground">Köp av tjänst:</strong> e-postadress och betalningsuppgifter (hanteras av Stripe)</li>
              <li><strong className="text-secondary-foreground">Chattbot (slutanvändardata):</strong> meddelanden, namn, e-post och telefonnummer som slutanvändare lämnar frivilligt i chatten — sparas som leads och bokningar i din dashboard</li>
              <li><strong className="text-secondary-foreground">Dashboard:</strong> företagsinformation, öppettider, priser och annan information du lägger in för att träna din bot</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">3. Användning av AI — viktig information</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm mb-2">
              Vår tjänst använder artificiell intelligens (AI) för att driva chattbottar och analysera webbplatsinnehåll. Specifikt:
            </p>
            <ul className="text-[#6e6e73] text-sm leading-relaxed space-y-1.5 ml-4 list-disc">
              <li><strong className="text-secondary-foreground">Anthropic Claude</strong> — alla chattkonversationer bearbetas av Anthropic API. Meddelanden skickas till Anthropics servrar för att generera svar. Anthropic behandlar dessa uppgifter i enlighet med deras <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#E8440A] hover:underline">integritetspolicy</a>.</li>
              <li><strong className="text-secondary-foreground">AI-analys av webbplats</strong> — när du anger din webbadress hämtar och bearbetar vi sidinnehåll via Jina.ai och Anthropic Claude för att skapa din kunskapsbas.</li>
              <li>AI-genererade svar kan innehålla fel. Granska alltid viktig information.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">4. Tredjepartstjänster och integrationer</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm mb-3">Vi använder följande tredjepartstjänster som kan behandla personuppgifter:</p>
            <div className="flex flex-col gap-3">
              {[
                { name: "Supabase", purpose: "Databaslagring av kunder, inställningar, leads och bokningar. Servrar i EU.", link: "https://supabase.com/privacy" },
                { name: "Stripe", purpose: "Betalningshantering och prenumerationshantering. Stripe lagrar betalkortsuppgifter.", link: "https://stripe.com/privacy" },
                { name: "Anthropic", purpose: "AI-bearbetning av chattmeddelanden. Meddelanden skickas till Anthropics API.", link: "https://www.anthropic.com/privacy" },
                { name: "Resend", purpose: "Utskick av e-postnotiser (leads, bokningar, välkomstmail).", link: "https://resend.com/privacy" },
                { name: "Vercel", purpose: "Webbhosting och edge-nätverk.", link: "https://vercel.com/legal/privacy-policy" },
                { name: "Jina.ai", purpose: "Hämtning av webbplatsinnehåll vid AI-analys (körs bara vid onboarding).", link: "https://jina.ai/privacy" },
              ].map((s) => (
                <div key={s.name} className="bg-white rounded-xl p-4 border border-[#e8e8e8]">
                  <p className="text-sm font-medium text-secondary-foreground mb-0.5">{s.name}</p>
                  <p className="text-xs text-[#6e6e73] leading-relaxed">{s.purpose} <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-[#E8440A] hover:underline">Integritetspolicy →</a></p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">5. Rättslig grund (GDPR)</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Behandlingen baseras på fullgörande av avtal (art. 6.1 b) för att leverera tjänsten, berättigat intresse (art. 6.1 f) för att besvara förfrågningar och förbättra tjänsten, samt samtycke (art. 6.1 a) för marknadsföring om du aktivt godkänt det.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">6. Hur länge sparar vi uppgifterna?</h2>
            <ul className="text-[#6e6e73] text-sm leading-relaxed space-y-1.5 ml-4 list-disc">
              <li>Chattbot-leads och bokningar: sparas så länge ditt abonnemang är aktivt, därefter raderas de inom 90 dagar</li>
              <li>Kontaktformulär: max 12 månader</li>
              <li>Betalningshistorik: 7 år (bokföringskrav)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">7. Dina rättigheter</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Du har rätt att begära ut, rätta, begränsa behandlingen av eller radera dina uppgifter. Kontakta oss på <a href="mailto:info@bellemartinee.se" className="text-[#E8440A] hover:underline">info@bellemartinee.se</a> så hjälper vi dig inom 30 dagar.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">8. Cookies</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Vi använder endast tekniskt nödvändiga cookies. Inga spårnings- eller reklamcookies. Läs mer i vår <Link href="/cookie-policy" className="text-[#E8440A] hover:underline">cookie-policy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold mb-2">9. Klagomål</h2>
            <p className="text-[#6e6e73] leading-relaxed text-sm">
              Om du anser att vi hanterar dina uppgifter felaktigt kan du lämna klagomål till <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" className="text-[#E8440A] hover:underline">Integritetsskyddsmyndigheten (IMY)</a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
