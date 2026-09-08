"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Database, Sparkles, CheckCircle2, ChevronRight, 
  Server, Cloud, ShieldCheck, GitBranch, Cpu, Lock, Globe, Activity
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

interface CloudBlueprint {
  title: string;
  category: string;
  desc: string;
  image: string;
  badge: string;
  features: string[];
}

function CloudCard({ 
  item, 
  onSelect 
}: { 
  item: CloudBlueprint; 
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
              <Cloud className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-white font-heading">Deploy this Cloud Stack?</h4>
              <p className="text-[10px] text-zinc-400 max-w-[220px] leading-relaxed">
                Stack: {item.features.join(", ")}
              </p>
            </div>
            <button
              onClick={() => onSelect(item.title, item.features)}
              className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] shadow-lg shadow-blue-500/30 flex items-center gap-1.5 transition transform active:scale-95 cursor-pointer"
            >
              <span>Scope This Infrastructure</span> <ChevronRight className="w-3 h-3" />
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

export default function CloudDeploymentPage() {
  const [selectedCloudName, setSelectedCloudName] = useState("");
  const [prefilledDescription, setPrefilledDescription] = useState("");

  const blueprints: CloudBlueprint[] = [
    {
      title: "Vercel Edge + Azure App Service Multi-Tier",
      category: "Modern Hybrid Cloud",
      desc: "Fast global frontend delivery via Vercel Edge CDN paired with an enterprise ASP.NET Core 9 backend hosted securely in Microsoft Azure Central India data centers.",
      image: "/images/templates/saas.png",
      badge: "Zero Latency",
      features: ["Vercel Global Edge", "Azure Web App Service", "Managed PostgreSQL"]
    },
    {
      title: "Self-Hosted Docker Swarm & VPS Stack",
      category: "Cost-Optimized Private Cloud",
      desc: "Economical high-performance setup utilizing Docker Compose on high-memory Hetzner / DigitalOcean instances with Traefik reverse proxy and automated Let's Encrypt SSL.",
      image: "/images/templates/business.png",
      badge: "Cost Efficient",
      features: ["Docker Compose Cluster", "Traefik SSL Proxy", "Automated Daily Backups"]
    },
    {
      title: "Cloudflare Enterprise CDN & WAF Shield",
      category: "DDoS Mitigation & Edge Storage",
      desc: "Complete perimeter security suite with Cloudflare DDoS mitigation, Web Application Firewall (WAF), image CDN optimization, and high-speed R2 object storage.",
      image: "/images/templates/ecommerce.png",
      badge: "Maximum Security",
      features: ["Cloudflare WAF Rules", "Zero-Egress R2 Storage", "Global DNS Anycast"]
    },
    {
      title: "GitHub Actions Automated CI/CD Pipeline",
      category: "DevOps & Continuous Deployment",
      desc: "Push-to-deploy workflow that executes automated unit tests, builds production container images, and deploys without downtime with instant 1-click rollback capabilities.",
      image: "/images/templates/portfolio.png",
      badge: "Zero-Downtime",
      features: ["Automated Smoke Tests", "Staging & Prod Environments", "Instant Rollback Hook"]
    }
  ];

  const handleSelectCloud = (title: string, features: string[]) => {
    setSelectedCloudName(title);
    const text = `I would like to discuss cloud infrastructure setup based on the "${title}" blueprint.\nKey requirements:\n- ${features.join("\n- ")}\n\nPlease provide infrastructure architecture recommendations and hosting cost estimates.`;
    setPrefilledDescription(text);

    const formElement = document.getElementById("request-quote-form");
    if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
  };

  const capabilities = [
    { icon: Globe, title: "Custom Domains & DNS Anycast", desc: "Expert configuration of DNS records, MX routing, DKIM/SPF email deliverability, and Subdomain routing." },
    { icon: Lock, title: "Automated SSL & Encryption", desc: "Zero-maintenance TLS 1.3 certificates automatically renewed every 90 days with HSTS enforcement." },
    { icon: Activity, title: "24/7 Uptime Telemetry", desc: "Real-time health ping monitors alerting on Slack & WhatsApp instantly if any server error arises." },
    { icon: GitBranch, title: "Zero-Downtime Blue/Green", desc: "Deploy new app updates seamlessly while active users continue shopping without disconnection." },
    { icon: Database, title: "Encrypted DB Snapshots", desc: "Automated daily point-in-time database snapshots stored redundantly across multiple geographical regions." },
    { icon: ShieldCheck, title: "DDoS & Bot Mitigation", desc: "Intelligent rate limiting preventing brute-force attacks and protecting server resources from scrapers." }
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Database className="w-3.5 h-3.5" /> Cloud & DevOps Solutions
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Bulletproof Cloud Infrastructure & DevOps
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          Ensure 99.9% uptime, blazing page loads, and automated push-to-deploy workflows. We architect and maintain production-grade cloud setups on Azure, Vercel, AWS, and Cloudflare.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Target Uptime SLA", value: "99.9%" },
          { label: "DNS Propagation", value: "< 60s" },
          { label: "Deployment Method", value: "Git CI/CD" },
          { label: "SSL Encryption", value: "TLS 1.3" }
        ].map((m, i) => (
          <div key={i} className="apple-glass p-5 text-center bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10">
            <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-heading">{m.value}</div>
            <div className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Blueprints Grid */}
      <div className="space-y-8">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Cloud Architecture Blueprints
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Hover over any infrastructure architecture for 3 seconds to pre-select it for your cloud consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {blueprints.map((b, i) => (
            <CloudCard key={i} item={b} onSelect={handleSelectCloud} />
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            DevOps & Security Standards
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Engineered to ensure zero data loss, fast response times, and easy scalability.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={i} className="apple-glass p-6 space-y-3 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">{c.title}</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="request-quote-form" className="pt-8 border-t border-slate-200 dark:border-white/10 space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-mono font-bold text-blue-500 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            Cloud Architecture Review
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-heading">
            Deploy Your Cloud Foundation
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Need migration from legacy hosting or a new scalable production setup? Let our DevOps architects guide you.
          </p>
        </div>

        {selectedCloudName && (
          <div className="max-w-md mx-auto p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center text-xs text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Selected Infrastructure: <strong>{selectedCloudName}</strong></span>
          </div>
        )}

        <ContactForm 
          defaultService="Cloud & Deployment" 
          defaultDescription={prefilledDescription} 
        />
      </div>
    </div>
  );
}
