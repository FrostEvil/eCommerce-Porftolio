import BookItem from "@/components/books/BookItem";
import Pagination from "@/components/navigation/Pagination";
import { getBooksCount, getBooksWithPagination } from "@/drizzle/bookQueries";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const booksPerPage = Number(process.env.BOOKS_PER_PAGE);
  const pageNumber = Number((await searchParams).page);
  const booksToSkip = (pageNumber - 1) * booksPerPage;
  const currentPageBooks = await getBooksWithPagination(
    booksToSkip,
    booksPerPage
  );
  const booksAmout: number = await getBooksCount();

  const paginationProps = {
    page: pageNumber,
    totalPages: Math.ceil(booksAmout / booksPerPage),
    hasNextPage: currentPageBooks.length === booksPerPage ? true : false,
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {currentPageBooks.map((book) => {
          return book ? <BookItem {...book} key={book.id} /> : "";
        })}
      </div>
      <Pagination {...paginationProps} />
    </main>
  );
}
