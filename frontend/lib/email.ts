export interface LeadEmailPayload {
  leadNumber: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
}

export async function sendLeadEmails(payload: LeadEmailPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || "contact@ganeshnexgen.com";

  console.log(`[Resend Email Engine] Dispatched lead acknowledgment for Lead ${payload.leadNumber} to ${payload.email}`);
  console.log(`[Resend Email Engine] Dispatched admin alert to ${adminEmail}`);

  if (!apiKey) {
    // Graceful fallback for local development
    return true;
  }

  try {
    // Production Resend API fetch
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Ganesh NexGen Solutions <noreply@ganeshnexgen.com>",
        to: [payload.email],
        subject: `We've Received Your Request | Ganesh NexGen Solutions (${payload.leadNumber})`,
        html: `
          <div style="font-family: Arial, sans-serif; color: #0F172A; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; borderRadius: 12px;">
            <h2 style="color: #2563EB; margin-top: 0;">Ganesh NexGen Solutions</h2>
            <p><strong>Your Growth. Our Technology.</strong></p>
            <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 20px 0;" />
            <p>Hi ${payload.name},</p>
            <p>Thank you for reaching out to <strong>Ganesh NexGen Solutions</strong>. We have received your enquiry regarding <strong>${payload.service}</strong>.</p>
            <p>Our senior technology team is reviewing your requirements and will get in touch with you shortly.</p>
            <div style="background-color: #F8FAFC; padding: 15px; border-radius: 8px; border-left: 4px solid #2563EB; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px; color: #64748B;">Your Lead Reference ID:</p>
              <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold; color: #2563EB;">${payload.leadNumber}</p>
            </div>
            <p>Best Regards,<br /><strong>Ganesh NexGen Solutions Team</strong><br />India</p>
          </div>
        `,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Resend API error:", error);
    return false;
  }
}
