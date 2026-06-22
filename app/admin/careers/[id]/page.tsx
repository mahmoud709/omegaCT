import { updateJob } from "@/app/actions/careers";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

const inputClass =
  "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition";
const labelClass = "block text-sm font-medium text-gray-900 mb-1.5";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await prisma.jobPosting.findUnique({ where: { id } });

  if (!job) notFound();

  const updateJobWithId = updateJob.bind(null, job.id);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-6">
        <Link
          href="/admin/careers"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Careers
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Job</h1>
        <p className="text-gray-500 mt-1">Updating: <strong>{job.title}</strong></p>
      </header>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <form action={updateJobWithId} className="space-y-6">

          {/* Title */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className={labelClass}>Job Title (EN) *</label>
              <input type="text" id="title" name="title" defaultValue={job.title} required className={inputClass} />
            </div>
            <div dir="rtl">
              <label htmlFor="titleAr" className={labelClass}>Job Title (AR)</label>
              <input type="text" id="titleAr" name="titleAr" defaultValue={job.titleAr} className={`${inputClass} text-right`} />
            </div>
          </div>

          {/* Department */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="department" className={labelClass}>Department (EN) *</label>
              <input type="text" id="department" name="department" defaultValue={job.department} required className={inputClass} />
            </div>
            <div dir="rtl">
              <label htmlFor="departmentAr" className={labelClass}>Department (AR)</label>
              <input type="text" id="departmentAr" name="departmentAr" defaultValue={job.departmentAr} className={`${inputClass} text-right`} />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="location" className={labelClass}>Location (EN) *</label>
              <input type="text" id="location" name="location" defaultValue={job.location} required className={inputClass} />
            </div>
            <div dir="rtl">
              <label htmlFor="locationAr" className={labelClass}>Location (AR)</label>
              <input type="text" id="locationAr" name="locationAr" defaultValue={job.locationAr} className={`${inputClass} text-right`} />
            </div>
          </div>

          {/* Type */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className={labelClass}>Employment Type (EN) *</label>
              <select id="type" name="type" defaultValue={job.type} required className={inputClass}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div dir="rtl">
              <label htmlFor="typeAr" className={labelClass}>Employment Type (AR)</label>
              <select id="typeAr" name="typeAr" defaultValue={job.typeAr} className={`${inputClass} text-right`} dir="rtl">
                <option value="دوام كامل">دوام كامل (Full-time)</option>
                <option value="دوام جزئي">دوام جزئي (Part-time)</option>
                <option value="عقد">عقد (Contract)</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div>
            <label htmlFor="isOpen" className={labelClass}>Posting Status</label>
            <select id="isOpen" name="isOpen" defaultValue={job.isOpen ? "true" : "false"} className={inputClass}>
              <option value="true">Open — Accepting Applications</option>
              <option value="false">Closed — Position Filled</option>
            </select>
          </div>

          {/* Description */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="description" className={labelClass}>Job Description (EN) *</label>
              <textarea id="description" name="description" defaultValue={job.description} required rows={5} className={inputClass} />
            </div>
            <div dir="rtl">
              <label htmlFor="descriptionAr" className={labelClass}>Job Description (AR)</label>
              <textarea id="descriptionAr" name="descriptionAr" defaultValue={job.descriptionAr} rows={5} className={`${inputClass} text-right`} />
            </div>
          </div>

          {/* Requirements */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="requirements" className={labelClass}>Requirements (EN) *</label>
              <textarea id="requirements" name="requirements" defaultValue={job.requirements} required rows={4} className={inputClass} />
              <p className="text-xs text-gray-400 mt-1">Each line is one requirement.</p>
            </div>
            <div dir="rtl">
              <label htmlFor="requirementsAr" className={labelClass}>Requirements (AR)</label>
              <textarea id="requirementsAr" name="requirementsAr" defaultValue={job.requirementsAr} rows={4} className={`${inputClass} text-right`} />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Link href="/admin/careers" className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors">
              Cancel
            </Link>
            <button type="submit" className="px-5 py-2.5 bg-[var(--gold)] hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
