import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selected Work & Engineering Portfolio",
  description:
    "Explore production projects shipped by Ganesh NexGen Solutions: bespoke ERP platforms, lightning-fast web apps, AI bots, and custom e-commerce stores.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Selected Work & Engineering Portfolio | Ganesh NexGen Solutions",
    description: "Real production software, websites, and AI systems built for ambitious businesses.",
    url: "https://ganeshnexgen.website/work",
    type: "website",
    images: [
      {
        url: "/brand/logo.png",
        width: 1200,
        height: 630,
        alt: "Ganesh NexGen Solutions Portfolio & Engineering Work",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Work & Engineering Portfolio | Ganesh NexGen Solutions",
    description: "Real production software, websites, and AI systems built for ambitious businesses.",
    images: ["/brand/logo.png"],
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
