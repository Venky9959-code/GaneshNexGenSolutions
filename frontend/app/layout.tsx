import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import TapEffect from "@/components/TapEffect";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ganeshnexgen.website"),
  title: {
    default: "Ganesh NexGen Solutions — Software, High-Speed Websites & AI Automation",
    template: "%s | Ganesh NexGen Solutions",
  },
  description:
    "Ganesh NexGen Solutions is an elite software engineering and AI automation studio. We engineer custom enterprise software, build high-speed websites, and deploy intelligent AI bots so your business looks big and moves fast.",
  applicationName: "Ganesh NexGen Solutions",
  keywords: [
    "custom software development",
    "web development India",
    "AI automation workflows",
    "WhatsApp bot development",
    "Shopify store development",
    "ERP software India",
    "Next.js web developer",
    "enterprise software solutions",
    "full stack engineering",
    "automated lead generation bots",
    "high-speed website optimization",
    "Ganesh NexGen Solutions",
  ],
  authors: [{ name: "Ganesh NexGen Solutions", url: "https://ganeshnexgen.website" }],
  creator: "Ganesh NexGen Solutions",
  publisher: "Ganesh NexGen Solutions",
  category: "technology",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ganesh NexGen Solutions — Software, Websites & AI Automation",
    description: "Bold software. Smart websites. AI that works. Engineered for real businesses.",
    url: "https://ganeshnexgen.website",
    siteName: "Ganesh NexGen Solutions",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/brand/logo.png",
        width: 1200,
        height: 630,
        alt: "Ganesh NexGen Solutions — Software & AI Automation Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ganesh NexGen Solutions — Software, Websites & AI Automation",
    description: "Bold software. Smart websites. AI that works. Engineered for real businesses.",
    images: ["/brand/logo.png"],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/brand/logo.png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/brand/logo.png",
    apple: "/brand/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://ganeshnexgen.website/#website",
      url: "https://ganeshnexgen.website",
      name: "Ganesh NexGen Solutions",
      description: "Custom Software, High-Speed Websites & AI Automation Studio",
      publisher: {
        "@id": "https://ganeshnexgen.website/#organization",
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "Organization",
      "@id": "https://ganeshnexgen.website/#organization",
      name: "Ganesh NexGen Solutions",
      url: "https://ganeshnexgen.website",
      logo: {
        "@type": "ImageObject",
        url: "https://ganeshnexgen.website/brand/logo.png",
        width: 1200,
        height: 630,
      },
      image: "https://ganeshnexgen.website/brand/logo.png",
      email: "contact@ganeshnexgen.website",
      telephone: "+91 9390564946",
      sameAs: [
        "https://wa.me/919390564946",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91 9390564946",
          contactType: "customer service",
          email: "contact@ganeshnexgen.website",
          areaServed: ["IN", "US", "AE", "GB", "Worldwide"],
          availableLanguage: ["English", "Telugu", "Hindi"],
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://ganeshnexgen.website/#localbusiness",
      name: "Ganesh NexGen Solutions",
      url: "https://ganeshnexgen.website",
      logo: "https://ganeshnexgen.website/brand/logo.png",
      image: "https://ganeshnexgen.website/brand/logo.png",
      description:
        "Engineering custom enterprise software, ultra-fast websites, and intelligent AI automation workflows for ambitious businesses.",
      email: "contact@ganeshnexgen.website",
      telephone: "+91 9390564946",
      priceRange: "₹₹",
      currenciesAccepted: "INR, USD",
      paymentAccepted: "Cash, Credit Card, UPI, Net Banking, Razorpay",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 17.385044,
        longitude: 78.486671,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "20:00",
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engineering & Development Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Software & Enterprise ERP Development",
              description: "Tailor-made cloud software, database architectures, and secure business management systems.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "High-Performance Website Development",
              description: "Sub-second load times, modern Next.js/React responsive UI, and search engine optimized web platforms.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "24/7 AI WhatsApp Automation & Customer Bots",
              description: "Autonomous AI chatbots for lead qualification, instant booking, and CRM synchronization.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "E-Commerce & High-Converting Shopify Architectures",
              description: "Full-funnel e-commerce stores with automated payment gateways, inventory tracking, and speed optimization.",
            },
          },
        ],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <TapEffect />
        {children}
      </body>
    </html>
  );
}
