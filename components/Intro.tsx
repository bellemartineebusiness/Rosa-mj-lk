"use client";

import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { tx } from "@/lib/translations";

export default function Intro() {
  const { lang } = useLang();
  const t = tx(lang).intro;

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          <div>
            <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-6">{t.tag}</p>
            <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight mb-6">
              {t.heading}<br />
              <span className="text-secondary-foreground/50 font-normal">{t.subheading}</span>
            </h2>
            <p className="text-[#6e6e73] text-lg font-normal leading-relaxed mb-8 max-w-sm">
              {t.body}
            </p>
            <a
              href="#tjanster"
              className="group inline-flex items-center gap-2 bg-[#E8440A] text-white font-normal px-7 py-3.5 rounded-full hover:bg-[#d03d09] transition-colors duration-200 text-sm"
            >
              {t.cta}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          <div className="flex flex-col gap-4">
            {t.items.map((item) => (
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
