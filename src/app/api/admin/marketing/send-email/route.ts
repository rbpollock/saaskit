import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendPromotionalEmail } from "@/lib/email";
import { z } from "zod";

const promotionalEmailSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  content: z.string().min(1, "Content is required"),
  preheader: z.string().optional(),
  recipientType: z.enum(["all", "verified", "free", "pro", "business", "custom"]),
  recipientEmails: z.array(z.string().email()).optional(),
});

/**
 * @swagger
 * /api/admin/marketing/send-email:
 *   post:
 *     tags:
 *       - Admin Marketing
 *     summary: Send promotional email (Admin/SuperAdmin only)
 *     description: Send promotional emails to users based on recipient type
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - content
 *               - recipientType
 *             properties:
 *               subject:
 *                 type: string
 *                 example: "New Feature: AI Chat now supports PDFs!"
 *               content:
 *                 type: string
 *                 example: "<p>We're excited to announce...</p>"
 *               preheader:
 *                 type: string
 *                 example: "Check out our latest feature"
 *               recipientType:
 *                 type: string
 *                 enum: [all, verified, free, pro, business, custom]
 *                 example: "all"
 *               recipientEmails:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["user1@example.com", "user2@example.com"]
 *     responses:
 *       200:
 *         description: Emails sent successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 *       500:
 *         description: Server error
 */
export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    // Check if user is admin or super admin
    const userRoles = session.user.roles || [];
    const isAdmin = userRoles.includes("ADMIN") || userRoles.includes("SUPER_ADMIN");

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    // Validate request body
    const body = await req.json();
    const validatedData = promotionalEmailSchema.parse(body);
    const { subject, content, preheader, recipientType, recipientEmails } = validatedData;

    // Get recipients based on type
    let recipients: { name: string | null; email: string }[] = [];

    switch (recipientType) {
      case "all":
        recipients = await prisma.user.findMany({
          select: { name: true, email: true },
        });
        break;

      case "verified":
        recipients = await prisma.user.findMany({
          where: { emailVerified: { not: null } },
          select: { name: true, email: true },
        });
        break;

      case "free":
        recipients = await prisma.user.findMany({
          where: {
            OR: [
              { subscription: null },
              {
                subscription: {
                  plan: { name: "Free" },
                },
              },
            ],
          },
          select: { name: true, email: true },
        });
        break;

      case "pro":
        recipients = await prisma.user.findMany({
          where: {
            subscription: {
              plan: { name: "Pro" },
            },
          },
          select: { name: true, email: true },
        });
        break;

      case "business":
        recipients = await prisma.user.findMany({
          where: {
            subscription: {
              plan: { name: "Business" },
            },
          },
          select: { name: true, email: true },
        });
        break;

      case "custom":
        if (!recipientEmails || recipientEmails.length === 0) {
          return NextResponse.json(
            { error: "Recipient emails are required for custom type" },
            { status: 400 }
          );
        }
        recipients = await prisma.user.findMany({
          where: { email: { in: recipientEmails } },
          select: { name: true, email: true },
        });
        break;

      default:
        return NextResponse.json(
          { error: "Invalid recipient type" },
          { status: 400 }
        );
    }

    if (recipients.length === 0) {
      return NextResponse.json(
        { error: "No recipients found" },
        { status: 400 }
      );
    }

    // Create promotional email record
    const promotionalEmail = await prisma.promotionalEmail.create({
      data: {
        subject,
        content,
        sentBy: session.user.id,
        recipientType,
        recipientEmails: recipientEmails || [],
        totalRecipients: recipients.length,
        status: "sending",
      },
    });

    // Send emails in batches (to avoid overwhelming the SMTP server)
    let successCount = 0;
    let failureCount = 0;
    const batchSize = 10;

    console.log(`📧 Sending promotional email to ${recipients.length} recipients...`);

    for (let i = 0; i < recipients.length; i += batchSize) {
      const batch = recipients.slice(i, i + batchSize);

      await Promise.allSettled(
        batch.map(async (recipient) => {
          try {
            const result = await sendPromotionalEmail(
              recipient.name || "User",
              recipient.email,
              subject,
              content,
              preheader
            );

            if (result.success) {
              successCount++;
              console.log(`✅ Email sent to ${recipient.email}`);
            } else {
              failureCount++;
              console.error(`❌ Failed to send to ${recipient.email}:`, result.error);
            }
          } catch (error) {
            failureCount++;
            console.error(`❌ Error sending to ${recipient.email}:`, error);
          }
        })
      );

      // Small delay between batches to avoid rate limiting
      if (i + batchSize < recipients.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Update promotional email record with results
    await prisma.promotionalEmail.update({
      where: { id: promotionalEmail.id },
      data: {
        successCount,
        failureCount,
        status: failureCount === 0 ? "sent" : failureCount < recipients.length ? "sent" : "failed",
        sentAt: new Date(),
      },
    });

    console.log(`✅ Promotional email campaign completed: ${successCount} sent, ${failureCount} failed`);

    return NextResponse.json(
      {
        message: "Promotional email sent successfully",
        campaignId: promotionalEmail.id,
        totalRecipients: recipients.length,
        successCount,
        failureCount,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Send promotional email error:", error);
    return NextResponse.json(
      { error: "Failed to send promotional email. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * Get promotional email campaigns
 */
export async function GET(req: Request) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    // Check if user is admin or super admin
    const userRoles = session.user.roles || [];
    const isAdmin = userRoles.includes("ADMIN") || userRoles.includes("SUPER_ADMIN");

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    // Get promotional emails with sender info
    const promotionalEmails = await prisma.promotionalEmail.findMany({
      include: {
        sentByUser: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(
      { campaigns: promotionalEmails },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get promotional emails error:", error);
    return NextResponse.json(
      { error: "Failed to fetch promotional emails" },
      { status: 500 }
    );
  }
}
