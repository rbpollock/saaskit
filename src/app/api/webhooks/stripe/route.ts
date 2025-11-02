import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

/**
 * @swagger
 * /api/webhooks/stripe:
 *   post:
 *     tags:
 *       - Webhooks
 *     summary: Stripe webhook endpoint
 *     description: |
 *       Receive and process Stripe webhook events for payment and subscription management.
 *       This endpoint handles the following events:
 *       - checkout.session.completed: Creates subscription and adds credits
 *       - customer.subscription.updated: Updates subscription status and billing period
 *       - customer.subscription.deleted: Marks subscription as canceled
 *       - invoice.payment_succeeded: Records payment and refreshes credits
 *       - invoice.payment_failed: Records failed payment attempt
 *
 *       The request must include a valid Stripe webhook signature for security verification.
 *     parameters:
 *       - in: header
 *         name: stripe-signature
 *         required: true
 *         schema:
 *           type: string
 *         description: Stripe webhook signature for request verification
 *         example: t=1614556800,v1=abc123def456...
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Unique event identifier
 *                 example: evt_1OXd9KExample123456
 *               type:
 *                 type: string
 *                 description: Type of Stripe event
 *                 enum:
 *                   - checkout.session.completed
 *                   - customer.subscription.updated
 *                   - customer.subscription.deleted
 *                   - invoice.payment_succeeded
 *                   - invoice.payment_failed
 *                 example: checkout.session.completed
 *               data:
 *                 type: object
 *                 description: Event data containing the Stripe object
 *                 properties:
 *                   object:
 *                     type: object
 *                     description: The Stripe resource (session, subscription, or invoice)
 *           examples:
 *             checkoutCompleted:
 *               summary: Checkout session completed
 *               value:
 *                 id: evt_1OXd9KExample123456
 *                 type: checkout.session.completed
 *                 data:
 *                   object:
 *                     id: cs_test_a1B2c3D4e5F6g7H8i9J0
 *                     customer: cus_Example123456
 *                     subscription: sub_Example789012
 *                     metadata:
 *                       userId: clx1234567890abcdef
 *                       planName: Pro Plan
 *             subscriptionUpdated:
 *               summary: Subscription updated
 *               value:
 *                 id: evt_1OXd9LExample789012
 *                 type: customer.subscription.updated
 *                 data:
 *                   object:
 *                     id: sub_Example789012
 *                     status: active
 *                     current_period_start: 1705312800
 *                     current_period_end: 1707991200
 *                     cancel_at_period_end: false
 *             paymentSucceeded:
 *               summary: Invoice payment succeeded
 *               value:
 *                 id: evt_1OXd9MExample345678
 *                 type: invoice.payment_succeeded
 *                 data:
 *                   object:
 *                     id: in_Example123456
 *                     subscription: sub_Example789012
 *                     amount_paid: 1900
 *                     currency: usd
 *                     payment_intent: pi_Example123456
 *     responses:
 *       200:
 *         description: Webhook event processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 received:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Missing or invalid webhook signature
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Invalid signature
 *       500:
 *         description: Internal error processing webhook
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Webhook handler failed
 */
export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return new NextResponse("No signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id || session.metadata?.userId;

        if (!userId || !session.subscription) break;

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        const plan = await prisma.plan.findUnique({
          where: { name: session.metadata?.planName || "Pro" },
        });

        if (!plan) break;

        // Create or update subscription
        await prisma.subscription.upsert({
          where: { userId },
          create: {
            userId,
            planId: plan.id,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            status: subscription.status,
            billingCycle: subscription.items.data[0].price.recurring?.interval || "month",
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
          update: {
            planId: plan.id,
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });

        // Update user credits
        await prisma.user.update({
          where: { id: userId },
          data: { credits: { increment: plan.creditsPerMonth } },
        });

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
          },
        });

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: "canceled",
          },
        });

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;

        if (!invoice.subscription) break;

        const subscription = await prisma.subscription.findUnique({
          where: { stripeSubscriptionId: invoice.subscription as string },
          include: { plan: true, user: true },
        });

        if (!subscription) break;

        // Record payment
        await prisma.payment.create({
          data: {
            userId: subscription.userId,
            stripePaymentId: invoice.payment_intent as string,
            amount: invoice.amount_paid / 100,
            currency: invoice.currency,
            status: "succeeded",
            description: `Payment for ${subscription.plan.name} plan`,
            invoiceUrl: invoice.hosted_invoice_url,
            receiptUrl: invoice.invoice_pdf,
          },
        });

        // Refresh credits on renewal
        await prisma.user.update({
          where: { id: subscription.userId },
          data: { credits: { increment: subscription.plan.creditsPerMonth } },
        });

        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;

        if (!invoice.subscription) break;

        const subscription = await prisma.subscription.findUnique({
          where: { stripeSubscriptionId: invoice.subscription as string },
        });

        if (!subscription) break;

        await prisma.payment.create({
          data: {
            userId: subscription.userId,
            stripePaymentId: invoice.payment_intent as string,
            amount: invoice.amount_due / 100,
            currency: invoice.currency,
            status: "failed",
            description: `Failed payment for subscription`,
          },
        });

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return new NextResponse("Webhook handler failed", { status: 500 });
  }
}
