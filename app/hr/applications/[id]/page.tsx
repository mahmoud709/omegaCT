import { getApplication, checkDuplicates, updateStatus, saveHRNotes, markRead } from "@/app/actions/applications";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, FileText, Mail, Phone, Calendar } from "lucide-react";

const PIPELINE = ["NEW", "REVIEWED", "SHORTLISTED", "INTERVIEW", "HIRED", "REJECTED"] as const;
const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700", REVIEWED: "bg-yellow-100 text-yellow-700",
  SHORTLISTED: "bg-purple-100 text-purple-700", INTERVIEW: "bg-orange-100 text-orange-700",
  HIRED: "bg-green-100 text-green-700", REJECTED: "bg-red-100 text-red-600",
};

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = await getApplication(id);
  if (!app) notFound();

  await markRead(id);

  const duplicates = await checkDuplicates(app.email, id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/hr/applications" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
          <ArrowLeft size={15} /> Back to Applications
        </Link>
      </div>

      {/* Duplicate Warning */}
      {duplicates.length > 0 && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <AlertTriangle size={20} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">Duplicate Applicant Detected</p>
            <p className="text-amber-700 text-sm mt-1">
              <strong>{app.email}</strong> has applied {duplicates.length} other time{duplicates.length > 1 ? "s" : ""}:
            </p>
            <ul className="mt-2 space-y-1">
              {duplicates.map(d => (
                <li key={d.id} className="text-xs text-amber-700">
                  • <Link href={`/hr/applications/${d.id}`} className="underline hover:text-amber-900">{d.jobTitle}</Link>
                  {" "}— <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${STATUS_COLORS[d.status]}`}>{d.status}</span>
                  {" "}<span className="opacity-60">({new Date(d.createdAt).toLocaleDateString()})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Main card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{app.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${STATUS_COLORS[app.status]}`}>{app.status}</span>
            </div>
            <p className="text-[var(--gold)] font-medium text-sm">{app.jobTitle}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <a href={`mailto:${app.email}`} className="flex items-center gap-2 text-gray-600 hover:text-[var(--gold)]">
              <Mail size={15} className="text-[var(--gold)]" />{app.email}
            </a>
            {app.phone && <span className="flex items-center gap-2 text-gray-600"><Phone size={15} className="text-[var(--gold)]" />{app.phone}</span>}
            <span className="flex items-center gap-2 text-gray-500"><Calendar size={15} className="text-[var(--gold)]" />{new Date(app.createdAt).toLocaleDateString()}</span>
          </div>

          {app.coverLetter && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wider">Cover Letter</h3>
              <p className="text-gray-600 leading-7 text-sm whitespace-pre-line bg-gray-50 rounded-lg p-4">{app.coverLetter}</p>
            </div>
          )}

          <a href={app.cvUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 border-2 border-dashed border-[var(--gold)] rounded-xl p-5 text-[var(--gold)] hover:bg-[var(--off-white)] transition-colors">
            <FileText size={24} />
            <div><p className="font-semibold">View / Download CV</p><p className="text-xs opacity-70 mt-0.5">Opens PDF in new tab</p></div>
          </a>

          {/* HR Notes */}
          <form action={async (fd: FormData) => {
            "use server";
            await saveHRNotes(id, fd.get("hrNotes") as string);
          }}>
            <h3 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wider">Private HR Notes</h3>
            <textarea name="hrNotes" defaultValue={app.hrNotes} rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition text-sm resize-none"
              placeholder="Add notes visible only to HR team..." />
            <button type="submit" className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">Save Notes</button>
          </form>
        </div>

        {/* Status sidebar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-fit">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Update Status</h3>
          <div className="space-y-2">
            {PIPELINE.map(status => (
              <form key={status} action={async () => { "use server"; await updateStatus(id, status); }}>
                <button type="submit"
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium border transition-all ${
                    app.status === status
                      ? `${STATUS_COLORS[status]} border-current shadow-sm`
                      : "text-gray-600 border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                  }`}>
                  {app.status === status && "✓ "}{status}
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
