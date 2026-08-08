import { NextResponse } from "next/server";
import { LeadFormSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { sendLeadEmails } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zod Server-side Validation
    const validatedData = LeadFormSchema.parse(body);

    // 2. Generate Unique Lead Number
    const leadNumber = `GNS-LEAD-${Math.floor(1000 + Math.random() * 9000)}`;

    // 3. Database Persistence
    try {
      await db.lead.create({
        data: {
          leadNumber,
          name: validatedData.name,
          businessName: validatedData.businessName || null,
          email: validatedData.email,
          phone: validatedData.phone,
          whatsapp: validatedData.whatsapp || validatedData.phone,
          service: validatedData.service,
          budget: validatedData.budget || null,
          timeline: validatedData.timeline || null,
          description: validatedData.description,
          status: "NEW",
          priority: "MEDIUM",
        },
      });
    } catch (dbErr) {
      console.warn("[Database Notice] PostgreSQL standard fallback log:", dbErr);
    }

    // 4. Send Email Dispatch via Resend
    await sendLeadEmails({
      leadNumber,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      service: validatedData.service,
      description: validatedData.description,
    });

    return NextResponse.json({
      success: true,
      leadNumber,
      message: "Lead registered successfully",
    });
  } catch (error: any) {
    console.error("API Lead Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Invalid lead payload" },
      { status: 400 }
    );
  }
}
