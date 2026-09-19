"use client";

import React from "react";
import { usePathname } from "next/navigation";
import BrandHeader from "@/components/layout/BrandHeader";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ChatBot from "@/components/ChatBot";
import UnderProcess from "@/components/UnderProcess";
import { IS_UNDER_PROCESS } from "@/lib/maintenance";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Internal administrative routes remain accessible for operations if needed
  const isDashboardOrAdmin = 
    pathname?.startsWith("/dashboard") || 
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/login");

  // When under process mode is enabled:
  // All public website pages present the Under Process page.
  // No header, footer, chatbots, or external page navigations are displayed.
  if (IS_UNDER_PROCESS && !isDashboardOrAdmin) {
    return <UnderProcess />;
  }

  // Regular production site rendering
  return (
    <>
      {!isDashboardOrAdmin && <BrandHeader />}
      <main className="flex-1">{children}</main>
      {!isDashboardOrAdmin && (
        <>
          <Footer />
          <FloatingWhatsApp />
          <ChatBot />
        </>
      )}
    </>
  );
}
