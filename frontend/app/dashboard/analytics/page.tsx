"use client";

import { BarChart3, TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function AnalyticsPage() {
  const data = [
    { month: "Jan", leads: 18, won: 6, rev: 650000 },
    { month: "Feb", leads: 24, won: 9, rev: 780000 },
    { month: "Mar", leads: 32, won: 12, rev: 920000 },
    { month: "Apr", leads: 28, won: 10, rev: 890000 },
    { month: "May", leads: 38, won: 15, rev: 1150000 },
    { month: "Jun", leads: 42, won: 18, rev: 1250000 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-purple-400" />
          <span>Business Intelligence & Performance Analytics</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">Cross-functional reports on lead velocity, sales conversions & team throughput</p>
      </div>

      <div className="apple-glass p-6">
        <h3 className="text-sm font-bold text-white mb-4">Lead Velocity & Revenue Correlation</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="month" stroke="#86868b" fontSize={11} />
              <YAxis stroke="#86868b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: "#161618", borderColor: "#333" }} />
              <Area type="monotone" dataKey="rev" stroke="#af52de" fill="#af52de22" name="Revenue (INR)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
