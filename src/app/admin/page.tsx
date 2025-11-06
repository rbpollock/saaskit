import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, MessageSquare, TrendingUp, CreditCard, Activity, ArrowUp, ArrowDown } from "lucide-react";
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
    <div className="light min-h-screen bg-gray-50 p-6 space-y-7">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid with Clean Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Users Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{totalUsers}</h3>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
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
            <div className="rounded-full bg-blue-50 p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Active Subscriptions Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{activeSubscriptions}</h3>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
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
            <div className="rounded-full bg-green-50 p-3">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Total Chats Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Chats</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{totalChats}</h3>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
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
            <div className="rounded-full bg-purple-50 p-3">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                ${totalRevenue._sum.amount?.toFixed(2) || "0.00"}
              </h3>
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <Activity className="h-3 w-3" />
                <span>Live tracking</span>
              </p>
            </div>
            <div className="rounded-full bg-amber-50 p-3">
              <DollarSign className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <AdminCharts
        revenueData={revenueData}
        userGrowthData={userGrowthData}
        subscriptionData={subscriptionData}
      />

      {/* Recent Users */}
      <Card className="rounded-lg border border-gray-200 shadow-sm">
        <CardHeader className="border-b border-gray-200 bg-white">
          <CardTitle className="text-lg font-semibold text-gray-900">Recent Users</CardTitle>
          <CardDescription className="text-sm text-gray-600">Latest user registrations</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {recentUsers.map((user: any, index: number) => {
              const avatarColors = ["bg-blue-100 text-blue-700", "bg-green-100 text-green-700", "bg-purple-100 text-purple-700", "bg-amber-100 text-amber-700", "bg-pink-100 text-pink-700"];
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-full ${avatarColors[index % avatarColors.length]} font-semibold text-sm`}>
                      {user.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{user.name || "Anonymous"}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user.subscription?.plan.name || "Free"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.credits} credits
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
