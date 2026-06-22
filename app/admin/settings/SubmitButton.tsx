"use client";

import { useFormStatus } from "react-dom";
import { Upload, Loader2 } from "lucide-react";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-sm transition-colors mt-2 disabled:opacity-50"
    >
      {pending ? (
        <>
          <Loader2 size={14} className="animate-spin" /> Uploading...
        </>
      ) : (
        <>
          <Upload size={14} /> Upload & Save
        </>
      )}
    </button>
  );
}
