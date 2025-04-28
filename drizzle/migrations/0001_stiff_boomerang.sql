ALTER TABLE "public"."books" ALTER COLUMN "genre" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."book_genre";--> statement-breakpoint
CREATE TYPE "public"."book_genre" AS ENUM('fiction', 'sci-fi', 'fantasy', 'romance', 'classic', 'historical-fiction', 'horror', 'adventure', 'magical-realism', 'dystopian');--> statement-breakpoint
ALTER TABLE "public"."books" ALTER COLUMN "genre" SET DATA TYPE "public"."book_genre" USING "genre"::"public"."book_genre";