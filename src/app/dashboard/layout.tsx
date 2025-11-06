import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard-nav";
import { UserMenu } from "@/components/user-menu";
import { SessionProvider } from "next-auth/react";
import { Menu } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <SessionProvider session={session}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Sidebar with dark mode support */}
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
          {/* Logo */}
          <div className="flex h-16 items-center border-b border-gray-200 dark:border-gray-800 px-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">AI SaaS</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="p-4">
            <DashboardNav />
          </div>
        </aside>

        {/* Main content */}
        <div className="ml-64 flex-1 flex flex-col">
          {/* Top Navbar */}
          <header className="sticky top-0 z-30 h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="lg:hidden rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            </div>
            <UserMenu />
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
