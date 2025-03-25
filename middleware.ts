import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { AUTH_ROUTES, LOGIN, PROTECTED_ROUTES, ROOT } from "./lib/routes";

const { auth } = NextAuth(authConfig);

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  // Exclude NextAuth API routes to prevent auth errors
  if (nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const session = await auth();
  const isAuthenticated = !!session?.user;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    nextUrl.pathname.startsWith(route)
  );

  if (!isAuthenticated && isProtectedRoute)
    return NextResponse.redirect(new URL(LOGIN, nextUrl));

  if (isAuthenticated && isAuthRoute)
    return NextResponse.redirect(new URL(ROOT, nextUrl));

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|.*\\..*|api/auth).*)", "/", "/(api|trpc)(.*)"],
};
