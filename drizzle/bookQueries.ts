import "dotenv/config"; // Loads .env automatically
import fs from "fs";
import { db } from "./db";
import { BookTable } from "./schema";
import { Book, FiltersProps, SortDirection, SortOption } from "@/types/type";
import { and, asc, desc, eq, gte, lte, or, sql } from "drizzle-orm";

async function insertBooks() {
  // Read books from JSON file
  const books = JSON.parse(fs.readFileSync("books.json", "utf-8"));

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

export async function getFilteredBooks({
  minPrice,
  maxPrice,
  genre,
  rating,
  sort,
}: FiltersProps) {
  let conditions = [];
  let sortBy: SortOption;
  let sortDirection: SortDirection;
  let books;
  const sortData = sort?.split("-");

  if (minPrice !== undefined) {
    conditions.push(gte(BookTable.price, minPrice.toString()));
  }

  if (maxPrice !== undefined) {
    conditions.push(lte(BookTable.price, maxPrice.toString()));
  }

  if (genre !== undefined && genre !== "") {
    conditions.push(eq(BookTable.genre, genre));
  }

  if (rating !== undefined && rating.length > 0) {
    const ratingArr = [...rating];

    const ratingConditions = ratingArr.map((rate) => {
      const lower = Number(rate) === 1 ? 0.0 : Number(rate) - 0.5;
      const upper = Number(rate) === 5 ? 5.0 : Number(rate) + 0.5;

      return and(
        gte(BookTable.rating, lower.toString()),
        lte(BookTable.rating, upper.toString())
      );
    });
    conditions.push(or(...ratingConditions));
  }

  if (sortData !== undefined && sortData.length > 0) {
    sortBy = sortData[0] as SortOption;
    sortDirection = sortData[1] as SortDirection;
    books = await db
      .select()
      .from(BookTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(
        sortDirection === "asc"
          ? asc(BookTable[sortBy])
          : desc(BookTable[sortBy])
      );
  } else {
    books = await db
      .select()
      .from(BookTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined);
  }

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

export async function getFilteredBooksWithPagination(
  skip: number,
  take: number
) {
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
