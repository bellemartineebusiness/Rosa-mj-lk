"use client";

import { useState, useEffect } from "react";
import { Copy, Check, RefreshCw, UserX, UserCheck, Loader } from "lucide-react";

type Stats = {
  total: number;
  active: number;
  inactive: number;
  past_due: number;
  messages: number;
};

type Customer = {
  id: string;
  email: string;
  subscription_status: "active" | "past_due" | "inactive";
  messages_used_this_month: number;
  created_at: string;
};

const statusLabel: Record<string, { label: string; color: string }> = {
  active:   { label: "Aktiv",    color: "bg-green-100 text-green-700" },
  past_due: { label: "Obetald",  color: "bg-yellow-100 text-yellow-700" },
  inactive: { label: "Inaktiv",  color: "bg-red-100 text-red-700" },
};

export default function AdminPage() {
  const [pin, setPin]               = useState("");
  const [authed, setAuthed]         = useState(false);
  const [error, setError]           = useState("");
  const [customers, setCustomers]   = useState<Customer[]>([]);
  const [stats, setStats]           = useState<Stats | null>(null);
  const [loading, setLoading]       = useState(false);
  const [copied, setCopied]         = useState<string | null>(null);
  const [acting, setActing]         = useState<string | null>(null);
  const [feedback, setFeedback]     = useState<Record<string, string>>({});

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

  async function login() {
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin", { headers: { "x-admin-pin": pin } });
    if (!res.ok) { setError("Fel PIN."); setLoading(false); return; }
    const d = await res.json();
    setCustomers(d.customers);
    setStats(d.stats);
    setAuthed(true);
    setLoading(false);
  }

  async function refresh() {
    setLoading(true);
    const res = await fetch("/api/admin", { headers: { "x-admin-pin": pin } });
    const d = await res.json();
    setCustomers(d.customers);
    setStats(d.stats);
    setLoading(false);
  }

  async function act(customerId: string, action: string, label: string) {
    setActing(customerId + action);
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify({ customerId, action }),
    });
    const d = await res.json();
    if (d.ok) {
      setFeedback((f) => ({ ...f, [customerId + action]: label }));
      setTimeout(() => setFeedback((f) => { const n = { ...f }; delete n[customerId + action]; return n; }), 2500);
      await refresh();
    }
    setActing(null);
  }

  function copyEmbed(customerId: string) {
    const code = `<script src="${siteUrl}/widget.js" data-customer-id="${customerId}"></script>`;
    navigator.clipboard.writeText(code);
    setCopied(customerId);
    setTimeout(() => setCopied(null), 2000);
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl p-8 w-full max-w-sm border border-[#e8e8e8] shadow-sm flex flex-col gap-5">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#8e8e93] mb-1">Belle Martineé</p>
            <h1 className="text-xl font-semibold text-[#1d1d1f]">Admin</h1>
          </div>
          <input
            type="password"
            placeholder="PIN-kod"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            autoFocus
            className="w-full bg-[#f5f5f7] border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#1d1d1f] transition-all"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-[#1d1d1f] hover:bg-black text-white text-sm font-medium py-3 rounded-full transition-colors disabled:opacity-50"
          >
            {loading ? "Loggar in..." : "Logga in"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] py-10 px-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-widest text-[#8e8e93] mb-1">Belle Martineé</p>
            <h1 className="text-2xl font-semibold text-[#1d1d1f]">Adminpanel</h1>
          </div>
          <button onClick={refresh} disabled={loading} className="flex items-center gap-2 text-sm text-[#6e6e73] hover:text-[#1d1d1f] transition-colors">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Uppdatera
          </button>
        </div>

        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: "Totalt", value: stats.total },
              { label: "Aktiva", value: stats.active, color: "text-green-600" },
              { label: "Obetalda", value: stats.past_due, color: "text-yellow-600" },
              { label: "Inaktiva", value: stats.inactive, color: "text-red-500" },
              { label: "Msg denna månad", value: stats.messages },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl border border-[#e8e8e8] p-4 flex flex-col gap-1">
                <p className="text-[11px] uppercase tracking-widest text-[#8e8e93]">{s.label}</p>
                <p className={`text-2xl font-semibold ${s.color ?? "text-secondary-foreground"}`}>{s.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-[#e8e8e8] overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-3 bg-[#f5f5f7] border-b border-[#e8e8e8] text-[11px] uppercase tracking-widest text-[#8e8e93]">
            <span>Kund</span>
            <span>Status</span>
            <span className="text-center">Msg</span>
            <span className="text-center">Embedkod</span>
            <span className="text-center">Åtgärder</span>
          </div>

          {customers.length === 0 && (
            <p className="text-sm text-[#6e6e73] text-center py-10">Inga kunder ännu.</p>
          )}

          {customers.map((c) => {
            const st = statusLabel[c.subscription_status] ?? statusLabel.inactive;
            return (
              <div key={c.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-4 border-b border-[#f5f5f7] last:border-0 items-center">

                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#1d1d1f] truncate">{c.email}</p>
                  <p className="text-[11px] text-[#a0a0a8]">{new Date(c.created_at).toLocaleDateString("sv-SE")}</p>
                </div>

                <span className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${st.color}`}>
                  {st.label}
                </span>

                <span className="text-sm text-[#6e6e73] text-center tabular-nums">
                  {c.messages_used_this_month ?? 0}
                </span>

                <button
                  onClick={() => copyEmbed(c.id)}
                  className="flex items-center gap-1.5 text-xs text-[#6e6e73] hover:text-[#1d1d1f] transition-colors mx-auto"
                >
                  {copied === c.id
                    ? <><Check className="w-3.5 h-3.5 text-green-500" /> Kopierad</>
                    : <><Copy className="w-3.5 h-3.5" /> Kopiera</>
                  }
                </button>

                <div className="flex items-center gap-2 justify-center">
                  {c.subscription_status !== "active" ? (
                    <button
                      onClick={() => act(c.id, "activate", "Aktiverad")}
                      disabled={!!acting}
                      title="Aktivera"
                      className="w-7 h-7 rounded-lg bg-green-50 hover:bg-green-100 flex items-center justify-center transition-colors disabled:opacity-40"
                    >
                      {acting === c.id + "activate" ? <Loader className="w-3.5 h-3.5 animate-spin text-green-600" /> : <UserCheck className="w-3.5 h-3.5 text-green-600" />}
                    </button>
                  ) : (
                    <button
                      onClick={() => act(c.id, "deactivate", "Inaktiverad")}
                      disabled={!!acting}
                      title="Inaktivera"
                      className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors disabled:opacity-40"
                    >
                      {acting === c.id + "deactivate" ? <Loader className="w-3.5 h-3.5 animate-spin text-red-500" /> : <UserX className="w-3.5 h-3.5 text-red-500" />}
                    </button>
                  )}
                  <button
                    onClick={() => act(c.id, "resend", "Skickat")}
                    disabled={!!acting}
                    title="Skicka välkomstmail igen"
                    className="text-[11px] text-[#8e8e93] hover:text-[#1d1d1f] transition-colors whitespace-nowrap disabled:opacity-40"
                  >
                    {feedback[c.id + "resend"] ?? (acting === c.id + "resend" ? "Skickar..." : "Skicka mail")}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        <p className="text-xs text-[#a0a0a8] text-center">{customers.length} kund{customers.length !== 1 ? "er" : ""} totalt</p>
      </div>
    </div>
  );
}
