"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Check, ArrowRight, ShieldCheck, Sparkles, HelpCircle, 
  ChevronDown, Calculator, Zap, Clock, CreditCard
} from "lucide-react";

export default function PricingPage() {
  const [billingMode, setBillingMode] = useState<"project" | "retainer">("project");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleAddon = (name: string) => {
    if (selectedAddons.includes(name)) {
      setSelectedAddons(selectedAddons.filter(a => a !== name));
    } else {
      setSelectedAddons([...selectedAddons, name]);
    }
  };

  const projectPackages = [
    {
      name: "STARTER WEBSITE",
      price: "₹10,000",
      period: "one-time",
      delivery: "7 - 10 Days",
      for: "Small businesses, consultants & professionals",
      features: [
        "Up to 5 custom pages (Home, About, Services, Contact)",
        "Mobile & tablet responsive UX",
        "Zod validated contact lead form",
        "Technical SEO setup & XML sitemap",
        "Free SSL & cloud deployment assistance",
        "30 days post-launch technical warranty"
      ]
    },
    {
      name: "BUSINESS WEBSITE",
      price: "₹20,000",
      period: "one-time",
      delivery: "10 - 14 Days",
      for: "Growing SMEs, startups & corporate brands",
      isPopular: true,
      features: [
        "Up to 12 custom pages & rich service catalog",
        "Apple-inspired UI/UX with smooth micro-animations",
        "Interactive proposal / quote calculator",
        "Google Analytics 4 & Search Console integration",
        "Lead email alerts & WhatsApp click-to-chat",
        "100/100 Core Web Vitals speed optimization",
        "60 days post-launch warranty & maintenance"
      ]
    },
    {
      name: "E-COMMERCE STORE",
      price: "₹30,000",
      period: "one-time",
      delivery: "2 - 3 Weeks",
      for: "Retailers, brands & online product companies",
      features: [
        "Product catalog with categories & variant swatches",
        "Frictionless slide-out cart & mobile checkout",
        "Razorpay & UPI Indian payment gateway integration",
        "Order management & automated invoice generation",
        "WhatsApp automated order notification ready",
        "Coupon codes & dynamic discount rules",
        "Inventory stock tracking & low-stock alerts"
      ]
    },
    {
      name: "CUSTOM SOFTWARE / AI",
      price: "Tailored Quote",
      period: "milestone based",
      delivery: "3 - 6 Weeks",
      for: "Enterprise applications & AI solutions",
      features: [
        "ASP.NET Core 9 Web API Clean Architecture",
        "ACID PostgreSQL relational schema & EF Core",
        "Custom OpenAI / Claude AI Copilot integration",
        "Meta WhatsApp Cloud API automated bots",
        "Role-Based Access Control (RBAC) & audit logs",
        "Dedicated cloud infrastructure & Docker CI/CD",
        "100% full source code ownership transferred"
      ]
    }
  ];

  const retainerPackages = [
    {
      name: "ESSENTIAL CARE",
      price: "₹5,000",
      period: "/ month",
      delivery: "Continuous",
      for: "Stable business sites requiring security & peace of mind",
      features: [
        "24/7/365 uptime monitoring",
        "Automated daily offsite backups",
        "Security vulnerability patching",
        "Quarterly speed audit & tuning",
        "Standard email support (24h response)"
      ]
    },
    {
      name: "GROWTH RETAINER",
      price: "₹15,000",
      period: "/ month",
      delivery: "Continuous",
      for: "Active businesses requiring regular updates",
      isPopular: true,
      features: [
        "Everything in Essential Care",
        "10 hours dedicated developer time / month",
        "New banner, page & content updates",
        "Google Search Console & SEO monitoring",
        "Priority WhatsApp support line (< 2h response)"
      ]
    },
    {
      name: "ENTERPRISE SLA",
      price: "₹35,000",
      period: "/ month",
      delivery: "Continuous",
      for: "High-traffic e-commerce & mission-critical apps",
      features: [
        "Everything in Growth Retainer",
        "25 hours dedicated developer time / month",
        "Guaranteed 1-hour emergency incident response",
        "Staging hotfix environment pre-testing",
        "Dedicated Lead Architect assigned to your account"
      ]
    },
    {
      name: "FRACTIONAL CTO",
      price: "Custom Retainer",
      period: "/ month",
      delivery: "Continuous",
      for: "Funded startups needing strategic technical direction",
      features: [
        "Weekly architecture sprint planning",
        "Cloud cost optimization (AWS/Azure)",
        "Code quality audits & developer hiring reviews",
        "Technical investor deck reviews",
        "Direct executive availability via Slack"
      ]
    }
  ];

  const addons = [
    { id: "ai_bot", name: "WhatsApp / Web AI Copilot", cost: 15000, desc: "Custom fine-tuned LLM answering customer questions 24/7" },
    { id: "razorpay", name: "Multi-Currency Payment Setup", cost: 4000, desc: "Accept USD, EUR, GBP along with Indian UPI" },
    { id: "seo_pack", name: "Advanced SEO Authority Package", cost: 8000, desc: "Schema markup, Google Business sync, and keyword optimization" },
    { id: "i18n", name: "Multilingual Language Switcher", cost: 6000, desc: "Support English, Telugu, Hindi, or custom languages" },
    { id: "priority_sla", name: "24/7 Priority Emergency SLA", cost: 5000, desc: "Guaranteed 60-min response window for production issues" }
  ];

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const item = addons.find(a => a.id === id);
    return sum + (item ? item.cost : 0);
  }, 0);

  const pricingFaqs = [
    {
      q: "Are there any hidden costs or recurring platform fees?",
      a: "None whatsoever. Our project pricing is strictly fixed and milestone-based. You will never pay recurring commissions to us for your sales or traffic."
    },
    {
      q: "How does the milestone payment model work?",
      a: "We work on a transparent milestone structure: 40% initial deposit at project kickoff, 40% upon interactive demo review, and the remaining 20% only after final production deployment."
    },
    {
      q: "Who owns the code and intellectual property?",
      a: "You own 100% of the code, intellectual property, and design assets upon full milestone settlement. We transfer all Git repositories directly to your organization."
    },
    {
      q: "What if I need changes after the website is launched?",
      a: "Every project includes a complimentary 30 to 60 day post-launch warranty period to handle any unexpected adjustments. Beyond that, you can opt for our flexible monthly retainers or on-demand hourly tasks."
    }
  ];

  const currentPackages = billingMode === "project" ? projectPackages : retainerPackages;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Sparkles className="w-3.5 h-3.5" /> Transparent Pricing
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Clear, Milestone-Based Investment
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          No hidden fees, no recurring platform cuts. Select fixed-price project milestones or flexible monthly retainers.
        </p>

        {/* Toggle Switch */}
        <div className="inline-flex p-1 rounded-full bg-slate-200/80 dark:bg-white/10 border border-slate-300/50 dark:border-white/10 text-xs font-bold mt-2">
          <button
            onClick={() => setBillingMode("project")}
            className={`px-5 py-2 rounded-full transition cursor-pointer ${
              billingMode === "project" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Fixed-Price Projects
          </button>
          <button
            onClick={() => setBillingMode("retainer")}
            className={`px-5 py-2 rounded-full transition cursor-pointer ${
              billingMode === "retainer" 
                ? "bg-blue-600 text-white shadow-md" 
                : "text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Monthly Support Retainers
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentPackages.map((pkg, idx) => (
          <div 
            key={idx} 
            className={`apple-glass p-7 flex flex-col justify-between space-y-6 relative bg-white/85 dark:bg-zinc-900/70 border transition-all duration-300 hover:shadow-2xl ${
              pkg.isPopular 
                ? "border-blue-500 shadow-xl bg-blue-50/40 dark:bg-blue-600/10 ring-1 ring-blue-500/40" 
                : "border-slate-200 dark:border-white/10"
            }`}
          >
            {pkg.isPopular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full bg-blue-600 text-white shadow-md">
                Most Popular
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-heading">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                    {pkg.price}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-zinc-400">
                    {pkg.period}
                  </span>
                </div>
                <div className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-1">
                  Timeline: {pkg.delivery}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1 leading-tight">
                  {pkg.for}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2 text-xs">
                {pkg.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-700 dark:text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-snug">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link 
              href="/contact" 
              className={`w-full py-3 rounded-full text-xs font-semibold text-center transition flex items-center justify-center gap-2 ${
                pkg.isPopular 
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30" 
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white"
              }`}
            >
              <span>Get Started</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

      {/* Interactive Add-Ons Calculator */}
      <div className="apple-glass p-8 sm:p-10 border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 max-w-4xl mx-auto space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
              <Calculator className="w-4 h-4" /> Optional Enhancements
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading mt-0.5">
              Customize Your Project Add-Ons
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Select optional modules to see instant cost estimations.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-500 dark:text-zinc-400 block">Add-ons Estimated Total</span>
            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-heading">
              + ₹{addonsTotal.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {addons.map((addon) => {
            const isChecked = selectedAddons.includes(addon.id);
            return (
              <div 
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                  isChecked 
                    ? "bg-blue-50/80 dark:bg-blue-600/15 border-blue-500" 
                    : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300"
                }`}
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-xs text-slate-900 dark:text-white">{addon.name}</div>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-tight">{addon.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                    +₹{addon.cost.toLocaleString("en-IN")}
                  </span>
                  <div className={`w-4 h-4 rounded border mt-1.5 ml-auto flex items-center justify-center ${
                    isChecked ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 dark:border-white/20"
                  }`}>
                    {isChecked && <Check className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-slate-500 dark:text-zinc-400 text-center sm:text-left">
            Selected add-ons can be incorporated into your customized formal proposal.
          </div>
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center gap-1.5 shadow-md shadow-blue-600/20 shrink-0"
          >
            <span>Lock In Add-Ons Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 3 Milestone Payment Safeguards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { step: "40%", title: "Kickoff Deposit", desc: "Covers architecture blueprinting, initial wireframing, and repository setup." },
          { step: "40%", title: "Demo Review", desc: "Paid only after you test and approve the working interactive staging environment." },
          { step: "20%", title: "Production Launch", desc: "Released only after domain deployment, SSL certification, and repository handover." }
        ].map((m, idx) => (
          <div key={idx} className="apple-glass p-6 text-center space-y-2 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10">
            <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-heading">{m.step}</div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{m.title}</h4>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>

      {/* Pricing FAQs */}
      <div className="space-y-6 max-w-4xl mx-auto pt-4 border-t border-slate-200 dark:border-white/10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
            Pricing & Milestone FAQs
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Transparent answers to common investment and ownership questions.
          </p>
        </div>

        <div className="space-y-3">
          {pricingFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="apple-glass border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 shrink-0 ml-4 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
