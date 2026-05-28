"use client";

import { motion } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";

export default function TextDisclaimer() {
  return (
    <section className="py-24 bg-secondary border-y border-[#e5e5e5]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8e8e93] mb-8">
            Vårt motto
          </p>

          <div className="h-20 flex items-center justify-center mb-8">
            <span className="text-5xl md:text-6xl font-bold text-secondary-foreground">
              <Typewriter
                text={["Logotyp.", "Hemsida.", "Varumärke.", "Konvertering."]}
                speed={60}
                deleteSpeed={35}
                waitTime={1800}
                cursorChar="|"
                cursorClassName="ml-1 text-[#0071e3]"
              />
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground leading-tight max-w-3xl mx-auto">
            Du pratar.{" "}
            <span className="text-gradient-brand">Vi bygger.</span>
          </h2>
          <p className="mt-6 text-[#6e6e73] text-lg max-w-xl mx-auto leading-relaxed">
            Texterna behöver inte vara perfekta. Berätta vad du vill ha sagt via några screenshots eller lösa anteckningar. Vi formar det till något som låter precis som dig.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
