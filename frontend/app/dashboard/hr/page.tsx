"use client";

import { Users, UserPlus, FileText, CheckCircle2 } from "lucide-react";

export default function HrPage() {
  const employees = [
    { code: "GNS-001", name: "Siddharth Verma", role: "Senior Software Architect", dept: "Engineering", salary: "₹1,80,000", status: "Active" },
    { code: "GNS-002", name: "Priya Mehta", role: "UI/UX Lead Designer", dept: "Design", salary: "₹1,35,000", status: "Active" },
    { code: "GNS-003", name: "Rahul Sharma", role: "Fullstack Engineer", dept: "Engineering", salary: "₹1,20,000", status: "Active" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" />
            <span>HR Engine & Recruitment</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Employee database, onboarding checklists, salary records & performance reviews</p>
        </div>
        <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Add New Employee
        </button>
      </div>

      <div className="apple-glass overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase tracking-wider">
            <tr>
              <th className="p-4">Emp Code</th>
              <th className="p-4">Name</th>
              <th className="p-4">Designation</th>
              <th className="p-4">Department</th>
              <th className="p-4">Monthly Salary</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-zinc-200">
            {employees.map((emp) => (
              <tr key={emp.code} className="hover:bg-white/5 transition">
                <td className="p-4 font-bold text-blue-400">{emp.code}</td>
                <td className="p-4 font-semibold text-white">{emp.name}</td>
                <td className="p-4">{emp.role}</td>
                <td className="p-4">{emp.dept}</td>
                <td className="p-4 font-bold text-emerald-400">{emp.salary}</td>
                <td className="p-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
