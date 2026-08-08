"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, Command, Sparkles, LayoutDashboard, Users, FileText, 
  Kanban, UserCheck, Wallet, Bot, Globe, MessageSquare, ArrowRight, X
} from "lucide-react";

export default function CommandPalette({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const actions = [
    { name: "Executive Command Center", href: "/dashboard", category: "Navigation", icon: LayoutDashboard },
    { name: "CRM & Automated Lead Pipeline", href: "/dashboard/crm", category: "CRM", icon: Users },
    { name: "Sales & 18% GST Invoicing", href: "/dashboard/sales", category: "Sales", icon: FileText },
    { name: "Project Management Board", href: "/dashboard/projects", category: "Projects", icon: Kanban },
    { name: "Client Self-Service Portal", href: "/dashboard/client-portal", category: "Portals", icon: UserCheck },
    { name: "AI Copilot Suite & Generators", href: "/dashboard/ai-copilot", category: "AI", icon: Bot },
    { name: "Finance & Tax Accounting", href: "/dashboard/finance", category: "Finance", icon: Wallet },
    { name: "Meta WhatsApp Cloud Automation", href: "/dashboard/whatsapp", category: "Automation", icon: MessageSquare }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredActions = actions.filter(a => 
    a.name.toLowerCase().includes(query.toLowerCase()) || 
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-start justify-center pt-24 p-4">
      <div className="w-full max-w-xl apple-glass p-4 border border-white/15 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10 mb-3">
          <Search className="w-4 h-4 text-blue-400" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search modules (e.g. CRM, AI, Sales)..."
            className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-zinc-500"
            autoFocus
          />
          <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-zinc-400 border border-white/10">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-1">
          {filteredActions.map((act, i) => {
            const Icon = act.icon;
            return (
              <button
                key={i}
                onClick={() => handleSelect(act.href)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-blue-600/15 border border-transparent hover:border-blue-500/30 text-left transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-blue-300 transition">{act.name}</div>
                    <div className="text-[10px] text-zinc-400">{act.category}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-blue-400 transition" />
              </button>
            );
          })}

          {filteredActions.length === 0 && (
            <div className="p-8 text-center text-xs text-zinc-500">
              No matching modules found for &quot;{query}&quot;.
            </div>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 px-2">
          <span>Ganesh BOS Command Palette</span>
          <span className="flex items-center gap-1 font-mono">
            <Command className="w-3 h-3 text-blue-400" /> + K
          </span>
        </div>
      </div>
    </div>
  );
}
