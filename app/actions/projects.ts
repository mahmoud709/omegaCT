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

export async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    // console.error("Failed to load projects from DB:", error);
    return [];
  }
}

import cloudinary from "@/lib/cloudinary";

export async function createProject(formData: FormData) {
  await requireAdmin();
  
  const name = formData.get("name") as string;
  if (!name || name.trim().length < 2) throw new Error("Project name is required and must be at least 2 characters");
  
  const nameAr = formData.get("nameAr") as string || "";
  const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;
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
    if (!file.type.startsWith("image/")) throw new Error("Main image must be an image file");
    if (file.size > 5 * 1024 * 1024) throw new Error("Main image must be less than 5MB");
    
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
      if (!gFile.type.startsWith("image/")) throw new Error("Gallery files must be images");
      if (gFile.size > 5 * 1024 * 1024) throw new Error("Gallery files must be less than 5MB");
      
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
  await requireAdmin();
  
  const existingProject = await prisma.project.findUnique({ where: { id } });
  if (!existingProject) throw new Error("Project not found");
  
  const name = formData.get("name") as string;
  if (!name || name.trim().length < 2) throw new Error("Project name is required and must be at least 2 characters");
  
  const nameAr = formData.get("nameAr") as string || "";
  const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;
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
    if (!file.type.startsWith("image/")) throw new Error("Main image must be an image file");
    if (file.size > 5 * 1024 * 1024) throw new Error("Main image must be less than 5MB");
    
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    imageUrl = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "omega_projects" }, function (error, result) {
        if (error) {
          console.error("🔥 CLOUDINARY MAIN IMAGE ERROR:", error);
          reject(error);
        }
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
      if (!gFile.type.startsWith("image/")) throw new Error("Gallery files must be images");
      if (gFile.size > 5 * 1024 * 1024) throw new Error("Gallery files must be less than 5MB");
      
      hasNewGallery = true;
      const gArrayBuffer = await gFile.arrayBuffer();
      const gBuffer = new Uint8Array(gArrayBuffer);

      const gUrl = await new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "omega_projects_gallery" }, function (error, result) {
          if (error) {
            console.error("🔥 CLOUDINARY GALLERY UPLOAD ERROR:", error);
            reject(error);
          }
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
    if (existingProject.galleryImages && existingProject.galleryImages.trim().length > 0) {
      dataToUpdate.galleryImages = existingProject.galleryImages + "," + galleryUrls.join(",");
    } else {
      dataToUpdate.galleryImages = galleryUrls.join(",");
    }
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
  await requireAdmin();
  
  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}
