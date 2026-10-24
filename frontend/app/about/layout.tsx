import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Software Architects & AI Engineers",
  description:
    "Meet the founders and software engineers behind Ganesh NexGen Solutions. Dedicated to sub-second page speeds, clean software architecture, and automated AI workflows.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Ganesh NexGen Solutions — Software Architects & AI Engineers",
    description: "Meet the engineering minds building next-gen software, websites, and AI automation.",
    url: "https://ganeshnexgen.website/about",
    type: "website",
    images: [
      {
        url: "/brand/logo.png",
        width: 1200,
        height: 630,
        alt: "About Ganesh NexGen Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ganesh NexGen Solutions — Software Architects & AI Engineers",
    description: "Meet the engineering minds building next-gen software, websites, and AI automation.",
    images: ["/brand/logo.png"],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
