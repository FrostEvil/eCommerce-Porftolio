"use server";

import { db } from "@/drizzle/db";
import { BookTable } from "@/drizzle/schema";
import { normalizeBookFields } from "@/utils/normalizeBookFields";
import { desc } from "drizzle-orm";

export async function getFeaturedBooks(take: number) {
  const featuredBooks = await db
    .select()
    .from(BookTable)
    .orderBy(desc(BookTable.rating))
    .limit(take);

  return normalizeBookFields(featuredBooks);
}

export async function getDiscountedBooks(take: number) {
  const discountedBooks = await db
    .select()
    .from(BookTable)
    .orderBy(desc(BookTable.discount))
    .limit(take);

  return normalizeBookFields(discountedBooks);
}
