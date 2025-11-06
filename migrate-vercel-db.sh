#!/bin/bash

echo "🚀 Migrating Vercel Production Database..."
echo ""
echo "⚠️  IMPORTANT: This will modify your PRODUCTION database on Vercel!"
echo ""
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "❌ Migration cancelled"
    exit 0
fi

echo ""
echo "📋 Please follow these steps:"
echo ""
echo "1. Get your production DATABASE_URL from Vercel:"
echo "   - Go to https://vercel.com/[your-project]/settings/environment-variables"
echo "   - Copy the DATABASE_URL value"
echo ""
read -p "Paste your production DATABASE_URL here: " prod_db_url

if [ -z "$prod_db_url" ]; then
    echo "❌ Error: DATABASE_URL is required"
    exit 1
fi

echo ""
echo "2. Running migration against production database..."
echo ""

# Export the production DATABASE_URL
export DATABASE_URL="$prod_db_url"

# Run Prisma db push
echo "Executing: prisma db push"
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 npx prisma db push --skip-generate

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Migration successful!"
    echo ""
    echo "Next steps:"
    echo "1. Go to Vercel dashboard"
    echo "2. Redeploy your application (Settings → Redeploy)"
    echo "3. Test the marketing email feature"
    echo ""
else
    echo ""
    echo "❌ Migration failed!"
    echo ""
    echo "Troubleshooting:"
    echo "1. Check if DATABASE_URL is correct"
    echo "2. Ensure database is accessible"
    echo "3. Check Vercel logs for errors"
    echo ""
fi
