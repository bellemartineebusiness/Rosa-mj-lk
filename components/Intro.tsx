import { ArrowUpRight } from "lucide-react";

const items = [
  {
    title: "Svarar på dina kunders frågor",
    body: "Med din information, ditt tonläge och dina priser. Inte ett generiskt svar.",
  },
  {
    title: "Samlar bokningar och leads",
    body: "Direkt i chatten. Kunden bokar, du får en notis. Inga formulär, ingen manuell hantering.",
  },
  {
    title: "Aktiv direkt efter köpet",
    body: "Inga tekniker, ingen lång setup. Köp, klistra in en kodrad på din hemsida, klart.",
  },
];

export default function Intro() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          <div>
            <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-6">AI-chattbot</p>
            <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight mb-6">
              Din AI-chattbot.<br />
              <span className="text-secondary-foreground/50 font-normal">Aktiv direkt efter köpet.</span>
            </h2>
            <p className="text-[#6e6e73] text-lg font-normal leading-relaxed mb-8 max-w-sm">
              En personlig AI-assistent som svarar dina kunder dygnet runt och samlar bokningar medan du sover.
            </p>
            <a
              href="#tjanster"
              className="group inline-flex items-center gap-2 bg-[#E8440A] text-white font-normal px-7 py-3.5 rounded-full hover:bg-[#d03d09] transition-colors duration-200 text-sm"
            >
              Se priser
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <div key={item.title} className="p-6 rounded-2xl border border-[#e8e8e8] bg-[#fafafa]">
                <p className="text-sm font-semibold text-secondary-foreground mb-1">{item.title}</p>
                <p className="text-sm text-[#6e6e73] font-normal leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
