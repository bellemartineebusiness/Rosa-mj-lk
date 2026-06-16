import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function formatIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
}

function generateIcs(name: string, date: string, time: string, uid: string): string {
  const now = new Date();
  let dtstart: string;
  let dtend: string;

  const parsed = date && time ? new Date(`${date}T${time}:00`) : null;

  if (parsed && !isNaN(parsed.getTime())) {
    const end = new Date(parsed.getTime() + 60 * 60 * 1000);
    dtstart = `DTSTART:${formatIcsDate(parsed)}`;
    dtend   = `DTEND:${formatIcsDate(end)}`;
  } else if (date) {
    const d = date.replace(/-/g, "");
    dtstart = `DTSTART;VALUE=DATE:${d}`;
    dtend   = `DTEND;VALUE=DATE:${d}`;
  } else {
    const d = now.toISOString().split("T")[0].replace(/-/g, "");
    dtstart = `DTSTART;VALUE=DATE:${d}`;
    dtend   = `DTEND;VALUE=DATE:${d}`;
  }

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Belle Martineé//Chattbot//EN",
    "BEGIN:VEVENT",
    `UID:booking-${uid}@bellemartinee.se`,
    `DTSTAMP:${formatIcsDate(now)}`,
    dtstart,
    dtend,
    `SUMMARY:Bokning – ${name}`,
    "DESCRIPTION:Bokad via chattbot",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export async function sendBookingNotification({
  to,
  companyName,
  name,
  date,
  time,
  bookingId,
}: {
  to: string;
  companyName: string;
  name: string;
  date: string;
  time: string;
  bookingId: string;
}) {
  const ics     = generateIcs(name, date, time, bookingId);
  const icsB64  = Buffer.from(ics).toString("base64");
  const safeName = name.toLowerCase().replace(/\s+/g, "-");

  await getResend().emails.send({
    from: "Belle Martineé <info@bellemartinee.se>",
    to,
    subject: `Ny bokning – ${name}${date ? ` · ${date}` : ""}${time ? ` ${time}` : ""}`,
    html: `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e5e5e5;">
        <tr>
          <td style="background:#0a0a0a;padding:24px 32px;">
            <p style="margin:0;font-size:16px;font-weight:600;color:#ffffff;">${companyName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#8e8e93;">Ny bokning</p>
            <h1 style="margin:0 0 24px;font-size:22px;font-weight:600;color:#1d1d1f;letter-spacing:-0.5px;">${name}</h1>

            <table cellpadding="0" cellspacing="0" style="background:#f5f5f7;border-radius:12px;padding:16px 20px;margin-bottom:24px;width:100%;">
              ${date ? `<tr><td style="padding:5px 0;"><span style="font-size:12px;color:#8e8e93;display:inline-block;width:60px;">Datum</span><span style="font-size:13px;font-weight:500;color:#1d1d1f;">${date}</span></td></tr>` : ""}
              ${time ? `<tr><td style="padding:5px 0;"><span style="font-size:12px;color:#8e8e93;display:inline-block;width:60px;">Tid</span><span style="font-size:13px;font-weight:500;color:#1d1d1f;">${time}</span></td></tr>` : ""}
            </table>

            <p style="margin:0;font-size:13px;color:#6e6e73;line-height:1.6;">
              Öppna den bifogade <strong>.ics-filen</strong> för att lägga till bokningen direkt i Google Calendar, Outlook eller Apple Calendar.
            </p>
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
    attachments: [
      {
        filename: `bokning-${safeName}.ics`,
        content: icsB64,
      },
    ],
  });
}
