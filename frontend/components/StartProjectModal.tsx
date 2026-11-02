"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { SparkIcon } from "./Icons";

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Country {
  iso: string;
  code: string;
  flag: string;
  name: string;
  digits?: number;
}

const COUNTRIES: Country[] = [
  { iso: "IN", code: "+91", flag: "🇮🇳", name: "India", digits: 10 },
  { iso: "US", code: "+1", flag: "🇺🇸", name: "United States", digits: 10 },
  { iso: "GB", code: "+44", flag: "🇬🇧", name: "United Kingdom", digits: 10 },
  { iso: "AE", code: "+971", flag: "🇦🇪", name: "UAE", digits: 9 },
  { iso: "CA", code: "+1", flag: "🇨🇦", name: "Canada", digits: 10 },
  { iso: "AU", code: "+61", flag: "🇦🇺", name: "Australia", digits: 9 },
  { iso: "SG", code: "+65", flag: "🇸🇬", name: "Singapore", digits: 8 },
  { iso: "SA", code: "+966", flag: "🇸🇦", name: "Saudi Arabia", digits: 9 },
  { iso: "QA", code: "+974", flag: "🇶🇦", name: "Qatar", digits: 8 },
  { iso: "KW", code: "+965", flag: "🇰🇼", name: "Kuwait", digits: 8 },
  { iso: "DE", code: "+49", flag: "🇩🇪", name: "Germany", digits: 11 },
  { iso: "FR", code: "+33", flag: "🇫🇷", name: "France", digits: 9 },
];

const SERVICES = [
  "Custom Software / ERP",
  "High-Converting Website",
  "AI WhatsApp Bot",
  "E-Commerce Store",
  "Mobile App (iOS/Android)",
  "Full Digital Overhaul",
];

const BUDGETS = [
  { range: "Under ₹25,000", desc: "Starter projects" },
  { range: "₹25,000 – ₹50,000", desc: "Small business projects" },
  { range: "₹50,000 – ₹1.5 Lakh", desc: "Growing businesses" },
  { range: "₹1.5 Lakh – ₹5 Lakh", desc: "Advanced solutions" },
  { range: "₹5 Lakh+ (Enterprise)", desc: "Large-scale projects" },
  { range: "Not Sure – Need Guidance", desc: "Let's discuss your idea" },
];

const PROBLEMS = [
  "New website",
  "Website redesign for more sales",
  "Low conversion rate",
  "High bounce rate",
  "Automate WhatsApp leads",
  "Custom software / ERP",
  "Sub-second speed & performance",
  "Local SEO & Google rank",
  "Bug fixes & maintenance",
  "Others",
];

const STEPS_CONFIG: Record<
  number,
  { kicker: string; title: string; hint: string }
> = {
  1: {
    kicker: "STEP 1 OF 7",
    title: "What should we call you?",
    hint: "First name is plenty.",
  },
  2: {
    kicker: "STEP 2 OF 7",
    title: "Your phone number?",
    hint: "So we can reach you. We do not spam.",
  },
  3: {
    kicker: "STEP 3 OF 7",
    title: "What are you looking for?",
    hint: "Pick as many as you like.",
  },
  4: {
    kicker: "STEP 4 OF 7",
    title: "Tell us about your business",
    hint: "In short — what you do, and where you want to get to.",
  },
  5: {
    kicker: "STEP 5 OF 7",
    title: "What's your brand called?",
    hint: "The name your customers know you by.",
  },
  6: {
    kicker: "STEP 6 OF 7",
    title: "Where can we reach you?",
    hint: "Your email, and your website if you have one.",
  },
  7: {
    kicker: "STEP 7 OF 7",
    title: "Where is your brand today?",
    hint: "Two quick picks — it tells us how to help before we call.",
  },
};

const inputClass =
  "w-full rounded-xl border-2 border-ink bg-cream px-4 py-3.5 text-base font-medium text-ink outline-none transition-shadow placeholder:text-ink/35 focus:shadow-[3px_3px_0_0_#ff4d00]";

export default function StartProjectModal({
  isOpen,
  onClose,
}: StartProjectModalProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [countryIso, setCountryIso] = useState("IN");
  const [phone, setPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [brief, setBrief] = useState("");
  const [brandName, setBrandName] = useState("");
  const [email, setEmail] = useState("");
  const [hasWebsite, setHasWebsite] = useState<boolean | null>(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [otherProblems, setOtherProblems] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [leadId, setLeadId] = useState("");
  const [isDone, setIsDone] = useState(false);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Focus input automatically on step changes
  useEffect(() => {
    if (isOpen && [1, 2, 4, 5, 6].includes(step)) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, step]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
    if (isDone) {
      setTimeout(() => {
        setIsDone(false);
        setStep(1);
        setName("");
        setPhone("");
        setSelectedServices([]);
        setBrief("");
        setBrandName("");
        setEmail("");
        setHasWebsite(null);
        setWebsiteUrl("");
        setSelectedBudget("");
        setSelectedProblems([]);
        setOtherProblems("");
        setLeadId("");
        setErrorMsg("");
      }, 300);
    }
  }, [onClose, isDone]);

  if (!isOpen) return null;

  const currentCountry =
    COUNTRIES.find((c) => c.iso === countryIso) || COUNTRIES[0];

  const wordCount = brief.trim().split(/\s+/).filter(Boolean).length;

  const toggleArrayItem = (list: string[], item: string) => {
    return list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
  };

  const validatePhone = (iso: string, p: string): string | null => {
    const digits = p.replace(/[^0-9]/g, "");
    if (iso === "IN") {
      if (/^[6-9]\d{9}$/.test(digits)) return null;
      if (digits.length === 10)
        return "An Indian mobile number starts with 6, 7, 8 or 9.";
      return "Enter a 10-digit Indian mobile number.";
    }
    const c = COUNTRIES.find((x) => x.iso === iso);
    if (c?.digits && digits.length !== c.digits) {
      return `That number should be ${c.digits} digits.`;
    }
    if (digits.length < 6 || digits.length > 15) {
      return "That phone number doesn't look right.";
    }
    return null;
  };

  const handleNextOrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMsg("");

    if (honeypot.trim().length > 0) {
      setIsDone(true);
      return;
    }

    try {
      if (step === 1) {
        if (name.trim().length < 2) {
          throw new Error("Please enter your name.");
        }
        setStep(2);
      } else if (step === 2) {
        const phoneError = validatePhone(countryIso, phone);
        if (phoneError) throw new Error(phoneError);
        setStep(3);
      } else if (step === 3) {
        if (selectedServices.length === 0) {
          throw new Error("Please pick at least one service.");
        }
        setStep(4);
      } else if (step === 4) {
        if (brief.trim().length < 3) {
          throw new Error("A line about your brand helps us reply faster.");
        }
        setStep(5);
      } else if (step === 5) {
        if (brandName.trim().length < 2) {
          throw new Error("Tell us your brand's name.");
        }
        setStep(6);
      } else if (step === 6) {
        if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.trim())) {
          throw new Error("Enter a valid email address.");
        }
        if (hasWebsite === null) {
          throw new Error("Do you already have a website? Select Yes or No.");
        }
        if (hasWebsite && websiteUrl.trim().length < 4) {
          throw new Error("Enter your website address.");
        }
        setStep(7);
      } else if (step === 7) {
        if (!selectedBudget) {
          throw new Error("Please select your target budget.");
        }
        if (selectedProblems.length === 0) {
          throw new Error("Pick at least one thing you'd like fixed.");
        }

        // Final Submission to API
        setIsSubmitting(true);
        const fullPhone = `${currentCountry.code} ${phone.trim()}`;
        const res = await fetch("/api/inquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            phone: fullPhone,
            email: email.trim(),
            service: selectedServices.join(", "),
            budget: selectedBudget,
            timeline: "Standard",
            brief: brief.trim(),
            brandName: brandName.trim(),
            website: hasWebsite ? websiteUrl.trim() : "None",
            problems: selectedProblems,
            problemsOther: selectedProblems.includes("Others")
              ? otherProblems.trim()
              : "",
            honeypot,
          }),
        });

        const data = await res.json();
        if (data.success || data.rateLimited) {
          setLeadId(data.leadNumber || "GNS-" + Math.floor(100000 + Math.random() * 900000));
          setIsDone(true);
        } else {
          throw new Error(data.error || "Could not save your inquiry. Please try again.");
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isNextDisabled = () => {
    if (step === 1) return name.trim().length < 2;
    if (step === 2) return phone.trim().length < 6;
    if (step === 3) return selectedServices.length === 0;
    if (step === 4) return brief.trim().length < 3;
    if (step === 5) return brandName.trim().length < 2;
    if (step === 6)
      return (
        !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.trim()) ||
        hasWebsite === null ||
        (hasWebsite && websiteUrl.trim().length < 4)
      );
    if (step === 7) return !selectedBudget || selectedProblems.length === 0;
    return false;
  };

  const pillClass = (active: boolean) =>
    `rounded-full border-2 border-ink px-4 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
      active
        ? "bg-orange text-cream shadow-[2px_2px_0_0_#141414] scale-[1.02]"
        : "bg-cream hover:bg-yellow text-ink shadow-xs"
    }`;

  const currentConfig = STEPS_CONFIG[step] || STEPS_CONFIG[1];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 animate-fade-in"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-ink/65 backdrop-blur-sm" />

      {/* Modal Card */}
      <div
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Start a project"
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl border-2 border-ink bg-paper p-6 sm:p-8 shadow-[7px_7px_0_0_#141414] outline-none animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border-2 border-ink bg-cream transition-colors hover:bg-orange hover:text-cream cursor-pointer z-10"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {isDone ? (
          /* Done / Success Screen matching aijugaad.co */
          <div className="py-6 text-center sm:py-10">
            <SparkIcon className="mx-auto size-12 text-orange animate-bounce" />
            <h2 className="mt-5 font-display text-3xl font-black uppercase leading-[1.05] tracking-tight sm:text-4xl text-ink">
              YOU&apos;RE ALL SET!
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm font-medium leading-relaxed text-ink/70 sm:text-base">
              That&apos;s everything we need. Expect to hear from us within 24 hours.
            </p>
            {leadId && (
              <span className="mt-3 inline-block rounded-full border-2 border-ink bg-yellow px-3.5 py-1 font-mono text-xs font-bold text-ink shadow-xs">
                Ref: {leadId}
              </span>
            )}
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/919390564946?text=${encodeURIComponent(
                  `Hi Ganesh NexGen Solutions, I just submitted an inquiry (Ref: ${leadId}) for ${brandName || "my project"}. Let's discuss!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-[#25D366] px-6 py-3 font-display text-xs font-bold text-ink shadow-[3px_3px_0_0_#141414] hover:-translate-y-0.5 transition-transform"
              >
                <span>💬</span> CHAT ON WHATSAPP NOW →
              </a>
              <Link
                href="/work"
                onClick={handleClose}
                className="w-full sm:w-auto inline-block rounded-full border-2 border-ink bg-ink px-6 py-3 font-display text-xs font-bold text-cream shadow-[3px_3px_0_0_#ff4d00] hover:-translate-y-0.5 transition-transform"
              >
                SEE OUR WORK
              </Link>
            </div>
          </div>
        ) : (
          /* 7-Step Multi-step Enquiry Form */
          <>
            {/* Kicker, Title, and Hint */}
            <p className="font-display text-[0.65rem] font-black tracking-[0.2em] text-orange uppercase">
              {currentConfig.kicker}
            </p>
            <h2 className="mt-2 pr-10 font-display text-2xl font-black uppercase leading-[1.05] tracking-tight sm:text-3xl text-ink">
              {currentConfig.title}
            </h2>
            <p className="mt-1.5 text-sm font-medium text-ink/55">
              {currentConfig.hint}
            </p>

            <form onSubmit={handleNextOrSubmit} className="mt-5">
              {/* STEP 1: Name */}
              {step === 1 && (
                <div>
                  <input
                    ref={(el) => {
                      inputRef.current = el;
                    }}
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                          .replace(/[^\p{L}\p{M} .'-]/gu, "")
                          .replace(/\s{2,}/g, " ")
                          .slice(0, 30)
                      )
                    }
                    aria-label="Your name"
                    placeholder="Your name"
                    required
                    maxLength={30}
                    className={inputClass}
                  />
                  {/* Honeypot field */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    aria-hidden="true"
                  />
                </div>
              )}

              {/* STEP 2: Phone Number with Country Select */}
              {step === 2 && (
                <div className="flex gap-2">
                  <div className="relative shrink-0">
                    <div className="flex h-full items-center gap-1.5 rounded-xl border-2 border-ink bg-cream px-3.5 text-base font-medium text-ink">
                      <span className="text-lg leading-none">
                        {currentCountry.flag}
                      </span>
                      <span>{currentCountry.code}</span>
                      <svg
                        viewBox="0 0 24 24"
                        className="size-3.5 text-ink/50"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                    <select
                      value={countryIso}
                      onChange={(e) => {
                        const newIso = e.target.value;
                        setCountryIso(newIso);
                        const c = COUNTRIES.find((x) => x.iso === newIso);
                        if (c?.digits && phone.length > c.digits) {
                          setPhone((p) => p.slice(0, c.digits));
                        }
                      }}
                      aria-label="Country code"
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.iso} value={c.iso}>
                          {c.flag} {c.name} ({c.code})
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    ref={(el) => {
                      inputRef.current = el;
                    }}
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value
                          .replace(/[^0-9]/g, "")
                          .slice(0, currentCountry.digits || 15)
                      )
                    }
                    aria-label="Phone number"
                    placeholder={
                      currentCountry.digits
                        ? `${currentCountry.digits} digits`
                        : "Phone number"
                    }
                    required
                    maxLength={currentCountry.digits || 15}
                    className={`${inputClass} min-w-0 flex-1`}
                  />
                </div>
              )}

              {/* STEP 3: Services (Multi-select) */}
              {step === 3 && (
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => {
                    const isSelected = selectedServices.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() =>
                          setSelectedServices((prev) => toggleArrayItem(prev, s))
                        }
                        className={pillClass(isSelected)}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* STEP 4: Tell us about your business */}
              {step === 4 && (
                <div>
                  <textarea
                    ref={(el) => {
                      inputRef.current = el;
                    }}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value.slice(0, 3000))}
                    aria-label="About your business and what you need"
                    placeholder="e.g. We sell products online and want an automated WhatsApp booking engine with a sub-0.5s Next.js web storefront..."
                    rows={4}
                    required
                    maxLength={3000}
                    className={`${inputClass} resize-y`}
                  />
                  <div className="mt-1.5 flex items-center justify-between text-[0.7rem] font-semibold">
                    <span className="text-ink/40">Keep it brief and clear</span>
                    <span
                      className={
                        wordCount >= 120 ? "text-red-600 font-bold" : "text-ink/40"
                      }
                    >
                      {wordCount} / 120 words
                    </span>
                  </div>
                  <p className="mt-3 text-[0.8rem] font-semibold leading-snug text-red-600">
                    For a faster reply, tell us briefly about your brand and what
                    you need.
                  </p>
                </div>
              )}

              {/* STEP 5: Brand Name */}
              {step === 5 && (
                <div>
                  <input
                    ref={(el) => {
                      inputRef.current = el;
                    }}
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value.slice(0, 60))}
                    aria-label="Brand name"
                    placeholder="e.g. Your Brand or Company Name"
                    autoComplete="organization"
                    maxLength={60}
                    required
                    className={inputClass}
                  />
                </div>
              )}

              {/* STEP 6: Email & Website */}
              {step === 6 && (
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1.5 font-display text-xs font-black uppercase tracking-[0.12em] text-ink">
                      Email address
                    </label>
                    <input
                      ref={(el) => {
                        inputRef.current = el;
                      }}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.slice(0, 120))}
                      aria-label="Email address"
                      placeholder="yourname@gmail.com"
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <p className="font-display text-xs font-black uppercase tracking-[0.12em] text-ink">
                      Do you already have a website?
                    </p>
                    <div className="mt-2 flex gap-2">
                      {[true, false].map((opt) => (
                        <button
                          key={String(opt)}
                          type="button"
                          aria-pressed={hasWebsite === opt}
                          onClick={() => setHasWebsite(opt)}
                          className={`${pillClass(hasWebsite === opt)} min-w-20 px-6`}
                        >
                          {opt ? "Yes" : "No"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {hasWebsite && (
                    <div>
                      <input
                        type="text"
                        inputMode="url"
                        autoCapitalize="none"
                        spellCheck={false}
                        autoComplete="url"
                        value={websiteUrl}
                        onChange={(e) =>
                          setWebsiteUrl(e.target.value.slice(0, 200))
                        }
                        aria-label="Website address"
                        placeholder="yourbrand.com"
                        required
                        className={inputClass}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* STEP 7: Target Budget & What to Fix */}
              {step === 7 && (
                <div className="space-y-5">
                  <div>
                    <p className="font-display text-xs font-black uppercase tracking-[0.12em] text-ink">
                      Target Budget
                    </p>
                    <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {BUDGETS.map((b) => {
                        const isSelected = selectedBudget === b.range;
                        return (
                          <button
                            key={b.range}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setSelectedBudget(b.range)}
                            className={`rounded-2xl border-2 border-ink p-3 text-left font-display transition-all cursor-pointer ${
                              isSelected
                                ? "bg-orange text-cream shadow-[3px_3px_0_0_#141414] scale-[1.02]"
                                : "bg-cream text-ink hover:bg-yellow shadow-xs"
                            }`}
                          >
                            <span className="font-display text-xs font-black tracking-tight">
                              {b.range}
                            </span>
                            <p
                              className={`mt-0.5 text-[0.7rem] font-semibold ${
                                isSelected ? "text-cream/90" : "text-[#4A5970]"
                              }`}
                            >
                              {b.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <p className="font-display text-xs font-black uppercase tracking-[0.12em] text-ink">
                      What would you like fixed?{" "}
                      <span className="font-body text-[0.7rem] font-medium normal-case tracking-normal text-ink/45">
                        (pick all that apply)
                      </span>
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {PROBLEMS.map((prob) => {
                        const isSelected = selectedProblems.includes(prob);
                        return (
                          <button
                            key={prob}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() =>
                              setSelectedProblems((prev) =>
                                toggleArrayItem(prev, prob)
                              )
                            }
                            className={pillClass(isSelected)}
                          >
                            {prob}
                          </button>
                        );
                      })}
                    </div>

                    {selectedProblems.includes("Others") && (
                      <input
                        value={otherProblems}
                        onChange={(e) =>
                          setOtherProblems(e.target.value.slice(0, 200))
                        }
                        aria-label="Other problems, in a few words"
                        placeholder="Tell us in a few words"
                        className={`${inputClass} mt-3`}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <p
                  role="alert"
                  className="mt-3 font-display text-xs font-bold tracking-wide text-orange"
                >
                  {errorMsg.toUpperCase()}
                </p>
              )}

              {/* Actions: Back & Next / Submit */}
              <div className="mt-5 flex items-center justify-between gap-3">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMsg("");
                      setStep((s) => Math.max(1, s - 1));
                    }}
                    className="rounded-full border-2 border-ink bg-cream px-5 py-3.5 font-display text-xs font-black tracking-wide text-ink hover:bg-yellow transition-colors cursor-pointer"
                  >
                    ← BACK
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isNextDisabled()}
                  className="flex-1 rounded-full bg-orange px-7 py-4 font-display text-sm font-bold text-cream shadow-[5px_5px_0_0_#141414] transition-transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer text-center"
                >
                  {isSubmitting
                    ? "SAVING..."
                    : step === 7
                    ? "SUBMIT INQUIRY"
                    : "NEXT →"}
                </button>
              </div>
            </form>

            {/* Bottom 7 Step Indicator Dots matching aijugaad.co */}
            <div className="mt-6 flex items-center justify-center gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                <span
                  key={s}
                  className={`h-1.5 rounded-full border-2 border-ink transition-all ${
                    s === step
                      ? "w-6 bg-orange"
                      : s < step
                      ? "w-3 bg-ink"
                      : "w-3 bg-cream"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
