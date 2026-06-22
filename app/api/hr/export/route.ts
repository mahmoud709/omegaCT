import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getHRSession } from "@/lib/hr-auth";

export async function GET(req: NextRequest) {
  const session = await getHRSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId") || undefined;

  const apps = await prisma.jobApplication.findMany({
    where: jobId ? { jobId } : {},
    orderBy: { createdAt: "desc" },
  });

  const headers = ["Name", "Email", "Phone", "Job", "Status", "Applied On", "CV URL", "Cover Letter"];
  const rows = apps.map(a => [
    `"${a.name}"`,
    `"${a.email}"`,
    `"${a.phone}"`,
    `"${a.jobTitle}"`,
    `"${a.status}"`,
    `"${new Date(a.createdAt).toLocaleDateString()}"`,
    `"${a.cvUrl}"`,
    `"${a.coverLetter.replace(/"/g, "'")}"`,
  ]);

  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const filename = jobId ? `applications-${jobId}.csv` : "all-applications.csv";

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
