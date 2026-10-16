import React from "react";

const STEPS = [
  {
    num: "1",
    title: "BRIEF",
    desc: "Tell us what you need. One quick call or WhatsApp message is enough to get moving.",
  },
  {
    num: "2",
    title: "BUILD",
    desc: "Design, high-performance code and AI automation wired together — with live staging updates.",
  },
  {
    num: "3",
    title: "LAUNCH",
    desc: "You go live to paying customers. We stick around for maintenance, speed optimization and scaling.",
  },
];

export default function HowItWorks() {
  return (
    <section id="process" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 sm:py-28">
      <div>
        <p className="font-display text-sm font-bold tracking-[0.2em] text-[#2D8CF0]">
          HOW IT WORKS
        </p>
        <h2 className="mt-3 font-display text-3xl sm:text-6xl font-black uppercase tracking-tight text-ink">
          No drama. Just delivery.
        </h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="flex h-full gap-5 rounded-3xl border-2 border-ink bg-white p-7 shadow-[5px_5px_0_0_#0B172A] transition-transform hover:-translate-y-1"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#2D8CF0] font-display text-xl font-black text-white shadow-[3px_3px_0_0_#0B172A]">
              {step.num}
            </span>
            <div>
              <h3 className="font-display text-xl font-black tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-[#4A5970]">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
