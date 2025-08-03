import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { Tokens } from "@/lib/tokens";

const guestRoutes = ["/", "/login", "/register", "/forgot-password"];
const protectedRoutes = ["/chat"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get(Tokens.JWT_TOKEN)?.value;
  const { pathname } = request.nextUrl;

  const isGuestRoute = guestRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // REDIRECTION AND CLEANUP LOGIC

  // Scenario 1: User is NOT logged in and tries to access a protected route.
  // Action: Redirect to the login page.
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Scenario 2: User IS logged in and accesses a guest route.
  // Action: Allow access to the page but remove the authentication cookie.
  // This effectively logs out the user.
  if (isGuestRoute && token) {
    const response = NextResponse.next();
    response.cookies.delete(Tokens.JWT_TOKEN);

    return response;
  }

  // If none of the above conditions are met, allow access.
  return NextResponse.next();
}

export const config = {
  matcher: ["/chat/:path*", "/", "/login", "/register", "/forgot-password"],
};
