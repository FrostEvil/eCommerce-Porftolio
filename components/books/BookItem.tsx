import { auth } from "@/lib/auth";
import { Book } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import AddBookToCart from "./AddBookToCart";
import RatingValue from "../RatingValue";
import { FaLongArrowAltRight } from "react-icons/fa";

export default async function BookItem(book: Book) {
  const session = await auth();
  return (
    <div className="rounded-lg shadow-md bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col w-full">
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
      <div className="group relative flex-grow p-4">
        <h2 className="font-bold whitespace-nowrap overflow-hidden text-ellipsis text-base lg:text-lg xl:text-xl text-gray-800 lg:mb-1 xl:mb-2">
          {book.title}
        </h2>
        <div className="absolute z-10 left-0 bottom-full mb-1 w-max max-w-xs bg-gray-800 text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {book.title}
        </div>
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
      <div className="bg-sky-50 py-2 xl:py-3 px-4 relative flex flex-col flex-wrap gap-2 items-center sm:items-start ">
        <div className="flex items-center justify-between">
          <p className=" text-xl inline-block text-blue-800 bg-blue-100 px-3 py-1 rounded-full font-semibold">
            ${book.price}
          </p>
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-y-2 gap-x-2 justify-between items-center mt-4 md:mt-6 mb-2 lg:gap-x-2">
          <Link
            href={`/books/${book.id}`}
            className="  w-full bg-blue-500 text-white text-sm font-semibold py-1.5 px-4 rounded hover:bg-blue-600 transition-all duration-300 text-center"
          >
            <div className="flex items-center justify-center gap-x-2">
              <p>See More </p>
              <FaLongArrowAltRight />
            </div>
          </Link>
          {session && (
            <AddBookToCart bookId={book.id} userId={session.user.id} />
          )}
        </div>
      </div>
    </div>
  );
}
