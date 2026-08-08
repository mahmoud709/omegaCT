"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface JobPosting {
  id: string;
  title: string;
  titleAr?: string;
  department: string;
  departmentAr?: string;
  location: string;
  locationAr?: string;
  type: string;
  typeAr?: string;
  description: string;
  descriptionAr?: string;
  requirements: string;
  requirementsAr?: string;
  isOpen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getJobs(): Promise<JobPosting[]> {
  try {
    return await (prisma as any).jobPosting.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    return [];
  }
}

export async function getOpenJobs(): Promise<JobPosting[]> {
  try {
    return await (prisma as any).jobPosting.findMany({
      where: { isOpen: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    return [];
  }
}

export async function createJob(formData: FormData) {
  const title = formData.get("title") as string;
  const titleAr = (formData.get("titleAr") as string) || "";
  const department = formData.get("department") as string;
  const departmentAr = (formData.get("departmentAr") as string) || "";
  const location = formData.get("location") as string;
  const locationAr = (formData.get("locationAr") as string) || "";
  const type = formData.get("type") as string;
  const typeAr = (formData.get("typeAr") as string) || "";
  const description = formData.get("description") as string;
  const descriptionAr = (formData.get("descriptionAr") as string) || "";
  const requirements = formData.get("requirements") as string;
  const requirementsAr = (formData.get("requirementsAr") as string) || "";
  const isOpen = formData.get("isOpen") === "true";

  await (prisma as any).jobPosting.create({
    data: {
      title,
      titleAr,
      department,
      departmentAr,
      location,
      locationAr,
      type,
      typeAr,
      description,
      descriptionAr,
      requirements,
      requirementsAr,
      isOpen,
    },
  });

  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  return { success: true };
}

export async function updateJob(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const titleAr = (formData.get("titleAr") as string) || "";
  const department = formData.get("department") as string;
  const departmentAr = (formData.get("departmentAr") as string) || "";
  const location = formData.get("location") as string;
  const locationAr = (formData.get("locationAr") as string) || "";
  const type = formData.get("type") as string;
  const typeAr = (formData.get("typeAr") as string) || "";
  const description = formData.get("description") as string;
  const descriptionAr = (formData.get("descriptionAr") as string) || "";
  const requirements = formData.get("requirements") as string;
  const requirementsAr = (formData.get("requirementsAr") as string) || "";
  const isOpen = formData.get("isOpen") === "true";

  await (prisma as any).jobPosting.update({
    where: { id },
    data: {
      title,
      titleAr,
      department,
      departmentAr,
      location,
      locationAr,
      type,
      typeAr,
      description,
      descriptionAr,
      requirements,
      requirementsAr,
      isOpen,
    },
  });

  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  return { success: true };
}

export async function deleteJob(id: string) {
  await (prisma as any).jobPosting.delete({ where: { id } });
  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  return { success: true };
}
