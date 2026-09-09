import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ApplicationForm } from "./ApplicationForm";
import { MapPin, Briefcase } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CopyJobLinkButton } from "@/app/components/CopyJobLinkButton";
import { getLocale } from "next-intl/server";

export default async function ApplyPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";
  const job = await prisma.jobPosting.findUnique({ where: { id: jobId } });

  if (!job || !job.isOpen) notFound();

  return (
    <div className="min-h-screen bg-[var(--off-white)]">
      {/* Header bar */}
      <div className="bg-white border-b border-[var(--line)] px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-3xl flex items-center justify-between">
          <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--dark-text)] transition-colors">
            <ArrowLeft size={16} /> {isAr ? "العودة للوظائف" : "Back to Careers"}
          </Link>
          <CopyJobLinkButton jobId={job.id} />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        {/* Job summary card */}
        <div className="bg-[var(--navy)] text-white rounded-xl p-8 mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--gold-light)] mb-2">
            {isAr && job.departmentAr ? job.departmentAr : job.department}
          </p>
          <h1 className="font-serif text-3xl font-semibold mb-4">
            {isAr && job.titleAr ? job.titleAr : job.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/75">
            <span className="flex items-center gap-1.5"><MapPin size={14} />{isAr && job.locationAr ? job.locationAr : job.location}</span>
            <span className="flex items-center gap-1.5"><Briefcase size={14} />{isAr && job.typeAr ? job.typeAr : job.type}</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-[var(--line)] shadow-[0_4px_24px_var(--shadow)] p-8">
          <h2 className="font-serif text-2xl font-semibold text-[var(--dark-text)] mb-2">
            {isAr ? "تقديم طلب التوظيف" : "Your Application"}
          </h2>
          <p className="text-[var(--muted)] text-sm mb-8">
            {isAr ? "أدخل بياناتك أدناه. الحقول المميزة بـ * إلزامية." : "Fill in the details below. Fields marked * are required."}
          </p>
          <ApplicationForm jobId={job.id} jobTitle={isAr && job.titleAr ? job.titleAr : job.title} isAr={isAr} />
        </div>
      </div>
    </div>
  );
}
