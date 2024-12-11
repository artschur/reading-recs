CREATE TABLE IF NOT EXISTS "fields_of_influencers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "fields_of_influencers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"influencerId" integer NOT NULL,
	"fieldId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fields" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "fields_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "influential_people" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "influential_people_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" text,
	"yearBorn" integer,
	"influentialField" varchar(255) NOT NULL,
	"occupation" varchar(255) NOT NULL,
	"profilePic" varchar(255),
	"visible" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fields_of_influencers" ADD CONSTRAINT "fields_of_influencers_influencerId_influential_people_id_fk" FOREIGN KEY ("influencerId") REFERENCES "public"."influential_people"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fields_of_influencers" ADD CONSTRAINT "fields_of_influencers_fieldId_fields_id_fk" FOREIGN KEY ("fieldId") REFERENCES "public"."fields"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
