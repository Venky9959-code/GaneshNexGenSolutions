"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: "How much does a website cost?", a: "Packages start from ₹10,000 for Starter websites, ₹20,000 for Business websites, and ₹30,000 for E-Commerce online stores. Custom software and complex AI solutions receive tailored scopes." },
    { q: "How long does development take?", a: "Starter websites typically take 7-10 business days. Custom business applications and full E-Commerce portals take 3-6 weeks depending on requirement scope." },
    { q: "Do you provide domain and hosting?", a: "Yes! We assist with domain registration, SSL certificates, cloud setup (Vercel/Azure), and ongoing server management." },
    { q: "Can you redesign an existing website?", a: "Absolutely. We modernize legacy websites into fast Next.js 16 web applications with improved UI/UX and mobile optimization." },
    { q: "Do you develop e-commerce websites?", a: "Yes, we build custom online stores with shopping carts, product management, and Razorpay payment gateway integrations." },
    { q: "Can you build custom software?", a: "Yes, we engineer ASP.NET Core 9 Web APIs and custom SaaS platforms tailored strictly around your internal workflow requirements." },
    { q: "Do you provide maintenance?", a: "Yes, we offer ongoing maintenance plans covering security patches, backups, uptime monitoring, and quarterly feature updates." },
    { q: "Do you work with startups?", a: "Yes! We specialize in startup digital transformation—from MVP scope validation to full product launch and scale." },
    { q: "Can you integrate payment gateways?", a: "Yes, we integrate Razorpay, Stripe, and custom payment processors with instant automated invoice receipt generation." },
    { q: "Do you provide source code?", a: "Yes, upon full project completion, complete source code ownership and repository access are transferred to your business." },
    { q: "Do you provide SEO?", a: "Every project includes technical SEO foundation, clean metadata, XML sitemaps, fast page load speeds, and Google Search Console readiness." },
    { q: "How do project payments work?", a: "We work on a milestone model (e.g., 40% initial deposit, 40% demo review milestone, 20% final launch deployment)." }
  ];

  return (
    <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400">
          Everything you need to know about working with Ganesh NexGen Solutions.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className="apple-glass overflow-hidden border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 transition-colors duration-300">
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full p-5 text-left flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>{f.q}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-zinc-500"}`} />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <Link href="/contact" className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs inline-flex items-center gap-2 shadow-xl shadow-blue-600/30">
          <span>Still Have Questions? Contact Us</span> <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
