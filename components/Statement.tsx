"use client";

import { ArrowUpRight } from "lucide-react";

const stats = [
  { number: "5",     unit: "dagar", label: "Leveranstid" },
  { number: "10 000", unit: "kr",    label: "Startpris" },
  { number: "100",   unit: "%",     label: "Nöjd garanti" },
  { number: "AI",    unit: "",      label: "Driven process" },
];

export default function Statement() {
  return (
    <section className="py-20 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

          <div>
            <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-6">Kort och gott</p>
            <h2 className="text-3xl md:text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-tight tracking-tight text-secondary-foreground mb-6">
              En hemsida som{" "}
              <span className="text-[#3a3a3c] font-normal italic">faktiskt</span>{" "}
              gör jobbet.
            </h2>
            <p className="text-[#6e6e73] text-base font-normal leading-relaxed mb-8 max-w-sm">
              Du berättar vad du vill ha. Vi tar hand om design, kod och lansering.
            </p>
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-2.5 bg-[#E8440A] text-white font-normal px-7 py-3.5 rounded-full hover:bg-[#d03d09] transition-colors duration-200"
            >
              Kom igång
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-[#0a0a0a] rounded-2xl p-7 flex flex-col gap-3"
              >
                <div className="flex items-end gap-1.5 leading-none">
                  <span className="text-[2.8rem] font-semibold text-white tracking-tight leading-none">
                    {stat.number}
                  </span>
                  {stat.unit && (
                    <span className="text-base font-normal text-white/60 mb-0.5">{stat.unit}</span>
                  )}
                </div>
                <span className="text-[10px] text-white/50 font-normal uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
