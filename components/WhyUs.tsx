"use client";

import { Check, X, User } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { tx } from "@/lib/translations";

export default function WhyUs() {
  const { lang } = useLang();
  const t = tx(lang).whyUs;
  const ca = t.costAnalysis;
  const cmp = t.comparison;
  const wu = t.whyUs;

  return (
    <section className="py-20 md:py-36 bg-[#f5f5f7]">
      <div className="max-w-5xl mx-auto px-6 md:px-8 flex flex-col gap-20">

        <div>
          <p className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#8e8e93] mb-5 text-center">{ca.tag}</p>
          <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight text-center mb-4">
            {ca.heading}
          </h2>
          <p className="text-center text-[#6e6e73] text-lg font-normal max-w-xl mx-auto mb-12">
            {ca.body}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0a0a0a] rounded-3xl p-7 flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-white/70" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{ca.employee.title}</p>
                  <p className="text-white/40 text-xs">{ca.employee.subtitle}</p>
                </div>
              </div>
              {ca.employee.costs.map((item) => (
                <div key={item.label} className="flex items-center justify-between border-b border-white/8 pb-3 last:border-0 last:pb-0">
                  <span className="text-white/60 text-sm">{item.label}</span>
                  <span className="text-white text-sm font-medium">{item.value}</span>
                </div>
              ))}
              <div className="mt-2 pt-4 border-t border-white/15 flex items-center justify-between">
                <span className="text-white/80 text-sm font-medium">{ca.employee.totalLabel}</span>
                <span className="text-white text-xl font-semibold">{ca.employee.total}</span>
              </div>
              <p className="text-white/30 text-xs">{ca.employee.note}</p>
            </div>

            <div className="bg-white rounded-3xl p-7 flex flex-col gap-4 border border-[#c8c8ce]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#E8440A]/10 flex items-center justify-center">
                  <span className="text-[#E8440A] text-xs font-semibold">AI</span>
                </div>
                <div>
                  <p className="text-secondary-foreground font-semibold text-sm">{ca.bot.title}</p>
                  <p className="text-[#8e8e93] text-xs">{ca.bot.subtitle}</p>
                </div>
              </div>
              {ca.bot.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between border-b border-[#d8d8d8] pb-3 last:border-0 last:pb-0">
                  <span className="text-[#6e6e73] text-sm">{item.label}</span>
                  <span className="text-secondary-foreground text-sm font-medium">{item.value}</span>
                </div>
              ))}
              <div className="mt-2 pt-4 border-t border-[#f0f0f0] flex items-center justify-between">
                <span className="text-secondary-foreground text-sm font-medium">{ca.bot.totalLabel}</span>
                <span className="text-[#E8440A] text-xl font-semibold">{ca.bot.total}</span>
              </div>
              <div className="bg-[#E8440A]/8 rounded-2xl px-4 py-3">
                <p className="text-[#E8440A] text-sm font-medium">{ca.bot.savings}</p>
                <p className="text-[#6e6e73] text-xs mt-0.5">{ca.bot.savingsNote}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#8e8e93] mb-5 text-center">{cmp.tag}</p>
          <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight text-center mb-12">
            {cmp.heading}
          </h2>
          <div className="bg-white rounded-3xl border border-[#e8e8e8] overflow-hidden">
            <div className="grid grid-cols-3 bg-[#f5f5f7] px-6 py-3 border-b border-[#e8e8e8]">
              <span className="text-xs font-normal uppercase tracking-[0.15em] text-[#8e8e93] col-span-1">{cmp.col1}</span>
              <span className="text-xs font-normal uppercase tracking-[0.15em] text-[#8e8e93] text-center">{cmp.col2}</span>
              <span className="text-xs font-normal uppercase tracking-[0.15em] text-[#E8440A] text-center">{cmp.col3}</span>
            </div>
            {cmp.rows.map((label, i) => (
              <div key={i} className="grid grid-cols-3 px-6 py-4 border-b border-[#f5f5f7] last:border-0 items-center">
                <span className="text-sm text-secondary-foreground">{label}</span>
                <div className="flex justify-center">
                  <X className="w-4 h-4 text-[#8e8e93]" />
                </div>
                <div className="flex justify-center">
                  <Check className="w-4 h-4 text-[#E8440A]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#e0e0e0] rounded-3xl p-8 md:p-12">
          <p className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#8e8e93] mb-5 text-center">{wu.tag}</p>
          <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight text-center mb-12">
            {wu.heading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
            {wu.items.map((item) => (
              <div key={item.title}>
                <p className="text-base font-semibold text-secondary-foreground mb-1.5">{item.title}</p>
                <p className="text-sm text-[#6e6e73] font-normal leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
