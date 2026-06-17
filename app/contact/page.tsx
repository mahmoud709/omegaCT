import { BriefcaseBusiness, Camera, Globe, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactForm } from "../components/ContactForm";
import { PageHero, SectionIntro } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { brand, images, offices } from "../data/site";

export default function ContactPage() {
  const t = useTranslations("ContactPage");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        image={images.contact}
      />

      <section className="section bg-[var(--off-white)]">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="premium-card">
              <SectionIntro
                label={t("formLabel")}
                title={t("formTitle")}
                subtitle={t("formSubtitle")}
                centered={false}
              />
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-6">
              {offices.map((office) => (
                <article key={office.city} className="premium-card">
                  <h2 className="font-label text-sm uppercase tracking-[0.22em] text-[var(--gold)]">
                    {office.city}
                  </h2>
                  <p className="mt-5 flex gap-3 leading-7 text-[var(--muted)]">
                    <MapPin className="mt-1 shrink-0 text-[var(--gold)]" size={20} />
                    {office.address}
                  </p>
                  <p className="mt-4 flex gap-3 text-[var(--dark-text)]">
                    <Phone className="text-[var(--gold)]" size={20} />
                    {office.phone} | {office.mobile}
                  </p>
                </article>
              ))}

              <article className="premium-card">
                <h2 className="font-label text-sm uppercase tracking-[0.22em] text-[var(--gold)]">
                  {t("generalLabel")}
                </h2>
                <p className="mt-5 flex gap-3 text-[var(--dark-text)]">
                  <Mail className="text-[var(--gold)]" size={20} />
                  {brand.email}
                </p>
                <p className="mt-4 flex gap-3 text-[var(--dark-text)]">
                  <Globe className="text-[var(--gold)]" size={20} />
                  {brand.website}
                </p>
                <div className="mt-6 flex gap-3">
                  {[BriefcaseBusiness, Camera].map((Icon, index) => (
                    <a key={index} href="#" className="social-button" aria-label="Social profile">
                      <Icon size={19} />
                    </a>
                  ))}
                </div>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label={t("locationsLabel")} title={t("locationsTitle")} />
          <div className="overflow-hidden rounded border border-[var(--line)] shadow-[0_24px_70px_rgba(10,36,99,0.08)]">
            <iframe
              title="Omega offices map"
              src="https://www.google.com/maps?q=San%20Stefano%20Grand%20Plaza%20Alexandria%20Egypt%20Cairo%20Business%20Plaza%20New%20Cairo&output=embed"
              className="h-[320px] w-full md:h-[450px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
