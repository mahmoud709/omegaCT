import { getProjects, deleteProject } from "@/app/actions/projects";
import { Plus, Trash2, Edit } from "lucide-react";
import Link from "next/link";
import { DeleteProjectButton } from "./DeleteProjectButton";

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

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-semibold">
            <tr>
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
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                  No projects found. Create your first one!
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="w-20 h-14 object-cover rounded shadow-sm border border-gray-200"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{project.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold">
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{project.location}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/admin/projects/${project.id}`} className="text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                        <Edit size={18} />
                      </Link>
                      <form action={async () => {
                        "use server";
                        await deleteProject(project.id);
                      }}>
                        <DeleteProjectButton id={project.id} />
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
