"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenProjectModal?: () => void;
  dark?: boolean;
}

const NAV_LINKS = [
  { label: "WORK", href: "/work" },
  { label: "CASE STUDIES", href: "/case-studies" },
  { label: "WHY US", href: "/why-us" },
  { label: "ABOUT", href: "/about" },
];

export default function Navbar({ onOpenProjectModal, dark = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`site-nav fixed inset-x-0 top-0 z-50 border-b-2 backdrop-blur-sm ${dark ? "border-cream/15 bg-ink/90 text-cream" : "border-ink bg-cream/90 text-ink"
        }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5">
          <span
            className={`grid size-9 place-items-center rounded-lg ${dark ? "bg-cream" : "bg-ink"
              }`}
          >
            <img
              src="/brand/logo.png"
              alt="Ganesh NexGen Co Logo"
              className="size-6 object-contain"
            />
          </span>
          <span className="font-display text-lg font-black tracking-tight">
            GANESH NEXGEN CO
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-5 md:flex lg:gap-8">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-sm font-bold tracking-wide transition-colors hover:text-orange"
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => onOpenProjectModal?.()}
            className={`glow-ring rounded-full px-5 py-2.5 font-display text-sm font-bold transition-colors cursor-pointer ${dark
              ? "bg-orange text-cream hover:bg-cream hover:text-ink"
              : "bg-ink text-cream hover:bg-orange"
              }`}
          >
            START A PROJECT
          </button>
        </div>

        {/* Mobile Nav Controls (Exact aijugaad.co mobile layout) */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => onOpenProjectModal?.()}
            className={`rounded-full px-3.5 py-2 font-display text-xs font-bold transition-colors cursor-pointer ${dark ? "bg-orange text-cream" : "bg-ink text-cream hover:bg-orange"
              }`}
          >
            ENQUIRE
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`grid size-10 place-items-center rounded-lg border-2 cursor-pointer ${dark ? "border-cream/40" : "border-ink"
              }`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="flex w-5 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full ${dark ? "bg-cream" : "bg-ink"
                  } transition-transform duration-200 ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
              />
              <span
                className={`h-0.5 w-full ${dark ? "bg-cream" : "bg-ink"
                  } transition-opacity duration-200 ${mobileMenuOpen ? "opacity-0" : ""
                  }`}
              />
              <span
                className={`h-0.5 w-full ${dark ? "bg-cream" : "bg-ink"
                  } transition-transform duration-200 ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown via AnimatePresence (Exact aijugaad.co mobile drawer) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`overflow-hidden border-t-2 md:hidden ${dark ? "border-cream/15 bg-ink text-cream" : "border-ink bg-cream text-ink"
              }`}
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-2 py-3 font-display text-2xl font-black tracking-tight transition-colors hover:text-orange"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProjectModal?.();
                }}
                className={`mt-2 rounded-full px-6 py-3.5 text-center font-display text-base font-bold text-cream cursor-pointer transition-colors ${dark ? "bg-orange hover:bg-cream hover:text-ink" : "bg-ink hover:bg-orange"
                  }`}
              >
                START A PROJECT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
