ALTER TABLE "public"."books" ALTER COLUMN "genre" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."book_genre";--> statement-breakpoint
CREATE TYPE "public"."book_genre" AS ENUM('Fiction', 'Sci-Fi', 'Mystery', 'Non-Fiction', 'Fantasy', 'Romance', 'Classic', 'Historical Fiction', 'Horror', 'Adventure', 'Magical Realism', 'Dystopian', 'Modernist', 'Philosophical Fiction', 'Post-Apocalyptic Fiction');--> statement-breakpoint
ALTER TABLE "public"."books" ALTER COLUMN "genre" SET DATA TYPE "public"."book_genre" USING "genre"::"public"."book_genre";