"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles, Terminal, CheckCircle2 } from "lucide-react";

export default function UnderProcess() {
  const [terminalStep, setTerminalStep] = useState(0);

  const terminalLogs = [
    "compiling next-gen UI components...",
    "optimizing high-speed edge distribution...",
    "synchronizing cloud infrastructure...",
    "verifying platform security & telemetry...",
    "finalizing deployment pipeline..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalStep((prev) => (prev + 1) % terminalLogs.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [terminalLogs.length]);

  return (
    <div className="relative min-h-screen w-full bg-[#070b14] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-blue-600 selection:text-white font-sans">

      {/* Dynamic Animated Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top-center electric blue aura */}
        <motion.div
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.35, 0.55, 0.35],
            x: [0, 20, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-blue-600/30 via-indigo-600/25 to-cyan-500/20 blur-[130px]"
        />

        {/* Bottom-right cyan/indigo aura */}
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.25, 0.45, 0.25],
            x: [0, -25, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 -right-20 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-cyan-500/25 via-blue-700/20 to-purple-600/20 blur-[140px]"
        />

        {/* Bottom-left purple ambient pulse */}
        <motion.div
          animate={{
            scale: [0.95, 1.15, 0.95],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-700/20 via-blue-900/20 to-transparent blur-[130px]"
        />

        {/* High-tech micro-dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Sleek top ambient light bar */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl mx-auto w-full text-center">

        {/* Brand Header / Logo Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center mb-5 sm:mb-6 text-center"
        >
          {/* Logo with animated glowing ring */}
          <div className="relative group mb-3">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
            <div className="relative px-5 py-2.5 rounded-xl bg-[#0d1424]/90 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center gap-3">
              <img
                src="/brand/logo.png"
                alt="Ganesh NexGen Solutions Logo"
                className="h-9 sm:h-10 w-auto object-contain drop-shadow-[0_0_15px_rgba(37,99,235,0.6)]"
              />
              <div className="text-left">
                <div className="text-base sm:text-lg font-black tracking-tight text-white font-heading leading-tight">
                  Ganesh NexGen
                </div>
                <div className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase leading-none">
                  Solutions
                </div>
              </div>
            </div>
          </div>

          {/* Live Pulsing Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 backdrop-blur-md shadow-inner shadow-blue-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-cyan-300">
              System Upgrade In Progress
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs font-medium text-slate-300">
              Website Under Process
            </span>
          </motion.div>
        </motion.div>

        {/* Hero Title & Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center max-w-2xl mx-auto space-y-2.5 mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-heading leading-[1.15]">
            <span className="text-white">We Are Crafting Our </span>
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
              <br />Next-Gen Experience
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed max-w-xl mx-auto font-normal">
            Our platform is currently undergoing a scheduled system upgrade and architecture enhancement.
            We are deploying faster infrastructure, intelligent capabilities, and a brand-new interface.
            We will be back online shortly.
          </p>
        </motion.div>

        {/* Small, Professional & Interactive "Website Under Process" Live Assembly Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="w-full max-w-md mx-auto"
        >
          {/* Glass Browser Mockup */}
          <div className="relative rounded-2xl bg-[#090f1d]/90 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85),0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">

            {/* Top Browser Header Bar */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/40 border-b border-white/10">
              {/* Traffic light window controls */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>

              {/* URL Address Bar */}
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300 font-mono">
                <Lock className="w-2.5 h-2.5 text-emerald-400" />
                <span>ganeshnexgen.com</span>
              </div>

              {/* Status pill */}
              <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="hidden sm:inline">PROCESSING</span>
              </div>
            </div>

            {/* Inner Live Web Assembly Animation Canvas */}
            <div className="relative p-4 sm:p-5 min-h-[140px] flex flex-col justify-between bg-[#050812]/90 overflow-hidden">

              {/* Vertical Laser Scanner Beam Sweeping Down the Website Mockup */}
              <motion.div
                animate={{ y: [0, 130, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] pointer-events-none z-20"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-400/20 rounded-full blur-md" />
              </motion.div>

              {/* Mockup Wireframe Skeleton Elements being assembled */}
              <div className="space-y-3 relative z-10">
                {/* Header Skeleton Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                    </div>
                    <div className="h-2.5 w-16 bg-white/20 rounded-full" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-2 w-8 bg-white/10 rounded-full" />
                    <div className="h-2 w-8 bg-white/10 rounded-full" />
                    <div className="h-2 w-8 bg-white/10 rounded-full" />
                  </div>
                </div>

                {/* Hero Skeleton Block */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                  <div className="h-3 w-3/4 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full" />
                  <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                </div>

                {/* 3 Grid Card Skeletons */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div className="p-2 rounded-lg bg-blue-500/5 border border-blue-500/20 flex flex-col items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-blue-500/30" />
                    <div className="h-1.5 w-8 bg-white/20 rounded-full" />
                  </div>
                  <div className="p-2 rounded-lg bg-cyan-500/5 border border-cyan-500/20 flex flex-col items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-cyan-500/30" />
                    <div className="h-1.5 w-8 bg-white/20 rounded-full" />
                  </div>
                  <div className="p-2 rounded-lg bg-indigo-500/5 border border-indigo-500/20 flex flex-col items-center gap-1.5">
                    <div className="w-3.5 h-3.5 rounded bg-indigo-500/30" />
                    <div className="h-1.5 w-8 bg-white/20 rounded-full" />
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Live Terminal Output Bar */}
            <div className="px-3.5 py-2 bg-black/60 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center gap-2 text-cyan-300 min-w-0">
                <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-slate-400 select-none">&gt;</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={terminalStep}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="truncate text-slate-200"
                  >
                    {terminalLogs[terminalStep]}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-1 text-emerald-400 text-[10px] shrink-0 ml-2 font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>ACTIVE</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Subtle Bottom Footer Notice */}
      <footer className="relative z-10 py-5 border-t border-white/5 text-center text-xs text-slate-500 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 font-normal">
          <span>© {new Date().getFullYear()} Ganesh NexGen Solutions. All rights reserved.</span>
          <span className="hidden sm:inline text-white/10">•</span>
          <span className="text-slate-400">Your Growth. Our Technology.</span>
        </div>
      </footer>

    </div>
  );
}
