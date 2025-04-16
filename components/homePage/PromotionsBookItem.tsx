import { Book } from "@/types/type";
import Image from "next/image";
import Link from "next/link";

const DISCOUNT = 0.2;

export default function PromotionsBookItem({ book }: { book: Book }) {
  return (
    <div className="group relative p-6 flex flex-col h-full items-center bg-white shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200 cursor-pointer">
      <div className="absolute top-5 left-[-24px] bg-yellow-300 text-black text-base font-bold px-4 py-1 transform -rotate-45 shadow-lg border border-gray-700">
        -20% OFF
      </div>
      <Link href={`/books/${book.id}`}>
        <Image
          src={book.coverImageUrl}
          alt={book.title}
          width={150}
          height={225}
          className="transition-transform duration-200 hover:scale-[1.02]"
        />
      </Link>
      <div className="relative flex flex-col flex-grow w-full">
        <h3 className="w-full text-base font-semibold mt-4 text-gray-800 hover:text-red-500 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
          {book.title}
        </h3>
        <div className="absolute left-0 bottom-full mb-1 hidden group-hover:block bg-white text-sm text-gray-900 p-2 shadow-md rounded w-max max-w-xs z-10">
          {book.title}
        </div>
        <p className="text-sm font-semibold mt-2 text-gray-500">
          {book.author}
        </p>

        <p className=" mt-2 font-bold text-2xl text-red-600">
          {(book.price * (1 - DISCOUNT)).toFixed(2)}$
        </p>
        <div className="mt-2 flex items-center gap-2">
          <p className="line-through text-gray-500 text-sm">
            {book.price.toFixed(2)}$
          </p>
          <p className="text-sm text-red-400">(-{DISCOUNT * 100}%)</p>
        </div>
      </div>
    </div>
  );
}
