import FadeUp from "@/components/FadeUp";

export default function HowItWorks() {
  return (
    <section id="hur-det-fungerar" className="py-14 bg-white border-b border-[#f0f0f0]">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        <FadeUp><div className="mb-10">
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-3">Så här fungerar det</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary-foreground tracking-tight mb-3">
            Hur gör man egentligen?
          </h2>
          <p className="text-sm text-[#6e6e73] font-normal leading-relaxed max-w-lg">
            Klistra in din webbadress. Vår AI analyserar din hemsida och skapar en kunskapsbas automatiskt. Sedan är boten redo.
          </p>
        </div></FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 items-start">

          <FadeUp delay={0.1}><div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#E8440A] flex items-center justify-center text-white text-[10px] font-semibold shrink-0">1</span>
              <span className="text-sm font-medium text-secondary-foreground">AI:n analyserar din hemsida</span>
            </div>
            <p className="text-xs text-[#6e6e73] font-normal leading-relaxed pl-8">
              Lägg in din webbadress. AI:n skannar din hemsida och skapar hela kunskapsbasen åt dig. Du kan alltid lägga till mer efteråt.
            </p>
          </div></FadeUp>

          <FadeUp delay={0.2}><div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#E8440A] flex items-center justify-center text-white text-[10px] font-semibold shrink-0">2</span>
              <span className="text-sm font-medium text-secondary-foreground">Vi lägger in det åt dig</span>
            </div>
            <p className="text-xs text-[#6e6e73] font-normal leading-relaxed pl-8">
              Vi sköter installationen på din hemsida. Fungerar med WordPress, Shopify, Webflow, Wix och egna hemsidor.
            </p>
          </div></FadeUp>

          <FadeUp delay={0.3}><div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#E8440A] flex items-center justify-center text-white text-[10px] font-semibold shrink-0">3</span>
              <span className="text-sm font-medium text-secondary-foreground">AI-chatten är live</span>
            </div>
            <p className="text-xs text-[#6e6e73] font-normal leading-relaxed pl-8">
              Chatten dyker upp automatiskt och börjar ta emot bokningar och svara på frågor om klippning, färgning och priser. Dygnet runt.
            </p>
          </div></FadeUp>

        </div>

        <div className="mt-10">
          <a
            href="#faq"
            className="inline-flex items-center gap-2 border border-[#e8e8e8] rounded-xl px-5 py-3 text-sm font-normal text-[#6e6e73] hover:text-secondary-foreground hover:border-[#d0d0d0] transition-colors duration-200"
          >
            Har du fler frågor? Gå till FAQ →
          </a>
        </div>

      </div>
    </section>
  );
}
