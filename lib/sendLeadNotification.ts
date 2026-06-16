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
};

// ── Mail till företagaren ─────────────────────────────────────
export async function sendLeadNotification({
  to,
  companyName,
  action,
  data,
}: {
  to: string;
  companyName: string;
  action: "lead" | "booking";
  data: LeadData;
}) {
  const isBooking = action === "booking";
  const subject   = isBooking
    ? `Ny bokningsförfrågan – ${data.name || "Okänd"}${data.date ? ` · ${data.date}` : ""}`
    : `Ny kontakt – ${data.name || "Okänd"}`;

  const rows = [
    data.name  && ["Namn",        data.name],
    data.email && ["E-post",      data.email],
    data.phone && ["Telefon",     data.phone],
    data.notes && ["Meddelande",  data.notes],
    data.date  && ["Datum",       data.date],
    data.time  && ["Tid",         data.time],
  ].filter(Boolean) as [string, string][];

  const tableRows = rows
    .map(([label, value]) => `
      <tr><td style="padding:5px 0;">
        <span style="font-size:12px;color:#8e8e93;display:inline-block;width:90px;">${label}</span>
        <span style="font-size:13px;font-weight:500;color:#1d1d1f;">${value}</span>
      </td></tr>`)
    .join("");

  await getResend().emails.send({
    from: "Belle Martineé <info@bellemartinee.se>",
    to,
    subject,
    html: `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;overflow:hidden;border:1px solid #e5e5e5;">
        <tr>
          <td style="background:#0a0a0a;padding:24px 32px;">
            <p style="margin:0;font-size:16px;font-weight:600;color:#fff;">${companyName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#8e8e93;">${isBooking ? "Ny bokningsförfrågan" : "Ny kontakt"}</p>
            <h1 style="margin:0 0 24px;font-size:22px;font-weight:600;color:#1d1d1f;letter-spacing:-0.5px;">${data.name || "Okänd"}</h1>
            <table cellpadding="0" cellspacing="0" style="background:#f5f5f7;border-radius:12px;padding:16px 20px;margin-bottom:24px;width:100%;">
              ${tableRows}
            </table>
            <p style="margin:0;font-size:13px;color:#6e6e73;">Kontakta kunden för att ${isBooking ? "bekräfta bokningen" : "följa upp"}.</p>
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
</html>`,
  });
}

// ── Bekräftelsemail till kunden ───────────────────────────────
export async function sendCustomerConfirmation({
  to,
  customerName,
  companyName,
  action,
  notes,
}: {
  to: string;
  customerName: string;
  companyName: string;
  action: "lead" | "booking";
  notes?: string;
}) {
  const isBooking = action === "booking";

  await getResend().emails.send({
    from: `${companyName} <info@bellemartinee.se>`,
    to,
    subject: isBooking ? "Din bokningsförfrågan är mottagen" : "Tack för ditt meddelande",
    html: `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;overflow:hidden;border:1px solid #e5e5e5;">
        <tr>
          <td style="background:#0a0a0a;padding:24px 32px;">
            <p style="margin:0;font-size:16px;font-weight:600;color:#fff;">${companyName}</p>
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
</html>`,
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
  action: "lead" | "booking";
  data: LeadData;
}) {
  const isBooking = action === "booking";
  const emoji     = isBooking ? "📅" : "🙋";
  const title     = isBooking ? "Ny bokningsförfrågan" : "Ny kontakt";

  const fields = [
    data.name  && `*Namn:* ${data.name}`,
    data.email && `*E-post:* ${data.email}`,
    data.phone && `*Telefon:* ${data.phone}`,
    data.notes && `*Meddelande:* ${data.notes}`,
    data.date  && `*Datum:* ${data.date}`,
    data.time  && `*Tid:* ${data.time}`,
  ].filter(Boolean).join("\n");

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `${emoji} *${title} — ${companyName}*\n${fields}`,
    }),
  });
}
