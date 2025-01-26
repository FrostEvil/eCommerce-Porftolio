import { Book, CartBook } from "@/types/type";
import db from "./db";

function getSelectedBook(id: CartBook["id"]) {
  const stmt = db.prepare("SELECT * FROM cart WHERE id=?");
  const result = stmt.get(id);
  return result;
}

function addBookToDb(book: Book) {
  const insert = db.prepare(
    "INSERT INTO cart (id, title, author, genre, price, stockQuantity, coverImageUrl, quantity, endingPrice) VALUES (?,?,?,?,?,?,?,?,?)"
  );

  insert.run(
    book.id,
    book.title,
    book.author,
    book.genre,
    book.price,
    book.stockQuantity,
    book.coverImageUrl,
    1,
    book.price
  );
}

export function increaseCartBookQuantity(book: Book) {
  const cartBook = getSelectedBook(book.id) as CartBook;

  if (!cartBook) {
    addBookToDb(book);
    return;
  }

  const newQuantity: number = cartBook.quantity + 1;
  const newEndingPrice: number = cartBook.price * newQuantity;

  const updateBookCart = db.prepare(
    "UPDATE cart SET quantity = ?, endingPrice = ? WHERE id = ? "
  );
  updateBookCart.run(newQuantity, newEndingPrice, cartBook.id);
}

export function decreaseCartBookQuantity(book: Book) {
  const cartBook = getSelectedBook(book.id) as CartBook;

  if (!cartBook) {
    addBookToDb(book);
    return;
  }

  const newQuantity: number = cartBook.quantity - 1;
  const newEndingPrice: number = cartBook.price * newQuantity;

  const updateBookCart = db.prepare(
    "UPDATE cart SET quantity = ?, endingPrice = ? WHERE id = ? "
  );
  updateBookCart.run(newQuantity, newEndingPrice, cartBook.id);
}

export function getAllCartBooks() {
  const cartBooks = db.prepare("SELECT * FROM cart").all();
  return cartBooks as CartBook[];
}
