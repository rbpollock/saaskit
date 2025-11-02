import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const updateBlogSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
  content: z.string().min(1, "Content is required").optional(),
  excerpt: z.string().optional(),
  coverImage: z.string().url().optional().nullable(),
  published: z.boolean().optional(),
  categoryIds: z.array(z.string()).optional(),
});

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: Get blog post by ID
 *     description: Retrieve detailed information about a specific blog post. Public users can only view published posts.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog post ID or slug
 *     responses:
 *       200:
 *         description: Blog post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 content:
 *                   type: string
 *                 excerpt:
 *                   type: string
 *                 coverImage:
 *                   type: string
 *                   nullable: true
 *                 published:
 *                   type: boolean
 *                 views:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 author:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       slug:
 *                         type: string
 *       403:
 *         description: Blog post is not published (non-admin users)
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 *   put:
 *     tags:
 *       - Blogs
 *     summary: Update blog post
 *     description: Update an existing blog post. Requires ADMIN or SUPER_ADMIN role.
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               content:
 *                 type: string
 *               excerpt:
 *                 type: string
 *               coverImage:
 *                 type: string
 *                 format: uri
 *                 nullable: true
 *               published:
 *                 type: boolean
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Blog post updated successfully
 *                 blog:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     slug:
 *                       type: string
 *       400:
 *         description: Validation error or slug already exists
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Blogs
 *     summary: Delete blog post
 *     description: Delete a blog post. Requires ADMIN or SUPER_ADMIN role.
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog post ID
 *     responses:
 *       200:
 *         description: Blog post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Blog post deleted successfully
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    const { id } = await params;

    // Check if user is admin
    let isAdmin = false;
    if (session?.user) {
      const userRoles = await prisma.userRole.findMany({
        where: { userId: session.user.id },
        include: { role: true },
      });

      isAdmin = userRoles.some(
        (ur) => ur.role.name === "ADMIN" || ur.role.name === "SUPER_ADMIN"
      );
    }

    // Try to find by ID or slug
    const blog = await prisma.blog.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        categories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Non-admin users can only see published posts
    if (!isAdmin && !blog.published) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 403 }
      );
    }

    // Format response
    const formattedBlog = {
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt,
      coverImage: blog.coverImage,
      published: blog.published,
      views: blog.views,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
      author: blog.author,
      categories: blog.categories.map((bc) => bc.category),
    };

    return NextResponse.json(formattedBlog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const userRoles = await prisma.userRole.findMany({
      where: { userId: session.user.id },
      include: { role: true },
    });

    const isAdmin = userRoles.some(
      (ur) => ur.role.name === "ADMIN" || ur.role.name === "SUPER_ADMIN"
    );

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();

    // Validate input
    const validatedData = updateBlogSchema.parse(body);
    const { categoryIds, ...blogData } = validatedData;

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // If updating slug, check if it's already taken
    if (blogData.slug && blogData.slug !== existingBlog.slug) {
      const slugExists = await prisma.blog.findUnique({
        where: { slug: blogData.slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "A blog post with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Update blog post
    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: blogData,
    });

    // Update categories if provided
    if (categoryIds !== undefined) {
      // Delete existing categories
      await prisma.blogCategory.deleteMany({
        where: { blogId: id },
      });

      // Add new categories
      if (categoryIds.length > 0) {
        await prisma.blogCategory.createMany({
          data: categoryIds.map((categoryId) => ({
            blogId: id,
            categoryId,
          })),
        });
      }
    }

    return NextResponse.json({
      message: "Blog post updated successfully",
      blog: {
        id: updatedBlog.id,
        title: updatedBlog.title,
        slug: updatedBlog.slug,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Error updating blog:", error);
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

    // Check if user is admin
    const userRoles = await prisma.userRole.findMany({
      where: { userId: session.user.id },
      include: { role: true },
    });

    const isAdmin = userRoles.some(
      (ur) => ur.role.name === "ADMIN" || ur.role.name === "SUPER_ADMIN"
    );

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;

    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Delete blog (cascading deletes will handle categories)
    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
