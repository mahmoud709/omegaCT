import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

export function SectionIntro({
  label,
  title,
  subtitle,
  centered = true,
}: {
  label: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-12 ${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}>
      <p className="section-label">{label}</p>
      <h2 className="section-title">{title}</h2>
      {subtitle ? <p className="mt-4 text-lg leading-8 text-(--muted)">{subtitle}</p> : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <section className="hero-small" style={{ backgroundImage: `url(${image})` }}>
      <div className="hero-scrim" />
      <div className="relative mx-auto flex min-h-[62vh] max-w-7xl flex-col justify-end px-5 pb-20 pt-32 lg:px-8">
        <div className="max-w-3xl animate-fade-up">
          <p className="section-label text-[var(--gold-light)]">{eyebrow}</p>
          <h1 className="font-serif text-5xl font-semibold leading-tight text-white md:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}

export function ImagePanel({
  image,
  children,
  reverse = false,
}: {
  image: string;
  children: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className={`grid items-center gap-10 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <div
        className="min-h-[420px] rounded-sm bg-cover bg-center shadow-[0_24px_70px_rgba(10,36,99,0.12)]"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div>{children}</div>
    </div>
  );
}

export function CtaBand() {
  const t = useTranslations("Common");

  return (
    <section className="bg-[linear-gradient(120deg,var(--navy),var(--blue))] px-5 py-20 text-white lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="section-label text-[var(--gold-light)]">{t("ctaLabel")}</p>
          <h2 className="font-serif text-4xl font-semibold md:text-6xl">
            {t("ctaTitle")}
          </h2>
          <p className="mt-4 max-w-2xl text-white/75">
            {t("ctaText")}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/contact" className="btn btn-gold">
            {t("getInTouch")}
          </Link>
          <a href="#" className="btn btn-light">
            {t("downloadProfile")}
          </a>
        </div>
      </div>
    </section>
  );
}
