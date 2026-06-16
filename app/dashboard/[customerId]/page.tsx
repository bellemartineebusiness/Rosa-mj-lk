"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Check, Loader, Copy, Plus, Trash2, Calendar, User, Mail, Phone, Clock, MessageSquare, Bell, Building2, Bot, BookOpen, Code2 } from "lucide-react";

type Settings = {
  company_name: string;
  opening_hours: string;
  prices: string;
  phone: string;
  address: string;
  contact_email: string;
  sales_email: string;
  support_email: string;
  payment_info: string;
  delivery_info: string;
  guarantee_info: string;
  system_prompt: string;
  tone: string;
  notification_email: string;
  slack_webhook: string;
};

type KbEntry = { id?: string; title: string; content: string };

type Lead = {
  id: string;
  action: "lead" | "booking" | "cancel";
  name: string | null;
  email: string | null;
  phone: string | null;
  notes: string | null;
  date: string | null;
  time: string | null;
  status: "active" | "cancelled";
  created_at: string;
};

type Customer = {
  email: string;
  subscription_status: "active" | "past_due" | "inactive";
  messages_used_this_month: number;
};

const statusLabel: Record<string, { label: string; color: string }> = {
  active:   { label: "Aktiv",           color: "bg-green-100 text-green-700" },
  past_due: { label: "Obetald faktura", color: "bg-yellow-100 text-yellow-700" },
  inactive: { label: "Inaktiv",         color: "bg-red-100 text-red-700" },
};

const inputCls = "w-full bg-[#fafafa] border border-[#e8e8e8] rounded-xl px-4 py-3 text-sm text-[#1d1d1f] placeholder-[#b0b0b8] focus:outline-none focus:bg-white focus:border-[#1d1d1f] focus:ring-2 focus:ring-black/5 transition-all";
const labelCls = "text-xs font-medium text-[#6e6e73]";

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-1">
      <div className="w-7 h-7 rounded-lg bg-[#f0f0f0] flex items-center justify-center shrink-0">
        {icon}
      </div>
      <h2 className="text-sm font-semibold text-[#1d1d1f]">{title}</h2>
    </div>
  );
}

export default function DashboardPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const searchParams = useSearchParams();
  const gcalStatus = searchParams.get("gcal");

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [gcalConnected, setGcalConnected] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    company_name: "", opening_hours: "", prices: "",
    phone: "", address: "", contact_email: "", sales_email: "", support_email: "",
    payment_info: "", delivery_info: "", guarantee_info: "",
    system_prompt: "", tone: "friendly", notification_email: "", slack_webhook: "",
  });
  const [kb, setKb] = useState<KbEntry[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [siteUrl, setSiteUrl] = useState("");

  useEffect(() => {
    setSiteUrl(window.location.origin);
    fetch(`/api/dashboard?customerId=${customerId}`)
      .then((r) => r.json())
      .then((d) => {
        setCustomer(d.customer);
        if (d.settings) {
          setSettings((prev) => ({ ...prev, ...d.settings }));
          setGcalConnected(!!d.settings.google_calendar_refresh_token);
        }
        if (d.knowledge_base) setKb(d.knowledge_base);
        if (d.leads) setLeads(d.leads);
      })
      .finally(() => setLoading(false));
  }, [customerId]);

  async function save() {
    setSaving(true);
    await fetch("/api/dashboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId, ...settings, knowledge_base: kb }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function addKbEntry() { setKb([...kb, { title: "", content: "" }]); }
  function updateKb(i: number, field: "title" | "content", value: string) {
    const updated = [...kb];
    updated[i] = { ...updated[i], [field]: value };
    setKb(updated);
  }
  function removeKb(i: number) { setKb(kb.filter((_, idx) => idx !== i)); }

  const embedCode = `<script src="${siteUrl}/widget.js" data-customer-id="${customerId}"></script>`;
  const bookings = leads.filter((l) => l.action === "booking");
  const contacts = leads.filter((l) => l.action === "lead");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <Loader className="w-5 h-5 text-[#8e8e93] animate-spin" />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <p className="text-sm text-[#6e6e73]">Kunden hittades inte.</p>
      </div>
    );
  }

  const status = statusLabel[customer.subscription_status] ?? statusLabel.inactive;
  const gcalOk = gcalConnected || gcalStatus === "connected";

  return (
    <div className="min-h-screen bg-[#f5f5f7] py-10 px-6">
      <div className="max-w-xl mx-auto flex flex-col gap-4">

        {/* Header */}
        <div className="mb-3">
          <p className="text-xs font-medium text-[#8e8e93] uppercase tracking-widest mb-2">Dashboard</p>
          <h1 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">Din chattbot</h1>
          <p className="text-sm text-[#8e8e93] mt-1">{customer.email}</p>
        </div>

        {/* Prenumeration */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8]">
          <div className="flex items-center justify-between mb-3">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${status.color}`}>
              {status.label}
            </span>
            <span className="text-xs font-medium text-[#8e8e93]">
              {customer.messages_used_this_month ?? 0} / 1 000
            </span>
          </div>

          <div className="w-full bg-[#e0e0e0] rounded-full h-2.5 mb-1.5 overflow-hidden">
            <div
              className="h-2.5 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(((customer.messages_used_this_month ?? 0) / 1000) * 100, 100)}%`,
                background: "linear-gradient(90deg, #E8440A, #ff6b35)",
              }}
            />
          </div>
          <p className="text-[11px] text-[#a0a0a8] mb-3">meddelanden denna månad</p>

          {customer.subscription_status !== "active" && (
            <p className="text-xs text-[#6e6e73] mb-3">Din bot är pausad. Uppdatera betalningen för att aktivera igen.</p>
          )}
          <button
            onClick={async () => {
              setPortalLoading(true);
              const res = await fetch("/api/stripe/portal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ customerId }),
              });
              const d = await res.json();
              if (d.url) window.location.href = d.url;
              else { alert(d.error ?? "Kunde inte öppna portalen. Kontakta support."); setPortalLoading(false); }
            }}
            disabled={portalLoading}
            className="text-xs text-[#8e8e93] hover:text-[#1d1d1f] underline underline-offset-2 transition-colors disabled:opacity-50"
          >
            {portalLoading ? "Laddar..." : "Hantera prenumeration →"}
          </button>
        </div>

        {/* Bokningar */}
        {bookings.length > 0 && (
          <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8]">
            <SectionHeader icon={<Calendar className="w-3.5 h-3.5 text-[#6e6e73]" />} title="Bokningar" />
            <div className="grid grid-cols-2 gap-2 mt-3">
              {bookings.map((b) => (
                <div key={b.id} className={`flex flex-col gap-2 p-3.5 rounded-xl border border-[#f0f0f0] bg-[#fafafa] ${b.status === "cancelled" ? "opacity-50" : ""}`}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[#1d1d1f] truncate">{b.name || "—"}</p>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${b.status === "cancelled" ? "text-[#8e8e93] bg-[#f0f0f0]" : "text-green-700 bg-green-100"}`}>
                      {b.status === "cancelled" ? "Avbokad" : "Aktiv"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {b.date && <span className="text-xs text-[#6e6e73] flex items-center gap-1"><Calendar className="w-3 h-3" />{b.date}</span>}
                    {b.time && <span className="text-xs text-[#6e6e73] flex items-center gap-1"><Clock className="w-3 h-3" />{b.time}</span>}
                    {b.notes && <span className="text-xs text-[#6e6e73] flex items-start gap-1"><MessageSquare className="w-3 h-3 shrink-0 mt-0.5" />{b.notes}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Kontakter */}
        {contacts.length > 0 && (
          <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8]">
            <SectionHeader icon={<User className="w-3.5 h-3.5 text-[#6e6e73]" />} title="Kontakter" />
            <div className="flex flex-col gap-2 mt-3">
              {contacts.map((c) => (
                <div key={c.id} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#fafafa] border border-[#f0f0f0]">
                  <div className="w-7 h-7 rounded-full bg-[#0a0a0a]/5 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-[#6e6e73]" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <p className="text-sm font-semibold text-[#1d1d1f]">{c.name || "—"}</p>
                    {c.email && <span className="text-xs text-[#6e6e73] flex items-center gap-1"><Mail className="w-3 h-3" />{c.email}</span>}
                    {c.phone && <span className="text-xs text-[#6e6e73] flex items-center gap-1"><Phone className="w-3 h-3" />{c.phone}</span>}
                    {c.notes && <span className="text-xs text-[#6e6e73] flex items-start gap-1 mt-0.5"><MessageSquare className="w-3 h-3 shrink-0 mt-0.5" />{c.notes}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notiser */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8] flex flex-col gap-4">
          <SectionHeader icon={<Bell className="w-3.5 h-3.5 text-[#6e6e73]" />} title="Notiser" />

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Notifikationsemail</label>
            <input type="email" value={settings.notification_email}
              onChange={(e) => setSettings({ ...settings, notification_email: e.target.value })}
              placeholder={customer.email} className={inputCls} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Slack-webhook (valfritt)</label>
            <input type="url" value={settings.slack_webhook}
              onChange={(e) => setSettings({ ...settings, slack_webhook: e.target.value })}
              placeholder="https://hooks.slack.com/services/..." className={inputCls} />
          </div>

          {gcalStatus === "error" && <p className="text-xs text-red-500">Något gick fel med Google-kopplingen. Försök igen.</p>}

          <a href={`/api/google-calendar/auth?customerId=${customerId}`}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${gcalOk ? "bg-green-50 border-green-200" : "bg-[#fafafa] border-[#e8e8e8] hover:border-[#c0c0c0]"}`}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${gcalOk ? "bg-green-100" : "bg-white border border-[#e8e8e8]"}`}>
              <Calendar className={`w-4 h-4 ${gcalOk ? "text-green-600" : "text-[#8e8e93]"}`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1d1d1f]">Google Calendar</p>
              <p className="text-xs text-[#6e6e73] mt-0.5">{gcalOk ? "Kopplad — bokningar läggs in automatiskt" : "Koppla för att lägga in bokningar automatiskt"}</p>
            </div>
            {gcalOk ? <Check className="w-4 h-4 text-green-500 shrink-0" /> : <span className="text-xs font-medium text-[#E8440A] shrink-0">Koppla →</span>}
          </a>
        </div>

        {/* Företagsinfo */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8] flex flex-col gap-4">
          <SectionHeader icon={<Building2 className="w-3.5 h-3.5 text-[#6e6e73]" />} title="Företagsinformation" />
          {([
            { key: "company_name",  label: "Företagsnamn",     placeholder: "Frisör Stockholm AB" },
            { key: "opening_hours", label: "Öppettider",       placeholder: "Mån–Fre 09–18" },
            { key: "prices",        label: "Priser",            placeholder: "Klippning 450 kr" },
            { key: "phone",         label: "Telefon",           placeholder: "08-123 456 78" },
            { key: "address",       label: "Adress",            placeholder: "Storgatan 1, Stockholm" },
            { key: "contact_email", label: "Kontaktemail",      placeholder: "kontakt@mittforetag.se" },
            { key: "sales_email",   label: "Försäljningsemail", placeholder: "forsaljning@mittforetag.se" },
            { key: "support_email", label: "Supportemail",      placeholder: "support@mittforetag.se" },
            { key: "payment_info",  label: "Betalningsmetoder", placeholder: "Visa, Mastercard och Swish" },
            { key: "delivery_info", label: "Leveranstid",       placeholder: "3–5 arbetsdagar" },
            { key: "guarantee_info",label: "Garanti",           placeholder: "30 dagars öppet köp" },
          ] as const).map(({ key, label, placeholder }) => (
            <div key={key} className="flex flex-col gap-1.5">
              <label className={labelCls}>{label}</label>
              <input type="text" value={settings[key]}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                placeholder={placeholder} className={inputCls} />
            </div>
          ))}
        </div>

        {/* Botpersonlighet */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8] flex flex-col gap-4">
          <SectionHeader icon={<Bot className="w-3.5 h-3.5 text-[#6e6e73]" />} title="Botpersonlighet" />
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Ton</label>
            <select value={settings.tone} onChange={(e) => setSettings({ ...settings, tone: e.target.value })} className={inputCls}>
              <option value="friendly">Vänlig och hjälpsam</option>
              <option value="professional">Professionell och formell</option>
              <option value="casual">Avslappnad och lättsam</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Extra instruktioner (valfritt)</label>
            <textarea value={settings.system_prompt}
              onChange={(e) => setSettings({ ...settings, system_prompt: e.target.value })}
              placeholder="T.ex. Vi erbjuder alltid gratis konsultation första gången."
              rows={3} className={inputCls + " resize-none"} />
          </div>
        </div>

        {/* Kunskapsbas */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <SectionHeader icon={<BookOpen className="w-3.5 h-3.5 text-[#6e6e73]" />} title="Kunskapsbas" />
            <button onClick={addKbEntry} className="flex items-center gap-1.5 text-xs font-medium text-[#E8440A] hover:text-[#d03d09] transition-colors">
              <Plus className="w-3.5 h-3.5" /> Lägg till
            </button>
          </div>
          {kb.length === 0 && <p className="text-xs text-[#a0a0a8]">Lägg till artiklar som boten ska kunna svara på.</p>}
          {kb.map((entry, i) => (
            <div key={i} className="flex flex-col gap-2 p-4 bg-[#fafafa] rounded-xl border border-[#f0f0f0]">
              <div className="flex items-center gap-2">
                <input type="text" value={entry.title} onChange={(e) => updateKb(i, "title", e.target.value)}
                  placeholder="Rubrik (t.ex. Returpolicy)"
                  className="flex-1 bg-white border border-[#e8e8e8] rounded-lg px-3 py-2 text-sm text-[#1d1d1f] placeholder-[#b0b0b8] focus:outline-none focus:border-[#1d1d1f] focus:ring-1 focus:ring-black/5 transition-all" />
                <button onClick={() => removeKb(i)} className="text-[#c0c0c5] hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <textarea value={entry.content} onChange={(e) => updateKb(i, "content", e.target.value)}
                placeholder="Skriv innehållet som boten ska känna till..."
                rows={3}
                className="w-full bg-white border border-[#e8e8e8] rounded-lg px-3 py-2 text-sm text-[#1d1d1f] placeholder-[#b0b0b8] focus:outline-none focus:border-[#1d1d1f] focus:ring-1 focus:ring-black/5 transition-all resize-none" />
            </div>
          ))}
        </div>

        {/* Inbäddningskod */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8]">
          <SectionHeader icon={<Code2 className="w-3.5 h-3.5 text-[#6e6e73]" />} title="Inbäddningskod" />
          <div className="mt-3 bg-[#f5f5f7] rounded-xl p-4 flex items-start gap-3">
            <code className="text-xs font-mono text-[#E8440A] flex-1 break-all">{embedCode}</code>
            <button onClick={() => { navigator.clipboard.writeText(embedCode); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
              className="shrink-0 text-[#8e8e93] hover:text-[#1d1d1f] transition-colors">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-xs text-[#6e6e73] mt-2.5">Klistra in i din hemsidas HTML så dyker boten upp automatiskt.</p>
        </div>

        {/* Spara */}
        <button onClick={save} disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-[#E8440A] hover:bg-[#d03d09] disabled:opacity-50 text-white text-sm font-medium py-4 rounded-2xl transition-colors shadow-sm">
          {saved ? <><Check className="w-4 h-4" /> Sparat</> :
           saving ? <><Loader className="w-4 h-4 animate-spin" /> Sparar...</> :
           "Spara ändringar"}
        </button>

      </div>
    </div>
  );
}
