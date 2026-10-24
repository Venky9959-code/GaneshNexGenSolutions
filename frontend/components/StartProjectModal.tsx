"use client";

import React, { useState } from "react";
import { SparkIcon } from "./Icons";

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export default function StartProjectModal({ isOpen, onClose }: StartProjectModalProps) {
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

  if (!isOpen) return null;

  const handleEmailRedirect = () => {
    const subject = encodeURIComponent(`New Project Inquiry: ${service || "Custom Software"}`);
    const body = encodeURIComponent(
      `Hi Ganesh NexGen Team,\n\nI want to discuss a project:\n- Service: ${service || "Custom Software"}\n- Budget: ${budget || "To Discuss"}\n- Timeline: ${timeline || "Flexible"}\n- Name: ${name}\n- Contact: ${phone || email}\n- Notes: ${notes || "N/A"}`
    );
    window.open(`mailto:contact@ganeshnexgen.website?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
  };

  const getSessionId = () => {
    if (typeof window === "undefined") return "";
    let sid = sessionStorage.getItem("gns_session_id");
    if (!sid) {
      sid = "sess_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now();
      sessionStorage.setItem("gns_session_id", sid);
    }
    return sid;
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
          sessionId: getSessionId(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setLeadId(data.leadNumber);
        setSubmitted(true);
        if (typeof window !== "undefined") {
          sessionStorage.setItem("gns_submitted_lead", data.leadNumber);
        }
      } else {
        if (data.rateLimited && data.leadNumber) {
          setLeadId(data.leadNumber);
          setSubmitted(true);
        }
        setErrorMsg(data.error || "Submission failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Inquiry error:", err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setIsSubmitting(false);
    setLeadId("");
    setErrorMsg("");
    setStep(1);
    setService("");
    setBudget("");
    setTimeline("");
    setName("");
    setPhone("");
    setEmail("");
    setNotes("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B172A]/75 p-4 backdrop-blur-sm"
      onClick={resetAndClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl border-2 border-ink bg-[#F0F4F8] p-6 sm:p-8 shadow-[8px_8px_0_0_#0B172A] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b-2 border-ink pb-4">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg border border-ink/20 bg-white p-1 shadow-[1px_1px_0_0_#2D8CF0]">
              <img
                src="/brand/logo.png"
                alt="Ganesh NexGen Co Logo"
                className="size-5 object-contain"
              />
            </span>
            <span className="font-display text-sm font-black tracking-tight text-ink">
              START A PROJECT
            </span>
          </div>
          <button
            onClick={resetAndClose}
            className="grid size-8 place-items-center rounded-full border-2 border-ink bg-white font-display text-sm font-black text-ink hover:bg-[#A1D5F5] shadow-[2px_2px_0_0_#0B172A] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-white border-2 border-ink shadow-[4px_4px_0_0_#2D8CF0] p-2.5">
              <img
                src="/brand/logo.png"
                alt="Ganesh NexGen Co Logo"
                className="size-10 object-contain"
              />
            </div>
            <h3 className="mt-5 font-display text-2xl font-black uppercase tracking-tight text-ink">
              Inquiry Received!
            </h3>
            {leadId && (
              <span className="mt-2 inline-block rounded-full border-2 border-ink bg-yellow px-3 py-1 font-mono text-xs font-bold text-ink shadow-xs">
                Ref: {leadId}
              </span>
            )}
            <p className="mt-2 text-sm font-semibold text-[#4A5970] max-w-xs mx-auto">
              Thanks {name || "friend"}! Our engineering team will review your requirements and reach out within 24 hours.
            </p>
            <button
              onClick={resetAndClose}
              className="mt-6 rounded-full border-2 border-ink bg-[#2D8CF0] px-6 py-2.5 font-display text-xs font-black text-white shadow-[3px_3px_0_0_#0B172A] cursor-pointer hover:bg-[#1A4A8E]"
            >
              DONE
            </button>
          </div>
        ) : (
          <div className="pt-6">
            {/* Step 1: Service */}
            {step === 1 && (
              <div>
                <p className="font-display text-xs font-black tracking-[0.18em] text-[#2D8CF0]">
                  STEP 1 OF 4
                </p>
                <h3 className="mt-1 font-display text-2xl font-black tracking-tight text-ink">
                  What do you need built?
                </h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setService(s)}
                      className={`rounded-2xl border-2 border-ink p-3 text-left font-display text-xs font-bold transition-all shadow-[2px_2px_0_0_#0B172A] cursor-pointer ${
                        service === s
                          ? "bg-[#2D8CF0] text-white scale-[1.02]"
                          : "bg-white text-ink hover:bg-[#A1D5F5]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    disabled={!service}
                    onClick={() => setStep(2)}
                    className="rounded-full border-2 border-ink bg-[#0B172A] px-6 py-2.5 font-display text-xs font-black text-white shadow-[3px_3px_0_0_#2D8CF0] disabled:opacity-40 cursor-pointer hover:bg-[#2D8CF0]"
                  >
                    NEXT STEP →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Budget */}
            {step === 2 && (
              <div>
                <p className="font-display text-xs font-black tracking-[0.18em] text-[#2D8CF0]">
                  STEP 2 OF 4
                </p>
                <h3 className="mt-1 font-display text-2xl font-black tracking-tight text-ink">
                  What is your target budget?
                </h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`rounded-2xl border-2 border-ink p-3 text-left font-display text-xs font-bold transition-all shadow-[2px_2px_0_0_#0B172A] cursor-pointer ${
                        budget === b
                          ? "bg-[#2D8CF0] text-white scale-[1.02]"
                          : "bg-white text-ink hover:bg-[#A1D5F5]"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="rounded-full border-2 border-ink bg-white px-5 py-2 font-display text-xs font-bold text-ink cursor-pointer"
                  >
                    ← BACK
                  </button>
                  <button
                    disabled={!budget}
                    onClick={() => setStep(3)}
                    className="rounded-full border-2 border-ink bg-[#0B172A] px-6 py-2.5 font-display text-xs font-black text-white shadow-[3px_3px_0_0_#2D8CF0] disabled:opacity-40 cursor-pointer hover:bg-[#2D8CF0]"
                  >
                    NEXT STEP →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Timeline */}
            {step === 3 && (
              <div>
                <p className="font-display text-xs font-black tracking-[0.18em] text-[#2D8CF0]">
                  STEP 3 OF 4
                </p>
                <h3 className="mt-1 font-display text-2xl font-black tracking-tight text-ink">
                  When do you want to launch?
                </h3>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TIMELINES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTimeline(t)}
                      className={`rounded-2xl border-2 border-ink p-3 text-left font-display text-xs font-bold transition-all shadow-[2px_2px_0_0_#0B172A] cursor-pointer ${
                        timeline === t
                          ? "bg-[#2D8CF0] text-white scale-[1.02]"
                          : "bg-white text-ink hover:bg-[#A1D5F5]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="rounded-full border-2 border-ink bg-white px-5 py-2 font-display text-xs font-bold text-ink cursor-pointer"
                  >
                    ← BACK
                  </button>
                  <button
                    disabled={!timeline}
                    onClick={() => setStep(4)}
                    className="rounded-full border-2 border-ink bg-[#0B172A] px-6 py-2.5 font-display text-xs font-black text-white shadow-[3px_3px_0_0_#2D8CF0] disabled:opacity-40 cursor-pointer hover:bg-[#2D8CF0]"
                  >
                    FINAL STEP →
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Contact & Submission */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-3">
                <p className="font-display text-xs font-black tracking-[0.18em] text-[#2D8CF0]">
                  STEP 4 OF 4
                </p>
                <h3 className="font-display text-2xl font-black tracking-tight text-ink">
                  Where do we send the plan?
                </h3>
                <div>
                  <label className="block font-display text-[0.65rem] font-bold uppercase text-ink">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                    className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm text-ink placeholder:text-[#4A5970] focus:outline-none focus:ring-2 focus:ring-[#2D8CF0]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-display text-[0.65rem] font-bold uppercase text-ink">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm text-ink placeholder:text-[#4A5970] focus:outline-none focus:ring-2 focus:ring-[#2D8CF0]"
                    />
                  </div>
                  <div>
                    <label className="block font-display text-[0.65rem] font-bold uppercase text-ink">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm text-ink placeholder:text-[#4A5970] focus:outline-none focus:ring-2 focus:ring-[#2D8CF0]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-display text-[0.65rem] font-bold uppercase text-ink">
                    Project Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Tell us any specific features or inspiration links..."
                    className="mt-1 w-full rounded-xl border-2 border-ink bg-white px-3 py-2 text-sm text-ink placeholder:text-[#4A5970] focus:outline-none focus:ring-2 focus:ring-[#2D8CF0]"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs font-bold text-red-600 bg-red-100 p-2 rounded-lg border border-red-300">
                    {errorMsg}
                  </p>
                )}

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-full border-2 border-ink bg-[#0B172A] py-2.5 font-display text-xs font-black text-white shadow-[4px_4px_0_0_#2D8CF0] hover:bg-[#2D8CF0] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? "SENDING INQUIRY..." : "SUBMIT INQUIRY ✦"}
                  </button>
                  <button
                    type="button"
                    onClick={handleEmailRedirect}
                    className="flex-1 rounded-full border-2 border-ink bg-[#A1D5F5] py-2.5 font-display text-xs font-black text-ink shadow-[4px_4px_0_0_#0B172A] hover:bg-white transition-colors cursor-pointer"
                  >
                    SEND VIA EMAIL ↗
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
