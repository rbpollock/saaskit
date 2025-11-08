import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createVerificationToken } from "@/lib/verification";
import { sendVerificationEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Rate limiting: 3 requests per 5 minutes per email
    const rateLimitResult = rateLimit({
      identifier: `resend-verification:${email}`,
      limit: 3,
      windowInSeconds: 300, // 5 minutes
    });

    if (!rateLimitResult.success) {
      const resetIn = Math.ceil((rateLimitResult.reset - Date.now()) / 1000 / 60);
      return NextResponse.json(
        {
          error: "Too many requests",
          message: `Please wait ${resetIn} minute(s) before requesting another verification email.`,
          retryAfter: rateLimitResult.reset,
        },
        { status: 429 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email" },
        { status: 404 }
      );
    }

    // Check if email is already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Email is already verified" },
        { status: 400 }
      );
    }

    // Create new verification token
    const token = await createVerificationToken(email);

    // Send verification email
    try {
      const emailResult = await sendVerificationEmail(user.name || "User", email, token);
      if (!emailResult.success) {
        const errorMsg = emailResult.error instanceof Error
          ? emailResult.error.message
          : String(emailResult.error);
        console.error("Failed to send verification email:", errorMsg);
        throw new Error("Failed to send verification email");
      }
      console.log("✅ Verification email sent successfully to:", email);
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      console.error("Error sending verification email:", errorMsg);
      throw error;
    }

    return NextResponse.json(
      {
        message: "Verification email sent! Please check your inbox.",
        success: true
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Resend verification error:", errorMessage);
    return NextResponse.json(
      { error: "Failed to send verification email. Please try again." },
      { status: 500 }
    );
  }
}
