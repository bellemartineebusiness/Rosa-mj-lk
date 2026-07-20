import { NextRequest, NextResponse } from "next/server";
import { buildWelcomeEmail } from "@/lib/sendWelcomeEmail";
import { buildBookingNotification } from "@/lib/sendBookingNotification";
import { buildLeadNotification, buildCustomerConfirmation } from "@/lib/sendLeadNotification";

const DEMO_CUSTOMER_ID = "0fb2136e-af25-4534-ba57-db34db4dc32a";

const SAMPLE = {
  name: "Anna Svensson",
  email: "anna@exempel.se",
  phone: "070-123 45 67",
  notes: "Vill boka klippning och färg.",
  date: "2026-07-25",
  time: "14:00",
  bookingId: "preview",
  companyName: "Salong Belle",
};

type Built = { subject: string; html: string; ics?: string | null };

function render(type: string, base: string): Built | null {
  switch (type) {
    case "welcome":
      return buildWelcomeEmail({ customerId: DEMO_CUSTOMER_ID, siteUrl: base });
    case "booking":
      return buildBookingNotification({
        companyName: SAMPLE.companyName,
        name: SAMPLE.name,
        date: SAMPLE.date,
        time: SAMPLE.time,
        bookingId: SAMPLE.bookingId,
        baseUrl: base,
      });
    case "lead":
      return buildLeadNotification({
        companyName: SAMPLE.companyName,
        action: "lead",
        data: { name: SAMPLE.name, email: SAMPLE.email, phone: SAMPLE.phone, notes: SAMPLE.notes },
      });
    case "booking-request":
      return buildLeadNotification({
        companyName: SAMPLE.companyName,
        action: "booking",
        data: { name: SAMPLE.name, email: SAMPLE.email, phone: SAMPLE.phone, date: SAMPLE.date, time: SAMPLE.time },
      });
    case "cancel":
      return buildLeadNotification({
        companyName: SAMPLE.companyName,
        action: "cancel",
        data: { name: SAMPLE.name, date: SAMPLE.date, time: SAMPLE.time },
      });
    case "change":
      return buildLeadNotification({
        companyName: SAMPLE.companyName,
        action: "change",
        data: { name: SAMPLE.name, date: SAMPLE.date, time: SAMPLE.time, new_date: "2026-07-28", new_time: "11:00" },
      });
    case "confirmation":
      return buildCustomerConfirmation({
        customerName: SAMPLE.name,
        companyName: SAMPLE.companyName,
        action: "booking",
        date: SAMPLE.date,
        time: SAMPLE.time,
        bookingId: SAMPLE.bookingId,
      });
    case "confirmation-lead":
      return buildCustomerConfirmation({
        customerName: SAMPLE.name,
        companyName: SAMPLE.companyName,
        action: "lead",
        notes: SAMPLE.notes,
      });
    default:
      return null;
  }
}

const MENU: { type: string; label: string; who: string }[] = [
  { type: "welcome", label: "Välkomstmail", who: "till kunden efter köp" },
  { type: "booking", label: "Bokningsnotis", who: "till ägaren · med .ics" },
  { type: "booking-request", label: "Bokningsförfrågan", who: "till ägaren" },
  { type: "lead", label: "Lead-notis", who: "till ägaren" },
  { type: "cancel", label: "Avbokning", who: "till ägaren" },
  { type: "change", label: "Ändrad bokning", who: "till ägaren" },
  { type: "confirmation", label: "Bokningsbekräftelse", who: "till slutkunden · med .ics" },
  { type: "confirmation-lead", label: "Kontaktbekräftelse", who: "till slutkunden" },
];

function indexPage(): string {
  const rows = MENU.map(
    (m) => `
    <a href="/api/test-email/preview?type=${m.type}" style="display:block;text-decoration:none;background:#fff;border:1px solid #e5e5e5;border-radius:14px;padding:18px 20px;margin-bottom:12px;">
      <div style="font-size:15px;font-weight:600;color:#1d1d1f;">${m.label}</div>
      <div style="font-size:13px;color:#8e8e93;margin-top:2px;">${m.who}</div>
    </a>`
  ).join("");

  return `<!DOCTYPE html><html lang="sv"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Mail-previews</title></head>
<body style="margin:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:48px 20px;">
    <h1 style="font-size:24px;font-weight:600;color:#1d1d1f;margin:0 0 4px;">Alla mail</h1>
    <p style="font-size:14px;color:#6e6e73;margin:0 0 28px;">Live-previews av de riktiga mall-funktionerna. Klicka för att se varje mail.</p>
    ${rows}
  </div>
</body></html>`;
}

function chrome(type: string, built: Built): string {
  const hasIcs = "ics" in built && !!built.ics;
  const nav = MENU.map(
    (m) =>
      `<a href="/api/test-email/preview?type=${m.type}" style="font-size:12px;text-decoration:none;padding:6px 12px;border-radius:50px;${
        m.type === type ? "background:#1d1d1f;color:#fff;" : "background:#fff;color:#6e6e73;border:1px solid #e5e5e5;"
      }">${m.label}</a>`
  ).join(" ");

  const icsBar = hasIcs
    ? `<a href="/api/test-email/preview?type=${type}&ics=1" style="display:inline-block;font-size:12px;font-weight:600;text-decoration:none;background:#E8440A;color:#fff;padding:8px 16px;border-radius:50px;">⬇ Ladda ner .ics-bilagan</a>`
    : `<span style="font-size:12px;color:#a0a0a8;">Detta mail har ingen .ics-bilaga</span>`;

  return `<!DOCTYPE html><html lang="sv"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Preview: ${type}</title></head>
<body style="margin:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="background:#fff;border-bottom:1px solid #e5e5e5;padding:14px 20px;">
    <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:12px;">
      <a href="/api/test-email/preview" style="font-size:12px;text-decoration:none;color:#E8440A;font-weight:600;margin-right:6px;">← Alla mail</a>
      ${nav}
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center;">
      <span style="font-size:12px;color:#8e8e93;">Ämne: <strong style="color:#1d1d1f;">${built.subject}</strong></span>
      ${icsBar}
    </div>
  </div>
  ${built.html}
</body></html>`;
}

export async function GET(req: NextRequest) {
  const base = req.nextUrl.origin;
  const type = req.nextUrl.searchParams.get("type");
  const wantIcs = req.nextUrl.searchParams.get("ics") === "1";

  if (!type) {
    return new NextResponse(indexPage(), { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }

  const built = render(type, base);
  if (!built) {
    return new NextResponse("Okänd mailtyp", { status: 404 });
  }

  if (wantIcs) {
    const ics = "ics" in built ? built.ics : null;
    if (!ics) return new NextResponse("Detta mail har ingen .ics-bilaga", { status: 404 });
    return new NextResponse(ics, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="bokning.ics"`,
        "Cache-Control": "no-store",
      },
    });
  }

  return new NextResponse(chrome(type, built), { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
