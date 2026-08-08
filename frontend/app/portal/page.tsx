"use client";

import Link from "next/link";
import { UserCheck, Lock, CreditCard, Download, ArrowLeft, MessageSquare } from "lucide-react";

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <UserCheck className="w-6 h-6 text-blue-400" />
              <span>Ganesh BOS Client Workspace Portal</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">Secure client area for deliverable approvals, invoice payments, and ticket tracking</p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          Auth.js Portal Ready
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="apple-glass p-6 space-y-3">
          <h3 className="text-sm font-bold text-white">Active Deliverable Progress</h3>
          <div className="text-3xl font-extrabold text-blue-400">77.7%</div>
          <p className="text-xs text-zinc-400">NexGen Cloud ERP Engine</p>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[77%]" />
          </div>
        </div>

        <div className="apple-glass p-6 space-y-3">
          <h3 className="text-sm font-bold text-white">Pending Invoice Statement</h3>
          <div className="text-3xl font-extrabold text-emerald-400">₹10,03,000</div>
          <p className="text-xs text-zinc-400">Razorpay Payment Gateway Ready</p>
          <button 
            onClick={() => alert("Redirecting to Razorpay checkout gateway...")}
            className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" /> Pay Invoice Online
          </button>
        </div>

        <div className="apple-glass p-6 space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Technical Support Desk</h3>
            <p className="text-xs text-zinc-400">Direct engineering assistance line</p>
          </div>
          <button className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" /> Open Support Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
