import { createProject } from "@/app/actions/projects";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewProject() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/projects" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Add New Project</h1>
        <p className="text-gray-500 mt-1">Fill out the details to add a new project to your portfolio.</p>
      </header>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <form action={createProject} className="space-y-6">
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">Project Name (EN) *</label>
              <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition" placeholder="e.g. Obsidier Towers" />
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="nameAr" className="block text-sm font-medium text-gray-900">Project Name (AR)</label>
              <input type="text" id="nameAr" name="nameAr" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition text-right" placeholder="أبراج أوبسيدير" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-900">Location (EN) *</label>
              <input type="text" id="location" name="location" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition" placeholder="e.g. New Administrative Capital" />
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="locationAr" className="block text-sm font-medium text-gray-900">Location (AR)</label>
              <input type="text" id="locationAr" name="locationAr" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition text-right" placeholder="العاصمة الإدارية الجديدة" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="category" className="block text-sm font-medium text-gray-900">Category (EN) *</label>
              <input type="text" id="category" name="category" list="categoryList" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white" placeholder="Select or type new..." />
              <datalist id="categoryList">
                <option value="Commercial" />
                <option value="Hospitality" />
                <option value="Residential" />
              </datalist>
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="categoryAr" className="block text-sm font-medium text-gray-900">Category (AR)</label>
              <input type="text" id="categoryAr" name="categoryAr" list="categoryArList" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white text-right" dir="rtl" placeholder="اختر أو اكتب فئة..." />
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
              <select id="status" name="status" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white">
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="statusAr" className="block text-sm font-medium text-gray-900">Status (AR)</label>
              <select id="statusAr" name="statusAr" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white text-right" dir="rtl">
                <option value="قيد التنفيذ">قيد التنفيذ (In Progress)</option>
                <option value="مكتمل">مكتمل (Completed)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-gray-900">Role (EN)</label>
              <input type="text" id="role" name="role" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition" placeholder="e.g. Main Contractor" />
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="roleAr" className="block text-sm font-medium text-gray-900">Role (AR)</label>
              <input type="text" id="roleAr" name="roleAr" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition text-right" placeholder="المقاول الرئيسي" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="details" className="block text-sm font-medium text-gray-900">Key Details (EN)</label>
              <input type="text" id="details" name="details" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition" placeholder="e.g. 110m height, 25 floors" />
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="detailsAr" className="block text-sm font-medium text-gray-900">Key Details (AR)</label>
              <input type="text" id="detailsAr" name="detailsAr" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition text-right" placeholder="ارتفاع 110 متر، 25 طابق" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-900">Main Background Image *</label>
            <input type="file" id="image" name="image" accept="image/*" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white" />
            <p className="text-xs text-gray-500">Upload a high-quality image. It will be securely stored in Cloudinary.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="galleryImages" className="block text-sm font-medium text-gray-900">Gallery Images (Upload Multiple)</label>
            <input type="file" id="galleryImages" name="galleryImages" accept="image/*" multiple className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white" />
            <p className="text-xs text-gray-500">Hold Ctrl (or Cmd) to select multiple images for the project's gallery.</p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Link href="/admin/projects" className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors">
              Cancel
            </Link>
            <button type="submit" className="px-5 py-2.5 bg-[var(--gold)] hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors">
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
