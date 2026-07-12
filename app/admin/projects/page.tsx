import { getProjects } from "@/app/actions/projects";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ProjectListClient } from "./ProjectListClient";

export default async function ProjectsManager() {
  const projects = await getProjects();

  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Projects</h1>
          <p className="text-gray-500 mt-1">Manage all projects displayed on your portfolio.</p>
        </div>
        <Link 
          href="/admin/projects/new" 
          className="flex items-center gap-2 bg-[var(--gold)] hover:bg-yellow-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          Add Project
        </Link>
      </header>

      <ProjectListClient initialProjects={projects} />
    </div>
  );
}
