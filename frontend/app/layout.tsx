import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

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
  title: "Ganesh NexGen Co — Software, Websites & AI Automation",
  description:
    "Ganesh NexGen Co is a modern software and automation studio. We engineer custom enterprise software, build high-speed websites, and wire up AI bots so your business looks big and moves fast.",
  keywords: [
    "custom software development",
    "web development India",
    "AI automation",
    "WhatsApp bot development",
    "Shopify store",
    "ERP software",
    "Ganesh NexGen",
  ],
  authors: [{ name: "Ganesh NexGen Solutions" }],
  openGraph: {
    title: "Ganesh NexGen Co — Software, Websites & AI Automation",
    description: "Bold software. Smart websites. AI that works. Made for real businesses.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: "/brand/logo.png",
    shortcut: "/brand/logo.png",
    apple: "/brand/logo.png",
  },
};

import TapEffect from "@/components/TapEffect";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">
        <TapEffect />
        {children}
      </body>
    </html>
  );
}

