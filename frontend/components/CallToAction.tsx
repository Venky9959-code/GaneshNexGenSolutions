"use client";

import React from "react";
import Link from "next/link";
import { SparkIcon } from "./Icons";

interface CallToActionProps {
  onOpenProjectModal?: () => void;
}

export default function CallToAction({ onOpenProjectModal }: CallToActionProps) {
  return (
    <section id="contact" className="scroll-mt-20 border-t-2 border-ink bg-[#0B172A] text-white">
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <div className="mx-auto mb-6 grid size-16 place-items-center rounded-2xl border-2 border-white/20 bg-white p-2.5 shadow-[4px_4px_0_0_#2D8CF0]">
          <img
            src="/brand/logo.png"
            alt="Ganesh NexGen Co Logo"
            className="size-11 object-contain"
          />
        </div>
        <h2 className="mt-6 font-display text-[clamp(2.4rem,7.5vw,6.5rem)] font-black uppercase leading-[0.95] tracking-tight text-white">
          Got an idea?
          <span className="block text-[#2D8CF0]">Let’s build it.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base sm:text-xl font-medium text-white/70">
          One message is all it takes. Tell us about your software or website needs and we take it from there.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            onClick={(e) => {
              if (onOpenProjectModal) {
                e.preventDefault();
                onOpenProjectModal();
              }
            }}
            className="rounded-full bg-[#2D8CF0] px-8 py-4 font-display text-sm sm:text-base font-black text-white shadow-[5px_5px_0_0_#A1D5F5] transition-transform hover:-translate-y-1 active:translate-y-0 cursor-pointer"
          >
            START A PROJECT
          </Link>
          <Link
            href="/#work"
            className="rounded-full border-2 border-white px-8 py-4 font-display text-sm sm:text-base font-bold text-white transition-colors hover:bg-white hover:text-[#0B172A] shadow-[4px_4px_0_0_rgba(255,255,255,0.2)]"
          >
            SEE OUR WORK
          </Link>
        </div>
      </div>
    </section>
  );
}
