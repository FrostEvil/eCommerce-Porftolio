"use client";

import useCartManagement from "@/hooks/useCartManagement";
import { UseCartManagementType } from "@/types/type";

export default function AddToCartButton({
  cartProps,
}: {
  cartProps: UseCartManagementType;
}) {
  const { handleAddCartBook, handleIncrease } = useCartManagement(cartProps);
  return (
    <div className="relative group">
      <button
        onClick={cartProps.cartBook ? handleIncrease : handleAddCartBook}
        className="bg-green-500 text-white text-sm font-semibold py-1.5 px-4 rounded  transition duration-300 hover:bg-green-600  "
      >
        Add to Cart
      </button>
    </div>
  );
}
