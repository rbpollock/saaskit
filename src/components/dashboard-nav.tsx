"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  CreditCard,
  Settings,
  Users,
  BarChart3,
  BookOpen,
} from "lucide-react";
import { useIsAdmin } from "@/hooks/use-permission";

const userNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Chat",
    href: "/dashboard/chat",
    icon: MessageSquare,
  },
  {
    title: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

const adminNavItems = [
  {
    title: "Admin",
    href: "/admin",
    icon: BarChart3,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Blog",
    href: "/admin/blog",
    icon: BookOpen,
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  const isAdmin = useIsAdmin();

  return (
    <nav className="space-y-1">
      {userNavItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            )}
          >
            <Icon className="h-5 w-5" />
            {item.title}
          </Link>
        );
      })}

      {isAdmin && (
        <>
          <div className="my-3 border-t border-gray-200 dark:border-gray-800" />
          <div className="px-3 py-2">
            <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Admin</p>
          </div>
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </>
      )}
    </nav>
  );
}
