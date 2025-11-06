"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface CollapsibleSidebarLayoutProps {
  logo: React.ReactNode;
  navigation: React.ReactNode;
  header: React.ReactNode;
  children: React.ReactNode;
  isAdmin?: boolean;
}

export function CollapsibleSidebarLayout({
  logo,
  navigation,
  header,
  children,
  isAdmin = false,
}: CollapsibleSidebarLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Load collapsed state from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    if (stored !== null) {
      setIsCollapsed(stored === "true");
    }
  }, []);

  // Save collapsed state to localStorage
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Logo & Toggle Button */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 px-4">
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">{logo}</div>
          )}
          {isCollapsed && (
            <div className="flex justify-center w-full">{logo}</div>
          )}
          {!isCollapsed && (
            <button
              onClick={toggleCollapse}
              className="ml-2 rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Collapse sidebar"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          )}
        </div>

        {/* Expand button when collapsed */}
        {isCollapsed && (
          <div className="flex justify-center border-b border-gray-200 dark:border-gray-800 py-2">
            <button
              onClick={toggleCollapse}
              className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Expand sidebar"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className={cn("p-4", isCollapsed && "px-2")}>
          <div data-collapsed={isCollapsed}>{navigation}</div>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isCollapsed ? "ml-20" : "ml-64"
        )}
      >
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 flex items-center justify-between">
          {header}
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
