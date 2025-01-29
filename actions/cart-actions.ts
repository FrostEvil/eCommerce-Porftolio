"use server";

import {
  decreaseCartBookQuantity,
  deleteFromCartBook,
  getAllCartBooks,
  getSelectedBook,
  increaseCartBookQuantity,
} from "@/lib/cart";
import {
  ManageUserCartBook,
  Book,
  CartBook,
  User,
  UserSession,
} from "@/types/type";
import { revalidatePath } from "next/cache";

export async function addBookCart({ book, userId }: ManageUserCartBook) {
  increaseCartBookQuantity({ book, userId });
  revalidatePath("/cart");
}

export async function subBookCart({ book, userId }: ManageUserCartBook) {
  decreaseCartBookQuantity({ book, userId });
  revalidatePath("/cart");
}

export async function deleteCartBook(id: CartBook["id"]) {
  deleteFromCartBook(id);
  revalidatePath("/cart");
}

export async function getCartBooks(id: CartBook["id"]) {
  return getAllCartBooks(id);
}

export async function getSelectedCartBook(
  id: Book["id"],
  userId: UserSession["userId"]
) {
  try {
    return getSelectedBook({ id, userId });
  } catch (error) {
    console.error(error);
  }
}
