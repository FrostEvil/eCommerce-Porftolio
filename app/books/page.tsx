import BookFilterPanel from "@/components/books/BookFilterPanel";
import BookItem from "@/components/books/BookItem";
import BookSortingPanel from "@/components/books/BookSortingPanel";
import Pagination from "@/components/navigation/Pagination";
import { getFilteredBooks } from "@/drizzle/bookQueries";
import { BookGenre } from "@/types/type";
import { filterQuery } from "@/utils/buildFilterQuery";
import { getPaginatedBooks } from "@/utils/getPaginatedBooks";

const PAGE_SIZE = 6;

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawParams = await searchParams;
  const page = rawParams.page ? Number(rawParams.page) : 1;
  const minPrice = rawParams.minPrice ? Number(rawParams.minPrice) : undefined;
  const maxPrice = rawParams.maxPrice ? Number(rawParams.maxPrice) : undefined;
  const genre =
    typeof rawParams.genre === "string" ? (rawParams.genre as BookGenre) : "";

  const rating = Array.isArray(rawParams.rating)
    ? rawParams.rating.map(Number)
    : rawParams.rating
    ? [Number(rawParams.rating)]
    : undefined;

  const sort = typeof rawParams.sort === "string" ? rawParams.sort : undefined;

  const filteredBooks = await getFilteredBooks({
    minPrice,
    maxPrice,
    genre,
    rating,
    sort,
  });

  const { paginatedBooks, booksAmount } = getPaginatedBooks({
    pageNumber: page,
    pageSize: PAGE_SIZE,
    books: filteredBooks,
  });

  const paginationProps = {
    pageNumber: page,
    totalPages: Math.ceil(booksAmount / PAGE_SIZE),
    hasNextPage: paginatedBooks.length === PAGE_SIZE ? true : false,
    queryRoute: filterQuery({ minPrice, maxPrice, genre, rating, sort }),
  };

  return (
    <main className="container">
      <div className="text-center my-12">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Discover Your Next <span className="text-blue-500">Great Read!</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Dive into our curated collection of books across all genres and
          styles.
        </p>
      </div>
      <div className=" px-12 grid grid-cols-2 gap-x-4">
        <button className="h-10 px-3 py-2 text-sm border border-neutral-200 bg-white">
          Filters
        </button>
        <BookSortingPanel sort={sort} />
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-4 mt-4 gap-2 md:gap-4 lg:gap-6">
        <div className="hidden md:block">
          <BookFilterPanel
            queryMinPrice={minPrice}
            queryMaxPrice={maxPrice}
            queryGenre={genre}
            queryCheckedRatings={rating}
            sort={sort}
          />
        </div>

        <div className="col-span-3 lg:col-span-3">
          <div className="px-12 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8 ">
            {paginatedBooks.map((book) => {
              return book ? <BookItem {...book} key={book.id} /> : "";
            })}
          </div>
          {booksAmount <= PAGE_SIZE ? (
            <div className="mt-16"></div>
          ) : (
            <Pagination {...paginationProps} />
          )}
        </div>
      </div>
    </main>
  );
}
