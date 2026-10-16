"use client";

import React, { useState, useEffect, useRef } from "react";

interface FloatingEnquiryProps {
  onOpenProjectModal?: () => void;
}

export default function FloatingEnquiry({ onOpenProjectModal }: FloatingEnquiryProps) {
  const [showLabel, setShowLabel] = useState(false);
  const [pulseCount, setPulseCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const modalOpenRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initial appearance with a 600ms delay like aijugaad.co
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Monitor project modal / body overflow
  useEffect(() => {
    const handleCustomOpen = () => {
      modalOpenRef.current = true;
    };
    window.addEventListener("gnc:start-project", handleCustomOpen);

    const observer = new MutationObserver(() => {
      modalOpenRef.current = document.body.style.overflow === "hidden";
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    return () => {
      window.removeEventListener("gnc:start-project", handleCustomOpen);
      observer.disconnect();
    };
  }, []);

  // Periodic pulse & label preview every 5 seconds (starting after 2.5s)
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const triggerPulse = () => {
      if (document.hidden || modalOpenRef.current) return;
      if (!prefersReducedMotion) {
        setPulseCount((c) => c + 1);
      }
      setShowLabel(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowLabel(false), 1500);
    };

    let intervalId: NodeJS.Timeout | null = null;
    const initialTimer = setTimeout(() => {
      triggerPulse();
      intervalId = setInterval(triggerPulse, 5000);
    }, 2500);

    return () => {
      clearTimeout(initialTimer);
      if (intervalId) clearInterval(intervalId);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    if (onOpenProjectModal) {
      onOpenProjectModal();
    } else {
      window.location.href = "/contact";
    }
  };

  const isHidden = !mounted;

  return (
    <div
      className={`fixed bottom-4 right-4 z-[45] flex items-center transition-all duration-300 sm:bottom-6 sm:right-6 ${isHidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
        }`}
      aria-hidden={isHidden || undefined}
    >
      {/* Enquiry Pill Button according to our website */}
      <button
        type="button"
        tabIndex={-1}
        onClick={handleClick}
        onMouseEnter={() => setShowLabel(true)}
        className={`mr-2 origin-right whitespace-nowrap rounded-full border-2 border-ink bg-[#A1D5F5] px-3.5 py-2 font-display text-xs font-black tracking-tight text-ink shadow-[3px_3px_0_0_#0B172A] transition-all duration-200 ease-out hover:bg-white motion-reduce:transition-none cursor-pointer ${showLabel
            ? "translate-x-0 scale-100 opacity-100"
            : "pointer-events-none translate-x-3 scale-90 opacity-0"
          }`}
      >
        Fill your enquiry →
      </button>

      {/* Floating Logo Button according to our website */}
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setShowLabel(true)}
        onMouseLeave={() => setShowLabel(false)}
        aria-label="Fill your enquiry — start a project"
        title="Fill your enquiry"
        className="group relative grid size-14 place-items-center rounded-full border-2 border-ink bg-[#2D8CF0] text-white shadow-[4px_4px_0_0_#0B172A] transition-transform hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#0B172A] active:translate-y-0 sm:size-[3.75rem] cursor-pointer"
      >
        {pulseCount > 0 && (
          <span
            key={pulseCount}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#2D8CF0] animate-[enquiry-ping_1s_ease-out_forwards]"
          />
        )}

        {/* Floating Brand Logo */}
        <div className="grid size-8 sm:size-9 place-items-center rounded-full bg-white p-1 border border-ink/15 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
          <img
            src="/brand/logo.png"
            alt="GN"
            className="size-6 object-contain inline-block transition-transform duration-300 group-hover:rotate-90 sm:size-7"
          />
        </div>

        {/* Notification badge dot */}
        <span
          aria-hidden="true"
          className="absolute -right-0.5 -top-0.5 size-3.5 rounded-full border-2 border-ink bg-[#A1D5F5]"
        />
      </button>
    </div>
  );
}
