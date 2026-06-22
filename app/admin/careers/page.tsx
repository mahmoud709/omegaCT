import { getJobs } from "@/app/actions/careers";
import { Plus, Edit, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { DeleteJobButton } from "./DeleteJobButton";

export default async function CareersManager() {
  const jobs = await getJobs();

  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Careers</h1>
          <p className="text-gray-500 mt-1">Manage all job postings displayed on your site.</p>
        </div>
        <Link
          href="/admin/careers/new"
          className="flex items-center gap-2 bg-[var(--gold)] hover:bg-yellow-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          Add Job
        </Link>
      </header>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-semibold">
            <tr>
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  No job postings yet. Create your first one!
                </td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div>{job.title}</div>
                    {job.titleAr && (
                      <div className="text-xs text-gray-400 mt-0.5" dir="rtl">{job.titleAr}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">{job.department}</td>
                  <td className="px-6 py-4">{job.location}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold">
                      {job.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {job.isOpen ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-md text-xs font-semibold">
                        <CheckCircle size={13} /> Open
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 rounded-md text-xs font-semibold">
                        <XCircle size={13} /> Closed
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/careers/${job.id}`}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <DeleteJobButton id={job.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
