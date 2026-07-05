"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getApplications(filters?: { jobId?: string; status?: string }) {
  try {
    return await prisma.jobApplication.findMany({
      where: {
        ...(filters?.jobId ? { jobId: filters.jobId } : {}),
        ...(filters?.status && filters.status !== "ALL" ? { status: filters.status } : {}),
      },
      include: { job: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    // console.error("Failed to load applications from DB:", error);
    return [];
  }
}

export async function getApplication(id: string) {
  try {
    return await prisma.jobApplication.findUnique({
      where: { id },
      include: { job: { select: { title: true, department: true } } },
    });
  } catch (error) {
    // console.error("Failed to load application from DB:", error);
    return null;
  }
}

export async function getApplicationCounts() {
  const statuses = ["NEW", "REVIEWED", "SHORTLISTED", "INTERVIEW", "HIRED", "REJECTED"];
  const counts: Record<string, number> = {};
  try {
    for (const s of statuses) {
      counts[s] = await prisma.jobApplication.count({ where: { status: s } });
    }
  } catch (error) {
    console.error("Failed to load application counts from DB:", error);
    for (const s of statuses) counts[s] = 0;
  }
  return counts;
}

export async function getNewCount() {
  try {
    return await prisma.jobApplication.count({ where: { status: "NEW" } });
  } catch {
    return 0;
  }
}

export async function updateStatus(id: string, status: string) {
  await prisma.jobApplication.update({ where: { id }, data: { status, isRead: true } });
  revalidatePath("/hr");
  revalidatePath("/hr/applications");
  revalidatePath(`/hr/applications/${id}`);
}

export async function saveHRNotes(id: string, hrNotes: string) {
  await prisma.jobApplication.update({ where: { id }, data: { hrNotes } });
  revalidatePath(`/hr/applications/${id}`);
}

export async function markRead(id: string) {
  await prisma.jobApplication.update({ where: { id }, data: { isRead: true } });
}

export async function checkDuplicates(email: string, excludeId: string) {
  return prisma.jobApplication.findMany({
    where: { email, id: { not: excludeId } },
    select: { id: true, jobTitle: true, status: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getApplicationsForExport(jobId?: string) {
  return prisma.jobApplication.findMany({
    where: jobId ? { jobId } : {},
    orderBy: { createdAt: "desc" },
  });
}
