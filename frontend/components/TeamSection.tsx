"use client";

import React from "react";
import Link from "next/link";

interface SocialLink {
  label: string;
  kind: "instagram" | "linkedin" | "github";
  href: string;
  handle?: string;
}

interface Member {
  name: string;
  socials: SocialLink[];
}

const MEMBERS: Member[] = [
  {
    name: "VENKY",
    socials: [
      {
        label: "LinkedIn",
        kind: "linkedin",
        href: "https://linkedin.com",
        handle: "Venky",
      },
      {
        label: "GitHub",
        kind: "github",
        href: "https://github.com",
        handle: "@venky",
      },
    ],
  },
  {
    name: "GANESH",
    socials: [
      {
        label: "LinkedIn",
        kind: "linkedin",
        href: "https://linkedin.com",
        handle: "Ganesh",
      },
      {
        label: "GitHub",
        kind: "github",
        href: "https://github.com",
        handle: "@ganesh",
      },
    ],
  },
];

export default function TeamSection() {
  return (
    <section className="border-t-2 border-ink bg-paper">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-sm font-bold tracking-[0.2em] text-orange">
              PARTNERS IN CRIME
            </p>
            <h2 className="mt-2 font-display text-3xl font-black uppercase tracking-tight sm:text-5xl">
              The two of us
            </h2>
          </div>
          <Link
            href="/about"
            className="group hidden items-center gap-2 rounded-full border-2 border-ink bg-cream px-5 py-2.5 font-display text-xs font-bold transition-colors hover:bg-yellow sm:inline-flex"
          >
            READ MORE
            <svg
              viewBox="0 0 24 24"
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* 2-Column Responsive Grid on both Mobile & Desktop (Exact aijugaad.co mobile view) */}
        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-6">
          {MEMBERS.map((member) => (
            <article
              key={member.name}
              className="flex h-full flex-col justify-between gap-4 rounded-2xl border-2 border-ink bg-cream p-4 shadow-[4px_4px_0_0_#141414] transition-transform hover:-translate-y-0.5 sm:gap-5 sm:rounded-3xl sm:p-6 sm:shadow-[7px_7px_0_0_#141414]"
            >
              <h3 className="font-display text-base font-black leading-tight tracking-tight sm:text-2xl">
                {member.name}
              </h3>
              <div className="flex gap-2">
                {member.socials.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on ${soc.label.toLowerCase()}`}
                    title={soc.handle}
                    className="grid size-7 place-items-center rounded-md border-2 border-ink bg-paper transition-transform hover:-translate-y-0.5 sm:size-9"
                  >
                    {soc.kind === "linkedin" && (
                      <svg viewBox="0 0 24 24" className="size-3.5 sm:size-4" aria-hidden="true">
                        <rect x="1.5" y="1.5" width="21" height="21" rx="4.5" fill="#0A66C2" />
                        <circle cx="6.4" cy="6.6" r="1.8" fill="#fff" />
                        <rect x="4.8" y="9.6" width="3.2" height="9.2" fill="#fff" />
                        <path
                          d="M10.2 9.6h3.05v1.3a3.32 3.32 0 0 1 2.93-1.5c2.2 0 3.62 1.4 3.62 4.05v5.35h-3.2v-4.85c0-1.25-.5-2-1.62-2-1 0-1.58.66-1.58 2v4.85h-3.2Z"
                          fill="#fff"
                        />
                      </svg>
                    )}
                    {soc.kind === "instagram" && (
                      <svg viewBox="0 0 24 24" className="size-3.5 sm:size-4" aria-hidden="true">
                        <defs>
                          <linearGradient id={`ig-${member.name}`} x1="0" y1="1" x2="1" y2="0">
                            <stop offset="0" stopColor="#FEDA75" />
                            <stop offset="0.25" stopColor="#FA7E1E" />
                            <stop offset="0.5" stopColor="#D62976" />
                            <stop offset="0.75" stopColor="#962FBF" />
                            <stop offset="1" stopColor="#4F5BD5" />
                          </linearGradient>
                        </defs>
                        <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill={`url(#ig-${member.name})`} />
                        <rect x="5.6" y="5.6" width="12.8" height="12.8" rx="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
                        <circle cx="12" cy="12" r="3.3" fill="none" stroke="#fff" strokeWidth="1.8" />
                        <circle cx="17.2" cy="6.9" r="1.2" fill="#fff" />
                      </svg>
                    )}
                    {soc.kind === "github" && (
                      <svg viewBox="0 0 24 24" className="size-3.5 sm:size-4 fill-current text-ink" aria-hidden="true">
                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Full-width button on mobile (sm:hidden) */}
        <Link
          href="/about"
          className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink bg-cream px-5 py-3 font-display text-xs font-bold transition-colors hover:bg-yellow sm:hidden"
        >
          READ MORE ABOUT US
          <svg
            viewBox="0 0 24 24"
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
