import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

function getServiceAccount() {
  // 1. Check direct JSON string in environment variable (Production best practice)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } catch (e) {
      console.warn("[Firebase Env Parse Warning]", e);
    }
  }

  // 2. Check localized file path
  try {
    const keyPath = path.join(process.cwd(), "serviceAccountKey.json");
    if (fs.existsSync(keyPath)) {
      return JSON.parse(fs.readFileSync(keyPath, "utf-8"));
    }
  } catch (e) {
    console.warn("[ServiceAccount Load Warning]", e);
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
        projectId: serviceAccount.project_id || "lead-tracker-1c4a3",
      });
      return getFirestore(app);
    }

    const app = initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || "lead-tracker-1c4a3",
    });
    return getFirestore(app);
  } catch (err) {
    console.error("[Firebase Admin Firestore Error]", err);
    return null;
  }
}
