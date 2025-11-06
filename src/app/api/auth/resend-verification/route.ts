import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createVerificationToken } from "@/lib/verification";
import { sendVerificationEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
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
        console.error("Failed to send verification email:", emailResult.error);
        throw new Error("Failed to send verification email");
      }
      console.log("✅ Verification email sent successfully to:", email);
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error;
    }

    return NextResponse.json(
      {
        message: "Verification email sent! Please check your inbox.",
        success: true
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Failed to send verification email. Please try again." },
      { status: 500 }
    );
  }
}
