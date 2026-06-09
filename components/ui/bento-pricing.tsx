'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon, SparklesIcon, ArrowUpRight, Clock, Shield } from 'lucide-react';

function FilledCheck({ dark }: { dark?: boolean }) {
  return (
    <div className={cn(
      'rounded-full p-0.5 shrink-0',
      dark ? 'bg-white/20 text-white' : 'bg-foreground/8 text-foreground'
    )}>
      <CheckIcon className="size-3" strokeWidth={3} />
    </div>
  );
}

const cardBase = 'relative overflow-hidden rounded-2xl border';

export function BentoPricing() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-8">

      {/* Featured — Logotyp & Hemsida */}
      <div className={cn(cardBase, 'bg-[#0a0a0a] border-white/8 lg:col-span-5')}>
        {/* Subtilt grid-mönster */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-linear-to-br from-white/4 via-transparent to-transparent" />
          <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[28px_28px] opacity-50" />
        </div>

        <div className="relative flex items-center gap-2.5 p-5">
          <span className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-2.5 py-1 text-[9px] font-normal uppercase tracking-[0.2em] text-white/50">
            Logotyp &amp; Hemsida
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-white/20 px-2.5 py-1 text-[9px] font-normal uppercase tracking-[0.15em] text-white/65">
            <SparklesIcon className="size-2.5" /> Mest populär
          </span>
          <div className="ml-auto">
            <a href="#kontakt" className="group inline-flex items-center gap-1.5 bg-white text-[#0a0a0a] text-[13px] font-normal px-5 py-2.5 rounded-full hover:bg-white/90 transition-all duration-200">
              Kom igång
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>
        </div>

        <div className="relative flex flex-col gap-6 p-5 pt-2 lg:flex-row">
          <div className="lg:w-[35%]">
            <div className="flex items-end gap-1.5 leading-none">
              <span className="font-mono text-[3.5rem] font-semibold tracking-tight text-white leading-none">6&thinsp;000</span>
              <span className="text-white/35 text-lg mb-1">kr</span>
            </div>
            <p className="text-white/30 text-xs font-normal mt-2.5">Engångspris · Allt ingår</p>
          </div>
          <ul className="grid gap-3.5 text-sm lg:w-[65%]">
            {['Logotyp & designsystem', 'Responsiv hemsida', 'Kontaktformulär & SEO', 'Snabb laddning & konvertering', 'Lansering ingår'].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <FilledCheck dark />
                <span className="text-white/70 leading-relaxed font-normal">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-5" />
      </div>

      {/* Hemsida */}
      <div className={cn(cardBase, 'bg-white border-[#d0d0d0] lg:col-span-3')}>
        <div className="flex items-center gap-3 p-5">
          <span className="inline-flex items-center rounded-full border border-black/8 bg-secondary px-2.5 py-1 text-[9px] font-normal uppercase tracking-[0.2em] text-foreground/45">
            Hemsida
          </span>
          <div className="ml-auto">
            <a href="#kontakt" className="group inline-flex items-center gap-1.5 bg-[#0a0a0a] text-white text-[13px] font-normal px-5 py-2.5 rounded-full hover:bg-black transition-all duration-200">
              Kom igång
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>
        </div>
        <div className="px-5 pb-2 pt-1">
          <div className="flex items-end gap-1.5 leading-none">
            <span className="font-mono text-[3.5rem] font-semibold tracking-tight text-foreground leading-none">5&thinsp;000</span>
            <span className="text-foreground/35 text-lg mb-1">kr</span>
          </div>
          <p className="text-foreground/35 text-xs font-normal mt-2.5">Engångspris · Snabbt och snyggt</p>
        </div>
        <ul className="grid gap-3.5 p-5 text-sm">
          {['Responsiv hemsida', 'Kontaktformulär', 'SEO-optimering', 'Snabb laddning', 'Byggd för konvertering', 'Lansering ingår'].map((f) => (
            <li key={f} className="flex items-center gap-3">
              <FilledCheck />
              <span className="text-foreground/60 font-normal">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Leverans */}
      <div className={cn(cardBase, 'bg-white border-[#d0d0d0] lg:col-span-4')}>
        <div className="flex items-center p-5">
          <span className="inline-flex items-center rounded-full border border-black/8 bg-secondary px-2.5 py-1 text-[9px] font-normal uppercase tracking-[0.2em] text-foreground/45">
            Leverans
          </span>
        </div>
        <div className="px-5 pb-2 pt-1">
          <div className="flex items-end gap-1.5 leading-none">
            <span className="font-mono text-[3.5rem] font-semibold tracking-tight text-foreground leading-none">5</span>
            <span className="text-foreground/35 text-lg mb-1">dagar</span>
          </div>
        </div>
        <ul className="grid gap-3.5 p-5 text-sm">
          {['Gratis första mötet', 'Klart på 5 arbetsdagar', 'Inga dolda kostnader'].map((f) => (
            <li key={f} className="flex items-center gap-3">
              <Clock className="size-3.5 text-foreground/25 shrink-0" strokeWidth={1.8} />
              <span className="text-foreground/55 font-normal">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Garanti */}
      <div className={cn(cardBase, 'bg-white border-[#d0d0d0] lg:col-span-4')}>
        <div className="flex items-center p-5">
          <span className="inline-flex items-center rounded-full border border-black/8 bg-secondary px-2.5 py-1 text-[9px] font-normal uppercase tracking-[0.2em] text-foreground/45">
            Garanti
          </span>
        </div>
        <div className="px-5 pb-2 pt-1">
          <div className="flex items-end gap-1.5 leading-none">
            <span className="font-mono text-[3.5rem] font-semibold tracking-tight text-foreground leading-none">100</span>
            <span className="text-foreground/35 text-lg mb-1">%</span>
          </div>
        </div>
        <ul className="grid gap-3.5 p-5 text-sm">
          {['Nöjd-kund garanti', 'Revideringar ingår', 'Support efter lansering'].map((f) => (
            <li key={f} className="flex items-center gap-3">
              <Shield className="size-3.5 text-foreground/25 shrink-0" strokeWidth={1.8} />
              <span className="text-foreground/55 font-normal">{f}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
