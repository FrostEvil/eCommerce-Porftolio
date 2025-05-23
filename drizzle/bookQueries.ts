import "dotenv/config"; // Loads .env automatically
import fs from "fs";
import { db } from "./db";
import { BookTable } from "./schema";
import { Book, FiltersProps, SortDirection, SortOption } from "@/types/type";
import { and, asc, desc, eq, gte, lte, ne, or, sql } from "drizzle-orm";
import { normalizeBookFields } from "@/utils/normalizeBookFields";

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
  onSale,
  sort,
}: FiltersProps) {
  let conditions = [];
  let sortBy: SortOption;
  let sortDirection: SortDirection;
  let books;
  const sortData = sort?.split("-");

  if (minPrice !== undefined) {
    conditions.push(
      sql`${BookTable.price} * (1 - ${BookTable.discount} / 100.0) >= ${minPrice}`
    );
  }

  if (maxPrice !== undefined) {
    conditions.push(
      sql`${BookTable.price} * (1- ${BookTable.discount} / 100.0) <= ${maxPrice}`
    );
  }
  if (genre !== undefined && genre !== "") {
    conditions.push(eq(BookTable.genre, genre));
  }

  if (onSale) {
    conditions.push(ne(BookTable.discount, 0));
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
    const priceWithDisount = sql`${BookTable.price} * (1 - ${BookTable.discount} / 100.0)`;

    books = await db
      .select()
      .from(BookTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(
        sortDirection === "asc"
          ? sortBy === "price"
            ? asc(priceWithDisount)
            : asc(BookTable[sortBy])
          : sortBy === "price"
          ? desc(priceWithDisount)
          : desc(BookTable[sortBy])
      );
  } else {
    books = await db
      .select()
      .from(BookTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined);
  }

  return normalizeBookFields(books);
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

  return normalizeBookFields(books);
}

export async function getBookById(id: Book["id"]) {
  const book = await db.query.BookTable.findFirst({
    where: eq(BookTable.id, id),
  });

  if (!book) return;

  return normalizeBookFields(book);
}
