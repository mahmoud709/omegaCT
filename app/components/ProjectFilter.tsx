"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import type { Project } from "../data/site";

export function ProjectFilter({ projects }: { projects: Project[] }) {
  const t = useTranslations("ProjectsPage");
  const tNames = useTranslations("ProjectNames");
  const [active, setActive] = useState("All");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filters = [
    { key: "All", label: t("filterAll") },
    { key: "In Progress", label: t("filterInProgress") },
    { key: "Hospitality", label: t("filterHospitality") },
    { key: "Residential", label: t("filterResidential") },
    { key: "Commercial", label: t("filterCommercial") },
    { key: "Institutional", label: t("filterInstitutional") },
  ];

  const projectOptions = projects.filter(
    (project) => active !== "All" && project.category === active,
  );
  const selected = projects.find((project) => project.slug === selectedProject);
  const visible = projects.filter((project) => {
    const matchesFilter = active === "All" || project.category === active;
    const matchesProject = !selectedProject || project.slug === selectedProject;
    return matchesFilter && matchesProject;
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
              setSelectedProject(null);
            }}
            className={`filter-pill ${active === filter.key ? "is-active" : ""}`}
          >
            {filter.label.toUpperCase()}
          </button>
        ))}
      </div>

      {projectOptions.length > 0 ? (
        <div className="project-picker">
          <p>{t("chooseProject")}</p>
          <div>
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className={!selectedProject ? "is-active" : ""}
            >
              {t("all")} {activeLabel}
            </button>
            {projectOptions.map((project) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => setSelectedProject(project.slug)}
                className={selectedProject === project.slug ? "is-active" : ""}
              >
                {tNames(project.slug as any)}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {selected ? (
        <section className="selected-project-gallery animate-scale-in">
          <div>
            <p className="section-label">{t("galleryLabel")}</p>
            <h3>{tNames(selected.slug as any)}</h3>
            <span>{selected.location}</span>
          </div>
          <div className="selected-gallery-grid">
            {selected.galleryImages.map((image, index) => (
              <div
                key={`${selected.slug}-${image}-${index}`}
                style={{ backgroundImage: `url(${image})` }}
                aria-label={`${tNames(selected.slug as any)} image ${index + 1}`}
              />
            ))}
          </div>
        </section>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => (
          <article key={project.slug} className="project-card animate-scale-in">
            <div className="project-image" style={{ backgroundImage: `url(${project.image})` }}>
              <span className="project-badge left-4">{project.category}</span>
              <span className="project-badge right-4">{project.status}</span>
            </div>
            <div className="p-6">
              <div className="mb-3 flex items-center gap-2 text-sm text-[var(--muted)]">
                <MapPin size={16} className="text-[var(--gold)]" />
                {project.location}
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[var(--dark-text)]">
                {tNames(project.slug as any)}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{project.details}</p>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
                {project.role}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
