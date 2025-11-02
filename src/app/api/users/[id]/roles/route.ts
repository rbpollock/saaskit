import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const assignRoleSchema = z.object({
  roleId: z.string().min(1, "Role ID is required"),
});

const removeRoleSchema = z.object({
  roleId: z.string().min(1, "Role ID is required"),
});

/**
 * @swagger
 * /api/users/{id}/roles:
 *   post:
 *     tags:
 *       - Users
 *     summary: Assign role to user
 *     description: Assign a role to a user. Requires SUPER_ADMIN role. Cannot assign SUPER_ADMIN role to others unless you are SUPER_ADMIN.
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *             properties:
 *               roleId:
 *                 type: string
 *                 example: clx0987654321fedcba
 *                 description: ID of the role to assign
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role assigned successfully
 *       400:
 *         description: Validation error or user already has this role
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized (requires SUPER_ADMIN)
 *       404:
 *         description: User or role not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Users
 *     summary: Remove role from user
 *     description: Remove a role from a user. Requires SUPER_ADMIN role.
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - roleId
 *             properties:
 *               roleId:
 *                 type: string
 *                 example: clx0987654321fedcba
 *                 description: ID of the role to remove
 *     responses:
 *       200:
 *         description: Role removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Role removed successfully
 *       400:
 *         description: Validation error or user doesn't have this role
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: User or role not found
 *       500:
 *         description: Internal server error
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is super admin
    const userRoles = await prisma.userRole.findMany({
      where: { userId: session.user.id },
      include: { role: true },
    });

    const isSuperAdmin = userRoles.some((ur) => ur.role.name === "SUPER_ADMIN");

    if (!isSuperAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    // Validate input
    const validatedData = assignRoleSchema.parse(body);
    const { roleId } = validatedData;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if role exists
    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    // Check if user already has this role
    const existingUserRole = await prisma.userRole.findUnique({
      where: {
        userId_roleId: {
          userId: id,
          roleId: roleId,
        },
      },
    });

    if (existingUserRole) {
      return NextResponse.json(
        { error: "User already has this role" },
        { status: 400 }
      );
    }

    // Assign role
    await prisma.userRole.create({
      data: {
        userId: id,
        roleId: roleId,
      },
    });

    return NextResponse.json({
      message: "Role assigned successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Error assigning role:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is super admin
    const userRoles = await prisma.userRole.findMany({
      where: { userId: session.user.id },
      include: { role: true },
    });

    const isSuperAdmin = userRoles.some((ur) => ur.role.name === "SUPER_ADMIN");

    if (!isSuperAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    // Validate input
    const validatedData = removeRoleSchema.parse(body);
    const { roleId } = validatedData;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if role exists
    const role = await prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!role) {
      return NextResponse.json({ error: "Role not found" }, { status: 404 });
    }

    // Check if user has this role
    const existingUserRole = await prisma.userRole.findUnique({
      where: {
        userId_roleId: {
          userId: id,
          roleId: roleId,
        },
      },
    });

    if (!existingUserRole) {
      return NextResponse.json(
        { error: "User doesn't have this role" },
        { status: 400 }
      );
    }

    // Remove role
    await prisma.userRole.delete({
      where: {
        userId_roleId: {
          userId: id,
          roleId: roleId,
        },
      },
    });

    return NextResponse.json({
      message: "Role removed successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Error removing role:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
