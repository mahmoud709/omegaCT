import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    `<html>
      <head><meta http-equiv="refresh" content="2;url=/" /></head>
      <body style="font-family: sans-serif; text-align: center; margin-top: 50px;">
        <h2>Logged out successfully.</h2>
        <p>Redirecting to home page...</p>
      </body>
    </html>`,
    {
      status: 401,
      headers: {
        "Content-Type": "text/html",
        "WWW-Authenticate": 'Basic realm="Admin Logout"',
      },
    }
  );
}
