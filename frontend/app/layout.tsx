import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";
import { IS_UNDER_PROCESS } from "@/lib/maintenance";

export const metadata: Metadata = {
  title: IS_UNDER_PROCESS 
    ? "Website Under Process | Ganesh NexGen Solutions" 
    : "Ganesh NexGen Solutions | Your Growth. Our Technology.",
  description: IS_UNDER_PROCESS
    ? "Our website is currently undergoing a scheduled system upgrade to bring you a faster, smarter, and next-generation digital experience. We will be back online shortly."
    : "Enterprise web development, custom software development, AI automation, cloud solutions, and technology consulting for growing businesses across India.",
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
    title: IS_UNDER_PROCESS 
      ? "Website Under Process | Ganesh NexGen Solutions" 
      : "Ganesh NexGen Solutions | Your Growth. Our Technology.",
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
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
