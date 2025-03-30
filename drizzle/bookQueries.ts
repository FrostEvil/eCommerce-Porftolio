import "dotenv/config"; // Loads .env automatically
import fs from "fs";
import { db } from "./db";
import { BookTable, UserTable } from "./schema";
import { Book } from "@/types/type";
import { eq, sql } from "drizzle-orm";

// Read books from JSON file
const books = JSON.parse(fs.readFileSync("books.json", "utf-8"));
async function insertBooks() {
  try {
    await db.insert(BookTable).values(books);
  } catch (error) {
    console.error("❌ Error inserting books:", error);
  }
}

// insertBooks();

export async function getAllBooks(): Promise<Book[]> {
  const books = await db.select().from(BookTable);

  const updatedBooks = books.map((book) => ({
    ...book,
    price: parseFloat(book.price),
    rating: parseFloat(book.rating),
  }));
  return updatedBooks;
}

export async function getBooksCount() {
  const countResult = await db
    .select({ count: sql<number>`COUNT(*)` })
    .from(BookTable);

  return countResult[0].count;
}

export async function getBooksWithPagination(skip: number, take: number) {
  const books = await db.select().from(BookTable).offset(skip).limit(take);

  const updatedBooks = books.map((book) => ({
    ...book,
    price: parseFloat(book.price),
    rating: parseFloat(book.rating),
  }));
  return updatedBooks;
}

export async function getBookById(id: Book["id"]) {
  const book = await db.query.BookTable.findFirst({
    where: eq(BookTable.id, id),
  });

  if (!book) return;

  const updatedBook = {
    ...book,
    price: parseFloat(book.price),
    rating: parseFloat(book.rating),
  };

  return updatedBook;
}
