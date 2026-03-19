"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Cloud,
  Code,
  CreditCard,
  Database,
  FileText,
  Menu,
  Rocket,
  Settings,
  Shield,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";

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

function SidebarNav({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="py-6 pr-0 lg:py-8">
      <div className="mb-6 rounded-[1.8rem] border border-[#c7b8aa] bg-[#f7f1e9] px-5 py-6 shadow-[0_18px_44px_-38px_rgba(31,27,24,0.3)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7a6f65]">
          Guidebook
        </p>
        <h3 className="font-display text-2xl text-[#1f1b18]">Documentation</h3>
        <p className="mt-2 text-sm leading-6 text-[#6e6359]">
          Reference for setup, operations, integrations, and production launch.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-[#5b534b]">
          <div className="rounded-2xl border border-[#d5c7ba] bg-[#efe6dc] px-3 py-3">
            <div className="font-semibold text-[#1f1b18]">Start</div>
            <div className="mt-1 leading-5">Quick start and installation</div>
          </div>
          <div className="rounded-2xl border border-[#d5c7ba] bg-[#efe6dc] px-3 py-3">
            <div className="font-semibold text-[#1f1b18]">Operate</div>
            <div className="mt-1 leading-5">Billing, AI, admin, deployment</div>
          </div>
        </div>
      </div>

      {navigation.map((section) => (
        <div key={section.title} className="mb-8">
          <h4 className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#7a6f65]">
            {section.title}
          </h4>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onItemClick}
                    className={cn(
                      "group flex items-center gap-3 rounded-[1rem] px-4 py-3 text-sm font-medium transition-all",
                      isActive
                        ? "bg-[#1f1b18] text-[#f3eadf]"
                        : "text-[#5f564d] hover:bg-[#e8ddd1] hover:text-[#1f1b18]"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div className="mt-8 rounded-[1.6rem] border border-[#c7b8aa] bg-[#f4ede5] px-5 py-5">
        <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7a6f65]">
          Resources
        </h4>
        <div className="mt-4 space-y-3 text-sm">
          <Link href="/docs/quickstart" className="flex items-center gap-2 text-[#5f564d] transition-colors hover:text-[#1f1b18]">
            <Rocket className="h-4 w-4" />
            Quick Start
          </Link>
          <Link href="/api-docs" className="flex items-center gap-2 text-[#5f564d] transition-colors hover:text-[#1f1b18]">
            <Code className="h-4 w-4" />
            API Reference
          </Link>
          <Link href="/docs/deployment" className="flex items-center gap-2 text-[#5f564d] transition-colors hover:text-[#1f1b18]">
            <Cloud className="h-4 w-4" />
            Deployment
          </Link>
          <Link href="/blog" className="flex items-center gap-2 text-[#5f564d] transition-colors hover:text-[#1f1b18]">
            <FileText className="h-4 w-4" />
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#E5DBCF] text-[#1f1b18]">
      <Navbar />

      <div className="flex-1 pt-20">
        <div className="sticky top-16 z-40 border-b border-[#c7b8aa] bg-[#E5DBCF]/95 backdrop-blur md:hidden">
          <div className="container flex items-center justify-between py-4">
            <h2 className="font-display text-2xl text-[#1f1b18]">Documentation</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-xl p-2 transition-colors hover:bg-[#ddd2c6]"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="container py-6 md:grid md:items-start md:grid-cols-[280px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10 lg:py-8">
          <aside className="docs-scrollbar hidden md:sticky md:top-24 md:block md:max-h-[calc(100vh-7rem)] md:self-start md:overflow-y-auto md:pr-1">
            <SidebarNav />
          </aside>

          {sidebarOpen && (
            <aside className="docs-scrollbar fixed inset-0 top-[8.5rem] z-30 overflow-y-auto bg-[#E5DBCF] px-4 pb-8 md:hidden">
              <SidebarNav onItemClick={() => setSidebarOpen(false)} />
            </aside>
          )}

          <main className="min-w-0">
            <div className="rounded-[2.2rem] border border-[#c7b8aa] bg-[#fbf7f1] p-6 shadow-[0_28px_60px_-46px_rgba(31,27,24,0.35)] md:p-8 lg:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
