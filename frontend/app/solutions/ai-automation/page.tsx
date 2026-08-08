import Link from "next/link";
import { Bot, CheckCircle2, ArrowRight } from "lucide-react";

export default function AiAutomationSolutionPage() {
  return (
    <div className="pt-32 pb-16 px-6 max-w-5xl mx-auto space-y-12">
      <div className="space-y-4 text-center">
        <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          Intelligent Enterprise Integration
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading">
          AI & Business Automation Solutions
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">
          AI Chatbots, customer support LLMs, Meta WhatsApp Cloud API webhooks, automated lead scoring, and automated PDF document generation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "AI Chatbots", desc: "24/7 intelligent customer assistance fine-tuned on your company data." },
          { title: "WhatsApp Automation", desc: "Meta Cloud API triggers for greetings, proposals, and invoices." },
          { title: "Workflow Automation", desc: "Automate manual data entry, lead assignment, and notification dispatches." }
        ].map((item, i) => (
          <div key={i} className="apple-glass p-6 space-y-3 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 transition-colors duration-300">
            <Bot className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">{item.title}</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link href="/contact" className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs inline-flex items-center gap-2 shadow-xl shadow-blue-600/30">
          <span>Deploy AI Automation</span> <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
