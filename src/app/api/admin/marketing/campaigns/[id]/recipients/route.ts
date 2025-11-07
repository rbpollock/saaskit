import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Get recipient details for a specific campaign
 * GET /api/admin/marketing/campaigns/[id]/recipients
 */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const campaignId = params.id;

    // Verify campaign exists
    const campaign = await prisma.promotionalEmail.findUnique({
      where: { id: campaignId },
      select: {
        id: true,
        subject: true,
        totalRecipients: true,
        successCount: true,
        failureCount: true,
        sentAt: true,
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    // Get all recipients for this campaign
    let recipients;
    try {
      recipients = await prisma.emailRecipient.findMany({
        where: { promotionalEmailId: campaignId },
        orderBy: [
          { status: "asc" }, // Show failed first
          { sentAt: "desc" },
        ],
      });
    } catch (dbError: any) {
      // If table doesn't exist yet, return empty array
      if (dbError.code === "P2021" || dbError.message?.includes("does not exist")) {
        return NextResponse.json(
          {
            campaign,
            recipients: [],
            message: "Recipient tracking not available for this campaign. This feature was added after the campaign was sent.",
            setupRequired: true,
          },
          { status: 200 }
        );
      }
      throw dbError;
    }

    return NextResponse.json(
      {
        campaign,
        recipients,
        totalRecipients: recipients.length,
        sentCount: recipients.filter(r => r.status === "sent").length,
        failedCount: recipients.filter(r => r.status === "failed").length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get campaign recipients error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error details:", { message: errorMessage });

    return NextResponse.json(
      {
        error: "Failed to fetch campaign recipients",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}
