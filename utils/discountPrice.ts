import { Book } from "@/types/type";

export function discountPrice(book: Book) {
  return Number((book.price * (1 - book.discount / 100)).toFixed(2));
}
