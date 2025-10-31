import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function hasPermission(permission: string): Promise<boolean> {
  const session = await auth();
  if (!session?.user) return false;

  // Super admin has all permissions
  if (session.user.roles?.includes("SUPER_ADMIN")) return true;

  return session.user.permissions?.includes(permission) ?? false;
}

export async function hasRole(role: string): Promise<boolean> {
  const session = await auth();
  if (!session?.user) return false;

  return session.user.roles?.includes(role) ?? false;
}

export async function getUserPermissions(userId: string): Promise<string[]> {
  const userRoles = await prisma.userRole.findMany({
    where: { userId },
    include: {
      role: {
        include: {
          rolePermissions: {
            include: {
              permission: true,
            },
          },
        },
      },
    },
  });

  return Array.from(
    new Set(
      userRoles.flatMap((ur) =>
        ur.role.rolePermissions.map((rp) => rp.permission.name)
      )
    )
  );
}

export async function assignRole(userId: string, roleName: string) {
  const role = await prisma.role.findUnique({ where: { name: roleName } });
  if (!role) throw new Error("Role not found");

  return prisma.userRole.create({
    data: { userId, roleId: role.id },
  });
}

export async function removeRole(userId: string, roleName: string) {
  const role = await prisma.role.findUnique({ where: { name: roleName } });
  if (!role) throw new Error("Role not found");

  return prisma.userRole.delete({
    where: {
      userId_roleId: {
        userId,
        roleId: role.id,
      },
    },
  });
}
