"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingEnquiry from "@/components/FloatingEnquiry";
import { SparkIcon } from "@/components/Icons";

const SERVICES = [
  "Custom Software / ERP",
  "High-Converting Website",
  "AI WhatsApp Bot",
  "E-Commerce Store",
  "Mobile App (iOS/Android)",
  "Full Digital Overhaul",
];

const BUDGETS = [
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1.5 Lakh",
  "₹1.5 Lakh – ₹5 Lakh",
  "₹5 Lakh+ (Enterprise)",
];

const TIMELINES = [
  "Immediately (< 2 weeks)",
  "Within 1 month",
  "Next 2-3 months",
  "Flexible / Planning phase",
];

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadId, setLeadId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleEmailRedirect = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${service || "Custom Software"}`);
    const body = encodeURIComponent(
      `Hi Ganesh NexGen Team,\n\nI want to discuss a project:\n- Service: ${service || "Custom Software"}\n- Budget: ${budget || "To Discuss"}\n- Timeline: ${timeline || "Flexible"}\n- Name: ${name}\n- Contact: ${phone || email}\n- Notes: ${notes || "N/A"}`
    );
    window.open(`mailto:contact@ganeshnexgen.com?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: service || "Custom Software / Web",
          budget: budget || "To Discuss",
          timeline: timeline || "Flexible",
          name,
          phone,
          email,
          notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLeadId(data.leadNumber);
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || "Submission error. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F0F4F8] text-[#0B172A]">
      <Navbar />
      <FloatingEnquiry />

      <section className="dot-grid pt-28 pb-16 sm:pt-36 sm:pb-24 border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <p className="font-display text-xs sm:text-sm font-bold tracking-[0.2em] text-[#2D8CF0]">
            START A PROJECT
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-7xl font-black uppercase tracking-tight text-ink">
            Tell us your vision.
            <span className="block text-[#2D8CF0]">We cook the software.</span>
          </h1>
          <p className="mt-4 max-w-md mx-auto text-base sm:text-lg font-semibold text-[#4A5970]">
            Four quick steps. No endless forms, no calls if you don&apos;t want them. Direct engineer response in 24 hours.
          </p>

          {/* Quick Direct Email row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:contact@ganeshnexgen.com"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-5 py-2 font-display text-xs sm:text-sm font-bold text-ink shadow-[3px_3px_0_0_#0B172A] hover:bg-[#A1D5F5] transition-all"
            >
              <span>✉</span> Email: contact@ganeshnexgen.com
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-16 sm:py-24">
        <div className="rounded-3xl border-2 border-ink bg-white p-6 sm:p-10 shadow-[8px_8px_0_0_#0B172A]">
          {submitted ? (
            <div className="py-12 text-center">
              <div className="mx-auto grid size-20 place-items-center rounded-2xl bg-white border-2 border-ink shadow-[4px_4px_0_0_#2D8CF0] p-3">
                <img
                  src="/brand/logo.png"
                  alt="Ganesh NexGen Co"
                  className="size-14 object-contain"
                />
              </div>
              <h2 className="mt-6 font-display text-3xl font-black uppercase tracking-tight text-ink">
                Inquiry Received!
              </h2>
              {leadId && (
                <span className="mt-3 inline-block rounded-full border-2 border-ink bg-yellow px-4 py-1.5 font-mono text-sm font-bold text-ink shadow-xs">
                  Reference: {leadId}
                </span>
              )}
              <p className="mt-3 text-base font-semibold text-[#4A5970] max-w-md mx-auto">
                Thanks {name || "friend"}! We have received your project details. Our lead engineer will review and reach out within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setLeadId("");
                  setStep(1);
                }}
                className="mt-8 rounded-full border-2 border-ink bg-[#2D8CF0] px-8 py-3.5 font-display text-sm font-black text-white shadow-[4px_4px_0_0_#0B172A] hover:bg-[#1A4A8E] transition-colors cursor-pointer"
              >
                SUBMIT ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <div>
              {/* Step 1 */}
              {step === 1 && (
                <div>
                  <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-6">
                    <span className="font-display text-xs font-black tracking-widest text-[#2D8CF0] uppercase">
                      STEP 1 OF 4
                    </span>
                    <span className="font-display text-xs font-bold text-[#4A5970]">SERVICE</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-ink">
                    What would you like built?
                  </h2>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setService(s)}
                        className={`rounded-2xl border-2 border-ink p-4 text-left font-display text-sm font-bold transition-all shadow-[3px_3px_0_0_#0B172A] cursor-pointer ${
                          service === s
                            ? "bg-[#2D8CF0] text-white scale-105"
                            : "bg-[#F0F4F8] text-ink hover:bg-[#A1D5F5]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      disabled={!service}
                      onClick={() => setStep(2)}
                      className="rounded-full border-2 border-ink bg-[#0B172A] px-8 py-3 font-display text-xs sm:text-sm font-black text-white shadow-[4px_4px_0_0_#2D8CF0] disabled:opacity-40 hover:bg-[#2D8CF0] transition-colors cursor-pointer"
                    >
                      CONTINUE TO BUDGET →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-6">
                    <span className="font-display text-xs font-black tracking-widest text-[#2D8CF0] uppercase">
                      STEP 2 OF 4
                    </span>
                    <span className="font-display text-xs font-bold text-[#4A5970]">BUDGET</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-ink">
                    What is your target budget?
                  </h2>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className={`rounded-2xl border-2 border-ink p-4 text-left font-display text-sm font-bold transition-all shadow-[3px_3px_0_0_#0B172A] cursor-pointer ${
                          budget === b
                            ? "bg-[#2D8CF0] text-white scale-[1.02]"
                            : "bg-[#F0F4F8] text-ink hover:bg-[#A1D5F5]"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setStep(1)}
                      className="rounded-full border-2 border-ink bg-[#F0F4F8] px-6 py-2.5 font-display text-xs font-bold text-ink cursor-pointer"
                    >
                      ← BACK
                    </button>
                    <button
                      disabled={!budget}
                      onClick={() => setStep(3)}
                      className="rounded-full border-2 border-ink bg-[#0B172A] px-8 py-3 font-display text-xs sm:text-sm font-black text-white shadow-[4px_4px_0_0_#2D8CF0] disabled:opacity-40 hover:bg-[#2D8CF0] transition-colors cursor-pointer"
                    >
                      CONTINUE TO TIMELINE →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div>
                  <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-6">
                    <span className="font-display text-xs font-black tracking-widest text-[#2D8CF0] uppercase">
                      STEP 3 OF 4
                    </span>
                    <span className="font-display text-xs font-bold text-[#4A5970]">TIMELINE</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-ink">
                    When do you want to launch?
                  </h2>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TIMELINES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTimeline(t)}
                        className={`rounded-2xl border-2 border-ink p-4 text-left font-display text-sm font-bold transition-all shadow-[3px_3px_0_0_#0B172A] cursor-pointer ${
                          timeline === t
                            ? "bg-[#2D8CF0] text-white scale-[1.02]"
                            : "bg-[#F0F4F8] text-ink hover:bg-[#A1D5F5]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setStep(2)}
                      className="rounded-full border-2 border-ink bg-[#F0F4F8] px-6 py-2.5 font-display text-xs font-bold text-ink cursor-pointer"
                    >
                      ← BACK
                    </button>
                    <button
                      disabled={!timeline}
                      onClick={() => setStep(4)}
                      className="rounded-full border-2 border-ink bg-[#0B172A] px-8 py-3 font-display text-xs sm:text-sm font-black text-white shadow-[4px_4px_0_0_#2D8CF0] disabled:opacity-40 hover:bg-[#2D8CF0] transition-colors cursor-pointer"
                    >
                      FINAL DETAILS →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-ink pb-3 mb-6">
                    <span className="font-display text-xs font-black tracking-widest text-[#2D8CF0] uppercase">
                      STEP 4 OF 4
                    </span>
                    <span className="font-display text-xs font-bold text-[#4A5970]">CONTACT</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-ink">
                    Where should we send your proposal?
                  </h2>
                  <div>
                    <label className="block font-display text-xs font-bold uppercase text-ink">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Sharma"
                      className="mt-1 w-full rounded-2xl border-2 border-ink bg-[#F0F4F8] px-4 py-3 text-base text-ink placeholder:text-[#4A5970] focus:outline-none focus:ring-2 focus:ring-[#2D8CF0]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-display text-xs font-bold uppercase text-ink">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="mt-1 w-full rounded-2xl border-2 border-ink bg-[#F0F4F8] px-4 py-3 text-base text-ink placeholder:text-[#4A5970] focus:outline-none focus:ring-2 focus:ring-[#2D8CF0]"
                      />
                    </div>
                    <div>
                      <label className="block font-display text-xs font-bold uppercase text-ink">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="mt-1 w-full rounded-2xl border-2 border-ink bg-[#F0F4F8] px-4 py-3 text-base text-ink placeholder:text-[#4A5970] focus:outline-none focus:ring-2 focus:ring-[#2D8CF0]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-display text-xs font-bold uppercase text-ink">
                      Project Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tell us what you want to achieve or any reference websites/apps..."
                      className="mt-1 w-full rounded-2xl border-2 border-ink bg-[#F0F4F8] px-4 py-3 text-base text-ink placeholder:text-[#4A5970] focus:outline-none focus:ring-2 focus:ring-[#2D8CF0]"
                    />
                  </div>

                  {errorMsg && (
                    <p className="text-xs font-bold text-red-600 bg-red-100 p-3 rounded-xl border border-red-300">
                      {errorMsg}
                    </p>
                  )}

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 rounded-full border-2 border-ink bg-[#0B172A] py-3.5 font-display text-sm font-black text-white shadow-[5px_5px_0_0_#2D8CF0] hover:bg-[#2D8CF0] transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? "TRANSMITTING..." : "SUBMIT INQUIRY ✦"}
                    </button>
                    <button
                      type="button"
                      onClick={handleEmailRedirect}
                      className="flex-1 rounded-full border-2 border-ink bg-[#A1D5F5] py-3.5 font-display text-sm font-black text-ink shadow-[5px_5px_0_0_#0B172A] hover:bg-white transition-colors cursor-pointer"
                    >
                      SEND VIA EMAIL ✉
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
