import { Book } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import RatingValue from "../RatingValue";

export default function FeaturedBookItem({ book }: { book: Book }) {
  return (
    <div className="group p-4  h-full bg-white rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:bg-slate-50">
      <Link href={`/books/${book.id}`} className="w-full flex justify-center">
        <div className="relative w-40 aspect-[2/3] rounded-md overflow-hidden">
          <Image
            src={book.coverImageUrl}
            alt={book.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="relative flex flex-col flex-grow w-full mt-4 ml-4 ">
        <h3 className="text-base font-semibold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
          {book.title}
        </h3>
        <div className="absolute left-0 bottom-full mb-1 hidden group-hover:block bg-white text-sm text-gray-900 p-2 shadow-md rounded w-max max-w-xs z-10">
          {book.title}
        </div>
        <p className="text-sm text-gray-600 mt-1">{book.author}</p>
        <div className="mt-2 flexitems-center text-yellow-400">
          <RatingValue value={book.rating} />
          <span className="text-gray-600 text-sm ml-2">({book.rating})</span>
        </div>
        <p className="mt-3 font-bold text-lg text-gray-900">
          {book.price.toFixed(2)}$
        </p>
      </div>
    </div>
  );
}
