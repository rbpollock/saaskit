"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  Shield,
  CreditCard,
  BookOpen,
  FileText,
  LayoutDashboard,
  Mail,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/roles", label: "Roles", icon: Shield },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
  { href: "/admin/marketing", label: "Marketing", icon: Mail },
  { href: "/admin/blog", label: "Blog", icon: BookOpen },
  { href: "/admin/payments", label: "Payments", icon: FileText },
];

export function AdminNav() {
  const pathname = usePathname();
  const isCollapsed = typeof document !== "undefined" &&
    document.querySelector('[data-collapsed="true"]') !== null;

  const NavLink = ({ item, isActive }: { item: typeof adminNavItems[0]; isActive: boolean }) => {
    const Icon = item.icon;
    const linkContent = (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
          isCollapsed && "justify-center"
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        {!isCollapsed && <span>{item.label}</span>}
      </Link>
    );

    if (isCollapsed) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              {linkContent}
            </TooltipTrigger>
            <TooltipContent side="right" className="font-medium">
              {item.label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return linkContent;
  };

  return (
    <nav className="space-y-1">
      {!isCollapsed && (
        <div className="px-3 py-2 mb-2">
          <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Admin Panel</p>
        </div>
      )}
      {adminNavItems.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
        return <NavLink key={item.href} item={item} isActive={isActive} />;
      })}
    </nav>
  );
}
