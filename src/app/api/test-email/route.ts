import { NextResponse } from "next/server";
import { verifyEmailConfig, sendEmail } from "@/lib/email";

/**
 * Test endpoint to verify SMTP configuration
 * GET /api/test-email
 */
export async function GET() {
  try {
    console.log("🧪 Testing SMTP configuration...");

    // First verify SMTP config
    const isConfigValid = await verifyEmailConfig();

    if (!isConfigValid) {
      return NextResponse.json(
        {
          success: false,
          error: "SMTP configuration is invalid. Check your environment variables."
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
            <strong>SMTP Host:</strong> ${process.env.SMTP_HOST}<br>
            <strong>SMTP Port:</strong> ${process.env.SMTP_PORT}<br>
            <strong>Test sent to:</strong> ${testEmail}<br>
            <strong>Time:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send test email",
          details: result.error
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Test email sent successfully!",
        sentTo: testEmail,
        messageId: result.messageId,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Test email error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to send test email"
      },
      { status: 500 }
    );
  }
}
