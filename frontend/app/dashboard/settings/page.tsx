"use client";

import { useState } from "react";
import { Settings, Save, ShieldCheck, Key, Building, Sparkles } from "lucide-react";

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState("Ganesh NexGen Solutions");
  const [tagline, setTagline] = useState("Your Growth. Our Technology.");
  const [gstin, setGstin] = useState("27AAAAA0000A1Z5");
  const [openAiKey, setOpenAiKey] = useState("sk-proj-mock-key-ganesh-bos");
  const [whatsAppToken, setWhatsAppToken] = useState("EAAGaneshWhatsAppCloudToken");
  const [resendKey, setResendKey] = useState("re_GaneshResendToken2026");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-400" />
          <span>System Settings & API Key Management</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">Configure company branding, GST tax profile, OpenAI & Meta WhatsApp credentials</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        <div className="apple-glass p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <Building className="w-4 h-4 text-blue-400" /> Company Profile & Branding
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Company Name</label>
              <input 
                type="text" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Company Tagline</label>
              <input 
                type="text" 
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">GSTIN Tax Registration</label>
            <input 
              type="text" 
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="apple-glass p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-3">
            <Key className="w-4 h-4 text-blue-400" /> Enterprise API Integrations
          </h3>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">OpenAI API Key</label>
            <input 
              type="password" 
              value={openAiKey}
              onChange={(e) => setOpenAiKey(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Meta WhatsApp Cloud Access Token</label>
            <input 
              type="password" 
              value={whatsAppToken}
              onChange={(e) => setWhatsAppToken(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1">Resend Email Secret Key</label>
            <input 
              type="password" 
              value={resendKey}
              onChange={(e) => setResendKey(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center gap-2 shadow-lg shadow-blue-600/30"
        >
          <Save className="w-4 h-4" /> {saved ? "Settings Saved Successfully!" : "Save System Settings"}
        </button>
      </form>
    </div>
  );
}
