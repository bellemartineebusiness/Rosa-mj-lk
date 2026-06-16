"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Check, Loader, Copy } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const inputCls = "w-full bg-white border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-secondary-foreground placeholder-[#a0a0a8] focus:outline-none focus:border-[#1d1d1f] focus:ring-2 focus:ring-black/5 transition-all";

export default function DevPage() {
  const [step, setStep] = useState<"form" | "chat">("form");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customerId, setCustomerId] = useState<string | null>(null);

  const [form, setForm] = useState({
    company_name: "",
    opening_hours: "",
    prices: "",
    phone: "",
    address: "",
    system_prompt: "",
    tone: "friendly",
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function saveAndTest() {
    if (!form.company_name.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/dev-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.customerId) {
        setCustomerId(data.customerId);
        setMessages([{ role: "assistant", content: `Hej! Jag är ${form.company_name}s chattbot. Hur kan jag hjälpa dig?` }]);
        setSaved(true);
        setStep("chat");
      }
    } finally {
      setSaving(false);
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || loading || !customerId) return;
    setInput("");
    const updated: Message[] = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setLoading(true);
    try {
      const res = await fetch("/api/dev-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated, customerId }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: res.ok ? data.reply : "Något gick fel." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Något gick fel." }]);
    } finally {
      setLoading(false);
    }
  }

  const botUrl = customerId ? `http://localhost:3000/dev-widget/${customerId}` : "";
  const embedCode = customerId
    ? `<iframe src="${botUrl}" style="position:fixed;bottom:0;right:0;width:420px;height:640px;border:none;z-index:9999;" allowtransparency="true"></iframe>`
    : "";

  return (
    <div className="min-h-screen bg-[#f5f5f7] py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-2">Testläge</p>
          <h1 className="text-2xl font-semibold text-secondary-foreground tracking-tight">Konfigurera din bot</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Formulär */}
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl p-6 border border-[#e8e8e8] flex flex-col gap-4">
              <p className="text-[10px] font-normal uppercase tracking-[0.2em] text-[#8e8e93]">Företagsinformation</p>

              {[
                { key: "company_name",  label: "Företagsnamn *",  placeholder: "Frisör Stockholm AB" },
                { key: "opening_hours", label: "Öppettider",       placeholder: "Mån–Fre 09–18, Lör 10–15" },
                { key: "prices",        label: "Priser",            placeholder: "Klippning 450 kr, Färgning 900 kr" },
                { key: "phone",         label: "Telefon",           placeholder: "08-123 456 78" },
                { key: "address",       label: "Adress",            placeholder: "Storgatan 1, Stockholm" },
              ].map(({ key, label, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-normal uppercase tracking-[0.15em] text-[#6e6e73]">{label}</label>
                  <input
                    type="text"
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className={inputCls}
                  />
                </div>
              ))}

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-normal uppercase tracking-[0.15em] text-[#6e6e73]">Extra instruktioner (valfritt)</label>
                <textarea
                  value={form.system_prompt}
                  onChange={(e) => setForm({ ...form, system_prompt: e.target.value })}
                  placeholder="T.ex. Nämn alltid att vi erbjuder gratis konsultation."
                  rows={3}
                  className={inputCls + " resize-none"}
                />
              </div>

              <button
                onClick={saveAndTest}
                disabled={saving || !form.company_name.trim()}
                className="w-full flex items-center justify-center gap-2 bg-[#E8440A] hover:bg-[#d03d09] disabled:opacity-40 text-white text-sm font-normal py-3.5 rounded-2xl transition-colors mt-1"
              >
                {saving ? <><Loader className="w-4 h-4 animate-spin" /> Sparar...</> : saved ? <><Check className="w-4 h-4" /> Uppdatera bot</> : "Skapa bot och testa"}
              </button>
            </div>

            {customerId && (
              <div className="bg-white rounded-2xl p-6 border border-[#e8e8e8]">
                <p className="text-[10px] font-normal uppercase tracking-[0.2em] text-[#8e8e93] mb-3">Inbäddningskod</p>
                <div className="bg-[#f5f5f7] rounded-xl p-4 flex items-start gap-3">
                  <code className="text-xs font-mono text-[#E8440A] flex-1 break-all">{embedCode}</code>
                  <button onClick={() => { navigator.clipboard.writeText(embedCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="shrink-0 text-[#8e8e93] hover:text-secondary-foreground transition-colors">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-[#6e6e73] mt-3">Klistra in i din hemsidas HTML för att testa widgeten lokalt.</p>
              </div>
            )}
          </div>

          {/* Chattfönster */}
          <div className="bg-white rounded-2xl border border-[#e8e8e8] overflow-hidden flex flex-col" style={{ height: 560 }}>
            <div className="px-5 py-4 bg-[#0a0a0a] flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#E8440A] flex items-center justify-center shrink-0">
                <span className="text-white text-[10px] font-semibold">AI</span>
              </div>
              <div>
                <p className="text-white text-sm font-medium">{form.company_name || "Din bot"}</p>
                <p className="text-white/40 text-[10px] mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Online
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5 bg-[#f9f9f9]">
              {step === "form" ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-sm text-[#8e8e93] text-center">Fyll i formuläret och klicka<br />"Skapa bot och testa"</p>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#E8440A] text-white rounded-br-sm"
                        : "bg-white text-secondary-foreground rounded-bl-sm shadow-sm border border-[#f0f0f0]"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-sm px-3.5 py-3 flex gap-1 shadow-sm border border-[#f0f0f0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8e8e93] animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8e8e93] animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8e8e93] animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="px-3 py-3 border-t border-[#f0f0f0] bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder={step === "form" ? "Skapa boten först..." : "Skriv ett meddelande..."}
                  disabled={step === "form"}
                  className="flex-1 bg-[#f5f5f7] rounded-xl px-3.5 py-2.5 text-sm text-secondary-foreground placeholder-[#a0a0a8] focus:outline-none focus:ring-2 focus:ring-black/5 transition-all disabled:opacity-40"
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || loading || step === "form"}
                  className="w-9 h-9 rounded-xl bg-[#E8440A] hover:bg-[#d03d09] disabled:opacity-30 flex items-center justify-center transition-colors"
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
