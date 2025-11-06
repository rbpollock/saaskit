import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Coins, CreditCard, TrendingUp, Zap, Calendar, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      subscription: {
        include: { plan: true },
      },
      chats: {
        take: 10,
        orderBy: { updatedAt: "desc" },
      },
    },
  });

  const creditUsage = await prisma.creditUsage.aggregate({
    where: { userId: session.user.id },
    _sum: { credits: true },
  });

  const totalChats = await prisma.chat.count({
    where: { userId: session.user.id },
  });

  // Get credit usage history over last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const creditUsageHistory = await prisma.creditUsage.findMany({
    where: {
      userId: session.user.id,
      createdAt: { gte: thirtyDaysAgo },
    },
    select: {
      credits: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  // Group credit usage by day
  const creditUsageByDay = creditUsageHistory.reduce((acc: any, usage: any) => {
    const day = new Date(usage.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    if (!acc[day]) {
      acc[day] = 0;
    }
    acc[day] += usage.credits;
    return acc;
  }, {});

  const creditData = Object.entries(creditUsageByDay).map(([day, credits]: any) => ({
    day,
    credits,
  }));

  // Get chat activity over last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentChats = await prisma.chat.findMany({
    where: {
      userId: session.user.id,
      createdAt: { gte: sevenDaysAgo },
    },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const chatsByDay = recentChats.reduce((acc: any, chat: any) => {
    const day = new Date(chat.createdAt).toLocaleDateString("en-US", { weekday: "short" });
    if (!acc[day]) {
      acc[day] = 0;
    }
    acc[day]++;
    return acc;
  }, {});

  const chatActivityData = Object.entries(chatsByDay).map(([day, count]: any) => ({
    day,
    chats: count,
  }));

  // Calculate percentage of credits used
  const maxCredits = user?.subscription?.plan?.creditsPerMonth || 100;
  const usedCredits = creditUsage._sum.credits || 0;
  const creditsPercentage = Math.min(100, (usedCredits / maxCredits) * 100);

  return (
    <div className="light min-h-screen bg-white p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-lg text-gray-600">Here's an overview of your account activity</p>
      </div>

      {/* Stats Grid with Gradient Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Available Credits Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-purple-700 p-6 text-white shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-2xl bg-white/20 backdrop-blur-md p-3">
              <Coins className="h-6 w-6" />
            </div>
            <div className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-xs font-bold">
              {maxCredits} max
            </div>
          </div>
          <div className="text-3xl font-extrabold mb-1">{user?.credits || 0}</div>
          <div className="text-sm text-purple-100 mb-3">Available Credits</div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-yellow-300 rounded-full transition-all"
              style={{ width: `${100 - creditsPercentage}%` }}
            />
          </div>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
        </div>

        {/* Total Chats Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 to-pink-700 p-6 text-white shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-2xl bg-white/20 backdrop-blur-md p-3">
              <MessageSquare className="h-6 w-6" />
            </div>
            <div className="rounded-full bg-green-500/20 backdrop-blur-md px-3 py-1 text-xs font-bold flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Active
            </div>
          </div>
          <div className="text-3xl font-extrabold mb-1">{totalChats}</div>
          <div className="text-sm text-pink-100">Total Conversations</div>
          <p className="text-xs text-pink-200 mt-2">
            {usedCredits || 0} credits used
          </p>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
        </div>

        {/* Current Plan Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-blue-700 p-6 text-white shadow-xl">
          <div className="flex items-start justify-between mb-4">
            <div className="rounded-2xl bg-white/20 backdrop-blur-md p-3">
              <CreditCard className="h-6 w-6" />
            </div>
            {user?.subscription?.plan.name !== "Free" && (
              <div className="rounded-full bg-yellow-500/20 backdrop-blur-md px-3 py-1 text-xs font-bold flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Pro
              </div>
            )}
          </div>
          <div className="text-3xl font-extrabold mb-1">
            {user?.subscription?.plan.name || "Free"}
          </div>
          <div className="text-sm text-blue-100 mb-3">
            {user?.subscription?.status || "No active subscription"}
          </div>
          {user?.subscription?.plan.name === "Free" && (
            <Link href="/dashboard/billing">
              <Button
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs font-bold"
              >
                Upgrade Plan
              </Button>
            </Link>
          )}
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-white/10 blur-xl" />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Credit Usage Chart */}
        <Card className="rounded-3xl border-2 border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Credit Usage</CardTitle>
            <CardDescription className="text-gray-600">Your credit consumption over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            {creditData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={creditData}>
                  <defs>
                    <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "2px solid #e5e7eb", borderRadius: "12px" }}
                    formatter={(value: any) => [`${value} credits`, "Used"]}
                  />
                  <Area type="monotone" dataKey="credits" stroke="#9333ea" strokeWidth={3} fillOpacity={1} fill="url(#colorCredits)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-[250px] text-gray-500">
                <Coins className="h-12 w-12 mb-3 text-gray-300" />
                <p>No credit usage data yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chat Activity Chart */}
        <Card className="rounded-3xl border-2 border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Chat Activity</CardTitle>
            <CardDescription className="text-gray-600">Your conversations over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            {chatActivityData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chatActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#fff", border: "2px solid #e5e7eb", borderRadius: "12px" }}
                    formatter={(value: any) => [`${value}`, "Chats"]}
                  />
                  <Bar dataKey="chats" fill="#ec4899" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-[250px] text-gray-500">
                <MessageSquare className="h-12 w-12 mb-3 text-gray-300" />
                <p>No recent chat activity</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Chats */}
      <Card className="rounded-3xl border-2 border-gray-200 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Recent Chats</CardTitle>
              <CardDescription className="text-gray-600">Your most recent AI conversations</CardDescription>
            </div>
            <Link href="/dashboard/chat">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold">
                <MessageSquare className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {user?.chats && user.chats.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {user.chats.slice(0, 6).map((chat: any, index: number) => (
                <Link
                  key={chat.id}
                  href={`/dashboard/chat/${chat.id}`}
                  className="group block rounded-2xl border-2 border-gray-100 bg-gradient-to-r from-purple-50/50 to-pink-50/50 p-4 transition-all hover:border-purple-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold shrink-0">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="font-bold text-gray-900 line-clamp-1 mb-1">{chat.title}</div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Calendar className="h-3 w-3" />
                    {new Date(chat.updatedAt).toLocaleDateString()}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">No chats yet</h3>
              <p className="text-gray-600 mb-4">Start your first AI conversation now!</p>
              <Link href="/dashboard/chat">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold">
                  <Zap className="mr-2 h-4 w-4" />
                  Start Your First Chat
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
