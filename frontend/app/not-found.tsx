import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="dot-grid flex min-h-screen flex-col items-center justify-center px-6 text-center bg-cream text-ink">
      <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">
        ERROR 404
      </p>
      <h1 className="mt-3 font-display text-[clamp(3.5rem,14vw,9rem)] font-black uppercase leading-none tracking-tight text-ink">
        LOST
      </h1>
      <p className="mt-4 max-w-sm text-base font-semibold text-ink/70">
        This page does not exist. Even our software has its limits.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ink px-8 py-3.5 font-display text-sm font-bold text-cream shadow-[5px_5px_0_0_#ff4d00] transition-transform hover:-translate-y-1 active:translate-y-0"
      >
        TAKE ME HOME →
      </Link>
    </main>
  );
}
