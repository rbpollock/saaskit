import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe";
import { z } from "zod";

const checkoutSchema = z.object({
  priceId: z.string().min(1, "Price ID is required").startsWith("price_", "Invalid Stripe price ID format"),
  planName: z.enum(["Free", "Pro", "Business"], {
    errorMap: () => ({ message: "Plan must be one of: Free, Pro, Business" })
  }),
});

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

    // Parse and validate request body
    const body = await req.json();
    const validationResult = checkoutSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors[0]?.message || "Invalid input";
      return NextResponse.json(
        { error: errorMessage, details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const { priceId, planName } = validationResult.data;

    const checkoutSession = await createCheckoutSession(
      session.user.id,
      priceId,
      planName
    );

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Checkout error:", errorMessage);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
