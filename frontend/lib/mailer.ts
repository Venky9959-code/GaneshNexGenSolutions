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
    `[Inquiry Engine] Processing inquiry notification for lead ${data.leadNumber}`
  );

  let smtpDispatched = false;
  let emailJsDispatched = false;

  // 1. Primary: Nodemailer SMTP (Direct Gmail SMTP — ensures real variable interpolation & zero template bugs)
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

      // A. Admin Lead Alert Email
      await transporter.sendMail({
        from: `"Ganesh NexGen Co Inquiries" <${smtpUser}>`,
        to: adminEmail,
        replyTo: data.email || smtpUser,
        subject: `🔥 New Project Inquiry: ${data.service} — ${data.name} (${data.leadNumber})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8F9FA; padding: 24px;">
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

      // B. Client Confirmation Auto-Reply Email (Exact visual match from user's screenshot, properly interpolated)
      if (data.email) {
        await transporter.sendMail({
          from: `"Ganesh NexGen Solutions" <${smtpUser}>`,
          to: data.email,
          subject: `We received your project inquiry! — Ganesh NexGen Solutions (${data.leadNumber})`,
          html: `
            <div style="margin: 0; padding: 24px; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              <div style="max-width: 560px; margin: 0 auto; background-color: #FFFFFF; border-radius: 14px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);">
                
                <!-- Blue Header Banner -->
                <div style="background-color: #2563EB; padding: 32px 24px; text-align: center;">
                  <h1 style="color: #FFFFFF; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 0.8px; text-transform: uppercase;">
                    GANESH NEXGEN SOLUTIONS
                  </h1>
                  <p style="color: #DBEAFE; margin: 8px 0 0 0; font-size: 14px; font-weight: 500;">
                    We received your project inquiry!
                  </p>
                </div>

                <!-- Main Body Content -->
                <div style="padding: 28px 24px; color: #0F172A;">
                  <p style="font-size: 16px; margin: 0 0 14px 0; color: #0F172A; font-weight: 500;">
                    Hi <strong>${data.name}</strong>,
                  </p>
                  <p style="font-size: 14px; color: #475569; line-height: 1.6; margin: 0 0 24px 0;">
                    Thank you for getting in touch with Ganesh NexGen Solutions. Our engineering team has received your project details and is currently reviewing your requirements.
                  </p>

                  <!-- Dashed Lead Reference Box -->
                  <div style="border: 2px dashed #CBD5E1; border-radius: 12px; padding: 18px 20px; text-align: center; margin-bottom: 24px; background-color: #F8FAFC;">
                    <p style="margin: 0; font-size: 12px; font-weight: 800; color: #64748B; letter-spacing: 1.2px; text-transform: uppercase;">
                      YOUR LEAD REFERENCE ID
                    </p>
                    <p style="margin: 8px 0 0 0; font-size: 26px; font-weight: 900; color: #2563EB; letter-spacing: 1px;">
                      ${data.leadNumber}
                    </p>
                  </div>

                  <!-- Inquiry Details Section -->
                  <div style="margin-bottom: 24px;">
                    <div style="font-size: 13px; font-weight: 800; color: #0F172A; letter-spacing: 0.8px; text-transform: uppercase; border-bottom: 1px solid #E2E8F0; padding-bottom: 8px; margin-bottom: 12px;">
                      INQUIRY DETAILS
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                      <tr>
                        <td style="padding: 9px 0; color: #64748B; width: 140px;">Service:</td>
                        <td style="padding: 9px 0; color: #0F172A; font-weight: 700; text-align: right;">${data.service}</td>
                      </tr>
                      <tr>
                        <td style="padding: 9px 0; color: #64748B;">Estimated Budget:</td>
                        <td style="padding: 9px 0; color: #0F172A; font-weight: 700; text-align: right;">${data.budget}</td>
                      </tr>
                      <tr>
                        <td style="padding: 9px 0; color: #64748B;">Timeline:</td>
                        <td style="padding: 9px 0; color: #0F172A; font-weight: 700; text-align: right;">${data.timeline}</td>
                      </tr>
                    </table>
                  </div>

                  <!-- What's Next Callout Box -->
                  <div style="background-color: #EFF6FF; border-left: 4px solid #2563EB; border-radius: 8px; padding: 14px 16px; margin-bottom: 24px;">
                    <p style="margin: 0; font-size: 13px; color: #1E40AF; line-height: 1.55;">
                      <strong>What's Next?</strong> A dedicated engineer will analyze your scope and get in touch with you via WhatsApp or Email within <strong>24 business hours</strong>.
                    </p>
                  </div>

                  <!-- Quick Action Buttons -->
                  <div style="text-align: center; padding-top: 8px;">
                    <a href="https://wa.me/919959828859?text=Hi%20Ganesh%20NexGen%20Team,%20my%20inquiry%20reference%20is%20${data.leadNumber}" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px; margin: 4px;">
                      💬 Chat on WhatsApp
                    </a>
                    <a href="mailto:${adminEmail}?subject=Regarding%20Inquiry%20${data.leadNumber}" style="display: inline-block; background-color: #0F172A; color: #FFFFFF; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 13px; margin: 4px;">
                      ✉️ Reply to Team
                    </a>
                  </div>

                </div>
              </div>
            </div>
          `,
        });
      }

      smtpDispatched = true;
      console.log(`[SMTP] Successfully dispatched inquiry emails for lead ${data.leadNumber}`);
    } catch (smtpErr) {
      console.error("[SMTP Error]", smtpErr);
    }
  }

  // 2. Fallback / Complementary: Dispatch EmailJS (if SMTP was not dispatched or as fallback)
  const emailJsServiceId = process.env.EMAILJS_SERVICE_ID || "service_pxn8ruk";
  const emailJsTemplateId = process.env.EMAILJS_TEMPLATE_ID || "template_bdvl026";
  const emailJsPublicKey = process.env.EMAILJS_PUBLIC_KEY || "tEyuktmK30LeGqW-h";
  const emailJsPrivateKey = process.env.EMAILJS_PRIVATE_KEY || "YtActWRVau_WR5UGUx38q";

  if (!smtpDispatched && emailJsServiceId && emailJsTemplateId && emailJsPublicKey) {
    try {
      console.log(`[EmailJS] Dispatching template ${emailJsTemplateId} via ${emailJsServiceId}...`);

      const emailJsPayload: Record<string, any> = {
        service_id: emailJsServiceId,
        template_id: emailJsTemplateId,
        user_id: emailJsPublicKey,
        template_params: {
          // Top-level variables
          name: data.name,
          to_name: data.name,
          user_name: data.name,
          from_name: "Ganesh NexGen Solutions",
          email: data.email,
          to_email: data.email,
          user_email: data.email,
          reply_to: data.email,
          phone: data.phone,
          service: data.service,
          budget: data.budget,
          timeline: data.timeline,
          notes: data.notes || "None provided",
          message: data.notes || "None provided",
          leadNumber: data.leadNumber,
          lead_number: data.leadNumber,
          date: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          // Nested object for templates using {{data.key}}
          data: {
            name: data.name,
            leadNumber: data.leadNumber,
            service: data.service,
            budget: data.budget,
            timeline: data.timeline,
            email: data.email,
            phone: data.phone,
            notes: data.notes || "None provided",
          },
          // Dot notation flat keys
          "data.name": data.name,
          "data.leadNumber": data.leadNumber,
          "data.service": data.service,
          "data.budget": data.budget,
          "data.timeline": data.timeline,
        },
      };

      if (emailJsPrivateKey) {
        emailJsPayload.accessToken = emailJsPrivateKey;
      }

      const ejsRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": process.env.NEXT_PUBLIC_SITE_URL || "https://ganeshnexgen.com",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        body: JSON.stringify(emailJsPayload),
      });

      if (ejsRes.ok) {
        emailJsDispatched = true;
        console.log(`[EmailJS] Successfully dispatched auto-reply for lead ${data.leadNumber}`);
      } else {
        const errText = await ejsRes.text();
        console.warn(`[EmailJS Notice] Status ${ejsRes.status}:`, errText);
      }
    } catch (ejsErr) {
      console.error("[EmailJS Dispatch Error]", ejsErr);
    }
  }

  // 3. Fallback Resend API if neither succeeded
  if (!smtpDispatched && !emailJsDispatched) {
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
          return { success: true, provider: "resend" };
        }
      } catch (resendErr) {
        console.error("[Resend Error]", resendErr);
      }
    }
  }

  return {
    success: smtpDispatched || emailJsDispatched,
    smtpDispatched,
    emailJsDispatched,
  };
}

