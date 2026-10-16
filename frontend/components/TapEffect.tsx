"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
  size: number;
  shape: "star" | "dot";
}

interface TapItem {
  id: number;
  x: number;
  y: number;
  text: string;
  isSticker: boolean;
  bg: string;
  textColor: string;
  rotation: number;
  sparkles: Sparkle[];
}

const BADGES = [
  { text: "WEBSITES ✦", bg: "#2D8CF0", textColor: "#FFFFFF" },
  { text: "AI BOTS ⚡", bg: "#0B172A", textColor: "#A1D5F5" },
  { text: "SOFTWARE 💻", bg: "#1A4A8E", textColor: "#FFFFFF" },
  { text: "GANESH 💡", bg: "#A1D5F5", textColor: "#0B172A" },
  { text: "NEXGEN 🚀", bg: "#2D8CF0", textColor: "#FFFFFF" },
  { text: "100% CLEAN 🔥", bg: "#FFFFFF", textColor: "#0B172A" },
  { text: "SPEED ⚡", bg: "#0B172A", textColor: "#FFFFFF" },
  { text: "SHIP IT 🚀", bg: "#2D8CF0", textColor: "#FFFFFF" },
  { text: "BOOM 💥", bg: "#A1D5F5", textColor: "#0B172A" },
];

const COLORS = ["#2D8CF0", "#A1D5F5", "#1A4A8E", "#0B172A", "#60A5FA"];

export default function TapEffect() {
  const [items, setItems] = useState<TapItem[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play pleasant micro-pop sound on user tap (optional synthesized Web Audio)
  const playPopSound = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      if (audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        // Frequency sweep from 440Hz down to 220Hz very quickly (50ms)
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch {
      // Audio autoplay policy or unavailable, silently ignore
    }
  }, []);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    // Only trigger for primary click / tap
    if (e.button !== 0 && e.pointerType === "mouse") return;

    // Disable tap effect when clicking on buttons, links, inputs, or interactive controls
    const target = e.target as HTMLElement | null;
    if (
      target &&
      (target.closest("button, a, input, textarea, select, label, [role='button'], [data-no-tap]") ||
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA")
    ) {
      return;
    }

    playPopSound();

    const badge = BADGES[Math.floor(Math.random() * BADGES.length)];
    const sparkCount = 4 + Math.floor(Math.random() * 3);
    const sparkles: Sparkle[] = [];

    for (let i = 0; i < sparkCount; i++) {
      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
      const speed = 35 + Math.random() * 45;
      sparkles.push({
        id: i,
        x: 0,
        y: 0,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed - 15, // slight upward bias
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 8 + Math.floor(Math.random() * 8),
        shape: i % 2 === 0 ? "star" : "dot",
      });
    }

    const newItem: TapItem = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      text: badge.text,
      isSticker: true,
      bg: badge.bg,
      textColor: badge.textColor,
      rotation: (Math.random() - 0.5) * 24, // -12 to +12 deg
      sparkles,
    };

    setItems((prev) => [...prev.slice(-12), newItem]);

    // Clean up after 850ms
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== newItem.id));
    }, 850);
  }, [playPopSound]);

  useEffect(() => {
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [handlePointerDown]);

  if (items.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none"
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
          }}
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
        >
          {/* Main Sticker Badge with spring pop and float */}
          <div
            style={{
              backgroundColor: item.bg,
              color: item.textColor,
              transform: `rotate(${item.rotation}deg)`,
            }}
            className="animate-tap-burst whitespace-nowrap rounded-full border-2 border-ink px-3.5 py-1 font-display text-xs sm:text-sm font-black tracking-wider shadow-[3px_3px_0_0_#0B172A]"
          >
            {item.text}
          </div>

          {/* Radiating Sparkles */}
          {item.sparkles.map((sp) => (
            <div
              key={sp.id}
              style={
                {
                  "--dx": `${sp.dx}px`,
                  "--dy": `${sp.dy}px`,
                  color: sp.color,
                } as React.CSSProperties
              }
              className="animate-spark-fly absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm pointer-events-none"
            >
              {sp.shape === "star" ? "✦" : "★"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
