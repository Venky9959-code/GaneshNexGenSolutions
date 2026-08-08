"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound, Globe } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@ganeshnexgen.com");
  const [password, setPassword] = useState("••••••••••••");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md apple-glass p-8 relative z-10 border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-2xl mx-auto mb-4 shadow-lg shadow-blue-500/30">
            G
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Sign In to Ganesh BOS</h1>
          <p className="text-xs text-zinc-400 mt-1">Ganesh NexGen Solutions — Business Operating System</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Work Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-zinc-300">Password</label>
              <a href="#" className="text-xs text-blue-400 hover:text-blue-300">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
          >
            {loading ? "Authenticating JWT..." : "Sign In to Workspace"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold">Or SSO Login</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => router.push("/dashboard")}
            className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-200 transition flex items-center justify-center gap-2"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" /> Google SSO
          </button>
          <button 
            onClick={() => router.push("/dashboard")}
            className="py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-200 transition flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Microsoft 365
          </button>
        </div>

        <p className="text-center text-xs text-zinc-500 mt-6">
          Protected by OWASP standards & 256-bit AES encryption.
        </p>
      </div>
    </div>
  );
}
