"use client";

import { Sparkles, Calendar } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function EcommerceServicePage() {
  return (
    <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto space-y-12">
      <div className="space-y-4 text-center">
        <span className="text-xs font-mono font-bold text-blue-500 dark:text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          Service 02
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
          E-Commerce Development Solutions
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Secure, scalable online stores with product catalog management, shopping carts, order tracking, and Razorpay payment integrations.
        </p>
      </div>

      <div className="apple-glass p-8 text-center space-y-4 border border-blue-500/20 dark:border-blue-500/10 bg-white/70 dark:bg-zinc-900/60 max-w-2xl mx-auto">
        <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto animate-pulse">
          <Calendar className="w-5 h-5" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
            Service Available Soon
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
            This service is available soon. When it is available we will let you know. Please share your credentials below.
          </p>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-200 dark:border-white/10 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
            Submit Your Project Request
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Tell us about your e-commerce requirements and get in touch with our team.
          </p>
        </div>
        <ContactForm defaultService="E-Commerce Development" />
      </div>
    </div>
  );
}
