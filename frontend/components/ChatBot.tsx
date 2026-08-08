"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Bot, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

export default function ChatBot() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hello! I am Ganesh AI Assistant ('Your Growth. Our Technology.'). How can I assist you with software development, custom AI solutions, or website quotes today?",
      timestamp: "Just now"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!mounted) return null;

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    setTimeout(() => {
      let botResponse = "Ganesh NexGen Solutions provides end-to-end IT services including Next.js 16 Web Apps, custom ASP.NET Core 9 APIs, OpenAI LLM integration, and Meta WhatsApp Cloud automation.";

      const lower = query.toLowerCase();
      if (lower.includes("quote") || lower.includes("price") || lower.includes("cost") || lower.includes("pricing")) {
        botResponse = "Our technical estimates start at ₹10,000 for starter websites, ₹20,000 for business websites, and ₹30,000 for e-commerce stores. You can request a custom quote directly on our service pages!";
      } else if (lower.includes("proposal") || lower.includes("contract")) {
        botResponse = "We generate custom technical project proposals based on your requirements. Simply fill in your details on the Contact/Quote page, and we will send one over.";
      } else if (lower.includes("whatsapp") || lower.includes("contact")) {
        botResponse = "You can contact our support line directly via WhatsApp at +91 9390564946 or email us at contact@ganeshnexgen.com.";
      } else if (lower.includes("services") || lower.includes("stack")) {
        botResponse = "We build using Next.js 16, React 19, TypeScript, Tailwind CSS, ASP.NET Core 9, PostgreSQL, and deploy securely on Vercel and Azure Cloud.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-250 border border-white/20 group relative cursor-pointer"
          title="Open Ganesh AI Assistant"
        >
          <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
          <span className="w-3 h-3 rounded-full bg-emerald-400 absolute top-0 right-0 border-2 border-slate-900 dark:border-black" />
        </button>
      ) : (
        <div className="w-80 sm:w-96 apple-glass border border-slate-200 dark:border-white/15 shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[480px] bg-white/95 dark:bg-zinc-900/95 transition-colors duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 dark:from-blue-600/30 dark:to-indigo-600/30 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-400/20 dark:border-blue-400/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 font-heading">
                  <span>Ganesh AI Copilot</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-slate-500 dark:text-zinc-300 font-medium">Online • Your Growth. Our Technology.</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-400/20 dark:border-blue-400/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-[10px] font-bold shrink-0 mt-0.5">
                    G
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none shadow-md"
                      : "bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-white/10 rounded-bl-none"
                  }`}
                >
                  <div>{m.text}</div>
                  <div className={`text-[9px] mt-1 text-right ${m.sender === "user" ? "text-blue-200" : "text-slate-400 dark:text-zinc-500"}`}>
                    {m.timestamp}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 items-center text-[11px] text-slate-500 dark:text-zinc-400">
                <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400 animate-spin" />
                <span>Ganesh AI is processing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Shortcuts */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-white/5 border-t border-slate-200 dark:border-white/10 flex items-center gap-1.5 overflow-x-auto text-[10px]">
            {["Services", "Pricing Estimate", "WhatsApp Support"].map((shortcut) => (
              <button
                key={shortcut}
                onClick={() => handleSend(shortcut)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-white/10 hover:bg-slate-100 dark:hover:bg-blue-600/30 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-zinc-300 whitespace-nowrap transition-colors cursor-pointer"
              >
                {shortcut}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-100 dark:bg-zinc-950 border-t border-slate-200 dark:border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Ganesh BOS..."
              className="flex-1 bg-white dark:bg-white/5 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center justify-center cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
