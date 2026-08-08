"use client";

import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h1 className="text-3xl font-bold mb-2">404 — Page Not Found</h1>
      <p className="text-xs text-zinc-400 mb-6">The requested module or resource was not found on Ganesh BOS platform.</p>
      <Link href="/dashboard" className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 transition">
        <ArrowLeft className="w-4 h-4" /> Return to Dashboard
      </Link>
    </div>
  );
}
