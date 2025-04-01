import { getFeaturedBooks } from "@/actions/book-actions";
import FeaturedBookItem from "./FeaturedBookItem";

const TAKE: number = 4;

export default async function FeaturedBooks() {
  const books = await getFeaturedBooks(TAKE);
  if (!books) return;

  const FeaturedBooksItems = books.map((book) => {
    return <FeaturedBookItem book={book} key={book.id} />;
  });

  return (
    <div>
      <div className=" mx-auto py-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Trending Reads
        </h2>
        <div className="bg-white">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white">
              {FeaturedBooksItems}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
