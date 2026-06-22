import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ApplicationForm } from "./ApplicationForm";
import { MapPin, Briefcase } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ApplyPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;
  const job = await (prisma as any).jobPosting.findUnique({ where: { id: jobId } });

  if (!job || !job.isOpen) notFound();

  return (
    <div className="min-h-screen bg-[var(--off-white)]">
      {/* Header bar */}
      <div className="bg-white border-b border-[var(--line)] px-5 py-4 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--dark-text)] transition-colors">
            <ArrowLeft size={16} /> Back to Careers
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-8">
        {/* Job summary card */}
        <div className="bg-[var(--navy)] text-white rounded-xl p-8 mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--gold-light)] mb-2">{job.department}</p>
          <h1 className="font-serif text-3xl font-semibold mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/75">
            <span className="flex items-center gap-1.5"><MapPin size={14} />{job.location}</span>
            <span className="flex items-center gap-1.5"><Briefcase size={14} />{job.type}</span>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-[var(--line)] shadow-[0_4px_24px_var(--shadow)] p-8">
          <h2 className="font-serif text-2xl font-semibold text-[var(--dark-text)] mb-2">Your Application</h2>
          <p className="text-[var(--muted)] text-sm mb-8">Fill in the details below. Fields marked * are required.</p>
          <ApplicationForm jobId={job.id} jobTitle={job.title} />
        </div>
      </div>
    </div>
  );
}
