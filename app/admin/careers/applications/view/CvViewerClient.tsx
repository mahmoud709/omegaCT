"use client";

import { Printer, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CvViewerClientProps {
  rawUrl: string;
  name: string;
  googleDocsViewerUrl: string;
}

export default function CvViewerClient({
  rawUrl,
  name,
  googleDocsViewerUrl,
}: CvViewerClientProps) {
  const handlePrint = () => {
    const pdfUrl = `/api/cv-preview?url=${encodeURIComponent(rawUrl)}&name=${encodeURIComponent(name)}`;
    const oldFrame = document.getElementById("native-pdf-print-frame");
    if (oldFrame) oldFrame.remove();

    const printFrame = document.createElement("iframe");
    printFrame.id = "native-pdf-print-frame";
    printFrame.style.position = "fixed";
    printFrame.style.right = "-9999px";
    printFrame.style.bottom = "-9999px";
    printFrame.style.width = "0px";
    printFrame.style.height = "0px";
    printFrame.style.border = "none";
    printFrame.src = pdfUrl;

    document.body.appendChild(printFrame);

    printFrame.onload = () => {
      setTimeout(() => {
        try {
          printFrame.contentWindow?.focus();
          printFrame.contentWindow?.print();
        } catch (e) {
          console.error("Print error fallback:", e);
          window.open(pdfUrl, "_blank");
        }
      }, 400);
    };
  };

  return (
    <div className="flex flex-col h-[calc(100vh-110px)] max-w-7xl mx-auto space-y-4">
      {/* Top Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-200/90 p-4 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/careers/applications"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[var(--navy)] bg-gray-100 hover:bg-gray-200 px-3.5 py-2 rounded-xl transition"
          >
            <ArrowLeft size={15} /> العودة للطلبات
          </Link>
          <div className="h-5 w-px bg-gray-200 hidden sm:block" />
          <h1 className="text-base font-bold text-gray-900">
            معاينة السيرة الذاتية: <span className="text-[var(--gold-dark)]">{name}</span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[var(--navy)] hover:bg-slate-800 px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
          >
            <Printer size={16} className="text-amber-300" />
            <span>طباعة السيرة الذاتية / Print CV</span>
          </button>

          <a
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 px-4 py-2 rounded-xl transition"
          >
            <ExternalLink size={14} /> الرابط المباشر
          </a>
        </div>
      </div>

      {/* Full-height PDF Canvas Viewer Frame */}
      <div className="flex-1 bg-slate-900 border border-gray-300 rounded-2xl overflow-hidden shadow-lg relative min-h-[550px]">
        <iframe
          id="cv-iframe"
          src={googleDocsViewerUrl}
          className="w-full h-full border-0 min-h-[550px]"
          title={`CV Preview - ${name}`}
        />
      </div>
    </div>
  );
}
