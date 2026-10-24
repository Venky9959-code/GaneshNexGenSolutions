import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Us — How Good Software Wins Customers",
  description:
    "Discover the engineering philosophy behind Ganesh NexGen Solutions: frictionless buying journeys, authentic social proof, sub-second performance, and always-on lead capture.",
  alternates: {
    canonical: "/why-us",
  },
  openGraph: {
    title: "Why Us — How Good Software Wins Customers | Ganesh NexGen Solutions",
    description: "The playbook on building high-conversion software and automation.",
    url: "https://ganeshnexgen.website/why-us",
    type: "website",
    images: [
      {
        url: "/brand/logo.png",
        width: 1200,
        height: 630,
        alt: "Why Choose Ganesh NexGen Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Us — How Good Software Wins Customers | Ganesh NexGen Solutions",
    description: "The playbook on building high-conversion software and automation.",
    images: ["/brand/logo.png"],
  },
};

export default function WhyUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
