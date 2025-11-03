import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";
import { CancelSubscriptionButton } from "@/components/admin/cancel-subscription-button";

export default async function SubscriptionsPage() {
  const subscriptions = await prisma.subscription.findMany({
    include: {
      user: true,
      plan: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter((s) => s.status === "active").length,
    canceled: subscriptions.filter((s) => s.status === "canceled").length,
    past_due: subscriptions.filter((s) => s.status === "past_due").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Subscription Management</h1>
        <p className="text-muted-foreground">Manage user subscriptions and plans</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Canceled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.canceled}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Past Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.past_due}</div>
          </CardContent>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
          <CardDescription>View and manage user subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">User</th>
                  <th className="text-left p-2">Plan</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Started</th>
                  <th className="text-left p-2">Current Period</th>
                  <th className="text-right p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div>
                        <p className="font-medium">{subscription.user.name || "Anonymous"}</p>
                        <p className="text-sm text-muted-foreground">{subscription.user.email}</p>
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge variant="default">{subscription.plan.name}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        ${subscription.billingCycle === 'yearly'
                          ? subscription.plan.yearlyPrice.toFixed(0)
                          : subscription.plan.monthlyPrice.toFixed(0)}/{subscription.billingCycle}
                      </p>
                    </td>
                    <td className="p-2">
                      <Badge
                        variant={
                          subscription.status === "active"
                            ? "default"
                            : subscription.status === "canceled"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {subscription.status}
                      </Badge>
                    </td>
                    <td className="p-2 text-sm">
                      {format(new Date(subscription.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="p-2 text-sm">
                      {subscription.currentPeriodStart && subscription.currentPeriodEnd ? (
                        <div>
                          <div>{format(new Date(subscription.currentPeriodStart), "MMM d, yyyy")}</div>
                          <div className="text-muted-foreground">
                            to {format(new Date(subscription.currentPeriodEnd), "MMM d, yyyy")}
                          </div>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">N/A</span>
                      )}
                    </td>
                    <td className="p-2">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/users/${subscription.userId}`}>
                          <Button size="sm" variant="outline">
                            View User
                          </Button>
                        </Link>
                        {subscription.status === "active" && (
                          <CancelSubscriptionButton
                            subscriptionId={subscription.id}
                            userName={subscription.user.name || subscription.user.email}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {subscriptions.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No subscriptions found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
