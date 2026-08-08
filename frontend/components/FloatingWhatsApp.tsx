"use client";

import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";

export default function FloatingWhatsApp() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const defaultMsg = encodeURIComponent(
    `Hello Ganesh NexGen Solutions,\n\nI'm interested in your services.\n\nService:\nBusiness:\nRequirement:\n\nI would like to discuss my project.`
  );

  const whatsappUrl = `https://wa.me/919390564946?text=${defaultMsg}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-xl hover:scale-105 transition border border-white/20 group"
      title="Chat on WhatsApp with Ganesh NexGen Solutions"
    >
      <MessageSquare className="w-5 h-5 group-hover:rotate-12 transition-transform" />
    </a>
  );
}
