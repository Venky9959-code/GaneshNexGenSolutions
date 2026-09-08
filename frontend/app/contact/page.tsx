"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, Mail, Phone, MapPin, Sparkles, MessageSquare, 
  Clock, CheckCircle2, Copy, Check, ArrowRight, ChevronDown, Calendar, Users
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [selectedPill, setSelectedPill] = useState("Website Development");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const projectTypes = [
    "Website Development",
    "E-Commerce Store",
    "Custom Software / API",
    "AI & Automation",
    "Startup MVP",
    "UI/UX Design",
    "Cloud & DevOps",
    "System Maintenance"
  ];

  const contactFaqs = [
    {
      q: "Do you sign a Non-Disclosure Agreement (NDA)?",
      a: "Yes. Before discussing any sensitive business logic, proprietary data, or startup ideas, we are happy to sign a mutual NDA to guarantee 100% confidentiality."
    },
    {
      q: "How soon will I receive a proposal or scope estimate?",
      a: "After our initial technical discovery call, we prepare a detailed milestone roadmap, architecture plan, and cost breakdown within 24 to 48 business hours."
    },
    {
      q: "Can we schedule an in-person meeting in Hyderabad?",
      a: "Yes! Our engineering team is based in Hyderabad. We welcome in-person architecture strategy sessions by scheduled appointment."
    },
    {
      q: "What if I only have a rough concept and no technical documentation?",
      a: "That is completely fine. Our technical consultants will guide you through feature prioritization, user stories, and architecture requirements during our free initial discovery."
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <Sparkles className="w-3.5 h-3.5" /> Start Your Transformation
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-heading tracking-tight">
          Let&apos;s Build Your Next Digital Milestone
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed">
          Connect directly with our lead architects. Whether you need a high-converting web platform, custom ASP.NET Core 9 software, or AI automation, we are here to guide your strategy.
        </p>

        {/* Live SLA Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
          <Clock className="w-3.5 h-3.5" />
          <span>Guaranteed Technical Response within 2 Business Hours</span>
        </div>
      </div>

      {/* Quick Select Category Pills */}
      <div className="space-y-3 max-w-4xl mx-auto text-center">
        <div className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
          Select Your Project Focus
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {projectTypes.map((type, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPill(type)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                selectedPill === type 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-105" 
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Multi-Channel Connect */}
        <div className="lg:col-span-5 space-y-6">
          <div className="apple-glass p-8 space-y-6 bg-white/80 dark:bg-zinc-900/60 border border-slate-200 dark:border-white/10 shadow-xl">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Direct Engineering Channels
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading mt-0.5">
                Fast-Track Communication
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                Skip the ticket queue. Reach our technical leads across your preferred channel.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* WhatsApp Quick Connect */}
              <a 
                href="https://wa.me/919390564946?text=Hi%20Ganesh%20NexGen%20Solutions,%20I%20would%20like%20to%20discuss%20a%20project." 
                target="_blank" 
                rel="noreferrer"
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 flex items-center justify-between group transition block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                      Instant WhatsApp Chat
                    </div>
                    <div className="text-slate-500 dark:text-zinc-400">+91 9390564946</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Email Direct */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Email Consultation</div>
                    <div className="text-slate-500 dark:text-zinc-400 font-mono text-[11px]">contact@ganeshnexgen.com</div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy("contact@ganeshnexgen.com", 'email')}
                  className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-zinc-400 transition"
                  title="Copy email"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Line */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">Direct Phone Line</div>
                    <div className="text-slate-500 dark:text-zinc-400 font-mono text-[11px]">+91 9390564946</div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy("+919390564946", 'phone')}
                  className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-500 dark:text-zinc-400 transition"
                  title="Copy phone"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Physical Tech Hub */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Engineering Hub</div>
                  <div className="text-slate-500 dark:text-zinc-400 leading-tight">Hyderabad, Telangana, India (Serving Global Clients)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & NDA Guarantee Banner */}
          <div className="p-6 apple-glass border border-emerald-500/20 dark:border-emerald-500/10 bg-white/70 dark:bg-zinc-900/60 text-xs space-y-2.5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>Enterprise Confidentiality & NDA Standard</span>
            </div>
            <p className="text-slate-500 dark:text-zinc-400 leading-relaxed pl-7">
              All discussions, architecture concepts, and project details are kept strictly confidential. Your data is stored securely in our private PostgreSQL CRM with zero third-party leakage.
            </p>
          </div>

          {/* 3 Steps After Inquiring */}
          <div className="p-6 apple-glass border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 text-xs space-y-3">
            <div className="font-bold text-slate-900 dark:text-white font-heading">
              What Happens Next?
            </div>
            <div className="space-y-2.5">
              {[
                { step: "1", title: "Discovery Call", desc: "We review your requirements and align on scope." },
                { step: "2", title: "Architecture & Proposal", desc: "Detailed timeline, milestone roadmap, and transparent quote." },
                { step: "3", title: "Sprint Kickoff", desc: "Direct Slack/WhatsApp group with your dedicated engineering team." }
              ].map((s, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {s.step}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{s.title}:</span>{" "}
                    <span className="text-slate-500 dark:text-zinc-400">{s.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7 space-y-6">
          <ContactForm defaultService={selectedPill} />
        </div>
      </div>

      {/* Contact FAQ Accordion */}
      <div className="space-y-6 max-w-4xl mx-auto pt-8 border-t border-slate-200 dark:border-white/10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-heading">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Clear answers before starting your collaboration with Ganesh NexGen Solutions.
          </p>
        </div>

        <div className="space-y-3">
          {contactFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className="apple-glass border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 shrink-0 ml-4 ${isOpen ? "rotate-180 text-blue-600" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
