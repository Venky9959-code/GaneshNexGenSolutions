"use client";

import { Bell, CheckCircle2, MessageSquare, Mail, AlertTriangle } from "lucide-react";

export default function NotificationsPage() {
  const notifs = [
    { title: "Lead Ingested: Enterprise AI Platform", channel: "WhatsApp & Email", time: "5 mins ago", read: false },
    { title: "Invoice #INV-2026-001 Paid via Razorpay", channel: "In-App", time: "28 mins ago", read: false },
    { title: "Proposal PDF Exported for FinTech Corp", channel: "System Log", time: "1 hour ago", read: true }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Bell className="w-6 h-6 text-blue-400" />
          <span>Multi-Channel Notification Center</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">In-App alerts, Resend email logs, Meta WhatsApp webhooks & SMS dispatch</p>
      </div>

      <div className="apple-glass p-6 space-y-3">
        {notifs.map((n, i) => (
          <div key={i} className={`p-4 rounded-xl border transition flex items-center justify-between ${n.read ? "bg-white/5 border-white/5 text-zinc-400" : "bg-blue-500/10 border-blue-500/30 text-white"}`}>
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${n.read ? "bg-zinc-600" : "bg-blue-500 animate-ping"}`} />
              <div>
                <div className="text-xs font-bold">{n.title}</div>
                <div className="text-[10px] text-zinc-400">Channel: {n.channel} • {n.time}</div>
              </div>
            </div>
            <button className="text-xs text-blue-400 hover:underline font-semibold">Mark Read</button>
          </div>
        ))}
      </div>
    </div>
  );
}
