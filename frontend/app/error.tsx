"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="dot-grid flex min-h-screen flex-col items-center justify-center px-6 text-center bg-cream text-ink">
      <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">
        SOMETHING BROKE
      </p>
      <h1 className="mt-3 font-display text-[clamp(2.5rem,10vw,6rem)] font-black uppercase leading-none tracking-tight text-ink">
        ERROR
      </h1>
      <p className="mt-4 max-w-sm text-base font-semibold text-ink/70">
        Our automated monitors are on it. Try refreshing or head back to safety.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-full bg-orange px-6 py-3 font-display text-sm font-bold text-cream shadow-[4px_4px_0_0_#141414] hover:bg-yellow hover:text-ink transition-colors"
        >
          TRY AGAIN
        </button>
        <Link
          href="/"
          className="rounded-full border-2 border-ink bg-paper px-6 py-3 font-display text-sm font-bold text-ink shadow-[4px_4px_0_0_#141414] hover:bg-cream transition-colors"
        >
          BACK HOME
        </Link>
      </div>
    </main>
  );
}
