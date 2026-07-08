import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { unstable_cache } from "next/cache";

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

  // Fetch dynamic translations from MongoDB using cache to fix slow Vercel cold starts
  const getCachedTranslations = unstable_cache(
    async () => {
      try {
        return await prisma.translation.findMany();
      } catch (error) {
        return [];
      }
    },
    ["global-translations"],
    { tags: ["translations"] }
  );

  try {
    const dbTranslations = await getCachedTranslations();
    for (const t of dbTranslations) {
      if (!mergedMessages[t.namespace]) {
        mergedMessages[t.namespace] = {};
      }
      // Override static with dynamic DB value
      mergedMessages[t.namespace][t.key] = locale === "ar" ? t.ar : t.en;
    }
  } catch (error) {
    // Database connection failed, falling back to static translations
  }

  return {
    locale,
    messages: mergedMessages,
  };
});
