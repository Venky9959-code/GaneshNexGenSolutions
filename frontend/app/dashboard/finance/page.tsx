"use client";

import { Wallet, Plus, ArrowUpRight, ArrowDownRight, DollarSign, FileSpreadsheet } from "lucide-react";

export default function FinancePage() {
  const expenses = [
    { id: "EXP-01", category: "Cloud Infrastructure", desc: "Azure Web Apps & Cloudflare R2", amount: 48000, date: "2026-07-28" },
    { id: "EXP-02", category: "Software Licenses", desc: "OpenAI API & Meta Cloud API tokens", amount: 22000, date: "2026-07-25" },
    { id: "EXP-03", category: "Office Overhead", desc: "High-speed Fiber Broadband", amount: 8500, date: "2026-07-20" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Wallet className="w-6 h-6 text-blue-400" />
            <span>Finance & GST Tax Accounting</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Expenses, income run-rate, net profit & 18% GST tax filing reports</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Log Expense
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="apple-glass p-6">
          <span className="text-xs text-zinc-400 font-medium">Total Income (H1 2026)</span>
          <div className="text-3xl font-bold text-emerald-400 my-2">₹56,40,000</div>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +22.4% net margin
          </span>
        </div>

        <div className="apple-glass p-6">
          <span className="text-xs text-zinc-400 font-medium">Operating Expenses</span>
          <div className="text-3xl font-bold text-red-400 my-2">₹18,50,000</div>
          <span className="text-[11px] text-zinc-400">Payroll, Cloud & Licensing</span>
        </div>

        <div className="apple-glass p-6">
          <span className="text-xs text-zinc-400 font-medium">GST Tax Liability (18%)</span>
          <div className="text-3xl font-bold text-purple-400 my-2">₹6,82,200</div>
          <span className="text-[11px] text-purple-400 font-semibold">GSTR-3B Ready</span>
        </div>
      </div>

      <div className="apple-glass overflow-hidden">
        <div className="p-4 border-b border-white/10 font-bold text-xs text-white">Recent Operating Expenses</div>
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Ref #</th>
              <th className="p-4">Category</th>
              <th className="p-4">Description</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-200">
            {expenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-white/5 transition">
                <td className="p-4 font-bold text-blue-400">{exp.id}</td>
                <td className="p-4 font-semibold text-white">{exp.category}</td>
                <td className="p-4 text-zinc-400">{exp.desc}</td>
                <td className="p-4 font-bold text-red-400">₹{exp.amount.toLocaleString()}</td>
                <td className="p-4">{exp.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
