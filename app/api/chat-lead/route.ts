import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.name && !data.phone && !data.email) {
      return NextResponse.json({ success: false, error: "No valid data provided" }, { status: 400 });
    }

    // Save as a ContactMessage so it shows up in the CMS
    await prisma.contactMessage.create({
      data: {
        name: data.name || "Chatbot User",
        email: data.email || "No email provided",
        phone: data.phone || "No phone provided",
        message: `[Collected via Chatbot] ${data.message || ""}`,
        company: "Chatbot Lead",
        projectType: "Chatbot Inquiry",
        location: "",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to save chat lead:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
