import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { z } from "zod";
import { sendVerificationEmail, sendAdminNotification } from "@/lib/email";
import { createVerificationToken } from "@/lib/verification";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Create a new user account with email and password. User gets 100 free credits and USER role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: SecurePass123!
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: clx1234567890abcdef
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john.doe@example.com
 *       400:
 *         description: Validation error or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User with this email already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Something went wrong. Please try again.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const validatedData = registerSchema.parse(body);
    const { name, email, password } = validatedData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user (email NOT verified initially)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        credits: 100,
        emailVerified: null, // User must verify email
      },
    });

    // Assign default USER role
    const userRole = await prisma.role.findUnique({
      where: { name: "USER" },
    });

    if (userRole) {
      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: userRole.id,
        },
      });
    }

    // Create verification token
    const verificationToken = await createVerificationToken(user.email);

    // Send verification email to user
    try {
      const emailResult = await sendVerificationEmail(user.name || "User", user.email, verificationToken);
      if (!emailResult.success) {
        console.error("Failed to send verification email:", emailResult.error);
      } else {
        console.log("✅ Verification email sent successfully to:", user.email);
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
    }

    // Send notification email to admin (don't await to avoid blocking the response)
    sendAdminNotification(user.name || "User", user.email).catch((error) =>
      console.error("Failed to send admin notification:", error)
    );

    return NextResponse.json(
      {
        message: "Registration successful! Please check your email to verify your account.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
