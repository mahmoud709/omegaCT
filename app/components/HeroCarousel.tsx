"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroCarousel({ slides }: { slides: string[] }) {
  const t = useTranslations("Hero");
  const [active, setActive] = useState(0);
  const total = slides.length;

  useEffect(() => {
    if (total < 2) return;

    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, 5500);

    return () => window.clearInterval(interval);
  }, [total]);

  const goTo = (index: number) => {
    setActive((index + total) % total);
  };

  return (
    <section className="home-hero">
      <div className="hero-carousel" aria-label="Omega featured images">
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={`hero-slide ${index === active ? "is-active" : ""}`}
            style={{ backgroundImage: `url(${slide})` }}
          />
        ))}
      </div>
      <div className="hero-scrim hero-scrim-light" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-20 lg:px-8">
        <div className="max-w-5xl border-l border-[var(--gold)] pl-6 animate-fade-up">
          <span className="inline-flex border border-[var(--gold)] bg-white/16 px-4 py-2 font-label text-xs uppercase tracking-[0.3em] text-[var(--gold-light)] backdrop-blur">
            {t("badge")}
          </span>
          <p className="mt-8 font-label text-sm uppercase tracking-[0.34em] text-[var(--gold-light)]">
            {t("tag")}
          </p>
          <h1 className="mt-4 font-serif text-[clamp(4.25rem,8vw,9.5rem)] font-semibold leading-[0.98] text-white">
            {t("titleLine1")}
            <span className="block gold-gradient">{t("titleLine2")}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-9 text-white/84">
            {t("body")}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/projects" className="btn btn-gold">
              {t("projects")}
              <ArrowRight size={17} />
            </Link>
            <Link href="/about" className="btn btn-outline-light">
              {t("about")}
            </Link>
          </div>
        </div>

        {total > 1 ? (
          <>
            <div className="hero-arrows">
              <button type="button" onClick={() => goTo(active - 1)} aria-label={t("prev")}>
                <ArrowLeft size={20} />
              </button>
              <button type="button" onClick={() => goTo(active + 1)} aria-label={t("next")}>
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="hero-dots" aria-label="Hero image selector">
              {slides.map((slide, index) => (
                <button
                  key={slide}
                  type="button"
                  onClick={() => goTo(index)}
                  className={index === active ? "is-active" : ""}
                  aria-label={t("dot", { number: index + 1 })}
                />
              ))}
            </div>
          </>
        ) : null}

      </div>
    </section>
  );
}
