import { Building2, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { CtaBand, PageHero, SectionIntro } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { ClientMarquee } from "../components/ClientMarquee";
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

      <section className="section overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label={t("clientsLabel")} title={t("clientsTitle")} />
          <div className="mt-12 py-10 relative">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,white_0%,transparent_10%,transparent_90%,white_100%)] z-10 pointer-events-none" />
            <ClientMarquee />
          </div>
        </div>
      </section>

      <section className="section bg-[var(--navy)] text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div className="mb-12 max-w-3xl">
              <p className="section-label text-[var(--gold-light)]">{t("preferredLabel")}</p>
              <h2 className="section-title !text-white">
                {t("preferredTitle")}
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                {t("preferredSubtitle")}
              </p>
            </div>
          </Reveal>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {preferredPartners.map((partner, index) => (
              <Reveal key={partner} delay={index * 0.04}>
                <div className="group relative overflow-hidden rounded-lg bg-white/5 border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:border-[var(--gold)]">
                  <div className="absolute -right-4 -top-4 opacity-5 transition-transform duration-500 group-hover:scale-150 group-hover:opacity-10 text-[var(--gold)]">
                    <ShieldCheck size={100} />
                  </div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--gold)]/20 text-[var(--gold)]">
                      <Star size={18} className="fill-[var(--gold)]" />
                    </div>
                    <p className="font-serif text-xl font-semibold tracking-wide text-white m-0">
                      {partner}
                    </p>
                  </div>
                </div>
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
