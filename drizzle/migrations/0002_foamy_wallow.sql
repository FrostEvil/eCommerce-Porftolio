ALTER TABLE "books" DROP CONSTRAINT "bookQuantity_check";--> statement-breakpoint
ALTER TABLE "books" ADD COLUMN "stockQuantity" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "books" DROP COLUMN "bookQuantity";--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "bookQuantity_check" CHECK ( >= 0);