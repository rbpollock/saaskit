import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, MessageSquare, TrendingUp, CreditCard, Activity, ArrowUp, ArrowDown, Clock, CheckCircle2, XCircle } from "lucide-react";
import { hasRole } from "@/lib/rbac";
import { AdminCharts } from "@/components/admin/AdminCharts";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const isAdmin = await hasRole("ADMIN") || await hasRole("SUPER_ADMIN");

  if (!isAdmin) {
    redirect("/dashboard");
  }

  // Get analytics data
  const totalUsers = await prisma.user.count();
  const activeSubscriptions = await prisma.subscription.count({
    where: { status: "active" },
  });
  const totalChats = await prisma.chat.count();
  const totalRevenue = await prisma.payment.aggregate({
    where: { status: "succeeded" },
    _sum: { amount: true },
  });

  // Get data for charts - Revenue over last 6 months
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const payments = await prisma.payment.findMany({
    where: {
      status: "succeeded",
      createdAt: { gte: sixMonthsAgo },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  // Group payments by month
  const revenueByMonth = payments.reduce((acc: any, payment: any) => {
    const month = new Date(payment.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += payment.amount;
    return acc;
  }, {});

  const revenueData = Object.entries(revenueByMonth).map(([month, revenue]: any) => ({
    month,
    revenue: parseFloat(revenue.toFixed(2)),
  }));

  // Get user growth data
  const users = await prisma.user.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    select: { createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  const usersByMonth = users.reduce((acc: any, user: any) => {
    const month = new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month]++;
    return acc;
  }, {});

  const userGrowthData = Object.entries(usersByMonth).map(([month, count]: any) => ({
    month,
    users: count,
  }));

  // Get subscription distribution
  const subscriptionsByPlan = await prisma.subscription.groupBy({
    by: ["planId"],
    where: { status: "active" },
    _count: true,
  });

  const plans = await prisma.plan.findMany();
  const subscriptionData = subscriptionsByPlan.map((sub: any) => {
    const plan = plans.find((p: any) => p.id === sub.planId);
    return {
      name: plan?.name || "Unknown",
      value: sub._count,
    };
  });

  const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: {
      subscription: {
        include: { plan: true },
      },
    },
  });

  // Calculate growth percentages (mock data for demo)
  const userGrowth = 12.5;
  const revenueGrowth = 8.3;
  const chatGrowth = 23.1;

  return (
    <div className="min-h-screen bg-background p-6 space-y-7">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Welcome to your admin dashboard</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Users className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Grid with Clean Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Users Card */}
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold text-foreground mt-2">{totalUsers}</h3>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  {userGrowth > 0 ? (
                    <>
                      <span className="text-green-600 flex items-center">
                        <ArrowUp className="h-3 w-3" />
                        {userGrowth}%
                      </span>
                      <span>vs last month</span>
                    </>
                  ) : (
                    <>
                      <span className="text-red-600 flex items-center">
                        <ArrowDown className="h-3 w-3" />
                        {Math.abs(userGrowth)}%
                      </span>
                      <span>vs last month</span>
                    </>
                  )}
                </p>
              </div>
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Subscriptions Card */}
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Subscriptions</p>
                <h3 className="text-2xl font-bold text-foreground mt-2">{activeSubscriptions}</h3>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  {revenueGrowth > 0 ? (
                    <>
                      <span className="text-green-600 flex items-center">
                        <ArrowUp className="h-3 w-3" />
                        {revenueGrowth}%
                      </span>
                      <span>vs last month</span>
                    </>
                  ) : (
                    <>
                      <span className="text-red-600 flex items-center">
                        <ArrowDown className="h-3 w-3" />
                        {Math.abs(revenueGrowth)}%
                      </span>
                      <span>vs last month</span>
                    </>
                  )}
                </p>
              </div>
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Chats Card */}
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Chats</p>
                <h3 className="text-2xl font-bold text-foreground mt-2">{totalChats}</h3>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  {chatGrowth > 0 ? (
                    <>
                      <span className="text-green-600 flex items-center">
                        <ArrowUp className="h-3 w-3" />
                        {chatGrowth}%
                      </span>
                      <span>vs last month</span>
                    </>
                  ) : (
                    <>
                      <span className="text-red-600 flex items-center">
                        <ArrowDown className="h-3 w-3" />
                        {Math.abs(chatGrowth)}%
                      </span>
                      <span>vs last month</span>
                    </>
                  )}
                </p>
              </div>
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3">
                <MessageSquare className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Revenue Card */}
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <h3 className="text-2xl font-bold text-foreground mt-2">
                  ${totalRevenue._sum.amount?.toFixed(2) || "0.00"}
                </h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  <span>Live tracking</span>
                </p>
              </div>
              <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
                <DollarSign className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <AdminCharts
        revenueData={revenueData}
        userGrowthData={userGrowthData}
        subscriptionData={subscriptionData}
      />

      {/* Recent Users and Activity */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Recent Users */}
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">Recent Users</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Latest user registrations</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {recentUsers.map((user: any, index: number) => {
                const avatarColors = ["bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400", "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400", "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400", "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400", "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400"];
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-full ${avatarColors[index % avatarColors.length]} font-semibold text-sm`}>
                        {user.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{user.name || "Anonymous"}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {user.subscription?.plan.name || "Free"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.credits} credits
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">Recent Activity</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Latest system activities</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">New user registered</p>
                  <p className="text-xs text-muted-foreground">John Doe signed up for Pro plan</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    2 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Payment received</p>
                  <p className="text-xs text-muted-foreground">$99.00 from Jane Smith</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    15 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">New chat session</p>
                  <p className="text-xs text-muted-foreground">User started AI conversation</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    1 hour ago
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Subscription cancelled</p>
                  <p className="text-xs text-muted-foreground">Mike Johnson cancelled Pro plan</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    3 hours ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
