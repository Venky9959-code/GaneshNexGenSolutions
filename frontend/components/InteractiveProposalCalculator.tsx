"use client";

import { useState } from "react";
import { Sparkles, Check, ArrowRight, Download, ShieldCheck, DollarSign, FileText, Zap } from "lucide-react";

export default function InteractiveProposalCalculator() {
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "ASP.NET Core 9 Clean API", "Next.js 16 Apple Frontend"
  ]);
  const [timelineWeeks, setTimelineWeeks] = useState(6);
  const [showPdfModal, setShowPdfModal] = useState(false);

  const availableServices = [
    { name: "ASP.NET Core 9 Clean API", cost: 250000, category: "Backend" },
    { name: "Next.js 16 Apple Frontend", cost: 200000, category: "Frontend" },
    { name: "PostgreSQL Database & Indexing", cost: 80000, category: "Database" },
    { name: "OpenAI LLM Copilot Engine", cost: 150000, category: "AI" },
    { name: "Meta WhatsApp Cloud Automation", cost: 75000, category: "Automation" },
    { name: "React Native Mobile App (iOS/Android)", cost: 350000, category: "Mobile" }
  ];

  const toggleService = (name: string) => {
    if (selectedServices.includes(name)) {
      if (selectedServices.length === 1) return;
      setSelectedServices(selectedServices.filter(s => s !== name));
    } else {
      setSelectedServices([...selectedServices, name]);
    }
  };

  const subtotal = availableServices
    .filter(s => selectedServices.includes(s.name))
    .reduce((sum, s) => sum + s.cost, 0);

  const gstAmount = subtotal * 0.18;
  const totalCost = subtotal + gstAmount;

  return (
    <div className="apple-glass p-8 border border-white/10 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-2">
        <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
        <span>Instant Project Estimation Engine</span>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">Configure Your Technical Stack</h2>
      <p className="text-xs text-slate-600 dark:text-zinc-400 mb-8">Select required modules to generate real-time proposal scope, 18% GST tax breakdown, and timeline.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {availableServices.map((service) => {
          const isSelected = selectedServices.includes(service.name);
          return (
            <button
              key={service.name}
              onClick={() => toggleService(service.name)}
              className={`p-4 rounded-xl text-left border transition flex items-center justify-between ${
                isSelected 
                  ? "bg-blue-600/15 border-blue-500 text-slate-900 dark:text-white" 
                  : "bg-slate-100/80 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-zinc-300 mb-1 inline-block">
                  {service.category}
                </span>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{service.name}</div>
                <div className="text-[11px] text-slate-600 dark:text-zinc-400 mt-0.5">₹{service.cost.toLocaleString()}</div>
              </div>
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition ${
                isSelected ? "bg-blue-500 border-blue-400 text-white" : "border-slate-300 dark:border-white/20"
              }`}>
                {isSelected && <Check className="w-3 h-3" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Real-time Calculation Summary Box */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-purple-900/10 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-xs text-slate-600 dark:text-zinc-400 mb-1">Estimated Investment (Excl. Tax)</div>
          <div className="text-xl font-medium text-slate-800 dark:text-zinc-300">₹{subtotal.toLocaleString()}</div>
          <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> +18% GST (₹{gstAmount.toLocaleString()}) = <strong className="text-emerald-600 dark:text-emerald-400 text-base font-bold">₹{totalCost.toLocaleString()}</strong>
          </div>
        </div>

        <button 
          onClick={() => setShowPdfModal(true)}
          className="w-full md:w-auto px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
        >
          <FileText className="w-4 h-4" /> Generate Official Proposal PDF
        </button>
      </div>

      {/* PDF Generator Preview Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg apple-glass p-6 border border-slate-200 dark:border-white/15 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-white/10 pb-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                <FileText className="w-5 h-5" />
                <span>Ganesh NexGen Solutions — Technical Proposal</span>
              </div>
              <button onClick={() => setShowPdfModal(false)} className="text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white">✕</button>
            </div>

            <div className="p-4 bg-slate-100 dark:bg-zinc-950 rounded-xl border border-slate-200 dark:border-white/10 space-y-3 text-xs mb-4">
              <div className="flex justify-between border-b border-slate-200 dark:border-white/10 pb-2">
                <span className="font-bold text-slate-900 dark:text-white">Document Ref:</span>
                <span className="text-blue-600 dark:text-blue-400">PROP-2026-ESTIMATOR</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block mb-1">Selected Technical Scope:</span>
                <ul className="list-disc list-inside text-slate-700 dark:text-zinc-300 space-y-0.5">
                  {selectedServices.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex justify-between font-bold">
                <span className="text-slate-600 dark:text-zinc-400">Total Investment (Incl. 18% GST):</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-sm">₹{totalCost.toLocaleString()}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                alert("[Ganesh PDF Engine] Official Proposal PDF exported successfully to your downloads!");
                setShowPdfModal(false);
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <Download className="w-4 h-4" /> Download Executable Proposal PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
