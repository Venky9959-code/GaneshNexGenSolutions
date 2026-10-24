import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingEnquiry from "@/components/FloatingEnquiry";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Ganesh NexGen Solutions",
  description:
    "Privacy Policy for Ganesh NexGen Solutions. Learn how we handle, store, and protect your data with bank-grade security protocols.",
  alternates: {
    canonical: "https://ganeshnexgen.website/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#F0F4F8] text-[#0B172A]">
      <Navbar />
      <FloatingEnquiry />

      <div className="px-4 pb-20 pt-28 sm:px-6 sm:pb-28 sm:pt-36">
        <article className="mx-auto max-w-4xl rounded-3xl border-2 border-ink bg-white px-6 py-10 shadow-[8px_8px_0_0_#0B172A] sm:px-14 sm:py-14">
          <div className="border-b-2 border-ink pb-6">
            <span className="inline-block rounded-full border-2 border-ink bg-[#A1D5F5] px-4 py-1 font-mono text-xs font-bold text-ink">
              LEGAL &amp; COMPLIANCE
            </span>
            <h1 className="mt-4 font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-ink">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm font-semibold text-[#4A5970]">
              Last updated: October 2026 | Effective Date: Immediately
            </p>
          </div>

          <div className="mt-8 space-y-8 text-base leading-relaxed text-[#1F2937]">
            <section>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-ink">
                1. Overview
              </h2>
              <p className="mt-2 text-sm sm:text-base">
                Welcome to <strong>Ganesh NexGen Solutions</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), accessible via{" "}
                <Link href="https://ganeshnexgen.website" className="text-[#2D8CF0] underline font-bold">
                  https://ganeshnexgen.website
                </Link>
                . We provide custom software architecture, web application engineering, enterprise ERP systems, and AI automation workflows. Your privacy is paramount, and this document details our transparent data handling principles.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-ink">
                2. Information We Collect
              </h2>
              <ul className="mt-2 list-disc pl-5 space-y-2 text-sm sm:text-base">
                <li>
                  <strong>Contact Information:</strong> Name, business email address, phone number, and WhatsApp contact details provided through inquiry forms.
                </li>
                <li>
                  <strong>Project Specifications:</strong> Technical scopes, project requirements, budget ranges, and timeline targets shared during discovery.
                </li>
                <li>
                  <strong>Technical Telemetry:</strong> Anonymized analytical parameters including IP address, browser type, device metrics, and interaction timestamps.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-ink">
                3. Purpose of Processing
              </h2>
              <p className="mt-2 text-sm sm:text-base">
                We use collected information exclusively to:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1.5 text-sm sm:text-base">
                <li>Prepare accurate engineering estimates, architecture blueprints, and service agreements.</li>
                <li>Dispatch transactional status updates, lead reference numbers, and engineering communications.</li>
                <li>Prevent denial of service (DDoS), spam submissions, and malicious tampering.</li>
                <li>Comply with applicable legal, fiscal, and regulatory obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-ink">
                4. Data Protection &amp; Security Standards
              </h2>
              <p className="mt-2 text-sm sm:text-base">
                All communications on <span className="font-mono font-bold">ganeshnexgen.website</span> are encrypted in transit using 256-bit TLS (Transport Layer Security) with modern cipher suites and Strict Transport Security (HSTS). We implement zero-knowledge policies and never sell or rent client data to third-party data brokers.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-ink">
                5. Contact Our Privacy Officer
              </h2>
              <p className="mt-2 text-sm sm:text-base">
                If you have questions about this privacy statement or wish to request data deletion, contact our Data Governance Officer at:
              </p>
              <div className="mt-4 rounded-2xl border-2 border-ink bg-[#F8FAFC] p-5">
                <p className="font-bold text-ink">Ganesh NexGen Solutions</p>
                <p className="text-sm mt-1">Official Email: <a href="mailto:contact@ganeshnexgen.website" className="text-[#2D8CF0] font-bold">contact@ganeshnexgen.website</a></p>
                <p className="text-sm mt-1">Domain: <a href="https://ganeshnexgen.website" className="text-[#2D8CF0] font-bold">https://ganeshnexgen.website</a></p>
              </div>
            </section>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}
