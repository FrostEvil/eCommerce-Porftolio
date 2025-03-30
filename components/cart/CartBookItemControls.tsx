"use client";

import { FaPlus, FaMinus, FaTrashCan } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { User } from "next-auth";
import { Book, CartBook } from "@/types/type";
import {
  decreaseCartBookAmount,
  increaseCartBookAmount,
  removeBookFromCart,
} from "@/actions/cart-actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

type PropsType = {
  userId: User["id"];
  bookId: Book["id"];
  amount: CartBook["amount"];
  price: CartBook["price"];
};

const MAX_AMOUNT = 10;

export default function CartBookItemControls({
  userId,
  bookId,
  amount,
  price,
}: PropsType) {
  const router = useRouter();
  const handleIncreaseCartBookAmount = async () => {
    await increaseCartBookAmount(userId, bookId, amount);
  };

  const handleDecreaseCartBookAmount = async () => {
    await decreaseCartBookAmount(userId, bookId, amount);
  };

  const handleRemoveBookFromCart = async () => {
    await removeBookFromCart(userId, bookId);
  };

  return (
    <div className="flex items-end justify-around flex-col">
      <div className="border border-gray-300 flex items-center justify-center ">
        <button
          disabled={amount === 1 ? true : false}
          onClick={handleDecreaseCartBookAmount}
          className={cn(
            "px-2 py-1 tranistion-all duration-150",
            amount === 1 ? "" : "hover:bg-gray-100 active:bg-gray-200"
          )}
        >
          <FaMinus />
        </button>
        <p className="border-x px-3 ">{amount}</p>
        <button
          disabled={amount === MAX_AMOUNT ? true : false}
          onClick={handleIncreaseCartBookAmount}
          className={cn(
            "px-2 py-1 transition-all duration-150",
            amount === MAX_AMOUNT ? "" : "hover:bg-gray-100 active:bg-gray-200"
          )}
        >
          <FaPlus />
        </button>
      </div>

      <p className="text-xl flex-grow mt-4">{(price * amount).toFixed(2)}$</p>
      <button onClick={handleRemoveBookFromCart} className="mb-4">
        <FaTrashCan className="text-gray-600 text-2xl hover:text-gray-900 duration-300" />
      </button>
    </div>
  );
}
