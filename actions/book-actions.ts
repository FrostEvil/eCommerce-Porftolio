"use server";

import { getSingleBook } from "@/lib/books";
import { Book, CartBook } from "@/types/type";

export async function getSelectedBook(id: CartBook["id"]) {
  const result = getSingleBook(id) as Book;
  return result;
}
