import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Software Architects & AI Engineers",
  description:
    "Meet Venky and Ganesh, the founders and software engineers behind Ganesh NexGen Solutions. Dedicated to 0.5s page speeds, clean software architecture, and automated AI workflows.",
  alternates: {
    canonical: "https://ganeshnexgen.website/about",
  },
  openGraph: {
    title: "About Ganesh NexGen Solutions — Software Architects & AI Engineers",
    description: "Meet the engineering minds building next-gen software and AI automation.",
    url: "https://ganeshnexgen.website/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
