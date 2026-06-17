import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProjectFilter } from "../components/ProjectFilter";
import { CtaBand, PageHero, SectionIntro } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { images, projects } from "../data/site";

export default function ProjectsPage() {
  const t = useTranslations("ProjectsPage");

  const projectDetails = [
    [t("locationKey"), t("locationValue")],
    [t("landArea"), t("landAreaValue")],
    [t("height"), t("heightValue")],
    [t("floors"), t("floorsValue")],
    [t("type"), t("typeValue")],
    [t("designer"), t("designerValue")],
    [t("role"), t("roleValue")],
  ];

  const scopeItems = [
    t("scope1"),
    t("scope2"),
    t("scope3"),
    t("scope4"),
    t("scope5"),
    t("scope6"),
  ];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        image={images.skyline}
      />

      <section className="section bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label={t("portfolioLabel")} title={t("portfolioTitle")} />
          <ProjectFilter projects={projects} />
        </div>
      </section>

      <section className="bg-[var(--off-white)]">
        <div
          className="min-h-[420px] bg-cover bg-center"
          style={{ backgroundImage: `url(${images.skyline})` }}
        />
        <div className="section">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="section-label">{t("featuredLabel")}</p>
              <h2 className="section-title">{t("featuredTitle")}</h2>
              <div className="mt-8 overflow-hidden rounded border border-[var(--line)] bg-white">
                {projectDetails.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[0.42fr_1fr] border-b border-[var(--line)] last:border-b-0"
                  >
                    <strong className="bg-[var(--off-white)] px-4 py-4 text-sm uppercase tracking-[0.16em] text-[var(--gold)]">
                      {label}
                    </strong>
                    <span className="px-4 py-4 text-[var(--dark-text)]">{value}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="section-label">{t("scopeLabel")}</p>
              <h3 className="font-serif text-4xl font-semibold text-[var(--dark-text)]">
                {t("scopeTitle")}
              </h3>
              <div className="mt-8 grid gap-4">
                {scopeItems.map((item) => (
                  <p key={item} className="flex gap-3 text-[var(--dark-text)]">
                    <CheckCircle2 className="mt-1 shrink-0 text-[var(--gold)]" size={20} />
                    {item}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-4">
            {[images.about, images.blueprint, images.mep, images.interior].map((image, index) => (
              <div
                key={image}
                className="min-h-[220px] bg-cover bg-center shadow-sm"
                style={{ backgroundImage: `url(${image})` }}
                aria-label={`Obsidier gallery image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
