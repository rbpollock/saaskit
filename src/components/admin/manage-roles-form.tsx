"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { assignRole, removeRole } from "@/actions/admin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { X, Plus } from "lucide-react";

export function ManageRolesForm({
  userId,
  userRoles,
  allRoles,
}: {
  userId: string;
  userRoles: any[];
  allRoles: any[];
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAssignRole = async (roleId: string) => {
    setIsSubmitting(true);
    const result = await assignRole(userId, roleId);

    if (result.success) {
      toast.success("Role assigned successfully");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to assign role");
    }

    setIsSubmitting(false);
  };

  const handleRemoveRole = async (roleId: string) => {
    setIsSubmitting(true);
    const result = await removeRole(userId, roleId);

    if (result.success) {
      toast.success("Role removed successfully");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to remove role");
    }

    setIsSubmitting(false);
  };

  const userRoleIds = userRoles.map((role) => role.id);
  const availableRoles = allRoles.filter((role) => !userRoleIds.includes(role.id));

  return (
    <div className="space-y-4">
      {/* Current Roles */}
      <div>
        <h3 className="text-sm font-medium mb-2">Current Roles</h3>
        {userRoles.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {userRoles.map((role) => (
              <Badge key={role.id} variant="default" className="gap-1">
                {role.name}
                <button
                  onClick={() => handleRemoveRole(role.id)}
                  disabled={isSubmitting}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No roles assigned</p>
        )}
      </div>

      {/* Available Roles */}
      {availableRoles.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Available Roles</h3>
          <div className="flex flex-wrap gap-2">
            {availableRoles.map((role) => (
              <Button
                key={role.id}
                variant="outline"
                size="sm"
                onClick={() => handleAssignRole(role.id)}
                disabled={isSubmitting}
              >
                <Plus className="h-3 w-3 mr-1" />
                {role.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
