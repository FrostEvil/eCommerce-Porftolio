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
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleIncreaseCartBookAmount = async () => {
    await increaseCartBookAmount(userId, bookId, amount);
    if (amount === 10) {
      toast({
        description:
          "You’ve reached the limit! You can only add up to 10 copies of this book.",
      });
    }
  };

  const handleDecreaseCartBookAmount = async () => {
    await decreaseCartBookAmount(userId, bookId, amount);
    if (amount === 1) handleRemoveBookFromCart();
  };

  const handleRemoveBookFromCart = async () => {
    await removeBookFromCart(userId, bookId);
  };

  return (
    <div className="flex items-end  flex-col h-full ">
      <div className="border border-gray-300 flex  items-center justify-center ">
        <button
          onClick={handleDecreaseCartBookAmount}
          className={cn(
            "px-2 py-1 tranistion-all duration-150",
            amount === 1 ? "" : "hover:bg-gray-100 active:bg-gray-200"
          )}
        >
          {amount === 1 ? (
            <FaTrashCan className="text-gray-600 hover:text-red-500  text-sm lg:text-base" />
          ) : (
            <FaMinus className="text-sm lg:text-base" />
          )}
        </button>
        <p className="border-x px-3 text-sm lg:text-base ">{amount}</p>
        <button
          onClick={handleIncreaseCartBookAmount}
          className={cn(
            "px-2 py-1 transition-all duration-150",
            amount === MAX_AMOUNT
              ? "bg-gray-200"
              : "hover:bg-gray-100 active:bg-gray-200"
          )}
        >
          <FaPlus className="text-sm lg:text-base" />
        </button>
      </div>

      <p className="text-base md:text-lg lg:text-xl  mt-4 flex-1">
        {(price * amount).toFixed(2)}$
      </p>
      <button onClick={handleRemoveBookFromCart} className="text-end">
        <FaTrashCan className=" text-gray-600 text-base md:text-xl lg:text-2xl hover:text-red-500 duration-300" />
      </button>
    </div>
  );
}
