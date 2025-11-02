import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const createBlogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  coverImage: z.string().url().optional(),
  published: z.boolean().default(false),
  categoryIds: z.array(z.string()).optional(),
});

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     tags:
 *       - Blogs
 *     summary: List all blog posts
 *     description: Get paginated list of blog posts. Public endpoint returns only published posts. Authenticated admins can see all posts.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of posts per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search posts by title or content
 *       - in: query
 *         name: published
 *         schema:
 *           type: boolean
 *         description: Filter by published status (admin only)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
 *     responses:
 *       200:
 *         description: List of blog posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       slug:
 *                         type: string
 *                       excerpt:
 *                         type: string
 *                       coverImage:
 *                         type: string
 *                         nullable: true
 *                       published:
 *                         type: boolean
 *                       views:
 *                         type: integer
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       author:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                       categories:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             name:
 *                               type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     perPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Internal server error
 *   post:
 *     tags:
 *       - Blogs
 *     summary: Create a new blog post
 *     description: Create a new blog post. Requires ADMIN or SUPER_ADMIN role.
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - slug
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: Getting Started with Next.js 15
 *               slug:
 *                 type: string
 *                 example: getting-started-nextjs-15
 *               content:
 *                 type: string
 *                 example: Next.js 15 brings exciting new features...
 *               excerpt:
 *                 type: string
 *                 example: A comprehensive guide to Next.js 15
 *               coverImage:
 *                 type: string
 *                 format: uri
 *                 example: https://example.com/cover.jpg
 *               published:
 *                 type: boolean
 *                 default: false
 *               categoryIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["clx1234567890abcdef"]
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Blog post created successfully
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
 *       500:
 *         description: Internal server error
 */
export async function GET(req: Request) {
  try {
    const session = await auth();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const perPage = Math.min(
      parseInt(searchParams.get("perPage") || "10"),
      100
    );
    const search = searchParams.get("search") || "";
    const categoryFilter = searchParams.get("category");
    const publishedFilter = searchParams.get("published");

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

    // Build where clause
    const where: any = {};

    // Non-admin users can only see published posts
    if (!isAdmin) {
      where.published = true;
    } else if (publishedFilter !== null && publishedFilter !== undefined) {
      // Admin can filter by published status
      where.published = publishedFilter === "true";
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    if (categoryFilter) {
      where.categories = {
        some: {
          categoryId: categoryFilter,
        },
      };
    }

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
          categories: {
            include: {
              category: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: perPage,
        skip: (page - 1) * perPage,
      }),
      prisma.blog.count({ where }),
    ]);

    // Format response
    const formattedBlogs = blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      coverImage: blog.coverImage,
      published: blog.published,
      views: blog.views,
      createdAt: blog.createdAt,
      author: blog.author,
      categories: blog.categories.map((bc) => bc.category),
    }));

    return NextResponse.json({
      blogs: formattedBlogs,
      pagination: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
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

    const body = await req.json();

    // Validate input
    const validatedData = createBlogSchema.parse(body);
    const { title, slug, content, excerpt, coverImage, published, categoryIds } =
      validatedData;

    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existingBlog) {
      return NextResponse.json(
        { error: "A blog post with this slug already exists" },
        { status: 400 }
      );
    }

    // Create blog post
    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        published,
        authorId: session.user.id,
      },
    });

    // Assign categories
    if (categoryIds && categoryIds.length > 0) {
      await prisma.blogCategory.createMany({
        data: categoryIds.map((categoryId) => ({
          blogId: blog.id,
          categoryId,
        })),
      });
    }

    return NextResponse.json(
      {
        message: "Blog post created successfully",
        blog: {
          id: blog.id,
          title: blog.title,
          slug: blog.slug,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
