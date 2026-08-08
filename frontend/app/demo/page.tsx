"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, ArrowLeft, Bot, FileText, Kanban, MessageSquare, 
  CheckCircle2, DollarSign, Send, Zap, Play, Pause
} from "lucide-react";

export default function DemoPage() {
  const [activeSim, setActiveSim] = useState<"lead" | "ai" | "pdf">("lead");

  // Lead Simulator State
  const [leadName, setLeadName] = useState("Enterprise AI Platform");
  const [leadClient, setLeadClient] = useState("Rahul Sharma");
  const [leadPhone, setLeadPhone] = useState("+91 9390564946");
  const [simLogs, setSimLogs] = useState<string[]>([]);

  const handleSimulateLead = () => {
    setSimLogs(["1. Saving lead to PostgreSQL database..."]);
    setTimeout(() => {
      setSimLogs(prev => [...prev, "2. OpenAI scoring quality... Result: 94% High Intent"]);
    }, 400);
    setTimeout(() => {
      setSimLogs(prev => [...prev, "3. Resend Email API: Welcome email sent to client."]);
    }, 800);
    setTimeout(() => {
      setSimLogs(prev => [...prev, "4. Meta WhatsApp API: Greeting message dispatched."]);
    }, 1200);
    setTimeout(() => {
      setSimLogs(prev => [...prev, "✓ Lead Ingestion Workflow Complete! Moved to Kanban Pipeline."]);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span>Ganesh BOS Interactive Sandbox</span>
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">Live simulation playground for automated business workflows</p>
            </div>
          </div>

          <Link href="/dashboard" className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition">
            Launch Admin Dashboard →
          </Link>
        </div>

        {/* Simulation Selector */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: "lead", title: "Automated Lead Ingestion", desc: "Test Lead -> Email -> WhatsApp Pipeline", icon: MessageSquare },
            { id: "ai", title: "OpenAI Technical Copilot", desc: "Test instant proposal generation", icon: Bot },
            { id: "pdf", title: "18% GST Invoice Engine", desc: "Test PDF & Razorpay link builder", icon: FileText }
          ].map((s) => {
            const Icon = s.icon;
            const isSel = activeSim === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSim(s.id as any)}
                className={`apple-glass p-5 text-left transition ${
                  isSel ? "border-blue-500 bg-blue-600/15" : "hover:border-white/20"
                }`}
              >
                <Icon className={`w-5 h-5 mb-2 ${isSel ? "text-blue-400" : "text-zinc-500"}`} />
                <div className="text-xs font-bold text-white mb-1">{s.title}</div>
                <div className="text-[10px] text-zinc-400">{s.desc}</div>
              </button>
            );
          })}
        </div>

        {/* Simulator Workbench */}
        {activeSim === "lead" && (
          <div className="apple-glass p-6 space-y-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-400" /> Run Lead Automation Workflow Simulator
            </h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Requirement</label>
                <input 
                  type="text" 
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">Contact Name</label>
                <input 
                  type="text" 
                  value={leadClient}
                  onChange={(e) => setLeadClient(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-300 mb-1">WhatsApp Phone</label>
                <input 
                  type="text" 
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button 
              onClick={handleSimulateLead}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <Send className="w-4 h-4" /> Trigger Automation Workflow
            </button>

            {simLogs.length > 0 && (
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/10 space-y-2 font-mono text-xs text-emerald-400">
                {simLogs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSim === "ai" && (
          <div className="apple-glass p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Bot className="w-4 h-4 text-blue-400" /> OpenAI Copilot Technical Scope Generator
            </h3>
            <p className="text-xs text-zinc-400">Generates technical stack overview for Ganesh NexGen Solutions (*&quot;Your Growth. Our Technology.&quot;*)</p>
            <div className="p-4 bg-zinc-950 rounded-xl border border-white/10 text-xs text-zinc-300 space-y-2 leading-relaxed">
              <div className="font-bold text-blue-400">1. Architecture Blueprint</div>
              <div>- ASP.NET Core 9 Web API (CQRS pattern, Repository & Unit of Work)</div>
              <div>- PostgreSQL database normalized schema with soft delete & auditing</div>
              <div>- Next.js 16 App Router frontend with Apple aesthetic UI system</div>
              <div className="font-bold text-blue-400 pt-2">2. Automation Triggers</div>
              <div>- Meta WhatsApp Cloud API webhook for lead follow-ups</div>
              <div>- Resend transactional email dispatches for welcome greetings</div>
            </div>
          </div>
        )}

        {activeSim === "pdf" && (
          <div className="apple-glass p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" /> 18% GST Invoice & Payment Engine
            </h3>
            <div className="p-4 bg-zinc-950 rounded-xl border border-white/10 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Base Services Subtotal:</span>
                <span className="text-white font-semibold">₹5,00,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">GST (18%):</span>
                <span className="text-zinc-300">₹90,000</span>
              </div>
              <div className="flex justify-between font-bold border-t border-white/10 pt-2 text-sm">
                <span className="text-white">Total Amount Due:</span>
                <span className="text-emerald-400">₹5,90,000</span>
              </div>
            </div>
            <button 
              onClick={() => alert("Simulated Razorpay Payment Link generated: rzp_test_link_ganesh_2026")}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center gap-2"
            >
              Generate Razorpay Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
