"use client";

import { useState } from "react";
import { 
  Users, Plus, Search, Filter, Sparkles, Phone, Mail, 
  Building, DollarSign, CheckCircle2, ArrowRight, X, AlertCircle
} from "lucide-react";

interface Lead {
  id: string;
  title: string;
  contactName: string;
  email: string;
  phone: string;
  serviceRequested: string;
  budget: number;
  status: "New" | "Contacted" | "Qualified" | "Proposal Sent" | "Won";
  aiScore: number;
}

export default function CrmPage() {
  const [leads, setLeads] = useState<Lead[]>([
    { id: "1", title: "FinTech Mobile App", contactName: "Rahul Sharma", email: "rahul@fintech.in", phone: "+91 9390564946", serviceRequested: "Mobile App Development", budget: 650000, status: "New", aiScore: 92 },
    { id: "2", title: "Enterprise ERP Portal", contactName: "Priya Mehta", email: "priya@globalcorp.com", phone: "+91 9812345678", serviceRequested: "Custom Software", budget: 1200000, status: "Qualified", aiScore: 88 },
    { id: "3", title: "AI Automation System", contactName: "Vikram Patel", email: "vikram@nextech.io", phone: "+91 9765432109", serviceRequested: "AI Solutions", budget: 450000, status: "Proposal Sent", aiScore: 95 },
    { id: "4", title: "Healthcare Cloud Solution", contactName: "Dr. Ananya Roy", email: "ananya@healthplus.org", phone: "+91 9988776655", serviceRequested: "Cloud & Hosting", budget: 850000, status: "Won", aiScore: 90 }
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Website Development");
  const [budget, setBudget] = useState("500000");

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const score = Math.floor(Math.random() * 25) + 75;
    const newLead: Lead = {
      id: Date.now().toString(),
      title,
      contactName,
      email,
      phone,
      serviceRequested: service,
      budget: parseFloat(budget),
      status: "New",
      aiScore: score
    };
    setLeads([newLead, ...leads]);
    setModalOpen(false);
    setTitle("");
    setContactName("");
    setEmail("");
    setPhone("");
  };

  const pipelineStages = ["New", "Contacted", "Qualified", "Proposal Sent", "Won"] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            <span>CRM & Automated Lead Pipeline</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Lead capture, AI quality scoring, and automated Meta WhatsApp triggers</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Ingest New Lead
        </button>
      </div>

      {/* Pipeline Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {pipelineStages.map((stage) => {
          const stageLeads = leads.filter(l => l.status === stage);
          return (
            <div key={stage} className="apple-glass p-4 min-w-[240px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">{stage}</h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-zinc-300">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {stageLeads.map((lead) => (
                    <div key={lead.id} className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          {lead.serviceRequested}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                          <Sparkles className="w-3 h-3" />
                          <span>{lead.aiScore}% AI</span>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-white mb-1">{lead.title}</h4>
                      <div className="text-[11px] text-zinc-400 mb-2">{lead.contactName}</div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-medium text-zinc-300">
                        <span>₹{lead.budget.toLocaleString()}</span>
                        <a href={`tel:${lead.phone}`} className="text-blue-400 hover:text-blue-300">
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md apple-glass p-6 border border-white/15 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-400" /> Ingest New Lead
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Requirement / Project Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Next.js E-Commerce Platform"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Contact Name</label>
                  <input 
                    type="text" 
                    value={contactName} 
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Client Name"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Phone (WhatsApp)</label>
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9390564946"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@company.com"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Service Type</label>
                  <select 
                    value={service} 
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Website Development">Website Development</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="Mobile App Development">Mobile App</option>
                    <option value="AI Solutions">AI Solutions</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Budget (INR)</label>
                  <input 
                    type="number" 
                    value={budget} 
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 mt-4"
              >
                <span>Score & Ingest Lead</span> <Sparkles className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
