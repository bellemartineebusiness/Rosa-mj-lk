"use client";

import { ArrowUpRight } from "lucide-react";
import FadeUp from "@/components/FadeUp";

export default function Statement() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          <FadeUp><div>
            <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-6">Kort och gott</p>
            <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight mb-6">
              Byggd för<br />
              <span className="italic font-normal">ditt företag.</span><br />
              <span className="text-secondary-foreground/40 font-normal">Dygnet runt.</span>
            </h2>
            <p className="text-[#6e6e73] text-lg font-normal leading-relaxed mb-8 max-w-sm">
              Du berättar om ditt företag. Vi bygger en AI-chattbot som bokar tider och svarar på frågor om priser, tjänster och öppettider. Dygnet runt.
            </p>
            <a
              href="#kontakt"
              className="group inline-flex items-center gap-2 bg-[#E8440A] text-white font-normal px-7 py-3.5 rounded-full hover:bg-[#d03d09] transition-colors duration-200 text-sm"
            >
              Kom igång
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div></FadeUp>

          <FadeUp delay={0.15}><div className="rounded-3xl overflow-hidden border border-[#e8e8e8] shadow-2xl shadow-black/10 bg-secondary p-4 grid grid-cols-2 gap-3">

            <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8] flex flex-col justify-between min-h-36">
              <span className="text-[10px] text-[#8e8e93] font-semibold uppercase tracking-[0.2em]">Alltid tillgänglig</span>
              <span className="text-[3rem] font-bold text-secondary-foreground tracking-tight leading-none">24/7</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8] flex flex-col justify-between min-h-36">
              <span className="text-[10px] text-[#8e8e93] font-semibold uppercase tracking-[0.2em]">Svarstid</span>
              <div className="flex items-end gap-1.5 leading-none">
                <span className="text-[3rem] font-bold text-secondary-foreground tracking-tight leading-none">~3</span>
                <span className="text-sm font-semibold text-[#E8440A] mb-1.5">sek</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8] flex flex-col justify-between min-h-36">
              <span className="text-[10px] text-[#8e8e93] font-semibold uppercase tracking-[0.2em]">Nöjd garanti</span>
              <div className="flex items-end gap-1.5 leading-none">
                <span className="text-[3rem] font-bold text-secondary-foreground tracking-tight leading-none">100</span>
                <span className="text-sm font-semibold text-[#E8440A] mb-1.5">%</span>
              </div>
            </div>

            <div className="bg-[#E8440A] rounded-2xl p-5 flex flex-col justify-between min-h-36">
              <span className="text-[10px] text-white/70 font-semibold uppercase tracking-[0.2em]">Driven process</span>
              <span className="text-[3rem] font-bold text-white tracking-tight leading-none">AI</span>
            </div>

          </div></FadeUp>

        </div>
      </div>
    </section>
  );
}
