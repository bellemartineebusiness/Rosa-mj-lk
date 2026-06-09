"use client";

import { Send, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

const services = [
  "Logotyp & Varumärke", "Hemsida", "Marknadsföring",
  "Målgruppsanalys", "AI-strategi", "Social Media", "Annat",
];

const contactItems = [
  { icon: Mail,   label: "E-post",  value: "Bellemartinee.busines@gmail.com", href: "mailto:Bellemartinee.busines@gmail.com" },
  { icon: Phone,  label: "Telefon", value: "+46 70 867 00 50",                href: "tel:+46708670050" },
  { icon: MapPin, label: "Plats",   value: "Stockholm, Sverige",               href: null },
];

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mqejarqo");

  const inputCls = "w-full bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-secondary-foreground placeholder-[#a0a0a8] focus:outline-none focus:border-[#1d1d1f] focus:ring-2 focus:ring-black/5 transition-all text-sm font-normal";

  return (
    <section id="kontakt" className="py-20 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          <div
            className="bg-[#0a0a0a] rounded-3xl p-6 md:p-10 flex flex-col h-full"
          >
            <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-white/50 mb-6">Kontakt</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight leading-tight">
              Hör av dig.
            </h2>
            <p className="text-white/70 text-xl font-normal mb-4 tracking-tight">Vi svarar snabbt.</p>
            <p className="text-white/55 text-sm font-normal mb-10 leading-relaxed max-w-xs">
              Berätta vad du behöver. Vi återkommer inom 24 timmar. Alltid gratis första gången.
            </p>

            <div className="flex flex-col gap-0 mb-10">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-center gap-4 py-4 border-b border-white/8 last:border-0">
                  <item.icon className="w-4 h-4 text-white/50 shrink-0" strokeWidth={1.5} />
                  <div className="min-w-0">
                    <p className="text-[10px] font-normal uppercase tracking-[0.15em] text-white/50 mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-white/85 text-sm font-normal hover:text-white transition-colors truncate block">{item.value}</a>
                    ) : (
                      <p className="text-white/70 text-sm font-normal">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto p-5 bg-white/5 rounded-2xl border border-white/8">
              <p className="text-sm font-medium text-white/90 mb-1">Gratis första mötet</p>
              <p className="text-sm text-white/60 font-normal leading-relaxed">
                Vi pratar igenom vad du vill ha. Inget köptvång, inga konstigheter.
              </p>
            </div>
          </div>

          <div>
            <div className="rounded-3xl p-6 md:p-10 bg-white border border-[#d0d0d0] h-full flex flex-col">
              {state.succeeded ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <div className="w-14 h-14 bg-[#f0f0f0] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-secondary-foreground">Meddelande skickat</h3>
                  <p className="text-[#6e6e73] text-sm font-normal max-w-xs">Vi återkommer inom 24 timmar.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1" suppressHydrationWarning>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-normal text-[#6e6e73] font-normal uppercase tracking-[0.15em]">Namn *</label>
                      <input type="text" name="name" required placeholder="Anna Svensson" className={inputCls} suppressHydrationWarning />
                      <ValidationError field="name" errors={state.errors} className="text-red-500 text-xs" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-normal text-[#6e6e73] font-normal uppercase tracking-[0.15em]">E-post *</label>
                      <input type="email" name="email" required placeholder="anna@foretag.se" className={inputCls} suppressHydrationWarning />
                      <ValidationError field="email" errors={state.errors} className="text-red-500 text-xs" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-normal text-[#6e6e73] font-normal uppercase tracking-[0.15em]">Företag</label>
                    <input type="text" name="company" placeholder="Ditt företagsnamn" className={inputCls} suppressHydrationWarning />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-normal text-[#6e6e73] font-normal uppercase tracking-[0.15em]">Tjänst</label>
                    <select name="service" className={`${inputCls} cursor-pointer`} suppressHydrationWarning>
                      <option value="">Välj en tjänst...</option>
                      {services.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-normal text-[#6e6e73] font-normal uppercase tracking-[0.15em]">Meddelande *</label>
                    <textarea name="message" required rows={4} placeholder="Berätta vad du vill ha..." className={`${inputCls} resize-none`} suppressHydrationWarning />
                    <ValidationError field="message" errors={state.errors} className="text-red-500 text-xs" />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="mt-1 w-full flex items-center justify-center gap-2 bg-[#E8440A] hover:bg-[#d03d09] text-white font-normal text-sm py-3.5 rounded-2xl transition-colors duration-200 hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {state.submitting ? (
                      <><span className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />Skickar...</>
                    ) : (
                      <>Skicka meddelande <Send className="w-4 h-4" /></>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-[#6e6e73] font-normal">Svar inom 24h. Ingen spam.</p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
