"use client";

import { UserCheck, CheckCircle2, Download, CreditCard, MessageSquare, FileText } from "lucide-react";

export default function ClientPortalPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <UserCheck className="w-6 h-6 text-blue-400" />
          <span>Client Self-Service Portal</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">Dedicated workspace for client project tracking, invoice payments & instant chat</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="apple-glass p-6">
          <h3 className="text-sm font-bold text-white mb-2">Active Deliverables</h3>
          <div className="text-2xl font-bold text-blue-400 mb-1">77.7%</div>
          <p className="text-xs text-zinc-400">NexGen Cloud ERP Engine</p>
          <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-blue-500 h-full w-[77%]" />
          </div>
        </div>

        <div className="apple-glass p-6">
          <h3 className="text-sm font-bold text-white mb-2">Pending Invoice</h3>
          <div className="text-2xl font-bold text-emerald-400 mb-1">₹10,03,000</div>
          <p className="text-xs text-zinc-400">Due Aug 20, 2026</p>
          <button className="mt-4 w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2">
            <CreditCard className="w-4 h-4" /> Pay via Razorpay
          </button>
        </div>

        <div className="apple-glass p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-2">Support Tickets</h3>
            <p className="text-xs text-zinc-400">Direct technical assistance line with senior architects</p>
          </div>
          <button className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" /> Open Ticket Chat
          </button>
        </div>
      </div>
    </div>
  );
}
