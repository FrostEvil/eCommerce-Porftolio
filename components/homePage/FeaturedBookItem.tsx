import { Book } from "@/types/type";
import Image from "next/image";
import Link from "next/link";
import RatingValue from "../RatingValue";

export default function FeaturedBookItem({ book }: { book: Book }) {
  return (
    <div className="p-6 flex flex-col h-full  items-center cursor-pointer transition-transform duration-200 hover:scale-[1.02]">
      <Link href={`/books/${book.id}`}>
        <div className="relative w-40 h-60">
          <Image
            src={book.coverImageUrl}
            alt={book.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Link>
      <div className="flex flex-col flex-grow w-full">
        <h3 className="w-full text-lg font-semibold mt-4 text-gray-800  whitespace-nowrap overflow-hidden text-ellipsis">
          {book.title}
        </h3>
        <p className="text-sm font-semibold mt-2 text-gray-600">
          {book.author}
        </p>
        <div className="mt-2 flex items-center text-yellow-400">
          <RatingValue value={book.rating} />
          <span className="text-gray-600 text-md ml-2">({book.rating})</span>
        </div>
        <p className="mt-3 font-bold text-lg">{book.price.toFixed(2)}$</p>
      </div>
    </div>
  );
}
