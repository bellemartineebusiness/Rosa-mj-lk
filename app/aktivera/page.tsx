"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function AktiveraPage() {
  const [email, setEmail] = useState("");
  const [pin, setPin]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function activate() {
    if (!email.trim() || !email.includes("@")) {
      setError("Ange en giltig e-postadress.");
      return;
    }
    if (!pin.trim()) {
      setError("Ange admin-PIN.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/aktivera", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-pin": pin },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.customerId) {
        setError(data.error ?? "Något gick fel.");
        return;
      }
      const url = data.loginToken
        ? `/dashboard/${data.customerId}?token=${data.loginToken}`
        : `/dashboard/${data.customerId}`;
      router.push(url);
    } catch {
      setError("Kunde inte aktivera. Försök igen.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-white/40 mb-4">Intern admin</p>
          <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Aktivera konto</h1>
          <p className="text-white/50 text-sm">Skapa eller aktivera ett kundkonto manuellt.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-normal uppercase tracking-[0.15em] text-white/50">E-postadress</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && activate()}
              placeholder="kund@epost.se"
              autoFocus
              className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-normal uppercase tracking-[0.15em] text-white/50">Admin-PIN</label>
            <input
              type="password"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && activate()}
              placeholder="••••••"
              className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            onClick={activate}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#E8440A] hover:bg-[#d03d09] disabled:opacity-60 text-white text-sm font-normal py-3.5 rounded-2xl transition-colors"
          >
            {loading ? <><Loader className="w-4 h-4 animate-spin" /> Aktiverar...</> : "Aktivera och öppna dashboard"}
          </button>
        </div>

        <p className="text-center text-xs text-white/25">Intern sida — inte för kunder.</p>
      </div>
    </div>
  );
}
