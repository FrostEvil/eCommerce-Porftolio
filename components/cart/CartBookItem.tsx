import Image from "next/image";
import { CartBook } from "@/types/type";
import CartBookItemControls from "./CartBookItemControls";

export default async function CartBookItem({
  cartBook,
}: {
  cartBook: CartBook;
}) {
  return (
    <div className="grid grid-cols-5 gap-6 h-max p-8">
      <div className=" relative w-full  overflow-hidden shadow-lg">
        <Image
          src={cartBook.coverImageUrl}
          alt=""
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="pb-8 col-span-3 space-y-1 ">
        <p className="text-lg font-semibold text-gray-800">{cartBook.title}</p>
        <p className="text-base font-semibold text-gray-800">
          {cartBook.author}
        </p>
        <p className="text-sm  text-gray-600">{cartBook.genre}</p>
      </div>
      <CartBookItemControls
        userId={cartBook.userId}
        bookId={cartBook.bookId}
        amount={cartBook.amount}
        price={cartBook.price}
      />
    </div>
  );
}
