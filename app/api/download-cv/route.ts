import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cvUrl = searchParams.get("url");
    const name = searchParams.get("name") || "Candidate";

    if (!cvUrl) {
      return NextResponse.json({ error: "Missing URL parameter" }, { status: 400 });
    }

    const response = await fetch(cvUrl);
    if (!response.ok) {
      // If fetching fails, redirect directly to original URL as fallback
      return NextResponse.redirect(cvUrl);
    }

    const arrayBuffer = await response.arrayBuffer();

    let extension = "pdf";
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("word") || cvUrl.toLowerCase().endsWith(".docx")) extension = "docx";
    else if (cvUrl.toLowerCase().endsWith(".doc")) extension = "doc";
    else if (contentType.includes("pdf") || cvUrl.toLowerCase().endsWith(".pdf")) extension = "pdf";

    const asciiName = name.replace(/[^\x00-\x7F]/g, "").trim().replace(/[^a-zA-Z0-9_-]/g, "_") || "Candidate";
    const fallbackFileName = `${asciiName}_CV.${extension}`;
    const safeArabicName = name.trim().replace(/[/\\?%*:|"<>]/g, "_") || "CV";
    const utf8FileName = `${safeArabicName}_CV.${extension}`;

    const isDownload = searchParams.get("download") === "true" || searchParams.has("download");
    const dispositionType = isDownload ? "attachment" : "inline";

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": extension === "pdf" ? "application/pdf" : (contentType || "application/octet-stream"),
        "Content-Disposition": `${dispositionType}; filename="${fallbackFileName}"; filename*=UTF-8''${encodeURIComponent(utf8FileName)}`,
      },
    });
  } catch (error) {
    console.error("Error proxying CV download:", error);
    const { searchParams } = new URL(req.url);
    const cvUrl = searchParams.get("url");
    if (cvUrl) {
      return NextResponse.redirect(cvUrl);
    }
    return NextResponse.json({ error: "Failed to download CV" }, { status: 500 });
  }
}
