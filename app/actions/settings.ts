"use server";

import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function uploadWhoWeAreImage(formData: FormData) {
  const imageKey = formData.get("imageKey") as string;
  const file = formData.get("image") as File;

  if (!file || file.size === 0) return;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const imageUrl = await new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: "omega_settings" }, function (error, result) {
      if (error) reject(error);
      else resolve(result?.secure_url as string);
    }).end(buffer);
  });

  await prisma.translation.upsert({
    where: {
      namespace_key: {
        namespace: "Settings",
        key: imageKey,
      },
    },
    update: { en: imageUrl, ar: imageUrl },
    create: { namespace: "Settings", key: imageKey, en: imageUrl, ar: imageUrl },
  });

  revalidatePath("/admin/settings");
  revalidatePath("/");
}
