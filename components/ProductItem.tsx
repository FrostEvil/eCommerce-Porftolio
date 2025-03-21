import { verifySession } from "@/lib/session";
import { Book } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { verifyUserData } from "@/lib/users";

export default async function ProductItem(book: Book) {
  // const verifyUser = await verifySession();
  // const userId = await userSessionId();
  // const cartBook = await getSelectedCartBook(book.id, userId);
  const { verifyUser, userId, cartBook } = await verifyUserData(book.id);
  const cartProps = { book, userId, cartBook };
  return (
    <div className=" rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col">
      {/* Book Image */}
      <div className="relative w-full h-64">
        <Image
          src={book.coverImageUrl}
          alt={book.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      {/* Book Details */}
      <div className="flex-grow p-4">
        <h2 className="font-bold text-xl text-gray-800 mb-2">{book.title}</h2>
        <p className="text-gray-700 text-sm mb-1">
          <span className="font-semibold">Author:</span> {book.author}
        </p>
        <p className="text-gray-700 text-sm mb-2">
          <span className="font-semibold">Genre:</span> {book.genre}
        </p>
        {/* Rating Display */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          {"★".repeat(Math.round(book.rating))}
          {"☆".repeat(5 - Math.round(book.rating))}
          <span className="text-gray-600 text-xs ml-1">({book.rating})</span>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-gray-100 py-3 px-4 relative">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-green-600">${book.price}</p>
          <span className="text-xs text-gray-500">
            Stock: {book.stockQuantity}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <Link
            href={`/products/${book.id}`}
            className="bg-blue-500 text-white text-sm font-semibold py-1.5 px-4 rounded hover:bg-blue-600 transition-all duration-300"
          >
            See More →
          </Link>
          {verifyUser && <AddToCartButton cartProps={cartProps} />}
        </div>
      </div>
    </div>
  );
}
