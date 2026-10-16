"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewItem {
  id: string;
  name: string;
  project: string;
  tag: string;
  site: string;
  url?: string;
  initials: string;
  cover: string;
  quote: string;
  date: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: "rev-peakoo",
    name: "PEAKOO AGENCY",
    project: "BRANDING & AGENCY",
    tag: "WHATSAPP",
    site: "peakoo.agency",
    url: "https://peakoo.agency/",
    initials: "PA",
    cover: "bg-ink text-yellow",
    quote:
      "Bro the new branding and portfolio website is pure magic! Our inbound agency inquiries doubled within the first 10 days of launch. The motion and typography make us look like a global tier-1 studio.",
    date: "Yesterday at 7:14 PM",
  },
  {
    id: "rev-magical-noodles",
    name: "MAGICAL NOODLES",
    project: "FOOD & HOSPITALITY",
    tag: "WHATSAPP",
    site: "magicalnoodles.vercel.app",
    url: "https://magicalnoodles.vercel.app/",
    initials: "MN",
    cover: "bg-orange text-cream",
    quote:
      "Everyone is loving the new food menu interface! Weekend mobile orders jumped by 45% and the site loads instantly even on weak 4G. Super happy with Venky and Ganesh's work!",
    date: "14 Oct, 9:20 PM",
  },
  {
    id: "rev-bezawada",
    name: "BEZAWADA CAR RENTALS",
    project: "CAR RENTAL & TRAVEL",
    tag: "WHATSAPP",
    site: "bezawadacarrental.com",
    url: "https://www.bezawadacarrental.com/",
    initials: "BC",
    cover: "bg-ink text-yellow",
    quote:
      "The direct WhatsApp self-drive booking system is a game changer for Vijayawada. Customers browse our cars and lock their rental in 30 seconds. No manual calls needed at midnight anymore.",
    date: "11 Oct, 4:45 PM",
  },
  {
    id: "rev-dial-a-septic",
    name: "DIAL-A-SEPTIC TANK CLEANERS",
    project: "24/7 SERVICES & SEO",
    tag: "WHATSAPP",
    site: "dialaseptictankcleaners.com",
    url: "https://www.dialaseptictankcleaners.com/home",
    initials: "DS",
    cover: "bg-orange text-cream",
    quote:
      "Continuous 24/7 emergency cleaning calls pouring in across Hyderabad! The tap-to-call button and local Google SEO ranking have kept our trucks booked back to back. Best investment!",
    date: "06 Oct, 11:30 AM",
  },
  {
    id: "rev-hew",
    name: "HEW GROUPS",
    project: "ENTERPRISE INFRA",
    tag: "WHATSAPP",
    site: "hewgroups.com",
    url: "https://hewgroups.com",
    initials: "HG",
    cover: "bg-ink text-yellow",
    quote:
      "The preview build looks rock-solid and enterprise ready. Clean blue aesthetic, ultra snappy loading, and zero bloat. Excited for the official launch next week!",
    date: "03 Oct, 3:15 PM",
  },
  {
    id: "rev-skillsboost",
    name: "SKILLSBOOSTHUB",
    project: "EDTECH PLATFORM",
    tag: "WHATSAPP",
    site: "skillsboosthub.com",
    url: "https://skillsboosthub.com",
    initials: "SB",
    cover: "bg-orange text-cream",
    quote:
      "The interactive student portal UI prototype is super crisp. Love the speed and frictionless course discovery. Ready to shake up edtech learning soon!",
    date: "29 Sep, 8:05 PM",
  },
];

interface ReviewsDMProps {
  onOpenProjectModal?: () => void;
}

export default function ReviewsDM({ onOpenProjectModal }: ReviewsDMProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);
  const [canScroll, setCanScroll] = useState(false);
  const [activeReview, setActiveReview] = useState<ReviewItem | null>(null);

  const handleCloseModal = useCallback(() => setActiveReview(null), []);

  // Check if content overflows container
  useEffect(() => {
    const el = scrollContainerRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const checkScroll = () => setCanScroll(inner.scrollWidth > el.clientWidth);
    checkScroll();
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  // Smooth continuous auto-pan + interactive mouse drag (matching aijugaad.co)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const el = scrollContainerRef.current;
    if (!el || !canScroll) return;

    let dir = 1;
    let scrollPos = el.scrollLeft;
    let pauseUntil = 0;
    let isPaused = false;

    const onScroll = () => {
      if (Math.abs(el.scrollLeft - scrollPos) > 1.5) {
        scrollPos = el.scrollLeft;
      }
    };

    const pauseBriefly = () => {
      isPaused = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        isPaused = false;
      }, 2500);
    };

    const pauseNow = () => {
      isPaused = true;
      clearTimeout(timer);
    };

    let isPointerDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      isPointerDown = true;
      startX = e.clientX;
      startScrollLeft = el.scrollLeft;
      pauseNow();
      if (e.pointerType === "mouse") {
        el.classList.add("cursor-grabbing");
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isPointerDown && e.pointerType === "mouse") {
        el.scrollLeft = startScrollLeft - (e.clientX - startX);
      }
    };

    const onPointerUp = () => {
      if (isPointerDown) {
        isPointerDown = false;
        el.classList.remove("cursor-grabbing");
        pauseBriefly();
      }
    };

    const onMouseLeave = () => {
      if (!isPointerDown) {
        isPaused = false;
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("wheel", pauseBriefly, { passive: true });
    el.addEventListener("touchstart", pauseNow, { passive: true });
    el.addEventListener("touchend", pauseBriefly, { passive: true });
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("mouseenter", pauseNow);
    el.addEventListener("mouseleave", onMouseLeave);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animId = 0;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = Math.min(time - lastTime, 100);
      lastTime = time;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (!isPaused && !reducedMotion.matches && maxScroll > 0 && time >= pauseUntil) {
        scrollPos += (26.4 * dir * delta) / 1000;
        if (scrollPos >= maxScroll) {
          scrollPos = maxScroll;
          dir = -1;
          pauseUntil = time + 1800;
        } else if (scrollPos <= 0) {
          scrollPos = 0;
          dir = 1;
          pauseUntil = time + 1800;
        }
        el.scrollLeft = scrollPos;
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(timer);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("wheel", pauseBriefly);
      el.removeEventListener("touchstart", pauseNow);
      el.removeEventListener("touchend", pauseBriefly);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("mouseenter", pauseNow);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [canScroll]);

  // Differentiate card click from drag
  const handleCardPointerDown = (e: React.PointerEvent) => {
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleCardClick = (review: ReviewItem, e: React.MouseEvent) => {
    const start = pointerDownPos.current;
    pointerDownPos.current = null;
    if (start && Math.abs(e.clientX - start.x) + Math.abs(e.clientY - start.y) <= 6) {
      setActiveReview(review);
    }
  };

  return (
    <section className="overflow-hidden bg-cream py-20 sm:py-28">
      {/* Section Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">
              SCREENSHOTS DON’T LIE
            </p>
            <h2 className="mt-3 font-display text-4xl font-black uppercase tracking-tight sm:text-6xl text-ink">
              Straight from the DMs.
            </h2>
          </div>
          <p className="max-w-xs text-sm font-medium text-ink/60">
            Real clients, real messages — exactly as they landed. Swipe to read them all.
          </p>
        </div>
      </div>

      {/* Horizontal Carousel (Identical to aijugaad.co) */}
      <div className="relative mt-12">
        <div
          ref={scrollContainerRef}
          className={`no-scrollbar flex select-none overflow-x-auto overscroll-x-contain ${canScroll ? "cursor-grab" : "justify-center"
            }`}
          aria-label="Client reviews — scroll for more"
        >
          <div ref={innerRef} className="flex gap-4 px-4 sm:gap-6 sm:px-6">
            {REVIEWS.map((rev) => (
              <article
                key={rev.id}
                onPointerDown={handleCardPointerDown}
                onClick={(e) => handleCardClick(rev, e)}
                className="flex w-[19rem] shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-ink bg-paper shadow-[5px_5px_0_0_#00000014] transition-transform hover:-translate-y-1 sm:w-[24rem]"
              >
                {/* Header Banner */}
                <div
                  className={`relative flex items-center justify-center overflow-hidden border-b-2 border-ink aspect-[13/5] ${rev.cover}`}
                >
                  <span className="font-display text-3xl font-black tracking-tighter opacity-90 sm:text-4xl select-none">
                    {rev.initials}
                  </span>
                  <span className="absolute right-2.5 top-2.5 rounded-full border-2 border-ink bg-cream px-2.5 py-0.5 font-display text-[0.55rem] font-bold tracking-[0.12em] text-ink">
                    {rev.tag}
                  </span>
                </div>

                {/* Body Content */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  {/* Chat Box Container with fixed max-height (matching aijugaad.co) */}
                  <div className="relative overflow-hidden rounded-xl border-2 border-ink max-h-[296px] sm:max-h-[373px] bg-[#EBF5FF] p-4 sm:p-5">
                    {/* Verified Message Header */}
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-ink/10">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-display text-[0.62rem] font-black uppercase tracking-wider text-ink/80">
                        VERIFIED CLIENT MESSAGE
                      </span>
                      <span className="ml-auto text-[0.6rem] font-bold text-ink/50">
                        {rev.date}
                      </span>
                    </div>

                    {/* Chat Text */}
                    <p className="text-sm font-semibold leading-relaxed text-ink">
                      “{rev.quote}”
                    </p>

                    {/* WhatsApp Checkmarks */}
                    <div className="mt-4 flex items-center justify-end gap-1 text-[0.7rem] font-black text-orange">
                      <span>✓✓</span>
                      <span className="text-[0.6rem] text-ink/50 font-normal">Delivered</span>
                    </div>
                  </div>

                  {/* Footer Info & URL */}
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    {rev.url ? (
                      <a
                        href={rev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        draggable={false}
                        onClick={(e) => e.stopPropagation()}
                        className="truncate font-display text-xs font-black tracking-tight underline decoration-orange decoration-2 underline-offset-4 transition-colors hover:text-orange"
                      >
                        {rev.site}
                      </a>
                    ) : (
                      <p className="truncate font-display text-xs font-black tracking-tight">
                        {rev.site}
                      </p>
                    )}
                    <span className="shrink-0 font-display text-[0.55rem] font-bold tracking-[0.12em] text-orange">
                      {rev.project}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Row Call-to-action Banner (Identical to aijugaad.co) */}
      <div className="mx-auto mt-14 max-w-7xl px-4 sm:mt-16 sm:px-6">
        <div className="text-center">
          <p className="font-display text-xs font-black tracking-[0.22em] text-ink/45">
            YOUR BRAND COULD BE ON THIS ROW
          </p>
          <div className="relative mt-5 inline-block">
            <button
              onClick={() => onOpenProjectModal?.()}
              className="group relative inline-flex items-center gap-3 rounded-full border-2 border-ink bg-orange px-8 py-4 font-display text-base font-black tracking-tight text-cream shadow-[7px_7px_0_0_#141414] transition-transform hover:-translate-y-1 hover:shadow-[9px_9px_0_0_#141414] sm:px-12 sm:py-5 sm:text-2xl cursor-pointer"
            >
              <img
                src="/brand/logo.png"
                alt="GN"
                className="size-6 object-contain inline-block transition-transform duration-300 group-hover:rotate-90 sm:size-7"
              />
              GET YOUR WEBSITE TODAY
            </button>
            <span className="absolute -right-3 -top-3 rotate-6 rounded-full border-2 border-ink bg-yellow px-2.5 py-1 font-display text-[0.55rem] font-black tracking-wide text-ink sm:-right-5 sm:text-[0.65rem]">
              WE REPLY IN 24 HRS
            </span>
          </div>
          <p className="mt-4 text-sm font-medium text-ink/55">
            Four quick steps — no calls, no forms that never end.
          </p>
        </div>
      </div>

      {/* Review Expanded Lightbox Modal (Exact aijugaad.co style) */}
      <AnimatePresence>
        {activeReview && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={handleCloseModal}
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
                onClick={handleCloseModal}
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
                aria-label={`Review from ${activeReview.name}`}
                className="max-h-[86vh] overflow-y-auto overscroll-contain rounded-2xl border-2 border-ink bg-paper shadow-[7px_7px_0_0_#141414]"
              >
                {/* Header Banner */}
                <div
                  className={`relative flex items-center justify-center overflow-hidden border-b-2 border-ink aspect-[13/5] ${activeReview.cover}`}
                >
                  <span className="font-display text-4xl font-black tracking-tighter opacity-90 select-none">
                    {activeReview.initials}
                  </span>
                  {activeReview.tag && (
                    <span className="absolute right-3 top-3 rounded-full border-2 border-ink bg-cream px-2.5 py-0.5 font-display text-[0.55rem] font-bold tracking-[0.12em] text-ink">
                      {activeReview.tag}
                    </span>
                  )}
                </div>

                {/* Body Details */}
                <div className="p-4 sm:p-5">
                  <div className="rounded-xl border-2 border-ink bg-[#EBF5FF] p-5 shadow-[2px_2px_0_0_#0B172A]">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-ink/10">
                      <span className="size-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-display text-[0.65rem] font-black uppercase tracking-wider text-ink/80">
                        VERIFIED CLIENT MESSAGE
                      </span>
                      <span className="ml-auto text-[0.62rem] font-bold text-ink/50">
                        {activeReview.date}
                      </span>
                    </div>

                    <p className="text-base font-semibold leading-relaxed text-ink">
                      “{activeReview.quote}”
                    </p>

                    <div className="mt-4 flex items-center justify-end gap-1 text-[0.75rem] font-black text-orange">
                      <span>✓✓</span>
                      <span className="text-[0.65rem] text-ink/50 font-normal">Delivered</span>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="mt-4 flex items-center justify-between gap-2 border-t-2 border-ink/10 pt-3">
                    {activeReview.url ? (
                      <a
                        href={activeReview.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate font-display text-xs font-black tracking-tight underline decoration-orange decoration-2 underline-offset-4 transition-colors hover:text-orange"
                      >
                        {activeReview.site}
                      </a>
                    ) : (
                      <p className="truncate font-display text-xs font-black tracking-tight">
                        {activeReview.site}
                      </p>
                    )}
                    <span className="shrink-0 font-display text-[0.55rem] font-bold tracking-[0.12em] text-orange">
                      {activeReview.project}
                    </span>
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
