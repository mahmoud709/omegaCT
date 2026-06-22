"use client";

import { Trash2 } from "lucide-react";
import { deleteJob } from "@/app/actions/careers";

export function DeleteJobButton({ id }: { id: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (confirm("Are you sure you want to delete this job posting? This cannot be undone.")) {
          await deleteJob(id);
          window.location.reload();
        }
      }}
      className="text-gray-400 hover:text-red-600 transition-colors"
      title="Delete"
    >
      <Trash2 size={18} />
    </button>
  );
}
