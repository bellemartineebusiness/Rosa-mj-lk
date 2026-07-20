import { Resend } from "resend";

export function buildWelcomeEmail(opts: {
  customerId: string;
  loginToken?: string;
  siteUrl?: string;
}): { subject: string; html: string } {
  const siteUrl = opts.siteUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://bellemartinee.se";
  const dashboardUrl = opts.loginToken
    ? `${siteUrl}/dashboard/${opts.customerId}?token=${opts.loginToken}`
    : `${siteUrl}/dashboard/${opts.customerId}`;
  const embedCode = `&lt;script src="${siteUrl}/widget.js" data-customer-id="${opts.customerId}"&gt;&lt;/script&gt;`;

  const html = `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e5e5e5;">

        <!-- Header -->
        <tr>
          <td style="background:#ffffff;padding:12px 32px;text-align:center;border-bottom:1px solid #e5e5e5;">
            <img src="${siteUrl}/Belle%20(11).png" alt="Belle Martineé" style="height:80px;width:auto;display:inline-block;" />
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#8e8e93;">Välkommen</p>
            <h1 style="margin:0 0 16px;font-size:28px;font-weight:600;color:#1d1d1f;letter-spacing:-0.5px;line-height:1.2;">Din chattbot är redo.</h1>
            <p style="margin:0 0 32px;font-size:15px;color:#6e6e73;line-height:1.6;">
              Tack för att du valde Belle Martineé. Din bot är nu aktiv och redo att svara på dina kunders frågor dygnet runt.
            </p>

            <!-- Dashboard-knapp -->
            <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="background:#E8440A;border-radius:50px;padding:14px 28px;">
                  <a href="${dashboardUrl}" style="color:#ffffff;text-decoration:none;font-size:14px;font-weight:500;">Gå till din dashboard →</a>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px;font-size:13px;font-weight:500;color:#1d1d1f;">Din personliga länk</p>
            <p style="margin:0 0 24px;font-size:13px;color:#6e6e73;">Spara denna länk — du använder den för att anpassa din bot och hämta inbäddningskoden.</p>
            <div style="background:#f5f5f7;border-radius:10px;padding:14px 16px;margin-bottom:32px;">
              <a href="${dashboardUrl}" style="color:#E8440A;font-size:13px;text-decoration:none;word-break:break-all;">${dashboardUrl}</a>
            </div>

            <hr style="border:none;border-top:1px solid #e5e5e5;margin:0 0 32px;">

            <p style="margin:0 0 8px;font-size:13px;font-weight:500;color:#1d1d1f;">Så här lägger du in boten på din hemsida</p>
            <p style="margin:0 0 12px;font-size:13px;color:#6e6e73;">Klistra in denna kod i headern eller footern på din hemsida:</p>
            <div style="background:#0a0a0a;border-radius:10px;padding:14px 16px;margin-bottom:32px;">
              <code style="color:#E8440A;font-size:12px;word-break:break-all;">${embedCode}</code>
            </div>

            <p style="margin:0;font-size:13px;color:#6e6e73;line-height:1.6;">
              Har du frågor? Hör av dig på <a href="mailto:support@bellemartinee.se" style="color:#E8440A;text-decoration:none;">support@bellemartinee.se</a>.<br>Vi svarar inom 24 timmar.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 40px;border-top:1px solid #e5e5e5;">
            <p style="margin:0;font-size:12px;color:#a0a0a8;">© 2026 Belle Martineé · <a href="${siteUrl}/integritetspolicy" style="color:#a0a0a8;">Integritetspolicy</a></p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
    `;

  return { subject: "Din chattbot är redo — här är din länk", html };
}

export async function sendWelcomeEmail(email: string, customerId: string, loginToken?: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { subject, html } = buildWelcomeEmail({ customerId, loginToken });

  await resend.emails.send({
    from: "Belle Martineé <info@bellemartinee.se>",
    to: email,
    subject,
    html,
  });
}
