import { auth } from "@/lib/auth";
import { Book } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import AddBookToCart from "./AddBookToCart";
import RatingValue from "../RatingValue";

export default async function BookItem(book: Book) {
  const session = await auth();
  return (
    <div className="rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col w-full">
      {/* Book Image */}
      <div className="relative w-full h-52 lg:h-56 xl:h-64">
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
        <h2 className="font-bold whitespace-nowrap overflow-hidden text-ellipsis text-base lg:text-lg xl:text-xl text-gray-800 lg:mb-1 xl:mb-2">
          {book.title}
        </h2>
        <p className="text-gray-700 text-sm mb-1">
          <span className="font-semibold">Author:</span> {book.author}
        </p>
        <p className="text-gray-700 text-sm mb-2">
          <span className="font-semibold">Genre:</span> {book.genre}
        </p>
        {/* Rating Display */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <RatingValue value={book.rating} />
          <span className="text-gray-600 text-xs ml-1">({book.rating})</span>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-gray-100 py-2 xl:py-3 px-4 relative flex flex-col items-center sm:items-start ">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-extrabold text-green-600">
            ${book.price}
          </p>
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-y-2 justify-between items-center mt-4 md:mt-6 mb-2 lg:gap-x-2">
          <Link
            href={`/books/${book.id}`}
            className=" max-w-[140px] md:max-w-[100px] lg:max-w-full w-full bg-blue-500 text-white text-sm font-semibold py-1.5 px-4 rounded hover:bg-blue-600 transition-all duration-300 text-center"
          >
            See More →
          </Link>
          {session && (
            <AddBookToCart bookId={book.id} userId={session.user.id} />
          )}
        </div>
      </div>
    </div>
  );
}
