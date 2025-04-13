import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  pgEnum,
  text,
  primaryKey,
  decimal,
  integer,
  check,
  serial,
} from "drizzle-orm/pg-core";

//ENUM for user roles
export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

//User Table
export const UserTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  salt: text(),
  role: userRoleEnum().default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

//User relations
export const userRelations = relations(UserTable, ({ many }) => ({
  oAuthAccounts: many(UserOAuthAccountTable),
}));

export const oAuthProviderEnum = pgEnum("oauth_provides", [
  "google",
  "discord",
  "github",
]);

export const UserOAuthAccountTable = pgTable(
  "user_oauth_accounts",
  {
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: "cascade" }),
    provider: oAuthProviderEnum().notNull(),
    providerAccountId: text().notNull().unique(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.providerAccountId, t.provider] })]
);

export const userOauthAccountRelationships = relations(
  UserOAuthAccountTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserOAuthAccountTable.userId],
      references: [UserTable.id],
    }),
  })
);

//ENUM for genre
export const bookGenreEnum = pgEnum("book_genre", [
  "Fiction",
  "Sci-Fi",
  "Fantasy",
  "Classic",
  "Romance",
  "Historical Fiction",
  "Horror",
  "Adventure",
  "Magical Realism",
  "Dystopian",
]);

//Book Table
export const BookTable = pgTable(
  "books",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    author: varchar("author", { length: 255 }).notNull(),
    genre: bookGenreEnum().notNull(),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(),
    language: varchar("language", { length: 255 }).notNull(),
    yearPublished: integer("yearPublished").notNull(),
    rating: decimal("rating", { precision: 3, scale: 1 }).notNull(),
    coverImageUrl: text().notNull(),
    description: text().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (table) => [
    check(
      "yearPublished_check",
      sql`${table.yearPublished} > 0 AND ${table.yearPublished} <= EXTRACT(YEAR FROM CURRENT_DATE)`
    ),

    check("rating_check", sql`${table.rating} >= 0 AND ${table.rating} <= 5`),
  ]
);

export const UserBookCartTable = pgTable("user_books", {
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  bookId: serial("bookId").references(() => BookTable.id, {
    onDelete: "cascade",
  }),
  amount: integer("amount").default(1).notNull(),
});

export const userBookRelationships = relations(
  UserBookCartTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserBookCartTable.userId],
      references: [UserTable.id],
    }),
    book: one(BookTable, {
      fields: [UserBookCartTable.bookId],
      references: [BookTable.id],
    }),
  })
);
