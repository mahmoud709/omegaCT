import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  // Only protect the /admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const adminCookie = req.cookies.get("admin_session");
    if (!adminCookie?.value || adminCookie.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
  }

  // HR portal — redirect to login if no session cookie
  if (req.nextUrl.pathname.startsWith("/hr") && !req.nextUrl.pathname.startsWith("/hr/login")) {
    const hrCookie = req.cookies.get("hr_session");
    if (!hrCookie?.value) {
      return NextResponse.redirect(new URL("/hr/login", req.url));
    }
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/hr/:path*"],
};
