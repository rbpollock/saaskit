import { NextResponse } from "next/server";
import { verifyEmailConfig, sendEmail } from "@/lib/email";

/**
 * Test endpoint to verify SMTP configuration
 * GET /api/test-email
 */
export async function GET() {
  try {
    console.log("🧪 Testing SMTP configuration...");
    console.log("🌍 Environment:", process.env.NODE_ENV);
    console.log("📧 SMTP Host:", process.env.SMTP_HOST);
    console.log("📧 SMTP User:", process.env.SMTP_USER);
    console.log("📧 SMTP Port:", process.env.SMTP_PORT);

    // Check if environment variables are set
    const envCheck = {
      SMTP_HOST: !!process.env.SMTP_HOST,
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASS: !!process.env.SMTP_PASS,
      SMTP_PORT: !!process.env.SMTP_PORT,
      ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
    };

    const missingVars = Object.entries(envCheck)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing SMTP environment variables",
          missing: missingVars,
          hint: "Add these variables in Vercel → Settings → Environment Variables",
          envCheck
        },
        { status: 500 }
      );
    }

    // First verify SMTP config
    const isConfigValid = await verifyEmailConfig();

    if (!isConfigValid) {
      return NextResponse.json(
        {
          success: false,
          error: "SMTP configuration is invalid. Check your environment variables.",
          envCheck,
          hint: "Verify SMTP credentials are correct"
        },
        { status: 500 }
      );
    }

    // Try to send a test email
    const testEmail = process.env.ADMIN_EMAIL || "test@example.com";

    const result = await sendEmail({
      to: testEmail,
      subject: "Test Email - SMTP Configuration",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #10b981;">✅ SMTP Configuration Test Successful!</h2>
          <p>Your email configuration is working correctly.</p>
          <p style="color: #6b7280; font-size: 14px;">
            <strong>Test sent to:</strong> ${testEmail}<br>
            <strong>Time:</strong> ${new Date().toLocaleString()}<br>
            <strong>Environment:</strong> ${process.env.NODE_ENV || 'production'}
          </p>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 20px;">
            Check your server logs for SMTP configuration details.
          </p>
        </div>
      `,
    });

    if (!result.success) {
      const errorDetails = result.error instanceof Error ? result.error.message : String(result.error);
      console.error("❌ Test email failed:", errorDetails);

      return NextResponse.json(
        {
          success: false,
          error: "Failed to send test email",
          details: errorDetails,
          // SECURITY: Do not expose SMTP credentials in HTTP response
          // Check server logs for SMTP configuration details
          hint: errorDetails.includes("ECONNREFUSED")
            ? "Cannot connect to SMTP server. Check host and port in environment variables."
            : errorDetails.includes("ETIMEDOUT")
            ? "Connection timeout. Check network/firewall settings."
            : errorDetails.includes("auth")
            ? "Authentication failed. Check SMTP_USER and SMTP_PASS in environment variables."
            : "Check Vercel logs for more details"
        },
        { status: 500 }
      );
    }

    console.log("✅ Test email sent successfully to:", testEmail);

    return NextResponse.json(
      {
        success: true,
        message: "Test email sent successfully!",
        sentTo: testEmail,
        messageId: result.messageId,
        // SECURITY: SMTP config available in server logs only
        configVerified: true
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Test email error:", error);
    const errorMsg = error.message || String(error);

    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        hint: "Check console logs for detailed error information"
      },
      { status: 500 }
    );
  }
}
