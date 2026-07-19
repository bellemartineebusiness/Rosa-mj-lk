"use client";

import { Typewriter } from "@/components/ui/typewriter";
import FadeUp from "@/components/FadeUp";

export default function TextDisclaimer() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <FadeUp><div className="rounded-3xl overflow-hidden bg-[#e0e0e0]">
          <div className="px-6 py-10 md:px-12 md:py-16 flex flex-col items-center text-center">
            <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-secondary-foreground/40 mb-8">Vårt motto</p>

            <div className="mb-6">
              <span className="text-4xl md:text-5xl font-semibold text-secondary-foreground tracking-tight">
                <Typewriter
                  text={["Bokningar.", "Prislista.", "Öppettider.", "Kundservice."]}
                  speed={60}
                  deleteSpeed={35}
                  waitTime={1800}
                  cursorChar="|"
                  cursorClassName="ml-1 text-secondary-foreground/40"
                />
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-semibold text-secondary-foreground leading-tight tracking-tight mb-6">
              Du pratar.{" "}
              <span className="text-secondary-foreground/60 font-normal">Vi automatiserar.</span>
            </h2>

            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-secondary-foreground text-white text-sm font-normal px-6 py-3 rounded-full hover:bg-black transition-colors duration-200"
            >
              Kom igång
            </a>
          </div>
        </div></FadeUp>
      </div>
    </section>
  );
}
