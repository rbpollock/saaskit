import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function RolesPage() {
  const roles = await prisma.role.findMany({
    include: {
      userRoles: {
        include: {
          user: true,
        },
      },
      rolePermissions: {
        include: {
          permission: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Role Management</h1>
        <p className="text-muted-foreground">View roles and permissions</p>
      </div>

      <div className="grid gap-6">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {role.name}
                    <Badge variant="secondary">{role.userRoles.length} users</Badge>
                  </CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Permissions */}
                <div>
                  <h3 className="text-sm font-medium mb-2">Permissions</h3>
                  <div className="flex flex-wrap gap-2">
                    {role.rolePermissions.length > 0 ? (
                      role.rolePermissions.map((rp) => (
                        <Badge key={rp.permissionId} variant="outline">
                          {rp.permission.name}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-muted-foreground">No permissions assigned</span>
                    )}
                  </div>
                </div>

                {/* Users with this role */}
                {role.userRoles.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Users with this role</h3>
                    <div className="space-y-2">
                      {role.userRoles.slice(0, 5).map((ur) => (
                        <div key={ur.userId} className="flex items-center gap-2 text-sm">
                          <span className="font-medium">{ur.user.name || "Anonymous"}</span>
                          <span className="text-muted-foreground">{ur.user.email}</span>
                        </div>
                      ))}
                      {role.userRoles.length > 5 && (
                        <p className="text-sm text-muted-foreground">
                          ...and {role.userRoles.length - 5} more
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
