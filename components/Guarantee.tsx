"use client";

import { ShieldCheck, CalendarX, Coins } from "lucide-react";
import AnimatedTextCycle from "@/components/ui/animated-text-cycle";
import FadeUp from "@/components/FadeUp";

const cards = [
  {
    Icon: ShieldCheck,
    title: "1 månads provperiod",
    body: "Prova gratis i 30 dagar. Inte nöjd? Avsluta innan provperioden tar slut och du betalar ingenting.",
  },
  {
    Icon: CalendarX,
    title: "Ingen bindningstid",
    body: "Betala månad för månad. Avsluta när du vill direkt i din dashboard eller med ett mejl.",
  },
  {
    Icon: Coins,
    title: "Full återbetalning",
    body: "Vi betalar tillbaka enligt våra köpvillkor.",
  },
];

export default function Guarantee() {
  return (
    <section className="py-20 md:py-36 bg-secondary">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        <FadeUp><div className="mb-10 md:mb-16 text-center">
          <div className="flex items-center justify-center gap-2.5 mb-5">
            <ShieldCheck className="w-4 h-4 text-[#8e8e93]" strokeWidth={1.5} />
            <p className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#8e8e93]">Garanti</p>
          </div>
          <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight">
            Ingen{" "}
            <AnimatedTextCycle
              words={["oro", "risk", "bindning", "nackdel", "överraskning"]}
              interval={2500}
              className="text-secondary-foreground"
            />
          </h2>
        </div></FadeUp>

        <FadeUp delay={0.1}><div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card) => (
            <div key={card.title} className="bg-white rounded-3xl p-7 flex flex-col gap-5 border border-[#e8e8e8]">
              <div className="w-11 h-11 rounded-2xl bg-[#E8440A]/10 flex items-center justify-center">
                <card.Icon className="w-5 h-5 text-[#E8440A]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-secondary-foreground tracking-tight">{card.title}</h3>
                <p className="text-sm text-[#6e6e73] font-normal leading-relaxed">{card.body}</p>
              </div>
            </div>
          ))}
        </div></FadeUp>

        <div className="mt-10 text-center">
          <p className="text-sm font-normal text-[#8e8e93] italic leading-relaxed max-w-sm mx-auto">
            "Prova i 30 dagar utan risk. Inte nöjd? Hör av dig så löser vi det."
          </p>
          <p className="text-xs text-[#a0a0a8] font-normal mt-2">Simon Lind, grundare av Belle Martineé</p>
        </div>

      </div>
    </section>
  );
}
