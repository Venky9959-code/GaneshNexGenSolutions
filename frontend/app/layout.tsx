import type { Metadata } from "next";
import "./globals.css";
import BrandHeader from "@/components/layout/BrandHeader";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ChatBot from "@/components/ChatBot";

export const metadata: Metadata = {
  title: "Ganesh NexGen Solutions | Your Growth. Our Technology.",
  description: "Enterprise web development, custom software development, AI automation, cloud solutions, and technology consulting for growing businesses across India.",
  keywords: "website development company India, business website development, custom software development India, startup website development, ecommerce development company, AI automation services",
  icons: {
    icon: [
      { url: "/brand/logo-icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    shortcut: "/brand/logo-icon.png",
    apple: "/brand/logo-icon.png",
  },
  openGraph: {
    title: "Ganesh NexGen Solutions | Your Growth. Our Technology.",
    description: "Enterprise technology and digital transformation company serving startups, SMEs, healthcare, retail, and growing businesses across India.",
    url: "https://ganeshnexgen.com",
    siteName: "Ganesh NexGen Solutions",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.add('light');
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `
          }}
        />
      </head>
      <body className="bg-[var(--bg-primary)] text-[var(--text-main)] antialiased selection:bg-blue-500 selection:text-white flex flex-col min-h-screen transition-colors duration-300">
        <BrandHeader />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <ChatBot />
      </body>
    </html>
  );
}
