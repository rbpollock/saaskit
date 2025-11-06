import { prisma } from "@/lib/prisma";
import crypto from "crypto";

// Generate a random verification token
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Create verification token in database
export async function createVerificationToken(email: string) {
  const token = generateVerificationToken();
  const expires = new Date();
  expires.setHours(expires.getHours() + 24); // Token expires in 24 hours

  // Delete any existing tokens for this email
  await prisma.verificationToken.deleteMany({
    where: { identifier: email },
  });

  // Create new token
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires,
    },
  });

  return token;
}

// Verify token and mark email as verified
export async function verifyEmailToken(token: string) {
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      token,
      expires: {
        gt: new Date(), // Token must not be expired
      },
    },
  });

  if (!verificationToken) {
    return { success: false, error: "Invalid or expired verification token" };
  }

  // Update user's emailVerified field
  const user = await prisma.user.findUnique({
    where: { email: verificationToken.identifier },
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  // Mark email as verified
  await prisma.user.update({
    where: { email: verificationToken.identifier },
    data: { emailVerified: new Date() },
  });

  // Delete the used token
  await prisma.verificationToken.delete({
    where: {
      identifier_token: {
        identifier: verificationToken.identifier,
        token: verificationToken.token,
      },
    },
  });

  return { success: true, email: verificationToken.identifier };
}

// Check if email is verified
export async function isEmailVerified(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { emailVerified: true },
  });

  return user?.emailVerified !== null;
}

// Resend verification email
export async function resendVerificationToken(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  if (user.emailVerified) {
    return { success: false, error: "Email already verified" };
  }

  const token = await createVerificationToken(email);
  return { success: true, token };
}
