import { updateProject } from "@/app/actions/projects";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { SubmitButton } from "@/app/components/SubmitButton";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({ where: { id: resolvedParams.id } });

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProject.bind(null, project.id);

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-6">
        <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Project</h1>
        <p className="text-gray-500 mt-1">Update details for {project.name}.</p>
      </header>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <form action={updateProjectWithId} className="space-y-6">
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">Project Name (EN) *</label>
              <input type="text" id="name" name="name" defaultValue={project.name} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition" />
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="nameAr" className="block text-sm font-medium text-gray-900">Project Name (AR)</label>
              <input type="text" id="nameAr" name="nameAr" defaultValue={project.nameAr} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition text-right" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-900">Location (EN) *</label>
              <input type="text" id="location" name="location" defaultValue={project.location} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition" />
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="locationAr" className="block text-sm font-medium text-gray-900">Location (AR)</label>
              <input type="text" id="locationAr" name="locationAr" defaultValue={project.locationAr} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition text-right" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-900">Category (EN) *</label>
              <input type="text" id="category" name="category" list="categoryList" defaultValue={project.category} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white" placeholder="Select or type new..." />
              <datalist id="categoryList">
                <option value="Commercial" />
                <option value="Hospitality" />
                <option value="Residential" />
              </datalist>
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="categoryAr" className="block text-sm font-medium text-gray-900">Category (AR)</label>
              <input type="text" id="categoryAr" name="categoryAr" list="categoryArList" defaultValue={project.categoryAr} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white text-right" dir="rtl" placeholder="اختر أو اكتب فئة..." />
              <datalist id="categoryArList">
                <option value="تجاري" />
                <option value="ضيافة" />
                <option value="سكني" />
              </datalist>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-900">Status (EN) *</label>
              <select id="status" name="status" defaultValue={project.status} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white">
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="statusAr" className="block text-sm font-medium text-gray-900">Status (AR)</label>
              <select id="statusAr" name="statusAr" defaultValue={project.statusAr} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white text-right" dir="rtl">
                <option value="قيد التنفيذ">قيد التنفيذ (In Progress)</option>
                <option value="مكتمل">مكتمل (Completed)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-gray-900">Role (EN)</label>
              <input type="text" id="role" name="role" defaultValue={project.role} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition" />
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="roleAr" className="block text-sm font-medium text-gray-900">Role (AR)</label>
              <input type="text" id="roleAr" name="roleAr" defaultValue={project.roleAr} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition text-right" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="details" className="block text-sm font-medium text-gray-900">Key Details (EN)</label>
              <input type="text" id="details" name="details" defaultValue={project.details} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition" />
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="detailsAr" className="block text-sm font-medium text-gray-900">Key Details (AR)</label>
              <input type="text" id="detailsAr" name="detailsAr" defaultValue={project.detailsAr} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition text-right" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-900">Update Main Background Image</label>
            <input type="file" id="image" name="image" accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white" />
            <p className="text-xs text-gray-500">Leave this empty to keep the existing image.</p>
            {project.image && (
              <img src={project.image} alt="Current" className="mt-2 w-32 h-20 object-cover rounded border border-gray-200" />
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="galleryImages" className="block text-sm font-medium text-gray-900">Update Gallery Images (Upload Multiple)</label>
            <input type="file" id="galleryImages" name="galleryImages" accept="image/*" multiple className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white" />
            <p className="text-xs text-gray-500">Uploading new images here will append them to your current gallery. Hold Ctrl/Cmd to select multiple files at once.</p>
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Current Gallery Images:</p>
                <div className="flex flex-wrap gap-2">
                  {project.galleryImages.split(",").filter(Boolean).map((img, idx) => (
                    <img key={idx} src={img} alt={`Gallery ${idx + 1}`} className="w-20 h-20 object-cover rounded border border-gray-200" />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Link href="/admin/projects" className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors">
              Cancel
            </Link>
            <SubmitButton className="px-5 py-2.5 bg-[var(--gold)] hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors">
              Save Updates
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
