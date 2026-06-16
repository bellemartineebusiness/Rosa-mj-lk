export default function HowItWorks() {
  return (
    <section className="py-14 bg-white border-b border-[#f0f0f0]">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        <div className="mb-10">
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-3">Så här fungerar det</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary-foreground tracking-tight">
            Hur gör man egentligen?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 items-start">

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#E8440A] flex items-center justify-center text-white text-[10px] font-semibold shrink-0">1</span>
              <span className="text-sm font-medium text-secondary-foreground">Kopiera koden</span>
            </div>
            <p className="text-xs text-[#6e6e73] font-normal leading-relaxed pl-8">
              Du får en personlig kodsnutt när du köper. En rad. Inget mer.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#E8440A] flex items-center justify-center text-white text-[10px] font-semibold shrink-0">2</span>
              <span className="text-sm font-medium text-secondary-foreground">Klistra in på din hemsida</span>
            </div>
            <p className="text-xs text-[#6e6e73] font-normal leading-relaxed pl-8">
              Lägg koden i header eller footer. Fungerar med WordPress, Shopify, Webflow, Wix och egna hemsidor.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#E8440A] flex items-center justify-center text-white text-[10px] font-semibold shrink-0">3</span>
              <span className="text-sm font-medium text-secondary-foreground">AI-chatten är live</span>
            </div>
            <p className="text-xs text-[#6e6e73] font-normal leading-relaxed pl-8">
              Chatten dyker upp automatiskt och börjar svara dina besökare dygnet runt.
            </p>
          </div>

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
