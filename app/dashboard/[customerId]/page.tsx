"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Check, Loader, Copy, Plus, Trash2, Calendar, User, Mail, Phone, Clock, MessageSquare, Bell, Building2, Bot, BookOpen, Code2, LogOut, BarChart2 } from "lucide-react";

type Settings = {
  company_name: string;
  company_description: string;
  owner_name: string;
  opening_hours: string;
  closed_dates: string;
  cancellation_policy: string;
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
  brand_color: string;
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
  const token = searchParams.get("token") ?? "";

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [gcalConnected, setGcalConnected] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    company_name: "", company_description: "", owner_name: "", opening_hours: "", closed_dates: "",
    cancellation_policy: "", prices: "", phone: "", address: "", contact_email: "", sales_email: "",
    support_email: "", payment_info: "", delivery_info: "", guarantee_info: "",
    system_prompt: "", tone: "friendly", notification_email: "", slack_webhook: "", brand_color: "",
  });
  const [kb, setKb] = useState<KbEntry[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [siteUrl, setSiteUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState("");

  useEffect(() => {
    setSiteUrl(window.location.origin);
    fetch(`/api/dashboard?customerId=${customerId}&token=${token}`)
      .then(async (r) => {
        if (r.status === 401) { window.location.href = "/resend-link?reason=invalid"; return null; }
        return r.json();
      })
      .then((d) => {
        if (!d) return;
        setCustomer(d.customer);
        if (d.settings) {
          setSettings((prev) => ({
            ...prev,
            company_name:        d.settings.company_name        ?? "",
            company_description: d.settings.company_description ?? "",
            owner_name:          d.settings.owner_name          ?? "",
            opening_hours:       d.settings.opening_hours       ?? "",
            prices:              d.settings.prices              ?? "",
            phone:               d.settings.phone               ?? "",
            address:             d.settings.address             ?? "",
            contact_email:       d.settings.contact_email       ?? "",
            sales_email:         d.settings.sales_email         ?? "",
            support_email:       d.settings.support_email       ?? "",
            payment_info:        d.settings.payment_info        ?? "",
            delivery_info:       d.settings.delivery_info       ?? "",
            guarantee_info:      d.settings.guarantee_info      ?? "",
            system_prompt:       d.settings.system_prompt       ?? "",
            tone:                d.settings.tone                ?? "friendly",
            notification_email:  d.settings.notification_email  ?? "",
            slack_webhook:       d.settings.slack_webhook       ?? "",
            brand_color:         d.settings.brand_color         ?? "",
            closed_dates:        d.settings.closed_dates        ?? "",
            cancellation_policy: d.settings.cancellation_policy ?? "",
          }));
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
      body: JSON.stringify({ customerId, token, ...settings, knowledge_base: kb }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function analyzeWebsite() {
    if (!websiteUrl) return;
    setAnalyzing(true);
    setAnalyzeError("");
    try {
      const res = await fetch("/api/analyze-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: websiteUrl }),
      });
      const d = await res.json();
      if (d.error) { setAnalyzeError(d.error); return; }
      if (d.sections?.length) setKb((prev) => [...prev, ...d.sections]);
      if (d.structured) {
        setSettings((prev) => ({
          ...prev,
          company_name:  !prev.company_name  && d.structured.company_name  ? d.structured.company_name  : prev.company_name,
          opening_hours: !prev.opening_hours && d.structured.opening_hours ? d.structured.opening_hours : prev.opening_hours,
          prices:        !prev.prices        && d.structured.prices        ? d.structured.prices        : prev.prices,
          phone:         !prev.phone         && d.structured.phone         ? d.structured.phone         : prev.phone,
          address:       !prev.address       && d.structured.address       ? d.structured.address       : prev.address,
        }));
      }
    } catch {
      setAnalyzeError("Något gick fel. Försök igen.");
    } finally {
      setAnalyzing(false);
    }
  }

  async function deleteLead(id: string) {
    await fetch(`/api/leads/${id}?customerId=${customerId}&token=${token}`, { method: "DELETE" });
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  function addKbEntry() { setKb([...kb, { title: "", content: "" }]); }
  function updateKb(i: number, field: "title" | "content", value: string) {
    const updated = [...kb];
    updated[i] = { ...updated[i], [field]: value };
    setKb(updated);
  }
  function removeKb(i: number) { setKb(kb.filter((_, idx) => idx !== i)); }

  const embedCode = settings.brand_color
    ? `<script src="${siteUrl}/widget.js" data-customer-id="${customerId}" data-color="${settings.brand_color}"></script>`
    : `<script src="${siteUrl}/widget.js" data-customer-id="${customerId}"></script>`;
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
        <div className="mb-3 flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-[#8e8e93] uppercase tracking-widest mb-2">Dashboard</p>
            <h1 className="text-3xl font-semibold text-[#1d1d1f] tracking-tight">Din chattbot</h1>
            <p className="text-sm text-[#8e8e93] mt-1">{customer.email}</p>
          </div>
          <a href="/resend-link" className="flex items-center gap-1.5 text-xs text-[#8e8e93] hover:text-[#1d1d1f] transition-colors mt-1">
            <LogOut className="w-3.5 h-3.5" /> Logga ut
          </a>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Bokningar", value: leads.filter(l => l.action === "booking" && l.status === "active").length, icon: <Calendar className="w-4 h-4 text-[#E8440A]" /> },
            { label: "Kontakter", value: leads.filter(l => l.action === "lead").length, icon: <User className="w-4 h-4 text-[#E8440A]" /> },
            { label: "Meddelanden", value: `${customer.messages_used_this_month ?? 0}/1k`, icon: <BarChart2 className="w-4 h-4 text-[#E8440A]" /> },
          ].map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-2xl p-4 border border-[#e8e8e8] flex flex-col gap-1.5">
              <div className="w-7 h-7 rounded-lg bg-[#fff4f0] flex items-center justify-center">{icon}</div>
              <p className="text-xl font-semibold text-[#1d1d1f] leading-none">{value}</p>
              <p className="text-xs text-[#8e8e93]">{label}</p>
            </div>
          ))}
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

        {/* Salongsuppgifter — endast för intern testdashboard */}
        {customerId === "0fb2136e-af25-4534-ba57-db34db4dc32a" && <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8] flex flex-col gap-4">
          <SectionHeader icon={<Building2 className="w-3.5 h-3.5 text-[#6e6e73]" />} title="Salongsuppgifter" />
          <p className="text-xs text-[#8e8e93] -mt-2">Fyll i uppgifterna manuellt — boten lär sig svara på frågor om din salong.</p>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Salongens namn</label>
            <input type="text" value={settings.company_name}
              onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
              placeholder="Salong Bella" className={inputCls} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Beskrivning</label>
            <textarea value={settings.company_description}
              onChange={(e) => setSettings({ ...settings, company_description: e.target.value })}
              placeholder="T.ex. Vi är en frisörsalong i Stockholm som specialiserar oss på klippning och färgning."
              rows={3} className={inputCls + " resize-none"} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Telefon</label>
              <input type="tel" value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="08-123 45 67" className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Kontaktemail</label>
              <input type="email" value={settings.contact_email}
                onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                placeholder="hej@salong.se" className={inputCls} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Adress</label>
            <input type="text" value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              placeholder="Storgatan 1, 111 23 Stockholm" className={inputCls} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Öppettider</label>
            <textarea value={settings.opening_hours}
              onChange={(e) => setSettings({ ...settings, opening_hours: e.target.value })}
              placeholder={"Måndag–fredag: 09–18\nLördag: 10–16\nSöndag: Stängt"}
              rows={4} className={inputCls + " resize-none"} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Prislista</label>
            <textarea value={settings.prices}
              onChange={(e) => setSettings({ ...settings, prices: e.target.value })}
              placeholder={"Klippning dam: 650 kr\nKlippning herr: 450 kr\nFärgning: från 900 kr\nSlingor: från 1 100 kr"}
              rows={5} className={inputCls + " resize-none"} />
          </div>
        </div>}

        {/* Schema & info — alla kunder */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8] flex flex-col gap-4">
          <SectionHeader icon={<Clock className="w-3.5 h-3.5 text-[#6e6e73]" />} title="Schema & info" />
          <p className="text-xs text-[#8e8e93] -mt-2">Fyll i öppettider och priser så kan boten svara på bokningar och prisfrågor.</p>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Öppettider</label>
            <textarea value={settings.opening_hours}
              onChange={(e) => setSettings({ ...settings, opening_hours: e.target.value })}
              placeholder={"Måndag-fredag: 09:00-18:00\nLördag: 10:00-16:00\nSöndag: Stängt"}
              rows={4} className={inputCls + " resize-none"} />
            <p className="text-[11px] text-[#a0a0a8]">Används för att visa lediga tider vid bokning.</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Prislista</label>
            <textarea value={settings.prices}
              onChange={(e) => setSettings({ ...settings, prices: e.target.value })}
              placeholder={"Klippning dam: 650 kr\nKlippning herr: 450 kr\nFärgning: från 900 kr"}
              rows={4} className={inputCls + " resize-none"} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Stängda dagar (helgdagar, semester)</label>
            <textarea value={settings.closed_dates}
              onChange={(e) => setSettings({ ...settings, closed_dates: e.target.value })}
              placeholder={"2026-06-19\n2026-06-20\n2026-12-24\n2026-12-25"}
              rows={3} className={inputCls + " resize-none"} />
            <p className="text-[11px] text-[#a0a0a8]">Ett datum per rad (ÅÅÅÅ-MM-DD). Boten visar dessa dagar som stängda.</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Avbokningspolicy</label>
            <textarea value={settings.cancellation_policy}
              onChange={(e) => setSettings({ ...settings, cancellation_policy: e.target.value })}
              placeholder="T.ex. Avbokning senast 24 timmar i förväg. Vid sen avbokning debiteras 50% av priset."
              rows={2} className={inputCls + " resize-none"} />
          </div>
        </div>

        {/* Kunskapsbas */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8] flex flex-col gap-4">
          <SectionHeader icon={<BookOpen className="w-3.5 h-3.5 text-[#6e6e73]" />} title="Kunskapsbas" />
          <p className="text-xs text-[#8e8e93] -mt-2">Lägg till extra information som boten ska kunna svara på.</p>

          <div className="flex gap-2">
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://dittforetag.se"
              className={inputCls + " flex-1"}
            />
            <button
              onClick={analyzeWebsite}
              disabled={analyzing || !websiteUrl}
              className="shrink-0 bg-secondary-foreground hover:bg-[#3d3d3f] disabled:opacity-40 text-white text-xs font-medium px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
            >
              {analyzing ? <><Loader className="w-3.5 h-3.5 animate-spin" /> Analyserar...</> : "Analysera"}
            </button>
          </div>
          {analyzeError && <p className="text-xs text-red-500">{analyzeError}</p>}

          <button
            onClick={addKbEntry}
            className="flex items-center gap-1.5 text-xs font-medium text-[#6e6e73] hover:text-secondary-foreground transition-colors self-start"
          >
            <Plus className="w-3.5 h-3.5" /> Lägg till manuellt
          </button>

          {kb.length > 0 && (
            <>
              <p className="text-xs font-medium text-[#6e6e73] -mb-1">Genererat innehåll — granska och spara</p>
              {kb.map((entry, i) => (
                <div key={i} className="flex flex-col gap-2 p-4 bg-[#fafafa] rounded-xl border border-[#f0f0f0]">
                  <div className="flex items-center gap-2">
                    <input type="text" value={entry.title} onChange={(e) => updateKb(i, "title", e.target.value)}
                      placeholder="Rubrik"
                      className="flex-1 bg-white border border-[#e8e8e8] rounded-lg px-3 py-2 text-sm text-[#1d1d1f] placeholder-[#b0b0b8] focus:outline-none focus:border-[#1d1d1f] focus:ring-1 focus:ring-black/5 transition-all" />
                    <button onClick={() => removeKb(i)} className="text-[#c0c0c5] hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea value={entry.content} onChange={(e) => updateKb(i, "content", e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-[#e8e8e8] rounded-lg px-3 py-2 text-sm text-[#1d1d1f] placeholder-[#b0b0b8] focus:outline-none focus:border-[#1d1d1f] focus:ring-1 focus:ring-black/5 transition-all resize-none" />
                </div>
              ))}
            </>
          )}
        </div>

        {/* Bokningar */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8]">
          <SectionHeader icon={<Calendar className="w-3.5 h-3.5 text-[#6e6e73]" />} title="Bokningar" />
          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <div className="w-10 h-10 rounded-2xl bg-[#f5f5f7] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#c0c0c5]" />
              </div>
              <p className="text-sm text-[#8e8e93]">Inga bokningar än</p>
              <p className="text-xs text-[#b0b0b8] text-center">Bokningar från din chattbot dyker upp här automatiskt.</p>
            </div>
          ) : (
          <div className="grid grid-cols-2 gap-2 mt-3">
              {bookings.map((b) => (
                <div key={b.id} className={`flex flex-col gap-2 p-3.5 rounded-xl border border-[#f0f0f0] bg-[#fafafa] ${b.status === "cancelled" ? "opacity-50" : ""}`}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[#1d1d1f] truncate">{b.name || "—"}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${b.status === "cancelled" ? "text-[#8e8e93] bg-[#f0f0f0]" : "text-green-700 bg-green-100"}`}>
                        {b.status === "cancelled" ? "Avbokad" : "Aktiv"}
                      </span>
                      <button onClick={() => deleteLead(b.id)} className="text-[#c0c0c5] hover:text-red-400 transition-colors" title="Ta bort">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    {b.date && <span className="text-xs text-[#6e6e73] flex items-center gap-1"><Calendar className="w-3 h-3" />{b.date}</span>}
                    {b.time && <span className="text-xs text-[#6e6e73] flex items-center gap-1"><Clock className="w-3 h-3" />{b.time}</span>}
                    {b.notes && <span className="text-xs text-[#6e6e73] flex items-start gap-1"><MessageSquare className="w-3 h-3 shrink-0 mt-0.5" />{b.notes}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Kontakter */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8]">
          <SectionHeader icon={<User className="w-3.5 h-3.5 text-[#6e6e73]" />} title="Kontakter" />
          {contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center">
                <User className="w-5 h-5 text-[#c0c0c5]" />
              </div>
              <p className="text-sm text-[#8e8e93]">Inga kontakter än</p>
              <p className="text-xs text-[#b0b0b8] text-center">Leads från din chattbot samlas här automatiskt.</p>
            </div>
          ) : (
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
                  <button onClick={() => deleteLead(c.id)} className="text-[#c0c0c5] hover:text-red-400 transition-colors shrink-0 mt-0.5" title="Ta bort">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

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

          <p className="text-xs font-medium text-[#1d1d1f]">Kalenderintegrationer</p>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-[#e8e8e8] bg-[#fafafa]">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-white border border-[#e8e8e8]">
              <Calendar className="w-4 h-4 text-[#E8440A]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1d1d1f]">Google Calendar</p>
              <p className="text-xs text-[#6e6e73] mt-0.5">Du får en Google Calendar-knapp i bokningsbekräftelsen.</p>
            </div>
            <Check className="w-4 h-4 text-green-500 shrink-0" />
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-[#e8e8e8] bg-[#fafafa]">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-white border border-[#e8e8e8]">
              <Calendar className="w-4 h-4 text-[#0078d4]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1d1d1f]">Outlook</p>
              <p className="text-xs text-[#6e6e73] mt-0.5">Du får en Outlook-knapp i bokningsbekräftelsen.</p>
            </div>
            <Check className="w-4 h-4 text-green-500 shrink-0" />
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl border border-[#e8e8e8] bg-[#fafafa]">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-white border border-[#e8e8e8]">
              <Calendar className="w-4 h-4 text-[#1d1d1f]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#1d1d1f]">Apple Calendar</p>
              <p className="text-xs text-[#6e6e73] mt-0.5">Du får en Apple Calendar-knapp i bokningsbekräftelsen.</p>
            </div>
            <Check className="w-4 h-4 text-green-500 shrink-0" />
          </div>
        </div>


        {/* Botpersonlighet */}
        <div className="bg-white rounded-2xl p-5 border border-[#e8e8e8] flex flex-col gap-4">
          <SectionHeader icon={<Bot className="w-3.5 h-3.5 text-[#6e6e73]" />} title="Botpersonlighet" />

          <div className="flex flex-col gap-1.5">
            <label className={labelCls}>Varumärkesfärg</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={settings.brand_color || "#E8440A"}
                onChange={(e) => setSettings({ ...settings, brand_color: e.target.value })}
                className="w-10 h-10 rounded-lg border border-[#e8e8e8] cursor-pointer p-0.5 bg-white"
              />
              <input
                type="text"
                value={settings.brand_color || ""}
                onChange={(e) => setSettings({ ...settings, brand_color: e.target.value })}
                placeholder="#E8440A"
                className={inputCls + " flex-1"}
              />
              {settings.brand_color && (
                <button
                  onClick={() => setSettings({ ...settings, brand_color: "" })}
                  className="text-xs text-[#8e8e93] hover:text-secondary-foreground transition-colors whitespace-nowrap"
                >
                  Återställ
                </button>
              )}
            </div>
            <p className="text-[11px] text-[#a0a0a8]">Välj din varumärkesfärg så matchar chattboten din hemsida automatiskt.</p>
          </div>

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

        {/* Spara påminnelse */}
        <p className="text-xs text-[#8e8e93] text-center -mb-1">Kom ihåg att trycka på <span className="font-medium text-[#1d1d1f]">Spara ändringar</span> när du är klar.</p>

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
