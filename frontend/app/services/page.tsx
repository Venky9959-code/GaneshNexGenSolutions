import Link from "next/link";
import { 
  Globe, Code2, Smartphone, LayoutGrid, Bot, Database, Zap, ShieldCheck, 
  ArrowRight, Sparkles, CheckCircle2, ChevronRight 
} from "lucide-react";

export default function ServicesIndexPage() {
  const serviceCategories = [
    { 
      num: "01",
      title: "Website Development", 
      href: "/services/web-development", 
      icon: Globe, 
      tag: "Next.js 16 • React",
      delivery: "7-10 Days",
      desc: "High-performance corporate portals, business websites, conversion landing pages, and web apps with 100/100 Core Web Vitals.",
      highlights: ["SSR & Edge Caching", "Apple-Style Glassmorphism", "Technical SEO Foundation"]
    },
    { 
      num: "02",
      title: "E-Commerce Development", 
      href: "/services/ecommerce-development", 
      icon: Zap, 
      tag: "Razorpay • UPI Native",
      delivery: "2-3 Weeks",
      desc: "Fast, high-converting online stores with product catalog management, instant side carts, and automated WhatsApp order tracking.",
      highlights: ["Razorpay & Card Gateways", "Live Inventory Sync", "WhatsApp Order Alerts"]
    },
    { 
      num: "03",
      title: "Custom Software Development", 
      href: "/services/custom-software", 
      icon: Code2, 
      tag: "ASP.NET Core 9 • CQRS",
      delivery: "3-6 Weeks",
      desc: "Enterprise business applications, internal operating engines, and custom ERPs engineered with Clean Architecture.",
      highlights: ["Clean Architecture & CQRS", "PostgreSQL ACID Database", "100% Code Ownership"]
    },
    { 
      num: "04",
      title: "UI/UX Design", 
      href: "/services/ui-ux-design", 
      icon: LayoutGrid, 
      tag: "Figma Pro Systems",
      delivery: "1-2 Weeks",
      desc: "Modern digital product interfaces designed around human psychology, accessibility, and high conversion rates.",
      highlights: ["Figma Design Systems", "Interactive Prototypes", "WCAG 2.1 Accessibility"]
    },
    { 
      num: "05",
      title: "AI & Automation", 
      href: "/services/ai-automation", 
      icon: Bot, 
      tag: "OpenAI • WhatsApp API",
      delivery: "1-3 Weeks",
      desc: "AI copilots, customer support LLMs, automated WhatsApp sales bots, and intelligent document OCR processing pipelines.",
      highlights: ["Custom RAG Knowledge Bases", "Meta WhatsApp Cloud API", "Zero Data Retention NDA"]
    },
    { 
      num: "06",
      title: "Startup Solutions", 
      href: "/services/startup-solutions", 
      icon: ShieldCheck, 
      tag: "Lean Discovery • MVP",
      delivery: "3-4 Weeks",
      desc: "Rapid MVP validation, technical architecture planning, investor prototypes, and scalable cloud launch foundations.",
      highlights: ["3-Week Rapid MVP Sprint", "Investor Demo Prototypes", "Fractional CTO Advisory"]
    },
    { 
      num: "07",
      title: "Cloud & Deployment", 
      href: "/services/cloud-deployment", 
      icon: Database, 
      tag: "Azure • Vercel • Docker",
      delivery: "2-5 Days",
      desc: "Production cloud setups, CI/CD automated deployment pipelines, custom domains, SSL certificates, and zero-downtime releases.",
      highlights: ["Vercel & Azure Multi-Tier", "Cloudflare WAF & DDoS", "Automated Daily Snapshots"]
    },
    { 
      num: "08",
      title: "Website Maintenance", 
      href: "/services/maintenance", 
      icon: Smartphone, 
      tag: "24/7 SLA • Peace of Mind",
      delivery: "Monthly Retainer",
      desc: "24/7 uptime monitoring, daily database backups, proactive security patches, and on-demand monthly developer sprints.",
      highlights: ["< 60-Min Emergency SLA", "Daily Offsite Backups", "Core Web Vitals Audits"]
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Sparkles className="w-3.5 h-3.5" /> Full-Spectrum Engineering
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Complete Technology & Digital Services
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          We don&apos;t just build websites. We engineer end-to-end digital solutions—from enterprise software and high-speed web apps to AI automation and cloud infrastructure—designed strictly to accelerate your business growth.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {serviceCategories.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Link 
              key={idx} 
              href={s.href} 
              className="apple-glass p-6 apple-glass-hover flex flex-col justify-between space-y-5 bg-white/80 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-zinc-500">
                    {s.num}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
                    {s.tag}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mt-0.5">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed mt-2">
                    {s.desc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-white/5">
                  {s.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-zinc-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 border-t border-slate-100 dark:border-white/5">
                <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-normal">Est: {s.delivery}</span>
                <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore Service</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom CTA Banner */}
      <div className="apple-glass p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 bg-gradient-to-br from-blue-600/10 via-white/80 to-blue-500/5 dark:from-blue-600/15 dark:via-zinc-900/80 dark:to-black border border-blue-500/20">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Need a Tailored Multi-Service Solution?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
            Combine web development, custom ASP.NET Core 9 APIs, and AI workflow automation into a cohesive unified platform.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center gap-2 shadow-xl shadow-blue-600/30"
          >
            <span>Book Free Technical Architecture Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/pricing"
            className="px-7 py-3.5 rounded-full apple-glass border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white font-semibold text-xs hover:bg-slate-200/50 dark:hover:bg-white/10 transition"
          >
            View Transparent Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
