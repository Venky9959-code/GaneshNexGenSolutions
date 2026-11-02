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

function cleanString(val: any, maxLength: number): string {
  if (typeof val !== "string") return "";
  return val.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Silent drop for automated spam bots filling hidden honeypot
    if (body.honeypot && String(body.honeypot).trim().length > 0) {
      return NextResponse.json({
        success: true,
        leadNumber: `GNS-${Math.floor(100000 + Math.random() * 900000)}`,
        message: "Inquiry received.",
      });
    }

    const {
      name,
      email,
      phone,
      service,
      budget,
      timeline,
      notes,
      sessionId,
      brandName,
      website,
      problems,
      problemsOther,
      brief,
    } = body;

    const cleanName = cleanString(name, 60);
    const cleanEmail = cleanString(email, 120);
    const cleanPhone = cleanString(phone, 25);

    if (!cleanName || (!cleanPhone && !cleanEmail)) {
      return NextResponse.json(
        { success: false, error: "Name and at least one contact method (phone or email) are required." },
        { status: 400 }
      );
    }

    // Combine any extra fields into consolidated notes
    const extraNotes = [
      notes ? cleanString(notes, 2000) : null,
      brief ? `Project Brief: ${cleanString(brief, 3000)}` : null,
      brandName ? `Brand Name: ${cleanString(brandName, 100)}` : null,
      website ? `Website: ${cleanString(website, 200)}` : null,
      problems && (Array.isArray(problems) ? problems.length > 0 : Boolean(problems))
        ? `What to Fix: ${Array.isArray(problems) ? problems.map((p) => cleanString(p, 60)).join(", ") : cleanString(problems, 200)}`
        : null,
      problemsOther ? `Other Details: ${cleanString(problemsOther, 300)}` : null,
    ]
      .filter(Boolean)
      .join("\n\n");

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
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      service: cleanString(service, 120) || "Custom Software / Web",
      budget: cleanString(budget, 80) || "To Discuss",
      timeline: cleanString(timeline, 80) || "Standard",
      notes: extraNotes ? String(extraNotes).trim() : (notes ? cleanString(notes, 2000) : ""),
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

