import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const jobCodes = ["OMG-MA-CEM-001", "OMG-MA-ARC-001"];

function lineCount(value) {
  return (value || "").split("\n").map((line) => line.trim()).filter(Boolean).length;
}

async function main() {
  const seededByCode = await prisma.jobPosting.findMany({
    where: { jobCode: { in: jobCodes } },
    orderBy: { jobCode: "asc" },
  });

  const marsaAlamJobs = await prisma.jobPosting.findMany({
    where: { location: "Marsa Alam, Red Sea" },
    orderBy: { jobCode: "asc" },
  });

  const projectManagerMatches = await prisma.jobPosting.findMany({
    where: {
      location: "Marsa Alam, Red Sea",
      OR: [
        { title: { contains: "Project Manager" } },
        { jobCode: { contains: "PM" } },
      ],
    },
    select: { id: true, jobCode: true, title: true, location: true },
  });

  console.log(JSON.stringify({
    seededByCode: seededByCode.map((job) => ({
      id: job.id,
      jobCode: job.jobCode,
      title: job.title,
    })),
    marsaAlamCount: marsaAlamJobs.length,
    marsaAlamJobs: marsaAlamJobs.map((job) => ({
      id: job.id,
      jobCode: job.jobCode,
      title: job.title,
      titleAr: job.titleAr,
      department: job.department,
      departmentAr: job.departmentAr,
      location: job.location,
      locationAr: job.locationAr,
      type: job.type,
      typeAr: job.typeAr,
      experience: job.experience,
      experienceAr: job.experienceAr,
      vacancies: job.vacancies,
      isOpen: job.isOpen,
      isFeatured: job.isFeatured,
      applicationDeadline: job.applicationDeadline,
      responsibilityLines: lineCount(job.responsibilities),
      responsibilityArLines: lineCount(job.responsibilitiesAr),
      requirementLines: lineCount(job.requirements),
      requirementArLines: lineCount(job.requirementsAr),
      education: job.education,
      educationAr: job.educationAr,
      preferredExperience: job.preferredExperience,
      preferredExperienceAr: job.preferredExperienceAr,
    })),
    projectManagerMatches,
  }, null, 2));
}

main()
  .catch((error) => {
    console.error("Verification failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
