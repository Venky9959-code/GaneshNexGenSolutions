import Link from "next/link";
import { ShieldCheck, Target, Eye, Heart, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading">
          Bridging Business Ideas & Technology Execution
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
          Ganesh NexGen Solutions exists to eliminate technological roadblocks for startups and growing enterprises across India.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="apple-glass p-8 space-y-4 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 transition-colors duration-300">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">Our Mission</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            Deliver reliable, innovative, and accessible digital solutions that enable businesses to grow. We focus on business objectives first before selecting engineering tools.
          </p>
        </div>

        <div className="apple-glass p-8 space-y-4 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 transition-colors duration-300">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">Our Vision</h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
            Build Ganesh NexGen Solutions into a trusted technology partner serving businesses across India and eventually international markets.
          </p>
        </div>
      </div>

      <div className="apple-glass p-8 border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 space-y-6 transition-colors duration-300">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">Our Core Values</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Integrity", desc: "Honest advice and transparent pricing without hidden surprises." },
            { title: "Quality", desc: "Enterprise architecture standards using ASP.NET Core 9 and Next.js 16." },
            { title: "Innovation", desc: "Integrating AI automation and modern cloud tools." },
            { title: "Transparency", desc: "Clear milestones, deliverables, and constant progress updates." },
            { title: "Customer Success", desc: "We measure our success by your digital growth." },
            { title: "Continuous Learning", desc: "Staying ahead of modern engineering shifts." }
          ].map((val, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{val.title}</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
