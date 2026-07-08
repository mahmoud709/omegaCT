"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import React from "react";

export function SubmitButton({ 
  children, 
  className,
  loadingText = "Processing..."
}: { 
  children: React.ReactNode; 
  className?: string;
  loadingText?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={className || "w-full flex justify-center items-center gap-2 bg-[var(--gold)] hover:bg-yellow-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"}
    >
      {pending ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
