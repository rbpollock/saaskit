import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe";

/**
 * @swagger
 * /api/create-checkout:
 *   post:
 *     tags:
 *       - Billing
 *     summary: Create Stripe checkout session
 *     description: Create a Stripe checkout session for subscription purchase. User must be authenticated. Available plans - Pro ($19/month), Business ($49/month).
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - priceId
 *               - planName
 *             properties:
 *               priceId:
 *                 type: string
 *                 description: Stripe price ID
 *                 example: price_1OXd9KExample123456
 *               planName:
 *                 type: string
 *                 description: Plan name (Pro Plan or Business Plan)
 *                 enum:
 *                   - Pro Plan
 *                   - Business Plan
 *                 example: Pro Plan
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   format: uri
 *                   description: Stripe checkout URL
 *                   example: https://checkout.stripe.com/c/pay/cs_test_a1B2c3D4e5F6g7H8i9J0
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing required fields
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { priceId, planName } = await req.json();

    if (!priceId || !planName) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const checkoutSession = await createCheckoutSession(
      session.user.id,
      priceId,
      planName
    );

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
