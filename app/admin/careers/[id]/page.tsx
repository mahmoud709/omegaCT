import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { EditJobForm } from "./EditJobForm";

export default async function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await prisma.jobPosting.findUnique({ where: { id } });

  if (!job) notFound();

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
        <EditJobForm job={job} />
      </div>
    </div>
  );
}
