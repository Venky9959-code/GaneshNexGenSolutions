"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building2, Store, ShoppingBag, GraduationCap, Stethoscope, 
  Utensils, Home, Compass, Briefcase, ArrowRight, Sparkles, CheckCircle2, TrendingUp, ShieldCheck
} from "lucide-react";

export default function IndustriesPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const industries = [
    { 
      name: "Retail & E-Commerce", 
      icon: ShoppingBag, 
      category: "Commerce",
      tag: "Omni-Channel Retail",
      roi: "+38% Checkout Conversion",
      challenge: "High checkout abandonment, inventory desynchronization across sales channels, and delayed order dispatch notifications.",
      modules: ["Razorpay & UPI Native Checkout", "Automated WhatsApp Dispatch Alerts", "Real-Time Multi-Warehouse Inventory", "Automated Cart Recovery Sequence"],
      tech: ["Next.js 16", "Razorpay API", "WhatsApp Cloud API", "PostgreSQL"],
      desc: "Fast, mobile-first storefronts with seamless product catalogs, automated stock sync, and instant WhatsApp customer updates." 
    },
    { 
      name: "Healthcare & Clinics", 
      icon: Stethoscope, 
      category: "Healthcare",
      tag: "HIPAA Compliant",
      roi: "99.8% Appointment Fulfillment",
      challenge: "Manual receptionist phone booking bottlenecks, double-booked consultation slots, and fragmented patient medical records.",
      modules: ["Live Doctor Consultation Scheduler", "Digital Prescription PDF Generator", "Patient EHR History Records", "Online Consultation Payment Gateway"],
      tech: ["ASP.NET Core 9", "CQRS Clean Arch", "PostgreSQL", "Encrypted Storage"],
      desc: "Trustworthy patient booking portals, clinic management software, and electronic health record systems." 
    },
    { 
      name: "Startups & MVP Ventures", 
      icon: Building2, 
      category: "Startups",
      tag: "Rapid MVP Sprint",
      roi: "3 - 4 Weeks Time-to-Market",
      challenge: "Burning through angel capital on bloated agencies and messy unmaintainable code that needs rebuilding before Series A.",
      modules: ["Lean Core Feature Architecture", "Interactive Investor Prototype", "Stripe / Razorpay Billing Setup", "Automated CI/CD DevOps Pipeline"],
      tech: ["Next.js 16", "ASP.NET Core 9", "Docker", "Vercel Edge"],
      desc: "Rapid MVP validation, brand identity, digital architecture, and scalable software foundations." 
    },
    { 
      name: "Education & EdTech", 
      icon: GraduationCap, 
      category: "Education",
      tag: "LMS & Student Hub",
      roi: "2.8x Student Engagement",
      challenge: "Unsecured video content distribution, fragmented student assignment submissions, and cumbersome fee collection.",
      modules: ["Course Syllabus & Video Player", "Automated Student Fee Invoicing", "Online Exam & Quiz Evaluator", "Teacher Grading Dashboard"],
      tech: ["Next.js 16", "Cloudflare Stream", "PostgreSQL", "Razorpay Subscriptions"],
      desc: "Scalable learning management systems (LMS), student portals, and online course delivery engines." 
    },
    { 
      name: "Restaurants & Hospitality", 
      icon: Utensils, 
      category: "Hospitality",
      tag: "Digital Dining & POS",
      roi: "+24% Average Table Spend",
      challenge: "Expensive 30% third-party food delivery platform commissions and clunky paper menus that can't update live specials.",
      modules: ["Contactless QR Digital Menu", "Direct Table-Side Ordering", "Online Table Reservation Engine", "Kitchen Order Ticket (KOT) Display"],
      tech: ["Next.js 16 PWA", "WebSockets", "Razorpay UPI", "Redis"],
      desc: "Digital QR menus, online food ordering systems, table reservations, and POS system integrations." 
    },
    { 
      name: "Real Estate & Agencies", 
      icon: Home, 
      category: "Real Estate",
      tag: "Property Portal",
      roi: "3.5x Qualified Buyer Inquiries",
      challenge: "Slow property search experiences, poor mobile photo galleries, and unorganized buyer lead routing.",
      modules: ["Multi-Filter Property Search (BHK, Locality)", "Interactive Location Map Pins", "Direct WhatsApp Agent Connect", "Automated Lead Scoring CRM"],
      tech: ["Next.js 16", "Mapbox API", "WhatsApp Cloud API", "PostgreSQL"],
      desc: "Luxury property listing portals, virtual walkthrough tours, and automated lead capture engines." 
    },
    { 
      name: "Logistics & Supply Chain", 
      icon: Compass, 
      category: "Logistics",
      tag: "Fleet & Dispatch",
      roi: "-35% Dispatch Coordination Overhead",
      challenge: "Blind spots in driver location tracking, manual paper delivery receipts, and delayed billing invoicing.",
      modules: ["Real-Time Vehicle GPS Telemetry", "Driver Digital POD (Proof of Delivery)", "Automated Trip Manifest PDF", "Customer Live Tracking Link"],
      tech: ["ASP.NET Core 9", "PostgreSQL GIS", "Docker", "Next.js 16"],
      desc: "Real-time dispatch management systems, vehicle telemetry tracking, and automated proof-of-delivery." 
    },
    { 
      name: "Professional & Legal Services", 
      icon: Briefcase, 
      category: "Corporate",
      tag: "Client Portal",
      roi: "-60% Manual Scheduling Hours",
      challenge: "Tedious back-and-forth email scheduling, manual retainer invoicing, and unorganized client document sharing.",
      modules: ["Automated Appointment Booking", "Secure Client Document Vault", "Retainer Invoicing & Receipts", "Digital Contract E-Signatures"],
      tech: ["Next.js 16", "ASP.NET Core 9", "AWS S3 / R2", "Razorpay"],
      desc: "Authoritative corporate portals, client self-service hubs, and automated consultation scheduling." 
    }
  ];

  const filterCategories = ["All", "Commerce", "Healthcare", "Startups", "Education", "Hospitality", "Real Estate", "Logistics", "Corporate"];

  const filteredIndustries = selectedFilter === "All" 
    ? industries 
    : industries.filter(i => i.category === selectedFilter);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Sparkles className="w-3.5 h-3.5" /> Sector-Specific Engineering
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Tailored Digital Architecture for Your Industry
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          Generic software fails because every industry has unique operational constraints. We engineer bespoke architectures designed specifically around your sector&apos;s workflow realities.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {filterCategories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
              selectedFilter === cat
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Industries Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredIndustries.map((ind, idx) => {
          const Icon = ind.icon;
          return (
            <div 
              key={idx} 
              className="apple-glass p-7 space-y-5 bg-white/80 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                        {ind.tag}
                      </span>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
                        {ind.name}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <TrendingUp className="w-3 h-3" /> {ind.roi}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {ind.desc}
                </p>

                {/* Challenge & Modules */}
                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/5 text-xs">
                  <div>
                    <strong className="text-slate-900 dark:text-white block mb-1">Sector Challenge:</strong>
                    <p className="text-slate-500 dark:text-zinc-400 leading-relaxed">{ind.challenge}</p>
                  </div>

                  <div>
                    <strong className="text-slate-900 dark:text-white block mb-1.5">Delivered Architecture Modules:</strong>
                    <div className="grid sm:grid-cols-2 gap-1.5">
                      {ind.modules.map((mod, mIdx) => (
                        <div key={mIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack & CTA */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {ind.tech.map((t, tIdx) => (
                    <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 group"
                >
                  <span>Discuss Solution</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA Banner */}
      <div className="apple-glass p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 bg-gradient-to-br from-blue-600/10 via-white/80 to-blue-500/5 dark:from-blue-600/15 dark:via-zinc-900/80 dark:to-black border border-blue-500/20">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30">
          <Building2 className="w-6 h-6" />
        </div>
        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Don&apos;t See Your Exact Industry?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
            We architect bespoke digital solutions across manufacturing, FinTech, agriculture, and government sectors. Let&apos;s evaluate your operational specifications.
          </p>
        </div>
        <Link 
          href="/contact" 
          className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs inline-flex items-center gap-2 shadow-xl shadow-blue-600/30"
        >
          <span>Schedule Industry Discovery Call</span> <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
