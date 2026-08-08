"use client";

import { MessageSquare, Send, CheckCircle2, Zap } from "lucide-react";

export default function WhatsAppPage() {
  const logs = [
    { recipient: "+91 9390564946", template: "welcome_lead_v1", status: "Delivered", time: "5 mins ago" },
    { recipient: "+91 9812345678", template: "proposal_dispatch_v2", status: "Delivered", time: "22 mins ago" },
    { recipient: "+91 9765432109", template: "invoice_payment_reminder", status: "Read", time: "1 hour ago" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-emerald-400" />
          <span>Meta WhatsApp Cloud API Automation</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">Automated lead greetings, PDF proposal delivery & payment reminder triggers</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="apple-glass p-6">
          <span className="text-xs text-zinc-400 font-medium">Messages Dispatched</span>
          <div className="text-3xl font-bold text-emerald-400 my-2">1,420</div>
          <span className="text-[11px] text-zinc-400">99.2% Delivery Rate</span>
        </div>
        <div className="apple-glass p-6">
          <span className="text-xs text-zinc-400 font-medium">Read Receipts</span>
          <div className="text-3xl font-bold text-blue-400 my-2">88.5%</div>
          <span className="text-[11px] text-zinc-400">High engagement</span>
        </div>
        <div className="apple-glass p-6">
          <span className="text-xs text-zinc-400 font-medium">Webhook Status</span>
          <div className="text-3xl font-bold text-white my-2 flex items-center gap-2">
            <Zap className="w-6 h-6 text-emerald-400" /> Active
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold">Meta Cloud API v18.0</span>
        </div>
      </div>

      <div className="apple-glass overflow-hidden">
        <div className="p-4 border-b border-white/10 font-bold text-xs text-white">Live Dispatched WhatsApp Message Logs</div>
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Recipient</th>
              <th className="p-4">Template Name</th>
              <th className="p-4">Delivery Status</th>
              <th className="p-4">Sent At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-200">
            {logs.map((l, i) => (
              <tr key={i} className="hover:bg-white/5 transition">
                <td className="p-4 font-bold text-white">{l.recipient}</td>
                <td className="p-4 text-blue-400">{l.template}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {l.status}
                  </span>
                </td>
                <td className="p-4">{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
