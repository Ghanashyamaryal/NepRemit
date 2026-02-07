interface RateAlertEmailProps {
  userName: string;
  currencyPair: string;
  targetRate: number;
  currentRate: number;
  direction: "above" | "below";
}

export function rateAlertEmailTemplate({
  userName,
  currencyPair,
  targetRate,
  currentRate,
  direction,
}: RateAlertEmailProps): string {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nepremit.com";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rate Alert Triggered</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                Rate Alert Triggered!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 16px; color: #374151; font-size: 16px;">
                Hi ${userName},
              </p>
              <p style="margin: 0 0 24px; color: #374151; font-size: 16px;">
                Your rate alert for <strong>${currencyPair}</strong> has been triggered.
              </p>

              <!-- Alert Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border: 1px solid #22c55e; border-radius: 8px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color: #166534; font-size: 14px; padding-bottom: 8px;">
                          <strong>Target:</strong> ${direction === "above" ? "Above" : "Below"} ${targetRate.toFixed(2)} NPR
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #166534; font-size: 18px; font-weight: bold;">
                          <strong>Current Rate:</strong> ${currentRate.toFixed(2)} NPR
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${appUrl}/calculator" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                      Compare Rates Now
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 32px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #6b7280; font-size: 14px; text-align: center;">
                You received this email because you set up a rate alert on NepRemit.
                <br>
                <a href="${appUrl}/profile" style="color: #2563eb; text-decoration: underline;">Manage your notification preferences</a>
              </p>
            </td>
          </tr>
        </table>

        <!-- Legal Footer -->
        <table width="600" cellpadding="0" cellspacing="0" style="margin-top: 24px;">
          <tr>
            <td style="text-align: center; color: #9ca3af; font-size: 12px;">
              &copy; ${new Date().getFullYear()} NepRemit. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
