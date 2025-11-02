import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
});

/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags:
 *       - Categories
 *     summary: List all categories
 *     description: Get list of all blog categories. Public endpoint.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search categories by name
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: clx1234567890abcdef
 *                       name:
 *                         type: string
 *                         example: Technology
 *                       slug:
 *                         type: string
 *                         example: technology
 *                       description:
 *                         type: string
 *                         nullable: true
 *                         example: Articles about technology and software
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       _count:
 *                         type: object
 *                         properties:
 *                           blogs:
 *                             type: integer
 *                             description: Number of blog posts in this category
 *                             example: 15
 *       500:
 *         description: Internal server error
 *   post:
 *     tags:
 *       - Categories
 *     summary: Create a new category
 *     description: Create a new blog category. Requires ADMIN or SUPER_ADMIN role.
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *             properties:
 *               name:
 *                 type: string
 *                 example: Artificial Intelligence
 *               slug:
 *                 type: string
 *                 example: artificial-intelligence
 *               description:
 *                 type: string
 *                 example: Articles about AI and machine learning
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Category created successfully
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
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
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const where: any = {};

    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    const categories = await prisma.category.findMany({
      where,
      include: {
        _count: {
          select: {
            blogs: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
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
    const validatedData = createCategorySchema.parse(body);
    const { name, slug, description } = validatedData;

    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "A category with this slug already exists" },
        { status: 400 }
      );
    }

    // Create category
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
      },
    });

    return NextResponse.json(
      {
        message: "Category created successfully",
        category: {
          id: category.id,
          name: category.name,
          slug: category.slug,
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

    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
