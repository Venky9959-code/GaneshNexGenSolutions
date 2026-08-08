"use client";

import { useState } from "react";
import { 
  FileText, Plus, Download, Send, CheckCircle2, 
  DollarSign, Sparkles, Printer, ExternalLink, ShieldCheck
} from "lucide-react";

export default function SalesPage() {
  const [activeTab, setActiveTab] = useState<"invoices" | "proposals">("invoices");

  const [invoices, setInvoices] = useState([
    { id: "INV-2026-001", client: "FinTech Corp", amount: 450000, gst: 81000, total: 531000, status: "Paid", dueDate: "2026-08-15" },
    { id: "INV-2026-002", client: "Global Health Inc", amount: 850000, gst: 153000, total: 1003000, status: "Sent", dueDate: "2026-08-20" },
    { id: "INV-2026-003", client: "NexTech Systems", amount: 250000, gst: 45000, total: 295000, status: "Draft", dueDate: "2026-08-30" }
  ]);

  const [proposals, setProposals] = useState([
    { id: "PROP-2026-101", title: "Enterprise AI Platform Architecture", client: "Priya Mehta (Global Corp)", value: 1200000, validUntil: "2026-08-25", status: "Accepted" },
    { id: "PROP-2026-102", title: "Next.js 16 E-Commerce Infrastructure", client: "Rahul Sharma (FinTech)", value: 650000, validUntil: "2026-08-28", status: "Sent" }
  ]);

  const handleDownloadPdf = (id: string) => {
    alert(`[Ganesh BOS Engine] Exported ${id} PDF document with official letterhead & tax breakdown.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-400" />
            <span>Sales, Quotations & Billing</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Automatic PDF generation, 18% GST calculation & Razorpay integration</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
            <button 
              onClick={() => setActiveTab("invoices")}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === "invoices" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"}`}
            >
              Invoices
            </button>
            <button 
              onClick={() => setActiveTab("proposals")}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === "proposals" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"}`}
            >
              Proposals
            </button>
          </div>

          <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition flex items-center gap-2">
            <Plus className="w-4 h-4" /> Create {activeTab === "invoices" ? "Invoice" : "Proposal"}
          </button>
        </div>
      </div>

      {activeTab === "invoices" ? (
        /* Invoices Table View */
        <div className="apple-glass overflow-hidden border border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase tracking-wider">
              <tr>
                <th className="p-4">Invoice #</th>
                <th className="p-4">Client</th>
                <th className="p-4">Subtotal</th>
                <th className="p-4">GST (18%)</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-200">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/5 transition">
                  <td className="p-4 font-bold text-white">{inv.id}</td>
                  <td className="p-4 font-medium">{inv.client}</td>
                  <td className="p-4">₹{inv.amount.toLocaleString()}</td>
                  <td className="p-4 text-zinc-400">₹{inv.gst.toLocaleString()}</td>
                  <td className="p-4 font-bold text-emerald-400">₹{inv.total.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                      inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                      inv.status === "Sent" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                      "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleDownloadPdf(inv.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                      title="Razorpay Payment Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Proposals View */
        <div className="grid md:grid-cols-2 gap-6">
          {proposals.map((prop) => (
            <div key={prop.id} className="apple-glass p-6 apple-glass-hover">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-blue-400">{prop.id}</span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {prop.status}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">{prop.title}</h3>
              <p className="text-xs text-zinc-400 mb-4">{prop.client}</p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-zinc-400">Total Value</div>
                  <div className="text-lg font-bold text-white">₹{prop.value.toLocaleString()}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleDownloadPdf(prop.id)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-white transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                  <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs text-white font-medium transition flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5" /> WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
