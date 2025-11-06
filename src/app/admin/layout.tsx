import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { hasRole } from "@/lib/rbac";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { UserMenu } from "@/components/user-menu";
import {
  Home,
  Users,
  Shield,
  CreditCard,
  BookOpen,
  FileText,
  LayoutDashboard,
  Menu,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const isAdmin = await hasRole("ADMIN") || await hasRole("SUPER_ADMIN");

  if (!isAdmin) {
    redirect("/dashboard");
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/roles", label: "Roles", icon: Shield },
    { href: "/admin/subscriptions", label: "Subscriptions", icon: CreditCard },
    { href: "/admin/blog", label: "Blog", icon: BookOpen },
    { href: "/admin/payments", label: "Payments", icon: FileText },
  ];

  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Sidebar with dark mode support */}
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
          {/* Logo & Back Button */}
          <div className="flex h-16 items-center border-b border-gray-200 dark:border-gray-800 px-6">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Home className="h-5 w-5" />
              <span className="text-sm font-medium">Back to App</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 p-4">
            <div className="px-3 py-2 mb-2">
              <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">Admin Panel</p>
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="ml-64 flex-1 flex flex-col">
          {/* Top Navbar */}
          <header className="sticky top-0 z-30 h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="lg:hidden rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Admin Dashboard</h1>
            </div>
            <UserMenu />
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
}
