"use server";

import db from "@/lib/db";
import { User, UserSession } from "@/types/type";

export async function createUserSession(userId: User["id"], session: string) {
  const stmt = db.prepare(
    "INSERT INTO sessions (userId, session) VALUES(?,?) "
  );
  stmt.run(userId, session);
}

export async function getUserSessionId(session: string) {
  const stmt = db.prepare("SELECT * FROM sessions WHERE session  = ?");
  const result = stmt.get(session) as UserSession;
  return result;
}
