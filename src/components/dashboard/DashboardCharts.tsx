"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Coins, MessageSquare } from "lucide-react";

interface DashboardChartsProps {
  creditData: { day: string; credits: number }[];
  chatActivityData: { day: string; chats: number }[];
}

export function DashboardCharts({ creditData, chatActivityData }: DashboardChartsProps) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Credit Usage Chart */}
      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-lg font-semibold text-foreground">Credit Usage</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">Your credit consumption over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {creditData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={creditData}>
                <defs>
                  <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                <XAxis dataKey="day" stroke="#9ca3af" className="dark:stroke-gray-500" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" className="dark:stroke-gray-500" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: '12px' }}
                  formatter={(value: any) => [`${value} credits`, "Used"]}
                />
                <Area type="monotone" dataKey="credits" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCredits)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-[250px] text-muted-foreground">
              <Coins className="h-12 w-12 mb-3" />
              <p className="text-sm">No credit usage data yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Chat Activity Chart */}
      <Card className="border-border">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-lg font-semibold text-foreground">Chat Activity</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">Your conversations over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {chatActivityData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chatActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-700" />
                <XAxis dataKey="day" stroke="#9ca3af" className="dark:stroke-gray-500" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" className="dark:stroke-gray-500" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: '12px' }}
                  formatter={(value: any) => [`${value}`, "Chats"]}
                />
                <Bar dataKey="chats" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-[250px] text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-3" />
              <p className="text-sm">No recent chat activity</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
