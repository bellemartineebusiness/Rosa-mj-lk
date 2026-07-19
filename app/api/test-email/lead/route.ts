import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const base = req.nextUrl.origin;
  const logo = `${base}/Belle%20(11).png`;

  const html = `<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;overflow:hidden;border:1px solid #e5e5e5;">
        <tr>
          <td style="background:#ffffff;padding:12px 32px;text-align:center;border-bottom:1px solid #e5e5e5;">
            <img src="${logo}" alt="Belle Martineé" style="height:80px;width:auto;display:inline-block;" />
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#8e8e93;">Ny kontakt</p>
            <h1 style="margin:0 0 24px;font-size:22px;font-weight:600;color:#1d1d1f;letter-spacing:-0.5px;">Anna Svensson</h1>
            <table cellpadding="0" cellspacing="0" style="background:#f5f5f7;border-radius:12px;padding:16px 20px;margin-bottom:24px;width:100%;">
              <tr><td style="padding:5px 0;"><span style="font-size:12px;color:#8e8e93;display:inline-block;width:90px;">Namn</span><span style="font-size:13px;font-weight:500;color:#1d1d1f;">Anna Svensson</span></td></tr>
              <tr><td style="padding:5px 0;"><span style="font-size:12px;color:#8e8e93;display:inline-block;width:90px;">E-post</span><span style="font-size:13px;font-weight:500;color:#1d1d1f;">anna@exempel.se</span></td></tr>
              <tr><td style="padding:5px 0;"><span style="font-size:12px;color:#8e8e93;display:inline-block;width:90px;">Meddelande</span><span style="font-size:13px;font-weight:500;color:#1d1d1f;">Vill veta mer om era tjänster.</span></td></tr>
            </table>
            <p style="margin:0;font-size:13px;color:#6e6e73;">Kontakta kunden för att följa upp.</p>
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
