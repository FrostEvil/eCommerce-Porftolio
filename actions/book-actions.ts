"use server";

import { getSingleBook, updateBooks } from "@/lib/books";
import { getAllCartBooks } from "@/lib/cart";
import { Book, CartBook, UserSession } from "@/types/type";

export async function getSelectedBook(id: CartBook["id"]) {
  const result = getSingleBook(id) as Book;
  return result;
}

export async function updateBooksStock(userId: UserSession["userId"]) {
  const cartBook = getAllCartBooks(userId);
  updateBooks(cartBook);
}
