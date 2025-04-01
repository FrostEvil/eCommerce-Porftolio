"use server";

import { db } from "@/drizzle/db";
import { BookTable } from "@/drizzle/schema";
import { desc } from "drizzle-orm";

export async function getFeaturedBooks(take: number) {
  const featuredBooks = await db
    .select()
    .from(BookTable)
    .orderBy(desc(BookTable.rating))
    .limit(take);

  const updatedFeaturedBooks = featuredBooks.map((book) => ({
    ...book,
    price: parseFloat(book.price),
    rating: parseFloat(book.rating),
  }));

  return updatedFeaturedBooks;
}

export async function getDiscountedBooks(take: number) {
  const discountedBooks = await db.select().from(BookTable).limit(take);
  const updatedDiscountedBooks = discountedBooks.map((book) => ({
    ...book,
    price: parseFloat(book.price),
    rating: parseFloat(book.rating),
  }));
  return updatedDiscountedBooks;
}
