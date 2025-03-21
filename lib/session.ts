import "server-only";
import { cookies } from "next/headers";
import { SessionPayload } from "@/types/type";
import { SignJWT, jwtVerify } from "jose";
import crypto from "crypto";

const SESSION_EXPIRATION_SECONDS = 365 * 24 * 60 * 60;
const secretKey = process.env.SESSION_SECRET;
const COOKIE_SESSION_KEY = "session-id";
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: number) {
  const sessionId = crypto.randomBytes(512).toString("hex").normalize();
  // const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  // const session = await encrypt({ userId, expiresAt });

  (await cookies()).set(COOKIE_SESSION_KEY, sessionId, {
    httpOnly: true,
    secure: true,
    expires: Date.now() + SESSION_EXPIRATION_SECONDS * 1000,
  });

  // return session;
}

export async function verifySession() {
  const cookie = (await cookies()).get(COOKIE_SESSION_KEY)?.value;
  const session = await decrypt(cookie);

  if (!session) return;

  return session;
}

export async function deleteSession() {
  (await cookies()).delete(COOKIE_SESSION_KEY);
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1min")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}
