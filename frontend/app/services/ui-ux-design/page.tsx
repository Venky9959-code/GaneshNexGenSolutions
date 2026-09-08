"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  LayoutGrid, Sparkles, CheckCircle2, ChevronRight, 
  Palette, Smartphone, Eye, Monitor, Layers, Figma, Compass, MousePointer
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

interface DesignShowcase {
  title: string;
  category: string;
  desc: string;
  image: string;
  badge: string;
  features: string[];
}

function DesignCard({ 
  item, 
  onSelect 
}: { 
  item: DesignShowcase; 
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
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-white font-heading">Like this Design Style?</h4>
              <p className="text-[10px] text-zinc-400 max-w-[220px] leading-relaxed">
                Includes: {item.features.join(", ")}
              </p>
            </div>
            <button
              onClick={() => onSelect(item.title, item.features)}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-lg shadow-blue-500/30 flex items-center gap-1.5 transition transform active:scale-95 cursor-pointer"
            >
              <span>Get This Design Style</span> <ChevronRight className="w-3 h-3" />
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

export default function UiUxDesignPage() {
  const [selectedDesignName, setSelectedDesignName] = useState("");
  const [prefilledDescription, setPrefilledDescription] = useState("");

  const showcases: DesignShowcase[] = [
    {
      title: "Apple-Style Glassmorphism Web App",
      category: "SaaS Web Applications",
      desc: "Ultra-sleek dark and light mode user interface using frosted glass textures, fluid micro-interactions, and balanced typographic hierarchy.",
      image: "/images/templates/saas.png",
      badge: "Flagship Aesthetics",
      features: ["Figma Design System", "Dark & Light Mode Tokens", "Micro-Interactions"]
    },
    {
      title: "Intuitive Mobile App Experience",
      category: "iOS & Android Mobile UI",
      desc: "Native-feeling mobile app interfaces engineered strictly around thumb zones, bottom sheets, gesture navigation, and haptic feedback triggers.",
      image: "/images/templates/portfolio.png",
      badge: "Mobile Native",
      features: ["Thumb-Zone Navigation", "Interactive Prototypes", "Developer Hand-off Specs"]
    },
    {
      title: "High-Conversion E-Commerce UX",
      category: "D2C & Retail Experience",
      desc: "Frictionless shopping user experience designed to boost average order value with one-click side cart checkout and streamlined product filtering.",
      image: "/images/templates/ecommerce.png",
      badge: "Conversion Focused",
      features: ["Sticky Add-to-Cart", "Dynamic Checkout Flow", "User Journey Audits"]
    },
    {
      title: "Corporate Brand Digital Identity",
      category: "Enterprise Websites & Portals",
      desc: "Authoritative, trustworthy visual branding and corporate landing design that instills immediate confidence for B2B decision makers.",
      image: "/images/templates/business.png",
      badge: "B2B Professional",
      features: ["Component Library", "Executive Presentation", "WCAG 2.1 AA Compliant"]
    }
  ];

  const handleSelectDesign = (title: string, features: string[]) => {
    setSelectedDesignName(title);
    const text = `I would like to hire your team for UI/UX Design based on the "${title}" style.\nScope requirements:\n- ${features.join("\n- ")}\n\nPlease reach out for an initial creative discovery session.`;
    setPrefilledDescription(text);

    const formElement = document.getElementById("request-quote-form");
    if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
  };

  const principles = [
    { icon: Eye, title: "Human-Centered Usability", desc: "Every button, margin, and typography scale is chosen for clarity, accessibility, and effortless task completion." },
    { icon: Figma, title: "Pixel-Perfect Figma Systems", desc: "Organized Figma component libraries with autolayout, design tokens, and clear states (default, hover, pressed, disabled)." },
    { icon: MousePointer, title: "Micro-Interactions", desc: "Delightful subtle physics, page transition cues, and tactile feedback that make digital experiences feel alive." },
    { icon: Smartphone, title: "Mobile-First Responsiveness", desc: "Designed for touch screens first before scaling gracefully to tablets, laptops, and ultra-wide displays." },
    { icon: Layers, title: "WCAG 2.1 AA Accessibility", desc: "Contrast ratios, screen reader semantics, and focus ring considerations baked in from day one." },
    { icon: Compass, title: "Seamless Dev Handoff", desc: "Clean CSS variables, exported SVGs, and direct sync with our Next.js and Tailwind engineering workflows." }
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <LayoutGrid className="w-3.5 h-3.5" /> UI/UX & Product Design
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Interfaces That Captivate Users and Drive Action
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          Great design isn&apos;t just what it looks like—it&apos;s how seamlessly it works. We design intuitive, Apple-inspired user interfaces in Figma that elevate brand credibility and maximize conversions.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "User Engagement", value: "+45%" },
          { label: "Bounce Rate Reduction", value: "-28%" },
          { label: "Design Tool", value: "Figma Pro" },
          { label: "Design System", value: "Tokens Ready" }
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
            Design Disciplines & Aesthetics
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Hover over any design direction for 3 seconds to pre-select it for your project consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {showcases.map((s, i) => (
            <DesignCard key={i} item={s} onSelect={handleSelectDesign} />
          ))}
        </div>
      </div>

      {/* Principles */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Our UI/UX Engineering Principles
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Bridging artistic visual aesthetics with rigorous user psychology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {principles.map((p, i) => {
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

      {/* Contact Form Section */}
      <div id="request-quote-form" className="pt-8 border-t border-slate-200 dark:border-white/10 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-blue-500 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Creative Discovery
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Discuss Your Digital Product Design
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Share your user audience, brand guidelines, and design goals with our design team.
          </p>
        </div>

        {selectedDesignName && (
          <div className="max-w-md mx-auto p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center text-xs text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Selected Design Direction: <strong>{selectedDesignName}</strong></span>
          </div>
        )}

        <ContactForm 
          defaultService="UI/UX Design" 
          defaultDescription={prefilledDescription} 
        />
      </div>
    </div>
  );
}
