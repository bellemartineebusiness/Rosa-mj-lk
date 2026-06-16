"use client";

import { useState } from "react";

export default function TestWidgetPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customerId, setCustomerId] = useState<string | null>(null);

  async function create() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/dev/test-customer", { method: "POST" });
      const d = await res.json();
      if (!res.ok || !d.customerId) {
        setError(d.error ?? "Något gick fel.");
        setLoading(false);
        return;
      }
      setCustomerId(d.customerId);
    } catch {
      setError("Kunde inte nå servern.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col items-center justify-center gap-5">
      {!customerId ? (
        <>
          <button
            onClick={create}
            disabled={loading}
            className="px-8 py-4 rounded-full bg-[#E8440A] text-white text-sm font-medium hover:bg-[#d03d09] disabled:opacity-50 transition-colors"
          >
            {loading ? "Skapar testkund..." : "Skapa testkund →"}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm text-[#8e8e93]">Testkund skapad</p>
          <a
            href={`/dashboard/${customerId}`}
            className="px-8 py-4 rounded-full bg-[#0a0a0a] text-white text-sm font-medium hover:bg-[#1a1a1a] transition-colors"
          >
            Fyll i info i dashboard →
          </a>
          <a
            href={`/widget/${customerId}`}
            className="px-8 py-4 rounded-full bg-[#E8440A] text-white text-sm font-medium hover:bg-[#d03d09] transition-colors"
          >
            Testa boten direkt →
          </a>
        </div>
      )}
    </div>
  );
}
