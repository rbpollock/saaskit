"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, User, Coins } from "lucide-react";
import { useSession } from "next-auth/react";

export function UserMenu() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4">
      {session?.user && (
        <>
          <div className="flex items-center gap-2 text-sm">
            <Coins className="h-4 w-4 text-primary" />
            <span className="font-semibold">{session.user.credits || 0}</span>
            <span className="text-muted-foreground">credits</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="text-sm">{session.user.name || session.user.email}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </>
      )}
    </div>
  );
}
