import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  "TZID:Europe/Stockholm",
  "BEGIN:DAYLIGHT",
  "DTSTART:19700329T020000",
  "TZOFFSETFROM:+0100",
  "TZOFFSETTO:+0200",
  "TZNAME:CEST",
  "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "DTSTART:19701025T030000",
  "TZOFFSETFROM:+0200",
  "TZOFFSETTO:+0100",
  "TZNAME:CET",
  "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10",
  "END:STANDARD",
  "END:VTIMEZONE",
].join("\r\n");

function formatIcsDate(date: Date) {
  return date.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
}

function generateIcs(name: string, company: string, date: string, time: string, uid: string, notes = ""): string {
  const summary = notes ? `${notes} – ${name}` : (company ? `Bokning hos ${company}` : `Bokning`);
  let dtstart: string;
  let dtend: string;

  if (date && time) {
    const localDt  = `${date.replace(/-/g, "")}T${time.replace(":", "")}00`;
    const [h, m]   = time.split(":").map(Number);
    const endH     = String(h + 1).padStart(2, "0");
    const localEnd = `${date.replace(/-/g, "")}T${endH}${String(m).padStart(2, "0")}00`;
    dtstart = `DTSTART;TZID=Europe/Stockholm:${localDt}`;
    dtend   = `DTEND;TZID=Europe/Stockholm:${localEnd}`;
  } else if (date) {
    const d = date.replace(/-/g, "");
    dtstart = `DTSTART;VALUE=DATE:${d}`;
    dtend   = `DTEND;VALUE=DATE:${d}`;
  } else {
    const d = new Date().toISOString().split("T")[0].replace(/-/g, "");
    dtstart = `DTSTART;VALUE=DATE:${d}`;
    dtend   = `DTEND;VALUE=DATE:${d}`;
  }

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "PRODID:-//Belle Martineé//Chattbot//EN",
    VTIMEZONE,
    "BEGIN:VEVENT",
    `UID:booking-${uid}@bellemartinee.se`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    dtstart,
    dtend,
    `SUMMARY:${summary}`,
    `DESCRIPTION:Bokad av ${name} via chattbot`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function buildCalendarUrls(name: string, company: string, date: string, time: string, uid: string, baseUrl: string, notes = "") {
  const title   = encodeURIComponent(notes ? `${notes} – ${name}` : `Bokning hos ${company || name}`);
  const details = encodeURIComponent(`Bokad av ${name} via chattbot`);
  const apple   = `${baseUrl}/api/ics?name=${encodeURIComponent(name)}&company=${encodeURIComponent(company)}&date=${encodeURIComponent(date)}&time=${encodeURIComponent(time)}&uid=${uid}&notes=${encodeURIComponent(notes)}`.replace(/^https?:\/\//, "webcal://");

  let gcal    = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  let outlook = "https://outlook.live.com/calendar/0/deeplink/compose";

  if (date && time) {
    const start = new Date(`${date}T${time}:00`);
    const end   = new Date(start.getTime() + 60 * 60 * 1000);
    const fmt   = (d: Date) => d.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
    gcal    = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(start)}/${fmt(end)}&details=${details}`;
    outlook = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${start.toISOString()}&enddt=${end.toISOString()}&body=${details}`;
  } else if (date) {
    const d = date.replace(/-/g, "");
    gcal    = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${d}/${d}&details=${details}`;
    outlook = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${date}&enddt=${date}&body=${details}`;
  }

  return { gcal, outlook, apple };
}

type BookingParams = {
  companyName: string;
  name: string;
  date: string;
  time: string;
  bookingId: string;
  notes?: string;
  baseUrl?: string;
};

export function buildBookingNotification({
  companyName,
  name,
  date,
  time,
  bookingId,
  notes,
  baseUrl = "https://bellemartinee.se",
}: BookingParams): { subject: string; html: string; ics: string } {
  const ics = generateIcs(name, companyName, date, time, bookingId, notes);
  const { gcal, outlook } = buildCalendarUrls(name, companyName, date, time, bookingId, baseUrl, notes);

  const subject = `Ny bokning – ${name}${notes ? ` · ${notes}` : ""}${date ? ` · ${date}` : ""}${time ? ` ${time}` : ""}`;

  const html = `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e5e5e5;">
        <tr>
          <td style="background:#ffffff;padding:12px 32px;text-align:center;border-bottom:1px solid #e5e5e5;">
            <img src="${baseUrl}/Belle%20(11).png" alt="Belle Martineé" style="height:80px;width:auto;display:inline-block;" />
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#8e8e93;">Ny bokning</p>
            <h1 style="margin:0 0 24px;font-size:22px;font-weight:600;color:#1d1d1f;letter-spacing:-0.5px;">${name}</h1>

            <table cellpadding="0" cellspacing="0" style="background:#f5f5f7;border-radius:12px;padding:16px 20px;margin-bottom:24px;width:100%;">
              ${notes ? `<tr><td style="padding:5px 0;"><span style="font-size:12px;color:#8e8e93;display:inline-block;width:60px;">Avser</span><span style="font-size:13px;font-weight:500;color:#1d1d1f;">${notes}</span></td></tr>` : ""}
              ${date ? `<tr><td style="padding:5px 0;"><span style="font-size:12px;color:#8e8e93;display:inline-block;width:60px;">Datum</span><span style="font-size:13px;font-weight:500;color:#1d1d1f;">${date}</span></td></tr>` : ""}
              ${time ? `<tr><td style="padding:5px 0;"><span style="font-size:12px;color:#8e8e93;display:inline-block;width:60px;">Tid</span><span style="font-size:13px;font-weight:500;color:#1d1d1f;">${time}</span></td></tr>` : ""}
            </table>

            <p style="margin:0 0 14px;font-size:13px;color:#6e6e73;">Lägg till i din kalender:</p>
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:8px;">
                  <a href="${gcal}" target="_blank" style="display:inline-block;background:#E8440A;color:#ffffff;font-size:12px;font-weight:600;padding:10px 18px;border-radius:50px;text-decoration:none;">Google Calendar</a>
                </td>
                <td style="padding-right:8px;">
                  <a href="${outlook}" target="_blank" style="display:inline-block;background:#0078d4;color:#ffffff;font-size:12px;font-weight:600;padding:10px 18px;border-radius:50px;text-decoration:none;">Outlook</a>
                </td>
              </tr>
            </table>
            <p style="margin:10px 0 0;font-size:12px;color:#8e8e93;">📅 Apple Calendar: kalenderinbjudan finns bifogad i mailet.</p>
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

  return { subject, html, ics };
}

export async function sendBookingNotification(params: BookingParams & { to: string }) {
  const { to, name } = params;
  const { subject, html, ics } = buildBookingNotification(params);
  const safeName = name.toLowerCase().replace(/\s+/g, "-");

  await getResend().emails.send({
    from: "Belle Martineé <info@bellemartinee.se>",
    to,
    subject,
    html,
    attachments: [
      {
        filename: `bokning-${safeName}.ics`,
        content: Buffer.from(ics).toString("base64"),
      },
    ],
  });
}
