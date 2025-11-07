import { NextResponse } from "next/server";
import { auth, isUserAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Check if marketing email feature is properly set up
 * GET /api/admin/marketing/check-setup
 */
export async function GET() {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in." },
        { status: 401 }
      );
    }

    // Check if user is admin (securely from database)
    const isAdmin = await isUserAdmin(session.user.id);

    if (!isAdmin) {
      return NextResponse.json(
        { error: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    const checks = {
      database: false,
      promotionalEmailTable: false,
      canQuery: false,
      smtpConfigured: false,
    };

    // Check 1: Database connection
    try {
      await prisma.$queryRaw`SELECT 1`;
      checks.database = true;
    } catch (error) {
      console.error("Database check failed:", error);
    }

    // Check 2: PromotionalEmail table exists
    try {
      // Try to count promotional emails
      const count = await prisma.promotionalEmail.count();
      checks.promotionalEmailTable = true;
      checks.canQuery = true;
      console.log(`✅ PromotionalEmail table exists. Found ${count} campaigns.`);
    } catch (error: any) {
      console.error("PromotionalEmail table check failed:", error.message);

      // Check if it's a "table doesn't exist" error
      if (error.message?.includes("does not exist") ||
          error.message?.includes("Unknown table") ||
          error.code === "P2021") {
        checks.promotionalEmailTable = false;
      }
    }

    // Check 3: SMTP configured
    checks.smtpConfigured = !!(
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    );

    const allChecksPass = Object.values(checks).every(Boolean);

    return NextResponse.json(
      {
        success: allChecksPass,
        checks,
        message: allChecksPass
          ? "✅ Marketing email feature is properly set up!"
          : "⚠️  Setup incomplete. See details below.",
        instructions: !allChecksPass ? {
          database: !checks.database ? "Check DATABASE_URL in .env file" : null,
          promotionalEmailTable: !checks.promotionalEmailTable
            ? "Run: chmod +x setup-marketing.sh && ./setup-marketing.sh"
            : null,
          smtpConfigured: !checks.smtpConfigured
            ? "Configure SMTP_HOST, SMTP_USER, SMTP_PASS in .env file"
            : null,
        } : null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Setup check error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      {
        success: false,
        error: "Failed to check setup",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
