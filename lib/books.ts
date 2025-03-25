// import { Book } from "@/types/type";
// import db from "./db";

// type SelectedBooksType = {
//   take: number;
//   skip: number;
// };

// export function getAllBooks() {
//   const books = db.prepare("SELECT * FROM books").all();
//   return books as Book[];
// }

// export function getSelectedBooks({ take, skip }: SelectedBooksType) {
//   const startingId = skip + 1;
//   const stmt = db.prepare("SELECT * FROM books WHERE id = ?");
//   let selectedBook: Book[] = [];
//   for (let i = startingId; i < take + startingId; i++) {
//     selectedBook.push(stmt.get(i) as Book);
//   }
//   return selectedBook;
// }

// export function getSingleBook(bookId: Book["id"]) {
//   const stmt = db.prepare("SELECT * FROM books WHERE id = ?");
//   const selectedBook = stmt.get(bookId);
//   return selectedBook as Book;
// }

// export function getTotalBooksCount() {
//   const { total } = db.prepare("SELECT COUNT(*) as total FROM books").get() as {
//     total: number;
//   };
//   return total;
// }
