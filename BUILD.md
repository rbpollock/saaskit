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

1. **Environment Variables**

   Make sure to set these environment variables in your Vercel project settings:

   ```
   DATABASE_URL=postgresql://...
   NEXTAUTH_SECRET=your-secret
   NEXTAUTH_URL=https://yourdomain.com
   PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1
   # ... other variables from .env.example
   ```

2. **Build Configuration**

   Vercel will automatically use the `vercel-build` script if available, otherwise it uses `build`.

3. **Database Setup**

   Ensure your production database is set up and accessible. Run migrations if needed:

   ```bash
   npx prisma migrate deploy
   ```

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

### "export-detail.json" Error

This error typically occurs when:
- The build process is interrupted or fails during page data collection
- DATABASE_URL is not set during build (required for API routes)
- Prisma client is not properly generated

**Solution:**
1. Ensure `DATABASE_URL` is set in your environment variables
2. Verify Prisma client generation succeeds: `npm run prisma:generate`
3. Check that all API routes can connect to the database

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
