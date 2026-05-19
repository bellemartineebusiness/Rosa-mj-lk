"use client";

import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm, ValidationError } from "@formspree/react";

const services = [
  "Logotyp & Varumärke",
  "Hemsida",
  "Marknadsföring",
  "Målgruppsanalys",
  "AI-strategi",
  "Social Media",
  "Annat",
];

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mqejarqo");

  const inputBase =
    "w-full bg-transparent border-0 border-b border-[#d4b896] pb-3 pt-1 text-[#1a0010] placeholder-[#7a4060]/40 focus:outline-none focus:border-[#700143] transition-colors text-sm";

  return (
    <section id="kontakt" className="py-24 bg-[#fdf8e8]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#700143]/10 border border-[#700143]/20 text-[#700143] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Kontakta oss
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a0010] mb-5">
              Låt oss bygga{" "}
              <span className="text-gradient-brand">något stort</span>
              <br />
              tillsammans
            </h2>
            <p className="text-[#7a4060] text-lg mb-10 leading-relaxed">
              Berätta om ditt projekt och vi återkommer inom 24 timmar med ett
              förslag. Första konsultationen är alltid gratis.
            </p>

            <div className="flex flex-col gap-5">
              {[
                { icon: Mail,  label: "E-post",  value: "Bellemartinee.busines@gmail.com", href: "mailto:Bellemartinee.busines@gmail.com" },
                { icon: Phone, label: "Telefon", value: "+46 70 867 00 50",      href: "tel:+46708670050" },
                { icon: MapPin,label: "Plats",   value: "Stockholm, Sverige",    href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#700143]/8 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#700143]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#7a4060] uppercase tracking-wider">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="text-[#1a0010] font-medium hover:text-[#700143] transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[#1a0010] font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 p-5 bg-[#700143]/5 rounded-2xl">
              <p className="text-sm font-semibold text-[#1a0010] mb-1">
                Gratis första konsultation
              </p>
              <p className="text-sm text-[#7a4060]">
                Vi lyssnar på dina behov och ger ett skräddarsytt förslag utan
                förpliktelser och helt kostnadsfritt.
              </p>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="border border-[#1a0010]/20 rounded-2xl p-8">
            {state.succeeded ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                <div className="w-20 h-20 bg-[#700143]/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-[#700143]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a0010]">Meddelande skickat!</h3>
                <p className="text-[#7a4060] max-w-xs">
                  Tack för att du hörde av dig. Vi återkommer inom 24 timmar.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <h3 className="text-xl font-bold text-[#1a0010]">
                  Skicka ett meddelande
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                  <div>
                    <label className="block text-xs font-semibold text-[#7a4060] mb-2 uppercase tracking-wide">
                      Ditt namn *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Anna Svensson"
                      className={inputBase}
                    />
                    <ValidationError field="name" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#7a4060] mb-2 uppercase tracking-wide">
                      E-post *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="anna@foretag.se"
                      className={inputBase}
                    />
                    <ValidationError field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#7a4060] mb-2 uppercase tracking-wide">
                    Företag
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Ditt företagsnamn"
                    className={inputBase}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#7a4060] mb-2 uppercase tracking-wide">
                    Tjänst
                  </label>
                  <select name="service" className={`${inputBase} cursor-pointer`}>
                    <option value="">Välj en tjänst...</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#7a4060] mb-2 uppercase tracking-wide">
                    Meddelande *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Berätta om ditt projekt..."
                    className={`${inputBase} resize-none`}
                  />
                  <ValidationError field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="default"
                  className="w-full gap-2"
                  disabled={state.submitting}
                >
                  {state.submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#f8edaa]/30 border-t-[#f8edaa] rounded-full animate-spin" />
                      Skickar...
                    </>
                  ) : (
                    <>
                      Skicka meddelande <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-[#7a4060]">
                  Vi svarar inom 24 timmar. Ingen spam, lovar.
                </p>
              </form>
            )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
