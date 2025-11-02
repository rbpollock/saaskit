import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     tags:
 *       - Payments
 *     summary: Get payment by ID
 *     description: Retrieve detailed information about a specific payment. Users can only view their own payments unless they are admin.
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 stripePaymentId:
 *                   type: string
 *                 amount:
 *                   type: number
 *                 currency:
 *                   type: string
 *                 status:
 *                   type: string
 *                 description:
 *                   type: string
 *                   nullable: true
 *                 invoiceUrl:
 *                   type: string
 *                   nullable: true
 *                 receiptUrl:
 *                   type: string
 *                   nullable: true
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
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized to view this payment
 *       404:
 *         description: Payment not found
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
      (ur) => ur.role.name === "ADMIN" || ur.role.name === "SUPER_ADMIN"
    );

    const { id } = await params;

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!payment) {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    // Non-admin users can only view their own payments
    if (!isAdmin && payment.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json(payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
