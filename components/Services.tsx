"use client";

import { motion } from "framer-motion";
import {
  Palette,
  Globe,
  Megaphone,
  Target,
  Search,
  Rocket,
  LayoutTemplate,
  FileText,
  ArrowUpRight,
  Check,
} from "lucide-react";

const packages = [
  {
    label: "Logotyp & Hemsida",
    price: "6 000",
    description: "Logotyp + hemsida. Allt på en gång.",
    features: [
      { icon: Palette,        title: "Logotyp" },
      { icon: LayoutTemplate, title: "Designsystem" },
      { icon: Globe,          title: "Mobil design" },
      { icon: FileText,       title: "Kontaktformulär" },
      { icon: Search,         title: "SEO" },
      { icon: Rocket,         title: "Lansering" },
      { icon: Megaphone,      title: "Snabb laddning" },
      { icon: Target,         title: "Konvertering" },
    ],
    popular: true,
  },
  {
    label: "Hemsida",
    price: "4 000",
    description: "En hemsida som ser dyr ut. Fast billigare.",
    features: [
      { icon: LayoutTemplate, title: "Designsystem" },
      { icon: Globe,          title: "Mobil design" },
      { icon: FileText,       title: "Kontaktformulär" },
      { icon: Search,         title: "SEO" },
      { icon: Rocket,         title: "Lansering" },
      { icon: Megaphone,      title: "Snabb laddning" },
      { icon: Target,         title: "Konvertering" },
    ],
    popular: false,
  },
];

export default function Services() {
  return (
    <section id="tjanster" className="py-28 bg-[#fdf8e8]">
      <div className="max-w-5xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#700143]/10 border border-[#700143]/20 text-[#700143] px-4 py-2 rounded-full text-sm font-semibold mb-5">
            Priser
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a0010] mb-4">
            Välj ditt paket,{" "}
            <span className="text-gradient-brand">vi fixar resten</span>
          </h2>
          <p className="text-[#7a4060] text-lg max-w-xl mx-auto">
            Inga dolda avgifter. Inga långa processer. Bara en snygg hemsida som funkar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative bg-white rounded-3xl border shadow-xl overflow-hidden flex flex-col ${
                pkg.popular
                  ? "border-[#700143]/30 shadow-[#700143]/10"
                  : "border-[#e8d5c0] shadow-[#700143]/5"
              }`}
            >
              {pkg.popular && (
                <div className="bg-[#700143] text-[#f8edaa] text-[10px] font-bold uppercase tracking-widest text-center py-2">
                  Rekommenderas
                </div>
              )}

              <div className="px-8 pt-8 pb-8 flex flex-col gap-7 flex-1">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-[#7a4060] mb-2">
                    {pkg.label}
                  </p>
                  <div className="flex items-end gap-2 leading-none">
                    <span className="text-5xl font-extrabold text-[#1a0010] tracking-tight">
                      {pkg.price}
                    </span>
                    <span className="text-xl font-semibold text-[#7a4060] mb-1">kr</span>
                  </div>
                  <p className="text-[#7a4060]/60 text-sm mt-1.5">Engångspris. Allt ingår.</p>
                </div>

                <div className="h-px bg-[#f0ebe0]" />

                <div className="grid grid-cols-3 gap-3">
                  {pkg.features.map((f, i) => (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#fdf8e8] border border-[#f0e6d8] flex items-center justify-center group-hover:bg-[#700143]/8 group-hover:border-[#700143]/20 transition-all duration-200">
                        <f.icon className="w-5 h-5 text-[#700143]" strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-semibold text-[#7a4060] text-center leading-tight">
                        {f.title}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="h-px bg-[#f0ebe0]" />

                <div className="flex flex-col gap-2">
                  {["Gratis första möte", "Klart på 5 dagar", "Inga dolda kostnader"].map((g) => (
                    <div key={g} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#700143]/10 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-[#700143]" />
                      </div>
                      <span className="text-[#7a4060] text-sm">{g}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#kontakt"
                  className={`mt-auto flex items-center justify-center gap-2 font-bold text-base py-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                    pkg.popular
                      ? "bg-[#700143] text-[#f8edaa] shadow-md shadow-[#700143]/20 hover:bg-[#4a002c]"
                      : "bg-[#fdf8e8] text-[#700143] border border-[#700143]/20 hover:bg-[#700143]/5"
                  }`}
                >
                  Kom igång idag
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
