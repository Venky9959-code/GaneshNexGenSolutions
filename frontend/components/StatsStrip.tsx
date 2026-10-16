import React from "react";

export default function StatsStrip() {
  return (
    <section className="border-b-2 border-ink bg-[#A1D5F5] select-none">
      <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x-2 divide-ink border-x-0 sm:border-x-2 border-ink">
        <div className="px-2 py-7 sm:px-6 sm:py-12 text-center">
          <p className="font-display text-3xl sm:text-6xl font-black leading-none tracking-tight text-[#0B172A] tabular-nums">
            50+
          </p>
          <p className="mt-2 font-display text-[0.6rem] sm:text-xs font-black tracking-[0.18em] text-[#0B172A]/80">
            HAPPY CLIENTS
          </p>
        </div>
        <div className="px-2 py-7 sm:px-6 sm:py-12 text-center">
          <p className="font-display text-3xl sm:text-6xl font-black leading-none tracking-tight text-[#0B172A] tabular-nums">
            80+
          </p>
          <p className="mt-2 font-display text-[0.6rem] sm:text-xs font-black tracking-[0.18em] text-[#0B172A]/80">
            PROJECTS SHIPPED
          </p>
        </div>
        <div className="px-2 py-7 sm:px-6 sm:py-12 text-center">
          <p className="font-display text-3xl sm:text-6xl font-black leading-none tracking-tight text-[#0B172A] tabular-nums">
            24H
          </p>
          <p className="mt-2 font-display text-[0.6rem] sm:text-xs font-black tracking-[0.18em] text-[#0B172A]/80">
            RESPONSE TIME
          </p>
        </div>
      </div>
    </section>
  );
}
