"use client";

import { useState } from "react";
import { Link2, Check, Share2 } from "lucide-react";

interface CopyJobLinkButtonProps {
  jobId: string;
  isAr?: boolean;
  className?: string;
  variant?: "button" | "icon" | "outline";
}

export function CopyJobLinkButton({
  jobId,
  isAr = false,
  className = "",
  variant = "outline",
}: CopyJobLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const link = `${window.location.origin}/apply/${jobId}`;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(link);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = link;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy job link", err);
    }
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? (isAr ? "تم النسخ!" : "Copied!") : (isAr ? "نسخ رابط الوظيفة" : "Copy Job Link")}
        className={`p-2 rounded border border-gray-200 text-gray-500 hover:border-[var(--gold)] hover:text-[var(--gold)] hover:bg-gray-50 transition-all ${className}`}
      >
        {copied ? (
          <Check size={16} className="text-green-600 animate-in zoom-in-50" />
        ) : (
          <Share2 size={16} />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 h-11 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all shrink-0 whitespace-nowrap ${
        copied
          ? "border-emerald-500 text-emerald-600 bg-emerald-50/90 shadow-sm"
          : "border-gray-200/90 bg-white text-gray-700 hover:border-[#8c6d31] hover:text-[#8c6d31] shadow-xs"
      } ${className}`}
    >
      {copied ? (
        <>
          <Check size={16} className="text-emerald-600 shrink-0 stroke-[2.5]" />
          <span className="whitespace-nowrap">{isAr ? "تم نسخ الرابط!" : "Link Copied!"}</span>
        </>
      ) : (
        <>
          <Link2 size={15} className="shrink-0 text-gray-500" />
          <span className="whitespace-nowrap">{isAr ? "نسخ رابط الوظيفة" : "Copy Job Link"}</span>
        </>
      )}
    </button>
  );
}
