"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  ChevronDown, Menu, X, ArrowRight, Phone, MessageSquare, 
  Globe, Code2, Smartphone, LayoutGrid, Bot, Database, Zap, ShieldCheck
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function BrandHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const servicesList = [
    { title: "Website Development", href: "/services/web-development", desc: "Next.js 16 high-performance business websites", icon: Globe },
    { title: "E-Commerce Development", href: "/services/ecommerce-development", desc: "Online stores with payment & order management", icon: Zap },
    { title: "Custom Software", href: "/services/custom-software", desc: "ASP.NET Core 9 enterprise business applications", icon: Code2 },
    { title: "UI/UX Design", href: "/services/ui-ux-design", desc: "Modern user interfaces designed for conversion", icon: LayoutGrid },
    { title: "AI & Automation", href: "/services/ai-automation", desc: "AI assistants & automated business workflows", icon: Bot },
    { title: "Startup Solutions", href: "/services/startup-solutions", desc: "Idea validation, MVP planning & launch support", icon: ShieldCheck }
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? "bg-[var(--bg-primary)]/90 dark:bg-black/90 backdrop-blur-xl border-b border-[var(--border-card)] py-2.5 shadow-xl" 
        : "bg-[var(--bg-primary)]/70 dark:bg-black/70 backdrop-blur-md border-b border-[var(--border-card)] py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Official Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 px-2.5 py-1 bg-white/80 dark:bg-white/10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/15 shadow-lg group-hover:scale-105 transition-transform backdrop-blur-md">
            <img 
              src="/brand/logo.png" 
              alt="Ganesh NexGen Solutions" 
              className="h-8 w-auto object-contain drop-shadow-[0_0_10px_rgba(59,130,246,0.4)]"
            />
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white block">Ganesh NexGen</span>
            <span className="text-[9px] text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase block -mt-1">
              Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-700 dark:text-zinc-300">
          <Link href="/" className={`hover:text-blue-600 dark:hover:text-white transition ${pathname === "/" ? "text-blue-600 dark:text-blue-400" : ""}`}>
            Home
          </Link>
          <Link href="/about" className={`hover:text-blue-600 dark:hover:text-white transition ${pathname === "/about" ? "text-blue-600 dark:text-blue-400" : ""}`}>
            About Us
          </Link>

          {/* Mega Menu Dropdown for Services */}
          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-white transition py-2">
              <span>Services</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-0 w-[540px] apple-glass p-4 border border-slate-200 dark:border-white/15 shadow-2xl grid grid-cols-2 gap-3 animate-in fade-in zoom-in-95 duration-150">
                {servicesList.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <Link 
                      key={idx} 
                      href={s.href}
                      className="p-3 rounded-xl hover:bg-blue-600/10 dark:hover:bg-blue-600/15 border border-transparent hover:border-blue-500/30 transition block group"
                    >
                      <div className="flex items-center gap-2.5 mb-1">
                        <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition">{s.title}</span>
                      </div>
                      <p className="text-[10px] text-slate-600 dark:text-zinc-400 leading-tight">{s.desc}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link href="/solutions/business-growth" className={`hover:text-blue-600 dark:hover:text-white transition ${pathname.includes("solutions") ? "text-blue-600 dark:text-blue-400" : ""}`}>
            Solutions
          </Link>
          <Link href="/industries" className={`hover:text-blue-600 dark:hover:text-white transition ${pathname === "/industries" ? "text-blue-600 dark:text-blue-400" : ""}`}>
            Industries
          </Link>
          <Link href="/portfolio" className={`hover:text-blue-600 dark:hover:text-white transition ${pathname === "/portfolio" ? "text-blue-600 dark:text-blue-400" : ""}`}>
            Portfolio
          </Link>
          <Link href="/pricing" className={`hover:text-blue-600 dark:hover:text-white transition ${pathname === "/pricing" ? "text-blue-600 dark:text-blue-400" : ""}`}>
            Pricing
          </Link>
          <Link href="/faq" className={`hover:text-blue-600 dark:hover:text-white transition ${pathname === "/faq" ? "text-blue-600 dark:text-blue-400" : ""}`}>
            FAQ
          </Link>
          <Link href="/contact" className={`hover:text-blue-600 dark:hover:text-white transition ${pathname === "/contact" ? "text-blue-600 dark:text-blue-400" : ""}`}>
            Contact
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <Link 
            href="/contact" 
            className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
          >
            <span>Get Free Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-3">
          <ThemeToggle />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-800 dark:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden apple-glass border-b border-slate-200 dark:border-white/10 p-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3 text-sm font-semibold text-slate-800 dark:text-zinc-200">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)}>All Services</Link>
            <Link href="/solutions/business-growth" onClick={() => setMobileMenuOpen(false)}>Business Growth Solutions</Link>
            <Link href="/industries" onClick={() => setMobileMenuOpen(false)}>Industries</Link>
            <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</Link>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </nav>
          <div className="pt-4 border-t border-white/10">
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-2"
            >
              Get Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
