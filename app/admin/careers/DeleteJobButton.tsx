"use client";

import { useState } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";
import { deleteJob } from "@/app/actions/careers";

export function DeleteJobButton({ id, title }: { id: string; title?: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    await deleteJob(id);
    window.location.reload();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
        title="Delete"
      >
        <Trash2 size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => !loading && setOpen(false)}
          />

          {/* Dialog */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              disabled={loading}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Icon */}
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mx-auto mb-5">
              <AlertTriangle size={28} className="text-red-500" />
            </div>

            {/* Content */}
            <h2 className="text-center text-lg font-bold text-gray-900 mb-2">
              Delete Job Posting?
            </h2>
            <p className="text-center text-sm text-gray-500 leading-6 mb-1">
              You&apos;re about to permanently delete
            </p>
            {title && (
              <p className="text-center text-sm font-semibold text-gray-800 mb-1">
                &ldquo;{title}&rdquo;
              </p>
            )}
            <p className="text-center text-sm text-red-500 font-medium mb-7">
              This action cannot be undone.
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setOpen(false)}
                disabled={loading}
                className="flex-1 py-2.5 px-4 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 py-2.5 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={15} />
                    Yes, Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
