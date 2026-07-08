import { CheckCircle2 } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { ProjectFilter } from "../components/ProjectFilter";
import { CtaBand, PageHero, SectionIntro } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { images, projects as defaultProjects } from "../data/site";
import { getProjects } from "../actions/projects";

type ProjectWithAr = {
  id: string; slug: string; name: string; nameAr: string;
  location: string; locationAr: string; category: string; categoryAr: string;
  status: string; statusAr: string; details: string; detailsAr: string;
  role: string; roleAr: string; image: string; galleryImages: string;
  createdAt: Date; updatedAt: Date;
};

export default async function ProjectsPage() {
  const t = await getTranslations("ProjectsPage");
  const locale = await getLocale();
  const dbProjectsRaw = (await getProjects()) as unknown as ProjectWithAr[];
  const projectsToUse = dbProjectsRaw.length > 0 ? dbProjectsRaw : defaultProjects;
  
  const dbProjects = projectsToUse.map(p => {
    const isAr = locale === "ar";
    let galleryImagesArr: string[] = [];
    if (p.galleryImages) {
      if (Array.isArray(p.galleryImages)) {
        galleryImagesArr = p.galleryImages;
      } else if (typeof p.galleryImages === "string") {
        galleryImagesArr = (p.galleryImages as string).split(",").map(s => s.trim()).filter(Boolean);
      }
    }
    return {
      ...p,
      name: isAr && p.nameAr ? p.nameAr : p.name,
      location: isAr && p.locationAr ? p.locationAr : p.location,
      category: isAr && p.categoryAr ? p.categoryAr : p.category,
      status: isAr && p.statusAr ? p.statusAr : p.status,
      details: isAr && p.detailsAr ? p.detailsAr : p.details,
      role: isAr && p.roleAr ? p.roleAr : p.role,
      galleryImages: galleryImagesArr
    };
  });
  
  const displayProjects = dbProjects;

  const tSettings = await getTranslations("Settings");
  const getSettingImage = (key: string, defaultValue: string) => {
    try {
      const val = tSettings(key);
      return val && val !== key ? val : defaultValue;
    } catch {
      return defaultValue;
    }
  };
  const projectsBannerImg = getSettingImage("projectsBanner", images.skyline);

  const featuredProject = dbProjects.find(p => p.slug === "obsidier-towers");
  const defaultFeaturedImages = [images.about, images.blueprint, images.mep, images.interior];
  const featuredImages: string[] = [];
  for (let i = 0; i < 4; i++) {
    if (featuredProject && featuredProject.galleryImages && featuredProject.galleryImages[i]) {
      featuredImages.push(featuredProject.galleryImages[i]);
    } else {
      featuredImages.push(defaultFeaturedImages[i]);
    }
  }

  const projectDetails: [string, string][] = [
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
        image={projectsBannerImg}
      />

      <section className="section bg-white">
        <div className="mx-auto max-w-7xl">
          <SectionIntro label={t("portfolioLabel")} title={t("portfolioTitle")} />
          <ProjectFilter projects={displayProjects as any} />
        </div>
      </section>

      <section className="bg-(--off-white)">
        <div
          className="min-h-[420px] bg-cover bg-center"
          style={{ backgroundImage: `url(${projectsBannerImg})` }}
        />
        <div className="section">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <p className="section-label">{t("featuredLabel")}</p>
              <h2 className="section-title">{t("featuredTitle")}</h2>
              <div className="mt-8 overflow-hidden rounded border border-(--line) bg-white">
                {projectDetails.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[0.42fr_1fr] border-b border-(--line) last:border-b-0"
                  >
                    <strong className="bg-(--off-white) px-4 py-4 text-sm uppercase tracking-[0.16em] text-(--gold)">
                      {label}
                    </strong>
                    <span className="px-4 py-4 text-(--dark-text)">{value}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="section-label">{t("scopeLabel")}</p>
              <h3 className="font-serif text-4xl font-semibold text-(--dark-text)">
                {t("scopeTitle")}
              </h3>
              <div className="mt-8 grid gap-4">
                {scopeItems.map((item) => (
                  <p key={item} className="flex gap-3 text-(--dark-text)">
                    <CheckCircle2 className="mt-1 shrink-0 text-(--gold)" size={20} />
                    {item}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-4">
            {featuredImages.map((image, index) => (
              <div
                key={image + index}
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
