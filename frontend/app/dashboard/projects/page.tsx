"use client";

import { useState, useEffect } from "react";
import { 
  Kanban, Plus, Clock, Play, Pause, CheckCircle2, 
  AlertCircle, User, Calendar, FolderGit2
} from "lucide-react";

export default function ProjectsPage() {
  const [timerRunning, setTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(1450);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const tasks = [
    { id: "T-1", title: "ASP.NET Core 9 Web API Setup", status: "Done", assignee: "Siddharth", hours: "12.5 hrs" },
    { id: "T-2", title: "PostgreSQL Database Entity Configuration", status: "Done", assignee: "Rahul", hours: "8.0 hrs" },
    { id: "T-3", title: "Next.js 16 Apple UI Component System", status: "InProgress", assignee: "Priya", hours: "14.2 hrs" },
    { id: "T-4", title: "Meta WhatsApp Cloud API Webhook Integration", status: "InReview", assignee: "Amit", hours: "6.0 hrs" },
    { id: "T-5", title: "OpenAI Fine-Tuned Proposal Generator", status: "Todo", assignee: "Ganesh AI", hours: "0.0 hrs" }
  ];

  return (
    <div className="space-y-6">
      {/* Top Bar with Live Stopwatch */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Kanban className="w-6 h-6 text-blue-400" />
            <span>Project Workspace & Time Tracker</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Milestones, task kanban, sprint velocity & live time tracking</p>
        </div>

        {/* Live Stopwatch Widget */}
        <div className="flex items-center gap-4 apple-glass px-4 py-2 border border-blue-500/30">
          <div className="flex items-center gap-2 text-xs text-zinc-300">
            <Clock className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="font-mono text-sm font-bold text-white">{formatTime(seconds)}</span>
          </div>
          <button 
            onClick={() => setTimerRunning(!timerRunning)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
              timerRunning ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-blue-600 text-white"
            }`}
          >
            {timerRunning ? <><Pause className="w-3.5 h-3.5" /> Pause Log</> : <><Play className="w-3.5 h-3.5" /> Start Timer</>}
          </button>
        </div>
      </div>

      {/* Task Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {["Todo", "InProgress", "InReview", "Done"].map((col) => {
          const colTasks = tasks.filter(t => t.status === col);
          return (
            <div key={col} className="apple-glass p-4">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">{col}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-zinc-300">
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {colTasks.map((task) => (
                  <div key={task.id} className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/40 transition">
                    <div className="text-[10px] font-bold text-blue-400 mb-1">{task.id}</div>
                    <h4 className="text-xs font-bold text-white mb-3">{task.title}</h4>

                    <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/5">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-zinc-500" /> {task.assignee}
                      </span>
                      <span>{task.hours}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
