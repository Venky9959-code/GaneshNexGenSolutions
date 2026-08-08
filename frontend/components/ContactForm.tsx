"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { LeadFormValues } from "@/lib/validation";

interface ContactFormProps {
  defaultService?: string;
  defaultDescription?: string;
  className?: string;
}

export default function ContactForm({ defaultService = "Website Development", defaultDescription = "", className = "" }: ContactFormProps) {
  const [formData, setFormData] = useState<Partial<LeadFormValues>>({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    whatsapp: "",
    service: defaultService,
    budget: "₹20,000 - ₹50,000",
    timeline: "2-4 Weeks",
    description: defaultDescription,
    privacyAgreed: true,
  });

  const [loading, setLoading] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<{ leadNumber: string; name: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.name || !formData.email || !formData.phone || !formData.description) {
      setErrorMsg("Please fill out all required fields marked with *.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedLead({ leadNumber: data.leadNumber, name: formData.name || "" });
      } else {
        setErrorMsg(data.error || "Failed to submit request. Please try again.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      {submittedLead ? (
        <div className="apple-glass p-8 sm:p-10 text-center border border-emerald-500/30 dark:border-emerald-500/20 space-y-6 bg-white/70 dark:bg-zinc-900/60 transition-colors duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 dark:border-emerald-400/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto animate-bounce">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-heading">
              Request Submitted Successfully!
            </h3>
            <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-md mx-auto">
              Thank you, <strong>{submittedLead.name}</strong>. Our architects will contact you within 4 business hours.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 max-w-xs mx-auto text-xs">
            <div className="text-slate-500 dark:text-zinc-400 mb-0.5 font-medium">Your Lead Reference ID:</div>
            <div className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">{submittedLead.leadNumber}</div>
          </div>

          <button
            onClick={() => setSubmittedLead(null)}
            className="px-6 py-2.5 rounded-full bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/15 text-slate-800 dark:text-white text-xs font-semibold transition"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="apple-glass p-6 sm:p-8 border border-slate-200 dark:border-white/15 bg-white/80 dark:bg-zinc-900/60 space-y-5 transition-colors duration-300">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading border-b border-slate-200 dark:border-white/10 pb-4">
            Request a Service Quote
          </h3>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">Full Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/50 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">Business / Company Name</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="e.g. Sharma Tech Solutions"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/50 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="rahul@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/50 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">Phone Number *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 9390564946"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/50 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">Service Required *</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="Website Development">Website Development</option>
                <option value="E-Commerce Development">E-Commerce Development</option>
                <option value="Custom Software Development">Custom Software Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="AI & Automation">AI & Automation</option>
                <option value="Startup Solutions">Startup Solutions</option>
                <option value="Cloud & Deployment">Cloud & Deployment</option>
                <option value="Website Maintenance">Website Maintenance</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">Budget Range</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              >
                <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000 (Starter)</option>
                <option value="₹20,000 - ₹50,000">₹20,000 - ₹50,000 (Business)</option>
                <option value="₹50,000 - ₹1,50,000">₹50,000 - ₹1,50,000 (E-Commerce / Systems)</option>
                <option value="₹1,50,000+">₹1,50,000+ (Custom Software / AI)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">Project Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell us about your business goals, required features, or target audience..."
              className="w-full h-32 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/50 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="privacy"
              checked={formData.privacyAgreed}
              onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
              className="rounded border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-white/5 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="privacy" className="text-[11px] text-slate-500 dark:text-zinc-400">
              I agree to the <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30"
          >
            {loading ? "Registering Lead..." : "Request Free Consultation"} <Send className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 pt-2 text-[10px] text-slate-500 dark:text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Stored securely in PostgreSQL CRM under NDA standards</span>
          </div>
        </form>
      )}
    </div>
  );
}
