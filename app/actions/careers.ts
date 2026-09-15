"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { isJobAcceptingApplications } from "@/lib/jobs";

export interface JobPosting {
  id: string;
  jobCode?: string | null;
  title: string;
  titleAr?: string;
  department: string;
  departmentAr?: string;
  location: string;
  locationAr?: string;
  type: string;
  typeAr?: string;
  experience?: string | null;
  experienceAr?: string | null;
  description: string;
  descriptionAr?: string;
  responsibilities?: string | null;
  responsibilitiesAr?: string | null;
  requirements: string;
  requirementsAr?: string;
  education?: string | null;
  educationAr?: string | null;
  preferredExperience?: string | null;
  preferredExperienceAr?: string | null;
  vacancies?: number | null;
  applicationDeadline?: Date | null;
  isFeatured?: boolean | null;
  isOpen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

function requiredString(formData: FormData, key: string) {
  const value = ((formData.get(key) as string) || "").trim();
  if (!value) throw new Error(`${key} is required`);
  return value;
}

function optionalString(formData: FormData, key: string) {
  return ((formData.get(key) as string) || "").trim();
}

function parseVacancies(formData: FormData) {
  const vacancies = Number.parseInt((formData.get("vacancies") as string) || "1", 10);
  if (!Number.isInteger(vacancies) || vacancies < 1) {
    throw new Error("Number of vacancies must be at least 1");
  }
  return vacancies;
}

function parseDeadline(formData: FormData) {
  const raw = optionalString(formData, "applicationDeadline");
  if (!raw) return null;
  const deadline = new Date(`${raw}T00:00:00.000`);
  if (Number.isNaN(deadline.getTime())) {
    throw new Error("Application deadline must be a valid date");
  }
  return deadline;
}

function jobPrefix(title: string, department: string) {
  const source = `${department} ${title}`;
  const words = source
    .replace(/[^a-zA-Z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const initials = words.slice(0, 2).map((word) => word[0].toUpperCase()).join("");
  return initials || "JB";
}

async function generateJobCode(title: string, department: string) {
  const prefix = `OMG-${jobPrefix(title, department)}`;
  const existing: { jobCode?: string | null }[] = await (prisma as any).jobPosting.findMany({
    where: { jobCode: { startsWith: prefix } },
    select: { jobCode: true },
  });
  const used = new Set(existing.map((job) => job.jobCode));

  for (let index = existing.length + 1; index < existing.length + 1000; index += 1) {
    const code = `${prefix}-${String(index).padStart(3, "0")}`;
    if (!used.has(code)) return code;
  }

  return `${prefix}-${Date.now()}`;
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
    const jobs = await (prisma as any).jobPosting.findMany({
      where: { isOpen: true },
      orderBy: { createdAt: "desc" },
    });
    return jobs.filter(isJobAcceptingApplications);
  } catch (error) {
    return [];
  }
}

export async function createJob(formData: FormData) {
  const title = requiredString(formData, "title");
  const titleAr = optionalString(formData, "titleAr");
  const department = requiredString(formData, "department");
  const departmentAr = optionalString(formData, "departmentAr");
  const location = requiredString(formData, "location");
  const locationAr = optionalString(formData, "locationAr");
  const type = requiredString(formData, "type");
  const typeAr = optionalString(formData, "typeAr");
  const experience = requiredString(formData, "experience");
  const experienceAr = optionalString(formData, "experienceAr");
  const description = requiredString(formData, "description");
  const descriptionAr = optionalString(formData, "descriptionAr");
  const responsibilities = requiredString(formData, "responsibilities");
  const responsibilitiesAr = optionalString(formData, "responsibilitiesAr");
  const requirements = requiredString(formData, "requirements");
  const requirementsAr = optionalString(formData, "requirementsAr");
  const education = optionalString(formData, "education");
  const educationAr = optionalString(formData, "educationAr");
  const preferredExperience = optionalString(formData, "preferredExperience");
  const preferredExperienceAr = optionalString(formData, "preferredExperienceAr");
  const vacancies = parseVacancies(formData);
  const applicationDeadline = parseDeadline(formData);
  const isFeatured = formData.get("isFeatured") === "true";
  const isOpen = formData.get("isOpen") === "true";
  const jobCode = await generateJobCode(title, department);

  await (prisma as any).jobPosting.create({
    data: {
      jobCode,
      title,
      titleAr,
      department,
      departmentAr,
      location,
      locationAr,
      type,
      typeAr,
      experience,
      experienceAr,
      description,
      descriptionAr,
      responsibilities,
      responsibilitiesAr,
      requirements,
      requirementsAr,
      education,
      educationAr,
      preferredExperience,
      preferredExperienceAr,
      vacancies,
      applicationDeadline,
      isFeatured,
      isOpen,
    },
  });

  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  return { success: true };
}

export async function updateJob(id: string, formData: FormData) {
  const title = requiredString(formData, "title");
  const titleAr = optionalString(formData, "titleAr");
  const department = requiredString(formData, "department");
  const departmentAr = optionalString(formData, "departmentAr");
  const location = requiredString(formData, "location");
  const locationAr = optionalString(formData, "locationAr");
  const type = requiredString(formData, "type");
  const typeAr = optionalString(formData, "typeAr");
  const experience = requiredString(formData, "experience");
  const experienceAr = optionalString(formData, "experienceAr");
  const description = requiredString(formData, "description");
  const descriptionAr = optionalString(formData, "descriptionAr");
  const responsibilities = requiredString(formData, "responsibilities");
  const responsibilitiesAr = optionalString(formData, "responsibilitiesAr");
  const requirements = requiredString(formData, "requirements");
  const requirementsAr = optionalString(formData, "requirementsAr");
  const education = optionalString(formData, "education");
  const educationAr = optionalString(formData, "educationAr");
  const preferredExperience = optionalString(formData, "preferredExperience");
  const preferredExperienceAr = optionalString(formData, "preferredExperienceAr");
  const vacancies = parseVacancies(formData);
  const applicationDeadline = parseDeadline(formData);
  const isFeatured = formData.get("isFeatured") === "true";
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
      experience,
      experienceAr,
      description,
      descriptionAr,
      responsibilities,
      responsibilitiesAr,
      requirements,
      requirementsAr,
      education,
      educationAr,
      preferredExperience,
      preferredExperienceAr,
      vacancies,
      applicationDeadline,
      isFeatured,
      isOpen,
    },
  });

  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  return { success: true };
}

export async function deleteJob(id: string) {
  await prisma.jobPosting.delete({ where: { id } });
  revalidatePath("/admin/careers");
  revalidatePath("/careers");
  return { success: true };
}
