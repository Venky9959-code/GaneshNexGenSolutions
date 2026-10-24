import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Us — How Good Software Wins Customers",
  description:
    "Discover the engineering philosophy behind Ganesh NexGen Solutions: frictionless buying journeys, authentic social proof, sub-second performance, and always-on lead capture.",
  alternates: {
    canonical: "https://ganeshnexgen.website/why-us",
  },
  openGraph: {
    title: "Why Us — How Good Software Wins Customers | Ganesh NexGen Solutions",
    description: "The playbook on building high-conversion software and automation.",
    url: "https://ganeshnexgen.website/why-us",
  },
};

export default function WhyUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
