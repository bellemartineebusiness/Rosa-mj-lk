"use client";

import { useState } from "react";
import { X, Loader } from "lucide-react";
import PricingCardTwo from "@/components/ui/pricing-card-triple";
import { Globe, Layers, MessageCircle } from "lucide-react";
import { useLang } from "@/contexts/LangContext";
import { tx } from "@/lib/translations";

export default function Services() {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { lang } = useLang();
  const t = tx(lang).services;

  function openModal() { setModal(true); setEmail(""); setError(""); }
  function closeModal() { setModal(false); setEmail(""); setError(""); }

  async function handleCheckout() {
    if (!email.trim()) { setError(t.modal.errorEmpty); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(t.modal.errorInvalid); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, priceId: "starter" }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) { setError(data.error ?? t.modal.errorFail); return; }
      window.location.href = data.url;
    } catch {
      setError(t.modal.errorNetwork);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section id="tjanster" className="py-20 md:py-36 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8">

          <div className="mb-10 md:mb-16 text-center">
            <p className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#8e8e93] mb-5">{t.tag}</p>
            <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight">
              {t.heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PricingCardTwo
              tone="red"
              icon={<MessageCircle className="w-8 h-8" />}
              name="Starter"
              subtitle={t.starter.subtitle}
              price={t.starter.price}
              originalPrice={t.starter.originalPrice}
              periodLabel={t.starter.period}
              features={t.starter.features.map((f) => ({ label: f }))}
              cta={{ onClick: openModal, label: t.cta }}
            />

            <PricingCardTwo
              tone="dark"
              icon={<Layers className="w-8 h-8" />}
              name="Growth"
              subtitle={t.growth.subtitle}
              price={t.growth.price}
              periodLabel={t.growth.period}
              features={t.growth.features.map((f) => ({ label: f }))}
              cta={{ disabled: true, label: t.comingSoon } as any}
            />

            <PricingCardTwo
              tone="zinc"
              icon={<Globe className="w-8 h-8" />}
              name="Pro"
              subtitle={t.pro.subtitle}
              price={t.pro.price}
              periodLabel={t.pro.period}
              features={t.pro.features.map((f) => ({ label: f }))}
              cta={{ disabled: true, label: t.comingSoon } as any}
            />
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13px] text-[#8e8e93] font-normal">
            {t.footer.map((item, i) => (
              <>
                {i > 0 && <span key={`dot-${i}`} className="text-[#d0d0d5] hidden sm:inline">·</span>}
                <span key={item}>{item}</span>
              </>
            ))}
          </div>

        </div>
      </section>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/40 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl shadow-black/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-1">{t.modal.tag}</p>
                <h3 className="text-xl font-semibold text-secondary-foreground">Starter</h3>
              </div>
              <button onClick={closeModal} className="text-[#8e8e93] hover:text-secondary-foreground transition-colors mt-0.5">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-normal uppercase tracking-[0.15em] text-[#6e6e73]">{t.modal.emailLabel}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleCheckout()}
                placeholder={t.modal.emailPlaceholder}
                autoFocus
                className="w-full bg-secondary border border-transparent rounded-xl px-4 py-3 text-sm text-secondary-foreground placeholder-[#a0a0a8] focus:outline-none focus:border-secondary-foreground focus:ring-2 focus:ring-black/5 transition-all"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#E8440A] hover:bg-[#d03d09] disabled:opacity-60 text-white text-sm font-normal py-3.5 rounded-full transition-colors mt-1"
              >
                {loading ? <><Loader className="w-4 h-4 animate-spin" /> {t.modal.loading}</> : t.modal.submit}
              </button>
            </div>
            <p className="text-xs text-[#8e8e93] text-center mt-5">{t.modal.trust}</p>
          </div>
        </div>
      )}
    </>
  );
}
