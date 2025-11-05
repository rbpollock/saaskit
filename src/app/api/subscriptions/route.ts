import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

/**
 * @swagger
 * /api/subscriptions:
 *   get:
 *     tags:
 *       - Subscriptions
 *     summary: List all subscriptions
 *     description: Get paginated list of all subscriptions. Requires ADMIN or SUPER_ADMIN role. Regular users can only see their own subscription.
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
 *         description: Number of subscriptions per page
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID (admin only)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, canceled, incomplete, incomplete_expired, past_due, paused, trialing, unpaid]
 *         description: Filter by subscription status
 *       - in: query
 *         name: planId
 *         schema:
 *           type: string
 *         description: Filter by plan ID (admin only)
 *     responses:
 *       200:
 *         description: List of subscriptions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 subscriptions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       stripeSubscriptionId:
 *                         type: string
 *                         example: sub_Example789012
 *                       stripeCustomerId:
 *                         type: string
 *                         example: cus_Example123456
 *                       status:
 *                         type: string
 *                         example: active
 *                       billingCycle:
 *                         type: string
 *                         enum: [month, year]
 *                       currentPeriodStart:
 *                         type: string
 *                         format: date-time
 *                       currentPeriodEnd:
 *                         type: string
 *                         format: date-time
 *                       cancelAtPeriodEnd:
 *                         type: boolean
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
 *                       plan:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           price:
 *                             type: number
 *                           creditsPerMonth:
 *                             type: integer
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
      (ur: { role: { name: string } }) => ur.role.name === "ADMIN" || ur.role.name === "SUPER_ADMIN"
    );

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = Math.min(
      parseInt(searchParams.get("perPage") || "10"),
      100
    );
    const userIdFilter = searchParams.get("userId");
    const statusFilter = searchParams.get("status");
    const planIdFilter = searchParams.get("planId");

    // Build where clause
    const where: any = {};

    // Non-admin users can only see their own subscription
    if (!isAdmin) {
      where.userId = session.user.id;
    } else {
      if (userIdFilter) {
        where.userId = userIdFilter;
      }
      if (planIdFilter) {
        where.planId = planIdFilter;
      }
    }

    if (statusFilter) {
      where.status = statusFilter;
    }

    const [subscriptions, total] = await Promise.all([
      prisma.subscription.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          plan: {
            select: {
              id: true,
              name: true,
              monthlyPrice: true,
              yearlyPrice: true,
              creditsPerMonth: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: perPage,
        skip: (page - 1) * perPage,
      }),
      prisma.subscription.count({ where }),
    ]);

    return NextResponse.json({
      subscriptions,
      pagination: {
        total,
        page,
        perPage,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
