export function isJobAcceptingApplications(job: { isOpen: boolean; applicationDeadline?: Date | string | null }) {
  if (!job.isOpen) return false;
  if (!job.applicationDeadline) return true;

  const deadline = new Date(job.applicationDeadline);
  if (Number.isNaN(deadline.getTime())) return true;
  deadline.setHours(23, 59, 59, 999);
  return deadline >= new Date();
}
