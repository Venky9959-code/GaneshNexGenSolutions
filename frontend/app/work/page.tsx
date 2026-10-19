"use client";

import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartProjectModal from "@/components/StartProjectModal";
import FloatingEnquiry from "@/components/FloatingEnquiry";
import { PROJECTS, ProjectItem } from "@/components/SelectedWork";
import { motion, AnimatePresence } from "framer-motion";

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function initVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
}

function playVideo(video: HTMLVideoElement, src: string) {
  initVideo(video);
  video.dataset.wanted = "1";
  if (!video.getAttribute("src")) {
    video.src = src;
    video.load();
  }
  const playWhenReady = () => {
    if (video.dataset.wanted === "1") {
      video.play().catch(() => {});
    }
  };
  const promise = video.play();
  if (promise !== undefined && promise !== null) {
    promise.catch(() => {
      if (video.readyState >= 2) {
        requestAnimationFrame(playWhenReady);
        document.addEventListener(
          "visibilitychange",
          () => {
            if (document.visibilityState === "visible") playWhenReady();
          },
          { once: true }
        );
        return;
      }
      video.addEventListener("loadeddata", playWhenReady, { once: true });
    });
  }
}

function pauseVideo(video: HTMLVideoElement) {
  video.dataset.wanted = "0";
  video.pause();
}

interface WorkCardItemProps {
  proj: ProjectItem;
  idx: number;
  onCookingClick: (proj: ProjectItem) => void;
}

function WorkCardItem({ proj, idx, onCookingClick }: WorkCardItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    if (videoRef.current) {
      initVideo(videoRef.current);
    }
  }, [proj.video]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !proj.video || !isTouchDevice()) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          playVideo(el, proj.video!);
        } else {
          pauseVideo(el);
        }
      },
      { threshold: [0, 0.5, 0.9] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [proj.video]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.45,
        delay: Math.min(idx * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <article
        onMouseEnter={() => {
          if (!isTouchDevice() && videoRef.current && proj.video) {
            playVideo(videoRef.current, proj.video);
          }
        }}
        onMouseLeave={() => {
          if (!isTouchDevice() && videoRef.current) {
            pauseVideo(videoRef.current);
          }
        }}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-cream/20 bg-[#242220] text-cream shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)] transition-transform duration-200 hover:-translate-y-1 hover:border-cream/40"
      >
        {/* Top Brand Banner Bar */}
        <div className="relative aspect-[64/17] overflow-hidden border-b-2 border-cream/15 bg-[#1b1a18] text-cream flex items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-lg bg-orange text-white font-display text-xs font-black shadow-xs">
              {proj.initials}
            </span>
            <span className="font-display text-[11px] font-bold tracking-wider text-cream/80 uppercase truncate max-w-[170px]">
              {proj.tag}
            </span>
          </div>
          <span className="font-mono text-[9px] text-cream/40 tracking-wider">
            {proj.isCooking ? "IN OVEN" : "VERIFIED"}
          </span>
        </div>

        {/* Brand Title & LIVE indicator */}
        <div className="flex items-center justify-between gap-2 px-4 py-2.5">
          <h3 className="truncate font-display text-base font-black tracking-tight">
            {proj.name}
          </h3>
          <span className="flex shrink-0 items-center gap-1 font-display text-[0.6rem] font-black tracking-[0.14em] text-cream/60">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-orange" />
            </span>
            {proj.isCooking ? "IN OVEN" : "LIVE"}
          </span>
        </div>

        {/* Mock Browser Preview Container */}
        <div className="mx-4 mb-4 overflow-hidden rounded-lg border-2 border-cream/20 bg-[#1b1a18]">
          <div className="flex items-center gap-1.5 border-b-2 border-cream/15 bg-[#1b1a18] px-2.5 py-1.5">
            <span className="size-1.5 rounded-full bg-orange" />
            <span className="size-1.5 rounded-full bg-yellow" />
            <span className="size-1.5 rounded-full bg-cream/25" />
            <span className="ml-1 min-w-0 truncate rounded-full bg-cream/10 px-2 font-display text-[0.55rem] font-bold tracking-wide text-cream/60">
              {proj.displayUrl ||
                (proj.url
                  ? proj.url.replace(/^https?:\/\//, "")
                  : `${proj.id}.com`)}
            </span>
          </div>
          <div className="relative aspect-[16/9] bg-[#121110] text-cream overflow-hidden">
            {proj.video ? (
              <video
                ref={videoRef}
                poster={proj.image}
                muted
                loop
                playsInline
                preload="none"
                disablePictureInPicture
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            ) : proj.image ? (
              <img
                src={proj.image}
                alt={proj.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[#1b1a18] text-cream p-4 text-center">
                <span className="text-3xl animate-bounce">🍳</span>
                <p className="font-display text-xs font-black uppercase text-yellow tracking-wider">
                  Cooking in the oven
                </p>
                <p className="text-[11px] text-cream/60 font-medium">
                  Will be live and updated soon!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Button */}
        {proj.url ? (
          <a
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center justify-center gap-1.5 border-t-2 border-cream/15 bg-[#3d3a35] py-3 text-center font-display text-xs font-black tracking-[0.2em] text-cream transition-colors hover:bg-orange"
          >
            VISIT WEBSITE
            <svg
              viewBox="0 0 24 24"
              className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        ) : (
          <button
            type="button"
            onClick={() => onCookingClick(proj)}
            className="mt-auto flex items-center justify-center gap-1.5 border-t-2 border-cream/15 bg-[#3d3a35] py-3 text-center font-display text-xs font-black tracking-[0.2em] text-cream transition-colors hover:bg-orange w-full cursor-pointer"
          >
            COOKING IN OVEN 🍳
          </button>
        )}
      </article>
    </motion.div>
  );
}

const CATEGORIES = [
  "ALL",
  "BRANDING & WEBSITES",
  "SERVICES & BOOKING",
  "CAR RENTAL & TRAVEL",
  "IN THE OVEN 🍳",
];

export default function WorkPage() {
  const [filter, setFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookingModal, setCookingModal] = useState<ProjectItem | null>(null);

  // Filter projects (excluding the add-your-project placeholder, which is rendered at the end of the grid)
  const workProjects = PROJECTS.filter((p) => !p.isAddYours);

  const filtered = workProjects.filter((p) => {
    if (filter === "ALL") return true;
    if (filter === "IN THE OVEN 🍳") return p.isCooking;
    if (filter === "SERVICES & BOOKING")
      return p.tag.includes("SERVICES") || p.tag.includes("SEO") || p.tag.includes("INFRA");
    if (filter === "CAR RENTAL & TRAVEL")
      return p.tag.includes("CAR") || p.tag.includes("TRAVEL") || p.tag.includes("RENTAL");
    if (filter === "BRANDING & WEBSITES")
      return (
        p.tag.includes("BRANDING") ||
        p.tag.includes("FOOD") ||
        p.tag.includes("EDTECH") ||
        p.tag.includes("AGENCY")
      );
    return true;
  });

  return (
    <main className="bg-ink text-cream min-h-screen">
      {/* Dark Neo-Brutalist Navbar matching aijugaad.co work page */}
      <Navbar dark={true} onOpenProjectModal={() => setIsModalOpen(true)} />
      <FloatingEnquiry onOpenProjectModal={() => setIsModalOpen(true)} />

      {/* Hero Section */}
      <section className="dot-grid-dark border-b-2 border-cream/15 pt-24 pb-7 sm:pt-32 sm:pb-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-xs font-bold tracking-[0.2em] text-orange sm:text-sm">
              OUR WORK
            </p>
            <h1 className="mt-2 font-display text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">
              Proof, not promises.
            </h1>
            <p className="mt-3 text-sm font-medium text-cream/60 sm:text-base">
              Every project is engineered for speed, conversion and scale — move fast and reserve your slot.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid Section with Filter Tabs */}
      <section className="dot-grid-dark border-b-2 border-cream/15">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            {/* Filter Buttons matching aijugaad.co style */}
            {workProjects.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-1.5 sm:mb-8 sm:gap-2">
                {CATEGORIES.map((cat) => {
                  const isActive = filter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`rounded-full border-2 px-3 py-1.5 font-display text-[0.6rem] font-black tracking-[0.08em] transition-colors sm:px-4 sm:text-xs sm:tracking-[0.1em] cursor-pointer ${isActive
                          ? "border-cream bg-cream text-ink"
                          : "border-cream/40 bg-transparent text-cream hover:border-cream/70 hover:bg-cream/10"
                        }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Grid of Work Cards */}
            <div className={workProjects.length > 0 ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" : "mx-auto max-w-lg"}>
              <AnimatePresence mode="popLayout">
                {filtered.map((proj, idx) => (
                  <WorkCardItem
                    key={proj.id}
                    proj={proj}
                    idx={idx}
                    onCookingClick={(p) => setCookingModal(p)}
                  />
                ))}
              </AnimatePresence>

              {/* YOUR BRAND HERE Card at the end of the grid */}
              <motion.div
                layout
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="dot-grid-dark group flex h-full min-h-64 w-full flex-col items-center justify-center gap-2.5 rounded-2xl border-2 border-dashed border-cream/30 bg-transparent px-4 py-10 text-center text-cream transition-all hover:-translate-y-1 hover:border-solid hover:border-cream cursor-pointer"
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-cream/10 text-orange transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    <img
                      src="/brand/logo.png"
                      alt="Ganesh NexGen Co"
                      className="size-8 object-contain"
                    />
                  </span>
                  <p className="font-display text-2xl font-black uppercase tracking-tight">
                    Your brand here
                  </p>
                  <p className="text-sm font-medium text-cream/55">
                    This spot isn't taken yet. Move fast.
                  </p>
                  <span className="mt-2 rounded-full border-2 border-ink bg-orange px-5 py-2 font-display text-xs font-black tracking-wide text-cream transition-transform group-hover:-translate-y-0.5 shadow-md">
                    START A PROJECT
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section ("SAW SOMETHING YOU LIKED?") matching aijugaad.co */}
      <section className="dot-grid-dark py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl border-2 border-cream/20 bg-cream px-6 py-10 text-ink sm:px-10 sm:py-14">
            <div className="text-center">
              <p className="font-display text-xs font-black tracking-[0.22em] text-ink/45">
                SAW SOMETHING YOU LIKED?
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
                  GET YOUR WEBSITE TODAY
                </button>
                <span className="absolute -right-3 -top-3 rotate-6 rounded-full border-2 border-ink bg-yellow px-2.5 py-1 font-display text-[0.55rem] font-black tracking-wide text-ink sm:-right-5 sm:text-[0.65rem] shadow-xs">
                  WE REPLY IN 24 HRS
                </span>
              </div>
              <p className="mt-4 text-sm font-medium text-ink/55">
                Four quick steps — no calls, no forms that never end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cooking Modal for In-progress Projects */}
      {cookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="relative w-full max-w-md rounded-3xl border-2 border-ink bg-cream p-6 text-ink shadow-[8px_8px_0_0_#0B172A]">
            <button
              onClick={() => setCookingModal(null)}
              className="absolute top-4 right-4 grid size-8 place-items-center rounded-full border-2 border-ink bg-white font-bold text-ink hover:bg-yellow cursor-pointer"
            >
              ✕
            </button>
            <div className="text-center pt-2">
              <span className="text-5xl">🍳</span>
              <h3 className="mt-3 font-display text-2xl font-black uppercase text-ink">
                {cookingModal.name}
              </h3>
              <p className="mt-1 font-display text-xs font-bold text-orange tracking-wider">
                {cookingModal.tag}
              </p>
              <p className="mt-4 text-sm font-semibold text-slateDark leading-relaxed">
                {cookingModal.description}
              </p>
              <button
                onClick={() => {
                  setCookingModal(null);
                  setIsModalOpen(true);
                }}
                className="mt-6 w-full rounded-full border-2 border-ink bg-orange py-3 font-display text-sm font-black text-cream shadow-[4px_4px_0_0_#0B172A] hover:-translate-y-0.5 transition-transform cursor-pointer"
              >
                START YOUR PROJECT INSTEAD →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Start Project Modal Dialog */}
      <StartProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </main>
  );
}
