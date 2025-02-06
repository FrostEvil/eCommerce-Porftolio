import { getSelectedBook } from "@/actions/book-actions";
import { CartBook } from "@/types/type";
import Image from "next/image";
import CartItemControls from "./CartItemControls";
import userSessionId from "@/lib/userSessionId";

export default async function CartItem(cartBook: CartBook) {
  const book = await getSelectedBook(cartBook.id);
  const userId = await userSessionId();
  const cartItemProps = { cartBook, book, userId };
  return (
    <div className="grid grid-cols-5 gap-6 h-max p-8">
      <div className=" relative w-full  overflow-hidden shadow-lg">
        <Image
          src={book.coverImageUrl}
          alt=""
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="pb-8 col-span-3 space-y-1 ">
        <p className="text-lg font-semibold text-gray-800">{book.title}</p>
        <p className="text-base font-semibold text-gray-800">{book.author}</p>
        <p className="text-sm  text-gray-600">{book.genre}</p>
        <p className="pt-2 text-sm  text-gray-800">
          Estimated shipping in 1 business day.
        </p>
      </div>
      <CartItemControls cartItemProps={cartItemProps} />
    </div>
  );
}
