import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project & Contact Engineering",
  description:
    "Direct contact with Ganesh NexGen Solutions lead engineers. Reach us at contact@ganeshnexgen.website or initiate a fast 4-step project scoping flow.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Start a Project | Ganesh NexGen Solutions",
    description: "Tell us your vision. We engineer the software. Response within 24 hours.",
    url: "https://ganeshnexgen.website/contact",
    type: "website",
    images: [
      {
        url: "/brand/logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Ganesh NexGen Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Start a Project | Ganesh NexGen Solutions",
    description: "Tell us your vision. We engineer the software. Response within 24 hours.",
    images: ["/brand/logo.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
