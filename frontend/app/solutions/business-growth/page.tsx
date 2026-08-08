import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function BusinessGrowthSolutionsPage() {
  return (
    <div className="pt-32 pb-16 px-6 max-w-5xl mx-auto space-y-12">
      <div className="space-y-4 text-center">
        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Digital Growth Architecture
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading">
          Business Growth Solutions
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Website optimization, lead generation systems, CRM lead capture, Meta WhatsApp automation, analytics & conversion optimization.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {[
          { title: "Website Optimization", desc: "Core Web Vitals tuning, fast server-side rendering, and responsive UX." },
          { title: "Lead Generation Engine", desc: "Zod validated lead forms, CRM ingestion, and instant Resend emails." },
          { title: "WhatsApp Automation", desc: "Meta WhatsApp Cloud API integration for instant customer follow-ups." },
          { title: "Business Intelligence", desc: "Custom analytics reporting on lead conversion rates and sales velocity." }
        ].map((item, i) => (
          <div key={i} className="apple-glass p-6 space-y-3 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 transition-colors duration-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">{item.title}</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/contact" className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs inline-flex items-center gap-2 shadow-xl shadow-blue-600/30">
          <span>Accelerate Your Business Growth</span> <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
