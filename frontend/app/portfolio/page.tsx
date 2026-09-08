"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, Sparkles, CheckCircle2, TrendingUp, ExternalLink, 
  Layers, Code2, Database, ShieldCheck, Laptop, Zap
} from "lucide-react";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const projects = [
    {
      title: "NexGen Cloud ERP Engine",
      category: "Enterprise ERP",
      type: "Enterprise Architecture",
      client: "Ganesh NexGen Core Operating Engine",
      image: "/images/templates/saas.png",
      metric: "99.99% Availability",
      latency: "18ms API Latency",
      challenge: "Fragmented customer data, manual invoice calculations, and asynchronous project milestone tracking causing internal operational delays.",
      solution: "Engineered ASP.NET Core 9 Web API backend following CQRS Clean Architecture, MediatR, and PostgreSQL relational schema paired with Next.js 16 reactive frontend.",
      results: [
        "Eliminated 100% of manual invoice reconciliation errors",
        "Sub-20ms transactional database query execution",
        "Role-based access control (RBAC) with complete audit logging"
      ],
      tech: ["ASP.NET Core 9", "Next.js 16", "PostgreSQL", "Tailwind CSS", "Docker"]
    },
    {
      title: "FinTech Biometric Mobile & Web Portal",
      category: "FinTech",
      type: "High-Security Banking",
      client: "Enterprise FinTech Concept",
      image: "/images/templates/business.png",
      metric: "₹1.2Cr+ Volume Ready",
      latency: "PCI-DSS Compliant",
      challenge: "High security compliance requirements for customer authentication, real-time transaction processing, and automated ledger balancing.",
      solution: "Engineered banking-grade authentication with JWT token rotation, Razorpay payment gateway integration, and webhook idempotency handling.",
      results: [
        "Zero duplicate transaction processing errors",
        "Sub-second checkout flow across UPI and cards",
        "Automated PDF tax receipt dispatches over WhatsApp Cloud"
      ],
      tech: ["React Native", "TypeScript", "Razorpay API", "JWT Security", "PostgreSQL"]
    },
    {
      title: "AI Customer Support Copilot & RAG",
      category: "AI & Automation",
      type: "Conversational Intelligence",
      client: "E-Commerce Logistics Hub",
      image: "/images/templates/ecommerce.png",
      metric: "80% Automated Resolution",
      latency: "< 800ms Inference",
      challenge: "Customer support team inundated by repetitive order tracking, dispatch inquiries, and return authorization tickets.",
      solution: "Deployed Meta WhatsApp Cloud API webhooks powered by an OpenAI fine-tuned assistant and PostgreSQL pgvector knowledge retrieval.",
      results: [
        "80% of routine buyer inquiries answered in < 1 second",
        "Live escalation to human agent queue during business hours",
        "Zero confidential client data leakage outside private cloud"
      ],
      tech: ["OpenAI LLM", "Meta WhatsApp API", "pgvector", "Next.js 16"]
    },
    {
      title: "Luxe D2C Omni-Channel Retail Storefront",
      category: "E-Commerce",
      type: "D2C Brand Flagship",
      client: "Artisan Apparel Brand",
      image: "/images/templates/restaurant.png",
      metric: "+42% Conversion Rate",
      latency: "0.8s Page Load",
      challenge: "High cart abandonment on Shopify with slow mobile load times and poor Indian UPI payment gateway conversion rates.",
      solution: "Rebuilt from ground up with Next.js 16 Edge Rendering, instant side-cart drawer, and custom Razorpay UPI drop-in checkout.",
      results: [
        "100/100 Core Web Vitals on Google Mobile PageSpeed",
        "42% increase in completed online orders within 30 days",
        "Automated WhatsApp tracking links sent upon warehouse scan"
      ],
      tech: ["Next.js 16", "Razorpay Webhooks", "Tailwind CSS", "Vercel Edge"]
    },
    {
      title: "HealthCore Clinic EHR & Doctor Scheduler",
      category: "Web Applications",
      type: "Healthcare Management",
      client: "Multi-Speciality Hospital Network",
      image: "/images/templates/hospital.png",
      metric: "15,000+ Consultations",
      latency: "HIPAA Ready",
      challenge: "Double-booked doctor appointment slots and disjointed patient medical record histories across 3 clinic branches.",
      solution: "Engineered real-time slot locking calendar, digital prescriptions generator, and secure patient medical document vault.",
      results: [
        "Zero appointment double-booking conflicts across all clinics",
        "Patients receive digital prescriptions instantly via SMS/WhatsApp",
        "Encrypted database records with strict role-based hospital access"
      ],
      tech: ["ASP.NET Core 9", "Next.js 16", "PostgreSQL", "Cloudflare R2"]
    },
    {
      title: "Creator Studio Minimalist Showcase",
      category: "Web Applications",
      type: "Creative Portfolio",
      client: "Visual Design & Media Studio",
      image: "/images/templates/portfolio.png",
      metric: "3.5x Client Inquiries",
      latency: "99/100 Mobile Speed",
      challenge: "Legacy portfolio website was sluggish with heavy uncompressed video assets that drove away potential corporate design clients.",
      solution: "Designed Apple-inspired frosted glass aesthetic with Next.js image optimization, masonry layout, and smooth framer transitions.",
      results: [
        "Over 3.5x qualified inbound corporate RFP inquiries",
        "Blazing fast page transitions under 300ms",
        "Featured on multiple web design inspiration boards"
      ],
      tech: ["Next.js 16", "Tailwind CSS", "Framer Motion", "TypeScript"]
    }
  ];

  const categories = ["All", "Enterprise ERP", "E-Commerce", "Web Applications", "AI & Automation", "FinTech"];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Sparkles className="w-3.5 h-3.5" /> Proven Engineering Track Record
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Featured Architecture & Case Studies
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          Explore production digital systems, enterprise ASP.NET Core 9 platforms, and AI automation engines we have engineered to solve high-stakes business challenges.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((p, idx) => (
          <div 
            key={idx} 
            className="apple-glass overflow-hidden border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 hover:border-blue-500/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Visual Preview */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-zinc-950 border-b border-slate-200 dark:border-white/10">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-sm">
                    {p.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500 text-white shadow-sm flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> {p.metric}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-zinc-500 uppercase">
                    {p.type} • {p.latency}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading mt-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {p.title}
                  </h3>
                  <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mt-1">
                    {p.client}
                  </div>
                </div>

                <div className="space-y-2 text-xs pt-3 border-t border-slate-100 dark:border-white/5">
                  <div>
                    <strong className="text-slate-900 dark:text-white block mb-0.5">The Challenge:</strong>
                    <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">{p.challenge}</p>
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white block mb-0.5">The Solution:</strong>
                    <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">{p.solution}</p>
                  </div>
                </div>

                {/* Key Results */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-white/5 text-xs">
                  <strong className="text-slate-900 dark:text-white block mb-1">Delivered Outcomes:</strong>
                  {p.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-1.5 text-[11px] text-slate-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack & Action */}
            <div className="p-6 pt-0 space-y-4">
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-white/5">
                {p.tech.map((t, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                    {t}
                  </span>
                ))}
              </div>

              <Link
                href="/contact"
                className="w-full py-2.5 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-white/10 dark:hover:bg-blue-600 text-slate-800 dark:text-white font-semibold text-xs transition flex items-center justify-center gap-1.5 text-center"
              >
                <span>Request Similar Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div className="apple-glass p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 bg-gradient-to-br from-blue-600/10 via-white/80 to-blue-500/5 dark:from-blue-600/15 dark:via-zinc-900/80 dark:to-black border border-blue-500/20">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          Have a High-Stakes Project in Mind?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          We engineer systems that handle scale cleanly. Schedule an architecture review with our team to discover how we would approach your requirements.
        </p>
        <Link 
          href="/contact" 
          className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs inline-flex items-center gap-2 shadow-xl shadow-blue-600/30"
        >
          <span>Start Technical Discussion</span> <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
