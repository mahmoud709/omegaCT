"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getApplication(id: string) {
  try {
    return await prisma.jobApplication.findUnique({
      where: { id },
      include: { job: true },
    });
  } catch (err) {
    console.error("Failed to get application:", err);
    return null;
  }
}

export async function checkDuplicates(email: string, currentId?: string) {
  try {
    return await prisma.jobApplication.findMany({
      where: {
        email,
        id: currentId ? { not: currentId } : undefined,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Failed to check duplicates:", err);
    return [];
  }
}

export async function getApplicationCounts() {
  try {
    const apps = await prisma.jobApplication.findMany({
      select: { status: true },
    });
    const counts: Record<string, number> = {
      NEW: 0,
      REVIEWED: 0,
      SHORTLISTED: 0,
      INTERVIEW: 0,
      INTERVIEW_SCHEDULED: 0,
      HIRED: 0,
      REJECTED: 0,
    };
    apps.forEach((app) => {
      const st = app.status || "NEW";
      counts[st] = (counts[st] || 0) + 1;
    });
    return counts;
  } catch (err) {
    console.error("Failed to get application counts:", err);
    return {
      NEW: 0,
      REVIEWED: 0,
      SHORTLISTED: 0,
      INTERVIEW: 0,
      INTERVIEW_SCHEDULED: 0,
      HIRED: 0,
      REJECTED: 0,
    };
  }
}

export async function updateApplicationStatus(id: string, status: string) {
  try {
    await prisma.jobApplication.update({
      where: { id },
      data: {
        status,
        isRead: true,
      },
    });
    revalidatePath("/admin/careers/applications");
    revalidatePath(`/hr/applications/${id}`);
    revalidatePath("/hr/applications");
    return { success: true };
  } catch (err) {
    console.error("Failed to update status:", err);
    return { error: "Failed to update application status" };
  }
}

export const updateStatus = updateApplicationStatus;

export async function saveHRNotes(id: string, hrNotes: string) {
  try {
    await prisma.jobApplication.update({
      where: { id },
      data: { hrNotes },
    });
    revalidatePath(`/hr/applications/${id}`);
    revalidatePath("/admin/careers/applications");
    return { success: true };
  } catch (err) {
    console.error("Failed to save HR notes:", err);
    return { error: "Failed to save HR notes" };
  }
}

export async function markRead(id: string) {
  try {
    await prisma.jobApplication.update({
      where: { id },
      data: { isRead: true },
    });
    revalidatePath(`/hr/applications/${id}`);
    return { success: true };
  } catch (err) {
    console.error("Failed to mark as read:", err);
    return { error: "Failed to mark read" };
  }
}

export async function markAsRead(id: string) {
  return markRead(id);
}

export async function scheduleInterview(data: {
  id: string;
  interviewDate: string;
  interviewTime: string;
  interviewType: string;
  interviewNotes?: string;
}) {
  const formattedNotes = `[INTERVIEW] Date: ${data.interviewDate} | Time: ${data.interviewTime} | Type: ${data.interviewType} | Notes: ${data.interviewNotes || "None"}`;

  try {
    await prisma.jobApplication.update({
      where: { id: data.id },
      data: {
        status: "INTERVIEW_SCHEDULED",
        isRead: true,
        hrNotes: formattedNotes,
      },
    });
    revalidatePath("/admin/careers/applications");
    revalidatePath(`/hr/applications/${data.id}`);
    return { success: true };
  } catch (err: any) {
    console.error("Failed to schedule interview:", err);
    return { error: "Failed to schedule interview" };
  }
}
