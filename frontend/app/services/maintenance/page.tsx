"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Smartphone, Sparkles, CheckCircle2, ChevronRight, 
  ShieldCheck, Clock, RefreshCw, AlertTriangle, Activity, Headphones, Zap, Wrench
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

interface MaintenancePlan {
  title: string;
  category: string;
  desc: string;
  image: string;
  badge: string;
  features: string[];
}

function MaintenanceCard({ 
  item, 
  onSelect 
}: { 
  item: MaintenancePlan; 
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
              <Wrench className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-white font-heading">Choose this Maintenance Tier?</h4>
              <p className="text-[10px] text-zinc-400 max-w-[220px] leading-relaxed">
                Includes: {item.features.join(", ")}
              </p>
            </div>
            <button
              onClick={() => onSelect(item.title, item.features)}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-lg shadow-blue-500/30 flex items-center gap-1.5 transition transform active:scale-95 cursor-pointer"
            >
              <span>Get Protected Now</span> <ChevronRight className="w-3 h-3" />
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

export default function MaintenancePage() {
  const [selectedPlanName, setSelectedPlanName] = useState("");
  const [prefilledDescription, setPrefilledDescription] = useState("");

  const plans: MaintenancePlan[] = [
    {
      title: "Essential Security & Uptime Watch",
      category: "Foundational Security",
      desc: "Daily offsite database backups, 24/7 uptime monitoring, automated SSL renewal, security vulnerability patches, and zero-drop health alerts.",
      image: "/images/templates/business.png",
      badge: "Crucial Protection",
      features: ["24/7 Health Monitoring", "Automated Daily Backups", "Security Patch Updates"]
    },
    {
      title: "Active Growth & Content Retainer",
      category: "Ongoing Digital Evolution",
      desc: "Includes up to 10 hours of monthly technical tweaks, banner/content updates, monthly Core Web Vitals optimization, and priority WhatsApp support.",
      image: "/images/templates/ecommerce.png",
      badge: "Most Popular",
      features: ["10 Developer Hours / Mo", "Speed Audit & Tuning", "WhatsApp Priority Line"]
    },
    {
      title: "Mission-Critical Enterprise SLA",
      category: "High-Availability Support",
      desc: "Guaranteed 1-hour critical response SLA, staging environment pre-testing, dedicated technical lead, and monthly architecture review calls.",
      image: "/images/templates/saas.png",
      badge: "Guaranteed 1-Hr SLA",
      features: ["1-Hour Response Guarantee", "Dedicated Tech Lead", "Disaster Recovery Testing"]
    },
    {
      title: "Legacy Speed & Performance Overhaul",
      category: "One-Time Tuneup & Refactor",
      desc: "Comprehensive modernization sprint that eliminates bloated scripts, optimizes media assets, fixes broken links, and accelerates page load times to under 1.5s.",
      image: "/images/templates/hospital.png",
      badge: "Performance Sprint",
      features: ["Core Web Vitals 95+", "Database Query Indexing", "Next.js Image Optimization"]
    }
  ];

  const handleSelectPlan = (title: string, features: string[]) => {
    setSelectedPlanName(title);
    const text = `I would like to inquire about the "${title}" maintenance package.\nKey requirements:\n- ${features.join("\n- ")}\n\nPlease provide a retainer agreement proposal and onboarding details.`;
    setPrefilledDescription(text);

    const formElement = document.getElementById("request-quote-form");
    if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
  };

  const guarantees = [
    { icon: Clock, title: "Guaranteed Response SLAs", desc: "Our on-call team acknowledges priority tickets in under 60 minutes to resolve any production anomalies." },
    { icon: RefreshCw, title: "Automated Daily Backups", desc: "All files and databases are backed up daily to offsite encrypted cloud buckets with 1-click restore verification." },
    { icon: ShieldCheck, title: "Security Patch Management", desc: "Proactive dependency updates protecting your web applications from zero-day security vulnerabilities." },
    { icon: Activity, title: "Core Web Vitals Audits", desc: "Continuous monitoring of page speed, caching efficiency, and Google Search Console performance." },
    { icon: Headphones, title: "Dedicated WhatsApp Line", desc: "Direct communication with your lead developer without navigating frustrating automated ticket queues." },
    { icon: Zap, title: "No Hidden Overages", desc: "Unused developer hours can roll over, with full visibility into task logs and transparent time tracking." }
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Smartphone className="w-3.5 h-3.5" /> Maintenance & Support Retainers
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Keep Your Digital Systems Secure, Fast & Always Online
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          Websites and web applications require proactive monitoring to remain secure and lightning fast. Protect your digital revenue with our 24/7 technical maintenance retainers.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Uptime Monitoring", value: "24/7/365" },
          { label: "Emergency SLA", value: "< 60 Min" },
          { label: "Daily Backups", value: "Automated" },
          { label: "Client Satisfaction", value: "99.4%" }
        ].map((m, i) => (
          <div key={i} className="apple-glass p-5 text-center bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10">
            <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-heading">{m.value}</div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Plans Grid */}
      <div className="space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Maintenance & Support Plans
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Hover over any support tier for 3 seconds to pre-select it for your onboarding quote.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((p, i) => (
            <MaintenanceCard key={i} item={p} onSelect={handleSelectPlan} />
          ))}
        </div>
      </div>

      {/* Guarantees */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Why Businesses Rely on Our Maintenance
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Proactive prevention beats stressful emergency recovery every single time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {guarantees.map((g, i) => {
            const Icon = g.icon;
            return (
              <div key={i} className="apple-glass p-6 space-y-3 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">{g.title}</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{g.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="request-quote-form" className="pt-8 border-t border-slate-200 dark:border-white/10 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-blue-500 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Care Onboarding
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Protect Your Web Application
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Share your current website URL or software architecture to receive a complimentary health audit and custom maintenance proposal.
          </p>
        </div>

        {selectedPlanName && (
          <div className="max-w-md mx-auto p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center text-xs text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Selected Support Tier: <strong>{selectedPlanName}</strong></span>
          </div>
        )}

        <ContactForm 
          defaultService="Website Maintenance" 
          defaultDescription={prefilledDescription} 
        />
      </div>
    </div>
  );
}
