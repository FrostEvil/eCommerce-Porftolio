"use client";

import { addBookCart } from "@/actions/cart-actions";
import { Book } from "@/types/type";

export default function AddToCartButton(book: Book) {
  return (
    <div className="relative group">
      <button
        onClick={() => {
          addBookCart(book);
        }}
        className="bg-green-500 text-white text-sm font-semibold py-1.5 px-4 rounded  transition duration-300 hover:bg-green-600  "
      >
        Add to Cart
      </button>
    </div>
  );
}
