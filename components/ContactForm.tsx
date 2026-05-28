"use client";

import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, CheckCircle, MessageCircle } from "lucide-react";
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

const contactItems = [
  { icon: Mail,   label: "E-post",  value: "Bellemartinee.busines@gmail.com", href: "mailto:Bellemartinee.busines@gmail.com" },
  { icon: Phone,  label: "Telefon", value: "+46 70 867 00 50",                href: "tel:+46708670050" },
  { icon: MapPin, label: "Plats",   value: "Stockholm, Sverige",               href: null },
];

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mqejarqo");

  const inputCls =
    "w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 text-secondary-foreground placeholder-[#8e8e93] focus:outline-none focus:border-ring focus:ring-2 focus:ring-ring/10 transition-all text-sm";

  return (
    <section id="kontakt" className="py-24 bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-white border border-[#e5e5e5] text-[#6e6e73] px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <MessageCircle className="w-3.5 h-3.5" />
              Kontakt
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-foreground mb-5 tracking-tight">
              Hör av dig.{" "}
              <span className="text-gradient-brand">Vi svarar snabbt.</span>
            </h2>
            <p className="text-[#6e6e73] text-lg mb-10 leading-relaxed">
              Berätta vad du behöver. Vi återkommer inom 24 timmar med ett förslag. Alltid gratis första gången.
            </p>

            <div className="flex flex-col gap-3 mb-10">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#e5e5e5]">
                  <div className="w-10 h-10 rounded-xl bg-ring/8 flex items-center justify-center shrink-0">
                    <item.icon className="w-4.5 h-4.5 text-ring" strokeWidth={1.8} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-[#8e8e93] uppercase tracking-widest mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-secondary-foreground text-sm font-medium hover:text-ring transition-colors truncate block">{item.value}</a>
                    ) : (
                      <p className="text-secondary-foreground text-sm font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-ring/5 rounded-2xl border border-ring/10">
              <p className="text-sm font-semibold text-secondary-foreground mb-1">Gratis första mötet</p>
              <p className="text-sm text-[#6e6e73] leading-relaxed">
                Vi pratar igenom vad du vill ha. Inget köptvång, inga konstigheter.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="border border-[#e5e5e5] rounded-3xl p-8 bg-white shadow-sm">
              {state.succeeded ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                  <div className="w-20 h-20 bg-ring/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-ring" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-foreground">Meddelande skickat!</h3>
                  <p className="text-[#6e6e73] max-w-xs">Tack för att du hörde av dig. Vi återkommer inom 24 timmar.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" suppressHydrationWarning>
                  <h3 className="text-xl font-bold text-secondary-foreground mb-2">Vad vill du ha?</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#6e6e73] uppercase tracking-wide">Ditt namn *</label>
                      <input type="text" name="name" required placeholder="Anna Svensson" className={inputCls} suppressHydrationWarning />
                      <ValidationError field="name" errors={state.errors} className="text-red-500 text-xs" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#6e6e73] uppercase tracking-wide">E-post *</label>
                      <input type="email" name="email" required placeholder="anna@foretag.se" className={inputCls} suppressHydrationWarning />
                      <ValidationError field="email" errors={state.errors} className="text-red-500 text-xs" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6e6e73] uppercase tracking-wide">Företag</label>
                    <input type="text" name="company" placeholder="Ditt företagsnamn" className={inputCls} suppressHydrationWarning />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6e6e73] uppercase tracking-wide">Tjänst</label>
                    <select name="service" className={`${inputCls} cursor-pointer`} suppressHydrationWarning>
                      <option value="">Välj en tjänst...</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#6e6e73] uppercase tracking-wide">Meddelande *</label>
                    <textarea name="message" required rows={4} placeholder="Berätta vad du vill ha..." className={`${inputCls} resize-none`} suppressHydrationWarning />
                    <ValidationError field="message" errors={state.errors} className="text-red-500 text-xs" />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="mt-2 w-full flex items-center justify-center gap-2 bg-ring hover:bg-brand-primary-dark text-white font-semibold text-sm py-3.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-ring/20 disabled:opacity-60"
                  >
                    {state.submitting ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Skickar...</>
                    ) : (
                      <>Skicka meddelande <Send className="w-4 h-4" /></>
                    )}
                  </button>

                  <p className="text-center text-xs text-[#8e8e93]">Svar inom 24h. Ingen spam.</p>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
