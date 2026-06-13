-- Add agency-specific fields to Lead table
ALTER TABLE "Lead" ADD COLUMN "company" TEXT;
ALTER TABLE "Lead" ADD COLUMN "service" TEXT;
ALTER TABLE "Lead" ADD COLUMN "budget"  TEXT;
