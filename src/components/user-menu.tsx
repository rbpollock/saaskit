"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, User, Coins, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function UserMenu() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4">
      {/* Search */}
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-64 pl-10 bg-gray-50 border-gray-200"
        />
      </div>

      {session?.user && (
        <>
          {/* Credits Badge */}
          <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5">
            <Coins className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">{session.user.credits || 0}</span>
            <span className="text-xs text-blue-600">credits</span>
          </div>

          {/* Notifications */}
          <button className="relative rounded-lg p-2 hover:bg-gray-100 transition-colors">
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-2 pr-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
              <User className="h-4 w-4" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-900">{session.user.name || "User"}</p>
              <p className="text-xs text-gray-500">{session.user.email}</p>
            </div>
          </div>

          {/* Sign Out */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="hidden lg:flex"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </>
      )}
    </div>
  );
}
