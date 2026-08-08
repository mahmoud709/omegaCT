"use client";

import { useState, useRef } from "react";
import { ArrowRight, Upload, Link2, CheckCircle, Loader2, MessageSquare, Mail } from "lucide-react";

export function ApplicationForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [cvType, setCvType] = useState<"FILE" | "LINK">("FILE");
  const [fileName, setFileName] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState<"UNEMPLOYED" | "EMPLOYED">("UNEMPLOYED");
  
  // Form fields state for WhatsApp link generator
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [lastSalary, setLastSalary] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("Immediate / فوراً");

  const fileRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("cvType", cvType);
    data.set("employmentStatus", employmentStatus);

    try {
      const res = await fetch("/api/apply", { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Failed to submit application");
        setState("error");
        return;
      }
      setState("success");
    } catch {
      setError("Network error. Please try again.");
      setState("error");
    }
  }

  const getWhatsAppUrl = () => {
    const text = `السلام عليكم، أود التقديم على وظيفة: ${jobTitle}
- الاسم: ${name || "----"}
- رقم الهاتف: ${phone || "----"}
- الوضع الوظيفي: ${employmentStatus === "EMPLOYED" ? "على رأس عمل حالياً" : "متفرغ وجاهز فوراً"}
- فترة الإخطار المطلوب: ${noticePeriod}
- عدد سنوات الخبرة: ${yearsExp || "----"}
- آخر راتب: ${lastSalary || "----"}
- رابط الـ CV: ${cvLink || "مرفق بالرسالة"}`;
    return `https://wa.me/201069771773?text=${encodeURIComponent(text)}`;
  };

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in-95 duration-300">
        <CheckCircle size={64} className="text-green-500 mb-4" />
        <h2 className="font-serif text-3xl font-semibold text-[var(--dark-text)] mb-3">
          Application Submitted Successfully!
        </h2>
        <p className="text-[var(--muted)] max-w-md leading-relaxed">
          Thank you for applying for <strong>{jobTitle}</strong>. Our HR recruitment team will review your application details and contact you soon.
        </p>
      </div>
    );
  }

  const inp =
    "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white text-[var(--dark-text)] text-sm";
  const lbl = "block text-sm font-semibold text-[var(--dark-text)] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <input type="hidden" name="jobId" value={jobId} />

      {/* Basic Contact Info */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[var(--navy)] border-b pb-2 flex items-center gap-2">
          <span>1. Personal Information</span>
          <span className="text-xs text-[var(--gold)] font-normal">(البيانات الشخصية)</span>
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={lbl}>
              Full Name / الاسم بالكامل <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              required
              type="text"
              className={inp}
              placeholder="e.g. Ahmed Mohamed"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className={lbl}>
              Email Address / البريد الإلكتروني <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              required
              type="email"
              className={inp}
              placeholder="ahmed@example.com"
            />
          </div>
        </div>
        <div>
          <label className={lbl}>
            Phone Number / رقم الهاتف (واتساب) <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            required
            type="tel"
            className={inp}
            placeholder="+20 10 0000 0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      {/* Mandatory Screening Questions */}
      <div className="space-y-4 pt-2">
        <h3 className="text-base font-bold text-[var(--navy)] border-b pb-2 flex items-center gap-2">
          <span>2. Screening Questions</span>
          <span className="text-xs text-[var(--gold)] font-normal">(أسئلة التقييم)</span>
        </h3>

        {/* Q1: Employment Status */}
        <div>
          <label className={lbl}>
            Are you currently employed or available immediately? / هل أنت متفرغ أم على رأس عمل؟ <span className="text-red-500">*</span>
          </label>
          <div className="grid sm:grid-cols-2 gap-3 mt-2">
            <label
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                employmentStatus === "UNEMPLOYED"
                  ? "border-[var(--gold)] bg-amber-50/40 font-semibold text-[var(--navy)] shadow-sm"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            >
              <input
                type="radio"
                name="employmentStatusRadio"
                checked={employmentStatus === "UNEMPLOYED"}
                onChange={() => setEmploymentStatus("UNEMPLOYED")}
                className="accent-[var(--gold)] size-4"
              />
              <div>
                <div className="text-sm font-medium">Available Immediately</div>
                <div className="text-xs text-gray-500">متفرغ وجاهز للعمل فوراً</div>
              </div>
            </label>

            <label
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                employmentStatus === "EMPLOYED"
                  ? "border-[var(--gold)] bg-amber-50/40 font-semibold text-[var(--navy)] shadow-sm"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            >
              <input
                type="radio"
                name="employmentStatusRadio"
                checked={employmentStatus === "EMPLOYED"}
                onChange={() => setEmploymentStatus("EMPLOYED")}
                className="accent-[var(--gold)] size-4"
              />
              <div>
                <div className="text-sm font-medium">Currently Employed</div>
                <div className="text-xs text-gray-500">على رأس عمل حالياً</div>
              </div>
            </label>
          </div>
        </div>

        {/* Q2: Notice Period */}
        <div>
          <label className={lbl}>
            {employmentStatus === "EMPLOYED"
              ? "How much notice period do you need to join us? / كم تحتاج من مدة لتنضم إلينا؟ *"
              : "Notice Period / فترة الإخطار للبدء *"}
          </label>
          <select
            name="noticePeriod"
            required
            className={inp}
            value={noticePeriod}
            onChange={(e) => setNoticePeriod(e.target.value)}
          >
            <option value="Immediate / فوراً">Immediate / جاهز فوراً بدون فترة إخطار</option>
            <option value="1 Week / أسبوع">1 Week / أسبوع واحد</option>
            <option value="2 Weeks / أسبوعين">2 Weeks / أسبوعين</option>
            <option value="1 Month / شهر">1 Month / شهر واحد</option>
            <option value="2 Months+ / شهرين أو أكثر">2 Months+ / شهرين أو أكثر</option>
          </select>
        </div>

        {/* Q3 & Q4: Experience & Last Salary */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={lbl}>
              Years of Experience in this role / كم عدد سنوات الخبرة بهذه الوظيفة؟ <span className="text-red-500">*</span>
            </label>
            <input
              name="yearsOfExperience"
              required
              type="text"
              className={inp}
              placeholder="e.g. 5 to 8 years / 6 سنوات"
              value={yearsExp}
              onChange={(e) => setYearsExp(e.target.value)}
            />
          </div>
          <div>
            <label className={lbl}>
              Current / Last Salary (EGP) / كم آخر راتب لك؟ <span className="text-red-500">*</span>
            </label>
            <input
              name="lastSalary"
              required
              type="text"
              className={inp}
              placeholder="e.g. 25,000 EGP"
              value={lastSalary}
              onChange={(e) => setLastSalary(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* CV Options */}
      <div className="space-y-4 pt-2">
        <h3 className="text-base font-bold text-[var(--navy)] border-b pb-2 flex items-center gap-2">
          <span>3. Resume / CV</span>
          <span className="text-xs text-[var(--gold)] font-normal">(السيرة الذاتية)</span>
        </h3>

        {/* Toggle file vs link */}
        <div className="flex bg-gray-100 p-1 rounded-lg max-w-md">
          <button
            type="button"
            onClick={() => setCvType("FILE")}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
              cvType === "FILE"
                ? "bg-white text-[var(--navy)] shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Upload size={14} /> Upload PDF File
          </button>
          <button
            type="button"
            onClick={() => setCvType("LINK")}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
              cvType === "LINK"
                ? "bg-white text-[var(--navy)] shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Link2 size={14} /> Paste CV Link (Drive / LinkedIn)
          </button>
        </div>

        {cvType === "FILE" ? (
          <div>
            <div
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[var(--gold)] bg-gray-50/50 hover:bg-white transition-all"
            >
              <Upload size={30} className="mx-auto mb-2 text-[var(--gold)]" />
              <p className="text-sm font-medium text-[var(--dark-text)]">
                {fileName || "Click here to upload your CV (PDF only)"}
              </p>
              <p className="text-xs text-gray-400 mt-1">Maximum size: 5MB</p>
              <input
                ref={fileRef}
                name="cv"
                type="file"
                accept=".pdf,application/pdf"
                required={cvType === "FILE"}
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
              />
            </div>
          </div>
        ) : (
          <div>
            <label className={lbl}>
              Paste Google Drive, LinkedIn or Cloud Link / رابط السيرة الذاتية <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Link2 size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
              <input
                name="cvLink"
                type="url"
                required={cvType === "LINK"}
                className={`${inp} pl-10`}
                placeholder="https://drive.google.com/file/d/... or LinkedIn profile"
                value={cvLink}
                onChange={(e) => setCvLink(e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              Make sure link permissions are set to &quot;Anyone with link can view&quot;.
            </p>
          </div>
        )}
      </div>

      {/* Cover Letter */}
      <div>
        <label className={lbl}>
          Cover Letter / Cover Note <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <textarea
          name="coverLetter"
          rows={3}
          className={inp}
          placeholder="Add any additional details or notes for the recruiter..."
        />
      </div>

      {state === "error" && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-lg">
          {error}
        </p>
      )}

      {/* Submit Buttons */}
      <div className="space-y-3 pt-2">
        <button
          type="submit"
          disabled={state === "loading"}
          className="w-full flex items-center justify-center gap-3 bg-[var(--gold)] hover:bg-yellow-600 text-white font-semibold py-3.5 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-60"
        >
          {state === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Submitting Application...
            </>
          ) : (
            <>
              Submit Application via Website <ArrowRight size={18} />
            </>
          )}
        </button>

        {/* WhatsApp & Email alternative apply options */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Or Apply Directly Via
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            <MessageSquare size={16} /> Send via WhatsApp
          </a>

          <a
            href={`mailto:info@omega-tc.com?subject=${encodeURIComponent(
              `Application for ${jobTitle} - ${name || "Candidate"}`
            )}&body=${encodeURIComponent(
              `Application Details:\nName: ${name}\nPhone: ${phone}\nStatus: ${employmentStatus}\nNotice: ${noticePeriod}\nExperience: ${yearsExp}\nLast Salary: ${lastSalary}\nCV Link: ${cvLink}`
            )}`}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--navy)] hover:bg-blue-900 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            <Mail size={16} /> Send via Email
          </a>
        </div>
      </div>
    </form>
  );
}
