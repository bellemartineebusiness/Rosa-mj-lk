export default function EmailPreview() {
  const siteUrl = "https://bellemartinee.se";
  const dashboardUrl = `${siteUrl}/dashboard/exempel-id-123`;
  const embedCode = `&lt;script src="${siteUrl}/widget.js" data-customer-id="exempel-id-123"&gt;&lt;/script&gt;`;

  return (
    <div
      style={{ margin: 0, padding: 0, background: "#f5f5f7", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", minHeight: "100vh" }}
      dangerouslySetInnerHTML={{
        __html: `
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e5e5e5;">
      <tr>
        <td style="background:#0a0a0a;padding:32px 40px;">
          <p style="margin:0;font-size:20px;font-weight:600;color:#ffffff;letter-spacing:-0.5px;">Belle Martineé</p>
        </td>
      </tr>
      <tr>
        <td style="padding:40px;">
          <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#8e8e93;">Välkommen</p>
          <h1 style="margin:0 0 16px;font-size:28px;font-weight:600;color:#1d1d1f;letter-spacing:-0.5px;line-height:1.2;">Din chattbot är redo.</h1>
          <p style="margin:0 0 32px;font-size:15px;color:#6e6e73;line-height:1.6;">
            Tack för att du valde Belle Martineé. Din bot är nu aktiv och redo att svara på dina kunders frågor dygnet runt.
          </p>
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
      <tr>
        <td style="padding:24px 40px;border-top:1px solid #e5e5e5;">
          <p style="margin:0;font-size:12px;color:#a0a0a8;">© 2026 Belle Martineé · <a href="${siteUrl}/integritetspolicy" style="color:#a0a0a8;">Integritetspolicy</a></p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>`,
      }}
    />
  );
}
