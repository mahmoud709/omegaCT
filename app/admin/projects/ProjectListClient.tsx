"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { Edit, GripVertical, Loader2 } from "lucide-react";
import { DeleteProjectButton } from "./DeleteProjectButton";
import { updateProjectsOrder, deleteProject } from "@/app/actions/projects";

type Project = {
  id: string;
  name: string;
  image: string;
  status: string;
  location: string;
};

export function ProjectListClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [activeDragIndex, setActiveDragIndex] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  // Sync state if initialProjects changes from server (e.g. after a delete or add)
  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    setDraggedIndex(index);
    setActiveDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
    
    // Custom drag ghost styling/handling if desired
    if (e.currentTarget) {
      e.currentTarget.style.opacity = "0.4";
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLTableRowElement>) => {
    if (e.currentTarget) {
      e.currentTarget.style.opacity = "1";
    }
    setActiveDragIndex(null);
    setDraggedIndex(null);
    
    // Save order to server database
    startTransition(async () => {
      try {
        await updateProjectsOrder(projects.map((p) => p.id));
      } catch (err) {
        console.error("Failed to save reordered projects:", err);
        // Reset to initial projects if failed
        setProjects(initialProjects);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    // Rearrange projects locally for live preview
    const reordered = [...projects];
    const [draggedItem] = reordered.splice(draggedIndex, 1);
    reordered.splice(index, 0, draggedItem);
    
    setProjects(reordered);
    setDraggedIndex(index);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm relative">
      {/* Pending / Saving Overlay Indicator */}
      {isPending && (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-gray-900/80 text-white text-xs px-3 py-1.5 rounded-full shadow-md z-10 backdrop-blur-sm transition-all duration-300">
          <Loader2 size={12} className="animate-spin text-[var(--gold)]" />
          <span>Saving order...</span>
        </div>
      )}

      <table className="w-full text-left text-sm text-gray-600">
        <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-semibold select-none">
          <tr>
            <th className="w-12 px-6 py-4"></th>
            <th className="px-6 py-4">Project Image</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Location</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {projects.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                No projects found. Create your first one!
              </td>
            </tr>
          ) : (
            projects.map((project, idx) => {
              const deleteAction = deleteProject.bind(null, project.id);
              const isCurrentlyDragging = activeDragIndex === idx;

              return (
                <tr 
                  key={project.id} 
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragEnd={handleDragEnd}
                  className={`transition-all duration-150 select-none ${
                    isCurrentlyDragging 
                      ? "bg-gray-50/70 border-2 border-dashed border-gray-200" 
                      : "hover:bg-gray-50/50"
                  }`}
                >
                  {/* Drag Handle */}
                  <td className="px-6 py-4 text-center cursor-grab active:cursor-grabbing">
                    <GripVertical size={18} className="text-gray-400 hover:text-gray-600 transition-colors" />
                  </td>

                  {/* Image */}
                  <td className="px-6 py-4">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="w-20 h-14 object-cover rounded shadow-sm border border-gray-200 pointer-events-none"
                    />
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 font-medium text-gray-900 select-all">{project.name}</td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                      project.status === "In Progress" || project.status === "تحت الإنشاء"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {project.status}
                    </span>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4">{project.location}</td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3" onClick={(e) => e.stopPropagation()}>
                      <Link href={`/admin/projects/${project.id}`} className="text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                        <Edit size={18} />
                      </Link>
                      <form action={deleteAction}>
                        <DeleteProjectButton id={project.id} />
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
