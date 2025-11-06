import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProfileEditForm } from "@/components/profile-edit-form";
import { Shield, Key } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      email: true,
      image: true,
      createdAt: true,
      userRoles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  // Get primary role (first role or USER as default)
  const primaryRole = user.userRoles[0]?.role?.name || "USER";

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Profile Edit Form */}
      <ProfileEditForm user={user} />

      {/* Account Information */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Account Information</CardTitle>
          <CardDescription className="text-muted-foreground">
            Your account details and security information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-foreground">Account Role</p>
                <p className="text-sm text-muted-foreground">Your access level</p>
              </div>
            </div>
            <Badge variant="secondary" className="capitalize">
              {primaryRole.toLowerCase()}
            </Badge>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <Key className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-foreground">Member Since</p>
                <p className="text-sm text-muted-foreground">Account creation date</p>
              </div>
            </div>
            <p className="text-sm font-medium text-foreground">
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Appearance</CardTitle>
          <CardDescription className="text-muted-foreground">
            Customize the look and feel of your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Theme</p>
              <p className="text-sm text-muted-foreground">
                Choose between light and dark mode
              </p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
