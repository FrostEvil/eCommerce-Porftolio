import { CartBook } from "@/types/type";
import userSessionId from "./userSessionId";
import { getCartBooks } from "@/actions/cart-actions";

export default async function calculateCartSummary() {
  const userId = await userSessionId();
  const allBooks: CartBook[] = await getCartBooks(userId);
  const totalPrice = parseFloat(
    allBooks
      .map((book) => book.endingPrice)
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2)
  );
  const totalBooks = allBooks
    .map((book) => book.quantity)
    .reduce((acc, cur) => acc + cur, 0);

  return {
    totalPrice,
    totalBooks,
  };
}
