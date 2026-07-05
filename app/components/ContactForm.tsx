"use client";

import { Send } from "lucide-react";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { projectTypes } from "../data/site";
import { createContactSubmission } from "../actions/contact";

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    
    const formData = new FormData(event.currentTarget);
    const res = await createContactSubmission(formData);
    
    setLoading(false);
    if (res.success) {
      setSubmitted(true);
      setError("");
      if (formRef.current) formRef.current.reset();
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setError(res.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <form
      ref={formRef}
      className="space-y-5"
      onSubmit={handleSubmit}
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
      <button type="submit" disabled={loading} className="btn btn-gold w-full justify-center disabled:opacity-50">
        {loading ? "Sending..." : t("send")}
        {!loading && <Send size={17} />}
      </button>
      {error && (
        <p className="rounded bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}
      {submitted ? (
        <p className="rounded bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-700">
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
