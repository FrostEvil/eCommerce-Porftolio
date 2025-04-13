import { getBooksCount, getBooksWithPagination } from "@/drizzle/bookQueries";
import Pagination from "../navigation/Pagination";
import BookItem from "./BookItem";

export default async function AllBooksList({
  pageNumber,
}: {
  pageNumber: number;
}) {
  const booksPerPage = Number(process.env.BOOKS_PER_PAGE);

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
    <div className="col-span-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {currentPageBooks.map((book) => {
          return book ? <BookItem {...book} key={book.id} /> : "";
        })}
      </div>
      <Pagination {...paginationProps} />
    </div>
  );
}
