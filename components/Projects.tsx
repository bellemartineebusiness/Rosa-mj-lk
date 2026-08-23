"use client";

import { ArrowUpRight } from "lucide-react";
import FadeUp from "@/components/FadeUp";

export default function Projects() {
  return (
    <section id="projekt" className="py-20 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <FadeUp><div className="mb-12 md:mb-20 text-center">
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-5">Live demo</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-secondary-foreground leading-tight tracking-tight mb-5">
            Vad kan en bot
            <br />
            <span className="text-[#3a3a3c] font-normal">göra för dig?</span>
          </h2>
          <p className="text-[#6e6e73] text-base font-normal leading-relaxed max-w-sm mx-auto">
            Din chattbot anpassas helt efter ditt företag och dina kunder.
          </p>
        </div></FadeUp>

        <FadeUp delay={0.1}><div className="flex justify-center">
          <a
            href="/widget/0fb2136e-af25-4534-ba57-db34db4dc32a?color=E8440A"
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full max-w-4xl block rounded-3xl overflow-hidden bg-white border border-[#e8e8e8] ring-1 ring-[#e0e0e0] hover:-translate-y-1.5 transition-all duration-500"
          >
            {/* Browser chrome */}
            <div className="h-11 flex items-center gap-1.5 px-5 bg-[#fafafa] border-b border-[#f0f0f0]">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <div className="flex-1 mx-5 h-6 rounded-lg bg-white border border-[#ebebeb] flex items-center justify-center gap-1.5 overflow-hidden">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d0d0d0]" />
                <span className="text-[10px] text-[#6e6e73] font-normal tracking-wide truncate">bellemartinee.se · Prova demo</span>
              </div>
            </div>

            {/* Preview */}
            <div className="relative overflow-hidden bg-white flex items-center justify-center px-8 py-10">
              {/* Widget mockup */}
              <div className="relative w-64 bg-white rounded-2xl shadow-2xl shadow-black/15 ring-1 ring-black/6 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-4 pt-3.5 pb-4 bg-[#E8440A]">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-2 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                      <span className="text-white text-[10px] font-medium">Online</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white font-bold text-xs shrink-0">B</div>
                    <div>
                      <p className="text-white font-semibold text-[13px] leading-tight">Ditt företag</p>
                      <p className="text-white/60 text-[10px]">Vi svarar direkt</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="px-3 py-3 flex flex-col gap-2 bg-[#f9f9f9]">
                  <div className="flex items-end gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#E8440A] flex items-center justify-center text-white text-[9px] font-bold shrink-0">B</div>
                    <div className="bg-white text-secondary-foreground text-xs px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm border border-[#f0f0f0] max-w-[80%] leading-relaxed">
                      Hej! Vad kan jag hjälpa dig med? 😊
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 ml-7">
                    {["Boka tid", "Se priser"].map((s) => (
                      <span key={s} className="self-start text-[10px] px-2.5 py-1.5 rounded-xl border border-[#E8440A] text-[#E8440A] bg-white leading-none">{s}</span>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#E8440A] text-white text-xs px-3 py-2 rounded-2xl rounded-br-sm max-w-[75%] leading-relaxed">
                      Vad kostar det hos er?
                    </div>
                  </div>
                  <div className="flex items-end gap-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#E8440A] flex items-center justify-center text-white text-[9px] font-bold shrink-0">B</div>
                    <div className="bg-white text-secondary-foreground text-xs px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm border border-[#f0f0f0] max-w-[80%] leading-relaxed">
                      Våra priser börjar från 450 kr. Vill du boka?
                    </div>
                  </div>
                </div>

                {/* Input */}
                <div className="px-2.5 py-2.5 border-t border-[#f0f0f0] bg-white flex gap-1.5">
                  <div className="flex-1 bg-secondary rounded-lg px-3 py-2 text-[10px] text-[#b0b0b8]">Skriv ett meddelande...</div>
                  <div className="w-7 h-7 rounded-lg bg-[#E8440A] flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>

                {/* Branding */}
                <div className="flex items-center justify-center gap-1 py-1.5 bg-white border-t border-[#f0f0f0]">
                  <span className="text-[9px] text-[#b0b0b8]">Skapad av</span>
                  <span className="text-[9px] font-semibold text-[#E8440A]">Belle Martineé</span>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/5">
                <span className="inline-flex items-center gap-2 bg-white text-[#0a0a0a] text-sm font-medium px-6 py-3 rounded-full shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  Prova live <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="px-7 py-5 flex items-center justify-between border-t border-[#f0f0f0]">
              <div>
                <h3 className="text-sm font-medium text-secondary-foreground tracking-tight">Live demo</h3>
                <p className="text-xs text-[#6e6e73] font-normal mt-0.5">Testa hur boten fungerar i verkligheten</p>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-normal text-[#8e8e93] group-hover:text-secondary-foreground transition-colors duration-300">
                Öppna <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </a>
        </div></FadeUp>

        <div className="mt-14 flex justify-center">
          <a href="#kontakt"
            className="group inline-flex items-center gap-2.5 bg-[#E8440A] text-white text-sm font-normal px-8 py-3.5 rounded-full hover:bg-[#d03d09] transition-colors duration-200">
            Jag vill ha en chattbot
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
          </a>
        </div>

      </div>
    </section>
  );
}
