/**
 * Run this ONCE to create the first HR user:
 *   npx tsx scripts/seed-hr.ts
 */
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  const existing = await prisma.hrUser.findUnique({ where: { email: "hr@omega-tc.com" } });
  if (existing) {
    console.log("✅ HR user already exists. Email: hr@omega-tc.com");
    return;
  }

  await prisma.hrUser.create({
    data: {
      name: "HR Manager",
      email: "hr@omega-tc.com",
      passwordHash: hashPassword("OmegaHR2024!"),
      role: "MANAGER",
    },
  });

  console.log("✅ HR user created successfully!");
  console.log("   Email:    hr@omega-tc.com");
  console.log("   Password: OmegaHR2024!");
  console.log("\n⚠️  Change the password after first login!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
