import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

/**
 * @swagger
 * /api/subscriptions/{id}:
 *   get:
 *     tags:
 *       - Subscriptions
 *     summary: Get subscription by ID
 *     description: Retrieve detailed information about a specific subscription. Users can only view their own subscription unless they are admin.
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID
 *     responses:
 *       200:
 *         description: Subscription details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 stripeSubscriptionId:
 *                   type: string
 *                 stripeCustomerId:
 *                   type: string
 *                 status:
 *                   type: string
 *                 billingCycle:
 *                   type: string
 *                 currentPeriodStart:
 *                   type: string
 *                   format: date-time
 *                 currentPeriodEnd:
 *                   type: string
 *                   format: date-time
 *                 cancelAtPeriodEnd:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 plan:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     creditsPerMonth:
 *                       type: integer
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized to view this subscription
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Subscriptions
 *     summary: Cancel subscription
 *     description: Cancel a subscription. Will cancel at the end of the billing period. Users can cancel their own subscription, admins can cancel any subscription.
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Subscription ID
 *     responses:
 *       200:
 *         description: Subscription canceled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Subscription canceled successfully
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized to cancel this subscription
 *       404:
 *         description: Subscription not found
 *       500:
 *         description: Internal server error
 */
export async function GET(
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
      (ur: { role: { name: string } }) => ur.role.name === "ADMIN" || ur.role.name === "SUPER_ADMIN"
    );

    const { id } = await params;

    const subscription = await prisma.subscription.findUnique({
      where: { id },
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
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    // Non-admin users can only view their own subscription
    if (!isAdmin && subscription.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("Error fetching subscription:", error);
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
      (ur: { role: { name: string } }) => ur.role.name === "ADMIN" || ur.role.name === "SUPER_ADMIN"
    );

    const { id } = await params;

    const subscription = await prisma.subscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      return NextResponse.json(
        { error: "Subscription not found" },
        { status: 404 }
      );
    }

    // Users can cancel their own subscription, admins can cancel any
    if (!isAdmin && subscription.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Cancel subscription in Stripe
    await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    // Update subscription in database
    await prisma.subscription.update({
      where: { id },
      data: {
        cancelAtPeriodEnd: true,
      },
    });

    return NextResponse.json({
      message: "Subscription canceled successfully. It will remain active until the end of the billing period.",
    });
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
