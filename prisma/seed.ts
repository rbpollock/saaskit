import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create roles
  const userRole = await prisma.role.upsert({
    where: { name: "USER" },
    update: {},
    create: {
      name: "USER",
      description: "Standard user with basic access",
    },
  });

  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: {
      name: "ADMIN",
      description: "Administrator with elevated permissions",
    },
  });

  const superAdminRole = await prisma.role.upsert({
    where: { name: "SUPER_ADMIN" },
    update: {},
    create: {
      name: "SUPER_ADMIN",
      description: "Super administrator with full system access",
    },
  });

  console.log("✅ Roles created");

  // Create permissions
  const permissions = [
    { name: "manage_users", description: "Create, read, update, delete users", category: "users" },
    { name: "manage_plans", description: "Manage subscription plans", category: "billing" },
    { name: "manage_discounts", description: "Create and manage discount codes", category: "billing" },
    { name: "view_analytics", description: "View system analytics and reports", category: "analytics" },
    { name: "manage_roles", description: "Manage roles and permissions", category: "users" },
    { name: "manage_blogs", description: "Create, edit, publish blogs", category: "content" },
    { name: "create_payments", description: "Create manual payments", category: "billing" },
    { name: "view_payments", description: "View payment history", category: "billing" },
  ];

  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { name: permission.name },
      update: {},
      create: permission,
    });
  }

  console.log("✅ Permissions created");

  // Assign permissions to roles
  const allPermissions = await prisma.permission.findMany();

  // Admins get most permissions
  const adminPermissions = allPermissions.filter(
    (p) => p.name !== "manage_roles" // Only super admin can manage roles
  );

  for (const permission of adminPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        permissionId: permission.id,
      },
    });
  }

  // Super admin gets all permissions (implicit in code, but we can assign them)
  for (const permission of allPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: permission.id,
      },
    });
  }

  console.log("✅ Role permissions assigned");

  // Create plans
  await prisma.plan.upsert({
    where: { name: "Free" },
    update: {},
    create: {
      name: "Free",
      description: "Perfect for trying out our platform",
      monthlyPrice: 0,
      yearlyPrice: 0,
      chatsPerMonth: 3,
      pdfsPerChat: 0,
      creditsPerMonth: 100,
      features: ["3 AI chats per month", "Basic AI models", "Email support"],
    },
  });

  await prisma.plan.upsert({
    where: { name: "Pro" },
    update: {},
    create: {
      name: "Pro",
      description: "Best for individuals and small teams",
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      chatsPerMonth: 5,
      pdfsPerChat: 1,
      creditsPerMonth: 1000,
      features: [
        "5 AI chats per month",
        "1 PDF upload per chat",
        "Advanced AI models",
        "Priority support",
        "Chat history",
      ],
    },
  });

  await prisma.plan.upsert({
    where: { name: "Business" },
    update: {},
    create: {
      name: "Business",
      description: "For growing businesses with advanced needs",
      monthlyPrice: 49.99,
      yearlyPrice: 499.99,
      chatsPerMonth: -1,
      pdfsPerChat: -1,
      creditsPerMonth: 10000,
      features: [
        "Unlimited AI chats",
        "Unlimited PDF uploads",
        "All AI models",
        "24/7 Priority support",
        "Advanced analytics",
        "API access",
      ],
    },
  });

  console.log("✅ Plans created");

  // Create some sample blog categories and tags
  await prisma.category.upsert({
    where: { slug: "ai-news" },
    update: {},
    create: {
      name: "AI News",
      slug: "ai-news",
      description: "Latest updates in artificial intelligence",
    },
  });

  await prisma.category.upsert({
    where: { slug: "tutorials" },
    update: {},
    create: {
      name: "Tutorials",
      slug: "tutorials",
      description: "How-to guides and tutorials",
    },
  });

  await prisma.tag.upsert({
    where: { slug: "machine-learning" },
    update: {},
    create: {
      name: "Machine Learning",
      slug: "machine-learning",
    },
  });

  await prisma.tag.upsert({
    where: { slug: "chatbots" },
    update: {},
    create: {
      name: "Chatbots",
      slug: "chatbots",
    },
  });

  console.log("✅ Blog categories and tags created");
  console.log("🎉 Database seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
