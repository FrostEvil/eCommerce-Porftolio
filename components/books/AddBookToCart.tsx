"use client";

import { updateCartBook } from "@/drizzle/cartQueries";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const isUpdated = await updateCartBook(userId, bookId);
      if (isUpdated) {
        toast({
          description: "Book added to cart!",
        });
      }
    } catch (error) {
      console.error("Failed to add book to cart:", error);
      toast({
        variant: "destructive",
        description: "Failed to add book.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full flex justify-center sm:justify-end ">
      <button
        className={cn(
          " w-full py-1.5 px-4 bg-yellow-400 text-black text-sm font-semibold rounded transition duration-300 text-center",
          loading ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-500"
        )}
        onClick={handleAddToCart}
        disabled={loading}
      >
        Add to Cart
      </button>
    </div>
  );
}
