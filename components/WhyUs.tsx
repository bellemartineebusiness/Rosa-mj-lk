import { Check, X, User } from "lucide-react";

const employeeCosts = [
  { label: "Månadslön",          value: "28 000 kr" },
  { label: "Arbetsgivaravgifter (31%)", value: "8 700 kr" },
  { label: "Semester & sjukfrånvaro",  value: "~3 500 kr" },
  { label: "Rekrytering (engång)",     value: "~20 000 kr" },
  { label: "Utbildning & onboarding",  value: "~5 000 kr" },
];

const comparison = [
  { label: "Tillgänglig 24/7",             employee: false, bot: true },
  { label: "Svarar på några sekunder",      employee: false, bot: true },
  { label: "Aldrig sjuk eller ledig",       employee: false, bot: true },
  { label: "Samlar leads automatiskt",      employee: false, bot: true },
  { label: "Hanterar bokningar",            employee: false, bot: true },
  { label: "Kostar under 3 000 kr/mån",    employee: false, bot: true },
  { label: "Kan hantera 100 kunder samtidigt", employee: false, bot: true },
];

const whyUs = [
  {
    title: "Aktiv samma dag",
    body: "Direkt efter köpet får du din länk. Klistra in en kodrad på din hemsida så är botten igång.",
  },
  {
    title: "Personlig setup",
    body: "Det här är inte ett DIY-verktyg. Vi anpassar botten efter ditt företag, ditt språk och dina kunder.",
  },
  {
    title: "Stöd ingår",
    body: "Vi finns kvar efter lansering. Vill du ändra något, lägga till ny info eller förbättra flödet? Hör av dig.",
  },
  {
    title: "Inga bindningstider",
    body: "Betala månad för månad. Inget kontrakt, inga bindningstider. Avsluta när du vill med ett mejl.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 md:py-36 bg-[#f5f5f7]">
      <div className="max-w-5xl mx-auto px-6 md:px-8 flex flex-col gap-20">

        {/* ── Kostnadsanalys ── */}
        <div>
          <p className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#8e8e93] mb-5 text-center">Kostnadsanalys</p>
          <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight text-center mb-4">
            En anställd vs. en AI-bot
          </h2>
          <p className="text-center text-[#6e6e73] text-lg font-normal max-w-xl mx-auto mb-12">
            Vad kostar det egentligen att låta en människa svara på samma frågor om och om igen?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Anställd */}
            <div className="bg-[#0a0a0a] rounded-3xl p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-white/70" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Anställd kundtjänst</p>
                  <p className="text-white/40 text-xs">Deltid · Stockholm</p>
                </div>
              </div>
              {employeeCosts.map((item) => (
                <div key={item.label} className="flex items-center justify-between border-b border-white/8 pb-3 last:border-0 last:pb-0">
                  <span className="text-white/60 text-sm">{item.label}</span>
                  <span className="text-white text-sm font-medium">{item.value}</span>
                </div>
              ))}
              <div className="mt-2 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-white/80 text-sm font-medium">Totalt per månad</span>
                <span className="text-white text-xl font-semibold">~40 000 kr</span>
              </div>
              <p className="text-white/30 text-xs">Exkl. kontor, verktyg och tid för ledning.</p>
            </div>

            {/* Bot */}
            <div className="bg-white rounded-3xl p-7 flex flex-col gap-4 border border-[#c8c8ce]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#E8440A]/10 flex items-center justify-center">
                  <span className="text-[#E8440A] text-xs font-semibold">AI</span>
                </div>
                <div>
                  <p className="text-secondary-foreground font-semibold text-sm">Belle Martineé AI-bot</p>
                  <p className="text-[#8e8e93] text-xs">Starter · Aktiv direkt</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-[#d8d8d8] pb-3">
                <span className="text-[#6e6e73] text-sm">Månadsabonnemang</span>
                <span className="text-secondary-foreground text-sm font-medium">2 999 kr</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#d8d8d8] pb-3">
                <span className="text-[#6e6e73] text-sm">Setup & lansering</span>
                <span className="text-secondary-foreground text-sm font-medium">Ingår</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#d8d8d8] pb-3">
                <span className="text-[#6e6e73] text-sm">Löpande support</span>
                <span className="text-secondary-foreground text-sm font-medium">Ingår</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#d8d8d8] pb-3">
                <span className="text-[#6e6e73] text-sm">Semester & sjukfrånvaro</span>
                <span className="text-secondary-foreground text-sm font-medium">Finns inte</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#d8d8d8] pb-3">
                <span className="text-[#6e6e73] text-sm">Rekrytering</span>
                <span className="text-secondary-foreground text-sm font-medium">0 kr</span>
              </div>
              <div className="mt-2 pt-4 border-t border-[#f0f0f0] flex items-center justify-between">
                <span className="text-secondary-foreground text-sm font-medium">Totalt per månad</span>
                <span className="text-[#E8440A] text-xl font-semibold">2 999 kr</span>
              </div>
              <div className="bg-[#E8440A]/8 rounded-2xl px-4 py-3">
                <p className="text-[#E8440A] text-sm font-medium">Du sparar ~37 000 kr per månad</p>
                <p className="text-[#6e6e73] text-xs mt-0.5">Det är 444 000 kr om året.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Jämförelsetabell ── */}
        <div>
          <p className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#8e8e93] mb-5 text-center">Vad du faktiskt får</p>
          <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight text-center mb-12">
            Människan kan inte konkurrera.
          </h2>
          <div className="bg-white rounded-3xl border border-[#e8e8e8] overflow-hidden">
            <div className="grid grid-cols-3 bg-[#f5f5f7] px-6 py-3 border-b border-[#e8e8e8]">
              <span className="text-xs font-normal uppercase tracking-[0.15em] text-[#8e8e93] col-span-1">Funktion</span>
              <span className="text-xs font-normal uppercase tracking-[0.15em] text-[#8e8e93] text-center">Anställd</span>
              <span className="text-xs font-normal uppercase tracking-[0.15em] text-[#E8440A] text-center">AI-bot</span>
            </div>
            {comparison.map((row, i) => (
              <div key={i} className="grid grid-cols-3 px-6 py-4 border-b border-[#f5f5f7] last:border-0 items-center">
                <span className="text-sm text-secondary-foreground">{row.label}</span>
                <div className="flex justify-center">
                  <X className="w-4 h-4 text-[#8e8e93]" />
                </div>
                <div className="flex justify-center">
                  <Check className="w-4 h-4 text-[#E8440A]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Varför oss ── */}
        <div className="bg-[#e0e0e0] rounded-3xl p-8 md:p-12">
          <p className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#8e8e93] mb-5 text-center">Varför Belle Martineé</p>
          <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight text-center mb-12">
            Vi gör jobbet. Du sköter ditt.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            {whyUs.map((item) => (
              <div key={item.title}>
                <p className="text-base font-semibold text-secondary-foreground mb-1.5">{item.title}</p>
                <p className="text-sm text-[#6e6e73] font-normal leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
