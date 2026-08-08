import { prisma } from "@/lib/prisma";
import { ArrowLeft, ExternalLink, FileText, Mail, Phone, Calendar, Briefcase, DollarSign, Clock } from "lucide-react";
import Link from "next/link";

export default async function ApplicationsPage() {
  const applications = await (prisma as any).jobApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: { job: true },
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Link
            href="/admin/careers"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition mb-2"
          >
            <ArrowLeft size={16} /> Back to Job Postings
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Job Applications</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Review candidate details, CVs, and screening responses. Total: {applications.length}
          </p>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-300 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">No applications received yet</h3>
          <p className="text-gray-500 text-sm mt-1">
            Applications submitted by candidates will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {applications.map((app: any) => (
            <div
              key={app.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 bg-amber-50 text-[var(--gold)] text-xs font-bold uppercase rounded-md">
                      {app.jobTitle || app.job?.title}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar size={13} />
                      {new Date(app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">{app.name}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                    <a
                      href={`mailto:${app.email}`}
                      className="flex items-center gap-1.5 hover:text-blue-600 transition"
                    >
                      <Mail size={15} className="text-gray-400" />
                      {app.email}
                    </a>
                    {app.phone && (
                      <a
                        href={`https://wa.me/${app.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 hover:text-emerald-600 transition"
                      >
                        <Phone size={15} className="text-gray-400" />
                        {app.phone}
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={app.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[var(--navy)] hover:bg-blue-900 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
                  >
                    {app.cvType === "LINK" ? <ExternalLink size={16} /> : <FileText size={16} />}
                    {app.cvType === "LINK" ? "View CV Link" : "Download CV File"}
                  </a>
                </div>
              </div>

              {/* Screening Answers */}
              <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg text-sm">
                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                    Employment Status / الوضع الوظيفي
                  </span>
                  <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                    <Briefcase size={14} className="text-[var(--gold)]" />
                    {app.employmentStatus === "EMPLOYED" ? "على رأس عمل حالياً" : "متفرغ وجاهز فوراً"}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                    Notice Period / فترة الإخطار
                  </span>
                  <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                    <Clock size={14} className="text-[var(--gold)]" />
                    {app.noticePeriod || "Not specified"}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                    Years of Experience / الخبرة
                  </span>
                  <span className="font-semibold text-gray-800">
                    {app.yearsOfExperience || "Not specified"}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                    Last Salary / آخر راتب
                  </span>
                  <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                    <DollarSign size={14} className="text-[var(--gold)]" />
                    {app.lastSalary || "Not specified"}
                  </span>
                </div>
              </div>

              {app.coverLetter && (
                <div className="mt-3 text-xs text-gray-600 bg-amber-50/50 border border-amber-100 p-3 rounded-lg">
                  <strong className="text-gray-800">Cover Letter:</strong> {app.coverLetter}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
