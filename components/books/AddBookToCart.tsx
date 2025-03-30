"use client";

import { updateCartBook } from "@/drizzle/cartQueries";
import { cn } from "@/lib/utils";
import { Book } from "@/types/type";
import { User } from "next-auth";
import { useState } from "react";

type AddBookToCartType = {
  userId: User["id"];
  bookId: Book["id"];
};

export default function AddBookToCart({ userId, bookId }: AddBookToCartType) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!userId || !bookId) return;

    setLoading(true);
    try {
      await updateCartBook(userId, bookId);
      console.log("Successfully added book to cart");
    } catch (error) {
      console.error("Failed to add book to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative ">
      <button
        className={cn(
          "py-1.5 px-4 bg-green-500 text-white text-sm font-semibold rounded transition duration-300",
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
        )}
        onClick={handleAddToCart}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
//TODO: GROUP
