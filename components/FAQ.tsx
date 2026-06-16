"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Hur betalar jag?",
    a: "Via Stripe, säker kortbetalning eller faktura. Du betalar månadsvis och kan avsluta när som helst.",
  },
  {
    q: "Behöver jag kunna koda?",
    a: "Nej. Du kopierar en rad kod och klistrar in den på din hemsida. Det tar under en minut.",
  },
  {
    q: "Var ska jag klistra in koden?",
    a: "I header eller footer på din hemsida. Vet du inte hur? Skicka koden till din webbutvecklare så fixar de det direkt.",
  },
  {
    q: "Fungerar det på min hemsida?",
    a: "Ja. Det fungerar med WordPress, Shopify, Webflow, Wix, egna hemsidor och i princip alla andra plattformar.",
  },
  {
    q: "Hur snabbt kan jag komma igång?",
    a: "Direkt efter köpet. Du får koden skickad till dig och kan sätta igång samma dag.",
  },
  {
    q: "Behöver jag installera någon app?",
    a: "Nej. Ingen app, ingen plugin. Bara en rad kod så körs allt automatiskt.",
  },
  {
    q: "Vad händer efter jag installerat det?",
    a: "Chatten dyker upp på din hemsida och börjar svara dina besökare direkt. Du behöver inte göra något.",
  },
  {
    q: "Kan jag ta bort det när jag vill?",
    a: "Ja. Ta bort kodraden så försvinner chatten direkt. Inga bindningstider.",
  },
  {
    q: "Kommer det sakta ner min hemsida?",
    a: "Nej. Koden laddas i bakgrunden och påverkar inte din hemsidas hastighet.",
  },
  {
    q: "Vad händer om jag fastnar?",
    a: "Vi hjälper dig. Kontakta oss via e-post eller Linkedin så svarar vi samma dag.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-36 bg-white">
      <div className="max-w-3xl mx-auto px-6 md:px-8">

        <div className="mb-12 md:mb-16 text-center">
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-5">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-secondary-foreground tracking-tight leading-tight">
            Vanliga frågor.
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-[#f0f0f0]">
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
        </div>

      </div>
    </section>
  );
}
