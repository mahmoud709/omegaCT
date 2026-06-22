import * as Icons from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { CtaBand, PageHero, SectionIntro } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { images, services } from "../data/site";
import { getServices } from "../actions/services";

export default async function ServicesPage() {
  const t = await getTranslations("ServicesPage");
  const servicesT = await getTranslations("Services");
  const d = await getTranslations("AboutData");

  const locale = await getLocale();

  const dbServicesRaw = await getServices();
  const displayServices = dbServicesRaw.length > 0 ? dbServicesRaw.map(s => ({
    id: s.id,
    title: locale === "ar" && s.titleAr ? s.titleAr : s.title,
    summary: locale === "ar" && s.summaryAr ? s.summaryAr : s.summary,
    description: locale === "ar" && s.descriptionAr ? s.descriptionAr : s.description,
    scope: (locale === "ar" && s.scopeAr ? s.scopeAr : s.scope).split(",").map(i => i.trim()),
    icon: s.icon,
    image: s.image,
  })) : services.map(s => ({
    id: s.titleKey,
    title: servicesT(s.titleKey),
    summary: servicesT(`${s.titleKey}Summary`),
    description: servicesT(`${s.titleKey}Description`),
    scope: [servicesT("scope1"), servicesT("scope2"), servicesT("scope3")],
    icon: s.icon.name || "Wrench",
    image: null,
  }));

  const processSteps = [
    { titleKey: "processConsultationTitle", textKey: "processConsultationText", Icon: Icons.ClipboardCheck },
    { titleKey: "processDesignTitle", textKey: "processDesignText", Icon: Icons.DraftingCompass },
    { titleKey: "processConstructionTitle", textKey: "processConstructionText", Icon: Icons.Pickaxe },
    { titleKey: "processQualityTitle", textKey: "processQualityText", Icon: Icons.ShieldCheck },
    { titleKey: "processHandoverTitle", textKey: "processHandoverText", Icon: Icons.Medal },
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
          {displayServices.map((service, index) => {
            // @ts-ignore
            const Icon = Icons[service.icon] || Icons.Wrench;
            const reverse = index % 2 === 1;

            return (
              <article
                key={service.id}
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
                    <h2 className="section-title">{service.title}</h2>
                    <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
                      {service.description}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      {service.scope.split(",").map((s) => s.trim()).filter(Boolean).map((scopeItem) => (
                        <span key={scopeItem} className="scope-pill">
                          {scopeItem}
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
