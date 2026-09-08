"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Code2, Database, ShieldCheck, CheckCircle2, ChevronRight, 
  Cpu, Server, Lock, Layers, BarChart4, Terminal, Sparkles, Workflow
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

interface Blueprint {
  title: string;
  category: string;
  desc: string;
  image: string;
  badge: string;
  features: string[];
}

function BlueprintCard({ 
  blueprint, 
  onSelect 
}: { 
  blueprint: Blueprint; 
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
          src={blueprint.image} 
          alt={blueprint.title} 
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
          {blueprint.badge}
        </span>

        {hoveredLongEnough && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center space-y-4 p-4 text-center z-20 animate-fade-in transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400 animate-bounce">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-white font-heading">Select this Blueprint?</h4>
              <p className="text-[10px] text-zinc-400 max-w-[220px] leading-relaxed">
                Stack: {blueprint.features.join(", ")}
              </p>
            </div>
            <button
              onClick={() => onSelect(blueprint.title, blueprint.features)}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-lg shadow-blue-500/30 flex items-center gap-1.5 transition transform active:scale-95 cursor-pointer"
            >
              <span>Scope This System</span> <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            {blueprint.category}
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
            {blueprint.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-normal">
            {blueprint.desc}
          </p>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {blueprint.features.map((feat, fIdx) => (
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

export default function CustomSoftwarePage() {
  const [selectedBlueprintName, setSelectedBlueprintName] = useState("");
  const [prefilledDescription, setPrefilledDescription] = useState("");

  const blueprints: Blueprint[] = [
    {
      title: "NexGen Operations ERP",
      category: "Enterprise Resource Planning",
      desc: "Centralized internal operating system handling inventory tracking, multi-warehouse stock, purchase orders, vendor ledger, and automated financial reconciliations.",
      image: "/images/templates/saas.png",
      badge: "High Throughput",
      features: ["CQRS Clean Architecture", "Automated PDF Invoices", "Multi-Tenant RBAC"]
    },
    {
      title: "Omni-Channel CRM & Lead Engine",
      category: "Customer Relationship Management",
      desc: "Custom sales pipeline platform unifying Meta leads, WhatsApp conversations, automated email sequences, quotation generators, and live agent assignment queues.",
      image: "/images/templates/business.png",
      badge: "High Conversion",
      features: ["WhatsApp Webhooks", "Automated SLA Triggers", "Visual Kanban Pipeline"]
    },
    {
      title: "HealthCore Clinic & EHR System",
      category: "Healthcare Operations",
      desc: "HIPAA-ready electronic health records platform supporting doctor consultation queues, patient medical history, digital prescriptions, and Razorpay lab billing.",
      image: "/images/templates/hospital.png",
      badge: "HIPAA Ready",
      features: ["Doctor Slot Manager", "Digital Prescription Engine", "Lab Diagnostic Reports"]
    },
    {
      title: "FleetTrack Logistics Dispatch",
      category: "Supply Chain & Logistics",
      desc: "Real-time dispatch management system featuring live vehicle GPS status, driver route planning, automated delivery proof capture, and billing manifests.",
      image: "/images/templates/portfolio.png",
      badge: "Real-Time Tracking",
      features: ["Live GPS Telemetry", "Driver Mobile PWA", "Automated Waybill Generator"]
    }
  ];

  const handleSelectBlueprint = (title: string, features: string[]) => {
    setSelectedBlueprintName(title);
    const text = `I would like to discuss engineering a custom system based on the "${title}" blueprint.\nKey requirements include:\n- ${features.join("\n- ")}\n\nPlease provide architectural consultation and a proposal for our workflow.`;
    setPrefilledDescription(text);

    const formElement = document.getElementById("request-quote-form");
    if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
  };

  const architecturalPillars = [
    { icon: Server, title: "ASP.NET Core 9 Web API", desc: "Engineered with CQRS and Clean Architecture pattern for extreme throughput and clean separation of concerns." },
    { icon: Database, title: "PostgreSQL & EF Core", desc: "ACID-compliant transactional relational databases with migration versioning and automated index optimization." },
    { icon: Lock, title: "Enterprise RBAC & Security", desc: "Role-based permissions, JWT token authentication, multi-factor support, and encrypted field data." },
    { icon: Workflow, title: "Automated Workflows", desc: "Background job execution via Hangfire/Quartz for automated notifications, invoice dispatches, and daily rollups." },
    { icon: Terminal, title: "Complete Code Ownership", desc: "You receive 100% repository ownership, Docker Compose scripts, and zero vendor lock-in." },
    { icon: BarChart4, title: "Real-Time Analytics", desc: "Interactive executive dashboards, audit activity logs, and exportable financial data reports." }
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Code2 className="w-3.5 h-3.5" /> Enterprise Custom Software
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Bespoke Business Software Engineered for Scale
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          Off-the-shelf software forces your business to adapt to its limitations. We engineer custom enterprise business applications on ASP.NET Core 9 and Next.js 16 designed strictly around your unique processes.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Architecture", value: "CQRS Clean" },
          { label: "Backend Throughput", value: "< 25ms API" },
          { label: "Data Isolation", value: "Multi-Tenant" },
          { label: "Source Code Ownership", value: "100% Yours" }
        ].map((m, i) => (
          <div key={i} className="apple-glass p-5 text-center bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10">
            <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-heading">{m.value}</div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Blueprints Section */}
      <div className="space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Proven Enterprise Blueprints
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Hover over any architecture for 3 seconds to pre-select it for your custom scope review.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {blueprints.map((bp, i) => (
            <BlueprintCard key={i} blueprint={bp} onSelect={handleSelectBlueprint} />
          ))}
        </div>
      </div>

      {/* Architectural Pillars */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Enterprise Architectural Standards
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Engineered with strict enterprise patterns to ensure your software remains resilient as transaction volumes grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {architecturalPillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="apple-glass p-6 space-y-3 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">{p.title}</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Form Section */}
      <div id="request-quote-form" className="pt-8 border-t border-slate-200 dark:border-white/10 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-blue-500 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Technical Architecture Consultation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Architect Your Custom Solution
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Share your operational workflows and business requirements with our engineering team.
          </p>
        </div>

        {selectedBlueprintName && (
          <div className="max-w-md mx-auto p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center text-xs text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Selected Architecture Blueprint: <strong>{selectedBlueprintName}</strong></span>
          </div>
        )}

        <ContactForm 
          defaultService="Custom Software Development" 
          defaultDescription={prefilledDescription} 
        />
      </div>
    </div>
  );
}
