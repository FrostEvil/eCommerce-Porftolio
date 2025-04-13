CREATE TYPE "public"."book_genre" AS ENUM('Fiction', 'Sci-Fi', 'Fantasy', 'Classic', 'Romance', 'Historical Fiction', 'Horror', 'Adventure', 'Magical Realism', 'Dystopian');--> statement-breakpoint
CREATE TYPE "public"."oauth_provides" AS ENUM('google', 'discord', 'github');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "books" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"genre" "book_genre" NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"language" varchar(255) NOT NULL,
	"yearPublished" integer NOT NULL,
	"rating" numeric(3, 1) NOT NULL,
	"coverImageUrl" text NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "yearPublished_check" CHECK ("books"."yearPublished" > 0 AND "books"."yearPublished" <= EXTRACT(YEAR FROM CURRENT_DATE)),
	CONSTRAINT "rating_check" CHECK ("books"."rating" >= 0 AND "books"."rating" <= 5)
);
--> statement-breakpoint
CREATE TABLE "user_books" (
	"userId" uuid NOT NULL,
	"bookId" serial NOT NULL,
	"amount" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_oauth_accounts" (
	"userId" uuid NOT NULL,
	"provider" "oauth_provides" NOT NULL,
	"providerAccountId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_oauth_accounts_providerAccountId_provider_pk" PRIMARY KEY("providerAccountId","provider"),
	CONSTRAINT "user_oauth_accounts_providerAccountId_unique" UNIQUE("providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255),
	"salt" text,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "user_books" ADD CONSTRAINT "user_books_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_books" ADD CONSTRAINT "user_books_bookId_books_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_oauth_accounts" ADD CONSTRAINT "user_oauth_accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;