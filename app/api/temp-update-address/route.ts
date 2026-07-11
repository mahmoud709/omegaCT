import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Update Cairo office address in CompanyProfile
    const addressCairo = await prisma.translation.findFirst({
      where: { namespace: 'CompanyProfile', key: 'addressCairo' }
    });
    if (addressCairo) {
      await prisma.translation.update({
        where: { id: addressCairo.id },
        data: {
          en: 'Top 90 Mall, South 90th Street, Fifth Settlement, 2nd Floor, Office 218, New Cairo',
          ar: 'مول توب 90، شارع التسعين الجنوبي، التجمع الخامس، الدور الثاني، مكتب 218، القاهرة الجديدة'
        }
      });
    }

    // 2. Update Alexandria office address spelling in CompanyProfile (الرئيسى -> الرئيسي)
    const addressAlex = await prisma.translation.findFirst({
      where: { namespace: 'CompanyProfile', key: 'addressAlex' }
    });
    if (addressAlex && addressAlex.ar) {
      let updatedAr = addressAlex.ar
        .replace(/الرئيسى/g, 'الرئيسي')
        .replace(/الجنوبى/g, 'الجنوبي')
        .replace(/العاصمه الاداريه/g, 'العاصمة الإدارية')
        .replace(/أوميغا/g, 'أوميجا')
        .replace(/أوميجا للمقاولات الفنية/g, 'أوميجا للمقاولات والتجارة');
      await prisma.translation.update({
        where: { id: addressAlex.id },
        data: { ar: updatedAr }
      });
    }

    // 3. Update all translation keys across all namespaces for brand consistency and typos
    const allTranslations = await prisma.translation.findMany();
    for (const t of allTranslations) {
      if (t.ar) {
        let updatedAr = t.ar
          .replace(/أوميغا/g, 'أوميجا')
          .replace(/أوميجا للمقاولات الفنية/g, 'أوميجا للمقاولات والتجارة')
          .replace(/الرئيسى/g, 'الرئيسي')
          .replace(/الجنوبى/g, 'الجنوبي')
          .replace(/العاصمه/g, 'العاصمة')
          .replace(/الاداريه/g, 'الإدارية')
          .replace(/مشروعا بعد مشروع/g, 'مشروعاً بعد مشروع');
        if (updatedAr !== t.ar) {
          await prisma.translation.update({
            where: { id: t.id },
            data: { ar: updatedAr }
          });
        }
      }
    }

    // 4. Update the projects in database to fix typos and set the specific Obsidier Towers text
    // Obsidier Towers details update
    const obsidier = await prisma.project.findUnique({
      where: { slug: 'obsidier-towers' }
    });
    if (obsidier) {
      await prisma.project.update({
        where: { slug: 'obsidier-towers' },
        data: {
          nameAr: 'أبراج أوبسيدير', // Unified name
          locationAr: 'العاصمة الإدارية الجديدة',
          roleAr: 'المقاول الرئيسي',
          detailsAr: 'بصفتها المقاول الرئيسي لأبراج أوبسيدير المرموقة في العاصمة الإدارية الجديدة، عُهد إلى شركة أوميجا للمقاولات والتجارة بتحويل إحدى أبرز الرؤى المعمارية في مصر إلى واقع ملموس. يقع البرج في موقع استراتيجي في منطقة الأبراج السياحية، ويطل على كل من النهر الأخضر ومحور بن زايد الشمالي، ليُصبح رمزًا للهندسة الحديثة والرقي العمراني. يمتد برج أوبسيدير على مساحة 13,500 متر مربع، ويبلغ ارتفاعه 110 أمتار، ويمثل معيارًا جديدًا في التطوير متعدد الاستخدامات، حيث يضم مساحات تجارية وإدارية وطبية موزعة على 25 طابقًا من تصميم مكتب محمد طلعت للهندسة المعمارية.'
        }
      });
    }

    // 5. Clean up other projects' fields for typos
    const allProjects = await prisma.project.findMany();
    for (const p of allProjects) {
      let updatedNameAr = p.nameAr ? p.nameAr.replace(/أوبسدير/g, 'أوبسيدير').replace(/أوبسيديير/g, 'أوبسيدير') : p.nameAr;
      let updatedRoleAr = p.roleAr ? p.roleAr.replace(/الرئيسى/g, 'الرئيسي') : p.roleAr;
      let updatedLocationAr = p.locationAr ? p.locationAr.replace(/العاصمه/g, 'العاصمة').replace(/الاداريه/g, 'الإدارية') : p.locationAr;
      let updatedDetailsAr = p.detailsAr ? p.detailsAr.replace(/الرئيسى/g, 'الرئيسي').replace(/العاصمه/g, 'العاصمة').replace(/الاداريه/g, 'الإدارية').replace(/أوميجا للمقاولات الفنية/g, 'أوميجا للمقاولات والتجارة').replace(/أوميغا/g, 'أوميجا') : p.detailsAr;

      if (updatedNameAr !== p.nameAr || updatedRoleAr !== p.roleAr || updatedLocationAr !== p.locationAr || updatedDetailsAr !== p.detailsAr) {
        await prisma.project.update({
          where: { id: p.id },
          data: {
            nameAr: updatedNameAr,
            roleAr: updatedRoleAr,
            locationAr: updatedLocationAr,
            detailsAr: updatedDetailsAr
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'All Arabic spelling, brand names, and Obsidier Towers paragraph updated successfully in database!'
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
