  import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import CvViewerClient from "./CvViewerClient";

export default async function ViewCvPage({
  searchParams,
}: {
  searchParams: Promise<{ url?: string; name?: string }>;
}) {
  const params = await searchParams;
  const rawUrl = params.url || "";
  const name = params.name || "المتقدم";

  if (!rawUrl) {
    return (
      <div className="p-12 text-center space-y-4 max-w-md mx-auto bg-white border rounded-2xl shadow-sm my-12">
        <FileText size={48} className="mx-auto text-gray-300" />
        <h2 className="text-xl font-bold text-gray-800">رابط الملف غير متوفر</h2>
        <p className="text-sm text-gray-500">لم يتم العثور على رابط السيرة الذاتية المطلوب.</p>
        <Link
          href="/admin/careers/applications"
          className="inline-flex items-center gap-2 bg-[var(--navy)] text-white px-5 py-2.5 rounded-xl font-semibold text-xs"
        >
          <ArrowLeft size={14} /> العودة لطلبات التوظيف
        </Link>
      </div>
    );
  }

  const googleDocsViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(rawUrl)}&embedded=true`;

  return (
    <CvViewerClient
      rawUrl={rawUrl}
      name={name}
      googleDocsViewerUrl={googleDocsViewerUrl}
    />
  );
}
