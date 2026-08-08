"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, FileText, Kanban, UserCheck, 
  Wallet, Bot, Globe, MessageSquare, Mail, BarChart3, 
  FolderGit2, Bell, Settings, LogOut, Search, Plus, Sparkles, X, User, Command
} from "lucide-react";
import CommandPalette from "@/components/CommandPalette";
import ThemeToggle from "@/components/ThemeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const navigation = [
    { name: "Executive Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "CRM & Leads", href: "/dashboard/crm", icon: Users },
    { name: "Sales & Billing", href: "/dashboard/sales", icon: FileText },
    { name: "Project Board", href: "/dashboard/projects", icon: Kanban },
    { name: "Client Portal", href: "/dashboard/client-portal", icon: UserCheck },
    { name: "Employee Portal", href: "/dashboard/employee-portal", icon: User },
    { name: "HR Engine", href: "/dashboard/hr", icon: Users },
    { name: "Finance & Tax", href: "/dashboard/finance", icon: Wallet },
    { name: "AI Copilot Suite", href: "/dashboard/ai-copilot", icon: Bot },
    { name: "Website CMS", href: "/dashboard/cms", icon: Globe },
    { name: "WhatsApp Cloud API", href: "/dashboard/whatsapp", icon: MessageSquare },
    { name: "Email Automation", href: "/dashboard/email", icon: Mail },
    { name: "Analytics & BI", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Cloud File Storage", href: "/dashboard/files", icon: FolderGit2 },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    { name: "System Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const handleAiAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt) return;
    setAiLoading(true);
    setTimeout(() => {
      setAiResponse(`[Ganesh OpenAI Assistant]: Analyzed requirement: '${aiPrompt}'. Proposed strategy generated with technical scope & timeline. Ready for automated PDF proposal dispatch to client via Meta WhatsApp API.`);
      setAiLoading(false);
    }, 900);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] flex transition-colors duration-300">
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-100/90 dark:bg-zinc-950/80 border-r border-slate-200 dark:border-white/10 p-5 flex flex-col justify-between fixed inset-y-0 left-0 z-40 backdrop-blur-xl">
        <div>
          {/* Official Brand Logo */}
          <Link href="/" className="flex items-center gap-3 mb-8 px-2 group">
            <div className="h-9 px-2.5 py-1 bg-white dark:bg-white/10 rounded-xl flex items-center justify-center border border-slate-200 dark:border-white/15 shadow-lg group-hover:scale-105 transition-transform backdrop-blur-md">
              <img 
                src="/brand/logo.png" 
                alt="Ganesh NexGen Solutions" 
                className="h-7 w-auto object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]"
              />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight block">Ganesh NexGen</span>
              <span className="text-[9px] text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase block -mt-1">BOS Platform</span>
            </div>
          </Link>

          {/* Module Links */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                    isActive 
                      ? "bg-blue-600/15 text-blue-600 dark:text-blue-400 border border-blue-500/30" 
                      : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-zinc-500"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Card */}
        <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center text-xs font-bold text-indigo-600 dark:text-indigo-300">
              GA
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">Ganesh Admin</div>
              <div className="text-[10px] text-slate-600 dark:text-zinc-400">Super Admin</div>
            </div>
          </div>
          <Link href="/login" className="text-slate-500 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 transition">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-64 flex-1 flex flex-col min-h-screen bg-[var(--bg-primary)]">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 dark:border-white/10 px-8 flex items-center justify-between bg-slate-100/80 dark:bg-zinc-950/40 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4 w-96">
            <button 
              onClick={() => setCmdOpen(true)}
              className="w-full pl-3 pr-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 flex items-center justify-between hover:border-blue-500/50 transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-zinc-400" /> Quick Spotlight Launcher...
              </span>
              <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/10 text-zinc-400 border border-white/10 flex items-center gap-0.5">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <button 
              onClick={() => setAiModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/40 text-blue-300 text-xs font-medium hover:border-blue-400 transition flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>AI Copilot</span>
            </button>

            <Link href="/dashboard/notifications" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 transition relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-1 right-1" />
            </Link>
          </div>
        </header>

        {/* Page Content View */}
        <main className="p-8 flex-1">
          {children}
        </main>
      </div>

      {/* Floating AI Copilot Modal */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl apple-glass p-6 border border-white/15 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                <Bot className="w-5 h-5" />
                <span>Ganesh OpenAI Copilot</span>
              </div>
              <button onClick={() => setAiModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAiAsk} className="space-y-4">
              <textarea 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask AI Copilot to generate a proposal, score a lead, draft an email, or query revenue metrics..."
                className="w-full h-32 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 transition resize-none"
              />
              <button 
                type="submit" 
                disabled={aiLoading}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
              >
                {aiLoading ? "Processing with OpenAI..." : "Generate AI Response"} <Sparkles className="w-4 h-4" />
              </button>
            </form>

            {aiResponse && (
              <div className="mt-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 leading-relaxed">
                {aiResponse}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
