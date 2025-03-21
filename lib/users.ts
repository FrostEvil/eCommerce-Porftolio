import { Book, User } from "@/types/type";
import db from "./db";
import { hashUserPassword } from "./passwordHasher";
import { verifySession } from "./session";
import userSessionId from "./userSessionId";
import { getSelectedCartBook } from "@/actions/cart-actions";

export function createUser(email: string, password: string) {
  try {
    const hashedPssword = hashUserPassword(password);
    const stmt = db.prepare("INSERT INTO users (email, password) VALUES (?,?)");
    const result = stmt.run(email, hashedPssword);

    return result.lastInsertRowid;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

export function getUserByEmail(email: string) {
  const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
  const result = stmt.get(email) as User | undefined;

  return result;
}

export async function verifyUserData(id: Book["id"]) {
  const verifyUser = await verifySession();
  const userId = await userSessionId();
  const cartBook = await getSelectedCartBook(id, userId);
  return {
    verifyUser,
    userId,
    cartBook,
  };
}
