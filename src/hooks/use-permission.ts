"use client";

import { useSession } from "next-auth/react";

export function usePermission(permission: string): boolean {
  const { data: session } = useSession();

  if (!session?.user) return false;

  // Super admin has all permissions
  if (session.user.roles?.includes("SUPER_ADMIN")) return true;

  return session.user.permissions?.includes(permission) ?? false;
}

export function useRole(role: string): boolean {
  const { data: session } = useSession();

  if (!session?.user) return false;

  return session.user.roles?.includes(role) ?? false;
}

export function useIsSuperAdmin(): boolean {
  return useRole("SUPER_ADMIN");
}

export function useIsAdmin(): boolean {
  const { data: session } = useSession();

  if (!session?.user) return false;

  return (
    session.user.roles?.includes("ADMIN") ||
    session.user.roles?.includes("SUPER_ADMIN")
  ) ?? false;
}
