import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EditUserForm } from "@/components/admin/edit-user-form";
import { ManageRolesForm } from "@/components/admin/manage-roles-form";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      userRoles: {
        include: {
          role: true,
        },
      },
      subscription: {
        include: {
          plan: true,
        },
      },
      chats: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
      payments: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!user) {
    notFound();
  }

  const allRoles = await prisma.role.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit User</h1>
        <p className="text-muted-foreground">Manage user details and permissions</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Details */}
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
            <CardDescription>Basic user information</CardDescription>
          </CardHeader>
          <CardContent>
            <EditUserForm user={user} />
          </CardContent>
        </Card>

        {/* Role Management */}
        <Card>
          <CardHeader>
            <CardTitle>Roles & Permissions</CardTitle>
            <CardDescription>Manage user roles</CardDescription>
          </CardHeader>
          <CardContent>
            <ManageRolesForm
              userId={user.id}
              userRoles={user.userRoles.map((ur) => ur.role)}
              allRoles={allRoles}
            />
          </CardContent>
        </Card>
      </div>

      {/* User Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Chats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.chats.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.credits}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant={user.subscription ? "default" : "outline"}>
              {user.subscription?.plan.name || "Free"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Member Since</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">{format(new Date(user.createdAt), "MMM d, yyyy")}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Chats</CardTitle>
            <CardDescription>Last 5 chat sessions</CardDescription>
          </CardHeader>
          <CardContent>
            {user.chats.length > 0 ? (
              <div className="space-y-2">
                {user.chats.map((chat) => (
                  <div key={chat.id} className="flex justify-between text-sm border-b pb-2">
                    <span className="truncate">{chat.title}</span>
                    <span className="text-muted-foreground">
                      {format(new Date(chat.createdAt), "MMM d")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No chats yet</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Last 5 transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {user.payments.length > 0 ? (
              <div className="space-y-2">
                {user.payments.map((payment) => (
                  <div key={payment.id} className="flex justify-between text-sm border-b pb-2">
                    <div>
                      <Badge variant={payment.status === "succeeded" ? "default" : "secondary"}>
                        {payment.status}
                      </Badge>
                    </div>
                    <span className="font-medium">${payment.amount.toFixed(2)}</span>
                    <span className="text-muted-foreground">
                      {format(new Date(payment.createdAt), "MMM d")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No payments yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
