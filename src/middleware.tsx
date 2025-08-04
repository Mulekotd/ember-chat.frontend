import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Tokens } from "@/lib/tokens";

import { isTokenExpired } from "@/lib/crypto";

const guestRoutes = ["/", "/login", "/register", "/forgot-password"];
const protectedRoutes = ["/chat"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(Tokens.JWT_TOKEN)?.value;
  const { pathname } = request.nextUrl;

  const isGuestRoute = guestRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isTokenValid = token ? !isTokenExpired(token) : false;

  // Scenario 1: User is NOT logged in or token is expired and tries to access a protected route
  if (isProtectedRoute && (!token || !isTokenValid)) {
    const response = NextResponse.redirect(new URL("/login", request.url));

    if (!isTokenValid) {
      response.cookies.delete(Tokens.JWT_TOKEN);
    }

    return response;
  }

  // Scenario 2: User IS logged in with valid token and accesses a guest route
  if (isGuestRoute && isTokenValid) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // Allow access if none of the above conditions are met
  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/", "/login", "/register", "/forgot-password"],
};
