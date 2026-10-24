import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project & Contact Engineering",
  description:
    "Direct contact with Ganesh NexGen Solutions lead engineers. Reach us at contact@ganeshnexgen.website or initiate a fast 4-step project scoping flow.",
  alternates: {
    canonical: "https://ganeshnexgen.website/contact",
  },
  openGraph: {
    title: "Start a Project | Ganesh NexGen Solutions",
    description: "Tell us your vision. We engineer the software. Response within 24 hours.",
    url: "https://ganeshnexgen.website/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
