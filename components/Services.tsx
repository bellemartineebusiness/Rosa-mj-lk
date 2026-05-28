"use client";

import { motion } from "framer-motion";
import { Check, ArrowUpRight, Tag } from "lucide-react";

const packages = [
  {
    label: "Logotyp & Hemsida",
    price: "5 000",
    tagline: "Allt på en gång",
    features: [
      "Logotyp & designsystem",
      "Responsiv hemsida",
      "Kontaktformulär",
      "SEO-optimering",
      "Snabb laddning",
      "Byggd för konvertering",
      "Lansering ingår",
    ],
    popular: true,
  },
  {
    label: "Hemsida",
    price: "4 000",
    tagline: "Snabbt och snyggt",
    features: [
      "Responsiv hemsida",
      "Kontaktformulär",
      "SEO-optimering",
      "Snabb laddning",
      "Byggd för konvertering",
      "Lansering ingår",
    ],
    popular: false,
  },
];

const guarantees = ["Gratis första möte", "Klart på 5 dagar", "Inga dolda kostnader"];

export default function Services() {
  return (
    <section id="tjanster" className="py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-secondary border border-[#e5e5e5] text-[#6e6e73] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Tag className="w-3.5 h-3.5" />
            Priser
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-4 tracking-tight">
            Välj ditt paket,{" "}
            <span className="text-gradient-brand">vi fixar resten</span>
          </h2>
          <p className="text-[#6e6e73] text-lg max-w-xl mx-auto">
            Inga dolda avgifter. Inga långa processer. Bara en snygg hemsida som funkar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-3xl border overflow-hidden flex flex-col ${
                pkg.popular
                  ? "bg-ring border-ring shadow-2xl shadow-ring/20"
                  : "bg-white border-[#e5e5e5] shadow-sm"
              }`}
            >
              {pkg.popular && (
                <div className="text-white/70 text-[10px] font-semibold uppercase tracking-widest text-center py-2.5 border-b border-white/15">
                  Rekommenderas
                </div>
              )}

              <div className="px-8 pt-8 pb-8 flex flex-col gap-6 flex-1">
                <div>
                  <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${
                    pkg.popular ? "text-white/60" : "text-[#8e8e93]"
                  }`}>
                    {pkg.label}
                  </p>
                  <div className="flex items-end gap-1.5 leading-none mb-1">
                    <span className={`text-5xl font-bold tracking-tight ${
                      pkg.popular ? "text-white" : "text-secondary-foreground"
                    }`}>
                      {pkg.price}
                    </span>
                    <span className={`text-xl font-medium mb-1 ${
                      pkg.popular ? "text-white/60" : "text-[#8e8e93]"
                    }`}>kr</span>
                  </div>
                  <p className={`text-sm mt-1 ${
                    pkg.popular ? "text-white/50" : "text-[#8e8e93]"
                  }`}>
                    Engångspris · {pkg.tagline}
                  </p>
                </div>

                <div className={`h-px ${pkg.popular ? "bg-white/15" : "bg-[#e5e5e5]"}`} />

                <div className="flex flex-col gap-3 flex-1">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                        pkg.popular ? "bg-white/20" : "bg-ring/10"
                      }`}>
                        <Check className={`w-3 h-3 ${
                          pkg.popular ? "text-white" : "text-ring"
                        }`} strokeWidth={2.5} />
                      </div>
                      <span className={`text-sm ${
                        pkg.popular ? "text-white/85" : "text-secondary-foreground"
                      }`}>{f}</span>
                    </div>
                  ))}
                </div>

                <div className={`h-px ${pkg.popular ? "bg-white/15" : "bg-[#e5e5e5]"}`} />

                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {guarantees.map((g) => (
                    <span key={g} className={`text-xs font-medium ${
                      pkg.popular ? "text-white/50" : "text-[#8e8e93]"
                    }`}>
                      {g}
                    </span>
                  ))}
                </div>

                <a
                  href="#kontakt"
                  className={`mt-1 flex items-center justify-center gap-2 font-semibold text-sm py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 ${
                    pkg.popular
                      ? "bg-white text-ring hover:bg-white/90 hover:shadow-lg"
                      : "bg-ring text-white hover:bg-brand-primary-dark hover:shadow-lg hover:shadow-ring/20"
                  }`}
                >
                  Kom igång
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
