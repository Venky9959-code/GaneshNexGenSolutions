"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Sparkles, Building2, Stethoscope, Utensils, ShoppingBag, Code, Briefcase, ChevronRight, Zap } from "lucide-react";
import ContactForm from "@/components/ContactForm";

interface Template {
  title: string;
  category: string;
  desc: string;
  image: string;
  icon: any;
  badge: string;
  features: string[];
}

// Inner subcomponent to handle 3-second continuous hover interaction
function TemplateCard({ 
  template, 
  onSelect 
}: { 
  template: Template; 
  onSelect: (title: string, features: string[]) => void;
}) {
  const [hoveredLongEnough, setHoveredLongEnough] = useState(false);
  const [hoverProgress, setHoverProgress] = useState(0); // Progress percentage (0 to 100)
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const Icon = template.icon;

  const handleMouseEnter = () => {
    setHoverProgress(0);
    setHoveredLongEnough(false);

    // Track 3 seconds of continuous hover
    timerRef.current = setTimeout(() => {
      setHoveredLongEnough(true);
      setHoverProgress(100);
    }, 3000);

    // Track progress increment for high-fidelity visual indication
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
      {/* Template Image Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-zinc-950 border-b border-slate-200 dark:border-white/10 flex items-center justify-center">
        <img 
          src={template.image} 
          alt={template.title} 
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
        />
        
        {/* Hover Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-blue-600 transition-all duration-75"
          style={{ width: `${hoverProgress}%` }}
        />

        {/* Regular Glass Overlay on normal Hover */}
        <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="px-4 py-2 rounded-full bg-white/90 dark:bg-zinc-900/90 text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider shadow-md">
            Hover 3s to Select
          </span>
        </div>

        {/* Badge */}
        <span className="absolute top-3 right-3 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-blue-600 text-white shadow-sm z-10">
          {template.badge}
        </span>

        {/* 3s Active Modal Overlay (Get This) */}
        {hoveredLongEnough && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center space-y-4 p-4 text-center z-20 animate-fade-in transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center text-blue-400 animate-bounce">
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-white font-heading">Like this layout?</h4>
              <p className="text-[10px] text-zinc-400 max-w-[200px] leading-relaxed">
                Includes: {template.features.join(", ")}
              </p>
            </div>
            <button
              onClick={() => onSelect(template.title, template.features)}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-lg shadow-blue-500/30 flex items-center gap-1.5 transition transform active:scale-95 cursor-pointer"
            >
              <span>Get This Layout</span> <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Content description */}
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

export default function WebDevelopmentPage() {
  const [selectedTemplateName, setSelectedTemplateName] = useState("");
  const [prefilledDescription, setPrefilledDescription] = useState("");

  const templates: Template[] = [
    {
      title: "Gourmet Fine Dining",
      category: "Food & Hospitality (Restaurant)",
      desc: "An elegant, premium template designed for high-end dining. Features modern digital menus, online reservation forms, custom event spaces, and responsive photo galleries of signature dishes.",
      image: "/images/templates/restaurant.png",
      icon: Utensils,
      badge: "Best Seller",
      features: ["Online Booking System", "Live Digital Menu", "Gourmet Photo Showcase"]
    },
    {
      title: "NexGen Health Hub",
      category: "Healthcare & Hospital Portal",
      desc: "A clean, trustworthy, and modern web interface tailored for medical clinics, private practices, and hospitals. Includes appointment scheduling, doctor directory, service categorization, and patient FAQs.",
      image: "/images/templates/hospital.png",
      icon: Stethoscope,
      badge: "Popular",
      features: ["Slot Scheduler", "Doctor Profile Cards", "Medical Services Directory"]
    },
    {
      title: "Apex Realty",
      category: "Real Estate & Corporate Agency",
      desc: "A modern real estate and professional service site showing luxury property listings, search filters, interactive maps, agent profile cards, and clean visual property description pages.",
      image: "/images/templates/business.png",
      icon: Building2,
      badge: "Corporate Elite",
      features: ["Advanced Search Bar", "Lead Capture Form", "Map & Location Pins"]
    },
    {
      title: "Shopify Premium Go",
      category: "Retail & E-Commerce",
      desc: "A mobile-first storefront featuring smooth product browsing, mini cart drawers, category listing pages, detailed item pages, and a secure checkout path. Ready for payment gateway integrations.",
      image: "/images/templates/ecommerce.png",
      icon: ShoppingBag,
      badge: "E-Commerce Ready",
      features: ["Shopping Cart Checkout", "Razorpay Payment Gateway", "Inventory Catalog Grid"]
    },
    {
      title: "SaaS Analytics Engine",
      category: "Startups & Software",
      desc: "A dark-mode oriented SaaS landing page optimized for conversion. Features interactive pricing calculators, product feature matrices, user testimonial sliders, and documentation layout templates.",
      image: "/images/templates/saas.png",
      icon: Code,
      badge: "Conversion Engine",
      features: ["Interactive Pricing Switch", "Tech Features Matrix", "Testimonials Showcase"]
    },
    {
      title: "Minimalist Creator Studio",
      category: "Creative Portfolio & Agency",
      desc: "A highly visual template designed for design studios, photographers, and developers. Focuses on minimal typography, bold full-width project headers, and masonry image galleries.",
      image: "/images/templates/portfolio.png",
      icon: Briefcase,
      badge: "Creative Space",
      features: ["Masonry Portfolio Grid", "Sleek Contact Form", "Framer Micro-Animations"]
    }
  ];

  const handleTemplateSelect = (title: string, features: string[]) => {
    setSelectedTemplateName(title);
    
    // Construct rich text template request description
    const text = `I would like to get the "${title}" layout for my business.
This template includes:
- ${features.join("\n- ")}

Please customize it for my business with the following features:
`;
    setPrefilledDescription(text);

    // Scroll to the contact form section smoothly
    const formSection = document.getElementById("quote-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
      
      // Auto focus the name input inside the form
      setTimeout(() => {
        const nameInput = document.querySelector("input[placeholder='e.g. Rahul Sharma']") as HTMLInputElement;
        if (nameInput) {
          nameInput.focus();
        }
      }, 800);
    }
  };

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-20">
      {/* Header Section */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono font-bold text-blue-500 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          Service 01
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          High-Performance Website Development
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
          Business websites, corporate portals, landing pages, and portfolios designed to establish trust, showcase your brand, and generate qualified sales leads.
        </p>
      </div>

      {/* Deliverables Grid */}
      <div className="apple-glass p-6 sm:p-8 space-y-6 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 transition-colors duration-300">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">What We Deliver</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {[
            "Next.js 16 App Router for ultra-fast page load speeds",
            "Fully responsive design across 320px to 1920px viewports",
            "Sleek and premium theme switching (light and dark adaptive)",
            "SEO metadata, OpenGraph tags & XML sitemaps built-in",
            "Zod validated contact forms & instant automated email alerts",
            "Google Analytics 4 & Search Console integration templates",
            "Premium CSS animation and glassmorphic micro-interactions",
            "Structured PostgreSQL database storage schemas",
            "Comprehensive training session and post-launch maintenance"
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 text-slate-700 dark:text-zinc-300 leading-relaxed">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Templates Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Templates Gallery
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Popular Website Templates
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-xl mx-auto">
            Choose one of our premium base templates to jumpstart your project or build a completely custom design from scratch. 
            <span className="block mt-1 font-semibold text-blue-600 dark:text-blue-400">Hover your cursor on any layout for 3 seconds to select it!</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((t, idx) => (
            <TemplateCard 
              key={idx} 
              template={t} 
              onSelect={handleTemplateSelect} 
            />
          ))}
        </div>
      </div>

      {/* Quote / Contact Section */}
      <div id="quote-section" className="space-y-8 pt-8 border-t border-slate-200 dark:border-white/10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          {selectedTemplateName && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
              ✓ Customizing: {selectedTemplateName} Layout
            </div>
          )}
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Get an Instant Website Quote
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            Fill out your details below and tell us about your project requirements. Our technical sales architect will analyze your description and deliver a custom cost estimate proposal.
          </p>
        </div>

        {/* Change key dynamically to force ContactForm remount and re-populate the prefilled description */}
        <ContactForm 
          defaultService="Website Development" 
          defaultDescription={prefilledDescription} 
          key={selectedTemplateName || "default"} 
        />
      </div>
    </div>
  );
}
