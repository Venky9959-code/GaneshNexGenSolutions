"use client";

import { Globe, Plus, FileText, CheckCircle2 } from "lucide-react";

export default function CmsPage() {
  const blogs = [
    { title: "Building SaaS Architecture with ASP.NET Core 9 & Next.js 16", category: "Engineering", status: "Published", views: "1,420" },
    { title: "Why Enterprises are migrating to OpenAI fine-tuned Copilots", category: "AI", status: "Published", views: "890" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-400" />
            <span>Website CMS & Content Manager</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Manage public landing pages, blogs, portfolio items, services & SEO metadata</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      <div className="apple-glass overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Views</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-200">
            {blogs.map((b, i) => (
              <tr key={i} className="hover:bg-white/5 transition">
                <td className="p-4 font-bold text-white">{b.title}</td>
                <td className="p-4 text-blue-400">{b.category}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {b.status}
                  </span>
                </td>
                <td className="p-4">{b.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
