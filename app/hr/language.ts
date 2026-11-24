import { cookies } from "next/headers";
export async function hrArabic() { return (await cookies()).get("hr_language")?.value === "ar"; }
export function statusLabel(status: string, ar: boolean) {
  const labels: Record<string, string> = { ALL: "الكل", NEW: "جديد", REVIEWED: "تمت المراجعة", SHORTLISTED: "القائمة المختصرة", INTERVIEW: "مقابلة", INTERVIEW_SCHEDULED: "تم تحديد مقابلة", HIRED: "تم التوظيف", REJECTED: "مرفوض" };
  return ar ? (labels[status] || status) : status;
}
