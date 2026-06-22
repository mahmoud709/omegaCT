"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getStatsData() {
  const translations = await prisma.translation.findMany({
    where: { namespace: "Stats" }
  });

  const getVal = (key: string, def: string) => {
    const t = translations.find(t => t.key === key);
    return t ? t.en : def;
  };

  return {
    yearsValue: getVal("yearsValue", "20"),
    yearsSuffix: getVal("yearsSuffix", "+"),
    projectsValue: getVal("projectsValue", "15"),
    projectsSuffix: getVal("projectsSuffix", "+"),
    clientsValue: getVal("clientsValue", "50"),
    clientsSuffix: getVal("clientsSuffix", "+"),
    qualityValue: getVal("qualityValue", "100"),
    qualitySuffix: getVal("qualitySuffix", "%"),
  };
}

export async function updateStats(formData: FormData) {
  const keys = [
    "yearsValue", "yearsSuffix",
    "projectsValue", "projectsSuffix",
    "clientsValue", "clientsSuffix",
    "qualityValue", "qualitySuffix"
  ];

  for (const key of keys) {
    const value = formData.get(key) as string;
    if (value) {
      await prisma.translation.upsert({
        where: {
          namespace_key: {
            namespace: "Stats",
            key: key
          }
        },
        update: { en: value, ar: value },
        create: { namespace: "Stats", key: key, en: value, ar: value }
      });
    }
  }

  revalidatePath("/admin/stats");
  revalidatePath("/");
}
