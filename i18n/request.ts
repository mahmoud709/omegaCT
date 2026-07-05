import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ar";
}

export function getDirection(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

import { prisma } from "@/lib/prisma";

export default getRequestConfig(async () => {
  const store = await cookies();
  const requested = store.get("locale")?.value;
  const locale = isLocale(requested) ? requested : defaultLocale;

  // Load static messages from JSON
  const staticMessages = (await import(`../messages/${locale}.json`)).default;
  const mergedMessages = JSON.parse(JSON.stringify(staticMessages));

  // Fetch dynamic translations from SQLite
  // Temporarily bypassing DB to prevent Next.js from throwing a red error overlay
  /*
  try {
    const dbTranslations = await prisma.translation.findMany();
    for (const t of dbTranslations) {
      if (!mergedMessages[t.namespace]) {
        mergedMessages[t.namespace] = {};
      }
      // Override static with dynamic DB value
      mergedMessages[t.namespace][t.key] = locale === "ar" ? t.ar : t.en;
    }
  } catch (error) {
    // Database connection failed, falling back to static translations
    // Removed console.error to prevent Next.js Dev overlay from blocking the page
  }
  */

  return {
    locale,
    messages: mergedMessages,
  };
});
