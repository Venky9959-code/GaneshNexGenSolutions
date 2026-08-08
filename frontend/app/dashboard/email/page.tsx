"use client";

import { Mail, Send, CheckCircle2 } from "lucide-react";

export default function EmailPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Mail className="w-6 h-6 text-blue-400" />
          <span>Transactional & Campaign Email Engine</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">Resend integration for welcome emails, proposal dispatches, and drip campaigns</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="apple-glass p-6">
          <span className="text-xs text-zinc-400 font-medium">Emails Sent</span>
          <div className="text-3xl font-bold text-white my-2">4,850</div>
          <span className="text-[11px] text-emerald-400 font-semibold">99.8% Inbox Placement</span>
        </div>
        <div className="apple-glass p-6">
          <span className="text-xs text-zinc-400 font-medium">Open Rate</span>
          <div className="text-3xl font-bold text-blue-400 my-2">64.2%</div>
          <span className="text-[11px] text-zinc-400">Resend Domain Verification OK</span>
        </div>
        <div className="apple-glass p-6">
          <span className="text-xs text-zinc-400 font-medium">Drip Campaigns</span>
          <div className="text-3xl font-bold text-indigo-400 my-2">3 Active</div>
          <span className="text-[11px] text-zinc-400">Automated Lead Nurturing</span>
        </div>
      </div>
    </div>
  );
}
