import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

export const getCachedProfile = unstable_cache(
  async () => {
    try {
      return await prisma.translation.findMany({ where: { namespace: "CompanyProfile" } });
    } catch (e) {
      return [];
    }
  },
  ["company-profile-cache"],
  { tags: ["profile"], revalidate: 3600 }
);
