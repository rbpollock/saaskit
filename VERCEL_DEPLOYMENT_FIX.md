# Fixing 500 Error on Vercel - Marketing Email Feature

## The Problem

You're seeing this error on Vercel:
```
Status Code: 500 Internal Server Error
URL: https://saaskit-delta.vercel.app/api/admin/marketing/send-email
```

**Root Cause:** The `promotional_emails` table doesn't exist in your Vercel production database yet.

## Why This Happened

When you deployed to Vercel:
1. ✅ Prisma client was generated (includes PromotionalEmail model)
2. ✅ Application code was deployed
3. ❌ **Database migrations were NOT applied**

Your production database is missing the new table!

## Quick Fix (3 Methods)

### Method 1: Using Vercel Postgres Studio (Easiest)

If you're using Vercel Postgres:

1. **Go to Vercel Dashboard**
   - Navigate to your project
   - Click "Storage" tab
   - Click on your Postgres database

2. **Open Query Tab**
   ```sql
   -- Create promotional_emails table
   CREATE TABLE "promotional_emails" (
       "id" TEXT NOT NULL PRIMARY KEY,
       "subject" TEXT NOT NULL,
       "content" TEXT NOT NULL,
       "sentBy" TEXT NOT NULL,
       "recipientType" TEXT NOT NULL,
       "recipientEmails" TEXT[] DEFAULT ARRAY[]::TEXT[],
       "totalRecipients" INTEGER NOT NULL DEFAULT 0,
       "successCount" INTEGER NOT NULL DEFAULT 0,
       "failureCount" INTEGER NOT NULL DEFAULT 0,
       "status" TEXT NOT NULL DEFAULT 'draft',
       "scheduledFor" TIMESTAMP(3),
       "sentAt" TIMESTAMP(3),
       "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
       "updatedAt" TIMESTAMP(3) NOT NULL,
       CONSTRAINT "promotional_emails_sentBy_fkey" FOREIGN KEY ("sentBy")
         REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
   );
   ```

3. **Run the query**
   - Click "Run Query"
   - Verify: "Table created successfully"

4. **Redeploy**
   - Go to Deployments tab
   - Click "..." on latest deployment
   - Click "Redeploy"

### Method 2: Using Migration Script (Recommended for any database)

1. **Run the migration script locally**
   ```bash
   chmod +x migrate-vercel-db.sh
   ./migrate-vercel-db.sh
   ```

2. **When prompted:**
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Copy your `DATABASE_URL` value
   - Paste it when the script asks

3. **Script will:**
   - Connect to your production database
   - Apply the schema changes
   - Create the promotional_emails table

4. **Redeploy on Vercel**
   - Settings → Redeploy

### Method 3: Manual Migration with Prisma

1. **Get your production DATABASE_URL**
   ```bash
   # From Vercel dashboard, copy DATABASE_URL
   # Then export it temporarily
   export DATABASE_URL="postgresql://user:pass@host/db"
   ```

2. **Run Prisma push**
   ```bash
   npx prisma db push
   ```

3. **Redeploy on Vercel**

## Verification Steps

After applying the fix:

### 1. Check Setup Endpoint

Visit (replace with your domain):
```
https://saaskit-delta.vercel.app/api/admin/marketing/check-setup
```

**Expected response:**
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

### 2. Test Marketing Page

1. Sign in as Admin/SuperAdmin
2. Go to: `https://saaskit-delta.vercel.app/admin/marketing`
3. Try sending a test email

### 3. Check Vercel Logs

In Vercel dashboard:
- Go to your deployment
- Click "Logs" tab
- Look for success messages:
  ```
  📧 Sending promotional email to X recipients...
  ✅ Email sent successfully
  ```

## Environment Variables Checklist

Verify these are set in Vercel:

**Settings → Environment Variables**

Required for email functionality:
```
SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-mailtrap-user
SMTP_PASS=your-mailtrap-pass
SMTP_FROM=AI SaaS <noreply@example.com>
ADMIN_EMAIL=admin@example.com
```

Required for app:
```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://saaskit-delta.vercel.app
NEXTAUTH_SECRET=your-secret
NEXT_PUBLIC_APP_URL=https://saaskit-delta.vercel.app
APP_NAME=AI SaaS
```

After adding/changing variables:
- **Click "Save"**
- **Redeploy** the application

## Common Issues

### Issue 1: Still getting 500 error after migration

**Check:**
1. Did you redeploy after running migration?
2. Check Vercel logs for specific error
3. Visit `/api/admin/marketing/check-setup`

**Solution:**
```bash
# Redeploy from CLI
vercel --prod

# Or in dashboard: Settings → Redeploy
```

---

### Issue 2: "Cannot find module @prisma/client"

**Solution:**
Vercel didn't generate Prisma client during build.

1. Check `package.json` has postinstall script:
   ```json
   "postinstall": "prisma generate"
   ```

2. Redeploy

---

### Issue 3: Migration script can't connect

**Error:**
```
Can't reach database server
```

**Solution:**
1. Check DATABASE_URL is correct
2. Ensure database allows connections from your IP
3. For Vercel Postgres, check connection pooling settings

---

### Issue 4: SMTP not configured

**Error from check-setup:**
```json
{
  "smtpConfigured": false
}
```

**Solution:**
1. Add SMTP environment variables in Vercel
2. Go to Settings → Environment Variables
3. Add all SMTP_* variables
4. Save and redeploy

---

## Preventing This in Future

### 1. Use Prisma Migrate

Instead of `db push`, use migrations:

```bash
# Create migration locally
npx prisma migrate dev --name add_promotional_emails

# In production (Vercel), it runs automatically
# Or run manually:
npx prisma migrate deploy
```

### 2. Add to CI/CD

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run migrations
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          npm install
          npx prisma migrate deploy
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
```

### 3. Vercel Build Hook

Add to `package.json`:
```json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

Note: This requires DATABASE_URL to be available during build.

---

## Quick Diagnostic Commands

### Check if table exists in production

```bash
# Export production DATABASE_URL
export DATABASE_URL="postgresql://..."

# Query the database
npx prisma db pull

# Check schema.prisma - should show promotional_emails
```

### Check Vercel build logs

```bash
# Using Vercel CLI
vercel logs [deployment-url]

# Look for:
# - "prisma generate" success
# - Any migration errors
```

### Test locally with production DB

```bash
# Temporarily use production DATABASE_URL
export DATABASE_URL="postgresql://production-url"

# Test the API
npm run dev

# Visit http://localhost:3000/api/admin/marketing/check-setup
```

---

## Alternative: Use Vercel Postgres Features

If using Vercel Postgres, you can use their features:

### 1. Branching

Create a preview branch:
```bash
vercel env pull
# Test migrations on preview branch first
```

### 2. Connection Pooling

Update DATABASE_URL format:
```
postgres://user:pass@host/db?pgbouncer=true
```

### 3. Read Replicas

For production, consider read replicas for better performance.

---

## Step-by-Step Fix Summary

**If you just want to fix it NOW:**

1. **Go to Vercel Dashboard**
   - Your Project → Storage → Database → Query

2. **Run this SQL:**
   ```sql
   CREATE TABLE "promotional_emails" (
       "id" TEXT NOT NULL PRIMARY KEY,
       "subject" TEXT NOT NULL,
       "content" TEXT NOT NULL,
       "sentBy" TEXT NOT NULL,
       "recipientType" TEXT NOT NULL,
       "recipientEmails" TEXT[],
       "totalRecipients" INTEGER DEFAULT 0,
       "successCount" INTEGER DEFAULT 0,
       "failureCount" INTEGER DEFAULT 0,
       "status" TEXT DEFAULT 'draft',
       "scheduledFor" TIMESTAMP(3),
       "sentAt" TIMESTAMP(3),
       "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
       "updatedAt" TIMESTAMP(3) NOT NULL,
       CONSTRAINT "promotional_emails_sentBy_fkey"
         FOREIGN KEY ("sentBy") REFERENCES "users"("id")
   );
   ```

3. **Redeploy:**
   - Deployments → Latest → "..." → Redeploy

4. **Test:**
   - Visit `/api/admin/marketing/check-setup`
   - Try sending an email from `/admin/marketing`

Done! 🎉

---

## Getting More Help

**Check these in order:**

1. **Check setup endpoint response**
   ```
   https://your-domain.vercel.app/api/admin/marketing/check-setup
   ```

2. **Check Vercel logs**
   - Dashboard → Deployments → Your deployment → Logs
   - Look for "promotional_emails" errors

3. **Check environment variables**
   - Settings → Environment Variables
   - Verify SMTP_* and DATABASE_URL are set

4. **Test locally with production database**
   ```bash
   export DATABASE_URL="your-prod-url"
   npm run dev
   # Test at localhost:3000/api/admin/marketing/check-setup
   ```

5. **Check database directly**
   - Use Prisma Studio: `npx prisma studio`
   - Or Vercel Postgres Studio
   - Verify "promotional_emails" table exists

---

## Success Indicators

You'll know it's working when:

✅ Check-setup endpoint returns `"success": true`
✅ Marketing page loads without errors
✅ Can select recipient types in dropdown
✅ Sending email returns success with counts
✅ Email appears in Mailtrap inbox
✅ Campaign shows in history
✅ Vercel logs show "Email sent successfully"

---

## Support Checklist

When asking for help, provide:

1. Check-setup endpoint response
2. Vercel deployment logs (last 50 lines)
3. Error message from browser network tab
4. Database provider (Vercel Postgres, Neon, Supabase, etc.)
5. Whether migration was applied
6. Environment variables (don't share values, just names)

---

**Remember:** The issue is simply that the database table doesn't exist yet in production. Once you create it using any of the methods above, everything will work! 🚀
