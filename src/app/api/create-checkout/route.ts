import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe";

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
