import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingEnquiry from "@/components/FloatingEnquiry";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Ganesh NexGen Solutions. Review our engineering engagement terms, intellectual property protections, and service agreements.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | Ganesh NexGen Solutions",
    description: "Review our engineering engagement terms, intellectual property protections, and service agreements.",
    url: "https://ganeshnexgen.website/terms",
    type: "website",
    images: [
      {
        url: "/brand/logo.png",
        width: 1200,
        height: 630,
        alt: "Ganesh NexGen Solutions Terms of Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Ganesh NexGen Solutions",
    description: "Review our engineering engagement terms, intellectual property protections, and service agreements.",
    images: ["/brand/logo.png"],
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F0F4F8] text-[#0B172A]">
      <Navbar />
      <FloatingEnquiry />

      <div className="px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36">
        <article className="mx-auto max-w-4xl rounded-3xl border-2 border-ink bg-white px-6 py-10 shadow-[8px_8px_0_0_#0B172A] sm:px-14 sm:py-14">
          <div className="border-b-2 border-ink pb-6">
            <span className="inline-block rounded-full border-2 border-ink bg-[#2D8CF0] px-4 py-1 font-mono text-xs font-bold text-white">
              LEGAL TERMS
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-ink">
              Terms of Service
            </h1>
            <p className="mt-2 text-sm font-semibold text-[#4A5970]">
              Last updated: October 2026 | Effective Date: Immediately
            </p>
          </div>

          <div className="mt-8 space-y-8 text-base leading-relaxed text-[#1F2937]">
            <section>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-ink">
                1. Acceptance of Terms
              </h2>
              <p className="mt-2 text-sm sm:text-base">
                By accessing <Link href="https://ganeshnexgen.website" className="text-[#2D8CF0] underline font-bold">https://ganeshnexgen.website</Link> or engaging Ganesh NexGen Solutions for custom software engineering, website development, or automation services, you agree to be bound by these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-ink">
                2. Scope of Services
              </h2>
              <p className="mt-2 text-sm sm:text-base">
                Ganesh NexGen Solutions engineers digital products including enterprise software architectures, web applications, e-commerce stores, and artificial intelligence automated workflows. Each bespoke engagement is governed by a technical Statement of Work (SOW) specifying deliverables, milestones, and service levels.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-ink">
                3. Intellectual Property Rights
              </h2>
              <p className="mt-2 text-sm sm:text-base">
                Upon full settlement of agreed project milestone invoices, all bespoke source code, proprietary algorithms, design assets, and databases developed specifically for the client transfer entirely to the client, free of ongoing licensing restrictions unless mutually documented otherwise.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-ink">
                4. Quality Assurance &amp; Warranty
              </h2>
              <p className="mt-2 text-sm sm:text-base">
                We provide a standard 30-day post-launch warranty covering any unforeseen software defects or functional regressions in accordance with the signed technical scope.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-ink">
                5. Contact &amp; Legal Notices
              </h2>
              <p className="mt-2 text-sm sm:text-base">
                For legal inquiries, partnership contracts, or formal notices:
              </p>
              <div className="mt-4 rounded-2xl border-2 border-ink bg-[#F8FAFC] p-5">
                <p className="font-bold text-ink">Ganesh NexGen Solutions</p>
                <p className="text-sm mt-1">Official Contact Email: <a href="mailto:contact@ganeshnexgen.website" className="text-[#2D8CF0] font-bold">contact@ganeshnexgen.website</a></p>
                <p className="text-sm mt-1">Official Domain: <a href="https://ganeshnexgen.website" className="text-[#2D8CF0] font-bold">https://ganeshnexgen.website</a></p>
              </div>
            </section>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}
