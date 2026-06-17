"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const options = ["en", "ar"] as const;

export function LanguageSwitcher({ solid }: { solid: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("LocaleSwitcher");
  const [isPending, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);

  const changeLocale = async (nextLocale: (typeof options)[number]) => {
    setIsSaving(true);
    await fetch("/api/locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale: nextLocale }),
    });
    startTransition(() => {
      router.refresh();
      setIsSaving(false);
    });
  };

  return (
    <div
      className={`language-switcher ${solid ? "is-solid" : ""}`}
      aria-label={t("label")}
      aria-busy={isPending || isSaving}
    >
      <Languages size={16} />
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => changeLocale(option)}
          disabled={isPending || isSaving || locale === option}
          className={locale === option ? "is-active" : ""}
        >
          {t(option)}
        </button>
      ))}
    </div>
  );
}
