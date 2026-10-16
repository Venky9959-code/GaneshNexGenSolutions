import { NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { sendInquiryEmails, InquiryData } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, budget, timeline, notes } = body;

    if (!name || (!phone && !email)) {
      return NextResponse.json(
        { success: false, error: "Name and at least one contact method (phone or email) are required." },
        { status: 400 }
      );
    }

    const leadNumber = `GNS-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowIso = new Date().toISOString();

    const inquiryPayload: InquiryData = {
      leadNumber,
      name: String(name).trim(),
      email: String(email || "").trim(),
      phone: String(phone || "").trim(),
      service: String(service || "Custom Software / Web").trim(),
      budget: String(budget || "To Discuss").trim(),
      timeline: String(timeline || "Flexible").trim(),
      notes: notes ? String(notes).trim() : "",
      createdAt: nowIso,
    };

    // 1. Immediately Dispatch Automatic Email (Non-blocking & Fast)
    const emailPromise = sendInquiryEmails(inquiryPayload).catch((emailErr) => {
      console.error("[Email Dispatch Error]", emailErr);
      return { success: false };
    });

    // 2. Store in Firebase Firestore (with 3-second timeout protection)
    let firebaseSaved = false;
    const firestorePromise = (async () => {
      try {
        const adminDb = getAdminFirestore();
        if (adminDb) {
          await adminDb.collection("inquiries").add({
            ...inquiryPayload,
            status: "NEW",
            createdAtTimestamp: new Date(),
          });
          firebaseSaved = true;
          console.log(`[Firebase Firestore] Inquiry saved with Lead Number: ${leadNumber}`);
        }
      } catch (err: any) {
        console.warn("[Firebase Save Notice]", err?.message || err);
      }
    })();

    // Await both operations (timeout Firestore after 3s if API is not yet enabled)
    await Promise.allSettled([
      emailPromise,
      Promise.race([
        firestorePromise,
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]),
    ]);

    return NextResponse.json({
      success: true,
      leadNumber,
      firebaseSaved,
      message: "Inquiry successfully recorded and notification dispatched.",
    });
  } catch (error: any) {
    console.error("[Inquiry API Error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
