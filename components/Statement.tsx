"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Statement() {
  return (
    <section className="py-32 bg-[#1a0010] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-10">

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#f8edaa]/50 text-sm font-bold uppercase tracking-[0.2em] mb-6">
              Kort och gott
            </p>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#f8edaa] leading-[1.05] tracking-tight max-w-4xl">
              Din hemsida ska sälja. Inte bara se bra ut.
            </h2>
            <p className="mt-5 text-[#f8edaa]/40 text-base font-semibold uppercase tracking-[0.18em]">
              Egen design · Byggd för konvertering
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <p className="text-[#f8edaa]/60 text-lg md:text-xl leading-relaxed max-w-lg">
              Du berättar vad du vill ha. Vi fixar resten — design, kod, lansering. Klart på 5 dagar.
            </p>

            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-[#f8edaa] text-[#700143] font-bold px-8 py-4 rounded-2xl hover:bg-white transition-all duration-200 shrink-0 self-start md:self-auto"
            >
              Kom igång idag
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-px bg-[#f8edaa]/10 mt-4"
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "5 dagar", label: "Leveranstid" },
              { number: "4 000", label: "Från kr" },
              { number: "100%", label: "Nöjd garanti" },
              { number: "AI", label: "Driven process" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-3xl font-extrabold text-[#f8edaa]">{stat.number}</span>
                <span className="text-sm text-[#f8edaa]/40 font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
