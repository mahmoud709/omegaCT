"use client";
import { useState, useRef } from "react";
import { ArrowRight, Upload, CheckCircle, Loader2 } from "lucide-react";

export function ApplicationForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/apply", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) { setError(json.error || "Failed to submit"); setState("error"); return; }
      setState("success");
    } catch { setError("Network error. Please try again."); setState("error"); }
  }

  if (state === "success") return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <CheckCircle size={64} className="text-green-500 mb-4" />
      <h2 className="font-serif text-3xl font-semibold text-[var(--dark-text)] mb-3">Application Submitted!</h2>
      <p className="text-[var(--muted)] max-w-md">Thank you for applying to <strong>{jobTitle}</strong>. Our HR team will review your application and get back to you soon.</p>
    </div>
  );

  const inp = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white text-[var(--dark-text)]";
  const lbl = "block text-sm font-medium text-[var(--dark-text)] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="jobId" value={jobId} />
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={lbl}>Full Name *</label>
          <input name="name" required type="text" className={inp} placeholder="Ahmed Mohamed" />
        </div>
        <div>
          <label className={lbl}>Email Address *</label>
          <input name="email" required type="email" className={inp} placeholder="ahmed@email.com" />
        </div>
      </div>
      <div>
        <label className={lbl}>Phone Number</label>
        <input name="phone" type="tel" className={inp} placeholder="+20 10 0000 0000" />
      </div>
      <div>
        <label className={lbl}>Upload CV / Resume * (PDF, max 5MB)</label>
        <div
          onClick={() => fileRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-[var(--gold)] transition-colors"
        >
          <Upload size={28} className="mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-[var(--muted)]">{fileName || "Click to upload your CV (PDF only)"}</p>
          <input
            ref={fileRef}
            name="cv"
            type="file"
            accept=".pdf,application/pdf"
            required
            className="hidden"
            onChange={e => setFileName(e.target.files?.[0]?.name || "")}
          />
        </div>
      </div>
      <div>
        <label className={lbl}>Cover Letter <span className="text-gray-400 font-normal">(optional)</span></label>
        <textarea name="coverLetter" rows={4} className={inp} placeholder="Tell us why you're a great fit for this role..." />
      </div>
      {state === "error" && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-lg">{error}</p>}
      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full flex items-center justify-center gap-3 bg-[var(--gold)] hover:bg-yellow-600 text-white font-semibold py-3.5 rounded-lg transition-colors disabled:opacity-60"
      >
        {state === "loading" ? <><Loader2 size={18} className="animate-spin" /> Submitting...</> : <>Submit Application <ArrowRight size={18} /></>}
      </button>
    </form>
  );
}
