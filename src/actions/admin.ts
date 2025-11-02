"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasRole } from "@/lib/rbac";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Check if user is admin
async function checkAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const isAdmin = await hasRole("ADMIN") || await hasRole("SUPER_ADMIN");
  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  return session;
}

// User Management Actions
export async function updateUser(userId: string, data: { name?: string; email?: string; credits?: number }) {
  await checkAdmin();

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        email: data.email,
        credits: data.credits,
      },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update user" };
  }
}

export async function deleteUser(userId: string) {
  await checkAdmin();

  try {
    // Delete user and all related data (cascade will handle most)
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete user" };
  }
}

export async function assignRole(userId: string, roleId: string) {
  await checkAdmin();

  try {
    // Check if user already has this role
    const existing = await prisma.userRole.findFirst({
      where: {
        userId,
        roleId,
      },
    });

    if (existing) {
      return { success: false, error: "User already has this role" };
    }

    await prisma.userRole.create({
      data: {
        userId,
        roleId,
      },
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin/roles");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to assign role" };
  }
}

export async function removeRole(userId: string, roleId: string) {
  await checkAdmin();

  try {
    await prisma.userRole.deleteMany({
      where: {
        userId,
        roleId,
      },
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin/roles");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to remove role" };
  }
}

// Subscription Management Actions
export async function cancelSubscription(subscriptionId: string) {
  await checkAdmin();

  try {
    await prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: "canceled" },
    });

    revalidatePath("/admin/subscriptions");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to cancel subscription" };
  }
}

export async function changeUserPlan(userId: string, planId: string) {
  await checkAdmin();

  try {
    // Find or create subscription
    const subscription = await prisma.subscription.findFirst({
      where: { userId },
    });

    if (subscription) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { planId },
      });
    } else {
      await prisma.subscription.create({
        data: {
          userId,
          planId,
          status: "active",
        },
      });
    }

    revalidatePath("/admin/subscriptions");
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to change user plan" };
  }
}

// Blog Management Actions
const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().optional(),
  published: z.boolean(),
  categoryId: z.string().optional(),
});

export async function createBlogPost(data: z.infer<typeof blogSchema>) {
  const session = await checkAdmin();

  try {
    const validatedData = blogSchema.parse(data);
    const { categoryId, ...blogData } = validatedData;

    const blog = await prisma.blog.create({
      data: {
        ...blogData,
        authorId: session.user.id,
        publishedAt: validatedData.published ? new Date() : null,
      },
    });

    // Create category relationship if categoryId provided
    if (categoryId) {
      await prisma.blogCategory.create({
        data: {
          blogId: blog.id,
          categoryId: categoryId,
        },
      });
    }

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to create blog post" };
  }
}

export async function updateBlogPost(postId: string, data: z.infer<typeof blogSchema>) {
  await checkAdmin();

  try {
    const validatedData = blogSchema.parse(data);
    const { categoryId, ...blogData } = validatedData;

    await prisma.blog.update({
      where: { id: postId },
      data: {
        ...blogData,
        publishedAt: validatedData.published ? new Date() : null,
      },
    });

    // Update category relationship
    // First, delete all existing categories for this blog
    await prisma.blogCategory.deleteMany({
      where: { blogId: postId },
    });

    // Then create new category relationship if categoryId provided
    if (categoryId) {
      await prisma.blogCategory.create({
        data: {
          blogId: postId,
          categoryId: categoryId,
        },
      });
    }

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update blog post" };
  }
}

export async function deleteBlogPost(postId: string) {
  await checkAdmin();

  try {
    await prisma.blog.delete({
      where: { id: postId },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete blog post" };
  }
}

// Payment Management Actions
export async function refundPayment(paymentId: string) {
  await checkAdmin();

  try {
    await prisma.payment.update({
      where: { id: paymentId },
      data: { status: "refunded" },
    });

    revalidatePath("/admin/payments");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to refund payment" };
  }
}
