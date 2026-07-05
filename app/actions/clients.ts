"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getClients() {
  try {
    return await prisma.client.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    // console.error("Failed to load clients from DB:", error);
    return [];
  }
}

export async function createClient(formData: FormData) {
  const name = formData.get("name") as string;
  const logo = formData.get("logo") as string;

  await prisma.client.create({
    data: {
      name,
      logo: logo || null,
    },
  });

  revalidatePath("/admin/clients");
  revalidatePath("/");
}

export async function deleteClient(id: string) {
  await prisma.client.delete({
    where: { id },
  });

  revalidatePath("/admin/clients");
  revalidatePath("/");
}
