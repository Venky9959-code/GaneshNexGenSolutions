"use client";

import { 
  TrendingUp, Users, DollarSign, Briefcase, FileText, 
  ArrowUpRight, Sparkles, Activity, CheckCircle2, Clock, Plus
} from "lucide-react";
import Link from "next/link";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function DashboardPage() {
  const chartData = [
    { month: "Jan", revenue: 650000, expenses: 210000 },
    { month: "Feb", revenue: 780000, expenses: 240000 },
    { month: "Mar", revenue: 920000, expenses: 310000 },
    { month: "Apr", revenue: 890000, expenses: 290000 },
    { month: "May", revenue: 1150000, expenses: 380000 },
    { month: "Jun", revenue: 1250000, expenses: 410000 }
  ];

  const kpis = [
    { title: "Total Revenue", value: "₹48,50,000", change: "+18.4%", icon: DollarSign, color: "text-emerald-400" },
    { title: "Monthly Sales", value: "₹12,50,000", change: "+12.1%", icon: TrendingUp, color: "text-blue-400" },
    { title: "Active Leads", value: "42", change: "+8 new", icon: Users, color: "text-indigo-400" },
    { title: "Active Projects", value: "18", change: "4 in review", icon: Briefcase, color: "text-purple-400" },
    { title: "Pending Invoices", value: "7", change: "₹3,40,000 due", icon: FileText, color: "text-amber-400" }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Executive Command Center</h1>
          <p className="text-xs text-zinc-400 mt-1">Real-time operational summary for Ganesh NexGen Solutions</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/crm" className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add New Lead
          </Link>
          <Link href="/dashboard/sales" className="px-4 py-2 rounded-xl apple-glass border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition">
            Generate Proposal
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="apple-glass p-5 apple-glass-hover">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-zinc-400">{kpi.title}</span>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{kpi.value}</div>
              <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">{kpi.change}</span> vs last month
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts & AI Executive Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recharts Revenue Bar Chart */}
        <div className="lg:col-span-2 apple-glass p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold text-white">Revenue & Expenses Runway</h2>
              <p className="text-xs text-zinc-400">Monthly financial performance breakdown (INR)</p>
            </div>
            <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
              H1 2026 Fiscal
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="month" stroke="#86868b" fontSize={11} tickLine={false} />
                <YAxis stroke="#86868b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#161618", borderColor: "#333", borderRadius: "12px", fontSize: "12px", color: "#fff" }}
                />
                <Bar dataKey="revenue" fill="#0066cc" radius={[6, 6, 0, 0]} name="Revenue" />
                <Bar dataKey="expenses" fill="#af52de" radius={[6, 6, 0, 0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Executive Summary Card */}
        <div className="apple-glass p-6 border border-blue-500/30 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-4">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>AI Executive Copilot</span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              &quot;Q2 Growth is exceeding forecasts by <strong className="text-white">+14.2%</strong>. Lead conversion velocity has increased to 3.2 days. High demand detected for <span className="text-blue-400 font-semibold">AI Solutions & ASP.NET Core 9 Cloud Services</span>.&quot;
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <div className="font-medium text-white mb-0.5">Automated Meta WhatsApp Trigger</div>
                <div className="text-[11px] text-zinc-400">14 lead follow-up messages dispatched automatically today.</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                <div className="font-medium text-white mb-0.5">Pending Approval</div>
                <div className="text-[11px] text-zinc-400">FinTech Portal Proposal (₹5,50,000) ready for client signature.</div>
              </div>
            </div>
          </div>

          <Link href="/dashboard/ai-copilot" className="mt-6 text-center text-xs font-semibold text-blue-400 hover:text-blue-300 block">
            Open Full AI Command Center →
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="apple-glass p-6">
        <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400" />
          <span>Real-time Operations Activity Feed</span>
        </h2>

        <div className="space-y-3">
          {[
            { title: "New Lead Ingested: Enterprise AI Platform", time: "4 mins ago", tag: "CRM", color: "bg-blue-500/10 text-blue-400" },
            { title: "Invoice #INV-2026-089 Paid via Razorpay", time: "28 mins ago", tag: "Finance", color: "bg-emerald-500/10 text-emerald-400" },
            { title: "Proposal Delivered via Meta WhatsApp API", time: "1 hour ago", tag: "Sales", color: "bg-purple-500/10 text-purple-400" },
            { title: "Sprint Task Completed: Clean Architecture EF Core", time: "2 hours ago", tag: "Projects", color: "bg-indigo-500/10 text-indigo-400" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-xs font-medium text-white">{item.title}</div>
                  <div className="text-[10px] text-zinc-400">{item.time}</div>
                </div>
              </div>
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-md ${item.color}`}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
