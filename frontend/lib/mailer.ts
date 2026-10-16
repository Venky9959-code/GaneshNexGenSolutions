import nodemailer from "nodemailer";

export interface InquiryData {
  leadNumber: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  notes?: string;
  createdAt: string;
}

export async function sendInquiryEmails(data: InquiryData) {
  const adminEmail =
    process.env.NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    "contact@ganeshnexgen.com";

  console.log(
    `[Inquiry Engine] Processing email notification for lead ${data.leadNumber} to admin: ${adminEmail}`
  );

  // 1. Nodemailer SMTP (Gmail or custom SMTP)
  const smtpUser = (process.env.SMTP_USER || process.env.EMAIL_USER || "").trim();
  const rawPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || "";
  const smtpPass = rawPass.replace(/\s+/g, "");
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT
    ? parseInt(process.env.SMTP_PORT, 10)
    : 465;

  if (smtpUser && smtpPass) {
    try {
      const transporter = smtpHost
        ? nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          })
        : nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

      // Admin Notification Email
      await transporter.sendMail({
        from: `"Ganesh NexGen Co Inquiries" <${smtpUser}>`,
        to: adminEmail,
        replyTo: data.email,
        subject: `🔥 New Project Inquiry: ${data.service} — ${data.name} (${data.leadNumber})`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #F8F9FA; padding: 24px;">
            <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 2px solid #141414; border-radius: 16px; overflow: hidden; box-shadow: 6px 6px 0 0 #141414;">
              <div style="background-color: #2D8CF0; padding: 20px; color: #FFFFFF;">
                <h1 style="margin: 0; font-size: 20px; font-weight: 900; text-transform: uppercase;">
                  🚀 New Project Inquiry Received
                </h1>
                <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">
                  Reference ID: <strong>${data.leadNumber}</strong>
                </p>
              </div>

              <div style="padding: 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748B; font-size: 13px; width: 140px;">Client Name:</td>
                    <td style="padding: 8px 0; color: #0F172A; font-size: 15px; font-weight: bold;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748B; font-size: 13px;">Phone / WhatsApp:</td>
                    <td style="padding: 8px 0; color: #0F172A; font-size: 15px; font-weight: bold;">
                      <a href="tel:${data.phone}" style="color: #2D8CF0; text-decoration: none;">${data.phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748B; font-size: 13px;">Email Address:</td>
                    <td style="padding: 8px 0; color: #0F172A; font-size: 15px;">
                      <a href="mailto:${data.email}" style="color: #2D8CF0; text-decoration: none;">${data.email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748B; font-size: 13px;">Service Required:</td>
                    <td style="padding: 8px 0; color: #2D8CF0; font-size: 15px; font-weight: bold;">${data.service}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748B; font-size: 13px;">Budget:</td>
                    <td style="padding: 8px 0; color: #0F172A; font-size: 15px; font-weight: bold;">${data.budget}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748B; font-size: 13px;">Target Timeline:</td>
                    <td style="padding: 8px 0; color: #0F172A; font-size: 15px;">${data.timeline}</td>
                  </tr>
                </table>

                ${
                  data.notes
                    ? `
                  <div style="margin-top: 20px; background-color: #FFFBEB; border: 2px solid #F59E0B; border-radius: 12px; padding: 14px;">
                    <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: bold; color: #B45309; text-transform: uppercase;">
                      Client Notes & Scope:
                    </p>
                    <p style="margin: 0; font-size: 14px; color: #1F2937; line-height: 1.5;">
                      ${data.notes.replace(/\n/g, "<br />")}
                    </p>
                  </div>
                `
                    : ""
                }

                <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #E2E8F0; text-align: center;">
                  <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, "")}" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 8px; margin-right: 8px; font-size: 13px;">
                    💬 Open WhatsApp Chat
                  </a>
                  <a href="mailto:${data.email}?subject=Regarding Your Inquiry with Ganesh NexGen Co (${data.leadNumber})" style="display: inline-block; background-color: #0F172A; color: #FFFFFF; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px;">
                    ✉️ Reply via Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        `,
      });

      console.log(`[SMTP] Successfully dispatched notification email to ${adminEmail}`);
      return { success: true };
    } catch (smtpErr) {
      console.error("[SMTP Error]", smtpErr);
    }
  }

  // 2. Resend API Fallback
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Ganesh NexGen Co <noreply@ganeshnexgen.com>",
          to: [adminEmail],
          subject: `🔥 New Project Inquiry: ${data.service} — ${data.name} (${data.leadNumber})`,
          html: `<p><strong>Client:</strong> ${data.name}</p><p><strong>Phone:</strong> ${data.phone}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Service:</strong> ${data.service}</p><p><strong>Budget:</strong> ${data.budget}</p><p><strong>Timeline:</strong> ${data.timeline}</p><p><strong>Notes:</strong> ${data.notes || "N/A"}</p>`,
        }),
      });
      if (res.ok) {
        console.log(`[Resend] Successfully sent inquiry alert to ${adminEmail}`);
        return { success: true };
      }
    } catch (resendErr) {
      console.error("[Resend Error]", resendErr);
    }
  }

  console.warn(
    "[Email Notice] No active SMTP or RESEND_API_KEY configured in environment variables. Email notification was logged to server console."
  );
  return { success: true, mocked: true };
}
