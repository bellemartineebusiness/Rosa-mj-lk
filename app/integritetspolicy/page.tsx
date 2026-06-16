import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Integritetspolicy",
  robots: { index: false },
};

export default function Integritetspolicy() {
  const updated = "20 maj 2026";

  return (
    <main className="min-h-screen bg-[#fdf8e8] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-sm text-[#700143] hover:underline mb-8 block"
        >
          ← Tillbaka till startsidan
        </Link>

        <h1 className="text-4xl font-extrabold text-[#1a0010] mb-2">
          Integritetspolicy
        </h1>
        <p className="text-sm text-[#7a4060] mb-10">Senast uppdaterad: {updated}</p>

        <div className="flex flex-col gap-8 text-[#1a0010]">

          <section>
            <h2 className="text-xl font-bold mb-2">1. Vem är ansvarig för dina uppgifter?</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Belle Martineé, Stockholm, Sverige.<br />
              E-post: <a href="mailto:info@bellemartinee.se" className="text-[#700143] hover:underline">info@bellemartinee.se</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">2. Vilka uppgifter samlar vi in?</h2>
            <p className="text-[#7a4060] leading-relaxed">
              När du fyller i vårt kontaktformulär samlar vi in: namn, e-postadress, företagsnamn (frivilligt) och ditt meddelande. Vi samlar inte in känsliga personuppgifter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">3. Varför samlar vi in uppgifterna?</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Enbart för att kunna svara på din förfrågan och leverera de tjänster du efterfrågat. Vi säljer eller delar inte dina uppgifter med tredje part i marknadsföringssyfte.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">4. Rättslig grund (GDPR)</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Behandlingen baseras på berättigat intresse (art. 6.1 f) — att kunna besvara din förfrågan — samt fullgörande av avtal (art. 6.1 b) när vi levererar tjänster.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">5. Hur länge sparar vi uppgifterna?</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Dina uppgifter sparas så länge det är nödvändigt för att hantera ditt ärende, och därefter i högst 12 månader.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">6. Dina rättigheter</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Du har rätt att begära ut, rätta eller radera dina uppgifter. Kontakta oss på e-postadressen ovan så hjälper vi dig inom 30 dagar.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">7. Cookies</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Vi använder inga spårningscookies. Webbplatsen kan använda tekniska cookies som krävs för att sajten ska fungera.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-2">8. Klagomål</h2>
            <p className="text-[#7a4060] leading-relaxed">
              Om du anser att vi hanterar dina uppgifter felaktigt kan du lämna klagomål till <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" className="text-[#700143] hover:underline">Integritetsskyddsmyndigheten (IMY)</a>.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
