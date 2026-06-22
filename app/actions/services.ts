"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

export async function getServices() {
  return await prisma.service.findMany({
    orderBy: { createdAt: "asc" },
  });
}

export async function createService(formData: FormData) {
  const title = formData.get("title") as string;
  const titleAr = formData.get("titleAr") as string || "";
  const summary = formData.get("summary") as string;
  const summaryAr = formData.get("summaryAr") as string || "";
  const description = formData.get("description") as string;
  const descriptionAr = formData.get("descriptionAr") as string || "";
  const scope = formData.get("scope") as string;
  const scopeAr = formData.get("scopeAr") as string || "";
  const icon = formData.get("icon") as string || "Wrench";

  const file = formData.get("image") as File;
  let imageUrl = "";

  if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    imageUrl = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "omega_services" }, function (error, result) {
        if (error) reject(error);
        else resolve(result?.secure_url as string);
      }).end(buffer);
    });
  }

  await prisma.service.create({
    data: {
      title, titleAr,
      summary, summaryAr,
      description, descriptionAr,
      scope, scopeAr,
      icon,
      image: imageUrl,
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function updateService(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const titleAr = formData.get("titleAr") as string || "";
  const summary = formData.get("summary") as string;
  const summaryAr = formData.get("summaryAr") as string || "";
  const description = formData.get("description") as string;
  const descriptionAr = formData.get("descriptionAr") as string || "";
  const scope = formData.get("scope") as string;
  const scopeAr = formData.get("scopeAr") as string || "";
  const icon = formData.get("icon") as string || "Wrench";

  const file = formData.get("image") as File;
  let imageUrl: string | undefined = undefined;

  if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    imageUrl = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "omega_services" }, function (error, result) {
        if (error) reject(error);
        else resolve(result?.secure_url as string);
      }).end(buffer);
    });
  }

  await prisma.service.update({
    where: { id },
    data: {
      title, titleAr,
      summary, summaryAr,
      description, descriptionAr,
      scope, scopeAr,
      icon,
      ...(imageUrl && { image: imageUrl }),
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export async function deleteService(id: string) {
  await prisma.service.delete({
    where: { id },
  });

  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
}
