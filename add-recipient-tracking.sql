-- SQL Migration: Add Email Recipient Tracking
-- This adds the email_recipients table to track individual email delivery status

-- Create email_recipients table
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

-- Add foreign key constraint (if promotional_emails table exists)
-- Note: Use the correct table name - it might be lowercase "users" or "promotional_emails"
DO $$
BEGIN
    -- Check if foreign key doesn't already exist
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'email_recipients_promotionalEmailId_fkey'
    ) THEN
        ALTER TABLE "email_recipients"
        ADD CONSTRAINT "email_recipients_promotionalEmailId_fkey"
        FOREIGN KEY ("promotionalEmailId")
        REFERENCES "promotional_emails" ("id")
        ON DELETE CASCADE
        ON UPDATE CASCADE;
    END IF;
END $$;

-- Create index on promotionalEmailId for faster lookups
CREATE INDEX IF NOT EXISTS "email_recipients_promotionalEmailId_idx"
ON "email_recipients"("promotionalEmailId");

-- Verify the table was created
SELECT
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'email_recipients'
ORDER BY ordinal_position;
