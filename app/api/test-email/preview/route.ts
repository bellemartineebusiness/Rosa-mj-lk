import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const base = req.nextUrl.origin;
  const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Bokning%20%E2%80%93%20Anna%20Svensson&dates=20260705T080000Z/20260705T090000Z&details=Bokad%20via%20chattbot`;
  const outlook = `https://outlook.live.com/calendar/0/deeplink/compose?subject=Bokning%20%E2%80%93%20Anna%20Svensson&startdt=2026-07-05T10:00:00&enddt=2026-07-05T11:00:00&body=Bokad%20via%20chattbot`;
  const apple = `${base}/api/ics?name=Anna%20Svensson&date=2026-07-05&time=10:00&uid=preview`;

  const html = `<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e5e5e5;">
        <tr>
          <td style="background:#ffffff;padding:12px 32px;text-align:center;border-bottom:1px solid #e5e5e5;">
            <img src="${base}/Belle%20(11).png" alt="Belle Martineé" style="height:80px;width:auto;display:inline-block;" />
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#8e8e93;">Ny bokning</p>
            <h1 style="margin:0 0 24px;font-size:22px;font-weight:600;color:#1d1d1f;letter-spacing:-0.5px;">Anna Svensson</h1>
            <table cellpadding="0" cellspacing="0" style="background:#f5f5f7;border-radius:12px;padding:16px 20px;margin-bottom:24px;width:100%;">
              <tr><td style="padding:5px 0;"><span style="font-size:12px;color:#8e8e93;display:inline-block;width:60px;">Datum</span><span style="font-size:13px;font-weight:500;color:#1d1d1f;">2026-07-05</span></td></tr>
              <tr><td style="padding:5px 0;"><span style="font-size:12px;color:#8e8e93;display:inline-block;width:60px;">Tid</span><span style="font-size:13px;font-weight:500;color:#1d1d1f;">10:00</span></td></tr>
            </table>
            <table cellpadding="0" cellspacing="0" style="margin-top:8px;">
              <tr>
                <td style="padding-right:8px;">
                  <a href="${gcal}" style="display:inline-block;background:#E8440A;color:#ffffff;font-size:12px;font-weight:600;padding:10px 18px;border-radius:50px;text-decoration:none;">Google Calendar</a>
                </td>
                <td style="padding-right:8px;">
                  <a href="${outlook}" style="display:inline-block;background:#0078d4;color:#ffffff;font-size:12px;font-weight:600;padding:10px 18px;border-radius:50px;text-decoration:none;">Outlook</a>
                </td>
                <td>
                  <a href="${apple}" style="display:inline-block;background:#1d1d1f;color:#ffffff;font-size:12px;font-weight:600;padding:10px 18px;border-radius:50px;text-decoration:none;">Apple Calendar</a>
                </td>
              </tr>
            </table>
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

  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}
