"use client";

import PricingCardTwo from "@/components/ui/pricing-card-triple";
import { Globe, Layers, MessageCircle } from "lucide-react";

export default function Services() {
  return (
    <section id="tjanster" className="py-20 md:py-36 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        <div className="mb-10 md:mb-16 text-center">
          <p className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#8e8e93] mb-5">Priser</p>
          <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight">
            Enkelt. Transparent. Klart.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PricingCardTwo
            tone="red"
            icon={<Globe className="w-8 h-8" />}
            name="Hemsida"
            subtitle="Snabbt och snyggt"
            price="10 000 kr"
            periodLabel="· engång"
            features={[
              { label: "Responsiv hemsida" },
              { label: "Kontaktformulär & SEO" },
              { label: "Snabb laddning" },
              { label: "Lansering ingår" },
              { label: "Livslång hosting" },
              { label: "Löpande support & uppdateringar" },
            ]}
            cta={{ href: "#kontakt", label: "Kom igång" }}
          />

          <PricingCardTwo
            tone="dark"
            icon={<Layers className="w-8 h-8" />}
            name="Logotyp & Hemsida"
            subtitle="Mest populär · Allt ingår"
            price="12 000 kr"
            periodLabel="· engång"
            features={[
              { label: "Logotyp & designsystem" },
              { label: "Responsiv hemsida" },
              { label: "Kontaktformulär & SEO" },
              { label: "Lansering ingår" },
              { label: "Livslång hosting" },
              { label: "Löpande support & uppdateringar" },
            ]}
            cta={{ href: "#kontakt", label: "Kom igång" }}
          />

          <PricingCardTwo
            tone="zinc"
            icon={<MessageCircle className="w-8 h-8" />}
            name="Hemsida & Chattbot"
            subtitle="AI-driven kundservice"
            price="14 000 kr"
            periodLabel="· engång"
            features={[
              { label: "Responsiv hemsida" },
              { label: "Inbyggd AI-chattbot" },
              { label: "Kontaktformulär & SEO" },
              { label: "Lansering ingår" },
              { label: "Livslång hosting" },
              { label: "Löpande support & uppdateringar" },
            ]}
            cta={{ href: "#kontakt", label: "Kom igång" }}
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13px] text-[#8e8e93] font-normal">
          <span>Gratis första möte</span>
          <span className="text-[#d0d0d5] hidden sm:inline">·</span>
          <span>Klart på 5 dagar</span>
          <span className="text-[#d0d0d5] hidden sm:inline">·</span>
          <span>Inga dolda kostnader</span>
        </div>

      </div>
    </section>
  );
}
