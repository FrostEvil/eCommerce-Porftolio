import { ManageUserCartBook, Book, CartBook, UserSession } from "@/types/type";
import db from "./db";

//Get seleceted book from cart db
export function getSelectedBook({
  id,
  userId,
}: {
  id: Book["id"];
  userId: UserSession["userId"];
}) {
  try {
    const stmt = db.prepare("SELECT * FROM cart WHERE id=? AND userId=?");
    const result = stmt.get(id, userId) as CartBook;
    return result;
  } catch (error) {
    console.error("Book does not exist on your cart:", error);
  }
}

//Add book to cart db
function addBookToDb({ book, userId }: ManageUserCartBook) {
  const insert = db.prepare(
    "INSERT INTO cart (userId, id,  quantity, endingPrice) VALUES (?,?,?,?)"
  );

  insert.run(userId, book.id, 1, book.price);
}

//Check if selected book exists in cart db, if not adding to db, otherwise update quantity and ending price
export function increaseCartBookQuantity({ book, userId }: ManageUserCartBook) {
  const cartBook = getSelectedBook({ id: book.id, userId });

  if (!cartBook) {
    addBookToDb({ book, userId });
    return;
  }

  const newQuantity: number = parseFloat((cartBook.quantity + 1).toFixed(2));
  const newEndingPrice: number = parseFloat(
    (book.price * newQuantity).toFixed(2)
  );

  const updateBookCart = db.prepare(
    "UPDATE cart SET quantity = ?, endingPrice = ? WHERE id = ? and userId = ?"
  );
  const result = updateBookCart.run(
    newQuantity,
    newEndingPrice,
    cartBook.id,
    userId
  );
  if (result) {
    console.log("Succesfully added!");
  }
}

// Update quantity and ending price, here we can assume that when we invoke this function selected book already exists in cart db
export function decreaseCartBookQuantity({ book, userId }: ManageUserCartBook) {
  const cartBook = getSelectedBook({ id: book.id, userId });
  if (!cartBook) return;
  const newQuantity: number = parseFloat((cartBook.quantity - 1).toFixed(2));
  const newEndingPrice: number = parseFloat(
    (book.price * newQuantity).toFixed(2)
  );

  const updateBookCart = db.prepare(
    "UPDATE cart SET quantity = ?, endingPrice = ? WHERE id = ? AND userId = ? "
  );
  updateBookCart.run(newQuantity, newEndingPrice, cartBook.id, userId);
}

//delete book from cart db
export function deleteFromCartBook(id: CartBook["id"]) {
  const stmt = db.prepare("DELETE FROM cart WHERE id = ?");
  stmt.run(id);
}

export function getAllCartBooks(userId: UserSession["userId"]) {
  const stmt = db.prepare("SELECT * FROM cart WHERE userId = ?");
  const cartBooks = stmt.all(userId);

  return cartBooks as CartBook[];
}
