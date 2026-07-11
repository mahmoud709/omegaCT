import { BriefcaseBusiness, Camera, Globe, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { ContactForm } from "../components/ContactForm";
import { PageHero, SectionIntro } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { brand, images, offices } from "../data/site";
import dynamic from "next/dynamic";

const ContactMap = dynamic(() => import("../components/ContactMap").then(mod => mod.ContactMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 animate-pulse rounded-2xl flex items-center justify-center text-gray-400 font-medium">
      Loading office locations map...
    </div>
  )
});

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");
  const tSettings = await getTranslations("Settings");
  const locale = await getLocale();

  let profile: any[] = [];
  try {
    profile = await prisma.translation.findMany({ where: { namespace: "CompanyProfile" } });
  } catch (e) {}

  const getP = (k: string) => {
    const item = profile.find((t) => t.key === k);
    if (!item) return "";
    return locale === "ar" && item.ar ? item.ar : item.en;
  };

  const dbAlexAddress = getP("addressAlex") || offices[0].address;
  const dbCairoAddress = getP("addressCairo") || offices[1].address;
  const dbPhone = getP("phone") || brand.phone;
  const dbMobile = getP("mobile") || brand.mobile;
  const dbEmail = getP("email") || brand.email;
  const dbFacebook = getP("facebook") || brand.facebook;
  const dbInstagram = getP("instagram") || brand.instagram;
  const dbLinkedin = getP("linkedin") || brand.linkedin;
  const dbWebsite = brand.website;

  const dynamicOffices = [
    { city: locale === "ar" ? "مكتب الإسكندرية" : "Alexandria Office", address: dbAlexAddress, phone: dbPhone, mobile: dbMobile },
    { city: locale === "ar" ? "مكتب القاهرة" : "Cairo Office", address: dbCairoAddress, phone: dbPhone, mobile: dbMobile }
  ];

  const getSettingImage = (key: string, defaultValue: string) => {
    try {
      const val = tSettings(key);
      return val && val !== key ? val : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const contactBannerImg = getSettingImage("contactBanner", images.contact);

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("subtitle")}
        image={contactBannerImg}
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
              {dynamicOffices.map((office) => (
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
                  <a href={`mailto:${dbEmail}`} className="hover:text-[var(--gold)] transition-colors">
                    {dbEmail}
                  </a>
                </p>
                <p className="mt-4 flex gap-3 text-[var(--dark-text)]">
                  <Globe className="text-[var(--gold)]" size={20} />
                  <a href={`https://${dbWebsite}`} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors">
                    {dbWebsite}
                  </a>
                </p>
                <div className="mt-6 flex gap-3">
                  {dbFacebook && dbFacebook !== "#" && (
                    <a href={dbFacebook} target="_blank" rel="noopener noreferrer" className="social-button" aria-label="Facebook">
                      <svg className="size-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                  )}
                  {dbInstagram && dbInstagram !== "#" && (
                    <a href={dbInstagram} target="_blank" rel="noopener noreferrer" className="social-button" aria-label="Instagram">
                      <svg className="size-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </a>
                  )}
                  {dbLinkedin && dbLinkedin !== "#" && (
                    <a href={dbLinkedin} target="_blank" rel="noopener noreferrer" className="social-button" aria-label="LinkedIn">
                      <svg className="size-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-white pt-0">
        <div className="mx-auto max-w-4xl">
          <SectionIntro label={t("locationsLabel")} title={t("locationsTitle")} />
          <div className="mt-10">
            <ContactMap
              alexLabel={locale === "ar" ? "مكتب الإسكندرية" : "Alexandria Office"}
              cairoLabel={locale === "ar" ? "مكتب القاهرة" : "Cairo Office"}
            />
          </div>
        </div>
      </section>
    </>
  );
}
