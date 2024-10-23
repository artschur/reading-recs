ALTER TABLE "books" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "authors" DROP COLUMN IF EXISTS "bio";