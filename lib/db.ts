import sql from "better-sqlite3";
import books from "../utils/books";
const db = sql("myDatabase.db");

//Users
db.prepare(
  `CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, email TEXT UNIQUE, password TEXT)`
).run();

//Books

function initDb() {
  db.prepare(
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY, title TEXT UNIQUE, author TEXT, genre TEXT, price NUMBER, language TEXT, yearPublished NUMBER, rating NUMBER, stockQuantity NUMBER, coverImageUrl TEXT, description TEXT)"
  ).run();

  const { rows } = db.prepare("SELECT COUNT(*) as rows FROM books").get() as {
    rows: number;
  };

  if (rows === 0) {
    const insert = db.prepare(
      "INSERT INTO books (id, title, author, genre, price, language, yearPublished, rating, stockQuantity, coverImageUrl, description) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
    );

    books.forEach((book) => {
      insert.run(
        book.id,
        book.title,
        book.author,
        book.genre,
        book.price,
        book.language,
        book.yearPublished,
        book.rating,
        book.stockQuantity,
        book.coverImageUrl,
        book.description
      );
    });
  }
}

initDb();

export default db;
