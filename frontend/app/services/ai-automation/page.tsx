"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Bot, Sparkles, CheckCircle2, ChevronRight, 
  Cpu, MessageSquare, FileText, Zap, ShieldCheck, Database, BrainCircuit, RefreshCw
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

interface AiShowcase {
  title: string;
  category: string;
  desc: string;
  image: string;
  badge: string;
  features: string[];
}

function AiCard({ 
  item, 
  onSelect 
}: { 
  item: AiShowcase; 
  onSelect: (title: string, features: string[]) => void;
}) {
  const [hoveredLongEnough, setHoveredLongEnough] = useState(false);
  const [hoverProgress, setHoverProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    setHoverProgress(0);
    setHoveredLongEnough(false);

    timerRef.current = setTimeout(() => {
      setHoveredLongEnough(true);
      setHoverProgress(100);
    }, 3000);

    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / 3000) * 100, 100);
      setHoverProgress(progress);
      if (progress >= 100 && intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }, 50);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setHoveredLongEnough(false);
    setHoverProgress(0);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between apple-glass overflow-hidden border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 hover:border-blue-500/40 hover:shadow-xl dark:hover:shadow-blue-500/5 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-zinc-950 border-b border-slate-200 dark:border-white/10 flex items-center justify-center">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        
        <div 
          className="absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-75"
          style={{ width: `${hoverProgress}%` }}
        />

        <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-4 py-2 rounded-full bg-white/90 dark:bg-zinc-900/90 text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider shadow-md">
            Hover 3s to Select
          </span>
        </div>

        <span className="absolute top-3 right-3 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-sm z-10">
          {item.badge}
        </span>

        {hoveredLongEnough && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center space-y-4 p-4 text-center z-20 animate-fade-in transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400 animate-bounce">
              <Bot className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-white font-heading">Integrate this AI Solution?</h4>
              <p className="text-[10px] text-zinc-400 max-w-[220px] leading-relaxed">
                Stack: {item.features.join(", ")}
              </p>
            </div>
            <button
              onClick={() => onSelect(item.title, item.features)}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-lg shadow-blue-500/30 flex items-center gap-1.5 transition transform active:scale-95 cursor-pointer"
            >
              <span>Scope This AI Agent</span> <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            {item.category}
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
            {item.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-normal">
            {item.desc}
          </p>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {item.features.map((feat, fIdx) => (
              <span key={fIdx} className="text-[9px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-300 font-medium">
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AiAutomationPage() {
  const [selectedAiName, setSelectedAiName] = useState("");
  const [prefilledDescription, setPrefilledDescription] = useState("");

  const showcases: AiShowcase[] = [
    {
      title: "Enterprise 24/7 AI Customer Copilot",
      category: "Support & Knowledge RAG",
      desc: "Custom LLM assistant trained strictly on your internal business knowledge base, product docs, and PDFs to resolve 80% of customer support queries instantly.",
      image: "/images/templates/saas.png",
      badge: "LLM Powered",
      features: ["Vector Embeddings", "Zero Hallucination Guardrails", "Human Agent Handoff"]
    },
    {
      title: "Meta WhatsApp Cloud API Sales Agent",
      category: "Conversational Commerce",
      desc: "Automated WhatsApp bot that qualifies inbound buyer inquiries, shares product catalogs, books appointments, and sends Razorpay payment links directly in chat.",
      image: "/images/templates/ecommerce.png",
      badge: "WhatsApp Native",
      features: ["WhatsApp Webhooks", "Automated Booking", "Instant Payment Links"]
    },
    {
      title: "Document OCR & Automated Invoice Parsing",
      category: "Document Processing",
      desc: "AI vision pipeline that extracts vendor details, line items, taxes, and amounts from incoming PDFs or scanned images directly into your PostgreSQL database.",
      image: "/images/templates/business.png",
      badge: "High Accuracy",
      features: ["PDF Vision Extraction", "PostgreSQL Database Sync", "Audit Approval Queue"]
    },
    {
      title: "Intelligent Lead Scoring & Workflow Triggers",
      category: "Marketing Automation",
      desc: "AI workflow that scores inbound leads in real time, generates custom personalized email proposals, and alerts account executives on Slack or WhatsApp.",
      image: "/images/templates/portfolio.png",
      badge: "Revenue Ops",
      features: ["Real-Time Lead Scoring", "Automated Proposals", "Slack & WhatsApp Alerts"]
    }
  ];

  const handleSelectAi = (title: string, features: string[]) => {
    setSelectedAiName(title);
    const text = `I would like to explore implementing the "${title}" AI solution for our business.\nCore requirements:\n- ${features.join("\n- ")}\n\nPlease advise on feasibility, data requirements, and an implementation timeline.`;
    setPrefilledDescription(text);

    const formElement = document.getElementById("request-quote-form");
    if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
  };

  const capabilities = [
    { icon: BrainCircuit, title: "Custom RAG Knowledge Bases", desc: "We convert your internal SOPs, manuals, and FAQs into vector embeddings stored in PostgreSQL pgvector for grounded answers." },
    { icon: MessageSquare, title: "WhatsApp Cloud API", desc: "Direct official Meta Cloud API integration with webhooks for interactive buttons, catalogs, and media messages." },
    { icon: Zap, title: "Multi-Model Flexibility", desc: "Integrate OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, or open-source Llama models tailored for cost and speed." },
    { icon: FileText, title: "Automated Document Workflows", desc: "Generate custom branded PDFs, invoices, contracts, and summaries programmatically at scale." },
    { icon: ShieldCheck, title: "Enterprise Privacy & NDA", desc: "Zero training on your confidential proprietary data. Your enterprise records remain private and secure." },
    { icon: RefreshCw, title: "Continuous Self-Improvement", desc: "Analytics on unanswered queries, feedback thumbs up/down, and automated prompt refinement." }
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Bot className="w-3.5 h-3.5" /> AI & Intelligent Automation
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Automate Tedious Operations with Custom AI Copilots
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          Unlock 24/7 business availability and slash operational friction. We engineer intelligent AI assistants, WhatsApp Cloud automation, and smart document pipelines tailored to your enterprise workflows.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Support Resolution Rate", value: "80%" },
          { label: "Response Latency", value: "< 1.5s" },
          { label: "Operational Hours", value: "24/7/365" },
          { label: "Manual Effort Saved", value: "~65%" }
        ].map((m, i) => (
          <div key={i} className="apple-glass p-5 text-center bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10">
            <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-heading">{m.value}</div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Showcase Grid */}
      <div className="space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Applied AI Solutions for Business
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Hover over any AI solution for 3 seconds to pre-select it for your custom technical review.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {showcases.map((s, i) => (
            <AiCard key={i} item={s} onSelect={handleSelectAi} />
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Enterprise AI Engineering Capabilities
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Engineered with strict safety guardrails, low latency, and high business utility.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="apple-glass p-6 space-y-3 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">{c.title}</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="request-quote-form" className="pt-8 border-t border-slate-200 dark:border-white/10 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-blue-500 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            AI Engineering Consultation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Deploy AI in Your Business Operations
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Tell us about your manual repetitive bottlenecks and discover how automated AI workflows can solve them.
          </p>
        </div>

        {selectedAiName && (
          <div className="max-w-md mx-auto p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center text-xs text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Selected AI Solution: <strong>{selectedAiName}</strong></span>
          </div>
        )}

        <ContactForm 
          defaultService="AI & Automation" 
          defaultDescription={prefilledDescription} 
        />
      </div>
    </div>
  );
}
