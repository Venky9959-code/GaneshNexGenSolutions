"use client";

import { FolderGit2, Upload, FileText, Download, HardDrive } from "lucide-react";

export default function FilesPage() {
  const files = [
    { name: "Ganesh_NexGen_BOS_Architecture_v1.pdf", size: "4.2 MB", date: "2026-07-28", type: "PDF" },
    { name: "Proposal_FinTech_Portal_2026.pdf", size: "1.8 MB", date: "2026-07-27", type: "PDF" },
    { name: "Database_PostgreSQL_Schema_v2.sql", size: "340 KB", date: "2026-07-26", type: "SQL" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <FolderGit2 className="w-6 h-6 text-blue-400" />
            <span>Cloud File Manager (Azure / Cloudflare R2)</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Centralized document repository with versioning & encrypted access</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition flex items-center gap-2">
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <div className="apple-glass overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">File Name</th>
              <th className="p-4">Size</th>
              <th className="p-4">Date Uploaded</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-200">
            {files.map((f, i) => (
              <tr key={i} className="hover:bg-white/5 transition">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-400" /> {f.name}
                </td>
                <td className="p-4 text-zinc-400">{f.size}</td>
                <td className="p-4">{f.date}</td>
                <td className="p-4 text-right">
                  <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
