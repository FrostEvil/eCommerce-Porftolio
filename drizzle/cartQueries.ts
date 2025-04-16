"use server";

import { Book } from "@/types/type";
import { User } from "next-auth";
import { db } from "./db";
import { BookTable, UserBookCartTable } from "./schema";
import { and, eq } from "drizzle-orm";

export async function getCartBooks(userId: User["id"]) {
  if (!userId) return;

  const userCartBooks = await db
    .select()
    .from(UserBookCartTable)
    .where(eq(UserBookCartTable.userId, userId))
    .innerJoin(BookTable, eq(UserBookCartTable.bookId, BookTable.id));

  const formattedCartBooks = userCartBooks.map((item) => ({
    ...item.user_books,
    ...item.books,
    price: parseFloat(item.books.price),
    rating: parseFloat(item.books.rating),
  }));
  return formattedCartBooks;
}

export async function updateCartBook(userId: User["id"], bookId: Book["id"]) {
  if (!userId || !bookId) return false;

  const cartBook = await db.query.UserBookCartTable.findFirst({
    where: and(
      eq(UserBookCartTable.userId, userId),
      eq(UserBookCartTable.bookId, bookId)
    ),
  });

  if (!cartBook) {
    await db.insert(UserBookCartTable).values({
      userId: userId,
      bookId: bookId,
      amount: 1,
    });
    return true;
  }
  await db
    .update(UserBookCartTable)
    .set({ amount: cartBook.amount + 1 })
    .where(
      and(
        eq(UserBookCartTable.userId, userId),
        eq(UserBookCartTable.bookId, bookId)
      )
    );
  return true;
}
