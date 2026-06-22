import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  // Only protect the /admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const basicAuth = req.headers.get("authorization");

    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1];
      const [user, pwd] = atob(authValue).split(":");

      // VERY basic hardcoded auth for the admin panel.
      // Change these to whatever you want!
      if (user === "omega" && pwd === "admin123") {
        return NextResponse.next();
      }
    }

    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
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
