"use server";

import { getCartBooks } from "@/drizzle/cartQueries";
import { db } from "@/drizzle/db";
import { UserBookCartTable } from "@/drizzle/schema";
import { Book, CartBook } from "@/types/type";
import { and, eq } from "drizzle-orm";
import { User } from "next-auth";
import { revalidatePath } from "next/cache";

export async function increaseCartBookAmount(
  userId: User["id"],
  bookId: Book["id"],
  amount: CartBook["amount"]
) {
  if (!userId || !bookId || !amount) return;
  if (amount > 9) return;
  await db
    .update(UserBookCartTable)
    .set({ amount: amount + 1 })
    .where(
      and(
        eq(UserBookCartTable.userId, userId),
        eq(UserBookCartTable.bookId, bookId)
      )
    );
  revalidatePath("/cart");
}

export async function decreaseCartBookAmount(
  userId: User["id"],
  bookId: Book["id"],
  amount: CartBook["amount"]
) {
  if (!userId || !bookId || !amount) return;
  if (amount < 1) return;
  await db
    .update(UserBookCartTable)
    .set({ amount: amount - 1 })
    .where(
      and(
        eq(UserBookCartTable.userId, userId),
        eq(UserBookCartTable.bookId, bookId)
      )
    );
  revalidatePath("/cart");
}

export async function getCartSummary(userId: User["id"]) {
  if (!userId) return;

  const userCartBooks = await getCartBooks(userId);

  if (!userCartBooks) return;

  const totalAmount = userCartBooks.reduce((acc, cur) => acc + cur.amount, 0);
  const totalPrice = userCartBooks.reduce(
    (acc, cur) => acc + cur.amount * cur.price,
    0
  );
  return { totalAmount, totalPrice };
}

export async function removeBookFromCart(
  userId: User["id"],
  bookId: Book["id"]
) {
  if (!userId || !bookId) return;
  await db
    .delete(UserBookCartTable)
    .where(
      and(
        eq(UserBookCartTable.userId, userId),
        eq(UserBookCartTable.bookId, bookId)
      )
    );
}

export async function removeUserCartBook(userId: User["id"]) {
  if (!userId) return;
  await db
    .delete(UserBookCartTable)
    .where(eq(UserBookCartTable.userId, userId));
}
