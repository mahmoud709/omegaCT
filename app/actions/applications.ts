"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
    return { success: true };
  } catch (err) {
    console.error("Failed to update status:", err);
    return { error: "Failed to update application status" };
  }
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
    return { success: true };
  } catch (err: any) {
    console.error("Failed to schedule interview:", err);
    return { error: "Failed to schedule interview" };
  }
}

export async function markAsRead(id: string) {
  try {
    await prisma.jobApplication.update({
      where: { id },
      data: { isRead: true, status: "REVIEWED" },
    });
    revalidatePath("/admin/careers/applications");
    return { success: true };
  } catch (err) {
    console.error("Failed to mark as read:", err);
    return { error: "Failed to mark application as read" };
  }
}
