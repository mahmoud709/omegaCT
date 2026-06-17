import { Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { CtaBand, PageHero, SectionIntro } from "../components/Section";
import { Reveal } from "../components/Reveal";
import {
  clients,
  images,
  preferredPartners,
  privateProjects,
} from "../data/site";

export default function PartnersPage() {
  const t = useTranslations("PartnersPage");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        image={images.business}
      />

      <section className="section bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label={t("clientsLabel")} title={t("clientsTitle")} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((client, index) => (
              <Reveal key={client} delay={index * 0.025}>
                <div className="client-grid-mark">{client}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--off-white)]">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            label={t("preferredLabel")}
            title={t("preferredTitle")}
            subtitle={t("preferredSubtitle")}
          />
          <div className="grid gap-x-10 gap-y-4 md:grid-cols-2">
            {preferredPartners.map((partner, index) => (
              <Reveal key={partner} delay={index * 0.025}>
                <p className="partner-row">
                  <span />
                  {partner}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            label={t("privateLabel")}
            title={t("privateTitle")}
            subtitle={t("privateSubtitle")}
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {privateProjects.map((project, index) => (
              <Reveal key={project} delay={index * 0.025}>
                <article className="private-card">
                  <Building2 size={24} className="text-[var(--gold)]" />
                  <p>{project}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
