import { ArrowUpRight, BookOpen, Bot, Calendar, Check, Code2, User } from "lucide-react";
import FadeUp from "@/components/FadeUp";

export default function Intro() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          <FadeUp><div>
            <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-6">Din dashboard</p>
            <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight mb-6">
              Full koll.<br />
              <span className="text-secondary-foreground/50 font-normal">Alltid uppdaterad.</span>
            </h2>
            <p className="text-[#6e6e73] text-lg font-normal leading-relaxed mb-8 max-w-sm">
              Se dina bokningar och leads i realtid. Anpassa botens färg och ton. Hämta din inbäddningskod. Allt på ett ställe.
            </p>
            <a
              href="#tjanster"
              className="group inline-flex items-center gap-2 bg-[#E8440A] text-white font-normal px-7 py-3.5 rounded-full hover:bg-[#d03d09] transition-colors duration-200 text-sm"
            >
              Se priser
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div></FadeUp>

          {/* Dashboard mockup */}
          <FadeUp delay={0.15}><div className="relative">
            <div className="rounded-3xl overflow-hidden border border-[#e8e8e8] shadow-2xl shadow-black/10 bg-secondary p-4 flex flex-col gap-3">

              {/* Header */}
              <div className="px-1">
                <p className="text-[10px] font-medium text-[#8e8e93] uppercase tracking-widest mb-1">Dashboard</p>
                <p className="text-lg font-semibold text-secondary-foreground tracking-tight">Din chattbot</p>
                <p className="text-[11px] text-[#8e8e93]">hej@dittforetag.se</p>
              </div>

              {/* Prenumeration */}
              <div className="bg-white rounded-2xl p-4 border border-[#e8e8e8]">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-green-100 text-green-700">Aktiv</span>
                  <span className="text-[10px] font-medium text-[#8e8e93]">61 / 1 000</span>
                </div>
                <div className="w-full bg-[#e0e0e0] rounded-full h-2 mb-1 overflow-hidden">
                  <div className="h-2 rounded-full w-[6%]" style={{ background: "linear-gradient(90deg, #E8440A, #ff6b35)" }} />
                </div>
                <p className="text-[10px] text-[#a0a0a8]">meddelanden denna månad</p>
              </div>

              {/* Kunskapsbas */}
              <div className="bg-white rounded-2xl p-4 border border-[#e8e8e8]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 rounded-md bg-[#f0f0f0] flex items-center justify-center">
                    <BookOpen className="w-2.5 h-2.5 text-[#6e6e73]" />
                  </div>
                  <span className="text-xs font-semibold text-secondary-foreground">Kunskapsbas</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="flex-1 bg-[#fafafa] border border-[#e8e8e8] rounded-lg px-3 py-2 text-[10px] text-[#b0b0b8]">
                    https://dittforetag.se
                  </div>
                  <div className="bg-secondary-foreground text-white text-[10px] font-medium px-3 py-2 rounded-lg">
                    Analysera
                  </div>
                </div>
              </div>

              {/* Bokningar + Kontakter row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-3.5 border border-[#e8e8e8]">
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-5 h-5 rounded-md bg-[#f0f0f0] flex items-center justify-center">
                      <Calendar className="w-2.5 h-2.5 text-[#6e6e73]" />
                    </div>
                    <span className="text-[10px] font-semibold text-secondary-foreground">Bokningar</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 py-2">
                    <div className="w-7 h-7 rounded-xl bg-secondary flex items-center justify-center">
                      <Calendar className="w-3.5 h-3.5 text-[#c0c0c5]" />
                    </div>
                    <p className="text-[9px] text-[#8e8e93] text-center">Inga bokningar än</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-3.5 border border-[#e8e8e8]">
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-5 h-5 rounded-md bg-[#f0f0f0] flex items-center justify-center">
                      <User className="w-2.5 h-2.5 text-[#6e6e73]" />
                    </div>
                    <span className="text-[10px] font-semibold text-secondary-foreground">Kontakter</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 py-2">
                    <div className="w-7 h-7 rounded-xl bg-secondary flex items-center justify-center">
                      <User className="w-3.5 h-3.5 text-[#c0c0c5]" />
                    </div>
                    <p className="text-[9px] text-[#8e8e93] text-center">Inga kontakter än</p>
                  </div>
                </div>
              </div>

              {/* Botpersonlighet */}
              <div className="bg-white rounded-2xl p-4 border border-[#e8e8e8]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-md bg-[#f0f0f0] flex items-center justify-center">
                    <Bot className="w-2.5 h-2.5 text-[#6e6e73]" />
                  </div>
                  <span className="text-xs font-semibold text-secondary-foreground">Botpersonlighet</span>
                </div>
                <p className="text-[9px] text-[#8e8e93] mb-2">Varumärkesfärg</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg border border-[#e8e8e8]" style={{ backgroundColor: "#E8440A" }} />
                  <div className="flex-1 bg-[#fafafa] border border-[#e8e8e8] rounded-lg px-3 py-1.5 text-[10px] text-[#6e6e73] font-mono">#E8440A</div>
                </div>
              </div>

              {/* Inbäddningskod */}
              <div className="bg-white rounded-2xl p-4 border border-[#e8e8e8]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-md bg-[#f0f0f0] flex items-center justify-center">
                    <Code2 className="w-2.5 h-2.5 text-[#6e6e73]" />
                  </div>
                  <span className="text-xs font-semibold text-secondary-foreground">Inbäddningskod</span>
                </div>
                <div className="bg-secondary rounded-xl p-3 flex items-center gap-2">
                  <code className="text-[9px] font-mono text-[#E8440A] flex-1 truncate">{`<script src="…" data-customer-id="…"></script>`}</code>
                  <Check className="w-3 h-3 text-green-500 shrink-0" />
                </div>
              </div>

              {/* Spara */}
              <div className="w-full bg-[#E8440A] text-white text-xs font-medium py-3 rounded-2xl text-center">
                Spara ändringar
              </div>

            </div>
            <p className="text-center text-xs text-[#8e8e93] mt-4">Exakt vad du får tillgång till efter köpet</p>
          </div></FadeUp>

        </div>
      </div>
    </section>
  );
}
