"use client";

import { useState } from "react";
import { Bot, Sparkles, Send, Copy, FileText, Mail, Code2, BookOpen } from "lucide-react";

export default function AiCopilotPage() {
  const [selectedTool, setSelectedTool] = useState("Proposal Writer");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const tools = [
    { name: "Proposal Writer", icon: FileText, placeholder: "Describe project scope e.g. Next.js 16 E-Commerce portal with Razorpay..." },
    { name: "Email Generator", icon: Mail, placeholder: "Describe email goal e.g. Follow-up on pending proposal sent last week..." },
    { name: "Marketing Writer", icon: BookOpen, placeholder: "Topic e.g. Why custom ASP.NET Core 9 APIs outperform legacy systems..." },
    { name: "Code Assistant", icon: Code2, placeholder: "Snippet or task e.g. Write EF Core audit log interceptor in C#..." }
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    setLoading(true);
    setTimeout(() => {
      setOutput(`[Ganesh OpenAI Copilot Output for '${selectedTool}']:\n\n1. Executive Summary & Technical Alignment\n2. Architecture Details\n3. Value Proposition for Ganesh NexGen Solutions ('Your Growth. Our Technology.')\n\nGenerated based on prompt: "${prompt}"`);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Bot className="w-6 h-6 text-blue-400" />
          <span>AI Copilot Suite & Generators</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">OpenAI fine-tuned assistants for automated proposals, emails, blogs & technical code generation</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tools.map((t) => {
          const Icon = t.icon;
          const isSel = selectedTool === t.name;
          return (
            <button
              key={t.name}
              onClick={() => { setSelectedTool(t.name); setOutput(""); }}
              className={`apple-glass p-4 text-left transition ${
                isSel ? "border-blue-500 bg-blue-500/10 text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 mb-2 ${isSel ? "text-blue-400" : "text-zinc-500"}`} />
              <div className="text-xs font-bold">{t.name}</div>
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="apple-glass p-6 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" /> Configure {selectedTool} Prompt
          </h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={tools.find(t => t.name === selectedTool)?.placeholder}
              className="w-full h-44 p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500 transition resize-none"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
            >
              {loading ? "Generating with OpenAI..." : "Generate High-Conversion Text"} <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="apple-glass p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white">Generated Content</h3>
              {output && (
                <button 
                  onClick={() => alert("Copied to clipboard!")}
                  className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
              )}
            </div>

            {output ? (
              <pre className="text-xs text-zinc-200 font-sans whitespace-pre-wrap leading-relaxed">
                {output}
              </pre>
            ) : (
              <div className="text-center py-20 text-xs text-zinc-500">
                Configure your prompt on the left and click generate to invoke OpenAI.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
