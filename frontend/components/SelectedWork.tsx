"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface ProjectItem {
  id: string;
  name: string;
  tag: string;
  description: string;
  initials: string;
  coverBg: string;
  initialsColor: string;
  metrics: string;
  url?: string;
  displayUrl?: string;
  image?: string;
  video?: string;
  isCooking?: boolean;
  isAddYours?: boolean;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "peakoo-agency",
    name: "PEAKOO AGENCY",
    tag: "BRANDING & AGENCY",
    description: "Building Brands that Grow. High-converting creative agency portfolio with bold typography & fluid motion.",
    initials: "PA",
    coverBg: "bg-ink text-yellow",
    initialsColor: "text-yellow",
    metrics: "Live Website ↗",
    url: "https://peakoo.agency/",
    displayUrl: "peakoo.agency",
    image: "/projects/peakoo.png",
    video: "/work_videos/peakooagency.mp4",
  },
  {
    id: "magical-noodles",
    name: "MAGICAL NOODLES",
    tag: "FOOD & HOSPITALITY",
    description: "Modern fast-casual dining experience with an appetizing visual menu, fast mobile ordering, and snappy checkout.",
    initials: "MN",
    coverBg: "bg-paper text-ink",
    initialsColor: "text-ink",
    metrics: "Live Web App ↗",
    url: "https://magicalnoodles.vercel.app/",
    displayUrl: "magicalnoodles.vercel.app",
    image: "/projects/magicalnoodles.png",
    video: "/work_videos/magicalnoodles.mp4",
  },
  {
    id: "bezawada-car-rentals",
    name: "BEZAWADA CAR RENTALS",
    tag: "CAR RENTAL & TRAVEL",
    description: "Best Self Drive & Car with Driver in Vijayawada. Direct 1-tap WhatsApp booking bot and instant fleet reservations.",
    initials: "BC",
    coverBg: "bg-ink text-yellow",
    initialsColor: "text-yellow",
    metrics: "Live Booking Portal ↗",
    url: "https://www.bezawadacarrental.com/",
    displayUrl: "bezawadacarrental.com",
    image: "/projects/bezawada.png",
    video: "/work_videos/bezawadacarrental.mp4",
  },
  {
    id: "dial-a-septic",
    name: "DIAL-A-SEPTIC TANK CLEANERS",
    tag: "24/7 SERVICES & SEO",
    description: "Best Septic Tank Cleaning in Hyderabad. 24/7 emergency hotline, instant quote dispatch, and #1 local search ranking.",
    initials: "DS",
    coverBg: "bg-orange text-cream",
    initialsColor: "text-cream",
    metrics: "Live 24/7 Service ↗",
    url: "https://www.dialaseptictankcleaners.com/home",
    displayUrl: "dialaseptictankcleaners.com/home",
    image: "/projects/dialaseptic.png",
    video: "/work_videos/dialaseptictankcleaners.mp4",
  },
  {
    id: "hew-groups",
    name: "HEW GROUPS",
    tag: "ENTERPRISE INFRA",
    description: "Website is Cooking — Will be ready and updated soon! Enterprise-grade digital presence and client management.",
    initials: "HG",
    coverBg: "bg-ink text-cream",
    initialsColor: "text-cream",
    metrics: "Cooking in Oven 🍳",
    isCooking: true,
  },
  {
    id: "skillsboosthub",
    name: "SKILLSBOOSTHUB",
    tag: "EDTECH PLATFORM",
    description: "Website is Cooking — Will be Ready Soon! High-impact student upskilling hub with live project mentorship.",
    initials: "SB",
    coverBg: "bg-orange text-cream",
    initialsColor: "text-cream",
    metrics: "Cooking in Oven 🍳",
    isCooking: true,
  },
  {
    id: "add-your-project",
    name: "ADD YOUR PROJECT NEXT",
    tag: "YOUR BRAND HERE",
    description: "Have an ambitious software, web, or AI project? Let’s engineer it and launch within days.",
    initials: "✦",
    coverBg: "bg-yellow text-ink",
    initialsColor: "text-ink",
    metrics: "Reserve Your Slot 🚀",
    isAddYours: true,
  },
];

interface SelectedWorkProps {
  onOpenProjectModal?: () => void;
}

export default function SelectedWork({ onOpenProjectModal }: SelectedWorkProps) {
  const [cookingModal, setCookingModal] = useState<ProjectItem | null>(null);

  const handleCardClick = (proj: ProjectItem, e: React.MouseEvent) => {
    if (proj.isAddYours) {
      e.preventDefault();
      onOpenProjectModal?.();
      return;
    }
    if (proj.isCooking) {
      e.preventDefault();
      setCookingModal(proj);
      return;
    }
  };

  return (
    <section id="work" className="scroll-mt-20 border-y-2 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
        {/* Section Header (Exact aijugaad.co structure) */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">
              SELECTED WORK
            </p>
            <h2 className="mt-3 font-display text-4xl font-black uppercase tracking-tight text-ink sm:text-6xl">
              Built by us. Loved by clients.
            </h2>
          </div>
          <p className="max-w-xs text-sm font-medium text-ink/60">
            A few of the brands we design, build and automate for.
          </p>
        </div>

        {/* Project Showcase Grid (Exact aijugaad.co 2-col responsive layout) */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:gap-6">
          {PROJECTS.map((proj) => {
            const cardContent = (
              <>
                {/* Media area: aspect-[16/9] with large initials background & image cover */}
                <div
                  className={`relative flex aspect-[16/9] items-center justify-center overflow-hidden ${
                    proj.coverBg || "bg-ink text-cream"
                  }`}
                >
                  {/* Huge bold initials */}
                  <span className="font-display text-[3.25rem] font-black tracking-tighter opacity-90 select-none sm:text-[6rem] lg:text-[7.5rem]">
                    {proj.initials}
                  </span>

                  {/* Screenshot Image */}
                  {proj.image && (
                    <img
                      src={proj.image}
                      alt={`${proj.name} website`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {/* Cooking State Overlay Banner */}
                  {proj.isCooking && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/75 p-3 text-center text-cream backdrop-blur-[2px]">
                      <span className="text-2xl sm:text-4xl animate-bounce mb-1">🍳</span>
                      <p className="font-display text-xs sm:text-base font-black tracking-tight text-yellow uppercase">
                        Cooking in Oven
                      </p>
                      <p className="hidden sm:block text-[0.65rem] text-cream/70 mt-0.5">
                        Will be ready &amp; live soon
                      </p>
                    </div>
                  )}

                  {/* Add Your Project Overlay Banner */}
                  {proj.isAddYours && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-ink via-royal to-orange p-3 text-center text-cream">
                      <span className="text-2xl sm:text-4xl mb-1">🚀</span>
                      <p className="font-display text-xs sm:text-base font-black tracking-tight text-yellow uppercase">
                        Your Brand Here
                      </p>
                      <p className="hidden sm:block text-[0.65rem] text-cream/80 mt-0.5">
                        Tap to reserve your spot
                      </p>
                    </div>
                  )}

                  {/* Top-Right Category Tag Pill */}
                  <span className="absolute right-2 top-2 rounded-full border-2 border-ink bg-cream px-2 py-0.5 font-display text-[0.5rem] font-bold tracking-[0.1em] text-ink sm:right-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[0.65rem] sm:tracking-[0.14em]">
                    {proj.tag}
                  </span>
                </div>

                {/* Card Bottom Bar */}
                <div className="flex items-center justify-between gap-2 border-t-2 border-ink bg-cream px-3 py-3 sm:px-6 sm:py-5">
                  <h3 className="truncate font-display text-sm font-black tracking-tight text-ink sm:text-xl lg:text-2xl">
                    {proj.name}
                  </h3>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border-2 border-ink bg-paper transition-colors group-hover:bg-orange group-hover:text-cream sm:size-10">
                    <svg
                      viewBox="0 0 24 24"
                      className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:size-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                </div>
              </>
            );

            if (proj.url) {
              return (
                <a
                  key={proj.id}
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-xl border-2 border-ink shadow-[4px_4px_0_0_#141414] transition-all hover:-translate-y-1 sm:rounded-3xl sm:shadow-[7px_7px_0_0_#141414]"
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <div
                key={proj.id}
                onClick={(e) => handleCardClick(proj, e)}
                className="group block cursor-pointer overflow-hidden rounded-xl border-2 border-ink shadow-[4px_4px_0_0_#141414] transition-all hover:-translate-y-1 sm:rounded-3xl sm:shadow-[7px_7px_0_0_#141414]"
              >
                {cardContent}
              </div>
            );
          })}
        </div>

        {/* Bottom Button (Exact aijugaad.co pill button) */}
        <div className="mt-10 text-center">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-6 py-3 font-display text-xs font-black tracking-[0.14em] text-ink shadow-[4px_4px_0_0_#141414] transition-transform hover:-translate-y-0.5 sm:px-8 sm:text-sm"
          >
            SEE ALL OUR WORK
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Cooking Project Modal Lightbox */}
      <AnimatePresence>
        {cookingModal && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setCookingModal(null)}
          >
            <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" />
            <motion.div
              initial={{ y: 26, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", bounce: 0.24, duration: 0.45 }}
              className="relative w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setCookingModal(null)}
                aria-label="Close"
                className="absolute -right-2 -top-2 z-10 grid size-9 place-items-center rounded-full border-2 border-ink bg-cream shadow-[3px_3px_0_0_#141414] transition-colors hover:bg-orange hover:text-cream cursor-pointer"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <div
                role="dialog"
                aria-modal="true"
                aria-label={cookingModal.name}
                className="max-h-[86vh] overflow-y-auto overscroll-contain rounded-2xl border-2 border-ink bg-paper shadow-[7px_7px_0_0_#141414]"
              >
                {/* Header Banner */}
                <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden border-b-2 border-ink bg-ink text-yellow">
                  <span className="font-display text-5xl font-black">{cookingModal.initials}</span>
                  <span className="absolute right-3 top-3 rounded-full border-2 border-ink bg-cream px-2.5 py-0.5 font-display text-[0.55rem] font-bold tracking-[0.12em] text-ink">
                    {cookingModal.tag}
                  </span>
                </div>

                <div className="p-5">
                  <div className="rounded-xl border-2 border-ink bg-yellow/30 p-4">
                    <div className="flex items-center gap-2 mb-2 font-display text-xs font-black text-ink uppercase">
                      <span>🍳</span> IN THE OVEN
                    </div>
                    <p className="text-sm font-semibold text-ink">
                      {cookingModal.description}
                    </p>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={() => setCookingModal(null)}
                      className="rounded-full border-2 border-ink bg-cream px-5 py-2 font-display text-xs font-black text-ink shadow-[2px_2px_0_0_#141414] hover:bg-orange hover:text-cream transition-colors"
                    >
                      GOT IT ✦
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
