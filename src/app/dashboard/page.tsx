import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Coins, CreditCard, TrendingUp, Zap, Calendar, ArrowRight, Sparkles, Target, Clock, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { Badge } from "@/components/ui/badge";

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
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Track your account activity and usage</p>
        </div>
        <Link href="/dashboard/chat">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Zap className="h-4 w-4 mr-2" />
            Start New Chat
          </Button>
        </Link>
      </div>

      {/* Stats Grid with Clean Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {/* Available Credits Card */}
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Available Credits</p>
                <h3 className="text-2xl font-bold text-foreground mt-2">{user?.credits || 0}</h3>
              </div>
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                <Coins className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Used: {usedCredits}</span>
                <span>Max: {maxCredits}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: `${100 - creditsPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Chats Card */}
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
                <h3 className="text-2xl font-bold text-foreground mt-2">{totalChats}</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  {usedCredits || 0} credits used
                </p>
              </div>
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3">
                <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Plan Card */}
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Plan</p>
                <h3 className="text-2xl font-bold text-foreground mt-2">
                  {user?.subscription?.plan.name || "Free"}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">
                  {user?.subscription?.status || "No active subscription"}
                </p>
              </div>
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                <CreditCard className="h-6 w-6 text-green-600 dark:text-green-400" />
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
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <DashboardCharts
        creditData={creditData}
        chatActivityData={chatActivityData}
      />

      {/* Recent Chats and Quick Actions */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Recent Chats */}
        <Card className="border-border lg:col-span-2">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">Recent Chats</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Your most recent AI conversations</CardDescription>
              </div>
              <Link href="/dashboard/chat">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  New Chat
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {user?.chats && user.chats.length > 0 ? (
              <div className="divide-y divide-border">
                {user.chats.slice(0, 6).map((chat: any, index: number) => (
                  <Link
                    key={chat.id}
                    href={`/dashboard/chat/${chat.id}`}
                    className="group flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shrink-0">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm line-clamp-1">{chat.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(chat.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">No chats yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Start your first AI conversation now!</p>
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

        {/* Quick Actions */}
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg font-semibold text-foreground">Quick Actions</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">Frequently used features</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <Link href="/dashboard/chat">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  New Chat
                </Button>
              </Link>
              <Link href="/dashboard/billing">
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Billing
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button variant="outline" className="w-full justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Star className="mr-2 h-4 w-4" />
                Rate Our Service
              </Button>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Upgrade to Pro</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Get unlimited credits and premium features</p>
                  <Link href="/dashboard/billing">
                    <Button size="sm" className="mt-3 bg-blue-600 hover:bg-blue-700 text-white">
                      Upgrade Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
