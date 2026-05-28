"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Zap } from "lucide-react";

const stats = [
  { number: "5",     unit: "dagar", label: "leveranstid" },
  { number: "4 000", unit: "kr",    label: "startpris" },
  { number: "100",   unit: "%",     label: "nöjd garanti" },
  { number: "AI",    unit: "",      label: "driven process" },
];

export default function Statement() {
  return (
    <section className="py-36 bg-secondary">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-white border border-[#e5e5e5] text-[#6e6e73] px-4 py-2 rounded-full text-sm font-semibold">
            <Zap className="w-3.5 h-3.5" />
            Kort och gott
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.05 }}
          className="mb-14"
        >
          <h2 className="text-[clamp(2.8rem,8vw,6rem)] font-bold leading-none tracking-tight text-secondary-foreground">
            En hemsida som{" "}
            <span className="text-gradient-brand italic">faktiskt</span>{" "}
            gör jobbet.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <p className="text-[#6e6e73] text-xl leading-relaxed max-w-md">
            Du berättar vad du vill ha. Vi tar hand om design, kod och lansering. Klart på 5 dagar.
          </p>
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2.5 bg-ring text-white font-semibold px-8 py-4 rounded-full hover:bg-brand-primary-dark transition-all duration-200 shrink-0 self-start md:self-auto hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ring/20 text-base"
          >
            Kom igång
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e5e5e5] rounded-3xl overflow-hidden"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2 py-8 px-8 bg-white">
              <div className="flex items-end gap-1.5 leading-none">
                <span className="text-4xl font-bold text-secondary-foreground tracking-tight tabular-nums">
                  {stat.number}
                </span>
                {stat.unit && (
                  <span className="text-lg font-semibold text-ring mb-0.5">{stat.unit}</span>
                )}
              </div>
              <span className="text-xs text-[#8e8e93] font-medium uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
