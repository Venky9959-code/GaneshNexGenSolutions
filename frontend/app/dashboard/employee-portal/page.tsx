"use client";

import { useState } from "react";
import { User, Clock, Calendar, CheckCircle2, FileSpreadsheet } from "lucide-react";

export default function EmployeePortalPage() {
  const [clockedIn, setClockedIn] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <User className="w-6 h-6 text-blue-400" />
            <span>Employee Self-Service & Attendance</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Clock in/out, leave applications, payroll slips & assigned sprint tasks</p>
        </div>

        <button 
          onClick={() => setClockedIn(!clockedIn)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
            clockedIn ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-emerald-600 text-white"
          }`}
        >
          <Clock className="w-4 h-4" /> {clockedIn ? "Clock Out (Present since 09:30 AM)" : "Clock In Attendance"}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="apple-glass p-6">
          <h3 className="text-xs font-semibold text-zinc-400 mb-1">Attendance Record</h3>
          <div className="text-3xl font-bold text-white mb-2">96.4%</div>
          <span className="text-[11px] text-emerald-400 font-semibold">22 Days Present this month</span>
        </div>

        <div className="apple-glass p-6">
          <h3 className="text-xs font-semibold text-zinc-400 mb-1">Casual / Sick Leaves Left</h3>
          <div className="text-3xl font-bold text-blue-400 mb-2">12 Days</div>
          <button className="text-xs text-blue-400 hover:underline">Apply for Leave →</button>
        </div>

        <div className="apple-glass p-6">
          <h3 className="text-xs font-semibold text-zinc-400 mb-1">Payroll Readiness</h3>
          <div className="text-3xl font-bold text-emerald-400 mb-2">₹1,25,000</div>
          <span className="text-[11px] text-zinc-400">July Salary Slip Generated</span>
        </div>
      </div>
    </div>
  );
}
