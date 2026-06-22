"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
}

import cloudinary from "@/lib/cloudinary";

export async function createProject(formData: FormData) {
  const name = formData.get("name") as string;
  const nameAr = formData.get("nameAr") as string || "";
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const location = formData.get("location") as string;
  const locationAr = formData.get("locationAr") as string || "";
  const category = formData.get("category") as string;
  const categoryAr = formData.get("categoryAr") as string || "";
  const status = formData.get("status") as string;
  const statusAr = formData.get("statusAr") as string || "";
  const details = formData.get("details") as string;
  const detailsAr = formData.get("detailsAr") as string || "";
  const role = formData.get("role") as string;
  const roleAr = formData.get("roleAr") as string || "";
  
  // Cloudinary Upload Logic for Main Image
  const file = formData.get("image") as File;
  let imageUrl = "";

  if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    imageUrl = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "omega_projects" }, function (error, result) {
        if (error) reject(error);
        else resolve(result?.secure_url as string);
      }).end(buffer);
    });
  }

  // Cloudinary Upload Logic for Gallery Images
  const galleryFiles = formData.getAll("galleryImages") as File[];
  const galleryUrls: string[] = [];

  for (const gFile of galleryFiles) {
    if (gFile && gFile.size > 0) {
      const gArrayBuffer = await gFile.arrayBuffer();
      const gBuffer = new Uint8Array(gArrayBuffer);

      const gUrl = await new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "omega_projects_gallery" }, function (error, result) {
          if (error) reject(error);
          else resolve(result?.secure_url as string);
        }).end(gBuffer);
      });
      galleryUrls.push(gUrl);
    }
  }

  const galleryImages = galleryUrls.join(",");

  await prisma.project.create({
    data: {
      name,
      nameAr,
      slug,
      location,
      locationAr,
      category,
      categoryAr,
      status,
      statusAr,
      details,
      detailsAr,
      role,
      roleAr,
      image: imageUrl,
      galleryImages,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function updateProject(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const nameAr = formData.get("nameAr") as string || "";
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const location = formData.get("location") as string;
  const locationAr = formData.get("locationAr") as string || "";
  const category = formData.get("category") as string;
  const categoryAr = formData.get("categoryAr") as string || "";
  const status = formData.get("status") as string;
  const statusAr = formData.get("statusAr") as string || "";
  const details = formData.get("details") as string;
  const detailsAr = formData.get("detailsAr") as string || "";
  const role = formData.get("role") as string;
  const roleAr = formData.get("roleAr") as string || "";
  
  // Cloudinary Upload Logic for Main Image (Optional)
  const file = formData.get("image") as File;
  let imageUrl: string | undefined = undefined;

  if (file && file.size > 0) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    imageUrl = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "omega_projects" }, function (error, result) {
        if (error) reject(error);
        else resolve(result?.secure_url as string);
      }).end(buffer);
    });
  }

  // Cloudinary Upload Logic for Gallery Images (Optional)
  const galleryFiles = formData.getAll("galleryImages") as File[];
  const galleryUrls: string[] = [];
  let hasNewGallery = false;

  for (const gFile of galleryFiles) {
    if (gFile && gFile.size > 0) {
      hasNewGallery = true;
      const gArrayBuffer = await gFile.arrayBuffer();
      const gBuffer = new Uint8Array(gArrayBuffer);

      const gUrl = await new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "omega_projects_gallery" }, function (error, result) {
          if (error) reject(error);
          else resolve(result?.secure_url as string);
        }).end(gBuffer);
      });
      galleryUrls.push(gUrl);
    }
  }

  const dataToUpdate: any = {
    name,
    nameAr,
    slug,
    location,
    locationAr,
    category,
    categoryAr,
    status,
    statusAr,
    details,
    detailsAr,
    role,
    roleAr,
  };

  if (imageUrl) {
    dataToUpdate.image = imageUrl;
  }
  
  if (hasNewGallery) {
    dataToUpdate.galleryImages = galleryUrls.join(",");
  }

  await prisma.project.update({
    where: { id },
    data: dataToUpdate,
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}


export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}
