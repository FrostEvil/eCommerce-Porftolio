import { getUserSessionId } from "@/actions/session-actions";
import { cookies } from "next/headers";

export default async function userSessionId() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value!;
  const userSession = await getUserSessionId(session);
  return userSession;
}
