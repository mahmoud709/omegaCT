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
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/projects");
  revalidatePath("/contact");
  revalidatePath("/partners");
  revalidateTag("profile");
}

export async function updateCompanyProfile(formData: FormData) {
  const keys = ["phone", "mobile", "email", "addressAlex", "addressCairo", "facebook", "linkedin", "instagram", "chairman", "established"];
  
  for (const key of keys) {
    const enVal = formData.get(`${key}En`) as string || "";
    const arVal = formData.get(`${key}Ar`) as string || "";
    
    // We update even if empty, to allow clearing fields
    try {
      await prisma.translation.upsert({
        where: { namespace_key: { namespace: "CompanyProfile", key } },
        update: { en: enVal, ar: arVal },
        create: { namespace: "CompanyProfile", key, en: enVal, ar: arVal },
      });
    } catch (e) {
      console.error(e);
    }
  }

  // Handle Logo Upload
  const logoFile = formData.get("logo") as File;
  if (logoFile && logoFile.size > 0) {
    try {
      const arrayBuffer = await logoFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const imageUrl = await new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "omega_settings" }, function (error, result) {
          if (error) reject(error);
          else resolve(result?.secure_url as string);
        }).end(buffer);
      });
      
      await prisma.translation.upsert({
        where: { namespace_key: { namespace: "CompanyProfile", key: "logo" } },
        update: { en: imageUrl, ar: imageUrl },
        create: { namespace: "CompanyProfile", key: "logo", en: imageUrl, ar: imageUrl },
      });
    } catch(e) {}
  }

  revalidatePath("/", "layout");
}
