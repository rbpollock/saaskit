import Link from "next/link";
import { Navbar } from "@/components/navbar";
import {
  BookOpen,
  Rocket,
  Shield,
  CreditCard,
  Code,
  Database,
  Settings,
  FileText,
  Zap,
  Cloud,
  ChevronRight,
} from "lucide-react";

const navigation = [
  {
    title: "Getting Started",
    items: [
      { name: "Introduction", href: "/docs", icon: BookOpen },
      { name: "Quick Start", href: "/docs/quickstart", icon: Rocket },
      { name: "Installation", href: "/docs/installation", icon: Settings },
    ],
  },
  {
    title: "Core Features",
    items: [
      { name: "Authentication", href: "/docs/authentication", icon: Shield },
      { name: "Billing & Subscriptions", href: "/docs/billing", icon: CreditCard },
      { name: "API Integration", href: "/docs/api", icon: Code },
      { name: "Database & Prisma", href: "/docs/database", icon: Database },
    ],
  },
  {
    title: "Guides",
    items: [
      { name: "Admin Dashboard", href: "/docs/admin", icon: Settings },
      { name: "Blog System", href: "/docs/blog", icon: FileText },
      { name: "AI Integration", href: "/docs/ai", icon: Zap },
      { name: "Deployment", href: "/docs/deployment", icon: Cloud },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1 pt-16">
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          {/* Sidebar Navigation */}
          <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
            <div className="py-6 pr-6 lg:py-8">
              {navigation.map((section) => (
                <div key={section.title} className="mb-8">
                  <h4 className="mb-3 px-2 text-sm font-semibold text-foreground">
                    {section.title}
                  </h4>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="relative py-6 lg:gap-10 lg:py-8">
            <div className="mx-auto w-full min-w-0">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
