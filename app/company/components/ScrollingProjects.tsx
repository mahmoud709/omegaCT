"use client";

import { Building2 } from "lucide-react";
import Link from "next/link";

interface ScrollingProjectsProps {
  projects: any[];
}

export function ScrollingProjects({ projects }: ScrollingProjectsProps) {
  const duplicatedProjects = [...projects, ...projects, ...projects, ...projects, ...projects, ...projects, ...projects, ...projects];

  return (
    <div className="overflow-hidden w-full">
      <div className="flex gap-3 animate-scroll w-max">
        {duplicatedProjects.map((project, index) => (
          <Link
            key={`${project.id}-${index}`}
            href={`/projects/${project.slug}`}
            className="relative shrink-0 w-28 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer block"
          >
            <div className="aspect-square bg-gray-200">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.nameAr || project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center">
                  <Building2 className="text-white/50" size={32} />
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <p className="text-white text-xs font-semibold truncate">
                {project.nameAr || project.name}
              </p>
              <p className="text-white/80 text-[10px] truncate">
                {project.locationAr || project.location}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(50%);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
