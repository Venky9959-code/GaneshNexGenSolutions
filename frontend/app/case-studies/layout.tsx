import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies & Client ROI",
  description:
    "In-depth case studies showcasing how Ganesh NexGen Solutions increased inbound leads by 2.4x, automated WhatsApp bookings, and replaced manual operations.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Case Studies & Measurable Impact | Ganesh NexGen Solutions",
    description: "Real data, architecture breakdowns, and client conversion results.",
    url: "https://ganeshnexgen.website/case-studies",
    type: "website",
    images: [
      {
        url: "/brand/logo.png",
        width: 1200,
        height: 630,
        alt: "Ganesh NexGen Solutions Case Studies and ROI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies & Measurable Impact | Ganesh NexGen Solutions",
    description: "Real data, architecture breakdowns, and client conversion results.",
    images: ["/brand/logo.png"],
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
