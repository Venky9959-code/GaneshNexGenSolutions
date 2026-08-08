"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Filter, Search, Sparkles, CheckCircle2, Phone, Mail, Building, ArrowRight, ArrowLeft } from "lucide-react";

export default function AdminPage() {
  const [leads, setLeads] = useState([
    { id: "GNS-LEAD-8841", name: "Rahul Sharma", business: "Sharma Tech", email: "rahul@sharmatech.in", phone: "+91 9390564946", service: "Custom Software Development", budget: "₹1,50,000+", status: "NEW", priority: "HIGH", aiScore: 94 },
    { id: "GNS-LEAD-7712", name: "Priya Mehta", business: "Mehta Retail", email: "priya@mehta.com", phone: "+91 9812345678", service: "E-Commerce Development", budget: "₹50,000 - ₹1,50,000", status: "QUALIFIED", priority: "MEDIUM", aiScore: 88 },
    { id: "GNS-LEAD-6603", name: "Dr. Ananya Roy", business: "HealthPlus", email: "ananya@healthplus.org", phone: "+91 9988776655", service: "Website Development", budget: "₹20,000 - ₹50,000", status: "PROPOSAL_SENT", priority: "HIGH", aiScore: 92 }
  ]);

  const [filter, setFilter] = useState<string>("ALL");

  const updateStatus = (id: string, newStatus: string) => {
    setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
  };

  const filteredLeads = filter === "ALL" ? leads : leads.filter(l => l.status === filter);

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-400" />
              <span>Ganesh BOS Admin Lead Management</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">Manage inbound website leads, CRM status pipeline, and follow-ups</p>
          </div>
        </div>

        <Link href="/dashboard" className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition">
          Full Executive Dashboard →
        </Link>
      </div>

      {/* Admin KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { title: "New Leads", count: "12", color: "text-blue-400" },
          { title: "Qualified Leads", count: "8", color: "text-emerald-400" },
          { title: "Pending Follow-ups", count: "5", color: "text-amber-400" },
          { title: "Active Projects", count: "18", color: "text-purple-400" },
          { title: "Enquiries Today", count: "14", color: "text-indigo-400" }
        ].map((kpi, idx) => (
          <div key={idx} className="apple-glass p-5">
            <div className="text-xs text-zinc-400 font-semibold mb-1">{kpi.title}</div>
            <div className={`text-2xl font-extrabold ${kpi.color}`}>{kpi.count}</div>
          </div>
        ))}
      </div>

      {/* Leads Table */}
      <div className="apple-glass overflow-hidden border border-white/10 space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Inbound CRM Lead Submissions</h3>
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-zinc-400" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-zinc-900 border border-white/10 text-xs text-white rounded-lg px-2.5 py-1"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">NEW</option>
              <option value="QUALIFIED">QUALIFIED</option>
              <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
              <option value="WON">WON</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase tracking-wider">
            <tr>
              <th className="p-3">Lead Ref</th>
              <th className="p-3">Client</th>
              <th className="p-3">Service</th>
              <th className="p-3">Budget</th>
              <th className="p-3">AI Score</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-200">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/5 transition">
                <td className="p-3 font-bold text-blue-400 font-mono">{lead.id}</td>
                <td className="p-3">
                  <div className="font-semibold text-white">{lead.name}</div>
                  <div className="text-[10px] text-zinc-400">{lead.business || lead.email}</div>
                </td>
                <td className="p-3 font-medium text-zinc-300">{lead.service}</td>
                <td className="p-3 text-emerald-400 font-semibold">{lead.budget}</td>
                <td className="p-3 text-blue-400 font-bold">{lead.aiScore}%</td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    lead.status === "NEW" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                    lead.status === "QUALIFIED" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                    "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                  }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <select 
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className="bg-zinc-900 border border-white/10 text-[11px] text-white rounded px-2 py-1"
                  >
                    <option value="NEW">NEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="QUALIFIED">QUALIFIED</option>
                    <option value="PROPOSAL_SENT">PROPOSAL_SENT</option>
                    <option value="WON">WON</option>
                    <option value="LOST">LOST</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
