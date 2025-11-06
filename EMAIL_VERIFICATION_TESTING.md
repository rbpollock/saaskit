# Email Verification System - Testing Guide

## Prerequisites

1. **Environment Variables Setup**

Create a `.env` file in the root directory with these variables:

```env
# SMTP Email Configuration (Mailtrap for testing)
SMTP_HOST="sandbox.smtp.mailtrap.io"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="ed16a21a6a2ec0"
SMTP_PASS="e25add19747511"
SMTP_FROM="AI SaaS <aisaaskit@gmail.com>"
ADMIN_EMAIL="ekram@gmail.com"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
APP_NAME="AI SaaS"

# Database and other required vars...
```

2. **Test SMTP Configuration**

Visit: `http://localhost:3000/api/test-email`

This will:
- Verify SMTP connection
- Send a test email to your ADMIN_EMAIL
- Return success/error status

Expected response if working:
```json
{
  "success": true,
  "message": "Test email sent successfully!",
  "sentTo": "ekram@gmail.com",
  "messageId": "..."
}
```

## Testing the Email Verification Flow

### Step 1: Register a New User

1. Go to `http://localhost:3000/auth/register`
2. Fill in the registration form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
3. Click "Create Account"

**Expected Behavior:**
- ✅ Success toast: "Registration successful! Please check your email to verify your account."
- ✅ Redirected to `/auth/signin?registered=true`
- ✅ Info toast appears: "Please check your email and verify your account before signing in."
- ✅ Email sent to Mailtrap inbox (check console logs for confirmation)

**Console Logs to Check:**
```
📧 SMTP Configuration: { host, port, user, hasPassword: true }
✅ Verification email sent successfully to: test@example.com
```

### Step 2: Check Mailtrap Inbox

1. Login to [Mailtrap](https://mailtrap.io)
2. Go to your inbox
3. Find the verification email
4. The email should contain:
   - Subject: "Verify Your Email - AI SaaS"
   - A green "Verify Email Address" button
   - Verification link that looks like: `http://localhost:3000/auth/verify-email?token=...`

### Step 3: Try to Sign In (Before Verification)

1. On the signin page, enter:
   - Email: test@example.com
   - Password: password123
2. Click "Sign In"

**Expected Behavior:**
- ❌ Error toast: "Please verify your email before signing in. Check your inbox for the verification link."
- ⚠️ Amber alert box appears with:
  - "Email not verified" message
  - "Resend Verification Email" button

### Step 4: Resend Verification Email (Optional)

1. Click the "Resend Verification Email" button in the alert
2. Check console logs

**Expected Behavior:**
- ✅ Success toast: "Verification email sent! Please check your inbox."
- ✅ New email sent to Mailtrap
- ⚠️ Alert disappears

**Console Logs:**
```
✅ Verification email sent successfully to: test@example.com
```

### Step 5: Verify Email

1. Click the verification link from the email (or copy/paste into browser)
2. URL format: `http://localhost:3000/auth/verify-email?token=XXXXX`

**Expected Behavior:**
- ✅ Redirected to `/auth/signin?verified=true&message=Email verified successfully! You can now sign in.`
- ✅ Success toast appears: "Email verified successfully! You can now sign in."
- ✅ Welcome email sent (check Mailtrap)

### Step 6: Sign In (After Verification)

1. Enter credentials:
   - Email: test@example.com
   - Password: password123
2. Click "Sign In"

**Expected Behavior:**
- ✅ Success toast: "Signed in successfully!"
- ✅ Redirected to `/dashboard`
- ✅ Dashboard loads with user data

## Troubleshooting

### Problem: No emails are being sent

**Check:**
1. `.env` file exists and has correct SMTP credentials
2. Console logs show SMTP configuration on server start
3. Run test email endpoint: `http://localhost:3000/api/test-email`

**Solution:**
- Verify SMTP_USER and SMTP_PASS are correct
- Check Mailtrap account is active
- Restart the dev server after changing .env

### Problem: "Congratulations" message but no dashboard

This might happen if:
1. OAuth login (Google/GitHub) is successful but dashboard doesn't load
2. Email is verified but redirect fails

**Check:**
1. Browser console for errors
2. Server console for Prisma errors
3. Database connection is working

**Solution:**
- Check DATABASE_URL in .env
- Run `npx prisma generate && npx prisma db push`
- Clear browser cache and cookies

### Problem: Verification link doesn't work

**Check:**
1. Token might be expired (24-hour expiration)
2. Token might have been used already

**Solution:**
- Click "Resend Verification Email" button
- Use the new verification link

### Problem: Can't sign in after verification

**Check:**
1. Email is actually verified in database
2. Password is correct
3. No browser extension blocking the request

**Debug:**
```sql
-- Check if email is verified
SELECT email, emailVerified FROM users WHERE email = 'test@example.com';
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register new user & send verification email |
| `/api/auth/resend-verification` | POST | Resend verification email |
| `/auth/verify-email?token=XXX` | GET | Verify email with token |
| `/api/test-email` | GET | Test SMTP configuration |

## Email Templates

### 1. Verification Email
- Sent on: Registration, Resend request
- Purpose: Verify user email address
- Expires: 24 hours
- Contains: Verification link button

### 2. Welcome Email
- Sent on: Successful email verification
- Purpose: Welcome user after verification
- Contains: Dashboard link, feature list

### 3. Admin Notification
- Sent on: New user registration
- To: ADMIN_EMAIL
- Purpose: Notify admin of new registrations

## Security Features

✅ Email verification required before signin
✅ Tokens expire after 24 hours
✅ Tokens are single-use (deleted after verification)
✅ Old tokens deleted when new ones are created
✅ OAuth users auto-verified (Google/GitHub already verify emails)
✅ Password hashing with bcrypt

## Development Tips

1. **View all console logs:**
   ```bash
   npm run dev
   ```

2. **Check Mailtrap inbox:**
   - All emails go to Mailtrap in development
   - No real emails are sent

3. **Reset a user's verification status:**
   ```sql
   UPDATE users SET emailVerified = NULL WHERE email = 'test@example.com';
   DELETE FROM verification_tokens WHERE identifier = 'test@example.com';
   ```

4. **Monitor email sending:**
   - Check server console for "✅ Verification email sent successfully"
   - Check for any error messages with "❌" or "Error"

## Production Checklist

Before deploying to production:

- [ ] Replace Mailtrap with production SMTP (Gmail, SendGrid, AWS SES, etc.)
- [ ] Update SMTP_HOST, SMTP_USER, SMTP_PASS in production .env
- [ ] Set NEXT_PUBLIC_APP_URL to production URL
- [ ] Configure ADMIN_EMAIL for notifications
- [ ] Test email delivery in production environment
- [ ] Set up email monitoring/logging service
