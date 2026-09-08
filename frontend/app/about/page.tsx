import Link from "next/link";
import { 
  ShieldCheck, Target, Eye, Sparkles, ArrowRight, CheckCircle2, 
  Code2, Cpu, Users, Award, Zap, Compass, Building2, Layers
} from "lucide-react";

export default function AboutPage() {
  const milestones = [
    {
      year: "Phase 01",
      title: "Foundation & Consulting",
      desc: "Founded with the clear mission to eliminate technical bottlenecks for startups and growing enterprises by providing pure, high-standard software consulting."
    },
    {
      year: "Phase 02",
      title: "Clean Architecture Standards",
      desc: "Standardized our full-stack engineering stack on ASP.NET Core 9 CQRS Clean Architecture backend and Next.js 16 App Router for maximum performance and security."
    },
    {
      year: "Phase 03",
      title: "AI & Automation Hub",
      desc: "Pioneered production integrations with Meta WhatsApp Cloud API webhooks and OpenAI/Claude fine-tuned copilots for automated customer sales and operations."
    },
    {
      year: "Phase 04",
      title: "Full-Spectrum Transformation",
      desc: "Serving businesses nationwide across India with turnkey digital solutions—from rapid MVP launches to scalable enterprise ERP platforms."
    }
  ];

  const engineeringStandards = [
    {
      title: "Zero Spaghetti Code & Debt",
      desc: "We enforce strict separation of concerns, domain-driven design, and dependency injection so your codebase can scale smoothly as transactions multiply."
    },
    {
      title: "100% Client Code Ownership",
      desc: "No proprietary lock-in. Upon project completion, full git repositories, database schemas, Docker configurations, and deployment keys are transferred to you."
    },
    {
      title: "Radical Transparency & Milestones",
      desc: "You never wonder what is happening. We provide clear milestone deliverables, staging preview links, and progress reviews at every phase."
    },
    {
      title: "Sub-Second Performance SLA",
      desc: "We engineer for Google Core Web Vitals 100/100 and sub-25ms backend response times, optimizing images, CSS, and database queries aggressively."
    }
  ];

  const coreValues = [
    {
      title: "Engineering Integrity",
      desc: "We give you honest architectural advice—we never recommend unnecessary complex tools just to pad invoice bills."
    },
    {
      title: "Excellence Without Compromise",
      desc: "From pixel-level UI Polish in Figma to ACID-compliant PostgreSQL schemas, quality is non-negotiable."
    },
    {
      title: "Client Revenue Focus",
      desc: "We measure success not by lines of code written, but by the tangible business growth, conversions, and operational hours saved for your company."
    },
    {
      title: "Continuous Modernization",
      desc: "Technology shifts rapidly. We continuously integrate advancements in AI, edge caching, and serverless compute to keep you ahead."
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-20">
      {/* Hero Narrative */}
      <div className="text-center space-y-5 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Sparkles className="w-3.5 h-3.5" /> About Ganesh NexGen Solutions
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Bridging Business Vision with Enterprise Engineering
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          Ganesh NexGen Solutions was founded to bridge the gap between creative business ambition and reliable technology execution. We engineer digital products built to scale from day one.
        </p>
      </div>

      {/* Proof Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { value: "100%", label: "On-Time Milestone Delivery" },
          { value: "< 25ms", label: "Clean API Latency Standard" },
          { value: "100/100", label: "Core Web Vitals Benchmark" },
          { value: "Zero", label: "Vendor Code Lock-In" }
        ].map((m, idx) => (
          <div key={idx} className="apple-glass p-6 text-center bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 shadow-lg">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-heading">
              {m.value}
            </div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1 font-medium">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="apple-glass p-8 space-y-4 bg-white/80 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">Our Mission</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            To deliver accessible, robust, and beautifully designed digital solutions that enable business owners, startups, and enterprises across India to compete on the global stage. We focus on business ROI first before choosing engineering tools.
          </p>
        </div>

        <div className="apple-glass p-8 space-y-4 bg-white/80 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">Our Vision</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            To become India&apos;s most trusted technology solutions partner, renowned for enterprise-grade architectural rigor, ethical transparent pricing, and unwavering dedication to our partners&apos; sustained growth.
          </p>
        </div>
      </div>

      {/* Evolution Roadmap */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Our Engineering Evolution
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            How we built Ganesh NexGen Solutions into a multi-discipline technology engine.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div key={idx} className="apple-glass p-6 space-y-3 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 relative">
              <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                {m.year}
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading pt-1">
                {m.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Standards */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            The NexGen Architectural Manifesto
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            The core engineering principles that protect your digital investment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {engineeringStandards.map((std, idx) => (
            <div key={idx} className="apple-glass p-6 space-y-2 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <h4 className="text-base font-bold text-slate-900 dark:text-white font-heading">{std.title}</h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed pl-6">{std.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="apple-glass p-8 sm:p-12 border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 space-y-8 shadow-xl">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Our Core Values
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Principles that guide every proposal, sprint, and client interaction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{val.title}</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action CTA */}
      <div className="apple-glass p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6 bg-gradient-to-br from-blue-600/10 via-white/80 to-blue-500/5 dark:from-blue-600/15 dark:via-zinc-900/80 dark:to-black border border-blue-500/20">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          Ready to Elevate Your Technology Architecture?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Schedule an initial consultation with our technical leads to explore how we can engineer your next digital breakthrough.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center gap-2 shadow-xl shadow-blue-600/30"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/portfolio"
            className="px-7 py-3.5 rounded-full apple-glass border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white font-semibold text-xs hover:bg-slate-200/50 dark:hover:bg-white/10 transition"
          >
            Explore Case Studies
          </Link>
        </div>
      </div>
    </div>
  );
}
