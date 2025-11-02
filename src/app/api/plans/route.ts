import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/plans:
 *   get:
 *     tags:
 *       - Plans
 *     summary: List all subscription plans
 *     description: Get list of all available subscription plans. Public endpoint.
 *     responses:
 *       200:
 *         description: List of plans retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 plans:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: clx1234567890abcdef
 *                       name:
 *                         type: string
 *                         example: Pro Plan
 *                       description:
 *                         type: string
 *                         example: Perfect for professionals
 *                       price:
 *                         type: number
 *                         example: 19.00
 *                       creditsPerMonth:
 *                         type: integer
 *                         example: 1000
 *                       features:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["1000 credits/month", "Priority support", "Advanced features"]
 *                       stripePriceId:
 *                         type: string
 *                         nullable: true
 *                         example: price_1OXd9KExample123456
 *                       _count:
 *                         type: object
 *                         properties:
 *                           subscriptions:
 *                             type: integer
 *                             description: Number of active subscriptions
 *       500:
 *         description: Internal server error
 */
export async function GET() {
  try {
    const plans = await prisma.plan.findMany({
      include: {
        _count: {
          select: {
            subscriptions: {
              where: {
                status: "active",
              },
            },
          },
        },
      },
      orderBy: { price: "asc" },
    });

    return NextResponse.json({
      plans,
    });
  } catch (error) {
    console.error("Error fetching plans:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
