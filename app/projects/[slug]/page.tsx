import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { projects } from "@/app/data/site";
import { ProjectCarousel } from "@/app/components/ProjectCarousel";
import { Reveal } from "@/app/components/Reveal";
import { MapPin, Building2, HardHat } from "lucide-react";

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = await getTranslations("ProjectsPage");
  const tNames = await getTranslations("ProjectNames");
  const locale = await getLocale();
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Try DB
  let dbProjectRaw = null;
  // Temporarily bypassing DB to prevent Next.js from throwing a red error overlay 
  // due to the MongoDB IP whitelist timeout.
  /*
  try {
    dbProjectRaw = await prisma.project.findUnique({ where: { slug } });
  } catch (error) {
    // DB error or disconnected
  }
  */

  let project = null;

  if (dbProjectRaw) {
    const isAr = locale === "ar";
    project = {
      ...dbProjectRaw,
      name: isAr && dbProjectRaw.nameAr ? dbProjectRaw.nameAr : dbProjectRaw.name,
      location: isAr && dbProjectRaw.locationAr ? dbProjectRaw.locationAr : dbProjectRaw.location,
      category: isAr && dbProjectRaw.categoryAr ? dbProjectRaw.categoryAr : dbProjectRaw.category,
      status: isAr && dbProjectRaw.statusAr ? dbProjectRaw.statusAr : dbProjectRaw.status,
      details: isAr && dbProjectRaw.detailsAr ? dbProjectRaw.detailsAr : dbProjectRaw.details,
      role: isAr && dbProjectRaw.roleAr ? dbProjectRaw.roleAr : dbProjectRaw.role,
      galleryImages: dbProjectRaw.galleryImages ? dbProjectRaw.galleryImages.split(",").map(s => s.trim()).filter(Boolean) : []
    };
  } else {
    // Try static
    const staticProject = projects.find(p => p.slug === slug);
    if (staticProject) {
      let projectName = staticProject.name;
      try {
        projectName = tNames(staticProject.slug as any);
      } catch (e) {
        // Fallback to english name if translation missing
      }
      project = {
        ...staticProject,
        name: projectName
      };
    }
  }

  if (!project) {
    notFound();
  }

  const galleryImages = project.galleryImages && project.galleryImages.length > 0 
    ? project.galleryImages 
    : [project.image].filter(Boolean);

  return (
    <main className="bg-[var(--off-white)] min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal>
          <div className="mb-12 text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--dark-text)] mb-6">{project.name}</h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[var(--muted)] font-medium text-sm md:text-base">
              <span className="flex items-center gap-2"><MapPin size={18} className="text-[var(--gold)]" /> {project.location}</span>
              <span className="hidden md:inline text-gray-300">•</span>
              <span className="flex items-center gap-2"><Building2 size={18} className="text-[var(--gold)]" /> {project.category}</span>
              <span className="hidden md:inline text-gray-300">•</span>
              <span className="flex items-center gap-2"><HardHat size={18} className="text-[var(--gold)]" /> {project.role}</span>
            </div>
            <div className="mt-8 flex justify-center gap-3">
              <span className="px-5 py-2 bg-[var(--gold)]/10 text-[var(--gold)] text-sm font-bold tracking-[0.2em] uppercase rounded-full border border-[var(--gold)]/20">
                {project.status}
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="w-full h-[50vh] md:h-[65vh] rounded-2xl overflow-hidden shadow-2xl relative mb-16 border border-gray-100">
            <img 
              src={project.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80'} 
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-14 rounded-2xl shadow-sm border border-[var(--line)]">
            <p className="section-label mb-5">{t("scopeLabel")}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[var(--dark-text)] font-semibold mb-8">Project Overview</h2>
            <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed mb-8 border-l-4 border-[var(--gold)] pl-6">
              {project.details}
            </p>
          </div>
        </Reveal>

        {galleryImages.length > 0 && (
          <Reveal delay={0.3}>
            <div className="mt-20 text-center">
              <p className="section-label">{t("galleryLabel")}</p>
            </div>
            <ProjectCarousel images={galleryImages} projectName={project.name} />
          </Reveal>
        )}

      </div>
    </main>
  );
}
