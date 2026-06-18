"use client";

import { useLang } from "@/contexts/LangContext";
import { tx } from "@/lib/translations";

export default function HowItWorks() {
  const { lang } = useLang();
  const t = tx(lang).howItWorks;

  return (
    <section className="py-14 bg-white border-b border-[#f0f0f0]">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        <div className="mb-10">
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-3">{t.tag}</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-secondary-foreground tracking-tight">
            {t.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 items-start">
          {t.steps.map((step, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#E8440A] flex items-center justify-center text-white text-[10px] font-semibold shrink-0">{i + 1}</span>
                <span className="text-sm font-medium text-secondary-foreground">{step.title}</span>
              </div>
              <p className="text-xs text-[#6e6e73] font-normal leading-relaxed pl-8">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="#faq"
            className="inline-flex items-center gap-2 border border-[#e8e8e8] rounded-xl px-5 py-3 text-sm font-normal text-[#6e6e73] hover:text-secondary-foreground hover:border-[#d0d0d0] transition-colors duration-200"
          >
            {t.link}
          </a>
        </div>

      </div>
    </section>
  );
}
