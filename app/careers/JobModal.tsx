"use client";

import { useState } from "react";
import { X, MapPin, CheckCircle2, ArrowRight, Link2, Briefcase, ChevronRight, Clock, CalendarDays, Hash } from "lucide-react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  titleAr?: string | null;
  department: string;
  departmentAr?: string | null;
  location: string;
  locationAr?: string | null;
  type: string;
  typeAr?: string | null;
  experience?: string | null;
  experienceAr?: string | null;
  description: string;
  descriptionAr?: string | null;
  responsibilities: string[];
  responsibilitiesAr?: string[];
  requirements: string[];
  requirementsAr?: string[];
  education?: string | null;
  educationAr?: string | null;
  preferredExperience?: string[];
  preferredExperienceAr?: string[];
  applicationDeadline?: Date | string | null;
  jobCode?: string | null;
  isFeatured?: boolean | null;
}

/* ─── Modal ─────────────────────────────────────────── */
function JobModal({ job, isAr, onClose }: { job: Job; isAr: boolean; onClose: () => void }) {
  const title       = isAr && job.titleAr       ? job.titleAr       : job.title;
  const department  = isAr && job.departmentAr  ? job.departmentAr  : job.department;
  const location    = isAr && job.locationAr    ? job.locationAr    : job.location;
  const type        = isAr && job.typeAr        ? job.typeAr        : job.type;
  const experience  = isAr && job.experienceAr  ? job.experienceAr  : job.experience;
  const description = isAr && job.descriptionAr ? job.descriptionAr : job.description;
  const responsibilities = isAr && job.responsibilitiesAr?.length
    ? job.responsibilitiesAr
    : job.responsibilities;
  const requirements = isAr && job.requirementsAr?.length
    ? job.requirementsAr
    : job.requirements;
  const education = isAr && job.educationAr ? job.educationAr : job.education;
  const preferredExperience = isAr && job.preferredExperienceAr?.length
    ? job.preferredExperienceAr
    : (job.preferredExperience || []);
  const deadline = job.applicationDeadline ? new Date(job.applicationDeadline) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[88vh] flex flex-col animate-in zoom-in-95 duration-200 modal-scroll"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Sticky header */}
        <div className="shrink-0 bg-[var(--navy)] text-white rounded-t-2xl px-8 pt-6 pb-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={16} />
          </button>
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--gold-light)] mb-1.5 ps-0">
            {department}
          </p>
          <h2 className="font-serif text-2xl font-semibold mb-3">{title}</h2>
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
            {job.jobCode && <span className="flex items-center gap-1.5"><Hash size={13} />{job.jobCode}</span>}
            <span className="flex items-center gap-1.5"><MapPin size={13} />{location}</span>
            <span className="flex items-center gap-1.5"><Briefcase size={13} />{type}</span>
            {experience && <span className="flex items-center gap-1.5"><Clock size={13} />{experience}</span>}
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 modal-scroll">
          <div className="px-8 py-6 space-y-7">

            {/* Description */}
            <div>
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--gold-dark)] mb-3">
                <span className="w-5 h-px bg-[var(--gold)]" />
                {isAr ? "الوصف الوظيفي" : "Job Description"}
              </h3>
              <p className="text-[var(--muted)] leading-7 text-sm whitespace-pre-line">{description}</p>
            </div>

            {/* Responsibilities */}
            {responsibilities.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--gold-dark)] mb-3">
                  <span className="w-5 h-px bg-[var(--gold)]" />
                  {isAr ? "Ø§Ù„Ù…Ø³Ø¤ÙˆÙ„ÙŠØ§Øª Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©" : "Key Responsibilities"}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted)] bg-[var(--off-white)] rounded-lg px-3 py-2.5">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {requirements.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--gold-dark)] mb-3">
                  <span className="w-5 h-px bg-[var(--gold)]" />
                  {isAr ? "المتطلبات" : "Requirements"}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted)] bg-[var(--off-white)] rounded-lg px-3 py-2.5">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {education && (
              <div>
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--gold-dark)] mb-3">
                  <span className="w-5 h-px bg-[var(--gold)]" />
                  {isAr ? "Ø§Ù„Ù…Ø¤Ù‡Ù„ Ø§Ù„Ø¯Ø±Ø§Ø³ÙŠ" : "Education / Qualification"}
                </h3>
                <p className="text-[var(--muted)] leading-7 text-sm">{education}</p>
              </div>
            )}

            {preferredExperience.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--gold-dark)] mb-3">
                  <span className="w-5 h-px bg-[var(--gold)]" />
                  {isAr ? "Ø§Ù„Ø®Ø¨Ø±Ø§Øª Ø§Ù„Ù…ÙØ¶Ù„Ø©" : "Preferred Experience"}
                </h3>
                <ul className="space-y-2">
                  {preferredExperience.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                      <CheckCircle2 size={14} className="mt-1 shrink-0 text-[var(--gold)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {deadline && !Number.isNaN(deadline.getTime()) && (
              <div className="flex items-center gap-2 text-sm text-[var(--muted)] bg-[var(--off-white)] rounded-lg px-3 py-2.5">
                <CalendarDays size={15} className="text-[var(--gold)]" />
                <span>{isAr ? "Ø¢Ø®Ø± Ù…ÙˆØ¹Ø¯ Ù„Ù„ØªÙ‚Ø¯ÙŠÙ…:" : "Application Deadline:"} {deadline.toLocaleDateString(isAr ? "ar-EG" : "en-US")}</span>
              </div>
            )}
          </div>
        </div>

        {/* Sticky footer */}
        <div className="shrink-0 bg-white border-t border-[var(--line)] px-8 py-4 rounded-b-2xl flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-sm text-[var(--muted)] hover:text-[var(--dark-text)] transition-colors cursor-pointer"
          >
            {isAr ? "إغلاق" : "Close"}
          </button>
          <Link
            href={`/apply/${job.id}`}
            className="btn btn-gold text-xs"
            onClick={onClose}
          >
            {isAr ? "قدّم الآن" : "Apply Now"}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Card ───────────────────────────────────────────── */
export function JobCard({ job, isAr }: { job: Job; isAr: boolean }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const title      = isAr && job.titleAr      ? job.titleAr      : job.title;
  const department = isAr && job.departmentAr ? job.departmentAr : job.department;
  const location   = isAr && job.locationAr   ? job.locationAr   : job.location;
  const type       = isAr && job.typeAr       ? job.typeAr       : job.type;
  const experience = isAr && job.experienceAr ? job.experienceAr : job.experience;
  const reqs       = (isAr && job.requirementsAr?.length ? job.requirementsAr : job.requirements).slice(0, 3);
  const totalReqs  = (isAr && job.requirementsAr?.length ? job.requirementsAr : job.requirements).length;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/apply/${job.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <article
        dir={isAr ? "rtl" : "ltr"}
        onClick={() => setOpen(true)}
        className="group bg-white border border-[var(--line)] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col"
      >
        {/* Gold accent top bar */}
        <div className="h-0.5 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

        <div className="p-6 flex flex-col flex-1 gap-4">
          {/* Header */}
          <div>
            <p className="text-[10px] font-black tracking-[0.22em] uppercase text-[var(--gold-dark)] mb-2 font-[var(--font-cinzel)]">
              {department}
            </p>
            <h2 className="font-serif text-xl font-semibold text-[var(--dark-text)] group-hover:text-[var(--navy)] transition-colors leading-snug">
              {title}
            </h2>
            <p className="flex items-center gap-1.5 mt-2 text-xs text-[var(--muted)]">
              <MapPin size={12} className="text-[var(--gold)] shrink-0" />
              {location}
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-50 border border-gray-100 px-2.5 py-1"><Briefcase size={12} className="text-[var(--gold)]" />{type}</span>
              {experience && <span className="inline-flex items-center gap-1.5 rounded-md bg-gray-50 border border-gray-100 px-2.5 py-1"><Clock size={12} className="text-[var(--gold)]" />{experience}</span>}
              {job.isFeatured && <span className="inline-flex items-center rounded-md bg-amber-50 border border-amber-200 px-2.5 py-1 font-bold text-amber-700">{isAr ? "Ù…Ø·Ù„ÙˆØ¨ Ø¨Ø´ÙƒÙ„ Ø¹Ø§Ø¬Ù„" : "Urgent Hiring"}</span>}
            </div>
          </div>

          {/* Requirements chips */}
          {reqs.length > 0 && (
            <div className="flex flex-col gap-1.5 pt-3 border-t border-[var(--line)]">
              {reqs.map((req, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[var(--muted)] leading-5">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                  <span className="line-clamp-1">{req}</span>
                </div>
              ))}
              {totalReqs > 3 && (
                <p className="text-[11px] font-semibold text-[var(--gold)] ps-5">
                  {isAr ? `+${totalReqs - 3} متطلبات أخرى` : `+${totalReqs - 3} more requirements`}
                </p>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--line)] mt-auto gap-2">
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer border ${
                copied
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-amber-50 hover:text-[var(--gold-dark)] hover:border-amber-300"
              }`}
            >
              <Link2 size={13} />
              {copied
                ? (isAr ? "تم النسخ ✓" : "Copied! ✓")
                : (isAr ? "نسخ الرابط" : "Copy Link")}
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); setOpen(true); }}
              className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-[var(--navy)] text-white hover:bg-[var(--gold)] transition-all shadow-sm cursor-pointer"
            >
              {isAr ? "التفاصيل" : "Details"}
              <ChevronRight size={14} className={isAr ? "rotate-180" : ""} />
            </button>
          </div>
        </div>
      </article>

      {open && <JobModal job={job} isAr={isAr} onClose={() => setOpen(false)} />}
    </>
  );
}
