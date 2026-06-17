"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { projectTypes } from "../data/site";

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FloatingInput label={t("fullName")} name="name" required />
        <FloatingInput label={t("email")} name="email" type="email" required />
        <FloatingInput label={t("phone")} name="phone" />
        <FloatingInput label={t("company")} name="company" />
      </div>
      <label className="field-label">
        <span>{t("projectType")}</span>
        <select name="projectType" className="field-control">
          {projectTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>
      <FloatingInput label={t("location")} name="location" />
      <label className="field-label">
        <span>{t("message")}</span>
        <textarea name="message" required rows={6} className="field-control resize-none" />
      </label>
      <button type="submit" className="btn btn-gold w-full justify-center">
        {t("send")}
        <Send size={17} />
      </button>
      {submitted ? (
        <p className="rounded bg-[var(--off-white)] px-4 py-3 text-sm text-[var(--dark-text)]">
          {t("thanks")}
        </p>
      ) : null}
    </form>
  );
}

function FloatingInput({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="field-label">
      <span>{label}</span>
      <input name={name} type={type} required={required} className="field-control" />
    </label>
  );
}
