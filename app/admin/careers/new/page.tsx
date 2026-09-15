"use client";

import { createJob } from "@/app/actions/careers";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition";
const labelClass = "block text-sm font-medium text-gray-900 mb-1.5";
const sectionTitleClass = "text-xs font-bold uppercase tracking-widest text-[var(--gold-dark)] border-b border-gray-100 pb-2";

export default function NewJobPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        const res = await createJob(formData);
        if (res?.success) {
          router.push("/admin/careers");
          router.refresh();
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while creating the job posting. Please try again.");
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-6">
        <Link href="/admin/careers" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} /> Back to Careers
        </Link>
      </div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Add New Job</h1>
        <p className="text-gray-500 mt-1">Fill out the details to post a new job opening.</p>
      </header>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>}
          <h2 className={sectionTitleClass}>Basic Information</h2>

          <div className="grid grid-cols-2 gap-6">
            <div><label htmlFor="title" className={labelClass}>Job Title (EN) *</label><input type="text" id="title" name="title" required className={inputClass} placeholder="e.g. Senior Tendering Engineer" /></div>
            <div dir="rtl"><label htmlFor="titleAr" className={labelClass}>Job Title (AR)</label><input type="text" id="titleAr" name="titleAr" className={`${inputClass} text-right`} placeholder="مهندس مناقصات أول" /></div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div><label htmlFor="department" className={labelClass}>Department (EN) *</label><input type="text" id="department" name="department" required className={inputClass} placeholder="e.g. Tendering & Estimation" /></div>
            <div dir="rtl"><label htmlFor="departmentAr" className={labelClass}>Department (AR)</label><input type="text" id="departmentAr" name="departmentAr" className={`${inputClass} text-right`} placeholder="المناقصات والتسعير" /></div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div><label htmlFor="location" className={labelClass}>Location (EN) *</label><input type="text" id="location" name="location" required className={inputClass} placeholder="e.g. Fifth Settlement, New Cairo" /></div>
            <div dir="rtl"><label htmlFor="locationAr" className={labelClass}>Location (AR)</label><input type="text" id="locationAr" name="locationAr" className={`${inputClass} text-right`} placeholder="التجمع الخامس، القاهرة الجديدة" /></div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label htmlFor="type" className={labelClass}>Employment Type (EN) *</label>
              <select id="type" name="type" required className={inputClass}><option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Contract">Contract</option></select>
            </div>
            <div dir="rtl">
              <label htmlFor="typeAr" className={labelClass}>Employment Type (AR)</label>
              <select id="typeAr" name="typeAr" className={`${inputClass} text-right`} dir="rtl"><option value="دوام كامل">دوام كامل (Full-time)</option><option value="دوام جزئي">دوام جزئي (Part-time)</option><option value="عقد">عقد (Contract)</option></select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div><label htmlFor="experience" className={labelClass}>Experience *</label><input type="text" id="experience" name="experience" required className={inputClass} placeholder="e.g. 8-12 Years" /></div>
            <div dir="rtl"><label htmlFor="experienceAr" className={labelClass}>الخبرة</label><input type="text" id="experienceAr" name="experienceAr" className={`${inputClass} text-right`} placeholder="من 8 إلى 12 سنة" /></div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div><label htmlFor="vacancies" className={labelClass}>Number of Vacancies *</label><input type="number" id="vacancies" name="vacancies" required min={1} defaultValue={1} className={inputClass} /></div>
            <div><label htmlFor="isOpen" className={labelClass}>Posting Status</label><select id="isOpen" name="isOpen" className={inputClass}><option value="true">Open - Accepting Applications</option><option value="false">Closed - Position Filled</option></select></div>
          </div>

          <h2 className={sectionTitleClass}>Job Details</h2>
          <div className="grid grid-cols-2 gap-6">
            <div><label htmlFor="description" className={labelClass}>Job Description (EN) *</label><textarea id="description" name="description" required rows={5} className={inputClass} placeholder="Study project BOQs, specifications, calculate accurate cost estimations..." /></div>
            <div dir="rtl"><label htmlFor="descriptionAr" className={labelClass}>Job Description (AR)</label><textarea id="descriptionAr" name="descriptionAr" rows={5} className={`${inputClass} text-right`} placeholder="دراسة جداول الكميات والرسومات..." /></div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div><label htmlFor="responsibilities" className={labelClass}>Key Responsibilities (EN) *</label><textarea id="responsibilities" name="responsibilities" required rows={4} className={inputClass} placeholder="Lead project coordination&#10;Review technical documents&#10;Prepare progress reports" /><p className="text-xs text-gray-400 mt-1">Enter each responsibility on a new line.</p></div>
            <div dir="rtl"><label htmlFor="responsibilitiesAr" className={labelClass}>المسؤوليات الرئيسية</label><textarea id="responsibilitiesAr" name="responsibilitiesAr" rows={4} className={`${inputClass} text-right`} placeholder="أدخل كل مسؤولية في سطر جديد" /></div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div><label htmlFor="requirements" className={labelClass}>Requirements (EN) *</label><textarea id="requirements" name="requirements" required rows={4} className={inputClass} placeholder="5 to 8 years experience in Construction Tendering&#10;BSc in Engineering&#10;Advanced MS Excel" /><p className="text-xs text-gray-400 mt-1">Enter each requirement on a new line.</p></div>
            <div dir="rtl"><label htmlFor="requirementsAr" className={labelClass}>Requirements (AR)</label><textarea id="requirementsAr" name="requirementsAr" rows={4} className={`${inputClass} text-right`} placeholder="خبرة من 5 إلى 8 سنوات..." /></div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div><label htmlFor="education" className={labelClass}>Education / Qualification (EN)</label><input type="text" id="education" name="education" className={inputClass} placeholder="e.g. Bachelor's Degree in Civil Engineering" /></div>
            <div dir="rtl"><label htmlFor="educationAr" className={labelClass}>المؤهل الدراسي</label><input type="text" id="educationAr" name="educationAr" className={`${inputClass} text-right`} placeholder="بكالوريوس هندسة مدنية" /></div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div><label htmlFor="preferredExperience" className={labelClass}>Preferred Experience (EN)</label><textarea id="preferredExperience" name="preferredExperience" rows={3} className={inputClass} placeholder="Previous experience in hotels, resorts, hospitality developments, or Red Sea projects is preferred." /></div>
            <div dir="rtl"><label htmlFor="preferredExperienceAr" className={labelClass}>الخبرات المفضلة</label><textarea id="preferredExperienceAr" name="preferredExperienceAr" rows={3} className={`${inputClass} text-right`} placeholder="يفضل وجود خبرة سابقة..." /></div>
          </div>

          <h2 className={sectionTitleClass}>Publishing</h2>
          <div className="grid grid-cols-2 gap-6">
            <div><label htmlFor="applicationDeadline" className={labelClass}>Application Deadline</label><input type="date" id="applicationDeadline" name="applicationDeadline" className={inputClass} /></div>
            <div className="flex items-end"><label className="flex w-full items-center justify-between gap-4 px-4 py-3 border border-gray-300 rounded-lg"><span><span className="block text-sm font-medium text-gray-900">Featured / Urgent Hiring</span><span className="block text-xs text-gray-400" dir="rtl">وظيفة مميزة / توظيف عاجل</span></span><input type="checkbox" name="isFeatured" value="true" className="h-5 w-5 accent-[var(--gold)]" /></label></div>
          </div>
          <div className="rounded-lg bg-gray-50 border border-gray-200 px-4 py-3 text-sm text-gray-500">Job Code will be generated automatically after publishing.</div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Link href="/admin/careers" className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors">Cancel</Link>
            <button type="submit" disabled={isPending} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--gold)] hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors disabled:opacity-60">
              {isPending ? <><Loader2 size={18} className="animate-spin" />Publishing...</> : "Publish Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
