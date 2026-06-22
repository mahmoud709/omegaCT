import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Download, Filter } from "lucide-react";
import { JobFilterSelect } from "./JobFilterSelect";

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-100",
  REVIEWED: "bg-yellow-50 text-yellow-700 border-yellow-100",
  SHORTLISTED: "bg-purple-50 text-purple-700 border-purple-100",
  INTERVIEW: "bg-orange-50 text-orange-700 border-orange-100",
  HIRED: "bg-green-50 text-green-700 border-green-100",
  REJECTED: "bg-red-50 text-red-600 border-red-100",
};
const STATUSES = ["ALL", "NEW", "REVIEWED", "SHORTLISTED", "INTERVIEW", "HIRED", "REJECTED"];

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; jobId?: string }>;
}) {
  const sp = await searchParams;
  const statusFilter = sp.status && sp.status !== "ALL" ? sp.status : undefined;
  const jobFilter = sp.jobId;

  const apps = await prisma.jobApplication.findMany({
    where: {
      ...(statusFilter ? { status: statusFilter } : {}),
      ...(jobFilter ? { jobId: jobFilter } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  const jobs = await prisma.jobPosting.findMany({ select: { id: true, title: true }, orderBy: { title: "asc" } });
  const exportUrl = `/api/hr/export${jobFilter ? `?jobId=${jobFilter}` : ""}`;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-500 mt-1">{apps.length} result{apps.length !== 1 ? "s" : ""}</p>
        </div>
        <a href={exportUrl}
          className="flex items-center gap-2 bg-[var(--gold)] hover:bg-yellow-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <Download size={16} /> Export CSV
        </a>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-gray-400" />
          {STATUSES.map(s => (
            <Link key={s} href={`/hr/applications?${new URLSearchParams({ ...(s !== "ALL" ? { status: s } : {}), ...(jobFilter ? { jobId: jobFilter } : {}) }).toString()}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                (s === "ALL" && !statusFilter) || s === (statusFilter || "") 
                  ? "bg-[var(--navy)] text-white border-[var(--navy)]" 
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}>{s}</Link>
          ))}
        </div>
        <JobFilterSelect
          jobs={jobs}
          defaultValue={jobFilter || ""}
          statusFilter={statusFilter}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Applicant</th>
              <th className="px-6 py-4">Position</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Applied</th>
              <th className="px-6 py-4">CV</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {apps.length === 0 ? (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">No applications found.</td></tr>
            ) : apps.map(app => {
              const color = STATUS_COLORS[app.status] || STATUS_COLORS.NEW;
              return (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/hr/applications/${app.id}`} className="font-medium text-gray-900 hover:text-[var(--gold)] flex items-center gap-2">
                      {!app.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" title="Unread" />}
                      {app.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{app.jobTitle}</td>
                  <td className="px-6 py-4 text-gray-500">{app.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${color}`}>{app.status}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{new Date(app.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <a href={app.cvUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--gold)] hover:underline text-xs font-medium">View CV</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
