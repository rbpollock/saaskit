import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

/**
 * @swagger
 * /api/payments:
 *   get:
 *     tags:
 *       - Payments
 *     summary: List all payments
 *     description: Get paginated list of all payments. Requires ADMIN or SUPER_ADMIN role. Regular users can only see their own payments.
 *     security:
 *       - sessionAuth: []
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
 *         description: Number of payments per page
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID (admin only)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [succeeded, failed, pending, refunded]
 *         description: Filter by payment status
 *     responses:
 *       200:
 *         description: List of payments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       stripePaymentId:
 *                         type: string
 *                         example: pi_1OXd9KExample123456
 *                       amount:
 *                         type: number
 *                         example: 19.00
 *                       currency:
 *                         type: string
 *                         example: usd
 *                       status:
 *                         type: string
 *                         enum: [succeeded, failed, pending, refunded]
 *                       description:
 *                         type: string
 *                         nullable: true
 *                       invoiceUrl:
 *                         type: string
 *                         nullable: true
 *                       receiptUrl:
 *                         type: string
 *                         nullable: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       user:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
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
 *       401:
 *         description: Not authenticated
 *       500:
 *         description: Internal server error
 */
export async function GET(req: Request) {
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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = Math.min(
      parseInt(searchParams.get("perPage") || "10"),
      100
    );
    const userIdFilter = searchParams.get("userId");
    const statusFilter = searchParams.get("status");

    // Build where clause
    const where: any = {};

    // Non-admin users can only see their own payments
    if (!isAdmin) {
      where.userId = session.user.id;
    } else if (userIdFilter) {
      // Admin can filter by user ID
      where.userId = userIdFilter;
    }

    if (statusFilter) {
      where.status = statusFilter;
    }

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: perPage,
        skip: (page - 1) * perPage,
      }),
      prisma.payment.count({ where }),
    ]);

    return NextResponse.json({
      payments,
      pagination: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
