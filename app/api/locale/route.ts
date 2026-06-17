import { NextResponse } from "next/server";
import { defaultLocale, isLocale } from "../../../i18n/request";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    locale?: string;
  };
  const locale = isLocale(body.locale) ? body.locale : defaultLocale;
  const response = NextResponse.json({ locale });

  response.cookies.set("locale", locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
