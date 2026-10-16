"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StartProjectModal from "@/components/StartProjectModal";
import FloatingEnquiry from "@/components/FloatingEnquiry";
import { SparkIcon } from "@/components/Icons";

const INSIGHTS = [
  {
    num: "1",
    title: "Don’t give your customers too many options",
    summary:
      "A customer sees 40 products or 15 service tiers, can’t decide, and leaves. Confusion doesn’t lead to a purchase — it leads to an exit.",
    action:
      "Keep only your bestsellers and high-margin offers up front. Whatever already converts the most should be the first thing anyone sees.",
    exampleText: "Live on our client stores: Bestsellers first — everything else is just one tap away.",
  },
  {
    num: "2",
    title: "They saw your reel or ad — then couldn’t find it",
    summary:
      "Someone clicks from a viral Instagram reel or LinkedIn post. They don’t remember the product’s exact SKU name — only what it looked like in the video, and you can’t type a visual memory into search.",
    action:
      "A live dynamic strip of your reels on the homepage fixes this: they spot the exact clip, tap it, and land straight on the 1-click buy page.",
    exampleText: "Custom built with auto-sync: every video card links directly to its checkout page.",
  },
  {
    num: "3",
    title: "Nobody trusts polished studio photos anymore",
    summary:
      "Buyers don’t trust stock photos or overly airbrushed 3D renders anymore — they read them as corporate ads. The real question in a buyer's head is 'what will this look like in real life?'",
    action:
      "One authentic customer WhatsApp review or photo — normal lighting, real environment — sells more than ten polished studio mockups.",
    exampleText: "Live on websites we build: real verified customer WhatsApp messages right next to the price.",
  },
  {
    num: "4",
    title: "Bonus — make your navbar sell 24/7",
    summary:
      "Most navbars are just a boring list of links. Put one bright, glowing 'START A PROJECT' or 'ENQUIRE NOW' button in it, and it works on every page, at every scroll depth.",
    action:
      "The moment a visitor decides to buy or enquire, the next step is already right under their thumb without searching.",
    exampleText: "The glowing action button rides the navigation everywhere.",
  },
];

export default function WhyUsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F0F4F8] text-[#0B172A]">
      <Navbar onOpenProjectModal={() => setIsModalOpen(true)} />
      <FloatingEnquiry onOpenProjectModal={() => setIsModalOpen(true)} />

      {/* Main Article Container */}
      <div className="px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36">
        <article className="mx-auto max-w-3xl rounded-3xl border-2 border-ink bg-white px-6 py-10 shadow-[8px_8px_0_0_#0B172A] sm:px-14 sm:py-14">
          <header>
            <h1 className="font-display text-[clamp(1.7rem,4.5vw,2.8rem)] font-black uppercase leading-[1.05] tracking-tight text-ink">
              3 things to <span className="text-[#2D8CF0]">increase your sales</span>
            </h1>
            <div className="mt-4 h-1 w-14 rounded-full bg-[#2D8CF0]" />
          </header>

          {/* 4 Insights */}
          <div className="mt-12 divide-y-2 divide-ink/10">
            {INSIGHTS.map((item) => (
              <section key={item.num} className="pt-10 pb-8 first:pt-0">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#0B172A] font-display text-xs font-black text-white shadow-[2px_2px_0_0_#2D8CF0]">
                    {item.num}
                  </span>
                  <h2 className="font-display text-lg sm:text-[1.35rem] font-black uppercase leading-tight tracking-tight text-ink">
                    {item.title}
                  </h2>
                </div>

                <div className="mt-5 space-y-4">
                  <p className="text-[15px] sm:text-base font-semibold leading-[1.7] text-[#4A5970]">
                    {item.summary}
                  </p>
                  <p className="rounded-r-xl border-l-4 border-[#2D8CF0] bg-[#F0F4F8] py-3.5 pl-4 pr-4 text-[15px] sm:text-base font-bold leading-relaxed text-ink">
                    {item.action}
                  </p>
                  <div className="rounded-2xl border-2 border-ink bg-[#A1D5F5]/30 p-4">
                    <p className="font-display text-xs font-black uppercase tracking-wider text-[#1A4A8E]">
                      ✦ Real-World Proof
                    </p>
                    <p className="mt-1 text-xs sm:text-sm font-semibold text-[#0B172A]">
                      {item.exampleText}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </article>

        {/* Bottom CTA Block */}
        <div className="mx-auto mt-14 max-w-3xl text-center">
          <p className="font-display text-xs font-black tracking-[0.22em] text-[#4A5970]">
            RECOGNISED YOUR STORE OR BRAND IN THESE?
          </p>
          <div className="relative mt-5 inline-block">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-3 rounded-full border-2 border-ink bg-[#2D8CF0] px-8 py-4 font-display text-base sm:text-2xl font-black tracking-tight text-white shadow-[7px_7px_0_0_#0B172A] transition-all hover:-translate-y-1 hover:shadow-[9px_9px_0_0_#0B172A] active:translate-y-0 cursor-pointer"
            >
              <img
                src="/brand/logo.png"
                alt="GN"
                className="size-6 object-contain inline-block transition-transform duration-300 group-hover:rotate-90 sm:size-7"
              />
              GET YOUR WEBSITE TODAY
            </button>
            <span className="absolute -right-3 -top-3 sm:-right-5 rotate-6 rounded-full border-2 border-ink bg-[#A1D5F5] px-3 py-1 font-display text-[0.65rem] sm:text-[0.72rem] font-black tracking-wide text-ink shadow-[2px_2px_0_0_#0B172A]">
              WE REPLY IN 24 HRS
            </span>
          </div>
          <p className="mt-4 text-sm font-medium text-[#4A5970]">
            Four quick steps — no endless calls, no forms that never end.
          </p>
          <div className="mt-6">
            <Link
              href="/#work"
              className="inline-block rounded-full border-2 border-ink bg-white px-7 py-3 font-display text-xs sm:text-sm font-black tracking-wide text-ink transition-colors hover:bg-[#A1D5F5]"
            >
              SEE OUR WORK →
            </Link>
          </div>
        </div>
      </div>

      <Footer />
      <StartProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
