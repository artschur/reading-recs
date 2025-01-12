DROP TABLE "fields_of_influencers";--> statement-breakpoint
ALTER TABLE "influential_people" RENAME COLUMN "influentialField" TO "influentialField_Id";--> statement-breakpoint
ALTER TABLE "recommendations" RENAME COLUMN "userId" TO "influencerId";--> statement-breakpoint
ALTER TABLE "recommendations" DROP CONSTRAINT "recommendations_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "influential_people" ALTER COLUMN "influentialField_Id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "recommendations" ADD COLUMN "source" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "influential_people" ADD CONSTRAINT "influential_people_influentialField_Id_fields_id_fk" FOREIGN KEY ("influentialField_Id") REFERENCES "public"."fields"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recommendations" ADD CONSTRAINT "recommendations_influencerId_influential_people_id_fk" FOREIGN KEY ("influencerId") REFERENCES "public"."influential_people"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "books_genre_id_idx" ON "books" USING btree ("genreId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "books_author_id_idx" ON "books" USING btree ("authorId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "influential_people_field_id_idx" ON "influential_people" USING btree ("influentialField_Id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recommendations_book_id_idx" ON "recommendations" USING btree ("bookId");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recommendations_influencer_id_idx" ON "recommendations" USING btree ("influencerId");