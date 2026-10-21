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

  let emailJsDispatched = false;
  let smtpDispatched = false;

  // 1. Dispatch EmailJS (Automated Client Auto-Reply & Notification via Template)
  const emailJsServiceId = process.env.EMAILJS_SERVICE_ID || "service_pxn8ruk";
  const emailJsTemplateId = process.env.EMAILJS_TEMPLATE_ID || "template_bdvl026";
  const emailJsPublicKey = process.env.EMAILJS_PUBLIC_KEY || "tEyuktmK30LeGqW-h";
  const emailJsPrivateKey = process.env.EMAILJS_PRIVATE_KEY || "YtActWRVau_WR5UGUx38q";

  if (emailJsServiceId && emailJsTemplateId && emailJsPublicKey) {
    try {
      console.log(`[EmailJS] Dispatching template ${emailJsTemplateId} via ${emailJsServiceId}...`);

      const emailJsPayload: Record<string, any> = {
        service_id: emailJsServiceId,
        template_id: emailJsTemplateId,
        user_id: emailJsPublicKey,
        template_params: {
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

  // 2. Nodemailer SMTP (Admin Notification & Client Confirmation)
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

      // A. Admin Notification Email
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

      // B. Client Confirmation Email via SMTP if client provided email and EmailJS wasn't used as primary
      if (data.email && !emailJsDispatched) {
        await transporter.sendMail({
          from: `"Ganesh NexGen Solutions" <${smtpUser}>`,
          to: data.email,
          subject: `We received your inquiry #${data.leadNumber} — Ganesh NexGen Solutions`,
          html: `
            <div style="margin: 0; padding: 20px; background-color: #F0F4F8; font-family: sans-serif;">
              <div style="max-width: 580px; margin: 0 auto; background-color: #FFFFFF; border-radius: 14px; overflow: hidden; border: 2px solid #0B172A; box-shadow: 5px 5px 0px #0B172A;">
                <div style="background-color: #2D8CF0; padding: 24px; text-align: center;">
                  <h1 style="color: #FFFFFF; margin: 0; font-size: 20px; font-weight: 800; text-transform: uppercase;">
                    Ganesh NexGen Solutions
                  </h1>
                  <p style="color: #E0F2FE; margin: 4px 0 0 0; font-size: 13px;">
                    Inquiry Reference: <strong>${data.leadNumber}</strong>
                  </p>
                </div>
                <div style="padding: 24px; color: #0B172A;">
                  <p style="font-size: 15px; margin: 0 0 12px 0;">Hi <strong>${data.name}</strong>,</p>
                  <p style="font-size: 14px; color: #4A5970; line-height: 1.6; margin: 0 0 16px 0;">
                    Thank you for reaching out! We have received your project details for <strong>${data.service}</strong>. Our engineering team is currently reviewing your scope and will contact you within 24 hours.
                  </p>
                  <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 14px; margin-bottom: 20px;">
                    <div style="font-size: 13px; color: #64748B; margin-bottom: 4px;">Service: <strong style="color: #0B172A;">${data.service}</strong></div>
                    <div style="font-size: 13px; color: #64748B; margin-bottom: 4px;">Estimated Budget: <strong style="color: #0B172A;">${data.budget}</strong></div>
                    <div style="font-size: 13px; color: #64748B;">Timeline: <strong style="color: #0B172A;">${data.timeline}</strong></div>
                  </div>
                  <div style="text-align: center; margin-top: 20px;">
                    <a href="https://wa.me/919959828859?text=Hi%20Ganesh%20NexGen%20Team,%20my%20inquiry%20reference%20is%20${data.leadNumber}" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px;">
                      💬 Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          `,
        });
      }

      smtpDispatched = true;
      console.log(`[SMTP] Successfully dispatched notification email to ${adminEmail}`);
    } catch (smtpErr) {
      console.error("[SMTP Error]", smtpErr);
    }
  }

  // 3. Fallback Resend API if neither succeeded
  if (!emailJsDispatched && !smtpDispatched) {
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
    success: emailJsDispatched || smtpDispatched,
    emailJsDispatched,
    smtpDispatched,
  };
}

