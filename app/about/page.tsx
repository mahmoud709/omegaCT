import { CheckCircle2, Factory } from "lucide-react";
import { useTranslations } from "next-intl";
import { Eye, Target, Rocket, ShieldCheck, BadgeCheck, Medal, Sparkles, HeartHandshake, ClipboardCheck } from "lucide-react";
import { CtaBand, ImagePanel, PageHero, SectionIntro } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { images } from "../data/site";

export default function AboutPage() {
  const t = useTranslations("AboutPage");
  const d = useTranslations("AboutData");
  const tSettings = useTranslations("Settings");

  const getSettingImage = (key: string, defaultValue: string) => {
    try {
      const val = tSettings(key);
      return val && val !== key ? val : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const bannerImg = getSettingImage("aboutBanner", images.about);
  const businessImg = getSettingImage("aboutBusiness", images.business);
  const teamImg = getSettingImage("aboutTeam", images.team);

  const timeline = [
    ["2003", d("timeline2003")],
    ["2005", d("timeline2005")],
    ["2010", d("timeline2010")],
    ["2015", d("timeline2015")],
    ["2020", d("timeline2020")],
    ["2025", d("timeline2025")],
  ];

  const pillars = [
    { titleKey: "visionTitle", textKey: "visionText", icon: Eye },
    { titleKey: "goalTitle", textKey: "goalText", icon: Target },
    { titleKey: "missionTitle", textKey: "missionText", icon: Rocket },
  ];

  const values = [
    { titleKey: "valueIntegrityTitle", textKey: "valueIntegrityText", icon: ShieldCheck },
    { titleKey: "valueCommitmentTitle", textKey: "valueCommitmentText", icon: BadgeCheck },
    { titleKey: "valueExcellenceTitle", textKey: "valueExcellenceText", icon: Medal },
    { titleKey: "valueCustomerTitle", textKey: "valueCustomerText", icon: Sparkles },
    { titleKey: "valueLoyaltyTitle", textKey: "valueLoyaltyText", icon: HeartHandshake },
    { titleKey: "valueQualityTitle", textKey: "valueQualityText", icon: ClipboardCheck },
  ];

  const businessPoints = [d("bp1"), d("bp2"), d("bp3"), d("bp4"), d("bp5")];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        image={bannerImg}
      />

      <section className="section bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="timeline">
              {timeline.map(([year, text]) => (
                <div key={year} className="timeline-item">
                  <span>{year}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="section-label">{t("storyLabel")}</p>
            <h2 className="section-title">{t("storyTitle")}</h2>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              {t("storyBody")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-[var(--off-white)]">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label={t("directionLabel")} title={t("directionTitle")} />
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.titleKey} delay={index * 0.08}>
                  <article className="premium-card h-full">
                    <Icon size={34} className="mb-6 text-[var(--gold)]" />
                    <h3 className="font-label text-sm uppercase tracking-[0.22em] text-[var(--gold)]">
                      {d(pillar.titleKey)}
                    </h3>
                    <p className="mt-4 leading-7 text-[var(--muted)]">{d(pillar.textKey)}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label={t("valuesLabel")} title={t("valuesTitle")} />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {values.map((v, index) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.titleKey} delay={index * 0.05}>
                  <article className="value-card">
                    <Icon size={28} className="text-[var(--gold)]" />
                    <h3>{d(v.titleKey)}</h3>
                    <p>{d(v.textKey)}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--off-white)]">
        <div className="mx-auto max-w-7xl">
          <ImagePanel image={businessImg} reverse>
            <Reveal>
              <p className="section-label">{t("businessLabel")}</p>
              <h2 className="section-title">{t("businessTitle")}</h2>
              <div className="mt-7 space-y-4">
                {businessPoints.map((point) => (
                  <p key={point} className="flex gap-3 text-[var(--dark-text)]">
                    <CheckCircle2 className="mt-1 shrink-0 text-[var(--gold)]" size={20} />
                    <span>{point}</span>
                  </p>
                ))}
              </div>
            </Reveal>
          </ImagePanel>
        </div>
      </section>

      <section className="parallax-band" style={{ backgroundImage: `url(${teamImg})` }}>
        <div className="hero-scrim" />
        <Reveal className="relative mx-auto max-w-7xl px-5 py-28 text-white lg:px-8">
          <p className="section-label text-[var(--gold-light)]">{t("teamLabel")}</p>
          <h2 className="max-w-3xl font-serif text-5xl font-semibold md:text-7xl">
            {t("teamTitle")}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/78">
            {t("teamBody")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <span className="glass-stat">{t("teamStat1")}</span>
            <span className="glass-stat">{t("teamStat2")}</span>
          </div>
        </Reveal>
      </section>

      <section className="section bg-[var(--off-white)]">
        <Reveal className="mx-auto max-w-5xl">
          <article className="premium-card grid items-center gap-8 md:grid-cols-[auto_1fr]">
            <span className="grid size-20 place-items-center rounded-full bg-[var(--gold)] text-white">
              <Factory size={36} />
            </span>
            <div>
              <p className="section-label">{t("industrialLabel")}</p>
              <h2 className="font-serif text-4xl font-semibold text-[var(--dark-text)]">
                {t("industrialTitle")}
              </h2>
              <p className="mt-4 leading-8 text-[var(--muted)]">
                {t("industrialBody")}
              </p>
            </div>
          </article>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
