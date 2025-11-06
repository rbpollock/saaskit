import nodemailer from "nodemailer";

// SMTP configuration from environment variables
const smtpConfig = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

// Log SMTP configuration (without password) for debugging
console.log("📧 SMTP Configuration:", {
  host: smtpConfig.host,
  port: smtpConfig.port,
  secure: smtpConfig.secure,
  user: smtpConfig.auth.user,
  hasPassword: !!smtpConfig.auth.pass,
});

// Create reusable transporter
const transporter = nodemailer.createTransport(smtpConfig);

// Verify SMTP configuration
export async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log("✅ SMTP server is ready to send emails");
    return true;
  } catch (error) {
    console.error("❌ SMTP configuration error:", error);
    return false;
  }
}

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

// Send email function
export async function sendEmail(options: SendEmailOptions) {
  try {
    const {to, subject, html, text, from} = options;

    const mailOptions = {
      from: from || process.env.SMTP_FROM || `"${process.env.APP_NAME || "AI SaaS"}" <${process.env.SMTP_USER}>`,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ""), // Strip HTML tags for text version
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✉️  Email sent successfully:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email send error:", error);
    return { success: false, error };
  }
}

// Email templates
export const emailTemplates = {
  verificationEmail: (userName: string, verificationUrl: string) => ({
    subject: "Verify Your Email - AI SaaS",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 20px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
          .content { padding: 40px 30px; }
          .content h2 { color: #10b981; margin-top: 0; }
          .content p { margin: 16px 0; color: #555; }
          .button { display: inline-block; padding: 14px 36px; background-color: #10b981; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 24px 0; font-size: 16px; }
          .button:hover { background-color: #059669; }
          .info-box { background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 16px 20px; border-radius: 4px; margin: 24px 0; }
          .footer { background-color: #f9fafb; padding: 30px; text-align: center; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; }
          .footer a { color: #10b981; text-decoration: none; }
          .code { font-family: monospace; background-color: #f3f4f6; padding: 2px 8px; border-radius: 4px; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✉️ Verify Your Email</h1>
          </div>
          <div class="content">
            <h2>Hi ${userName}! 👋</h2>
            <p>Thanks for signing up for <strong>AI SaaS</strong>! We're thrilled to have you join our community.</p>

            <p>To complete your registration and start using all features, please verify your email address by clicking the button below:</p>

            <center>
              <a href="${verificationUrl}" class="button">
                ✓ Verify Email Address
              </a>
            </center>

            <div class="info-box">
              <p style="margin: 0; font-size: 14px;"><strong>🔒 Security Note:</strong> This link will expire in 24 hours for your security.</p>
            </div>

            <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <span class="code">${verificationUrl}</span>
            </p>

            <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
              If you didn't create an account with AI SaaS, you can safely ignore this email.
            </p>

            <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
              <em>Best regards,<br>The AI SaaS Team</em>
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} AI SaaS. All rights reserved.</p>
            <p>This is an automated message, please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  welcomeEmail: (userName: string, userEmail: string) => ({
    subject: "Welcome to AI SaaS - Get Started Today!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to AI SaaS</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
          .content { padding: 40px 30px; }
          .content h2 { color: #667eea; margin-top: 0; }
          .content p { margin: 16px 0; color: #555; }
          .button { display: inline-block; padding: 12px 30px; background-color: #667eea; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 20px 0; }
          .button:hover { background-color: #5568d3; }
          .features { background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .feature { margin: 12px 0; padding-left: 24px; position: relative; }
          .feature:before { content: "✓"; position: absolute; left: 0; color: #10b981; font-weight: bold; }
          .footer { background-color: #f9fafb; padding: 30px; text-align: center; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; }
          .footer a { color: #667eea; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 Welcome to AI SaaS!</h1>
          </div>
          <div class="content">
            <h2>Hi ${userName}! 👋</h2>
            <p>Thank you for joining <strong>AI SaaS</strong>! We're excited to have you on board.</p>
            <p>Your account has been successfully created with the email: <strong>${userEmail}</strong></p>

            <div class="features">
              <p style="margin-top: 0; font-weight: 600; color: #374151;">What you can do now:</p>
              <div class="feature">Start conversations with our AI assistant</div>
              <div class="feature">Manage your credits and billing</div>
              <div class="feature">Customize your profile settings</div>
              <div class="feature">Upgrade to premium plans for more features</div>
            </div>

            <center>
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard" class="button">
                Go to Dashboard
              </a>
            </center>

            <p style="margin-top: 30px;">If you have any questions or need assistance, feel free to reach out to our support team.</p>
            <p>Happy chatting! 🎉</p>
            <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">
              <em>Best regards,<br>The AI SaaS Team</em>
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} AI SaaS. All rights reserved.</p>
            <p>
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard/settings">Account Settings</a> |
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/privacy">Privacy Policy</a> |
              <a href="${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/terms">Terms of Service</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  adminNotification: (userName: string, userEmail: string) => ({
    subject: "🎉 New User Registration - AI SaaS",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New User Registration</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px 20px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
          .content { padding: 30px; }
          .info-box { background-color: #f3f4f6; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; }
          .info-row { margin: 10px 0; }
          .label { font-weight: 600; color: #374151; }
          .value { color: #6b7280; }
          .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; border-top: 1px solid #e5e7eb; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ New User Registration</h1>
          </div>
          <div class="content">
            <p>A new user has just registered on AI SaaS!</p>

            <div class="info-box">
              <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">${userName}</span>
              </div>
              <div class="info-row">
                <span class="label">Email:</span>
                <span class="value">${userEmail}</span>
              </div>
              <div class="info-row">
                <span class="label">Registration Date:</span>
                <span class="value">${new Date().toLocaleString()}</span>
              </div>
            </div>

            <p style="margin-top: 20px; font-size: 14px; color: #6b7280;">
              You can view the user details in the admin dashboard.
            </p>
          </div>
          <div class="footer">
            <p>This is an automated notification from AI SaaS Admin System</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};

// Welcome email for new users
export async function sendWelcomeEmail(userName: string, userEmail: string) {
  const template = emailTemplates.welcomeEmail(userName, userEmail);
  return await sendEmail({
    to: userEmail,
    subject: template.subject,
    html: template.html,
  });
}

// Admin notification for new user registration
export async function sendAdminNotification(userName: string, userEmail: string) {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.warn("⚠️  ADMIN_EMAIL not configured, skipping admin notification");
    return { success: false, error: "Admin email not configured" };
  }

  const template = emailTemplates.adminNotification(userName, userEmail);
  return await sendEmail({
    to: adminEmail,
    subject: template.subject,
    html: template.html,
  });
}

// Email verification for new users
export async function sendVerificationEmail(userName: string, userEmail: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/verify-email?token=${token}`;
  const template = emailTemplates.verificationEmail(userName, verificationUrl);

  return await sendEmail({
    to: userEmail,
    subject: template.subject,
    html: template.html,
  });
}
