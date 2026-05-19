"use client";

import { motion } from "framer-motion";
import { ImageComparison } from "@/components/ui/image-comparison-slider";

const examples = [
  {
    title: "Restaurang Solsidan",
    category: "Logotyp & Hemsida",
    before: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop&q=80",
  },
  {
    title: "Bloom Skincare",
    category: "Varumärke & E-handel",
    before: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=500&fit=crop&q=80",
    after: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=500&fit=crop&q=80",
  },
];

export default function BeforeAfter() {
  return (
    <section id="resultat" className="py-24 bg-[#fdf8e8]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#700143]/10 border border-[#700143]/20 text-[#700143] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Före &amp; efter
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a0010] mb-4">
              Se skillnaden{" "}
              <span className="text-gradient-brand">vi skapar</span>
            </h2>
            <p className="text-[#7a4060] text-lg max-w-2xl mx-auto">
              Dra i reglaget och se hur vi förvandlar varumärken från ogenomtänkta
              till professionella och minnesvärda.
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-16">
          {examples.map((example, i) => (
            <motion.div
              key={example.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-[#700143] rounded-full" />
                <div>
                  <h3 className="font-bold text-lg text-[#1a0010]">{example.title}</h3>
                  <p className="text-sm text-[#7a4060]">{example.category}</p>
                </div>
              </div>
              <ImageComparison
                beforeImage={example.before}
                afterImage={example.after}
                altBefore={`${example.title} före`}
                altAfter={`${example.title} efter`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
