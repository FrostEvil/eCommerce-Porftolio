import { Book } from "@/types/type";

type NormalizeBookFieldsProps = Omit<Book, "price" | "rating"> & {
  price: string;
  rating: string;
};

type NormalizeBookFields = Book | Book[] | undefined;

export function normalizeBookFields(
  books: NormalizeBookFieldsProps[] | NormalizeBookFieldsProps
): NormalizeBookFields {
  if (!books) return undefined;
  if (Array.isArray(books)) {
    return books.map((book) => ({
      ...book,
      price: parseFloat(book.price),
      rating: parseFloat(book.rating),
    }));
  }
  return {
    ...books,
    price: parseFloat(books.price),
    rating: parseFloat(books.rating),
  };
}
