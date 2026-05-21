"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sara Lindström",
    role: "Grundare, Bloom Skincare",
    avatar: "SL",
    quote:
      "Belle Martineé förvandlade vårt varumärke på under en vecka. Logotypen, hemsidan och hela känslan är exakt vad vi drömt om. Bästa investeringen vi gjort.",
    stars: 5,
  },
  {
    name: "Erik Johansson",
    role: "VD, Restaurang Solsidan",
    avatar: "EJ",
    quote:
      "Vi fick en hemsida som faktiskt konverterar. Bokningarna ökade med 40% första månaden. Servicen var snabb och resultatet proffsigt.",
    stars: 5,
  },
  {
    name: "Mia Chen",
    role: "E-handlare, MiaModa",
    avatar: "MC",
    quote:
      "Deras AI-analys av vår målgrupp var ögonöppnande. Vi förstår nu exakt vem vi pratar till och hur. ROI på marknadsföringen har fördubblats.",
    stars: 5,
  },
  {
    name: "Jonas Berg",
    role: "Coach & Föreläsare",
    avatar: "JB",
    quote:
      "Snabbt, professionellt och kreativt. Mitt personliga varumärke känns nu starkt och konsekvent på alla plattformar. Rekommenderar varmt!",
    stars: 5,
  },
  {
    name: "Anna Karlsson",
    role: "Tandläkare, Leende Kliniken",
    avatar: "AK",
    quote:
      "Äntligen en byrå som förstår sig på lokal marknadsföring. Vår Google-ranking har skjutit i höjden och nya patienter hittar oss varje dag.",
    stars: 5,
  },
  {
    name: "David Nilsson",
    role: "Startup-grundare",
    avatar: "DN",
    quote:
      "På 48 timmar hade vi en komplett brand identity redo för investerarpresentationen. Imponerande leveranshastighet utan att tumma på kvaliteten.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="omdomen" className="py-24 bg-[#700143]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#f8edaa]/15 border border-[#f8edaa]/25 text-[#f8edaa] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Omdömen
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#f8edaa] mb-4">
              De som redan{" "}
              <span className="text-gradient-light">vågade satsa</span>
            </h2>
            <p className="text-[#f8edaa]/70 text-lg max-w-2xl mx-auto">
              Över 120 företag har redan testat oss. Här är vad de säger.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-[#f8edaa]/8 border border-[#f8edaa]/15 rounded-2xl p-6 flex flex-col gap-4 hover:bg-[#f8edaa]/12 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <span key={s} className="text-[#f8edaa] text-base">★</span>
                ))}
              </div>

              <p className="text-[#f8edaa]/90 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-2 border-t border-[#f8edaa]/15">
                <div className="w-10 h-10 rounded-full bg-[#f8edaa]/20 flex items-center justify-center text-[#f8edaa] text-xs font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-[#f8edaa] font-semibold text-sm">{t.name}</p>
                  <p className="text-[#f8edaa]/60 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "120+", label: "Kunder" },
            { value: "4.9", label: "Betyg" },
            { value: "5 dagar", label: "Leveranstid" },
            { value: "98%", label: "Kommer tillbaka" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-extrabold text-[#f8edaa] mb-1">{stat.value}</p>
              <p className="text-[#f8edaa]/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
