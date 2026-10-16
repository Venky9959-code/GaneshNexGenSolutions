import React from "react";
import { AsteriskBadge } from "./Icons";

const ITEMS = [
  "CUSTOM SOFTWARE",
  "WEBSITES",
  "AI AUTOMATION",
  "CRM SYSTEMS",
  "E-COMMERCE",
  "WHATSAPP BOTS",
  "CLOUD ARCHITECTURE",
  "ERP PLATFORMS",
];

export default function MarqueeTicker() {
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-[#1A4A8E] py-3.5 sm:py-4 select-none">
      <div className="animate-marquee flex w-max items-center gap-8 pr-8">
        {/* Set 1 */}
        <div className="flex items-center gap-8" aria-hidden="false">
          {ITEMS.map((item, i) => (
            <span
              key={`a-${i}`}
              className="flex items-center gap-8 font-display text-lg sm:text-2xl font-black tracking-tight text-white whitespace-nowrap"
            >
              {item}
              <AsteriskBadge className="size-4 text-[#A1D5F5]" />
            </span>
          ))}
        </div>
        {/* Set 2 (for smooth infinite repeat) */}
        <div className="flex items-center gap-8" aria-hidden="true">
          {ITEMS.map((item, i) => (
            <span
              key={`b-${i}`}
              className="flex items-center gap-8 font-display text-lg sm:text-2xl font-black tracking-tight text-white whitespace-nowrap"
            >
              {item}
              <AsteriskBadge className="size-4 text-[#A1D5F5]" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
