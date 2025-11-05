import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function assignSuperAdmin() {
  const userId = "cmhgicpl60000w4r0o5gr0xjs";

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      console.error(`❌ User with ID ${userId} not found`);
      return;
    }

    console.log(`✓ Found user: ${user.name || user.email}`);

    // Find SUPER_ADMIN role
    const superAdminRole = await prisma.role.findUnique({
      where: { name: "SUPER_ADMIN" },
    });

    if (!superAdminRole) {
      console.error("❌ SUPER_ADMIN role not found in database");
      return;
    }

    // Check if user already has SUPER_ADMIN role
    const hasRole = user.userRoles.some(
      (ur: { role: { name: string } }) => ur.role.name === "SUPER_ADMIN"
    );

    if (hasRole) {
      console.log("✓ User already has SUPER_ADMIN role");
      return;
    }

    // Assign SUPER_ADMIN role
    await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: superAdminRole.id,
      },
    });

    console.log("✅ Successfully assigned SUPER_ADMIN role to user");
    console.log(`   User: ${user.name || user.email}`);
    console.log(`   Email: ${user.email}`);
  } catch (error) {
    console.error("Error assigning Super Admin role:", error);
  } finally {
    await prisma.$disconnect();
  }
}

assignSuperAdmin();
