import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  console.warn(
    "RESEND_API_KEY not set. Email functionality will be disabled."
  );
}

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "NepRemit <alerts@nepremit.com>";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.warn("Email not sent - Resend not configured");
    return null;
  }

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    });
    return result;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
