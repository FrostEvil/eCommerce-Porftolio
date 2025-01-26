"use server";

import { decreaseCartBookQuantity, increaseCartBookQuantity } from "@/lib/cart";
import { Book } from "@/types/type";

export async function addBookCart(book: Book) {
  increaseCartBookQuantity(book);
}

export async function subBookCart(book: Book) {
  decreaseCartBookQuantity(book);
}
