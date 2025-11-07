# Email Recipient Tracking - Deployment Guide

## Overview

This feature adds detailed recipient tracking for marketing emails, allowing you to see exactly which emails were sent successfully and which failed, along with error messages.

## What's New

### Database Changes
- **New Table**: `email_recipients` - Tracks individual email delivery status
- **Fields**:
  - `recipientEmail`: Email address of the recipient
  - `recipientName`: Name of the recipient
  - `status`: "sent" or "failed"
  - `errorMessage`: Error details if failed
  - `sentAt`: Timestamp when email was sent

### API Changes
- **New Endpoint**: `GET /api/admin/marketing/campaigns/[id]/recipients`
  - Returns detailed recipient list for a campaign
  - Includes success/failure counts and error messages

### UI Changes
- **View Recipients Button**: Added to each campaign in the history
- **Recipients Dialog**: Shows detailed table of all recipients with:
  - Recipient name and email
  - Delivery status (sent/failed)
  - Send timestamp
  - Error message for failures
  - Summary statistics (total, sent, failed)

## Deployment Steps

### Step 1: Local Development Setup

```bash
# 1. Pull latest code
git pull origin <your-branch>

# 2. Install any new dependencies (if needed)
npm install @radix-ui/react-dialog

# 3. Generate Prisma client (may fail, continue anyway)
npx prisma generate || echo "Continuing..."

# 4. Apply database changes locally
npx prisma db push

# 5. Start dev server to test
npm run dev
```

### Step 2: Test Locally

1. Navigate to `/admin/marketing`
2. Send a test email to "custom" recipients (use your own email)
3. Click "View Recipients" button on the campaign
4. Verify you see the recipient details dialog with status

### Step 3: Production Deployment (Vercel)

#### Option A: Using Vercel Postgres Database

If you're using Vercel Postgres, run the SQL migration:

1. Go to Vercel Dashboard → Storage → Your Database
2. Click "Query" tab
3. Copy and paste the SQL from `add-recipient-tracking.sql`
4. Click "Run"
5. Verify the table was created

#### Option B: Using External PostgreSQL

If you're using an external PostgreSQL database:

```bash
# Connect to your production database
psql $DATABASE_URL

# Run the migration
\i add-recipient-tracking.sql

# Verify
\dt email_recipients
```

#### Option C: Using Prisma (Recommended)

```bash
# 1. Get your production DATABASE_URL from Vercel
# Vercel Dashboard → Settings → Environment Variables

# 2. Set it temporarily
export DATABASE_URL="your-production-database-url"

# 3. Push schema to production
npx prisma db push

# 4. Verify
npx prisma studio
# Look for email_recipients table
```

### Step 4: Deploy Code to Vercel

```bash
# 1. Commit your changes
git add .
git commit -m "Add email recipient tracking feature"

# 2. Push to your branch
git push -u origin <your-branch>

# 3. Vercel will auto-deploy
# Or trigger manually: vercel --prod
```

### Step 5: Verify Production

1. Visit your production site: `https://your-site.vercel.app`
2. Sign in as Admin/SuperAdmin
3. Go to `/admin/marketing`
4. Send a test campaign
5. Click "View Recipients" to verify tracking works

## Troubleshooting

### Issue: "Table email_recipients does not exist"

**Solution:**
```sql
-- Run this SQL in your production database
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
```

### Issue: "No recipient tracking data available"

This is expected for campaigns sent **before** this feature was deployed. Only new campaigns will have recipient tracking.

### Issue: Foreign key constraint error

If you get an error about the foreign key constraint:

```sql
-- Run without foreign key
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
```

### Issue: Dialog not showing

Make sure you have the required Radix UI package:

```bash
npm install @radix-ui/react-dialog
```

### Issue: Build failure on Vercel

Check the build logs. If Prisma generate fails:

1. Go to Vercel → Settings → Environment Variables
2. Add: `PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1`
3. Redeploy

## Checking Setup

Use the check-setup endpoint to verify everything is configured:

```bash
curl https://your-site.vercel.app/api/admin/marketing/check-setup
```

Expected response:
```json
{
  "success": true,
  "checks": {
    "database": true,
    "promotionalEmailTable": true,
    "canQuery": true,
    "smtpConfigured": true
  }
}
```

## Features

### Summary Statistics
At the top of the Recipients Dialog, you'll see:
- Total Recipients
- Successfully Sent (green)
- Failed (red)

### Recipient Table
Columns:
- **Recipient**: Name of the person
- **Email**: Email address
- **Status**: Badge showing "Sent" (green) or "Failed" (red)
- **Sent At**: Timestamp of when email was sent
- **Error**: Error message for failed emails (hover to see full text)

### Benefits
1. **Debugging**: See exactly which emails failed and why
2. **Accountability**: Track delivery status for compliance
3. **Optimization**: Identify problematic email addresses or patterns
4. **Reporting**: Export recipient data for analysis

## Database Schema

```prisma
model EmailRecipient {
  id                   String            @id @default(cuid())
  promotionalEmailId   String
  promotionalEmail     PromotionalEmail  @relation(fields: [promotionalEmailId], references: [id], onDelete: Cascade)

  recipientEmail       String
  recipientName        String?
  status               String            // sent, failed
  errorMessage         String?           @db.Text

  sentAt               DateTime?
  createdAt            DateTime          @default(now())

  @@map("email_recipients")
  @@index([promotionalEmailId])
}
```

## Performance Considerations

- **Indexing**: The `promotionalEmailId` is indexed for fast lookups
- **Pagination**: Consider adding pagination if campaigns have >1000 recipients
- **Cascade Delete**: Recipients are deleted when campaign is deleted

## Future Enhancements

Ideas for extending this feature:
1. Export recipients to CSV
2. Filter by status (show only failed)
3. Retry failed emails
4. Email open/click tracking
5. Unsubscribe tracking

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Check browser console for errors
3. Test the recipient endpoint directly:
   ```bash
   curl https://your-site.vercel.app/api/admin/marketing/campaigns/{campaignId}/recipients
   ```
4. Verify database table exists:
   ```sql
   SELECT * FROM email_recipients LIMIT 1;
   ```

## Rollback

If you need to rollback this feature:

```sql
-- Drop the table
DROP TABLE IF EXISTS email_recipients;
```

Then revert the code changes in git.

---

**Remember**: This feature only tracks emails sent **after** deployment. Previous campaigns won't have recipient data.

🎉 **You're all set!** Send a test campaign and click "View Recipients" to see the magic happen!
