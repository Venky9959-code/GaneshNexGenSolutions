"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartProjectModal from "@/components/StartProjectModal";
import StatsStrip from "@/components/StatsStrip";
import CallToAction from "@/components/CallToAction";
import FloatingEnquiry from "@/components/FloatingEnquiry";
import MarqueeTicker from "@/components/MarqueeTicker";
import Link from "next/link";
import { motion } from "framer-motion";

const FOUNDERS = [
  {
    name: "VENKY",
    role: "FOUNDER — STRATEGY & ARCHITECTURE",
    initials: "VK",
    coverBg: "bg-[#A1D5F5]",
    initialsColor: "text-ink/25",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    facts: [
      "OBSESSED WITH 0.5S PAGE SPEEDS & CLEAN ARCHITECTURE",
      "TURNS COMPLEX CLIENT CHAOS INTO EFFORTLESS WORKFLOWS",
      "REPLACED 50+ CLUNKY SPREADSHEETS WITH CUSTOM ERPS",
      "RUNS ON FILTER COFFEE & HIGH CONVERSION RATES",
      "BELIEVES GOOD CODE GIVES CLIENTS AN UNFAIR ADVANTAGE",
    ],
  },
  {
    name: "GANESH",
    role: "FOUNDER — TECH & AI ENGINEERING",
    initials: "GN",
    coverBg: "bg-[#2D8CF0]",
    initialsColor: "text-white/30",
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
    facts: [
      "FULL-STACK WIZARD WHO SHIPS PRODUCTION CODE AT 2 AM",
      "BUILDS WHATSAPP AI BOTS THAT CLOSE LEADS 24/7",
      "CAN DEBUG PRODUCTION WEBSOCKETS WITH HIS EYES CLOSED",
      "SHIPPED 80+ PRODUCTION DEPLOYMENTS WITH ZERO CRASHES",
      "AUTOMATING THE REPETITIVE MANUAL GRIND FOR INDIAN BUSINESSES",
    ],
  },
];

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F0F4F8] text-[#0B172A]">
      <Navbar onOpenProjectModal={() => setIsModalOpen(true)} />
      <FloatingEnquiry onOpenProjectModal={() => setIsModalOpen(true)} />

      {/* Hero Header matching aijugaad.co */}
      <section className="dot-grid px-4 pb-14 pt-32 sm:px-6 sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-sm font-bold tracking-[0.2em] text-[#2D8CF0]">
              ABOUT US
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.4rem,8vw,6.5rem)] font-black uppercase leading-[0.95] tracking-tight text-ink">
              Small team.
              <span className="block text-[#2D8CF0]">Big execution.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed sm:text-lg text-[#4A5970]">
              Ganesh NexGen Co is an agile software and AI studio. Bold websites, rock-solid enterprise software, and AI that handles the boring, repetitive work. No layers, no middlemen, no agency theatre — you speak directly to the engineers who write the code.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 font-display text-xs font-black tracking-wide bg-[#A1D5F5] text-ink shadow-[2px_2px_0_0_#0B172A]">
                <img src="/brand/logo.png" alt="GN" className="size-3.5 object-contain" />
                BASED IN INDIA
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 font-display text-xs font-black tracking-wide bg-white text-ink shadow-[2px_2px_0_0_#0B172A]">
                <img src="/brand/logo.png" alt="GN" className="size-3.5 object-contain" />
                WORKING GLOBALLY
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 font-display text-xs font-black tracking-wide bg-[#2D8CF0] text-white shadow-[2px_2px_0_0_#0B172A]">
                <img src="/brand/logo.png" alt="GN" className="size-3.5 object-contain" />
                CHAI + CODE POWERED
              </span>
            </div>


          </motion.div>
        </div>
      </section>

      {/* Marquee Ticker Banner matching aijugaad.co */}
      <MarqueeTicker />

      {/* Stats Strip */}
      <StatsStrip />

      {/* Founders Section matching aijugaad.co */}
      <section id="founders" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-display text-sm font-bold tracking-[0.2em] text-[#2D8CF0]">
            THE HUMANS BEHIND THE CODE
          </p>
          <h2 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-ink sm:text-5xl">
            Founders
          </h2>
          <p className="mt-3 max-w-md text-sm font-medium text-ink/60 sm:text-base">
            Two builders. Zero fluff. Infinite dedication.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
          {FOUNDERS.map((founder, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border-2 border-ink bg-white shadow-[7px_7px_0_0_#0B172A] transition-transform duration-200 hover:-translate-y-1">
                {/* Graphic Banner */}
                <div
                  className={`relative aspect-[4/5] w-full overflow-hidden border-b-2 border-ink ${founder.coverBg} ${founder.initialsColor} grid place-items-center`}
                >
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-8xl font-black tracking-tighter select-none">
                      {founder.initials}
                    </span>
                  </div>
                  <span className="absolute bottom-3 left-3 -rotate-2 rounded-full border-2 border-ink bg-cream px-3 py-1.5 font-display text-[0.6rem] font-bold tracking-[0.14em] text-ink shadow-[3px_3px_0_0_#0B172A]">
                    {founder.role}
                  </span>
                </div>

                {/* Founder Details */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-2xl font-black tracking-tight text-ink sm:text-[1.7rem]">
                    {founder.name}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={founder.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-2.5 py-1.5 font-display text-[0.62rem] font-black tracking-wide text-ink transition-colors hover:bg-ink hover:text-cream cursor-pointer"
                    >
                      <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" aria-hidden="true">
                        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" fill="#0A66C2" />
                        <circle cx="6.4" cy="6.6" r="1.8" fill="#fff" />
                        <rect x="4.8" y="9.6" width="3.2" height="9.2" fill="#fff" />
                        <path
                          d="M10.2 9.6h3.05v1.3a3.32 3.32 0 0 1 2.93-1.5c2.2 0 3.62 1.4 3.62 4.05v5.35h-3.2v-4.85c0-1.25-.5-2-1.62-2-1 0-1.58.66-1.58 2v4.85h-3.2Z"
                          fill="#fff"
                        />
                      </svg>
                      LINKEDIN
                      <svg
                        viewBox="0 0 24 24"
                        className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </a>
                    <a
                      href={founder.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-2.5 py-1.5 font-display text-[0.62rem] font-black tracking-wide text-ink transition-colors hover:bg-ink hover:text-cream cursor-pointer"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-3.5 shrink-0 fill-current"
                        aria-hidden="true"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GITHUB
                      <svg
                        viewBox="0 0 24 24"
                        className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </a>
                  </div>

                  <p className="mt-4 font-display text-[0.65rem] font-bold tracking-[0.2em] text-[#2D8CF0]">
                    100% VERIFIED FACTS
                  </p>
                  <ul className="mt-2 flex flex-col gap-2 border-t-2 border-ink/10 pt-3">
                    {founder.facts.map((fact, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 font-display text-xs font-bold leading-relaxed tracking-wide text-ink"
                      >
                        <img
                          src="/brand/logo.png"
                          alt="GN"
                          className="mt-0.5 size-3.5 shrink-0 object-contain"
                        />
                        {fact}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA ("Got an idea? Let's build it.") matching aijugaad.co */}
      <CallToAction onOpenProjectModal={() => setIsModalOpen(true)} />

      <Footer />
      <StartProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
