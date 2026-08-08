import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto space-y-8 text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
      <div className="space-y-2 border-b border-slate-200 dark:border-white/10 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white font-heading">Privacy Policy</h1>
        <p className="text-slate-500 dark:text-zinc-400">Ganesh NexGen Solutions — Last updated: July 2026</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">1. Information We Collect</h3>
        <p>When you fill out a lead or contact form on Ganesh NexGen Solutions (&quot;Your Growth. Our Technology.&quot;), we collect personal information such as your name, business name, email address, and phone number.</p>
        
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">2. How We Use Information</h3>
        <p>We use collected details strictly to process your project requirements, communicate project updates, dispatch quotations, and provide technology consulting.</p>

        <h3 className="text-sm font-bold text-slate-900 dark:text-white">3. Data Security</h3>
        <p>Your details are stored in encrypted PostgreSQL database instances. We do not sell or share your information with third-party advertising brokers.</p>
      </div>
    </div>
  );
}
