import FadeUp from "@/components/FadeUp";

export default function CalendarSetup() {
  return (
    <section className="py-14 bg-white border-b border-[#f0f0f0]">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        <FadeUp><div className="mb-6">
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-3">Bokningssystem</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary-foreground tracking-tight">
            Fungerar med din kalender
          </h2>
          <p className="text-sm text-[#6e6e73] mt-2">Google Kalender, Outlook eller Apple Calendar. Du väljer.</p>
        </div></FadeUp>

        {/* Kalender-badges */}
        <FadeUp delay={0.1}><div className="flex flex-wrap gap-3 mb-10">
          {[
            { name: "Google Kalender", color: "#E8440A" },
            { name: "Outlook",         color: "#0078d4" },
            { name: "Apple Calendar",  color: "#1d1d1f" },
          ].map((cal) => (
            <span
              key={cal.name}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-semibold"
              style={{ background: cal.color }}
            >
              {cal.name}
            </span>
          ))}
        </div></FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 items-start">

          <FadeUp delay={0.1}><div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#E8440A] flex items-center justify-center text-white text-[10px] font-semibold shrink-0">1</span>
              <span className="text-sm font-medium text-secondary-foreground">Kunden bokar via chatten</span>
            </div>
            <p className="text-xs text-[#6e6e73] font-normal leading-relaxed pl-8">
              Kunden chattar med din bot, väljer tjänst och bokar en tid direkt.
            </p>
          </div></FadeUp>

          <FadeUp delay={0.2}><div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#E8440A] flex items-center justify-center text-white text-[10px] font-semibold shrink-0">2</span>
              <span className="text-sm font-medium text-secondary-foreground">Du får ett mail direkt</span>
            </div>
            <p className="text-xs text-[#6e6e73] font-normal leading-relaxed pl-8">
              Så fort en bokning görs skickas ett mail till dig med datum, tid och kundens uppgifter.
            </p>
          </div></FadeUp>

          <FadeUp delay={0.3}><div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#E8440A] flex items-center justify-center text-white text-[10px] font-semibold shrink-0">3</span>
              <span className="text-sm font-medium text-secondary-foreground">Ett klick in i din kalender</span>
            </div>
            <p className="text-xs text-[#6e6e73] font-normal leading-relaxed pl-8">
              I mailet finns knappar för Google Kalender och Outlook. Använder du Apple Calendar finns kalenderinbjudan bifogad i mailet.
            </p>
          </div></FadeUp>

        </div>

        <div className="mt-10">
          <a
            href="#tjanster"
            className="inline-flex items-center gap-2 border border-[#e8e8e8] rounded-xl px-5 py-3 text-sm font-normal text-[#6e6e73] hover:text-secondary-foreground hover:border-[#d0d0d0] transition-colors duration-200"
          >
            Se priser →
          </a>
        </div>

      </div>
    </section>
  );
}
