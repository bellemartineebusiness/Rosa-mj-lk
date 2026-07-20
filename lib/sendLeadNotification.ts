import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

type LeadData = {
  name?: string;
  email?: string;
  phone?: string;
  notes?: string;
  date?: string;
  time?: string;
  new_date?: string;
  new_time?: string;
};

// ── Mail till företagaren ─────────────────────────────────────
export function buildLeadNotification({
  companyName,
  action,
  data,
}: {
  companyName: string;
  action: "lead" | "booking" | "cancel" | "change";
  data: LeadData;
}): { subject: string; html: string } {
  void companyName;
  const subjectMap: Record<string, string> = {
    booking: `Ny bokningsförfrågan – ${data.name || "Okänd"}${data.date ? ` · ${data.date}` : ""}`,
    lead:    `Ny kontakt – ${data.name || "Okänd"}`,
    cancel:  `Avbokning – ${data.name || "Okänd"}${data.date ? ` · ${data.date}` : ""}`,
    change:  `Ändrad bokning – ${data.name || "Okänd"}${data.date ? ` · ${data.date}` : ""}${data.new_date ? ` → ${data.new_date}` : ""}`,
  };
  const subject = subjectMap[action] ?? `Meddelande – ${data.name || "Okänd"}`;

  const isBooking = action === "booking";
  const isCancel  = action === "cancel";
  const isChange  = action === "change";

  const rows = [
    data.name     && ["Namn",        data.name],
    data.email    && ["E-post",      data.email],
    data.phone    && ["Telefon",     data.phone],
    data.notes    && ["Meddelande",  data.notes],
    (isBooking || isCancel) && data.date && ["Datum", data.date],
    (isBooking || isCancel) && data.time && ["Tid",   data.time],
    isChange && data.date     && ["Gammalt datum", data.date],
    isChange && data.time     && ["Gammal tid",    data.time],
    isChange && data.new_date && ["Nytt datum",    data.new_date],
    isChange && data.new_time && ["Ny tid",        data.new_time],
    !isBooking && !isCancel && !isChange && data.date && ["Datum", data.date],
    !isBooking && !isCancel && !isChange && data.time && ["Tid",   data.time],
  ].filter(Boolean) as [string, string][];

  const tableRows = rows
    .map(([label, value]) => `
      <tr><td style="padding:5px 0;">
        <span style="font-size:12px;color:#8e8e93;display:inline-block;width:90px;">${label}</span>
        <span style="font-size:13px;font-weight:500;color:#1d1d1f;">${value}</span>
      </td></tr>`)
    .join("");

  const html = `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;overflow:hidden;border:1px solid #e5e5e5;">
        <tr>
          <td style="background:#ffffff;padding:12px 32px;text-align:center;border-bottom:1px solid #e5e5e5;">
            <img src="https://bellemartinee.se/Belle%20(11).png" alt="Belle Martineé" style="height:80px;width:auto;display:inline-block;" />
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#8e8e93;">${
              isBooking ? "Ny bokningsförfrågan" : isCancel ? "Avbokning" : isChange ? "Ändrad bokning" : "Ny kontakt"
            }</p>
            <h1 style="margin:0 0 24px;font-size:22px;font-weight:600;color:#1d1d1f;letter-spacing:-0.5px;">${data.name || "Okänd"}</h1>
            <table cellpadding="0" cellspacing="0" style="background:#f5f5f7;border-radius:12px;padding:16px 20px;margin-bottom:24px;width:100%;">
              ${tableRows}
            </table>
            <p style="margin:0;font-size:13px;color:#6e6e73;">${
              isCancel ? "Kunden har avbokat." : isChange ? "Kunden har ändrat sin bokning." : isBooking ? "Kontakta kunden för att bekräfta bokningen." : "Kontakta kunden för att följa upp."
            }</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #e5e5e5;">
            <p style="margin:0;font-size:12px;color:#a0a0a8;">Belle Martineé · <a href="mailto:support@bellemartinee.se" style="color:#a0a0a8;">support@bellemartinee.se</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html };
}

export async function sendLeadNotification({
  to,
  companyName,
  action,
  data,
}: {
  to: string;
  companyName: string;
  action: "lead" | "booking" | "cancel" | "change";
  data: LeadData;
}) {
  const { subject, html } = buildLeadNotification({ companyName, action, data });
  await getResend().emails.send({
    from: "Belle Martineé <info@bellemartinee.se>",
    to,
    subject,
    html,
  });
}

// ── Bekräftelsemail till kunden ───────────────────────────────
type ConfirmationParams = {
  customerName: string;
  companyName: string;
  action: "lead" | "booking";
  notes?: string;
  date?: string;
  time?: string;
  bookingId?: string;
  baseUrl?: string;
};

export function buildCustomerConfirmation({
  customerName,
  companyName,
  action,
  notes,
  date,
  time,
  bookingId,
}: ConfirmationParams): { subject: string; html: string; ics: string | null } {
  const isBooking = action === "booking";

  const bookingDetails = isBooking && (date || time) ? `
    <table cellpadding="0" cellspacing="0" style="background:#f5f5f7;border-radius:12px;padding:16px 20px;margin-bottom:24px;width:100%;">
      ${date ? `<tr><td style="padding:4px 0;"><span style="font-size:12px;color:#8e8e93;display:inline-block;width:60px;">Datum</span><span style="font-size:13px;font-weight:500;color:#1d1d1f;">${date}</span></td></tr>` : ""}
      ${time ? `<tr><td style="padding:4px 0;"><span style="font-size:12px;color:#8e8e93;display:inline-block;width:60px;">Tid</span><span style="font-size:13px;font-weight:500;color:#1d1d1f;">${time}</span></td></tr>` : ""}
    </table>` : "";

  const gcalUrl = isBooking && date ? (() => {
    const title   = encodeURIComponent(`Bokning hos ${companyName}`);
    const details = encodeURIComponent("Bokad via chattbot");
    if (time) {
      const start = new Date(`${date}T${time}:00`);
      const end   = new Date(start.getTime() + 60 * 60 * 1000);
      const fmt   = (d: Date) => d.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(start)}/${fmt(end)}&details=${details}`;
    }
    const d = date.replace(/-/g, "");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${d}/${d}&details=${details}`;
  })() : null;

  const outlookUrl = isBooking && date ? (() => {
    const title   = encodeURIComponent(`Bokning hos ${companyName}`);
    const details = encodeURIComponent("Bokad via chattbot");
    if (time) {
      const start = new Date(`${date}T${time}:00`);
      const end   = new Date(start.getTime() + 60 * 60 * 1000);
      return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${start.toISOString()}&enddt=${end.toISOString()}&body=${details}`;
    }
    return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${date}&enddt=${date}&body=${details}`;
  })() : null;

  const calendarButtons = gcalUrl ? `
    <p style="margin:0 0 14px;font-size:13px;color:#6e6e73;">Lägg till i din kalender:</p>
    <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      <tr>
        <td style="padding-right:8px;">
          <a href="${gcalUrl}" target="_blank" style="display:inline-block;background:#E8440A;color:#ffffff;font-size:12px;font-weight:600;padding:10px 18px;border-radius:50px;text-decoration:none;">Google Calendar</a>
        </td>
        <td style="padding-right:8px;">
          <a href="${outlookUrl}" target="_blank" style="display:inline-block;background:#0078d4;color:#ffffff;font-size:12px;font-weight:600;padding:10px 18px;border-radius:50px;text-decoration:none;">Outlook</a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 24px;font-size:12px;color:#8e8e93;">📅 Apple Calendar: kalenderinbjudan finns bifogad i mailet.</p>` : "";

  // Generera ICS-innehåll för bokningar
  const ics: string | null = isBooking && date && bookingId ? (() => {
    const summary  = `Bokning hos ${companyName}`;
    const uid      = bookingId;
    const dtstamp  = new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
    let dtstart: string, dtend: string;
    if (time) {
      const localDt  = `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;
      const [h, m]   = time.split(":").map(Number);
      const localEnd = `${date.replace(/-/g, "")}T${String(h + 1).padStart(2, "0")}${String(m).padStart(2, "0")}00`;
      dtstart = `DTSTART;TZID=Europe/Stockholm:${localDt}`;
      dtend   = `DTEND;TZID=Europe/Stockholm:${localEnd}`;
    } else {
      const d = date.replace(/-/g, "");
      dtstart = `DTSTART;VALUE=DATE:${d}`;
      dtend   = `DTEND;VALUE=DATE:${d}`;
    }
    return [
      "BEGIN:VCALENDAR", "VERSION:2.0", "CALSCALE:GREGORIAN",
      "PRODID:-//Belle Martineé//Chattbot//EN",
      "BEGIN:VTIMEZONE", "TZID:Europe/Stockholm",
      "BEGIN:DAYLIGHT", "DTSTART:19700329T020000", "TZOFFSETFROM:+0100", "TZOFFSETTO:+0200", "TZNAME:CEST", "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3", "END:DAYLIGHT",
      "BEGIN:STANDARD", "DTSTART:19701025T030000", "TZOFFSETFROM:+0200", "TZOFFSETTO:+0100", "TZNAME:CET", "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10", "END:STANDARD",
      "END:VTIMEZONE",
      "BEGIN:VEVENT",
      `UID:booking-${uid}@bellemartinee.se`,
      `DTSTAMP:${dtstamp}`, dtstart, dtend,
      `SUMMARY:${summary}`,
      `DESCRIPTION:Bokad via chattbot`,
      "END:VEVENT", "END:VCALENDAR",
    ].join("\r\n");
  })() : null;

  const subject = isBooking ? "Din bokningsförfrågan är mottagen" : "Tack för ditt meddelande";

  const html = `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;overflow:hidden;border:1px solid #e5e5e5;">
        <tr>
          <td style="background:#ffffff;padding:12px 32px;text-align:center;border-bottom:1px solid #e5e5e5;">
            <img src="https://bellemartinee.se/Belle%20(11).png" alt="Belle Martineé" style="height:80px;width:auto;display:inline-block;" />
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 12px;font-size:22px;font-weight:600;color:#1d1d1f;letter-spacing:-0.5px;">Hej ${customerName},</h1>
            <p style="margin:0 0 24px;font-size:15px;color:#6e6e73;line-height:1.6;">
              ${isBooking
                ? "Din bokningsförfrågan är mottagen. Vi hör av oss inom kort för att bekräfta tid."
                : "Tack för att du hörde av dig. Vi återkommer till dig så snart som möjligt."}
            </p>
            ${bookingDetails}
            ${calendarButtons}
            ${notes ? `
            <div style="background:#f5f5f7;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
              <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#8e8e93;">Ditt ärende</p>
              <p style="margin:0;font-size:13px;color:#1d1d1f;">${notes}</p>
            </div>` : ""}
            <p style="margin:0;font-size:13px;color:#6e6e73;line-height:1.6;">Med vänliga hälsningar,<br><strong style="color:#1d1d1f;">${companyName}</strong></p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #e5e5e5;">
            <p style="margin:0;font-size:12px;color:#a0a0a8;">Detta är ett automatiskt svar från ${companyName}s chattbot.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html, ics };
}

export async function sendCustomerConfirmation(params: ConfirmationParams & { to: string }) {
  const { to, companyName } = params;
  const { subject, html, ics } = buildCustomerConfirmation(params);
  await getResend().emails.send({
    from: `${companyName} <info@bellemartinee.se>`,
    to,
    subject,
    html,
    ...(ics ? { attachments: [{ filename: "bokning.ics", content: Buffer.from(ics).toString("base64") }] } : {}),
  });
}

// ── Slack-notis ───────────────────────────────────────────────
export async function sendSlackNotification({
  webhookUrl,
  companyName,
  action,
  data,
}: {
  webhookUrl: string;
  companyName: string;
  action: "lead" | "booking" | "cancel" | "change";
  data: LeadData;
}) {
  const emojiMap: Record<string, string> = { booking: "📅", lead: "🙋", cancel: "❌", change: "🔄" };
  const titleMap: Record<string, string> = { booking: "Ny bokningsförfrågan", lead: "Ny kontakt", cancel: "Avbokning", change: "Ändrad bokning" };
  const emoji = emojiMap[action] ?? "📋";
  const title = titleMap[action] ?? "Meddelande";

  const fields = [
    data.name     && `*Namn:* ${data.name}`,
    data.email    && `*E-post:* ${data.email}`,
    data.phone    && `*Telefon:* ${data.phone}`,
    data.notes    && `*Meddelande:* ${data.notes}`,
    data.date     && (action === "change" ? `*Gammalt datum:* ${data.date}` : `*Datum:* ${data.date}`),
    data.time     && (action === "change" ? `*Gammal tid:* ${data.time}` : `*Tid:* ${data.time}`),
    data.new_date && `*Nytt datum:* ${data.new_date}`,
    data.new_time && `*Ny tid:* ${data.new_time}`,
  ].filter(Boolean).join("\n");

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `${emoji} *${title} — ${companyName}*\n${fields}`,
    }),
  });
}
