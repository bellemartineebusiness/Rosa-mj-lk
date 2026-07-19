"use client";

import { useState } from "react";
import { X, Loader } from "lucide-react";
import PricingCardTwo from "@/components/ui/pricing-card-triple";
import { Globe, Layers, MessageCircle } from "lucide-react";
import FadeUp from "@/components/FadeUp";

export default function Services() {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function openModal() { setModal(true); setEmail(""); setError(""); }
  function closeModal() { setModal(false); setEmail(""); setError(""); }

  async function handleCheckout() {
    if (!email.trim()) { setError("Ange din e-postadress."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Ogiltig e-postadress."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, priceId: "starter" }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) { setError(data.error ?? "Något gick fel."); return; }
      window.location.href = data.url;
    } catch {
      setError("Kunde inte nå betalningssidan. Försök igen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section id="tjanster" className="py-20 md:py-36 bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8">

          <FadeUp><div className="mb-10 md:mb-16 text-center">
            <p className="text-[11px] font-normal uppercase tracking-[0.25em] text-[#8e8e93] mb-5">Priser</p>
            <h2 className="text-4xl md:text-[3.25rem] font-semibold text-secondary-foreground tracking-tight leading-tight mb-6">
              Enkelt. Transparent. Klart.
            </h2>
            <div className="inline-flex flex-col items-center gap-2 bg-[#fff8f5] border border-[#E8440A]/20 rounded-2xl px-8 py-5 max-w-lg mx-auto">
              <p className="text-base font-semibold text-secondary-foreground tracking-tight">Prova AI-chatboten gratis i 30 dagar.</p>
              <p className="text-sm text-[#6e6e73] font-normal leading-relaxed text-center">
                Efter 30 dagar dras 1 599 kr/mån automatiskt. Avsluta när som helst innan dess och du betalar ingenting.
              </p>
            </div>
          </div></FadeUp>

          <FadeUp delay={0.1}><div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PricingCardTwo
              tone="red"
              icon={<MessageCircle className="w-8 h-8" />}
              name="Starter"
              subtitle="Kom igång direkt"
              price="1 599 kr"
              periodLabel="/ mån"
              features={[
                { label: "Gratis installation & onboarding" },
                { label: "AI-kundservice 24/7" },
                { label: "Leadinsamling & bokningar" },
                { label: "Tränad på ditt innehåll" },
                { label: "1 000 meddelanden/mån" },
                { label: "Personlig dashboard" },
                { label: "Support & optimering" },
              ]}
              cta={{ onClick: openModal, label: "Starta gratis" }}
            />

            <PricingCardTwo
              tone="dark"
              icon={<Layers className="w-8 h-8" />}
              name="Growth"
              subtitle="Komplett lösning"
              price="2 999 kr"
              periodLabel="/ mån"
              features={[
                { label: "Allt i Starter" },
                { label: "15 000 meddelanden/mån" },
                { label: "AI kvalificerar & följer upp leads" },
                { label: "CRM & Google Sheets" },
                { label: "Automatisk kalenderbokning" },
                { label: "Avancerad statistik" },
                { label: "Prioriterad support" },
              ]}
              cta={{ disabled: true, label: "Kommer snart" } as any}
            />

            <PricingCardTwo
              tone="zinc"
              icon={<Globe className="w-8 h-8" />}
              name="Pro"
              subtitle="Enterprise-lösning"
              price="4 999 kr"
              periodLabel="/ mån"
              features={[
                { label: "Allt i Growth" },
                { label: "Hög användning (Fair Use)" },
                { label: "Anpassade integrationer" },
                { label: "Flera AI-assistenter" },
                { label: "SLA & driftsgaranti" },
                { label: "Ta bort Belle Martineé loggan" },
                { label: "Dedikerad support" },
              ]}
              cta={{ disabled: true, label: "Kommer snart" } as any}
            />
          </div></FadeUp>

          <FadeUp delay={0.2}><div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13px] text-[#8e8e93] font-normal">
            <span>30 dagar gratis</span>
            <span className="text-[#d0d0d5] hidden sm:inline">·</span>
            <span>Inga dolda kostnader</span>
          </div></FadeUp>

        </div>
      </section>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-black/40 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl shadow-black/10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-1">Kom igång med</p>
                <h3 className="text-xl font-semibold text-secondary-foreground">Starter</h3>
              </div>
              <button onClick={closeModal} className="text-[#8e8e93] hover:text-secondary-foreground transition-colors mt-0.5">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-normal uppercase tracking-[0.15em] text-[#6e6e73]">Din e-post</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleCheckout()}
                placeholder="namn@foretag.se"
                autoFocus
                className="w-full bg-secondary border border-transparent rounded-xl px-4 py-3 text-sm text-secondary-foreground placeholder-[#a0a0a8] focus:outline-none focus:border-secondary-foreground focus:ring-2 focus:ring-black/5 transition-all"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#E8440A] hover:bg-[#d03d09] disabled:opacity-60 text-white text-sm font-normal py-3.5 rounded-full transition-colors mt-1"
              >
                {loading ? <><Loader className="w-4 h-4 animate-spin" /> Vidarebefordrar...</> : "Gå till betalning"}
              </button>
            </div>
            <p className="text-xs text-[#8e8e93] text-center mt-5">Säker betalning via Stripe. Du kan avsluta när som helst.</p>
          </div>
        </div>
      )}
    </>
  );
}
