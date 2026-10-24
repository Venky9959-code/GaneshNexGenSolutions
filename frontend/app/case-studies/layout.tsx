import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & Client ROI",
  description:
    "In-depth case studies showcasing how Ganesh NexGen Solutions increased inbound leads by 2.4x, automated WhatsApp bookings, and replaced manual operations.",
  alternates: {
    canonical: "https://ganeshnexgen.website/case-studies",
  },
  openGraph: {
    title: "Case Studies & Measurable Impact | Ganesh NexGen Solutions",
    description: "Real data, architecture breakdowns, and client conversion results.",
    url: "https://ganeshnexgen.website/case-studies",
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
