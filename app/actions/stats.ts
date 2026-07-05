"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const STATS_DEFAULTS = {
  yearsValue: "20",
  yearsSuffix: "+",
  projectsValue: "15",
  projectsSuffix: "+",
  clientsValue: "50",
  clientsSuffix: "+",
  qualityValue: "100",
  qualitySuffix: "%",
};

export async function getStatsData() {
  try {
    const translations = await prisma.translation.findMany({
      where: { namespace: "Stats" }
    });

    const getVal = (key: string, def: string) => {
      const t = translations.find(t => t.key === key);
      return t ? t.en : def;
    };

    return {
      yearsValue: getVal("yearsValue", STATS_DEFAULTS.yearsValue),
      yearsSuffix: getVal("yearsSuffix", STATS_DEFAULTS.yearsSuffix),
      projectsValue: getVal("projectsValue", STATS_DEFAULTS.projectsValue),
      projectsSuffix: getVal("projectsSuffix", STATS_DEFAULTS.projectsSuffix),
      clientsValue: getVal("clientsValue", STATS_DEFAULTS.clientsValue),
      clientsSuffix: getVal("clientsSuffix", STATS_DEFAULTS.clientsSuffix),
      qualityValue: getVal("qualityValue", STATS_DEFAULTS.qualityValue),
      qualitySuffix: getVal("qualitySuffix", STATS_DEFAULTS.qualitySuffix),
    };
  } catch (error) {
    // console.error("Failed to load stats from DB:", error);
    return STATS_DEFAULTS;
  }
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
