import { CartSummary, CartSummaryProps } from "@/types/type";

export default function calculateCartSummary({
  cartItems,
}: CartSummaryProps): CartSummary {
  const totalPrice = Number(
    cartItems.reduce((sum, item) => sum + item.endingPrice, 0)
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    totalPrice,
    totalQuantity,
  };
}
