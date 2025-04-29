import { getFeaturedBooks } from "@/actions/book-actions";
import FeaturedBookItem from "./FeaturedBookItem";

const TAKE: number = 4;

export default async function FeaturedBooks() {
  const books = await getFeaturedBooks(TAKE);

  if (!books || books.length === 0) {
    return (
      <div className="bg-white shadow-sm p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Trending Reads
        </h2>
        <p className="text-gray-600">
          No featured books available at the moment. Please check back later!
        </p>
      </div>
    );
  }

  return (
    <div className=" bg-white shadow-sm overflow-hidden">
      <h2 className=" pl-6 py-4 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-400 text-3xl font-bold text-gray-900 ">
        Trending Reads
      </h2>

      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6  overflow-hidden bg-white">
        {books.map((book) => {
          return <FeaturedBookItem book={book} key={book.id} />;
        })}
      </div>
    </div>
  );
}
