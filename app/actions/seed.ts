"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { clients, projects, heroSlides } from "@/app/data/site";

export async function seedDatabase() {
  // 1. Seed Clients
  for (const client of clients) {
    await prisma.client.upsert({
      where: { name: client },
      update: {},
      create: { name: client, logo: null },
    });
  }

  // 2. Seed Hero Slides
  // Clear old slides first to avoid duplication
  await prisma.heroSlide.deleteMany({});
  for (let i = 0; i < heroSlides.length; i++) {
    await prisma.heroSlide.create({
      data: {
        imagePath: heroSlides[i],
        order: i + 1,
      },
    });
  }

  // 3. Seed Projects
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        name: project.name,
        location: project.location,
        category: project.category,
        status: project.status,
        details: project.details,
        role: project.role,
        image: project.image,
        galleryImages: project.galleryImages.join(", "),
      },
      create: {
        slug: project.slug,
        name: project.name,
        location: project.location,
        category: project.category,
        status: project.status,
        details: project.details,
        role: project.role,
        image: project.image,
        galleryImages: project.galleryImages.join(", "),
      },
    });
  }

  // 4. Seed Services
  const { services } = await import("@/app/data/site");
  
  const iconMap: Record<string, string> = {
    "generalContracting": "HardHat",
    "designEngineering": "DraftingCompass",
    "interiorFitOut": "Gem",
    "projectManagement": "ClipboardCheck",
    "mep": "Zap",
    "designBuild": "Building2",
    "renovation": "Wrench",
    "clientSupport": "Handshake",
  };

  for (const s of services) {
    await prisma.service.upsert({
      where: { title: s.title },
      update: {},
      create: {
        title: s.title,
        summary: s.summary,
        description: s.description,
        scope: s.scope.join(", "),
        icon: iconMap[s.titleKey] || "Wrench",
        image: s.image,
      },
    });
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/services");
}
