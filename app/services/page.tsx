import { CheckCircle2, ClipboardCheck, DraftingCompass, Medal, Pickaxe, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { CtaBand, PageHero, SectionIntro } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { images, services } from "../data/site";

export default function ServicesPage() {
  const t = useTranslations("ServicesPage");
  const servicesT = useTranslations("Services");
  const d = useTranslations("AboutData");

  const processSteps = [
    { titleKey: "processConsultationTitle", textKey: "processConsultationText", Icon: ClipboardCheck },
    { titleKey: "processDesignTitle", textKey: "processDesignText", Icon: DraftingCompass },
    { titleKey: "processConstructionTitle", textKey: "processConstructionText", Icon: Pickaxe },
    { titleKey: "processQualityTitle", textKey: "processQualityText", Icon: ShieldCheck },
    { titleKey: "processHandoverTitle", textKey: "processHandoverText", Icon: Medal },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        image={images.blueprint}
      />

      <section className="bg-white">
          {services.map((service, index) => {
            const Icon = service.icon;
            const reverse = index % 2 === 1;

            return (
              <article
                key={service.titleKey}
                className={`section ${index % 2 === 0 ? "bg-white" : "bg-[var(--off-white)]"}`}
              >
                <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
                  <Reveal className={reverse ? "lg:order-2" : ""}>
                    <div
                      className="min-h-[430px] bg-cover bg-center shadow-[0_24px_70px_rgba(10,36,99,0.12)]"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                  </Reveal>
                  <Reveal delay={0.08}>
                    <Icon size={38} className="mb-6 text-[var(--gold)]" />
                    <p className="section-label">{t("serviceLabel")} {String(index + 1).padStart(2, "0")}</p>
                    <h2 className="section-title">{servicesT(service.titleKey)}</h2>
                    <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                      {servicesT(`${service.titleKey}Description`)}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {service.scopeKeys.map((key) => (
                        <span key={key} className="scope-pill">
                          {servicesT(key)}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                </div>
              </article>
            );
          })}
      </section>

      <section className="section bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label={t("processLabel")} title={t("processTitle")} />
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <Reveal key={step.titleKey} delay={index * 0.06}>
                <article className="process-step">
                  <span>{index + 1}</span>
                  <step.Icon size={30} />
                  <h3>{d(step.titleKey)}</h3>
                  <p>{d(step.textKey)}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 grid gap-4 rounded bg-[var(--off-white)] p-6 md:grid-cols-2">
            {[t("sp1"), t("sp2"), t("sp3"), t("sp4")].map((point) => (
              <p key={point} className="flex gap-3 text-sm font-semibold text-[var(--dark-text)]">
                <CheckCircle2 size={19} className="shrink-0 text-[var(--gold)]" />
                {point}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
