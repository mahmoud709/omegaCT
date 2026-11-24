"use client";

import { useState, useRef } from "react";
import { ArrowRight, Upload, Link2, CheckCircle, Loader2, MessageSquare, Mail } from "lucide-react";

export function ApplicationForm({ jobId, jobTitle, isAr = false }: { jobId: string; jobTitle: string; isAr?: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [cvType, setCvType] = useState<"FILE" | "LINK">("FILE");
  const [fileName, setFileName] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState<"UNEMPLOYED" | "EMPLOYED">("UNEMPLOYED");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [yearsExp, setYearsExp] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [lastSalary, setLastSalary] = useState("");
  const [noticePeriod, setNoticePeriod] = useState(isAr ? "فوري / جاهز فوراً" : "Immediate / فوراً");

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
        setError(json.error || (isAr ? "فشل إرسال الطلب" : "Failed to submit application"));
        setState("error");
        return;
      }
      setState("success");
    } catch {
      setError(isAr ? "خطأ في الاتصال. حاول مرة أخرى." : "Network error. Please try again.");
      setState("error");
    }
  }

  const getWhatsAppUrl = () => {
    const text = isAr
      ? `السلام عليكم، أود التقديم على وظيفة: ${jobTitle}\n- الاسم: ${name || "----"}\n- رقم الهاتف: ${phone || "----"}\n- الوضع الوظيفي: ${employmentStatus === "EMPLOYED" ? "على رأس عمل حالياً" : "متفرغ وجاهز فوراً"}\n- فترة الإخطار: ${noticePeriod}\n- سنوات الخبرة: ${yearsExp || "----"}\n- الراتب الحالي: ${currentSalary || "----"}\n- الراتب المتوقع: ${lastSalary || "----"}\n- رابط الـ CV: ${cvLink || "مرفق بالرسالة"}`
      : `Hello, I'd like to apply for: ${jobTitle}\n- Name: ${name || "----"}\n- Phone: ${phone || "----"}\n- Status: ${employmentStatus === "EMPLOYED" ? "Currently Employed" : "Available Immediately"}\n- Notice Period: ${noticePeriod}\n- Experience: ${yearsExp || "----"}\n- Current Salary: ${currentSalary || "----"}\n- Expected Salary: ${lastSalary || "----"}\n- CV Link: ${cvLink || "Attached"}`;
    return `https://wa.me/201103144103?text=${encodeURIComponent(text)}`;
  };

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-in zoom-in-95 duration-300">
        <CheckCircle size={64} className="text-green-500 mb-4" />
        <h2 className="font-serif text-3xl font-semibold text-[var(--dark-text)] mb-3">
          {isAr ? "تم إرسال طلبك بنجاح!" : "Application Submitted Successfully!"}
        </h2>
        <p className="text-[var(--muted)] max-w-md leading-relaxed">
          {isAr
            ? `شكراً لتقديمك على وظيفة ${jobTitle}. سيقوم فريق التوظيف بمراجعة طلبك والتواصل معك قريباً.`
            : `Thank you for applying for ${jobTitle}. Our HR recruitment team will review your application and contact you soon.`}
        </p>
      </div>
    );
  }

  const inp = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white text-[var(--dark-text)] text-sm";
  const lbl = "block text-sm font-semibold text-[var(--dark-text)] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-7" dir={isAr ? "rtl" : "ltr"}>
      <input type="hidden" name="jobId" value={jobId} />

      {/* 1. Personal Information */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-[var(--navy)] border-b pb-2 flex items-center gap-2">
          <span>{isAr ? "١. البيانات الشخصية" : "1. Personal Information"}</span>
        </h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className={lbl}>
              {isAr ? "الاسم بالكامل" : "Full Name"} <span className="text-red-500">*</span>
            </label>
            <input name="name" required type="text" className={inp}
              placeholder={isAr ? "مثال: أحمد محمد" : "e.g. Ahmed Mohamed"}
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className={lbl}>
              {isAr ? "البريد الإلكتروني" : "Email Address"} <span className="text-red-500">*</span>
            </label>
            <input name="email" required type="email" className={inp} placeholder="ahmed@example.com" />
          </div>
        </div>
        <div>
          <label className={lbl}>
            {isAr ? "رقم الهاتف (واتساب)" : "Phone Number (WhatsApp)"} <span className="text-red-500">*</span>
          </label>
          <input name="phone" required type="tel" className={inp}
            placeholder="+20 10 0000 0000"
            value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
      </div>

      {/* 2. Screening Questions */}
      <div className="space-y-4 pt-2">
        <h3 className="text-base font-bold text-[var(--navy)] border-b pb-2">
          {isAr ? "٢. أسئلة التقييم" : "2. Screening Questions"}
        </h3>

        {/* Employment Status */}
        <div>
          <label className={lbl}>
            {isAr ? "هل أنت متفرغ أم على رأس عمل؟" : "Are you currently employed or available immediately?"} <span className="text-red-500">*</span>
          </label>
          <div className="grid sm:grid-cols-2 gap-3 mt-2">
            <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
              employmentStatus === "UNEMPLOYED"
                ? "border-[var(--gold)] bg-amber-50/40 font-semibold text-[var(--navy)] shadow-sm"
                : "border-gray-200 hover:border-gray-300 text-gray-700"
            }`}>
              <input type="radio" name="employmentStatusRadio" checked={employmentStatus === "UNEMPLOYED"}
                onChange={() => setEmploymentStatus("UNEMPLOYED")} className="accent-[var(--gold)] size-4" />
              <div>
                <div className="text-sm font-medium">{isAr ? "متفرغ وجاهز فوراً" : "Available Immediately"}</div>
              </div>
            </label>
            <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
              employmentStatus === "EMPLOYED"
                ? "border-[var(--gold)] bg-amber-50/40 font-semibold text-[var(--navy)] shadow-sm"
                : "border-gray-200 hover:border-gray-300 text-gray-700"
            }`}>
              <input type="radio" name="employmentStatusRadio" checked={employmentStatus === "EMPLOYED"}
                onChange={() => setEmploymentStatus("EMPLOYED")} className="accent-[var(--gold)] size-4" />
              <div>
                <div className="text-sm font-medium">{isAr ? "على رأس عمل حالياً" : "Currently Employed"}</div>
              </div>
            </label>
          </div>
        </div>

        {/* Notice Period */}
        <div>
          <label className={lbl}>
            {isAr ? "فترة الإخطار للبدء" : "Notice Period"} <span className="text-red-500">*</span>
          </label>
          <select name="noticePeriod" required className={inp} value={noticePeriod} onChange={(e) => setNoticePeriod(e.target.value)}>
            {isAr ? (
              <>
                <option value="فوري / جاهز فوراً">فوري — جاهز بدون فترة إخطار</option>
                <option value="أسبوع واحد">أسبوع واحد</option>
                <option value="أسبوعان">أسبوعان</option>
                <option value="شهر واحد">شهر واحد</option>
                <option value="شهران أو أكثر">شهران أو أكثر</option>
              </>
            ) : (
              <>
                <option value="Immediate / فوراً">Immediate — Ready with no notice period</option>
                <option value="1 Week / أسبوع">1 Week</option>
                <option value="2 Weeks / أسبوعين">2 Weeks</option>
                <option value="1 Month / شهر">1 Month</option>
                <option value="2 Months+ / شهرين أو أكثر">2 Months+</option>
              </>
            )}
          </select>
        </div>

        {/* Experience & Salary */}
        <div className="grid sm:grid-cols-3 gap-5">
          <div>
            <label className={lbl}>
              {isAr ? "سنوات الخبرة في هذه الوظيفة" : "Years of Experience in this role"} <span className="text-red-500">*</span>
            </label>
            <input name="yearsOfExperience" required type="text" className={inp}
              placeholder={isAr ? "مثال: 6 سنوات" : "e.g. 5 to 8 years"}
              value={yearsExp} onChange={(e) => setYearsExp(e.target.value)} />
          </div>
          <div>
            <label className={lbl}>
              {isAr ? "الراتب الحالي" : "Current Salary"} <span className="text-red-500">*</span>
            </label>
            <input name="currentSalary" required type="text" className={inp}
              placeholder={isAr ? "مثال: 20,000" : "e.g. 20,000"}
              value={currentSalary} onChange={(e) => setCurrentSalary(e.target.value)} />
          </div>
          <div>
            <label className={lbl}>
              {isAr ? "الراتب المتوقع" : "Expected Salary"} <span className="text-red-500">*</span>
            </label>
            <input name="lastSalary" required type="text" className={inp}
              placeholder={isAr ? "مثال: 25,000" : "e.g. 25,000"}
              value={lastSalary} onChange={(e) => setLastSalary(e.target.value)} />
          </div>
        </div>
      </div>

      {/* 3. CV */}
      <div className="space-y-4 pt-2">
        <h3 className="text-base font-bold text-[var(--navy)] border-b pb-2">
          {isAr ? "٣. السيرة الذاتية" : "3. Resume / CV"}
        </h3>
        <div className="flex bg-gray-100 p-1 rounded-lg max-w-md">
          <button type="button" onClick={() => setCvType("FILE")}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
              cvType === "FILE" ? "bg-white text-[var(--navy)] shadow-sm" : "text-gray-500 hover:text-gray-800"
            }`}>
            <Upload size={14} /> {isAr ? "رفع ملف PDF" : "Upload PDF File"}
          </button>
          <button type="button" onClick={() => setCvType("LINK")}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
              cvType === "LINK" ? "bg-white text-[var(--navy)] shadow-sm" : "text-gray-500 hover:text-gray-800"
            }`}>
            <Link2 size={14} /> {isAr ? "رابط Drive / LinkedIn" : "Paste CV Link"}
          </button>
        </div>

        {cvType === "FILE" ? (
          <div onClick={() => fileRef.current?.click()}
            className="w-full border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[var(--gold)] bg-gray-50/50 hover:bg-white transition-all">
            <Upload size={30} className="mx-auto mb-2 text-[var(--gold)]" />
            <p className="text-sm font-medium text-[var(--dark-text)]">
              {fileName || (isAr ? "اضغط هنا لرفع سيرتك الذاتية (PDF فقط)" : "Click here to upload your CV (PDF only)")}
            </p>
            <p className="text-xs text-gray-400 mt-1">{isAr ? "الحجم الأقصى: 5 ميجا" : "Maximum size: 5MB"}</p>
            <input ref={fileRef} name="cv" type="file" accept=".pdf,application/pdf"
              required={cvType === "FILE"} className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
          </div>
        ) : (
          <div>
            <label className={lbl}>
              {isAr ? "رابط السيرة الذاتية (Google Drive / LinkedIn)" : "Paste Google Drive, LinkedIn or Cloud Link"} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Link2 size={18} className="absolute left-3.5 top-3.5 text-gray-400" />
              <input name="cvLink" type="url" required={cvType === "LINK"}
                className={`${inp} pl-10`}
                placeholder="https://drive.google.com/file/d/..."
                value={cvLink} onChange={(e) => setCvLink(e.target.value)} />
            </div>
            <p className="text-xs text-gray-500 mt-1.5">
              {isAr ? "تأكد من ضبط صلاحيات الرابط على \"أي شخص لديه الرابط يمكنه المشاهدة\"." : "Make sure link permissions are set to \"Anyone with link can view\"."}
            </p>
          </div>
        )}
      </div>

      {/* Cover Letter */}
      <div>
        <label className={lbl}>
          {isAr ? "رسالة تقديمية" : "Cover Letter"} <span className="text-gray-400 font-normal">({isAr ? "اختياري" : "Optional"})</span>
        </label>
        <textarea name="coverLetter" rows={3} className={inp}
          placeholder={isAr ? "أضف أي تفاصيل أو ملاحظات للمسؤول عن التوظيف..." : "Add any additional details or notes for the recruiter..."} />
      </div>

      {state === "error" && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-200 px-4 py-3 rounded-lg">{error}</p>
      )}

      {/* Submit Buttons */}
      <div className="space-y-3 pt-2">
        <button type="submit" disabled={state === "loading"}
          className="w-full flex items-center justify-center gap-3 bg-[var(--gold)] hover:bg-yellow-600 text-white font-semibold py-3.5 rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-60">
          {state === "loading" ? (
            <><Loader2 size={18} className="animate-spin" /> {isAr ? "جاري الإرسال..." : "Submitting Application..."}</>
          ) : (
            <>{isAr ? "إرسال الطلب" : "Submit Application via Website"} <ArrowRight size={18} /></>
          )}
        </button>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
            {isAr ? "أو تقدم مباشرة عبر" : "Or Apply Directly Via"}
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
            <MessageSquare size={16} /> {isAr ? "إرسال عبر واتساب" : "Send via WhatsApp"}
          </a>
          <a href={`mailto:hr@omega-tc.com?subject=${encodeURIComponent(`Application for ${jobTitle} - ${name || "Candidate"}`)}&body=${encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nStatus: ${employmentStatus}\nNotice: ${noticePeriod}\nExperience: ${yearsExp}\nCurrent Salary: ${currentSalary}\nExpected Salary: ${lastSalary}\nCV Link: ${cvLink}`)}`}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--navy)] hover:bg-blue-900 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm">
            <Mail size={16} /> {isAr ? "إرسال عبر الإيميل" : "Send via Email"}
          </a>
        </div>
      </div>
    </form>
  );
}
