import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Edit, Trash2, UserPlus } from "lucide-react";
import { DeleteUserButton } from "@/components/admin/delete-user-button";
import { format } from "date-fns";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const search = params.search || "";
  const perPage = 20;

  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }
    : {};

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      where,
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
      },
      orderBy: { createdAt: "desc" },
      take: perPage,
      skip: (page - 1) * perPage,
    }),
    prisma.user.count({ where }),
  ]);

  const totalPages = Math.ceil(totalUsers / perPage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage all users and their permissions</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <form method="get" className="flex gap-2">
            <input
              type="text"
              name="search"
              placeholder="Search by name or email..."
              defaultValue={search}
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <Button type="submit">Search</Button>
            {search && (
              <Link href="/admin/users">
                <Button variant="outline">Clear</Button>
              </Link>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({totalUsers})</CardTitle>
          <CardDescription>View and manage user accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">User</th>
                  <th className="text-left p-2">Roles</th>
                  <th className="text-left p-2">Plan</th>
                  <th className="text-left p-2">Credits</th>
                  <th className="text-left p-2">Joined</th>
                  <th className="text-right p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50">
                    <td className="p-2">
                      <div>
                        <p className="font-medium">{user.name || "Anonymous"}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-1 flex-wrap">
                        {user.userRoles.length > 0 ? (
                          user.userRoles.map((ur) => (
                            <Badge key={ur.roleId} variant="secondary">
                              {ur.role.name}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="outline">No Roles</Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-2">
                      <Badge variant={user.subscription ? "default" : "outline"}>
                        {user.subscription?.plan.name || "Free"}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <span className="font-mono">{user.credits}</span>
                    </td>
                    <td className="p-2 text-sm text-muted-foreground">
                      {format(new Date(user.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="p-2">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/users/${user.id}`}>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteUserButton userId={user.id} userName={user.name || user.email} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {page > 1 && (
                <Link href={`/admin/users?page=${page - 1}${search ? `&search=${search}` : ""}`}>
                  <Button variant="outline">Previous</Button>
                </Link>
              )}
              <span className="py-2 px-4">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link href={`/admin/users?page=${page + 1}${search ? `&search=${search}` : ""}`}>
                  <Button variant="outline">Next</Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
