"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedLineProps {
  text: string;
  className?: string;
  delay?: number;
  boxClassName?: string;
}

function AnimatedLine({
  text,
  className = "",
  delay = 0,
  boxClassName = "h-[1.02em]",
}: AnimatedLineProps) {
  return (
    <span className={`relative block overflow-hidden ${boxClassName}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={text}
          className={`block ${className}`}
          initial={{ y: "115%", rotate: 3, opacity: 0 }}
          animate={{ y: "0%", rotate: 0, opacity: 1 }}
          exit={{ y: "-115%", rotate: -3, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const PERSONAS = [
  { who: "We are chefs", what: "We cook websites" },
  { who: "We are architects", what: "We build software" },
  { who: "We are robots", what: "We make chatbots" },
  { who: "We are wizards", what: "We automate stuff" },
  { who: "We are builders", what: "We scale businesses" },
];

const STICKERS = [
  {
    label: "LOGOS",
    pos: "left-[3%] top-[15%] md:top-[24%]",
    look: "bg-[#A1D5F5] text-[#0B172A]",
    rotate: -8,
  },
  {
    label: "WEBSITES",
    pos: "right-[3%] top-[15%] md:top-[20%]",
    look: "bg-[#2D8CF0] text-white",
    rotate: 7,
  },
  {
    label: "AI BOTS",
    pos: "right-[4%] bottom-[4%] md:right-auto md:left-[5%] md:bottom-[24%]",
    look: "bg-[#0B172A] text-white",
    rotate: -6,
  },
];

interface HeroProps {
  onOpenProjectModal?: () => void;
}

export default function Hero({ onOpenProjectModal }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PERSONAS.length);
    }, 2700);
    return () => clearInterval(timer);
  }, []);

  const currentPersona = PERSONAS[index];

  return (
    <section
      id="top"
      ref={containerRef}
      className="dot-grid relative flex min-h-[72svh] flex-col justify-center overflow-hidden pt-16 md:min-h-svh md:pt-32"
    >
      {/* Draggable Spring Drop-in Stickers (Exact 3 stickers at identical AI Jugaad Co positions) */}
      {STICKERS.map((st, idx) => (
        <div key={st.label} className={`absolute z-20 ${st.pos}`}>
          <motion.div
            drag
            dragConstraints={containerRef}
            dragMomentum={false}
            dragElastic={0.12}
            whileDrag={{ scale: 1.12, zIndex: 30 }}
            whileHover={{ scale: 1.06 }}
            className="cursor-grab touch-none select-none active:cursor-grabbing"
          >
            <motion.div
              initial={{ opacity: 0, y: -480, rotate: 4 * st.rotate }}
              animate={{ opacity: 1, y: 0, rotate: st.rotate }}
              transition={{
                delay: 0.45 + 0.16 * idx,
                type: "spring",
                bounce: 0.52,
                duration: 1.35,
                opacity: { duration: 0.35, delay: 0.45 + 0.16 * idx },
              }}
            >
              <div
                className={`flex items-center rounded-full border-2 border-ink px-4 py-2 font-display text-sm font-black tracking-tight shadow-[4px_4px_0_0_#0B172A] sm:px-6 sm:py-3 sm:text-lg sm:shadow-[5px_5px_0_0_#0B172A] ${st.look}`}
              >
                {st.label}
              </div>
            </motion.div>
          </motion.div>
        </div>
      ))}

      {/* Main Hero Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* Animated Headline with 3D Flip Transitions */}
        <h1 className="animate-hero-in whitespace-nowrap font-display text-[clamp(1.4rem,7.4vw,6.2rem)] font-black uppercase leading-[1.02] tracking-tight">
          <AnimatedLine text={currentPersona.who} />
          <AnimatedLine text={currentPersona.what} className="text-outline" delay={0.06} />
          <span className="block text-[#2D8CF0]">and more.</span>
        </h1>

        {/* Subtitle & Actions */}
        <div className="mt-4 flex flex-col gap-8 sm:mt-8 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="text-sm font-medium leading-relaxed sm:text-lg text-[#4A5970]">
              Logos, websites, custom software and AI automation — made for real businesses, not for design awards.
            </p>
            <div className="mt-4 flex flex-wrap gap-3 sm:mt-7">
              <Link
                id="hero-start-project-btn"
                href="/contact"
                onClick={(e) => {
                  if (onOpenProjectModal) {
                    e.preventDefault();
                    onOpenProjectModal();
                  }
                }}
                className="rounded-full bg-[#0B172A] px-5 py-3 font-display text-xs font-bold text-white shadow-[5px_5px_0_0_#2D8CF0] transition-transform hover:-translate-y-0.5 sm:px-7 sm:py-3.5 sm:text-base cursor-pointer"
              >
                START A PROJECT
              </Link>
              <Link
                href="/#work"
                className="rounded-full border-2 border-ink bg-white px-5 py-3 font-display text-xs font-bold transition-colors hover:bg-[#A1D5F5] sm:px-7 sm:py-3.5 sm:text-base text-ink shadow-[3px_3px_0_0_#0B172A]"
              >
                SEE OUR WORK
              </Link>
            </div>
          </motion.div>

          {/* Rotating Circular Badge on the Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
            className="hidden shrink-0 sm:block"
          >
            <div className="relative grid size-28 place-items-center sm:size-32">
              <svg viewBox="0 0 120 120" className="absolute inset-0 animate-rot">
                <defs>
                  <path
                    id="badge-circle"
                    d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0"
                  />
                </defs>
                <text className="fill-ink font-display text-[12.5px] font-bold tracking-[0.18em]">
                  <textPath href="#badge-circle">
                    DESIGN • BUILD • AUTOMATE • REPEAT •
                  </textPath>
                </text>
              </svg>
              <span className="grid size-12 place-items-center rounded-full bg-white border-2 border-ink shadow-[2px_2px_0_0_#2D8CF0] p-1.5">
                <img
                  src="/brand/logo.png"
                  alt="GN"
                  className="size-6 object-contain"
                />
              </span>
            </div>
          </motion.div>
        </div>

        {/* Playful Sticker Drag Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-5 font-display text-[0.55rem] font-bold tracking-[0.2em] text-[#0B172A]/60 sm:mt-10 sm:text-xs"
        >
          PSST — THE STICKERS ARE DRAGGABLE
        </motion.p>
      </div>
    </section>
  );
}
