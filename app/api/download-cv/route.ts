import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  if (req.cookies.get("admin_session")?.value !== "authenticated") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cvUrl = req.nextUrl.searchParams.get("url");
  if (!cvUrl) return NextResponse.json({ error: "Missing URL" }, { status: 400 });

  try {
    const application = await prisma.jobApplication.findFirst({
      where: { cvUrl, cvType: "FILE" },
      select: { name: true },
    });
    if (!application) return NextResponse.json({ error: "CV not found" }, { status: 404 });

    const url = new URL(cvUrl);
    const prefix = `/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/`;
    if (url.protocol !== "https:" || url.hostname !== "res.cloudinary.com" || !url.pathname.startsWith(prefix)) {
      return NextResponse.json({ error: "Unsupported CV URL" }, { status: 400 });
    }
    const publicId = decodeURIComponent(url.pathname.slice(prefix.length).replace(/^v\d+\//, ""));
    if (!publicId.startsWith("omega_cvs/")) {
      return NextResponse.json({ error: "Unsupported CV URL" }, { status: 400 });
    }
    const signedUrl = cloudinary.utils.private_download_url(publicId, "", {
      resource_type: "raw", type: "upload", attachment: false,
    });
    const response = await fetch(signedUrl, { cache: "no-store" });
    if (!response.ok) return NextResponse.json({ error: "Unable to retrieve CV" }, { status: 502 });

    const extension = /\.docx$/i.test(publicId) ? "docx" : /\.doc$/i.test(publicId) ? "doc" : "pdf";
    const name = application.name.replace(/[^a-zA-Z0-9_-]/g, "_") || "Candidate";
    const download = req.nextUrl.searchParams.has("download");
    return new NextResponse(await response.arrayBuffer(), {
      headers: {
        "Content-Type": extension === "pdf" ? "application/pdf" : (response.headers.get("content-type") || "application/octet-stream"),
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${name}_CV.${extension}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Error retrieving CV:", error);
    return NextResponse.json({ error: "Unable to retrieve CV" }, { status: 500 });
  }
}
