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
    
    // Screening Questions
    const employmentStatus = (formData.get("employmentStatus") as string) || "";
    const noticePeriod = (formData.get("noticePeriod") as string) || "";
    const yearsOfExperience = (formData.get("yearsOfExperience") as string) || "";
    const lastSalary = (formData.get("lastSalary") as string) || "";
    
    // CV Submission (File vs Link)
    const cvType = (formData.get("cvType") as string) || "FILE";
    const cvLink = (formData.get("cvLink") as string) || "";
    const cvFile = formData.get("cv") as File | null;

    if (!jobId || !name || !email) {
      return NextResponse.json({ error: "Missing required personal details" }, { status: 400 });
    }

    const job = await prisma.jobPosting.findUnique({ where: { id: jobId } });
    if (!job || !job.isOpen) {
      return NextResponse.json({ error: "This position is no longer open" }, { status: 404 });
    }

    let finalCvUrl = "";

    if (cvType === "LINK") {
      if (!cvLink || !cvLink.trim()) {
        return NextResponse.json({ error: "Please provide your CV link" }, { status: 400 });
      }
      finalCvUrl = cvLink.trim();
    } else {
      if (!cvFile || cvFile.size === 0) {
        return NextResponse.json({ error: "Please upload your CV file" }, { status: 400 });
      }
      // Upload CV to Cloudinary as raw file (preserving extension for clean PDF download)
      const buffer = new Uint8Array(await cvFile.arrayBuffer());
      const originalName = cvFile.name || "resume.pdf";
      const ext = originalName.includes(".") ? originalName.split(".").pop()?.toLowerCase() || "pdf" : "pdf";
      const cleanBaseName = originalName.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");
      const uniquePublicId = `${cleanBaseName}_${Date.now()}.${ext}`;

      finalCvUrl = await new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { 
            folder: "omega_cvs", 
            resource_type: "raw", 
            public_id: uniquePublicId,
            use_filename: true 
          },
          (err, result) => { if (err) reject(err); else resolve(result!.secure_url); }
        ).end(buffer);
      });
    }

    await (prisma as any).jobApplication.create({
      data: {
        jobId,
        jobTitle: job.title,
        name,
        email,
        phone,
        cvType,
        cvUrl: finalCvUrl,
        employmentStatus,
        noticePeriod,
        yearsOfExperience,
        lastSalary,
        coverLetter,
        status: "NEW",
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Apply error:", err);
    return NextResponse.json({ error: "Submission failed. Please try again." }, { status: 500 });
  }
}
