import {
  addBookCart,
  deleteCartBook,
  subBookCart,
} from "@/actions/cart-actions";
import { UseCartManagementType } from "@/types/type";
import { useState } from "react";

export default function useCartManagement({
  cartBook,
  book,
  userId,
}: UseCartManagementType) {
  if (!cartBook) {
    const handleAddCartBook = () => {
      addBookCart({ book, userId });
    };
    return { handleAddCartBook };
  }

  const [currentQuantity, setCurrentQuantity] = useState(cartBook.quantity);
  const [currentPrice, setCurrentPrice] = useState(cartBook.endingPrice);

  const handleIncrease = () => {
    if (currentQuantity < book.stockQuantity) {
      setCurrentQuantity((prev) => prev + 1);
      setCurrentPrice((prev) => prev + book.price);
      addBookCart({ book, userId });
    }
  };

  const handleDecrease = () => {
    if (currentQuantity > 1) {
      setCurrentQuantity((prev) => prev - 1);
      setCurrentPrice((prev) => prev - book.price);
      subBookCart({ book, userId });
    }
  };

  const handleDelete = () => {
    deleteCartBook(cartBook.id);
  };

  return {
    currentPrice,
    currentQuantity,
    handleIncrease,
    handleDecrease,
    handleDelete,
  };
}
