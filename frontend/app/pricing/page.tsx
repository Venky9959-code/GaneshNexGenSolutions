import Link from "next/link";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";

export default function PricingPage() {
  const packages = [
    {
      name: "STARTER WEBSITE",
      price: "Starting from ₹10,000",
      for: "Small businesses & professionals",
      features: [
        "Up to 5 pages",
        "Responsive mobile & desktop design",
        "Zod validated contact form",
        "Basic SEO setup & metadata",
        "SSL & deployment assistance"
      ]
    },
    {
      name: "BUSINESS WEBSITE",
      price: "Starting from ₹20,000",
      for: "Growing SMEs & corporate businesses",
      isPopular: true,
      features: [
        "Custom Apple-style UI/UX",
        "Up to 12 pages & service catalog",
        "Lead generation forms & email alerts",
        "Google Analytics 4 & Search Console",
        "SEO foundation & sitemap generation",
        "Performance optimization (Next.js 16)"
      ]
    },
    {
      name: "E-COMMERCE STORE",
      price: "Starting from ₹30,000",
      for: "Retailers & online product businesses",
      features: [
        "Product catalog & inventory management",
        "Shopping cart & checkout workflow",
        "Razorpay payment gateway integration",
        "Order management & receipt dispatches",
        "Automated Meta WhatsApp notification ready"
      ]
    },
    {
      name: "CUSTOM SOFTWARE / AI",
      price: "Custom Quote",
      for: "Enterprise applications & AI solutions",
      features: [
        "ASP.NET Core 9 Web API architecture",
        "Normalized PostgreSQL schema",
        "OpenAI LLM copilot integration",
        "Custom workflow automation & CRM",
        "Dedicated cloud infrastructure & CI/CD"
      ]
    }
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading">
          Transparent Project Pricing
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400">
          Final pricing depends on features, integrations, complexity, and project scope.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg, idx) => (
          <div 
            key={idx} 
            className={`apple-glass p-6 flex flex-col justify-between space-y-6 relative bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 transition-all duration-300 ${
              pkg.isPopular ? "border-blue-500 dark:border-blue-500 shadow-xl bg-blue-50/50 dark:bg-blue-600/10" : ""
            }`}
          >
            {pkg.isPopular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full bg-blue-600 text-white shadow-md">
                Most Popular
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider font-heading">{pkg.name}</h3>
                <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400 mt-2">{pkg.price}</div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">{pkg.for}</div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2 text-xs">
                {pkg.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link 
              href="/contact" 
              className={`w-full py-3 rounded-full text-xs font-semibold text-center transition flex items-center justify-center gap-2 ${
                pkg.isPopular 
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30" 
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white"
              }`}
            >
              <span>Request Quote</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>

      <div className="apple-glass p-6 text-center text-xs text-slate-600 dark:text-zinc-400 max-w-3xl mx-auto border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 transition-colors duration-300">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
        Pricing depends on features, integrations, complexity, and project scope. Every project includes clear milestone deliverables and no hidden costs.
      </div>
    </div>
  );
}
