"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  DollarSign,
  Clock,
  Eye,
  User,
  Award,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock3,
  CalendarDays,
  Video,
  MapPin,
  MessageSquare,
  ChevronDown,
  X,
  Filter,
  Printer,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";
import { updateApplicationStatus, scheduleInterview } from "@/app/actions/applications";

const STATUS_MAP: Record<string, { label: string; bg: string; text: string; border: string }> = {
  NEW: { label: "جديد", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  REVIEWED: { label: "تمت المشاهدة", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  SHORTLISTED: { label: "القائمة القصيرة ⭐", bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-300" },
  INTERVIEW_SCHEDULED: { label: "تم تحديد مقابلة 📅", bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-300" },
  REJECTED: { label: "مستبعد ❌", bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  HIRED: { label: "تم التعيين 🎉", bg: "bg-teal-50", text: "text-teal-800", border: "border-teal-300" },
};

function getInterviewDetails(app: any) {
  let dateStr = app.interviewDate ? new Date(app.interviewDate).toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }) : "";
  let timeStr = app.interviewTime || "";
  let typeStr = app.interviewType === "ONLINE" ? "مقابلة أونلاين" : app.interviewType === "PHONE" ? "مقابلة هاتفية" : "مقابلة شخصية بمقر الشركة";
  let notesStr = app.interviewNotes || "";

  if ((!dateStr || dateStr === "Invalid Date") && app.hrNotes && app.hrNotes.includes("[INTERVIEW]")) {
    const matchDate = app.hrNotes.match(/Date:\s*([^|]+)/);
    const matchTime = app.hrNotes.match(/Time:\s*([^|]+)/);
    const matchType = app.hrNotes.match(/Type:\s*([^|]+)/);
    const matchNotes = app.hrNotes.match(/Notes:\s*(.+)/);
    if (matchDate) dateStr = matchDate[1].trim();
    if (matchTime) timeStr = matchTime[1].trim();
    if (matchType) {
      const t = matchType[1].trim();
      typeStr = t === "ONLINE" ? "مقابلة أونلاين" : t === "PHONE" ? "مقابلة هاتفية" : "مقابلة شخصية بالمقر";
    }
    if (matchNotes) notesStr = matchNotes[1].trim();
  }

  return { dateStr: dateStr || "تمت جدولة الموعد", timeStr, typeStr, notesStr };
}

interface ApplicationsClientProps {
  applications: any[];
}

export default function ApplicationsClient({ applications: initialApps }: ApplicationsClientProps) {
  const [apps, setApps] = useState<any[]>(initialApps);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedAppForInterview, setSelectedAppForInterview] = useState<any | null>(null);

  // Form state for scheduling interview
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("10:00 AM");
  const [interviewType, setInterviewType] = useState("IN_PERSON");
  const [interviewNotes, setInterviewNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status Change Handler
  const handleStatusChange = async (appId: string, newStatus: string) => {
    setApps((prev) =>
      prev.map((item) => (item.id === appId ? { ...item, status: newStatus } : item))
    );
    await updateApplicationStatus(appId, newStatus);
  };

  // Schedule Interview Submission
  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppForInterview || !interviewDate) return;

    setIsSubmitting(true);
    const res = await scheduleInterview({
      id: selectedAppForInterview.id,
      interviewDate,
      interviewTime,
      interviewType,
      interviewNotes,
    });

    if (res.success) {
      setApps((prev) =>
        prev.map((item) =>
          item.id === selectedAppForInterview.id
            ? {
                ...item,
                status: "INTERVIEW_SCHEDULED",
                interviewDate: new Date(interviewDate),
                interviewTime,
                interviewType,
                interviewNotes,
              }
            : item
        )
      );
      setSelectedAppForInterview(null);
      setInterviewDate("");
      setInterviewNotes("");
    }
    setIsSubmitting(false);
  };

  // Filter today's interviews
  const todayStr = new Date().toISOString().split("T")[0];
  const todayInterviews = apps.filter((a) => {
    if (a.status !== "INTERVIEW_SCHEDULED") return false;
    const details = getInterviewDetails(a);
    return details.dateStr && (details.dateStr === todayStr || details.dateStr.includes(todayStr));
  });

  // Filtered applications
  const filteredApps = apps.filter((app) => {
    let matchesStatus = false;
    if (filterStatus === "ALL") {
      matchesStatus = true;
    } else if (filterStatus === "TODAY_INTERVIEWS") {
      if (app.status === "INTERVIEW_SCHEDULED") {
        const d = getInterviewDetails(app);
        matchesStatus = Boolean(d.dateStr && (d.dateStr === todayStr || d.dateStr.includes(todayStr)));
      } else {
        matchesStatus = false;
      }
    } else {
      matchesStatus = app.status === filterStatus;
    }

    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      app.name?.toLowerCase().includes(q) ||
      app.email?.toLowerCase().includes(q) ||
      app.phone?.includes(q) ||
      app.jobTitle?.toLowerCase().includes(q) ||
      app.jobCode?.toLowerCase().includes(q) ||
      app.job?.jobCode?.toLowerCase().includes(q);

    return matchesStatus && matchesQuery;
  });

  // Calculate stats
  const totalCount = apps.length;
  const newCount = apps.filter((a) => a.status === "NEW").length;
  const interviewCount = apps.filter((a) => a.status === "INTERVIEW_SCHEDULED").length;
  const shortlistedCount = apps.filter((a) => a.status === "SHORTLISTED").length;

  // Export to Excel / CSV with UTF-8 BOM
  const handleExportCSV = () => {
    const headers = [
      "اسم المتقدم",
      "الوظيفة",
      "رقم الهاتف",
      "البريد الإلكتروني",
      "حالة الطلب",
      "تاريخ المقابلة",
      "وقت المقابلة",
      "نوع المقابلة",
      "الوضع الوظيفي",
      "سنوات الخبرة",
      "الراتب المتوقع",
      "الملاحظات",
    ];

    const rows = filteredApps.map((app) => {
      const details = getInterviewDetails(app);
      return [
        `"${app.name || ""}"`,
        `"${app.jobTitle || app.job?.title || ""}"`,
        `"${app.phone || ""}"`,
        `"${app.email || ""}"`,
        `"${STATUS_MAP[app.status]?.label || app.status}"`,
        `"${details.dateStr || ""}"`,
        `"${details.timeStr || ""}"`,
        `"${details.typeStr || ""}"`,
        `"${app.employmentStatus === "EMPLOYED" ? "على رأس عمل" : "متفرغ"}"`,
        `"${app.yearsOfExperience || ""}"`,
        `"${app.lastSalary || ""}"`,
        `"${(details.notesStr || app.hrNotes || "").replace(/"/g, '""')}"`,
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `جدول_المقابلات_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print schedule summary table
  const handlePrintSchedule = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const rowsHtml = filteredApps
      .map((app) => {
        const details = getInterviewDetails(app);
        return `
          <tr>
            <td style="padding:10px; border:1px solid #ddd; font-weight:bold;">${app.name}</td>
            <td style="padding:10px; border:1px solid #ddd;">${app.jobTitle || app.job?.title || "-"}</td>
            <td style="padding:10px; border:1px solid #ddd;" dir="ltr">${app.phone || "-"}</td>
            <td style="padding:10px; border:1px solid #ddd;">${details.dateStr} ${details.timeStr}</td>
            <td style="padding:10px; border:1px solid #ddd;">${details.typeStr}</td>
            <td style="padding:10px; border:1px solid #ddd;">${app.yearsOfExperience ? app.yearsOfExperience + " سنوات" : "-"}</td>
            <td style="padding:10px; border:1px solid #ddd;">${details.notesStr || "-"}</td>
          </tr>
        `;
      })
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <title>كشف المتقدمين والمقابلات - أوميجا للمقاولات</title>
        <style>
          body { font-family: system-ui, -apple-system, Roboto, sans-serif; padding: 25px; color: #111; }
          h2 { margin-bottom: 5px; color: #0f172a; }
          p { color: #64748b; font-size: 13px; margin-top: 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 13px; }
          th { background: #0f172a; color: #fff; padding: 10px; border: 1px solid #0f172a; text-align: right; }
        </style>
      </head>
      <body>
        <h2>📋 كشف جدول المتقدمين والمقابلات</h2>
        <p>تاريخ التقرير: ${new Date().toLocaleDateString("ar-EG")} | إجمالي الطلبات بالتقرير: ${filteredApps.length}</p>
        <table>
          <thead>
            <tr>
              <th>اسم المتقدم</th>
              <th>الوظيفة</th>
              <th>رقم الهاتف</th>
              <th>موعد المقابلة</th>
              <th>نوع المقابلة</th>
              <th>الخبرة</th>
              <th>ملاحظات</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <Link
            href="/admin/careers"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[var(--navy)] transition mb-3 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg"
          >
            <ArrowLeft size={14} className="rotate-180" /> العودة لإدارة الوظائف
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              نظام إدارة طلبات التوظيف (ATS)
            </h1>
            <span className="bg-[var(--gold)]/10 text-[var(--gold-dark)] font-bold text-xs px-3 py-1 rounded-full border border-[var(--gold)]/30">
              {totalCount} طلب مقدم
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">
            متابعة حالة المتقدمين، تحديد مواعيد المقابلات، ومعاينة وطباعة السير الذاتية.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
          >
            <FileSpreadsheet size={15} /> تصدير إكسل (Excel)
          </button>

          <button
            onClick={handlePrintSchedule}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm cursor-pointer"
          >
            <Printer size={15} className="text-amber-300" /> طباعة الجدول
          </button>

          <Link
            href="/admin/careers/new"
            className="inline-flex items-center gap-2 bg-[var(--gold)] hover:bg-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
          >
            <Sparkles size={15} /> إضافة وظيفة جديدة
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setFilterStatus("ALL")}
          className="bg-white border border-gray-200/90 hover:border-slate-400 rounded-2xl p-4 shadow-sm flex items-center gap-3 text-right transition cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[var(--navy)] flex items-center justify-center shrink-0">
            <Layers size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">{totalCount}</div>
            <div className="text-xs text-gray-500 font-medium">إجمالي الطلبات</div>
          </div>
        </button>

        <button
          onClick={() => setFilterStatus("NEW")}
          className="bg-white border border-blue-200/90 hover:border-blue-400 rounded-2xl p-4 shadow-sm flex items-center gap-3 text-right transition cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-700">{newCount}</div>
            <div className="text-xs text-gray-500 font-medium">طلبات جديدة</div>
          </div>
        </button>

        <button
          onClick={() => setFilterStatus("TODAY_INTERVIEWS")}
          className="bg-white border border-emerald-200/90 hover:border-emerald-400 rounded-2xl p-4 shadow-sm flex items-center gap-3 text-right transition cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <CalendarDays size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-700">{interviewCount}</div>
            <div className="text-xs text-gray-500 font-medium">مقابلات اليوم</div>
          </div>
        </button>

        <button
          onClick={() => setFilterStatus("SHORTLISTED")}
          className="bg-white border border-amber-200/90 hover:border-amber-400 rounded-2xl p-4 shadow-sm flex items-center gap-3 text-right transition cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Award size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-amber-700">{shortlistedCount}</div>
            <div className="text-xs text-gray-500 font-medium">القائمة القصيرة</div>
          </div>
        </button>
      </div>

      {/* Today's Interviews Banner */}
      {todayInterviews.length > 0 && (
        <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
            <div className="flex items-center gap-2 font-bold text-lg text-emerald-300">
              <CalendarDays size={20} />
              <span>مقابلات اليوم ({todayInterviews.length})</span>
            </div>
            <span className="text-xs bg-emerald-800 text-emerald-100 px-3 py-1 rounded-full font-medium">
              جدول اليوم المحدد
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {todayInterviews.map((app) => {
              const details = getInterviewDetails(app);
              return (
                <div
                  key={app.id}
                  className="bg-emerald-950/80 border border-emerald-800 p-4 rounded-xl flex items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="font-bold text-white text-base">{app.name}</h4>
                    <div className="text-xs text-emerald-300 font-medium mt-0.5">
                      {app.jobTitle || app.job?.title}
                    </div>
                    <div className="text-xs text-emerald-200 flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 font-bold">
                        <Clock size={13} /> {details.timeStr || "موعد محدد"}
                      </span>
                      <span>
                        ({details.typeStr})
                      </span>
                    </div>
                  </div>

                {app.phone && (
                  <a
                    href={`https://wa.me/${app.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold px-3 py-2 rounded-lg transition shrink-0"
                  >
                    <MessageSquare size={14} /> تذكير واتساب
                  </a>
                )}
              </div>
            );
          })}
          </div>
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-gray-200/90 p-4 rounded-2xl shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterStatus("ALL")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterStatus === "ALL"
                ? "bg-[var(--navy)] text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            الكل ({totalCount})
          </button>
          <button
            onClick={() => setFilterStatus("NEW")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterStatus === "NEW"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
          >
            جديد ({newCount})
          </button>
          <button
            onClick={() => setFilterStatus("TODAY_INTERVIEWS")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              filterStatus === "TODAY_INTERVIEWS"
                ? "bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-300"
                : "bg-emerald-100 text-emerald-900 hover:bg-emerald-200"
            }`}
          >
            <CalendarDays size={14} /> مقابلات اليوم ({todayInterviews.length})
          </button>
          <button
            onClick={() => setFilterStatus("INTERVIEW_SCHEDULED")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterStatus === "INTERVIEW_SCHEDULED"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
            }`}
          >
            مقابلات محددة ({interviewCount})
          </button>
          <button
            onClick={() => setFilterStatus("SHORTLISTED")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterStatus === "SHORTLISTED"
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-amber-50 text-amber-800 hover:bg-amber-100"
            }`}
          >
            القائمة القصيرة ({shortlistedCount})
          </button>
          <button
            onClick={() => setFilterStatus("REJECTED")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
              filterStatus === "REJECTED"
                ? "bg-rose-600 text-white shadow-sm"
                : "bg-rose-50 text-rose-700 hover:bg-rose-100"
            }`}
          >
            مستبعد
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="بحث بالاسم، البريد، أو الوظيفة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 bg-gray-50 border border-gray-200 text-xs rounded-xl px-4 py-2.5 outline-none focus:border-[var(--gold)] transition"
          />
        </div>
      </div>

      {/* Applications List */}
      {filteredApps.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center space-y-3 shadow-sm">
          <FileText size={48} className="mx-auto text-gray-300" />
          <h3 className="text-lg font-bold text-gray-800">لا توجد نتائج مطابقة</h3>
          <p className="text-gray-500 text-xs">جرب تغيير الفلتر أو كلمة البحث.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredApps.map((app: any) => {
            const isLink = app.cvType === "LINK";
            const viewUrl = isLink
              ? app.cvUrl
              : `/admin/careers/applications/view?url=${encodeURIComponent(app.cvUrl)}&name=${encodeURIComponent(app.name)}`;

            const initial = (app.name || "M").trim().charAt(0).toUpperCase();
            const statusConfig = STATUS_MAP[app.status] || STATUS_MAP.NEW;

            return (
              <div
                key={app.id}
                className="bg-white border border-gray-200/90 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-400/50 transition-all duration-200 overflow-hidden"
              >
                {/* Top Section */}
                <div className="p-6 bg-gradient-to-r from-gray-50/50 via-white to-gray-50/30 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--navy)] to-slate-800 text-amber-300 font-bold text-lg flex items-center justify-center shrink-0 shadow-sm border border-slate-700/50">
                      {initial}
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight" dir="auto">
                          {app.name}
                        </h2>

                        {/* Status Badge Selector */}
                        <div className="relative inline-block">
                          <select
                            value={app.status || "NEW"}
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            className={`text-xs font-bold px-3 py-1 rounded-full border cursor-pointer outline-none appearance-none pr-6 ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
                          >
                            <option value="NEW">🆕 جديد (NEW)</option>
                            <option value="REVIEWED">👁️ تمت المشاهدة (REVIEWED)</option>
                            <option value="SHORTLISTED">⭐ القائمة القصيرة (SHORTLISTED)</option>
                            <option value="INTERVIEW_SCHEDULED">📅 مقابلة محددة (INTERVIEW)</option>
                            <option value="HIRED">🎉 تم التعيين (HIRED)</option>
                            <option value="REJECTED">❌ مستبعد (REJECTED)</option>
                          </select>
                          <ChevronDown size={12} className="absolute left-2 top-1.2 font-bold pointer-events-none text-current opacity-70" />
                        </div>

                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 border border-gray-200 text-xs font-bold rounded-full">
                          <Briefcase size={12} />
                          {app.jobTitle || app.job?.title || "وظيفة عامة"}
                        </span>
                      </div>

                      {(app.jobCode || app.job?.jobCode) && (
                        <span className="inline-flex items-center px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold rounded-full font-mono">
                          {app.jobCode || app.job?.jobCode}
                        </span>
                      )}

                      {/* Contacts Row */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 pt-0.5">
                        <a
                          href={`mailto:${app.email}`}
                          className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 px-3 py-1 rounded-lg transition font-medium text-gray-700"
                        >
                          <Mail size={13} className="text-gray-400" />
                          <span>{app.email}</span>
                        </a>

                        {app.phone && (
                          <a
                            href={`https://wa.me/${app.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 px-3 py-1 rounded-lg transition font-medium"
                          >
                            <Phone size={13} className="text-emerald-600" />
                            <span>{app.phone} (واتساب)</span>
                          </a>
                        )}

                        <span className="inline-flex items-center gap-1 text-gray-400 text-xs mr-2">
                          <Calendar size={13} />
                          {new Date(app.createdAt).toLocaleDateString("ar-EG", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <button
                      onClick={() => setSelectedAppForInterview(app)}
                      className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs px-4 py-2.5 rounded-xl transition shadow-sm"
                    >
                      <CalendarDays size={15} />
                      <span>تحديد موعد مقابلة</span>
                    </button>

                    <a
                      href={viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[var(--navy)] hover:bg-slate-900 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm group"
                    >
                      <Eye size={15} className="text-amber-300 group-hover:scale-110 transition-transform" />
                      <span>معاينة وتنزيل الـ CV</span>
                    </a>
                  </div>
                </div>

                {/* Scheduled Interview Box if available */}
                {app.status === "INTERVIEW_SCHEDULED" && (() => {
                  const details = getInterviewDetails(app);
                  return (
                    <div className="bg-emerald-50/80 border-b border-emerald-100 p-4 px-6 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs text-emerald-950 font-medium">
                      <div className="flex items-center gap-2 font-bold">
                        <CalendarDays size={16} className="text-emerald-700" />
                        <span>موعد المقابلة المحدد:</span>
                        <span className="text-emerald-800 bg-white border border-emerald-200 px-3 py-1 rounded-lg">
                          {details.dateStr} {details.timeStr ? `الساعة ${details.timeStr}` : ""}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="bg-emerald-200/70 text-emerald-900 font-bold px-2.5 py-0.5 rounded-md">
                          {details.typeStr}
                        </span>
                        {details.notesStr && details.notesStr !== "None" && (
                          <span className="text-emerald-700 italic">"{details.notesStr}"</span>
                        )}
                      </div>
                    </div>
                  );
                })()}

                {/* Content Section */}
                <div className="p-6 space-y-5">
                  {/* Screening Grid */}
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Award size={14} className="text-[var(--gold)]" />
                      بيانات التقييم والخبرة الميدانية
                    </h3>

                    <div className="grid grid-cols-2 lg:grid-cols-7 gap-3">
                      <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                        <span className="text-[11px] font-semibold text-gray-400 block">
                          Job Location
                        </span>
                        <div className="font-bold text-xs text-gray-800 flex items-center gap-1.5" dir="auto">
                          <MapPin size={14} className="text-[var(--gold)] shrink-0" />
                          <span>{app.job?.location || "-"}</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                        <span className="text-[11px] font-semibold text-gray-400 block">
                          Required Experience
                        </span>
                        <div className="font-bold text-xs text-gray-800 flex items-center gap-1.5" dir="auto">
                          <Award size={14} className="text-[var(--gold)] shrink-0" />
                          <span>{app.job?.experience || "-"}</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                        <span className="text-[11px] font-semibold text-gray-400 block">
                          الوضع الوظيفي الحالي
                        </span>
                        <div className="font-bold text-xs text-gray-800 flex items-center gap-1.5" dir="auto">
                          <Briefcase size={14} className="text-[var(--gold)] shrink-0" />
                          <span>
                            {app.employmentStatus === "EMPLOYED"
                              ? "على رأس عمل حالياً"
                              : app.employmentStatus || "متفرغ وجاهز فوراً"}
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                        <span className="text-[11px] font-semibold text-gray-400 block">
                          فترة الإخطار المتاحة
                        </span>
                        <div className="font-bold text-xs text-gray-800 flex items-center gap-1.5" dir="auto">
                          <Clock size={14} className="text-[var(--gold)] shrink-0" />
                          <span>{app.noticePeriod || "غير محدد / فوري"}</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                        <span className="text-[11px] font-semibold text-gray-400 block">
                          سنوات الخبرة
                        </span>
                        <div className="font-bold text-xs text-gray-800 flex items-center gap-1.5" dir="auto">
                          <User size={14} className="text-[var(--gold)] shrink-0" />
                          <span>
                            {app.yearsOfExperience
                              ? `${app.yearsOfExperience} سنوات`
                              : "غير محدد"}
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                        <span className="text-[11px] font-semibold text-gray-400 block">
                          الراتب المتوقع
                        </span>
                        <div className="font-bold text-xs text-gray-800 flex items-center gap-1.5" dir="auto">
                          <DollarSign size={14} className="text-[var(--gold)] shrink-0" />
                          <span>{app.lastSalary || "غير محدد"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                    <span className="text-[11px] font-semibold text-gray-400 block">
                      الراتب الحالي
                    </span>
                    <div className="font-bold text-xs text-gray-800 flex items-center gap-1.5" dir="auto">
                      <DollarSign size={14} className="text-[var(--gold)] shrink-0" />
                      <span>{app.currentSalary || "غير محدد"}</span>
                    </div>
                  </div>

                  {/* Cover Letter */}
                  {app.coverLetter && (
                    <div className="bg-amber-50/40 border-r-4 border-r-[var(--gold)] border border-amber-100/80 p-4 rounded-xl space-y-1.5" dir="auto">
                      <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                        💬 خطاب التقديم / Cover Letter:
                      </span>
                      <p className="text-xs text-gray-800 whitespace-pre-line leading-relaxed font-medium">
                        {app.coverLetter}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Schedule Interview Modal */}
      {selectedAppForInterview && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-5 relative">
            <button
              onClick={() => setSelectedAppForInterview(null)}
              className="absolute left-4 top-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={20} />
            </button>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <CalendarDays size={20} className="text-[var(--gold)]" />
                تحديد موعد مقابلة للمتقدم
              </h3>
              <p className="text-xs text-gray-500">
                تحديد موعد مقابلة لـ: <strong className="text-gray-900">{selectedAppForInterview.name}</strong> ({selectedAppForInterview.jobTitle || selectedAppForInterview.job?.title})
              </p>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  تاريخ المقابلة *
                </label>
                <input
                  type="date"
                  required
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl p-3 outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  وقت المقابلة *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: 10:30 AM أو 02:00 PM"
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl p-3 outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  نوع المقابلة
                </label>
                <select
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl p-3 outline-none focus:border-[var(--gold)]"
                >
                  <option value="IN_PERSON">مقابلة شخصية بمقر الشركة</option>
                  <option value="ONLINE">مقابلة أونلاين (Zoom / Google Meet)</option>
                  <option value="PHONE">مقابلة هاتفية</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  ملاحظات موجهة للمقابل أو المتقدم (اختياري)
                </label>
                <textarea
                  rows={3}
                  placeholder="عنوان الفرع، رابط الاجتماع، أو أي تعليمات خاصة..."
                  value={interviewNotes}
                  onChange={(e) => setInterviewNotes(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl p-3 outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAppForInterview(null)}
                  className="px-4 py-2.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[var(--navy)] hover:bg-slate-800 rounded-xl transition shadow-sm disabled:opacity-50"
                >
                  {isSubmitting ? "جاري الحفظ..." : "حفظ الموعد وتأكيده"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
