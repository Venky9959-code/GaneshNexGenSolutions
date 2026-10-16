"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScratchCanvasProps {
  onDone: () => void;
  reveal?: string;
}

function ScratchCanvas({ onDone, reveal = "TO SEE WHAT WE DO" }: ScratchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({
    drawing: false,
    x: 0,
    y: 0,
    moves: 0,
    started: false,
    finished: false,
  });

  const renderCover = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;
    const h = rect.height;

    // Background fill — Brand vibrant blue #2D8CF0
    ctx.fillStyle = "#2D8CF0";
    ctx.fillRect(0, 0, w, h);

    // Diagonal hatching lines
    ctx.strokeStyle = "rgba(255, 252, 245, 0.14)";
    ctx.lineWidth = 12;
    for (let i = -h; i < w + h; i += 44) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + h, h);
      ctx.stroke();
    }

    // Headline: "SCRATCH ME"
    const o = Math.max(30, Math.min(0.08 * w, 66));
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fffcf5";
    ctx.font = `900 ${o}px Archivo, "Arial Black", Impact, sans-serif`;
    ctx.fillText("SCRATCH ME", w / 2, h / 2 - 0.72 * o);

    // Subhead: "TO SEE WHAT WE DO"
    ctx.fillStyle = "#A1D5F5";
    ctx.font = `900 ${Math.max(15, 0.4 * o)}px Archivo, "Arial Black", sans-serif`;
    ctx.fillText(reveal, w / 2, h / 2 + 0.42 * o);

    // Pill badge: "SWIPE HERE — FINGER OR MOUSE"
    const pillFontSize = Math.max(10, 0.2 * o);
    const pillText = "SWIPE HERE — FINGER OR MOUSE";
    ctx.font = `700 ${pillFontSize}px Archivo, Arial, sans-serif`;
    const pillWidth = ctx.measureText(pillText).width + 2.6 * pillFontSize;
    const pillHeight = 2.6 * pillFontSize;
    const pillY = h / 2 + 1.5 * o;

    ctx.fillStyle = "rgba(11, 23, 42, 0.9)";
    ctx.beginPath();
    if (typeof (ctx as any).roundRect === "function") {
      (ctx as any).roundRect(w / 2 - pillWidth / 2, pillY - pillHeight / 2, pillWidth, pillHeight, 999);
    } else {
      ctx.rect(w / 2 - pillWidth / 2, pillY - pillHeight / 2, pillWidth, pillHeight);
    }
    ctx.fill();

    ctx.fillStyle = "#faf3e5";
    ctx.fillText(pillText, w / 2, pillY + 1);
  }, [reveal]);

  useEffect(() => {
    renderCover();
    (document as any).fonts?.ready?.then(() => {
      if (!stateRef.current.started) renderCover();
    });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => {
      if (!stateRef.current.started) renderCover();
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [renderCover]);

  const getCanvasPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, w: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      w: rect.width,
    };
  };

  const scratchStroke = (x1: number, y1: number, x2: number, y2: number, width: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const strokeRadius = Math.max(34, 0.075 * width);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 2 * strokeRadius;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
  };

  const checkThreshold = () => {
    const canvas = canvasRef.current;
    if (!canvas || stateRef.current.finished) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const totalPixels = canvas.width * canvas.height;
    if (totalPixels === 0) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const step = Math.max(1, Math.floor(totalPixels / 4000));
      let cleared = 0;
      let sampled = 0;

      for (let i = 0; i < totalPixels; i += step) {
        sampled++;
        if (data[4 * i + 3] < 128) {
          cleared++;
        }
      }

      if (cleared / sampled > 0.14) {
        if (!stateRef.current.finished) {
          stateRef.current.finished = true;
          onDone();
        }
      }
    } catch {
      // Fallback in case of context reading restriction
    }
  };

  return (
    <motion.div
      className="absolute inset-0 z-20 overflow-hidden rounded-2xl border-2 border-ink shadow-[5px_5px_0_0_#0B172A] cursor-crosshair"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full touch-none select-none"
        aria-label="Scratch card — swipe to reveal our services"
        onPointerDown={(e) => {
          try {
            canvasRef.current?.setPointerCapture(e.pointerId);
          } catch {}
          stateRef.current.drawing = true;
          stateRef.current.started = true;
          const pos = getCanvasPos(e);
          scratchStroke(pos.x, pos.y, pos.x, pos.y, pos.w);
          stateRef.current.x = pos.x;
          stateRef.current.y = pos.y;
        }}
        onPointerMove={(e) => {
          if (!stateRef.current.drawing) return;
          const pos = getCanvasPos(e);
          scratchStroke(stateRef.current.x, stateRef.current.y, pos.x, pos.y, pos.w);
          stateRef.current.x = pos.x;
          stateRef.current.y = pos.y;
          if (++stateRef.current.moves % 5 === 0) {
            checkThreshold();
          }
        }}
        onPointerUp={() => {
          stateRef.current.drawing = false;
          checkThreshold();
        }}
        onPointerCancel={() => {
          stateRef.current.drawing = false;
        }}
      />
    </motion.div>
  );
}

export default function ServicesScratchCard() {
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const confettiRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Mobile snap scroll: center the 2nd card by default exactly like aijugaad.co
  useEffect(() => {
    const el = cardsContainerRef.current;
    if (!el || window.matchMedia("(min-width: 768px)").matches) return;
    const centerCard = el.children[1] as HTMLElement;
    if (centerCard) {
      el.scrollLeft = centerCard.offsetLeft - el.offsetLeft - (el.clientWidth - centerCard.clientWidth) / 2;
    }
  }, []);

  const triggerConfetti = () => {
    const container = confettiRef.current;
    if (!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const totalHeight = container.clientHeight + 80;
    const colors = ["#2D8CF0", "#A1D5F5", "#0B172A", "#1A4A8E", "#FFFFFF", "#FFC72E"];

    for (let i = 0; i < 90; i++) {
      const span = document.createElement("span");
      const size = 6 + 7 * Math.random();
      const driftX = -60 + 120 * Math.random();
      const rot = (Math.random() < 0.5 ? -1 : 1) * (360 + 540 * Math.random());

      span.style.cssText = `position:absolute;left:${100 * Math.random()}%;top:${-30 - 150 * Math.random()}px;width:${size}px;height:${size * (0.6 + Math.random())}px;background:${colors[i % colors.length]};border-radius:${Math.random() < 0.25 ? "999px" : "2px"};pointer-events:none;`;
      container.appendChild(span);

      span.animate(
        [
          { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
          { transform: `translate(${0.6 * driftX}px, ${0.6 * totalHeight}px) rotate(${0.6 * rot}deg)`, opacity: 1, offset: 0.7 },
          { transform: `translate(${driftX}px, ${totalHeight}px) rotate(${rot}deg)`, opacity: 0 },
        ],
        {
          duration: 1300 + 900 * Math.random(),
          easing: "cubic-bezier(.2,.6,.3,1)",
        }
      ).onfinish = () => span.remove();
    }
  };

  const handleReveal = () => {
    setIsRevealed(true);
    triggerConfetti();
  };

  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">
            THREE THINGS. DONE RIGHT.
          </p>
          <h2 className="mt-2 font-display text-3xl font-black uppercase tracking-tight text-ink sm:text-5xl">
            What we do
          </h2>
        </div>
        {!isRevealed && (
          <button
            onClick={handleReveal}
            className="self-start sm:self-auto rounded-full border-2 border-ink bg-yellow px-4 py-1.5 font-display text-xs font-black text-ink shadow-[2px_2px_0_0_#0B172A] hover:bg-orange hover:text-white transition-colors cursor-pointer"
          >
            REVEAL ALL SERVICES ✦
          </button>
        )}
      </div>

      {/* Cards Area with Interactive Scratch Card & Confetti Container */}
      <div className="relative -mx-4 mt-8 sm:-mx-6 md:mx-0">
        {/* Confetti Explosion Layer */}
        <div
          ref={confettiRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
        />

        {/* Scratch Card Overlay with Smooth Framer Motion Vanish */}
        <AnimatePresence>
          {!isRevealed && (
            <ScratchCanvas onDone={handleReveal} reveal="TO SEE WHAT WE DO" />
          )}
        </AnimatePresence>

        {/* 3 Neo-Brutalist Service Cards with Mobile Snap Scroll (identical to aijugaad.co) */}
        <div
          ref={cardsContainerRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:px-6 md:grid md:snap-none md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0"
        >
          {/* Card 01: LOGO & BRANDING */}
          <div className="w-[76%] shrink-0 snap-center md:w-auto md:shrink">
            <div className="flex h-full flex-col rounded-2xl border-2 border-ink p-5 shadow-[5px_5px_0_0_#0B172A] sm:p-6 bg-yellow text-ink transition-transform hover:-translate-y-1">
              <span className="font-display text-3xl font-black text-orange">01</span>
              <h3 className="mt-3 font-display text-lg font-black tracking-tight sm:text-xl">
                LOGO &amp; BRANDING
              </h3>
              <p className="mt-1 text-sm font-medium opacity-80">
                A mark people remember.
              </p>
              <ul className="mt-4 flex flex-col gap-1.5 border-t-2 border-current/20 pt-4">
                <li className="flex items-center gap-2.5 font-display text-xs font-bold tracking-wide">
                  <span className="size-1.5 rounded-full bg-orange" />
                  LOGO SUITES
                </li>
                <li className="flex items-center gap-2.5 font-display text-xs font-bold tracking-wide">
                  <span className="size-1.5 rounded-full bg-orange" />
                  BRAND KITS
                </li>
                <li className="flex items-center gap-2.5 font-display text-xs font-bold tracking-wide">
                  <span className="size-1.5 rounded-full bg-orange" />
                  SOCIAL IDENTITY
                </li>
              </ul>
            </div>
          </div>

          {/* Card 02: WEBSITES */}
          <div className="w-[76%] shrink-0 snap-center md:w-auto md:shrink">
            <div className="flex h-full flex-col rounded-2xl border-2 border-ink p-5 shadow-[5px_5px_0_0_#0B172A] sm:p-6 bg-paper text-ink transition-transform hover:-translate-y-1">
              <span className="font-display text-3xl font-black text-orange">02</span>
              <h3 className="mt-3 font-display text-lg font-black tracking-tight sm:text-xl">
                WEBSITES
              </h3>
              <p className="mt-1 text-sm font-medium opacity-80">
                Fast, modern, made to convert.
              </p>
              <ul className="mt-4 flex flex-col gap-1.5 border-t-2 border-current/20 pt-4">
                <li className="flex items-center gap-2.5 font-display text-xs font-bold tracking-wide">
                  <span className="size-1.5 rounded-full bg-orange" />
                  E-COMMERCE STORES
                </li>
                <li className="flex items-center gap-2.5 font-display text-xs font-bold tracking-wide">
                  <span className="size-1.5 rounded-full bg-orange" />
                  LANDING PAGES
                </li>
                <li className="flex items-center gap-2.5 font-display text-xs font-bold tracking-wide">
                  <span className="size-1.5 rounded-full bg-orange" />
                  ADMIN DASHBOARDS
                </li>
              </ul>
            </div>
          </div>

          {/* Card 03: AI AUTOMATION */}
          <div className="w-[76%] shrink-0 snap-center md:w-auto md:shrink">
            <div className="flex h-full flex-col rounded-2xl border-2 border-ink p-5 shadow-[5px_5px_0_0_#0B172A] sm:p-6 bg-ink text-cream transition-transform hover:-translate-y-1">
              <span className="font-display text-3xl font-black text-orange">03</span>
              <h3 className="mt-3 font-display text-lg font-black tracking-tight sm:text-xl">
                AI AUTOMATION
              </h3>
              <p className="mt-1 text-sm font-medium opacity-80">
                Robots for the boring stuff.
              </p>
              <ul className="mt-4 flex flex-col gap-1.5 border-t-2 border-current/20 pt-4">
                <li className="flex items-center gap-2.5 font-display text-xs font-bold tracking-wide">
                  <span className="size-1.5 rounded-full bg-orange" />
                  WHATSAPP BOTS
                </li>
                <li className="flex items-center gap-2.5 font-display text-xs font-bold tracking-wide">
                  <span className="size-1.5 rounded-full bg-orange" />
                  LEAD CAPTURE
                </li>
                <li className="flex items-center gap-2.5 font-display text-xs font-bold tracking-wide">
                  <span className="size-1.5 rounded-full bg-orange" />
                  WORKFLOW AUTOMATION
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
