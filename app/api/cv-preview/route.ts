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
      return NextResponse.redirect(cvUrl);
    }

    const arrayBuffer = await response.arrayBuffer();

    let extension = "pdf";
    const contentType = response.headers.get("content-type") || "application/pdf";
    if (contentType.includes("word") || cvUrl.toLowerCase().endsWith(".docx")) extension = "docx";
    else if (cvUrl.toLowerCase().endsWith(".doc")) extension = "doc";

    const asciiName = name.replace(/[^\x00-\x7F]/g, "").trim().replace(/[^a-zA-Z0-9_-]/g, "_") || "Candidate";
    const fallbackFileName = `${asciiName}_CV.${extension}`;

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": contentType.includes("pdf") ? "application/pdf" : contentType,
        "Content-Disposition": `inline; filename="${fallbackFileName}"`,
      },
    });
  } catch (error) {
    console.error("Error previewing CV:", error);
    const { searchParams } = new URL(req.url);
    const cvUrl = searchParams.get("url");
    if (cvUrl) {
      return NextResponse.redirect(cvUrl);
    }
    return NextResponse.json({ error: "Failed to load CV preview" }, { status: 500 });
  }
}
