import { getApplicationCounts } from "@/app/actions/applications";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Users, TrendingUp, CheckCircle, XCircle, Clock, Download } from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  NEW:         { label: "New",         color: "bg-blue-50 text-blue-700 border-blue-100",   icon: Clock },
  REVIEWED:    { label: "Reviewed",    color: "bg-yellow-50 text-yellow-700 border-yellow-100", icon: TrendingUp },
  SHORTLISTED: { label: "Shortlisted", color: "bg-purple-50 text-purple-700 border-purple-100", icon: Users },
  INTERVIEW:   { label: "Interview",   color: "bg-orange-50 text-orange-700 border-orange-100", icon: TrendingUp },
  HIRED:       { label: "Hired",       color: "bg-green-50 text-green-700 border-green-100", icon: CheckCircle },
  REJECTED:    { label: "Rejected",    color: "bg-red-50 text-red-600 border-red-100",     icon: XCircle },
};

export default async function HRDashboard() {
  const counts = await getApplicationCounts();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const recent = await prisma.jobApplication.findMany({
    orderBy: { createdAt: "desc" }, take: 8,
    select: { id: true, name: true, jobTitle: true, status: true, createdAt: true, isRead: true },
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of all job applications</p>
        </div>
        <a href="/api/hr/export"
          className="flex items-center gap-2 border border-gray-200 hover:border-[var(--gold)] text-gray-600 hover:text-[var(--gold)] px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
          <Download size={16} /> Export All CSV
        </a>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="col-span-2 lg:col-span-1 bg-[var(--navy)] rounded-xl p-6 text-white">
          <p className="text-white/60 text-sm">Total Applications</p>
          <p className="text-5xl font-bold mt-2">{total}</p>
        </div>
        {Object.entries(STATUS_CONFIG).map(([status, cfg]) => {
          const Icon = cfg.icon;
          const count = counts[status] || 0;
          return (
            <Link key={status} href={`/hr/applications?status=${status}`}
              className={`rounded-xl p-5 border flex items-center justify-between hover:shadow-md transition-shadow ${cfg.color}`}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider opacity-70">{cfg.label}</p>
                <p className="text-3xl font-bold mt-1">{count}</p>
              </div>
              <Icon size={28} className="opacity-30" />
            </Link>
          );
        })}
      </div>

      {/* Recent applications */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Applications</h2>
          <Link href="/hr/applications" className="text-sm text-[var(--gold)] hover:underline">View all →</Link>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-3">Applicant</th>
              <th className="px-6 py-3">Position</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Applied</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recent.map(app => {
              const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.NEW;
              return (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link href={`/hr/applications/${app.id}`} className="font-medium text-gray-900 hover:text-[var(--gold)]">
                      {!app.isRead && <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 align-middle" />}
                      {app.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{app.jobTitle}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${cfg.color}`}>{cfg.label}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{new Date(app.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
