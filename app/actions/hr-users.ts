"use server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/hr-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getHRUsers() {
  return prisma.hrUser.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createHRUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = (formData.get("role") as string) || "RECRUITER";

  if (!name || !email || !password) throw new Error("All fields required");
  if (password.length < 8) throw new Error("Password must be at least 8 characters");

  const existing = await prisma.hrUser.findUnique({ where: { email } });
  if (existing) throw new Error("An account with this email already exists");

  await prisma.hrUser.create({
    data: { name, email, passwordHash: hashPassword(password), role, isActive: true },
  });

  revalidatePath("/admin/hr-users");
  redirect("/admin/hr-users");
}

export async function updateHRUser(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = (formData.get("role") as string) || "RECRUITER";
  const newPassword = formData.get("newPassword") as string;

  const data: Record<string, string> = { name, email, role };
  if (newPassword && newPassword.length >= 8) {
    data.passwordHash = hashPassword(newPassword);
  }

  await prisma.hrUser.update({ where: { id }, data });
  revalidatePath("/admin/hr-users");
  redirect("/admin/hr-users");
}

export async function toggleHRUserActive(id: string, isActive: boolean) {
  await prisma.hrUser.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/hr-users");
}

export async function deleteHRUser(id: string) {
  await prisma.hrUser.delete({ where: { id } });
  revalidatePath("/admin/hr-users");
}
