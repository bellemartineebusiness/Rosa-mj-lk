"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { tx } from "@/lib/translations";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { lang } = useLang();
  const t = tx(lang).faq;

  return (
    <section id="faq" className="py-20 md:py-36 bg-white">
      <div className="max-w-3xl mx-auto px-6 md:px-8">

        <div className="mb-12 md:mb-16 text-center">
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-5">{t.tag}</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-secondary-foreground tracking-tight leading-tight">
            {t.heading}
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-[#f0f0f0]">
          {t.items.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left gap-4 group"
              >
                <span className="text-sm font-medium text-secondary-foreground group-hover:text-[#3a3a3c] transition-colors">
                  {faq.q}
                </span>
                <span className="shrink-0 w-5 h-5 flex items-center justify-center text-[#8e8e93]">
                  {open === i ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>
              {open === i && (
                <p className="pb-5 text-sm text-[#6e6e73] font-normal leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
