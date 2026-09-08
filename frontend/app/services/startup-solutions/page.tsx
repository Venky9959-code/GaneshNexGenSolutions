"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Rocket, Sparkles, CheckCircle2, ChevronRight, 
  Lightbulb, ShieldCheck, TrendingUp, Flag, Users, Compass, Laptop, Zap
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

interface MvpBlueprint {
  title: string;
  category: string;
  desc: string;
  image: string;
  badge: string;
  features: string[];
}

function MvpCard({ 
  item, 
  onSelect 
}: { 
  item: MvpBlueprint; 
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
              <Rocket className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-white font-heading">Select this MVP Blueprint?</h4>
              <p className="text-[10px] text-zinc-400 max-w-[220px] leading-relaxed">
                Includes: {item.features.join(", ")}
              </p>
            </div>
            <button
              onClick={() => onSelect(item.title, item.features)}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-lg shadow-blue-500/30 flex items-center gap-1.5 transition transform active:scale-95 cursor-pointer"
            >
              <span>Launch This MVP</span> <ChevronRight className="w-3 h-3" />
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

export default function StartupSolutionsPage() {
  const [selectedMvpName, setSelectedMvpName] = useState("");
  const [prefilledDescription, setPrefilledDescription] = useState("");

  const blueprints: MvpBlueprint[] = [
    {
      title: "3-Week Rapid MVP Sprint",
      category: "Rapid Validation MVP",
      desc: "Fast-track engineering to build and deploy your core product hypothesis with user authentication, database, payment processor, and customer onboarding.",
      image: "/images/templates/saas.png",
      badge: "Fastest Time-to-Market",
      features: ["Next.js 16 + ASP.NET Core 9", "Payment Gateway Setup", "Live User Analytics"]
    },
    {
      title: "Investor Demo Prototype & Pitch Suite",
      category: "Seed Fundraising Prep",
      desc: "Interactive, high-fidelity clickable product prototype accompanied by an enterprise architecture blueprint and AWS/Azure cost projections for angel investors.",
      image: "/images/templates/business.png",
      badge: "Investor Ready",
      features: ["Figma Interactive Prototype", "Architecture Whitepaper", "Technical Pitch Deck Support"]
    },
    {
      title: "Scalable B2B SaaS Foundation",
      category: "B2B Software MVP",
      desc: "Enterprise-grade multi-tenant foundation featuring organization workspaces, role-based access, invitation invites, and subscription billing via Razorpay / Stripe.",
      image: "/images/templates/ecommerce.png",
      badge: "Scale Ready",
      features: ["Multi-Tenant Workspace", "Stripe / Razorpay Billing", "Team Invites & RBAC"]
    },
    {
      title: "Fractional CTO & Tech Advisory",
      category: "Founder Tech Partner",
      desc: "Strategic engineering partnership to help non-technical founders make sound architecture choices, hire developers, audit code, and eliminate technical debt.",
      image: "/images/templates/portfolio.png",
      badge: "Advisory SLA",
      features: ["Weekly Architecture Sprints", "Cloud Cost Optimization", "Developer Code Reviews"]
    }
  ];

  const handleSelectMvp = (title: string, features: string[]) => {
    setSelectedMvpName(title);
    const text = `I am a startup founder looking to collaborate on the "${title}" blueprint.\nKey requirements:\n- ${features.join("\n- ")}\n\nPlease reach out for an initial founder strategy call.`;
    setPrefilledDescription(text);

    const formElement = document.getElementById("request-quote-form");
    if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
  };

  const steps = [
    { step: "01", title: "Idea & Scope Lean Discovery", desc: "We strip away vanity features to define the single core value proposition users will pay for." },
    { step: "02", title: "Clickable UI/UX Wireframes", desc: "Interactive Figma prototype validated before writing a single line of backend code." },
    { step: "03", title: "Agile Development Sprint", desc: "Production-ready engineering using Next.js 16 and ASP.NET Core 9 with daily transparent progress." },
    { step: "04", title: "Deployment & Production Launch", desc: "Automated CI/CD pipeline, SSL, PostgreSQL backups, domain configuration, and analytics setup." },
    { step: "05", title: "Telemetry & Growth Iteration", desc: "Observe real user interaction heatmaps, resolve friction points, and iterate based on data." }
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Rocket className="w-3.5 h-3.5" /> Startup & MVP Solutions
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Launch Your Startup MVP in Weeks, Not Months
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          Transform your startup concept into a functional, investor-ready digital product without bloated agency fees or messy spaghetti code. We engineer scalable foundations that grow with your user base.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Rapid MVP Timeline", value: "3 - 4 Weeks" },
          { label: "Code Architecture", value: "Enterprise Scale" },
          { label: "Founder IP Ownership", value: "100%" },
          { label: "Cloud Cost Efficiency", value: "< ₹2,500/mo" }
        ].map((m, i) => (
          <div key={i} className="apple-glass p-5 text-center bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10">
            <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-heading">{m.value}</div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Blueprints Grid */}
      <div className="space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Startup Launch Blueprints
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Hover over any MVP program for 3 seconds to pre-select it for your founder consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {blueprints.map((b, i) => (
            <MvpCard key={i} item={b} onSelect={handleSelectMvp} />
          ))}
        </div>
      </div>

      {/* Roadmap Steps */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            The Founder-to-Launch Sprint
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            A structured, transparent roadmap designed to mitigate startup risk.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="apple-glass p-5 space-y-3 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 relative">
              <div className="text-xs font-mono font-extrabold text-blue-600 dark:text-blue-400">{s.step}</div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-heading">{s.title}</h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="request-quote-form" className="pt-8 border-t border-slate-200 dark:border-white/10 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-blue-500 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Confidential Founder Strategy
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Let&apos;s Build Your MVP
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Submit your idea under our standard confidentiality NDA. We will evaluate technical feasibility and estimate costs within 4 hours.
          </p>
        </div>

        {selectedMvpName && (
          <div className="max-w-md mx-auto p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center text-xs text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Selected Program: <strong>{selectedMvpName}</strong></span>
          </div>
        )}

        <ContactForm 
          defaultService="Startup Solutions" 
          defaultDescription={prefilledDescription} 
        />
      </div>
    </div>
  );
}
