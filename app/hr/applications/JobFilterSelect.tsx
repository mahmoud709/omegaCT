"use client";
import { useRouter } from "next/navigation";

export function JobFilterSelect({
  jobs,
  defaultValue,
  statusFilter,
}: {
  jobs: { id: string; title: string }[];
  defaultValue: string;
  statusFilter?: string;
}) {
  const router = useRouter();

  return (
    <select
      defaultValue={defaultValue}
      onChange={(e) => {
        const params = new URLSearchParams();
        if (statusFilter) params.set("status", statusFilter);
        if (e.target.value) params.set("jobId", e.target.value);
        router.push(`/hr/applications?${params.toString()}`);
      }}
      className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 outline-none focus:border-[var(--gold)]"
    >
      <option value="">All Jobs</option>
      {jobs.map((j) => (
        <option key={j.id} value={j.id}>
          {j.title}
        </option>
      ))}
    </select>
  );
}
