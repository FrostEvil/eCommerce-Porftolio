import db from "@/lib/db";
import { User } from "@/types/type";

export function createUserSession(userId: User["id"], session: string) {
  const stmt = db.prepare(
    "INSERT INTO sessions (userId, session) VALUES(?,?) "
  );
  stmt.run(userId, session);
}

export function getUserSessionId(session: string) {
  const stmt = db.prepare("SELECT * FROM sessions WHERE session  = ?");
  const result = stmt.get(session);
  return result;
}
