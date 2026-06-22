"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getTranslations() {
  return await prisma.translation.findMany({
    orderBy: [{ namespace: "asc" }, { key: "asc" }],
  });
}

export async function upsertTranslation(formData: FormData) {
  const namespace = formData.get("namespace") as string;
  const key = formData.get("key") as string;
  const en = formData.get("en") as string;
  const ar = formData.get("ar") as string;

  await prisma.translation.upsert({
    where: {
      namespace_key: {
        namespace,
        key,
      },
    },
    update: { en, ar },
    create: { namespace, key, en, ar },
  });

  revalidatePath("/admin/translations");
  revalidatePath("/", "layout");
}

export async function deleteTranslation(id: string) {
  await prisma.translation.delete({
    where: { id },
  });

  revalidatePath("/admin/translations");
  revalidatePath("/", "layout");
}
