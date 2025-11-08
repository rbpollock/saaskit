# 🚀 Production Deployment Checklist

## Pre-Deployment Setup

### ☐ 1. Set up Resend Account (5 minutes)

**Why**: Production-grade email delivery (100x faster than SMTP, no rate limits on free tier)

1. **Sign up**: https://resend.com/signup
2. **Verify domain** (optional but recommended for better deliverability):
   - Go to https://resend.com/domains
   - Add your domain
   - Add DNS records (TXT, CNAME) to your DNS provider
   - Wait for verification (usually 5-10 minutes)
3. **Get API Key**:
   - Go to https://resend.com/api-keys
   - Click "Create API Key"
   - Name it "Production" or "Vercel"
   - **Copy the key immediately** (you won't see it again!)
   - Store in password manager

**Free Tier Limits**:
- 100 emails/day
- 3,000 emails/month
- Perfect for MVP!

**Paid Plan** ($20/month):
- 50,000 emails/month
- Custom domains
- Better analytics

---

### ☐ 2. Set up Sentry Account (10 minutes)

**Why**: Real-time error tracking, performance monitoring, user feedback

1. **Sign up**: https://sentry.io/signup/
2. **Create Project**:
   - Click "Create Project"
   - Platform: **Next.js**
   - Alert frequency: **On every new issue**
   - Project name: `saaskit-production` (or your app name)
3. **Get DSN**:
   - After project creation, you'll see your DSN
   - Format: `https://[key]@[org].ingest.sentry.io/[project]`
   - **Copy this** - you'll need it for environment variables
4. **Get Organization Slug**:
   - Go to Settings → Organization Settings
   - Copy the "Organization Slug"
5. **Get Project Name**:
   - Should match what you created above

**Free Tier**:
- 5,000 errors/month
- 1 team member
- 30-day retention
- Perfect for MVP!

**Paid Plans** (start at $26/month):
- More errors
- Longer retention
- Team collaboration

---

### ☐ 3. Database Migration (2 minutes)

**Run this SQL in your Vercel Postgres database**:

```sql
-- Email Recipients Tracking Table
CREATE TABLE IF NOT EXISTS "email_recipients" (
    "id" TEXT NOT NULL,
    "promotionalEmailId" TEXT NOT NULL,
    "recipientEmail" TEXT NOT NULL,
    "recipientName" TEXT,
    "status" TEXT NOT NULL,
    "errorMessage" TEXT,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "email_recipients_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "email_recipients_promotionalEmailId_idx"
ON "email_recipients"("promotionalEmailId");

-- Foreign key (run separately if promotional_emails table already exists)
ALTER TABLE "email_recipients"
ADD CONSTRAINT "email_recipients_promotionalEmailId_fkey"
FOREIGN KEY ("promotionalEmailId")
REFERENCES "promotional_emails" ("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
```

**How to run**:
1. Go to Vercel Dashboard → Storage → Your Postgres Database
2. Click "Query" tab
3. Paste the SQL above
4. Click "Run"
5. Verify: You should see "Command completed successfully"

---

## Environment Variables Setup

### ☐ 4. Configure Vercel Environment Variables (10 minutes)

**Go to**: Vercel Dashboard → Your Project → Settings → Environment Variables

**Add these variables** (click "Add Another" for each):

#### Required - Email (Resend - Production Recommended)
```
RESEND_API_KEY=re_...  (your Resend API key from step 1)
```

#### Alternative - Email (SMTP - Fallback/Development)
```
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=587
SMTP_USER=your_mailtrap_user
SMTP_PASS=your_mailtrap_pass
SMTP_FROM="Your App <noreply@yourapp.com>"
```

**Note**: If RESEND_API_KEY is set, Resend will be used automatically. SMTP is fallback.

#### Required - Sentry (Error Monitoring)
```
NEXT_PUBLIC_SENTRY_DSN=https://[key]@[org].ingest.sentry.io/[project]
SENTRY_DSN=https://[key]@[org].ingest.sentry.io/[project]  (same as above)
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=saaskit-production
SENTRY_AUTH_TOKEN=(get from Sentry Settings → Auth Tokens)
```

#### Required - Application
```
APP_NAME="Your SaaS Name"
ADMIN_EMAIL=admin@yourapp.com
```

#### Already Configured (verify these exist)
```
DATABASE_URL=postgres://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://yourapp.vercel.app
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_ID=...
GITHUB_SECRET=...
```

**Important**:
- For each variable, check "Production", "Preview", and "Development" environments
- Click "Save" after adding all variables
- **Redeploy** after saving (Vercel will prompt)

---

## Deployment

### ☐ 5. Push Code to Git (2 minutes)

Your code is already committed to branch:
```
claude/email-verification-system-011CUs5boV3PZmWjZbajPmG9
```

**Verify latest commits include**:
- ✅ Critical security fixes (race conditions + privilege escalation)
- ✅ Production-ready MVP fixes (input validation, rate limiting, etc.)
- ✅ Resend email integration
- ✅ Sentry error monitoring

---

### ☐ 6. Deploy to Vercel (Automatic - 3 minutes)

**Vercel will auto-deploy when you push**. Monitor the deployment:

1. **Go to**: Vercel Dashboard → Your Project → Deployments
2. **Wait for**: "Building" → "Ready"
3. **Check build logs** for any errors

**Common issues**:
- ❌ "Missing environment variables" → Go back to step 4
- ❌ "Database connection error" → Check DATABASE_URL
- ❌ "Build failed" → Check build logs, ensure all packages installed

---

## Post-Deployment Verification

### ☐ 7. Verify Email System (3 minutes)

**Test Resend Integration**:

1. Visit: `https://yourapp.vercel.app/api/test-email`
2. Expected response:
```json
{
  "success": true,
  "message": "Test email sent successfully!",
  "sentTo": "admin@yourapp.com",
  "messageId": "...",
  "configVerified": true
}
```
3. Check your email inbox - you should receive a test email
4. **Verify server logs**:
   - Go to Vercel → Deployments → Latest → Functions
   - Click on a function → View logs
   - Should see: `📧 Email Configuration: { provider: 'resend', ... }`

**If test fails**:
- Check RESEND_API_KEY is set correctly
- Check ADMIN_EMAIL is correct
- Check Resend dashboard for errors

---

### ☐ 8. Verify Sentry Integration (2 minutes)

**Test Error Tracking**:

1. **Trigger a test error**:
   - Create a new file at `/app/api/test-sentry/route.ts`:
   ```typescript
   import { NextResponse } from "next/server";
   import * as Sentry from "@sentry/nextjs";

   export async function GET() {
     Sentry.captureMessage("Test error from production!");
     throw new Error("This is a test error for Sentry");
   }
   ```

2. **Visit**: `https://yourapp.vercel.app/api/test-sentry`
3. **Check Sentry**:
   - Go to Sentry.io → Your Project → Issues
   - You should see "This is a test error for Sentry"
   - Click it to see stack trace, user info, etc.

4. **Delete the test route** after verification

**If Sentry doesn't show errors**:
- Check NEXT_PUBLIC_SENTRY_DSN is set in Vercel
- Check DSN format is correct
- Wait 1-2 minutes (Sentry batches events)

---

### ☐ 9. Test Marketing Email System (5 minutes)

**Send a test campaign**:

1. **Sign in as Admin**: `https://yourapp.vercel.app/auth/signin`
2. **Go to Marketing**: `/admin/marketing`
3. **Create test campaign**:
   - Subject: "✅ Production Test - Email System Working"
   - Content: Use a quick template
   - Recipients: **Custom** → Enter your own email
   - Click "Send Email"

4. **Verify**:
   - Should see success message: "1/1 emails sent successfully"
   - Check your email - should receive it instantly (Resend is fast!)
   - Click "View Recipients" button
   - Should see detailed tracking: Status "Sent", timestamp

**Expected behavior with Resend**:
- ⚡ Emails send in <1 second (vs 1.5s per email with Mailtrap)
- ✅ No rate limiting errors
- ✅ Better deliverability (less likely to go to spam)

---

### ☐ 10. Test Authentication Flow (3 minutes)

**Complete registration + verification**:

1. **Sign out** if logged in
2. **Register new account**: `/auth/register`
   - Use real email you can access
   - Fill out form
3. **Check email** for verification link
4. **Click verification link**
5. **Sign in** with new account
6. **Verify**:
   - Should be redirected to dashboard
   - Should have Free plan
   - Should have default credits

---

### ☐ 11. Test Stripe Payment Flow (5 minutes)

**⚠️ Use Stripe Test Mode**:

1. **Go to**: `/dashboard/billing` or `/pricing`
2. **Click "Upgrade to Pro"**
3. **Use Stripe test card**:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

4. **Complete checkout**
5. **Verify**:
   - Redirected back to app
   - Subscription status updated
   - Credits added
   - Webhook processed (check Stripe dashboard → Webhooks)

---

### ☐ 12. Monitor Initial Traffic (First 24 hours)

**What to watch**:

#### Vercel Dashboard
- **Deployments** → Check for auto-deploy issues
- **Analytics** → Monitor page views, routes
- **Functions** → Check function execution times

#### Sentry Dashboard
- **Issues** → Watch for new errors
- **Performance** → Monitor slow transactions
- **Alerts** → Check email/Slack notifications

#### Resend Dashboard
- **Emails** → Monitor delivery rates
- **Analytics** → Track opens/clicks (if configured)
- **Errors** → Watch for bounces/complaints

#### Stripe Dashboard
- **Payments** → Monitor successful charges
- **Subscriptions** → Track active subscriptions
- **Webhooks** → Ensure webhooks are processing (should see 200 responses)

---

## Rollback Plan

### ☐ If something goes wrong

**Option 1: Rollback to previous deployment**
1. Vercel Dashboard → Deployments
2. Find last working deployment
3. Click ⋯ → "Promote to Production"

**Option 2: Disable new features**
1. Remove RESEND_API_KEY env var → Falls back to SMTP
2. Remove SENTRY_DSN → Disables error tracking
3. Redeploy

**Option 3: Full rollback**
1. Revert git commits
2. Push to trigger new deployment

---

## Success Criteria ✅

Your deployment is successful when:

- ✅ Application loads at production URL
- ✅ Test email sends successfully via Resend
- ✅ Sentry captures and displays test error
- ✅ Marketing email campaign sends and tracks recipients
- ✅ Authentication (signup/signin/verification) works
- ✅ Stripe test payment completes
- ✅ No errors in Vercel/Sentry dashboards after 1 hour

---

## Post-Launch Checklist (Week 1)

### ☐ Day 1-2
- [ ] Monitor Sentry for errors every 4 hours
- [ ] Check email delivery rates
- [ ] Verify webhook processing in Stripe
- [ ] Test all user-facing flows

### ☐ Day 3-7
- [ ] Monitor Sentry daily
- [ ] Review Vercel analytics
- [ ] Check Resend deliverability stats
- [ ] Gather user feedback
- [ ] Fix any critical bugs

### ☐ Week 2
- [ ] Review performance metrics
- [ ] Optimize slow endpoints
- [ ] Add missing features based on feedback
- [ ] Consider upgrading Resend/Sentry if hitting limits

---

## Emergency Contacts

**If you encounter issues**:

1. **Check Sentry** - Most errors show up here first
2. **Check Vercel logs** - For deployment/build issues
3. **Check Resend status** - https://status.resend.com/
4. **Check Stripe status** - https://status.stripe.com/

**Support**:
- Vercel: https://vercel.com/support
- Sentry: https://sentry.zendesk.com/
- Resend: support@resend.com
- Stripe: https://support.stripe.com/

---

## Optimization Opportunities (Post-MVP)

Once stable, consider:

1. **Upgrade Resend domain verification** - Better deliverability
2. **Set up Sentry alerts** - Slack/email notifications
3. **Add performance monitoring** - PostHog, Mixpanel
4. **Implement caching** - Redis for sessions, rate limiting
5. **Add unit tests** - Jest, React Testing Library
6. **Set up CI/CD** - GitHub Actions for testing
7. **Add feature flags** - LaunchDarkly, Flagsmith

---

## 🎉 You're Live!

Congratulations on deploying to production!

**Remember**:
- Start small, iterate based on user feedback
- Monitor closely for first week
- Fix bugs quickly
- Scale infrastructure as you grow

Good luck with your launch! 🚀
