import { User } from "@/types/type";
import db from "./db";
import { hashUserPassword } from "./hash";

export function createUser(email: string, password: string) {
  const hashedPssword = hashUserPassword(password);
  const result = db
    .prepare("INSERT INTO users (email, password) VALUES (?,?)")
    .run(email, hashedPssword);

  return result.lastInsertRowid;
}

export function getUserByEmail(email: string) {
  const result = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as User | undefined;
  return result;
}
