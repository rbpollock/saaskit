# Build & Deployment Guide

## Local Development

```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Push database schema
npm run db:push

# Seed database (optional)
npm run db:seed

# Start development server
npm run dev
```

## Production Build

### Standard Build

```bash
npm run build
```

### Build with Prisma Generation

The build script automatically runs `prisma generate` before building:

```bash
npm run build
# This runs: prisma generate && next build
```

## Deployment

### Vercel Deployment

#### Important: Output Mode Configuration

✅ **The project is pre-configured with `output: "standalone"` in `next.config.ts`** - This is required for Vercel deployment and prevents the `export-detail.json` error.

#### Deployment Steps

1. **Environment Variables**

   Make sure to set these environment variables in your Vercel project settings:

   ```
   DATABASE_URL=postgresql://...
   NEXTAUTH_SECRET=your-secret
   NEXTAUTH_URL=https://yourdomain.com
   PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
   # ... other variables from .env.example
   ```

   ⚠️ **Critical**: `DATABASE_URL` must be set in both **Build** and **Runtime** environment variables in Vercel.

2. **Build Configuration**

   Vercel will automatically use the `vercel-build` script if available, otherwise it uses `build`.

   The build process will:
   - Attempt to generate Prisma client
   - Fall back to existing client if generation fails
   - Build Next.js with standalone output mode

3. **Database Setup**

   Ensure your production database is set up and accessible. Run migrations if needed:

   ```bash
   npx prisma migrate deploy
   ```

#### Vercel-Specific Notes

- The `output: "standalone"` configuration creates an optimized build for Vercel's serverless platform
- This prevents static export errors with dynamic routes and API routes
- Vercel will automatically detect and deploy the standalone output

### Other Platforms (Railway, Render, etc.)

1. Set the build command to: `npm run build`
2. Set the start command to: `npm start`
3. Configure all environment variables from `.env.example`
4. Set `PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1` if deploying in restricted network environments

## Troubleshooting

### Prisma Client Generation Fails

If you encounter Prisma client generation issues in CI/CD:

1. Set environment variable: `PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1`
2. Ensure your build command includes: `prisma generate`

The build script will automatically fall back to using the existing Prisma client if generation fails.

### Build Errors Related to Missing Files

The postinstall script handles Prisma generation failures gracefully. If it fails during install, it will continue, and the build script will retry.

### "export-detail.json" Error on Vercel

**Error Message:**
```
Error: ENOENT: no such file or directory, lstat '/vercel/path0/.next/export-detail.json'
Traced Next.js server files in: XX.XXXms
```

**Root Cause:**

⚠️ **This error is caused by `next-swagger-doc` v0.4.1** - This is a known issue with the package.

**Solution:**

✅ **The project is already configured with `next-swagger-doc@0.4.0`** - This fixes the issue.

**If you encounter this error:**

1. **Check your `next-swagger-doc` version:**
   ```bash
   npm list next-swagger-doc
   ```

2. **If it shows v0.4.1, downgrade to v0.4.0:**
   ```bash
   npm install next-swagger-doc@0.4.0
   ```

3. **Redeploy to Vercel**

**Additional Checks:**
- Ensure `DATABASE_URL` is set in your Vercel environment variables (both build and runtime)
- Verify Prisma client generation succeeds: `npm run prisma:generate`
- The `output: "standalone"` configuration in next.config.ts is also recommended for Vercel

**Technical Details:**

The issue was introduced in `next-swagger-doc` v0.4.1 and affects Next.js 15 deployments on Vercel. The package incorrectly triggers static export mode, which creates the export-detail.json file requirement. Version 0.4.0 does not have this issue.

**References:**
- GitHub Issue: https://github.com/jellydn/next-swagger-doc/issues/1157

### Database Connection Issues

Make sure:
- `DATABASE_URL` is correctly set **during build and runtime**
- Database is accessible from your deployment environment
- Database schema is up to date (`prisma migrate deploy`)
- For Vercel: DATABASE_URL must be available in build environment variables

### API Routes Failing During Build

Next.js 15 attempts to collect static page data during build. If your API routes require database access:

1. Ensure `DATABASE_URL` is set during the build process
2. Make sure your database is accessible from the build environment
3. The Prisma client must be properly generated before the build

## Build Scripts Reference

- `npm run build` - Generate Prisma client and build Next.js app
- `npm run vercel-build` - Vercel-specific build command
- `npm run start` - Start production server
- `npm run dev` - Start development server
- `npm run db:push` - Push Prisma schema to database
- `npm run db:seed` - Seed database with initial data
