"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function requireAdmin() {
  const reqCookies = await cookies();
  if (reqCookies.get("admin_session")?.value === "authenticated") {
    return;
  }
  throw new Error("Unauthorized");
}

export async function createContactSubmission(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || "";
    const company = (formData.get("company") as string) || "";
    const projectType = (formData.get("projectType") as string) || "";
    const location = (formData.get("location") as string) || "";
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return { success: false, error: "Name, email, and message are required." };
    }

    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        company,
        projectType,
        location,
        message,
      },
    });

    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save contact message:", error);
    return { success: false, error: error.message || "Failed to submit message." };
  }
}

export async function getContactMessages() {
  await requireAdmin();
  try {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to load contact messages:", error);
    return [];
  }
}

export async function deleteContactMessage(id: string) {
  await requireAdmin();
  try {
    await prisma.contactMessage.delete({ where: { id } });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete contact message:", error);
    return { success: false };
  }
}

export async function markContactMessageRead(id: string, isRead: boolean = true) {
  await requireAdmin();
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error) {
    console.error("Failed to update contact message status:", error);
    return { success: false };
  }
}
