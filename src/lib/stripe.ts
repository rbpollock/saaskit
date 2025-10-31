import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

export const STRIPE_PLANS = {
  FREE: {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    chatsPerMonth: 3,
    pdfsPerChat: 0,
    creditsPerMonth: 100,
    features: [
      "3 AI chats per month",
      "Basic AI models",
      "Email support",
    ],
  },
  PRO: {
    name: "Pro",
    monthlyPriceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
    yearlyPriceId: process.env.STRIPE_PRO_YEARLY_PRICE_ID!,
    monthlyPrice: 19.99,
    yearlyPrice: 199.99,
    chatsPerMonth: 5,
    pdfsPerChat: 1,
    creditsPerMonth: 1000,
    features: [
      "5 AI chats per month",
      "1 PDF upload per chat",
      "Advanced AI models",
      "Priority support",
      "Chat history",
    ],
  },
  BUSINESS: {
    name: "Business",
    monthlyPriceId: process.env.STRIPE_BUSINESS_MONTHLY_PRICE_ID!,
    yearlyPriceId: process.env.STRIPE_BUSINESS_YEARLY_PRICE_ID!,
    monthlyPrice: 49.99,
    yearlyPrice: 499.99,
    chatsPerMonth: -1, // unlimited
    pdfsPerChat: -1, // unlimited
    creditsPerMonth: 10000,
    features: [
      "Unlimited AI chats",
      "Unlimited PDF uploads",
      "All AI models",
      "24/7 Priority support",
      "Advanced analytics",
      "API access",
    ],
  },
};

export async function createCheckoutSession(
  userId: string,
  priceId: string,
  planName: string
) {
  const session = await stripe.checkout.sessions.create({
    customer_email: undefined,
    client_reference_id: userId,
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: {
      userId,
      planName,
    },
  });

  return session;
}

export async function createCustomerPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  });

  return session;
}
