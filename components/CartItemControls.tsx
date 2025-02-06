"use client";

import { FaPlus, FaMinus, FaTrashCan } from "react-icons/fa6";
import { UseCartManagementType } from "@/types/type";
import useCartManagement from "@/hooks/useCartManagement";
import { cn } from "@/lib/utils";

export default function CartItemControls({
  cartItemProps,
}: {
  cartItemProps: UseCartManagementType;
}) {
  const { book, cartBook } = cartItemProps;
  if (!cartBook) return;

  const {
    currentPrice,
    currentQuantity,
    handleIncrease,
    handleDecrease,
    handleDelete,
  } = useCartManagement(cartItemProps);

  return (
    <div className="flex items-end justify-around flex-col">
      <div className="border border-gray-300 flex items-center justify-center ">
        <button
          disabled={currentQuantity === 1 ? true : false}
          onClick={handleDecrease}
          className={cn(
            "px-2 py-1 tranistion-all duration-150",
            currentQuantity === 1 ? "" : "hover:bg-gray-100 active:bg-gray-200"
          )}
        >
          <FaMinus />
        </button>
        <p className="border-x px-3 ">{currentQuantity}</p>
        <button
          disabled={currentQuantity === book.stockQuantity ? true : false}
          onClick={handleIncrease}
          className={cn(
            "px-2 py-1 transition-all duration-150",
            currentQuantity === book.stockQuantity
              ? ""
              : "hover:bg-gray-100 active:bg-gray-200"
          )}
        >
          <FaPlus />
        </button>
      </div>
      <p className="mt-2 text-gray-500 text-sm">
        In stock: {book.stockQuantity}
      </p>
      <p className="text-xl flex-grow mt-4">{currentPrice!.toFixed(2)}$</p>
      <button onClick={handleDelete} className="mb-4">
        <FaTrashCan className="text-gray-600 text-2xl hover:text-gray-900 duration-300" />
      </button>
    </div>
  );
}
