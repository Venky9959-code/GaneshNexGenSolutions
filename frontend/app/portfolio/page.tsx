import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PortfolioPage() {
  const projects = [
    {
      title: "NexGen Cloud ERP Engine",
      category: "Business Systems",
      type: "Demo Project",
      client: "Ganesh NexGen Internal Architecture",
      challenge: "Unifying fragmented CRM, invoicing, project management, and AI copilots into a single platform.",
      solution: "Engineered ASP.NET Core 9 Web API backend following CQRS Clean Architecture and Next.js 16 frontend.",
      tech: ["ASP.NET Core 9", "Next.js 16", "PostgreSQL", "Tailwind CSS", "OpenAI API"]
    },
    {
      title: "FinTech Mobile Banking Portal",
      category: "Web Applications",
      type: "Concept Project",
      client: "Enterprise FinTech Concept",
      challenge: "High security requirements for biometric customer authentication and real-time transaction processing.",
      solution: "Designed React Native mobile app architecture with Razorpay payment gateway integration.",
      tech: ["React Native", "TypeScript", "Razorpay API", "JWT Auth", "PostgreSQL"]
    },
    {
      title: "AI Customer Support Copilot",
      category: "AI & Automation",
      type: "Concept Project",
      client: "E-Commerce Logistics Concept",
      challenge: "Manual customer support response bottleneck for high-volume order tracking inquiries.",
      solution: "Integrated Meta WhatsApp Cloud API with OpenAI fine-tuned assistant for instant order status responses.",
      tech: ["OpenAI LLM", "Meta WhatsApp Cloud API", "Resend", "Next.js 16"]
    }
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading">
          Featured Architecture & Case Studies
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400">
          Demonstrating our engineering standards across web applications, enterprise systems, and AI automation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, idx) => (
          <div key={idx} className="apple-glass p-6 space-y-4 apple-glass-hover bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                {p.category}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold">
                {p.type}
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">{p.title}</h3>
            <div className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">{p.client}</div>

            <div className="space-y-2 text-xs pt-2 border-t border-slate-200 dark:border-white/10">
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Challenge:</strong>
                <p className="text-slate-600 dark:text-zinc-400">{p.challenge}</p>
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white block mb-0.5">Solution:</strong>
                <p className="text-slate-600 dark:text-zinc-400">{p.solution}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {p.tech.map((t, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <Link href="/contact" className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs inline-flex items-center gap-2 shadow-xl shadow-blue-600/30">
          <span>Discuss Your Project Solution</span> <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
