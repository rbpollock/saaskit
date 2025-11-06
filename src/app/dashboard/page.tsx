import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Coins, CreditCard, TrendingUp, Zap, Calendar, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";

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
    <div className="light min-h-screen bg-gray-50 p-6 space-y-7">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-sm text-gray-600 mt-1">Track your account activity and usage</p>
      </div>

      {/* Stats Grid with Clean Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {/* Available Credits Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Credits</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{user?.credits || 0}</h3>
            </div>
            <div className="rounded-full bg-blue-50 p-3">
              <Coins className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Used: {usedCredits}</span>
              <span>Max: {maxCredits}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${100 - creditsPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Total Chats Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Conversations</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{totalChats}</h3>
              <p className="text-xs text-gray-500 mt-2">
                {usedCredits || 0} credits used
              </p>
            </div>
            <div className="rounded-full bg-purple-50 p-3">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Current Plan Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Current Plan</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {user?.subscription?.plan.name || "Free"}
              </h3>
              <p className="text-xs text-gray-500 mt-2">
                {user?.subscription?.status || "No active subscription"}
              </p>
            </div>
            <div className="rounded-full bg-green-50 p-3">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
          </div>
          {user?.subscription?.plan.name === "Free" && (
            <Link href="/dashboard/billing" className="mt-4 block">
              <Button
                size="sm"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Upgrade Plan
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Charts Section */}
      <DashboardCharts
        creditData={creditData}
        chatActivityData={chatActivityData}
      />

      {/* Recent Chats */}
      <Card className="rounded-lg border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Recent Chats</CardTitle>
              <CardDescription className="text-sm text-gray-600">Your most recent AI conversations</CardDescription>
            </div>
            <Link href="/dashboard/chat">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <MessageSquare className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {user?.chats && user.chats.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {user.chats.slice(0, 6).map((chat: any, index: number) => (
                <Link
                  key={chat.id}
                  href={`/dashboard/chat/${chat.id}`}
                  className="group flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm line-clamp-1">{chat.title}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(chat.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <MessageSquare className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">No chats yet</h3>
              <p className="text-sm text-gray-600 mb-4">Start your first AI conversation now!</p>
              <Link href="/dashboard/chat">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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
