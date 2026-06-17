import { ArrowRight, BadgeCheck, Handshake, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ClientMarquee } from "./components/ClientMarquee";
import { Counter } from "./components/Counter";
import { CtaBand, ImagePanel, SectionIntro } from "./components/Section";
import { HeroCarousel } from "./components/HeroCarousel";
import { Reveal } from "./components/Reveal";
import { heroSlides, images, services, stats } from "./data/site";

export default function Home() {
  const t = useTranslations("Home");
  const servicesT = useTranslations("Services");
  const statsT = useTranslations("Stats");
  const statLabels = [
    statsT("years"),
    statsT("projects"),
    statsT("clients"),
    statsT("quality"),
  ];

  return (
    <>
      <HeroCarousel slides={heroSlides} />

      <section className="border-y border-[var(--gold)] bg-white px-5 py-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="stat-card">
              <strong>
                <Counter value={stat.value} suffix={stat.suffix} />
              </strong>
              <span>{statLabels[index]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--off-white)]">
        <div className="mx-auto max-w-7xl">
          <ImagePanel image={images.about}>
            <Reveal>
              <p className="section-label">{t("whoLabel")}</p>
              <h2 className="section-title">
                {t("whoTitle")}
              </h2>
              <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
                {t("whoBody")}
              </p>
              <div className="mt-8 grid gap-4">
                {[
                  [BadgeCheck, t("engineering")],
                  [Handshake, t("partnerships")],
                  [ShieldCheck, t("assurance")],
                ].map(([Icon, label]) => (
                  <div key={label as string} className="flex items-center gap-4">
                    <span className="grid size-11 place-items-center rounded-full bg-white text-[var(--gold)] shadow-sm">
                      <Icon size={20} />
                    </span>
                    <span className="font-semibold text-[var(--dark-text)]">{label as string}</span>
                  </div>
                ))}
              </div>
              <Link href="/about" className="text-link mt-8 inline-flex">
                {t("discover")} <ArrowRight size={17} />
              </Link>
            </Reveal>
          </ImagePanel>
        </div>
      </section>

      <section className="section bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            label={t("expertiseLabel")}
            title={t("expertiseTitle")}
            subtitle={t("expertiseSubtitle")}
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {services.slice(0, 6).map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.titleKey} delay={index * 0.05}>
                  <article className="service-card h-full">
                    <Icon className="mb-6 text-[var(--gold)]" size={34} />
                    <h3 className="font-serif text-2xl font-semibold text-[var(--dark-text)]">
                      {servicesT(service.titleKey)}
                    </h3>
                    <p className="mt-4 leading-7 text-[var(--muted)]">{servicesT(`${service.titleKey}Summary`)}</p>
                    <span className="text-link mt-7 inline-flex">
                      {t("learnMore")} <ArrowRight size={16} />
                    </span>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services" className="btn btn-outline">
              {t("viewServices")}
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="spotlight" style={{ backgroundImage: `url(${images.skyline})` }}>
        <div className="spotlight-overlay" />
        <div className="relative mx-auto max-w-7xl px-5 py-28 lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="gold-pill">{t("spotlightBadge")}</span>
            <h2 className="mt-5 font-serif text-5xl font-semibold text-[var(--dark-text)] md:text-7xl">
              {t("spotlightTitle")}
            </h2>
            <p className="mt-3 text-xl text-[var(--blue)]">
              {t("spotlightLocation")}
            </p>
            <div className="my-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {["110m Height", "25 Floors", "13,500m2 Land", "Mixed-Use"].map((item) => (
                <span key={item} className="mini-stat">
                  {item}
                </span>
              ))}
            </div>
            <p className="text-lg leading-8 text-[var(--muted)]">
              {t("spotlightBody")}
            </p>
            <Link href="/projects" className="btn btn-gold mt-8">
              {t("viewProject")}
              <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section bg-[var(--off-white)]">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label={t("trustedLabel")} title={t("trustedTitle")} />
          <ClientMarquee />
        </div>
      </section>

      <section className="section bg-white">
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="font-serif text-8xl leading-none text-[var(--gold)]">&quot;</div>
          <blockquote className="font-serif text-3xl leading-snug text-[var(--dark-text)] md:text-5xl">
            {t("quote")}
          </blockquote>
          <p className="mt-8 font-semibold text-[var(--dark-text)]">{t("chairman")}</p>
          <p className="text-sm uppercase tracking-[0.2em] text-[var(--gold)]">
            {t("chairmanTitle")}
          </p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
