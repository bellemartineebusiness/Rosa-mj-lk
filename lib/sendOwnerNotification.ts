import { Resend } from "resend";

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "simonlind06@icloud.com";

export function buildOwnerNotification(opts: {
  customerEmail: string;
  customerId: string;
  loginToken?: string;
  isReactivation?: boolean;
  siteUrl?: string;
}): { subject: string; html: string } {
  const siteUrl = opts.siteUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://bellemartinee.se";
  const dashboardUrl = opts.loginToken
    ? `${siteUrl}/dashboard/${opts.customerId}?token=${opts.loginToken}`
    : `${siteUrl}/dashboard/${opts.customerId}`;
  const embedCode = `&lt;script src="${siteUrl}/widget.js" data-customer-id="${opts.customerId}"&gt;&lt;/script&gt;`;
  const label = opts.isReactivation ? "Kund reaktiverad" : "Ny kund";

  const html = `
<!DOCTYPE html>
<html lang="sv">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e5e5e5;">
        <tr>
          <td style="padding:40px;">
            <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#E8440A;">${label}</p>
            <h1 style="margin:0 0 24px;font-size:24px;font-weight:600;color:#1d1d1f;letter-spacing:-0.5px;line-height:1.2;">💰 ${opts.customerEmail}</h1>

            <p style="margin:0 0 8px;font-size:13px;font-weight:500;color:#1d1d1f;">Kundens e-post</p>
            <div style="background:#f5f5f7;border-radius:10px;padding:14px 16px;margin-bottom:24px;">
              <span style="color:#1d1d1f;font-size:13px;">${opts.customerEmail}</span>
            </div>

            <p style="margin:0 0 8px;font-size:13px;font-weight:500;color:#1d1d1f;">Kundens dashboard</p>
            <div style="background:#f5f5f7;border-radius:10px;padding:14px 16px;margin-bottom:24px;">
              <a href="${dashboardUrl}" style="color:#E8440A;font-size:13px;text-decoration:none;word-break:break-all;">${dashboardUrl}</a>
            </div>

            <p style="margin:0 0 8px;font-size:13px;font-weight:500;color:#1d1d1f;">Kodraden (samma som kunden fick)</p>
            <div style="background:#0a0a0a;border-radius:10px;padding:14px 16px;">
              <code style="color:#E8440A;font-size:12px;word-break:break-all;">${embedCode}</code>
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
    `;

  return {
    subject: `${label}: ${opts.customerEmail}`,
    html,
  };
}

export async function sendOwnerNotification(opts: {
  customerEmail: string;
  customerId: string;
  loginToken?: string;
  isReactivation?: boolean;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { subject, html } = buildOwnerNotification(opts);

  await resend.emails.send({
    from: "Belle Martineé <info@bellemartinee.se>",
    to: OWNER_EMAIL,
    subject,
    html,
  });
}
