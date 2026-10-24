import React from "react";
import Link from "next/link";
import { SparkIcon } from "./Icons";

export default function Footer() {
  return (
    <footer className="border-t-2 border-[#2D8CF0]/30 bg-[#0B172A] text-white select-none">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand & Nav */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="size-9 rounded-xl border-2 border-white/20 bg-white p-1 grid place-items-center shadow-[2px_2px_0_0_#2D8CF0] transition-transform group-hover:scale-105">
                <img
                  src="/brand/logo.png"
                  alt="Ganesh NexGen Co Logo"
                  className="size-7 object-contain"
                />
              </div>
              <span className="font-display text-lg font-black tracking-tight text-white">
                GANESH NEXGEN CO
              </span>
            </Link>
            <nav className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              <Link
                href="/#services"
                className="font-display text-xs font-bold tracking-[0.14em] text-white/70 transition-colors hover:text-[#2D8CF0]"
              >
                SERVICES
              </Link>
              <Link
                href="/#work"
                className="font-display text-xs font-bold tracking-[0.14em] text-white/70 transition-colors hover:text-[#2D8CF0]"
              >
                WORK
              </Link>
              <Link
                href="/case-studies"
                className="font-display text-xs font-bold tracking-[0.14em] text-white/70 transition-colors hover:text-[#2D8CF0]"
              >
                CASE STUDIES
              </Link>
              <Link
                href="/why-us"
                className="font-display text-xs font-bold tracking-[0.14em] text-white/70 transition-colors hover:text-[#2D8CF0]"
              >
                WHY US
              </Link>
              <Link
                href="/about"
                className="font-display text-xs font-bold tracking-[0.14em] text-white/70 transition-colors hover:text-[#2D8CF0]"
              >
                ABOUT
              </Link>
              <Link
                href="/contact"
                className="font-display text-xs font-bold tracking-[0.14em] text-white/70 transition-colors hover:text-[#2D8CF0]"
              >
                CONTACT
              </Link>
              <Link
                href="/privacy"
                className="font-display text-xs font-bold tracking-[0.14em] text-white/70 transition-colors hover:text-[#2D8CF0]"
              >
                PRIVACY
              </Link>
              <Link
                href="/terms"
                className="font-display text-xs font-bold tracking-[0.14em] text-white/70 transition-colors hover:text-[#2D8CF0]"
              >
                TERMS
              </Link>
            </nav>
          </div>

          {/* Say Hello */}
          <div>
            <p className="font-display text-[0.65rem] font-black tracking-[0.18em] text-[#2D8CF0]">
              SAY HELLO
            </p>
            <div className="mt-3 flex flex-col gap-1.5">
              <a
                href="mailto:contact@ganeshnexgen.website"
                className="font-display text-sm font-bold tracking-wide text-white transition-colors hover:text-[#2D8CF0]"
              >
                contact@ganeshnexgen.website
              </a>
            </div>
            <p className="mt-2 text-xs font-medium text-white/50 max-w-xs">
              A software, web &amp; AI automation studio, powering high-growth brands across India.
            </p>
          </div>

          {/* Find Us Here */}
          <div>
            <p className="font-display text-[0.65rem] font-black tracking-[0.18em] text-[#2D8CF0]">
              FIND US HERE
            </p>
            <div className="mt-3 flex flex-col gap-2.5">
              <a
                href="mailto:contact@ganeshnexgen.website"
                className="group inline-flex w-fit items-center gap-2.5 font-display text-xs font-bold tracking-wide text-white/80 transition-colors hover:text-white"
              >
                <span className="grid size-7 place-items-center rounded-md bg-white/10 transition-colors group-hover:bg-white/20">
                  ✉
                </span>
                EMAIL INQUIRY
              </a>
              <Link
                href="/contact"
                className="group inline-flex w-fit items-center gap-2.5 font-display text-xs font-bold tracking-wide text-white/80 transition-colors hover:text-white"
              >
                <span className="grid size-7 place-items-center rounded-md bg-white/10 transition-colors group-hover:bg-white/20">
                  ✦
                </span>
                START A PROJECT
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/10 py-5 text-center font-display text-[0.65rem] font-bold tracking-[0.2em] text-white/40 flex flex-col sm:flex-row items-center justify-center gap-3">
        <span>© 2026 GANESH NEXGEN SOLUTIONS — ALL RIGHTS RESERVED</span>
        <span className="hidden sm:inline">•</span>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white transition-colors">PRIVACY POLICY</Link>
          <Link href="/terms" className="hover:text-white transition-colors">TERMS OF SERVICE</Link>
        </div>
      </div>
    </footer>
  );
}
