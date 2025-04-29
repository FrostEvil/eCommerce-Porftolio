import { Book } from "@/types/type";

type PaginatedBooksParams = {
  pageNumber: number;
  pageSize: number;
  books: Book | Book[] | undefined;
};

type PaginatedBooksResult = {
  booksAmount: number;
  paginatedBooks: Book | Book[];
};

export function getPaginatedBooks({
  pageNumber,
  pageSize,
  books,
}: PaginatedBooksParams): PaginatedBooksResult {
  if (books === undefined) {
    return {
      booksAmount: 0,
      paginatedBooks: [],
    };
  }

  if (Array.isArray(books)) {
    const booksToSkip = (pageNumber - 1) * pageSize;
    const booksAmount = books.length;
    const paginatedBooks = books.slice(booksToSkip, booksToSkip + pageSize);

    return {
      booksAmount,
      paginatedBooks,
    };
  }

  return {
    booksAmount: 1,
    paginatedBooks: books,
  };
}
