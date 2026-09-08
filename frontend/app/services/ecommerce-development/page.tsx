"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  ShoppingBag, Zap, ShieldCheck, CheckCircle2, ChevronRight, 
  CreditCard, Smartphone, Sparkles, Truck, PackageCheck, Layers, RefreshCw, BarChart3, Database, Globe
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

interface Template {
  title: string;
  category: string;
  desc: string;
  image: string;
  badge: string;
  features: string[];
}

function TemplateCard({ 
  template, 
  onSelect 
}: { 
  template: Template; 
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
          src={template.image} 
          alt={template.title} 
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
          {template.badge}
        </span>

        {hoveredLongEnough && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center space-y-4 p-4 text-center z-20 animate-fade-in transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400 animate-bounce">
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-white font-heading">Like this layout?</h4>
              <p className="text-[10px] text-zinc-400 max-w-[220px] leading-relaxed">
                Includes: {template.features.join(", ")}
              </p>
            </div>
            <button
              onClick={() => onSelect(template.title, template.features)}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-lg shadow-blue-500/30 flex items-center gap-1.5 transition transform active:scale-95 cursor-pointer"
            >
              <span>Get This Store Setup</span> <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            {template.category}
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
            {template.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed font-normal">
            {template.desc}
          </p>
        </div>

        <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {template.features.map((feat, fIdx) => (
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

export default function EcommerceServicePage() {
  const [selectedTemplateName, setSelectedTemplateName] = useState("");
  const [prefilledDescription, setPrefilledDescription] = useState("");

  const templates: Template[] = [
    {
      title: "Luxe D2C Fashion & Apparel",
      category: "D2C Brand Storefront",
      desc: "High-fashion flagship storefront featuring aesthetic lookbooks, size variants, instant cart drawer, swatch selectors, and Razorpay checkout.",
      image: "/images/templates/ecommerce.png",
      badge: "High Conversion",
      features: ["Color & Size Swatches", "Instant Side Cart Drawer", "Razorpay + UPI Checkout"]
    },
    {
      title: "TechZone Gadgets & Electronics",
      category: "Multi-SKU Electronics",
      desc: "Feature-packed catalog with multi-attribute filtering, spec comparison tables, customer verified reviews, and automated warranty registration.",
      image: "/images/templates/saas.png",
      badge: "High Performance",
      features: ["Specification Comparison", "Stock Alert Notifications", "EMI & BNPL Support"]
    },
    {
      title: "Artisan Pantry Gourmet Foods",
      category: "Grocery & Organic Goods",
      desc: "Fast recurring-purchase engine designed for perishable & shelf goods. Built-in zip code delivery validator, subscription delivery, and WhatsApp re-ordering.",
      image: "/images/templates/restaurant.png",
      badge: "Fast Fulfillment",
      features: ["Delivery Pincode Checker", "Subscription Orders", "WhatsApp Reorder Bot"]
    },
    {
      title: "Apex Multi-Vendor Marketplace",
      category: "Multi-Seller Commerce",
      desc: "Scalable marketplace engine with seller onboarding dashboards, automated commission calculation, split payouts, and centralized dispute resolution.",
      image: "/images/templates/business.png",
      badge: "Enterprise Scale",
      features: ["Vendor Portal", "Automated Commission Split", "Order Dispatch Manager"]
    }
  ];

  const handleTemplateSelect = (title: string, features: string[]) => {
    setSelectedTemplateName(title);
    const text = `I would like to get the "${title}" E-Commerce layout for my online business.\nThis store package includes:\n- ${features.join("\n- ")}\n\nPlease customize it with our brand colors, products, and payment gateway.`;
    setPrefilledDescription(text);

    const formElement = document.getElementById("request-quote-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const capabilities = [
    { icon: CreditCard, title: "Razorpay & UPI Native", desc: "Zero-drop checkout supporting UPI, Credit/Debit Cards, Net Banking, and PayLater." },
    { icon: Smartphone, title: "WhatsApp Order Alerts", desc: "Automated instant confirmation, tracking link, and dispatch status over WhatsApp Cloud API." },
    { icon: PackageCheck, title: "Live Inventory Sync", desc: "Prevent overselling with real-time stock deductions, back-order controls, and low-inventory warnings." },
    { icon: Truck, title: "Shipping Partner APIs", desc: "Pre-integrated with Shiprocket, Delhivery, and Blue Dart for instant label & AWB generation." },
    { icon: BarChart3, title: "Customer Analytics", desc: "Cohort tracking, abandoned cart metrics, average order value (AOV), and customer lifetime value (LTV)." },
    { icon: ShieldCheck, title: "PCI-DSS Security", desc: "Strict end-to-end tokenization, SSL encryption, and automated fraud prevention filters." }
  ];

  const packages = [
    {
      name: "Starter Store",
      price: "₹30,000",
      desc: "Ideal for emerging D2C brands launching their first professional store.",
      features: [
        "Up to 50 Products Catalog",
        "Mobile-First Responsive UX",
        "Razorpay & UPI Payment Integration",
        "Basic Discount Codes & Coupons",
        "Order Management Dashboard",
        "Standard SEO & Sitemap"
      ]
    },
    {
      name: "Growth Store",
      price: "₹55,000",
      popular: true,
      desc: "For established retail businesses expanding aggressively online.",
      features: [
        "Unlimited Products & Variants",
        "Automated WhatsApp Notifications",
        "Abandoned Cart Recovery Funnel",
        "Shipping API Integration (Shiprocket)",
        "Customer Reviews & Ratings Engine",
        "High-Speed Next.js 16 Edge Rendering"
      ]
    },
    {
      name: "Custom Marketplace",
      price: "Custom Scope",
      desc: "Multi-vendor systems, B2B wholesale portals & bespoke logistics.",
      features: [
        "Vendor Onboarding & Dashboard",
        "Automated Split Payment Payouts",
        "B2B Volume Tiered Pricing",
        "ASP.NET Core 9 Enterprise Backend",
        "Custom ERP/CRM Synchronization",
        "Dedicated DevOps & SLA"
      ]
    }
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <ShoppingBag className="w-3.5 h-3.5" /> E-Commerce Engineering
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Turn Visitors Into Loyal Buyers with NextGen E-Commerce
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          We engineer blazing-fast, high-converting online stores built on Next.js 16 and ASP.NET Core 9, complete with seamless Razorpay payments, real-time inventory, and automated customer notifications.
        </p>
      </div>

      {/* Key Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Checkout Conversion", value: "+38%" },
          { label: "Avg Page Load Speed", value: "< 1.1s" },
          { label: "Payment Gateway Success", value: "99.8%" },
          { label: "Mobile First UX", value: "100%" }
        ].map((m, i) => (
          <div key={i} className="apple-glass p-5 text-center bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10">
            <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-heading">{m.value}</div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Interactive Templates Section */}
      <div className="space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Choose an E-Commerce Architecture
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Hover over any layout for 3 seconds to instantly pre-select it for your custom quotation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {templates.map((tpl, i) => (
            <TemplateCard key={i} template={tpl} onSelect={handleTemplateSelect} />
          ))}
        </div>
      </div>

      {/* Capabilities Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Enterprise E-Commerce Capabilities
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Everything your store requires to sell seamlessly at scale across India.
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

      {/* Packages Section */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            E-Commerce Pricing Tiers
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Clear, milestone-based packages without recurring platform commission cuts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <div 
              key={i} 
              className={`apple-glass p-7 flex flex-col justify-between space-y-6 relative bg-white/80 dark:bg-zinc-900/70 border ${
                pkg.popular ? "border-blue-500 shadow-xl bg-blue-50/40 dark:bg-blue-600/10" : "border-slate-200 dark:border-white/10"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full bg-blue-600 text-white shadow-md">
                  Most Popular
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase font-heading">{pkg.name}</h3>
                  <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-2">{pkg.price}</div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{pkg.desc}</p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-white/10 text-xs">
                  {pkg.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-slate-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setPrefilledDescription(`I am interested in the ${pkg.name} (${pkg.price}) package for our e-commerce store.`);
                  const formElement = document.getElementById("request-quote-form");
                  if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
                }}
                className={`w-full py-3 rounded-full text-xs font-semibold text-center transition flex items-center justify-center gap-2 ${
                  pkg.popular 
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30" 
                    : "bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white"
                }`}
              >
                <span>Select {pkg.name}</span> <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Contact Form Request */}
      <div id="request-quote-form" className="pt-8 border-t border-slate-200 dark:border-white/10 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-blue-500 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Direct Technical Inquiry
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Launch Your E-Commerce Store
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Tell us about your product catalog, target audience, and preferred integrations.
          </p>
        </div>

        {selectedTemplateName && (
          <div className="max-w-md mx-auto p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center text-xs text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Pre-selected layout: <strong>{selectedTemplateName}</strong></span>
          </div>
        )}

        <ContactForm 
          defaultService="E-Commerce Development" 
          defaultDescription={prefilledDescription} 
        />
      </div>
    </div>
  );
}
