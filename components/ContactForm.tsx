"use client";

import { Send, Mail, MapPin, CheckCircle } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { useLang } from "@/contexts/LangContext";
import { tx } from "@/lib/translations";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mqejarqo");
  const { lang } = useLang();
  const t = tx(lang).contact;

  const contactItems = [
    { icon: Mail,   label: "Info",    value: "info@bellemartinee.se",    href: "mailto:info@bellemartinee.se" },
    { icon: Mail,   label: "Sales",   value: "sales@bellemartinee.se",   href: "mailto:sales@bellemartinee.se" },
    { icon: Mail,   label: "Support", value: "support@bellemartinee.se", href: "mailto:support@bellemartinee.se" },
    { icon: MapPin, label: lang === "en" ? "Location" : "Plats", value: t.location, href: null },
  ];

  const inputCls = "w-full bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-secondary-foreground placeholder-[#a0a0a8] focus:outline-none focus:border-secondary-foreground focus:ring-2 focus:ring-black/5 transition-all text-sm font-normal";

  return (
    <section id="kontakt" className="py-20 md:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          <div className="bg-[#0a0a0a] rounded-3xl p-6 md:p-10 flex flex-col h-full">
            <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-white/50 mb-6">{t.tag}</p>
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-4 tracking-tight leading-tight">
              {t.heading}
            </h2>
            <p className="text-white/70 text-xl font-normal mb-4 tracking-tight">{t.subheading}</p>
            <p className="text-white/55 text-sm font-normal mb-10 leading-relaxed max-w-xs">
              {t.body}
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

            <div className="mt-auto flex flex-col gap-3">
              <div className="p-5 bg-white/5 rounded-2xl border border-white/8">
                <p className="text-sm font-medium text-white/90 mb-1">{t.directTitle}</p>
                <p className="text-sm text-white/60 font-normal leading-relaxed">{t.directBody}</p>
              </div>

              <a
                href="#tjanster"
                className="group flex items-center justify-between p-5 bg-[#E8440A]/10 hover:bg-[#E8440A]/20 rounded-2xl border border-[#E8440A]/25 transition-all duration-200"
              >
                <div>
                  <p className="text-sm font-medium text-white/90 mb-0.5">{t.buyTitle}</p>
                  <p className="text-xs text-white/50 font-normal">{t.buyBody}</p>
                </div>
                <span className="text-[#E8440A] text-lg group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>
          </div>

          <div>
            <div className="rounded-3xl p-6 md:p-10 bg-white border border-[#c8c8ce] h-full flex flex-col">
              {state.succeeded ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-14 h-14 bg-[#f0f0f0] rounded-full flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-secondary-foreground">{t.successHeading}</h3>
                  <p className="text-[#6e6e73] text-sm font-normal max-w-xs">{t.successBody}</p>
                </div>
              ) : (
                <>
                  <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-6">{t.formTag}</p>
                  <h2 className="text-4xl md:text-5xl font-semibold text-secondary-foreground mb-4 tracking-tight leading-tight">
                    {t.formHeading}
                  </h2>
                  <p className="text-[#6e6e73] text-xl font-normal mb-4 tracking-tight">{t.formSubheading}</p>
                  <p className="text-[#8e8e93] text-sm font-normal mb-8 leading-relaxed max-w-xs">
                    {t.formBody}
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1" suppressHydrationWarning>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-normal text-[#6e6e73] uppercase tracking-[0.15em]">{t.labelName}</label>
                        <input type="text" name="name" required placeholder={t.placeholderName} className={inputCls} suppressHydrationWarning />
                        <ValidationError field="name" errors={state.errors} className="text-red-500 text-xs" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-normal text-[#6e6e73] uppercase tracking-[0.15em]">{t.labelEmail}</label>
                        <input type="email" name="email" required placeholder={t.placeholderEmail} className={inputCls} suppressHydrationWarning />
                        <ValidationError field="email" errors={state.errors} className="text-red-500 text-xs" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-normal text-[#6e6e73] uppercase tracking-[0.15em]">{t.labelCompany}</label>
                      <input type="text" name="company" placeholder={t.placeholderCompany} className={inputCls} suppressHydrationWarning />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-normal text-[#6e6e73] uppercase tracking-[0.15em]">{t.labelService}</label>
                      <select name="service" className={`${inputCls} cursor-pointer`} suppressHydrationWarning>
                        <option value="">{t.serviceDefault}</option>
                        {t.services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-normal text-[#6e6e73] uppercase tracking-[0.15em]">{t.labelMessage}</label>
                      <textarea name="message" required rows={3} placeholder={t.placeholderMessage} className={`${inputCls} resize-none`} suppressHydrationWarning />
                      <ValidationError field="message" errors={state.errors} className="text-red-500 text-xs" />
                    </div>

                    <div className="mt-auto pt-2">
                      <button
                        type="submit"
                        disabled={state.submitting}
                        className="w-full flex items-center justify-center gap-2 bg-[#E8440A] hover:bg-[#d03d09] text-white font-normal text-sm py-3.5 rounded-2xl transition-colors duration-200 hover:-translate-y-0.5 disabled:opacity-50"
                      >
                        {state.submitting ? (
                          <><span className="w-4 h-4 border border-white/30 border-t-white rounded-full animate-spin" />{t.submitting}</>
                        ) : (
                          <>{t.submitBtn} <Send className="w-4 h-4" /></>
                        )}
                      </button>
                      <p className="text-center text-[11px] text-[#8e8e93] font-normal mt-3">{t.trust}</p>
                    </div>

                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
