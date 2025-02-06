import { getAllCartBooks } from "@/lib/cart";
import userSessionId from "@/lib/userSessionId";
import calculateCartSummary from "./calculateCartSummary";

export default async function fetchCartUtils() {
  try {
    const userId = await userSessionId();

    if (!userId) throw new Error("User not authenticated");

    const cartItems = getAllCartBooks(userId);
    const cartSummaryValues = calculateCartSummary({ cartItems });

    return { cartItems, cartSummaryValues };
  } catch (error) {
    console.error("Error fetching cart details:", error);
    return {
      cartItems: [],
      cartSummaryValues: { totalPrice: 0, totalQuantity: 0 },
    }; // Safe fallback values
  }
}
