import Link from "next/link";
import { Globe, Code2, Smartphone, LayoutGrid, Bot, Database, Zap, ShieldCheck, ArrowRight } from "lucide-react";

export default function ServicesIndexPage() {
  const serviceCategories = [
    { title: "Website Development", href: "/services/web-development", icon: Globe, desc: "Business websites, corporate portals, landing pages, and portfolios built on Next.js 16." },
    { title: "E-Commerce Development", href: "/services/ecommerce-development", icon: Zap, desc: "Online stores with product catalogs, shopping carts, order management, and Razorpay." },
    { title: "Custom Software Development", href: "/services/custom-software", icon: Code2, desc: "ASP.NET Core 9 enterprise applications tailored around specific operational workflows." },
    { title: "UI/UX Design", href: "/services/ui-ux-design", icon: LayoutGrid, desc: "Modern interfaces designed for usability, accessibility, and high conversion rates." },
    { title: "AI & Automation", href: "/services/ai-automation", icon: Bot, desc: "AI assistants, OpenAI fine-tuned bots, Meta WhatsApp Cloud API integrations." },
    { title: "Startup Solutions", href: "/services/startup-solutions", icon: ShieldCheck, desc: "From idea validation and MVP planning to product launch and scale roadmap." },
    { title: "Cloud & Deployment", href: "/services/cloud-deployment", icon: Database, desc: "Vercel, Azure, Cloudflare R2, domain registration, SSL certificates, and CI/CD pipelines." },
    { title: "Website Maintenance", href: "/services/maintenance", icon: Smartphone, desc: "Security monitoring, daily backups, performance updates, and ongoing upgrades." }
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading">
          Our Complete Technology Services
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400">
          We don&apos;t just build websites. We build digital solutions that help businesses grow.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {serviceCategories.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Link 
              key={idx} 
              href={s.href} 
              className="apple-glass p-6 apple-glass-hover block space-y-4 bg-white/75 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">{s.title}</h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{s.desc}</p>
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <span>Learn Details</span> <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
