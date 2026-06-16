import { CalendarPlus, CalendarX, CalendarClock, ArrowRight } from "lucide-react";

const features = [
  {
    Icon: CalendarPlus,
    title: "Bokning",
    body: "Kunden skriver vad de vill boka och när. Botten frågar om tjänst, datum, namn och kontaktuppgifter — och bekräftar direkt i chatten.",
  },
  {
    Icon: CalendarX,
    title: "Avbokning",
    body: "Botten känner igen tidigare bokningar i konversationen. Kunden säger att de vill avboka och får en bekräftelse på sekunden.",
  },
  {
    Icon: CalendarClock,
    title: "Ändra bokning",
    body: "Fel datum? Kunden ber om att flytta sin tid. Botten hanterar ändringen och bekräftar den nya bokningen direkt.",
  },
];

const steps = [
  { step: "1", text: "Kunden skriver i chatten — t.ex. \"Jag vill boka en massage fredag kl 14\"" },
  { step: "2", text: "Botten samlar in det som saknas: namn, kontaktuppgifter och önskad tid" },
  { step: "3", text: "Bokningen bekräftas i chatten. Du får notis om nya bokningar." },
];

export default function BookingFeature() {
  return (
    <section className="py-20 md:py-36 bg-[#f5f5f7]">
      <div className="max-w-5xl mx-auto px-6 md:px-8 flex flex-col gap-16">

        <div className="text-center">
          <p className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#8e8e93] mb-5">Bokningssystem</p>
          <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight mb-4">
            Boken, avboka och ändra.<br />
            <span className="text-[#6e6e73] font-normal">Helt automatiskt.</span>
          </h2>
          <p className="text-[#6e6e73] text-lg font-normal max-w-lg mx-auto">
            Din AI-bot hanterar hela bokningsflödet direkt i chatten — utan att du behöver lyfta ett finger.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-3xl p-7 flex flex-col gap-4 border border-[#e8e8e8]">
              <div className="w-11 h-11 rounded-2xl bg-[#E8440A]/10 flex items-center justify-center">
                <f.Icon className="w-5 h-5 text-[#E8440A]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-secondary-foreground mb-1.5">{f.title}</h3>
                <p className="text-sm text-[#6e6e73] font-normal leading-relaxed">{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#e8e8e8]">
          <p className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#8e8e93] mb-6">Så här fungerar det</p>
          <div className="flex flex-col gap-5">
            {steps.map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <span className="w-7 h-7 rounded-full bg-[#E8440A] flex items-center justify-center text-white text-[11px] font-semibold shrink-0 mt-0.5">{s.step}</span>
                <p className="text-sm text-[#6e6e73] font-normal leading-relaxed pt-1">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 pt-6 border-t border-[#f0f0f0]">
            <a href="#projekt" className="inline-flex items-center gap-2 text-sm font-normal text-[#E8440A] hover:gap-3 transition-all duration-200">
              Testa demo-botten <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
