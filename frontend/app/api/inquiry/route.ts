import { NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import { sendInquiryEmails, InquiryData } from "@/lib/mailer";

// In-memory rate limiting and session guard
interface RateLimitRecord {
  count: number;
  lastSubmittedAt: number;
  leadNumber: string;
}

const rateLimitStore = new Map<string, RateLimitRecord>();
const COOLDOWN_MS = 10 * 60 * 1000; // 10 minutes cooldown
const MAX_SUBMISSIONS_PER_WINDOW = 2; // Up to 2 submissions per session/IP window

function cleanupOldRecords() {
  const now = Date.now();
  for (const [key, val] of rateLimitStore.entries()) {
    if (now - val.lastSubmittedAt > COOLDOWN_MS * 2) {
      rateLimitStore.delete(key);
    }
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, budget, timeline, notes, sessionId } = body;

    if (!name || (!phone && !email)) {
      return NextResponse.json(
        { success: false, error: "Name and at least one contact method (phone or email) are required." },
        { status: 400 }
      );
    }

    // Determine client tracking key from sessionId or IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "unknown_client";
    const clientKey = sessionId && String(sessionId).trim().length > 5 
      ? `session_${String(sessionId).trim()}` 
      : `ip_${ip}`;

    cleanupOldRecords();

    // Check rate limit & session spam
    const existing = rateLimitStore.get(clientKey);
    const now = Date.now();

    if (existing) {
      const timeSince = now - existing.lastSubmittedAt;
      if (timeSince < COOLDOWN_MS && existing.count >= MAX_SUBMISSIONS_PER_WINDOW) {
        console.warn(`[Anti-Spam] Blocked repeated submission from ${clientKey}`);
        return NextResponse.json(
          {
            success: false,
            rateLimited: true,
            leadNumber: existing.leadNumber,
            error: `You have already submitted an inquiry recently (Ref: ${existing.leadNumber}). Our team is already reviewing your details! For urgent queries, please connect on WhatsApp.`,
          },
          { status: 429 }
        );
      }
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
            clientKey,
          });
          firebaseSaved = true;
          console.log(`[Firebase Firestore] Inquiry saved with Lead Number: ${leadNumber}`);
        }
      } catch (err: any) {
        console.warn("[Firebase Save Notice]", err?.message || err);
      }
    })();

    // Await both operations
    await Promise.allSettled([
      emailPromise,
      Promise.race([
        firestorePromise,
        new Promise((resolve) => setTimeout(resolve, 3000)),
      ]),
    ]);

    // Record session submission
    rateLimitStore.set(clientKey, {
      count: (existing?.count || 0) + 1,
      lastSubmittedAt: now,
      leadNumber,
    });

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

