import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/", "/auth/signin", "/auth/error", "/pricing", "/blog"];
const authRoutes = ["/auth/signin", "/auth/error"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user has session token (JWT)
  const sessionToken = request.cookies.get("authjs.session-token") ||
                       request.cookies.get("__Secure-authjs.session-token");
  const isLoggedIn = !!sessionToken;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.includes(pathname);

  // Redirect authenticated users away from auth pages
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to sign in
  if (!isLoggedIn && !isPublicRoute) {
    const signInUrl = new URL("/auth/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
