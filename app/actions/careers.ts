"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getJobs() {
  try {
    return await prisma.jobPosting.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    // console.error("Failed to load jobs from DB:", error);
    return [];
  }
}

export async function getOpenJobs() {
  try {
    return await prisma.jobPosting.findMany({
      where: { isOpen: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    // console.error("Failed to load open jobs from DB:", error);
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

  await prisma.jobPosting.create({
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
  redirect("/admin/careers");
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

  await prisma.jobPosting.update({
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
  redirect("/admin/careers");
}

export async function deleteJob(id: string) {
  await prisma.jobPosting.delete({ where: { id } });
  revalidatePath("/admin/careers");
  revalidatePath("/careers");
}
