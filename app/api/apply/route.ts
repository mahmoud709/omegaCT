import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const jobId = formData.get("jobId") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || "";
    const coverLetter = (formData.get("coverLetter") as string) || "";
    const cvFile = formData.get("cv") as File | null;

    if (!jobId || !name || !email || !cvFile || cvFile.size === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const job = await prisma.jobPosting.findUnique({ where: { id: jobId } });
    if (!job || !job.isOpen) {
      return NextResponse.json({ error: "This position is no longer open" }, { status: 404 });
    }

    // Upload CV to Cloudinary as raw file (PDF)
    const buffer = new Uint8Array(await cvFile.arrayBuffer());
    const cvUrl = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "omega_cvs", resource_type: "raw", use_filename: true, unique_filename: true },
        (err, result) => { if (err) reject(err); else resolve(result!.secure_url); }
      ).end(buffer);
    });

    await prisma.jobApplication.create({
      data: { jobId, jobTitle: job.title, name, email, phone, coverLetter, cvUrl, status: "NEW" },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Apply error:", err);
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 });
  }
}
