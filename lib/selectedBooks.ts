import { getSelectedBooks, getTotalBooksCount } from "./books";

export default function selectedBooks(pageNumber: number) {
  const take: number = Number(process.env.PAGE_SIZE);
  const skip: number = (pageNumber - 1) * take;

  const selectedBooks = getSelectedBooks({ take, skip });
  const totalBooks = getTotalBooksCount();

  return {
    books: selectedBooks,
    metadata: {
      hasNextPage: skip + take < totalBooks,
      totalPage: Math.ceil(totalBooks / take),
    },
  };
}
