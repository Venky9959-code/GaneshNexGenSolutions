import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

function getServiceAccount() {
  // 1. Check serviceAccountKey.json in frontend directory or cwd
  try {
    const candidates = [
      path.resolve(process.cwd(), "serviceAccountKey.json"),
      path.resolve(process.cwd(), "frontend", "serviceAccountKey.json"),
      path.resolve(process.cwd(), "../serviceAccountKey.json"),
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        return JSON.parse(fs.readFileSync(c, "utf-8"));
      }
    }
  } catch (e) {
    console.warn("[ServiceAccount Load Warning]", e);
  }

  // 2. Direct string in env
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } catch {}
  }

  return null;
}

export function getAdminFirestore() {
  try {
    if (getApps().length > 0) {
      return getFirestore(getApp());
    }

    const serviceAccount = getServiceAccount();
    if (serviceAccount) {
      const app = initializeApp({
        credential: cert(serviceAccount),
        projectId: serviceAccount.project_id || "lead-tracker-8e597",
      });
      return getFirestore(app);
    }

    const app = initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || "lead-tracker-8e597",
    });
    return getFirestore(app);
  } catch (err) {
    console.error("[Firebase Admin Firestore Error]", err);
    return null;
  }
}
