"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import type { Project } from "../data/site";

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const t = useTranslations("ProjectsPage");
  const tNames = useTranslations("ProjectNames");
  const [active, setActive] = useState("All");

  const filters = [
    { key: "All", label: t("filterAll") },
    { key: "In Progress", label: t("filterInProgress") },
    { key: "Hospitality", label: t("filterHospitality") },
    { key: "Residential", label: t("filterResidential") },
    { key: "Commercial", label: t("filterCommercial") },
    { key: "Institutional", label: t("filterInstitutional") },
  ];

  const visible = projects.filter((project) => {
    return active === "All" || project.category === active;
  });

  const activeLabel = filters.find((f) => f.key === active)?.label ?? active;

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => {
              setActive(filter.key);
            }}
            className={`filter-pill ${active === filter.key ? "is-active" : ""}`}
          >
            {filter.label.toUpperCase()}
          </button>
        ))}
      </div>



      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="block">
            <article className="project-card animate-scale-in transition-transform hover:-translate-y-1 hover:shadow-xl cursor-pointer h-full">
              <div className="project-image" style={{ backgroundImage: `url(${project.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'})` }}>
                <span className="project-badge left-4">{project.category}</span>
                <span className="project-badge right-4">{project.status}</span>
              </div>
              <div className="p-6">
                <div className="mb-3 flex items-center gap-2 text-sm text-[var(--muted)]">
                  <MapPin size={16} className="text-[var(--gold)]" />
                  {project.location}
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[var(--dark-text)] group-hover:text-[var(--gold)] transition-colors">
                  {((project as any).id || (project as any).nameAr) ? project.name : tNames(project.slug as any)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)] line-clamp-3">{project.details}</p>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
                  {project.role}
                </p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
