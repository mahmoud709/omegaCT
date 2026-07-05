import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projects } from "@/app/data/site";
import arMessages from "@/messages/ar.json";

export async function GET() {
  try {
    for (const p of projects) {
      const exists = await prisma.project.findUnique({ where: { slug: p.slug } });
      if (!exists) {
        await prisma.project.create({
          data: {
            name: p.name,
            nameAr: (arMessages as any).ProjectNames[p.slug] || p.name,
            slug: p.slug,
            location: p.location,
            locationAr: p.location,
            category: p.category,
            categoryAr: p.category === 'Hospitality' ? 'ضيافة' : 
                        p.category === 'Residential' ? 'سكني' : 
                        p.category === 'Commercial' ? 'تجاري' : 
                        p.category === 'Institutional' ? 'مؤسسي' : 'قيد التنفيذ',
            status: p.status,
            statusAr: p.status === 'Completed' ? 'مكتمل' : 'قيد التنفيذ',
            details: p.details,
            detailsAr: p.details,
            role: p.role,
            roleAr: p.role === 'Main Contractor' ? 'المقاول الرئيسي' : 
                    p.role === 'Main & Sub-Contractor' ? 'المقاول الرئيسي والفرعي' : 'مقاول فرعي',
            image: p.image,
            galleryImages: p.galleryImages.join(',')
          }
        });
      }
    }
    return NextResponse.json({ success: true, message: "Migration complete" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
