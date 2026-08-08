"use client";

import Link from "next/link";
import { ShieldCheck, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-16 px-6 max-w-6xl mx-auto space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Sparkles className="w-3.5 h-3.5" /> Start Your Project
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading">
          Get Free Consultation
        </h1>
        <p className="text-sm text-slate-600 dark:text-zinc-400">
          Tell us what you&apos;re planning and our technical architects will help you determine the right scope, timeline, and technology.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="apple-glass p-8 space-y-6 bg-white/70 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 transition-colors duration-300">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">Direct Contact</h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
              We respond to all technical inquiries within 4 business hours.
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Location</div>
                  <div className="text-slate-500 dark:text-zinc-400">India</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Email Us</div>
                  <div className="text-slate-500 dark:text-zinc-400">contact@ganeshnexgen.com</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">WhatsApp Line</div>
                  <div className="text-slate-500 dark:text-zinc-400">+91 9390564946</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 apple-glass border border-emerald-500/20 dark:border-emerald-500/10 bg-white/70 dark:bg-zinc-900/60 text-xs space-y-2 transition-colors duration-300">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div className="font-bold text-slate-900 dark:text-white">Privacy Guarantee</div>
            <p className="text-slate-500 dark:text-zinc-400 leading-relaxed">
              Your details are kept strictly confidential under NDA standards and stored in our secure PostgreSQL CRM.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
