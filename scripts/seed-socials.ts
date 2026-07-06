import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const socials = [
    { key: "facebook", url: "https://web.facebook.com/profile.php?id=61586830762653" },
    { key: "linkedin", url: "https://www.linkedin.com/company/omega-ct/" },
    { key: "instagram", url: "https://www.instagram.com/omega_ct/" },
  ];

  console.log("Seeding social media profiles...");

  for (const s of socials) {
    await prisma.translation.upsert({
      where: {
        namespace_key: {
          namespace: "CompanyProfile",
          key: s.key,
        },
      },
      update: {
        en: s.url,
        ar: s.url,
      },
      create: {
        namespace: "CompanyProfile",
        key: s.key,
        en: s.url,
        ar: s.url,
      },
    });
    console.log(`Upserted ${s.key}: ${s.url}`);
  }

  console.log("✅ Social media profiles seeded successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
