"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import FadeUp from "@/components/FadeUp";

const faqs = [
  {
    q: "Kan boten ta emot bokningar?",
    a: "Ja. Kunden väljer tjänst, datum och tid direkt i chatten. Du får ett mail med alla uppgifter och kan lägga in det i din kalender med ett klick.",
  },
  {
    q: "Kan boten visa min prislista?",
    a: "Ja. Du lägger in dina tjänster och priser i dashboarden, och boten svarar korrekt på alla prisfrågor direkt.",
  },
  {
    q: "Fungerar det på min hemsida?",
    a: "Ja. Det fungerar med WordPress, Shopify, Webflow, Wix, egna hemsidor och i princip alla andra plattformar.",
  },
  {
    q: "Behöver jag kunna koda?",
    a: "Nej. Du behöver inte göra något tekniskt. Vi sköter installationen på din salong hemsida åt dig.",
  },
  {
    q: "Hur snabbt kan jag komma igång?",
    a: "Direkt efter köpet. Du fyller i din salong i dashboarden och vi installerar boten på din hemsida samma dag.",
  },
  {
    q: "Vad kan boten svara på?",
    a: "Priser, öppettider, tjänster, hur man bokar och allt annat du lägger in. Boten gissar aldrig och hittar inte på svar.",
  },
  {
    q: "Behöver jag installera någon app?",
    a: "Nej. Ingen app, ingen plugin. Vi installerar allt och det körs automatiskt.",
  },
  {
    q: "Kan jag ta bort det när jag vill?",
    a: "Ja. Hör av dig så tar vi bort installationen direkt. Inga bindningstider.",
  },
  {
    q: "Hur betalar jag?",
    a: "Via Stripe, säker kortbetalning. Du betalar månadsvis och kan avsluta när som helst.",
  },
  {
    q: "Vad händer om jag fastnar?",
    a: "Vi hjälper dig. Kontakta oss via e-post eller LinkedIn så svarar vi samma dag.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-36 bg-white">
      <div className="max-w-3xl mx-auto px-6 md:px-8">

        <FadeUp><div className="mb-12 md:mb-16 text-center">
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-5">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-secondary-foreground tracking-tight leading-tight">
            Vanliga frågor.
          </h2>
        </div></FadeUp>

        <FadeUp delay={0.1}><div className="flex flex-col divide-y divide-[#f0f0f0]">
          {faqs.map((faq, i) => (
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
        </div></FadeUp>

      </div>
    </section>
  );
}
