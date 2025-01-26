import { subBookCart } from "@/actions/cart-actions";
import { CartBook } from "@/types/type";
import Image from "next/image";
import { FaPlus, FaMinus, FaTrashCan } from "react-icons/fa6";

export default function CartItem(book: CartBook) {
  const { coverImageUrl, title, author, genre, endingPrice, quantity } = book;
  return (
    <div className="grid grid-cols-5 gap-6 h-max p-8">
      <div className=" relative w-full  overflow-hidden shadow-lg">
        <Image src={coverImageUrl} alt="" objectFit="cover" layout="fill" />
      </div>
      <div className="pb-8 col-span-3 space-y-1 ">
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        <p className="text-base font-semibold text-gray-800">{author}</p>
        <p className="text-sm  text-gray-600">{genre}</p>
        <p className="pt-2 text-sm  text-gray-800">
          Estimated shipping in 1 business day.
        </p>
      </div>
      <div className="flex items-end justify-around flex-col">
        <div className="border border-gray-300 flex items-center justify-center ">
          <button
            onClick={() => subBookCart(book)}
            className=" px-2 py-1 hover:bg-gray-100 active:bg-gray-200 transition-all duration-150"
          >
            <FaMinus />
          </button>
          <p className="border-x px-3 ">{quantity}</p>
          <button className=" px-2 py-1 hover:bg-gray-100 active:bg-gray-200 transition-all duration-150">
            <FaPlus />
          </button>
        </div>
        <p className="text-xl flex-grow mt-4">{endingPrice}$</p>
        <button className="mb-4">
          <FaTrashCan className="text-gray-600 text-2xl hover:text-gray-900 duration-300" />
        </button>
      </div>
    </div>
  );
}
