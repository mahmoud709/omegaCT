"use client";
import { useRouter } from "next/navigation";
export function LanguageSwitch({ ar }: { ar: boolean }) {
  const router = useRouter();
  return <button type="button" onClick={() => { document.cookie = `hr_language=${ar ? "en" : "ar"}; path=/; max-age=31536000; SameSite=Lax`; router.refresh(); }} className="rounded-lg border border-current px-3 py-2 text-sm" aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}>{ar ? "English" : "العربية"}</button>;
}
