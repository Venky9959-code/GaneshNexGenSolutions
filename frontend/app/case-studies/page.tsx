"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartProjectModal from "@/components/StartProjectModal";
import FloatingEnquiry from "@/components/FloatingEnquiry";
import { motion, AnimatePresence } from "framer-motion";

interface CaseStudy {
  slug: string;
  client: string;
  badge: string;
  title: string;
  summary: string;
  image: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  stats: { label: string; value: string }[];
  url?: string;
  displayUrl?: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "creative-studio-inbound-growth",
    client: "GLOBAL CREATIVE STUDIO",
    badge: "2.4X INBOUND INQUIRIES",
    title: "High-converting creative agency portfolio with fluid motion",
    summary:
      "Crafted a high-energy, typography-driven web experience using Next.js, tailored micro-animations, and frictionless lead capture that positions the studio as an elite creative powerhouse.",
    image: "/projects/peakoo.png",
    industry: "Brand Strategy & Digital Agency",
    challenge:
      "The creative studio needed an arresting portfolio platform that matched their caliber, loaded in sub-seconds, and converted high-ticket enterprise brand inquiries without agency fluff.",
    solution:
      "Engineered an ultra-crisp Next.js experience with bold neo-brutalist typography, instant interactive previews, and streamlined inquiry booking flows.",
    result:
      "Inbound client inquiries surged 2.4x in the first 10 days of launch, with average page load dropping to 0.45s and near-zero bounce rate on paid showcases.",
    stats: [
      { label: "Inbound Inquiries", value: "2.4x" },
      { label: "Page Load Speed", value: "0.45s" },
      { label: "Retainers Closed", value: "+85%" },
    ],
  },
  {
    slug: "mobility-fleet-instant-booking",
    client: "MOBILITY FLEET OPERATOR",
    badge: "70%+ WHATSAPP BOOKINGS",
    title: "Instant 1-tap WhatsApp booking portal for 24/7 fleet reservations",
    summary:
      "Engineered an instant WhatsApp-integrated booking portal featuring real-time fleet availability, one-tap rate calculator, and automated driver dispatch notifications.",
    image: "/projects/bezawada.png",
    industry: "Car Rental & Vehicle Fleet Services",
    challenge:
      "Manual phone calls for booking self-drive and chauffeur vehicles caused lost midnight leads and dispatch confusion during peak weekend rushes.",
    solution:
      "Architected a mobile-first booking interface connected directly to WhatsApp with real-time vehicle selection, pricing cards, and one-tap direct booking.",
    result:
      "Customers can reserve vehicles in under 30 seconds. Over 70% of bookings now execute automatically via WhatsApp without tying up office phone lines.",
    stats: [
      { label: "Booking Completion", value: "< 30 sec" },
      { label: "Direct WhatsApp Bookings", value: "70%+" },
      { label: "Operating Availability", value: "24/7/365" },
    ],
  },
  {
    slug: "emergency-services-dispatch",
    client: "24/7 EMERGENCY SERVICES",
    badge: "#1 LOCAL GOOGLE RANK",
    title: "Hyper-fast emergency dispatch portal dominating local search",
    summary:
      "Engineered a hyper-fast, mobile-first emergency portal with instant call buttons, WhatsApp location sharing, and hyper-targeted local geo-SEO schema.",
    image: "/projects/dialaseptic.png",
    industry: "24/7 On-Demand Emergency Sanitation",
    challenge:
      "Emergency service customers require immediate 1-tap mobile phone dispatch, but old static pages suffered poor search placement and high drop-off.",
    solution:
      "Engineered a hyper-fast, mobile-optimized emergency portal with prominent sticky call buttons, instant WhatsApp GPS location dispatch, and geo-targeted schema markup.",
    result:
      "Secured #1 ranking across local search clusters, generating over 250+ inbound emergency calls per week and keeping service vehicle fleets fully scheduled 24/7.",
    stats: [
      { label: "Emergency Calls / Week", value: "250+" },
      { label: "Local Google Rank", value: "#1 Local" },
      { label: "Mobile Call Conversion", value: "48%" },
    ],
  },
  {
    slug: "dining-mobile-ordering",
    client: "FAST-CASUAL DINING CHAIN",
    badge: "+45% DIRECT MOBILE ORDERS",
    title: "Interactive digital dining menu saving 28% in aggregator commissions",
    summary:
      "Built a vibrant visual ordering web app with interactive food item cards, real-time kitchen item availability, and frictionless direct UPI checkout.",
    image: "/projects/magicalnoodles.png",
    industry: "Modern Fast-Casual Dining & E-Commerce",
    challenge:
      "Customers found static PDF menus frustrating to browse on mobile phones, causing abandoned orders and reliance on third-party food apps with high commission fees.",
    solution:
      "Built a vibrant visual ordering web app with interactive food item cards, real-time kitchen item availability, and frictionless direct UPI checkout.",
    result:
      "Mobile direct orders jumped 45% during peak weekend dinner services, cutting aggregator commission costs by 28% and boosting repeat customer loyalty.",
    stats: [
      { label: "Direct Mobile Orders", value: "+45%" },
      { label: "Commission Saved", value: "28%" },
      { label: "Checkout Friction", value: "0.0%" },
    ],
  },
];

export default function CaseStudiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  return (
    <main className="bg-cream text-ink min-h-screen">
      {/* Light Neo-Brutalist Navbar matching aijugaad.co case studies page */}
      <Navbar onOpenProjectModal={() => setIsModalOpen(true)} />
      <FloatingEnquiry onOpenProjectModal={() => setIsModalOpen(true)} />

      {/* Case Studies Hero & Grid Section */}
      <section className="px-4 pb-12 pt-24 sm:px-6 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="mb-6 font-display text-2xl font-black uppercase tracking-tight sm:mb-8 sm:text-3xl">
              Case <span className="text-orange">Studies</span>
            </h1>
          </motion.div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {CASE_STUDIES.map((study, idx) => (
              <motion.li
                key={study.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(idx * 0.08, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  onClick={() => setSelectedStudy(study)}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border-2 border-ink bg-paper shadow-[6px_6px_0_0_#141414] transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#141414] cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink bg-cream">
                    <img
                      src={study.image}
                      alt={study.title}
                      loading={idx < 2 ? "eager" : "lazy"}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-3 top-3 rounded-full border-2 border-ink bg-yellow px-3 py-1 font-display text-xs font-black tracking-tight text-ink shadow-xs">
                      {study.badge}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="font-display text-[0.65rem] font-black tracking-[0.18em] text-orange uppercase">
                      {study.client}
                    </p>
                    <h2 className="mt-1.5 font-display text-lg font-black leading-snug tracking-tight sm:text-xl">
                      {study.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm font-medium leading-relaxed text-ink/60">
                      {study.summary}
                    </p>
                    <span className="mt-auto pt-5 font-display text-xs font-black tracking-wide text-ink transition-colors group-hover:text-orange">
                      READ THE CASE STUDY →
                    </span>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedStudy && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedStudy(null)}
          >
            <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />
            <motion.div
              initial={{ y: 28, scale: 0.96, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.97, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.22, duration: 0.45 }}
              className="relative w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedStudy(null)}
                aria-label="Close"
                className="absolute -right-2 -top-2 z-10 grid size-9 place-items-center rounded-full border-2 border-ink bg-cream font-bold text-ink shadow-[3px_3px_0_0_#141414] transition-colors hover:bg-orange hover:text-cream cursor-pointer"
              >
                ✕
              </button>

              <div className="max-h-[88vh] overflow-y-auto rounded-3xl border-2 border-ink bg-cream p-5 sm:p-8 text-ink shadow-[8px_8px_0_0_#141414]">
                {/* Breadcrumb */}
                <p className="font-display text-[0.7rem] font-bold tracking-[0.14em] text-ink/50 uppercase">
                  CASE STUDIES / <span className="text-orange">{selectedStudy.client}</span>
                </p>

                {/* Title & Badge */}
                <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tight text-ink">
                    {selectedStudy.title}
                  </h2>
                  <span className="rounded-full border-2 border-ink bg-yellow px-3.5 py-1 font-display text-xs font-black text-ink shadow-xs">
                    {selectedStudy.badge}
                  </span>
                </div>

                {/* Screenshot Container */}
                <div className="mt-5 overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-[4px_4px_0_0_#141414]">
                  <div className="flex items-center gap-1.5 border-b-2 border-ink bg-ink px-3 py-2 text-cream">
                    <span className="size-2 rounded-full bg-orange" />
                    <span className="size-2 rounded-full bg-yellow" />
                    <span className="size-2 rounded-full bg-cream/30" />
                    <span className="ml-2 font-mono text-[0.65rem] text-cream/70">
                      {selectedStudy.displayUrl || "verified-case-study"}
                    </span>
                  </div>
                  <img
                    src={selectedStudy.image}
                    alt={selectedStudy.client}
                    className="aspect-[16/9] w-full object-cover object-top"
                  />
                </div>

                {/* Metrics Highlights */}
                <div className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-4">
                  {selectedStudy.stats.map((s, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border-2 border-ink bg-paper p-3 text-center shadow-[3px_3px_0_0_#141414]"
                    >
                      <p className="font-display text-xl sm:text-3xl font-black text-orange">
                        {s.value}
                      </p>
                      <p className="mt-0.5 font-display text-[0.6rem] sm:text-xs font-bold uppercase text-ink/70">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Case Breakdown */}
                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border-2 border-ink bg-white p-4 shadow-xs">
                    <p className="font-display text-xs font-black uppercase tracking-wider text-orange">
                      THE CHALLENGE
                    </p>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-ink/80">
                      {selectedStudy.challenge}
                    </p>
                  </div>

                  <div className="rounded-2xl border-2 border-ink bg-white p-4 shadow-xs">
                    <p className="font-display text-xs font-black uppercase tracking-wider text-ink">
                      THE ARCHITECTURAL SOLUTION
                    </p>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-ink/80">
                      {selectedStudy.solution}
                    </p>
                  </div>

                  <div className="rounded-2xl border-2 border-ink bg-yellow/30 p-4 shadow-xs">
                    <p className="font-display text-xs font-black uppercase tracking-wider text-ink">
                      THE BUSINESS RESULT
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-relaxed text-ink">
                      {selectedStudy.result}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-ink">
                  {selectedStudy.url ? (
                    <a
                      href={selectedStudy.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-display text-xs font-black tracking-wide text-ink hover:text-orange transition-colors"
                    >
                      VISIT LIVE WEBSITE ↗
                    </a>
                  ) : <span />}

                  <button
                    onClick={() => {
                      setSelectedStudy(null);
                      setIsModalOpen(true);
                    }}
                    className="rounded-full border-2 border-ink bg-orange px-6 py-2.5 font-display text-xs font-black text-cream shadow-[3px_3px_0_0_#141414] hover:-translate-y-0.5 transition-transform cursor-pointer"
                  >
                    START A PROJECT LIKE THIS →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom CTA Section ("WANT NUMBERS LIKE THESE?") matching aijugaad.co */}
      <section className="border-t-2 border-ink px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="font-display text-xs font-black tracking-[0.22em] text-ink/45">
            WANT NUMBERS LIKE THESE?
          </p>
          <div className="relative mt-5 inline-block">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-3 rounded-full border-2 border-ink bg-orange px-8 py-4 font-display text-base font-black tracking-tight text-cream shadow-[7px_7px_0_0_#141414] transition-transform hover:-translate-y-1 hover:shadow-[9px_9px_0_0_#141414] sm:px-12 sm:py-5 sm:text-2xl cursor-pointer"
            >
              <img
                src="/brand/logo.png"
                alt="GN"
                className="size-6 object-contain inline-block transition-transform duration-300 group-hover:rotate-90 sm:size-7"
              />
              START A PROJECT
            </button>
            <span className="absolute -right-3 -top-3 rotate-6 rounded-full border-2 border-ink bg-yellow px-2.5 py-1 font-display text-[0.55rem] font-black tracking-wide text-ink sm:-right-5 sm:text-[0.65rem] shadow-xs">
              WE REPLY IN 24 HRS
            </span>
          </div>
          <p className="mt-4 text-sm font-medium text-ink/55">
            Four quick steps — no calls, no forms that never end.
          </p>
          <div className="mt-5">
            <Link
              href="/work"
              className="inline-block rounded-full border-2 border-ink px-6 py-3 font-display text-xs font-bold tracking-wide transition-colors hover:bg-ink hover:text-cream sm:text-sm"
            >
              SEE ALL OUR WORK
            </Link>
          </div>
        </div>
      </section>

      {/* Start Project Modal Dialog */}
      <StartProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </main>
  );
}
