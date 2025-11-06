import { NextRequest, NextResponse } from "next/server";
import { verifyEmailToken } from "@/lib/verification";
import { sendWelcomeEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/auth/signin?error=missing_token", req.url)
      );
    }

    // Verify the token
    const result = await verifyEmailToken(token);

    if (!result.success) {
      return NextResponse.redirect(
        new URL(`/auth/signin?error=invalid_token&message=${encodeURIComponent(result.error || "Invalid token")}`, req.url)
      );
    }

    // Get user details
    const user = await prisma.user.findUnique({
      where: { email: result.email },
      select: { name: true, email: true },
    });

    // Send welcome email after successful verification (async, non-blocking)
    if (user) {
      sendWelcomeEmail(user.name || "User", user.email).catch((error) =>
        console.error("Failed to send welcome email:", error)
      );
    }

    // Redirect to signin page with success message
    return NextResponse.redirect(
      new URL("/auth/signin?verified=true&message=Email verified successfully! You can now sign in.", req.url)
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.redirect(
      new URL("/auth/signin?error=verification_failed", req.url)
    );
  }
}
