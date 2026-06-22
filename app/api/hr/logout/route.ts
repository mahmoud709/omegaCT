import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/hr-auth";

export async function POST(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/hr/login";
  const res = NextResponse.redirect(url);
  res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
  return res;
}
