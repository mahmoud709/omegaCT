"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getHeroSlides() {
  return await prisma.heroSlide.findMany({
    orderBy: { order: "asc" },
  });
}

import cloudinary from "@/lib/cloudinary";

export async function createHeroSlide(formData: FormData) {
  const order = parseInt(formData.get("order") as string, 10);
  const file = formData.get("image") as File;
  
  if (!file || file.size === 0) return;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const imageUrl = await new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: "omega_hero" }, function (error, result) {
      if (error) reject(error);
      else resolve(result?.secure_url as string);
    }).end(buffer);
  });

  await prisma.heroSlide.create({
    data: {
      imagePath: imageUrl,
      order,
    },
  });

  revalidatePath("/admin/hero");
  revalidatePath("/");
}

export async function deleteHeroSlide(id: string) {
  await prisma.heroSlide.delete({
    where: { id },
  });

  revalidatePath("/admin/hero");
  revalidatePath("/");
}

export async function moveHeroSlide(id: string, direction: "up" | "down") {
  const slides = await prisma.heroSlide.findMany({ orderBy: { order: "asc" } });
  const index = slides.findIndex((s) => s.id === id);
  
  if (index === -1) return;
  if (direction === "up" && index === 0) return;
  if (direction === "down" && index === slides.length - 1) return;

  const currentSlide = slides[index];
  const targetSlide = slides[direction === "up" ? index - 1 : index + 1];

  await prisma.$transaction([
    prisma.heroSlide.update({
      where: { id: currentSlide.id },
      data: { order: targetSlide.order },
    }),
    prisma.heroSlide.update({
      where: { id: targetSlide.id },
      data: { order: currentSlide.order },
    }),
  ]);

  revalidatePath("/admin/hero");
  revalidatePath("/");
}
