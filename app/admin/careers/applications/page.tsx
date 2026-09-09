import { prisma } from "@/lib/prisma";
import ApplicationsClient from "./ApplicationsClient";

export default async function ApplicationsPage() {
  const applications = await prisma.jobApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: { job: true },
  });

  return <ApplicationsClient applications={JSON.parse(JSON.stringify(applications))} />;
}
