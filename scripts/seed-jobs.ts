import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const newJobs = [
  {
    title: "Site Mechanical Engineer",
    titleAr: "مهندس ميكانيكا موقع",
    department: "Mechanical Engineering",
    departmentAr: "الهندسة الميكانيكية / إدارة التنفيذ",
    location: "Greater Cairo / Sites",
    locationAr: "القاهرة الكبرى / مواقع المشاريع",
    type: "Full-Time",
    typeAr: "دوام كامل",
    description:
      "Supervise all site mechanical works (HVAC, Firefighting, Plumbing, Ventilation), ensuring compliance with shop drawings and technical submittals.",
    descriptionAr:
      "الإشراف على تنفيذ جميع الأعمال الميكانيكية بالموقع (التكييف، الحريق، الصحي، والتهوية) ومتابعة المطابقة للمخططات التنفيذية والاعتمادات الفنية مع الاستشاري.",
    requirements: `خبرة من 3 إلى 6 سنوات في شركات المقاولات والمشاريع الميدانية
بكالوريوس هندسة ميكانيكية
إجادة إعداد المخططات التنفيذية (Shop Drawings) والاعتمادات الفنية (Submittals)
إجادة البرامج الهندسية (AutoCAD / Revit MEP)
متابعة استلام الأعمال في الموقع والالتزام بالجدول الزمني
التواصل عبر الواتساب: 01103144103`,
    requirementsAr: `خبرة من 3 إلى 6 سنوات في شركات المقاولات والمشاريع الميدانية
بكالوريوس هندسة ميكانيكية
إجادة إعداد المخططات التنفيذية (Shop Drawings) والاعتمادات الفنية (Submittals)
إجادة البرامج الهندسية (AutoCAD / Revit MEP)
متابعة استلام الأعمال في الموقع والالتزام بالجدول الزمني
التواصل عبر الواتساب: 01103144103`,
    isOpen: true,
  },
  {
    title: "Site Electrical Engineer",
    titleAr: "مهندس كهرباء موقع",
    department: "Electrical Engineering",
    departmentAr: "الهندسة الكهربائية / إدارة التنفيذ",
    location: "Greater Cairo / Sites",
    locationAr: "القاهرة الكبرى / مواقع المشاريع",
    type: "Full-Time",
    typeAr: "دوام كامل",
    description:
      "Oversee the execution of electrical and low-current systems on site, verifying compliance with approved shop drawings and coordination with other disciplines.",
    descriptionAr:
      "متابعة وتنفيذ الأنظمة الكهربائية والتيار الخفيف بالموقع، ومطابقة الأعمال بالمخططات والاعتمادات الفنية والتنسيق مع باقي التخصصات والموقع.",
    requirements: `خبرة من 3 إلى 6 سنوات في شركات المقاولات والمشاريع الميدانية
بكالوريوس هندسة كهربائية
إجادة إعداد المخططات التنفيذية (Shop Drawings) والاعتمادات الفنية (Submittals)
إجادة البرامج الهندسية (AutoCAD / Revit MEP)
خبرة في استلام الأعمال الكهربائية وحل التعارضات الميدانية
التواصل عبر الواتساب: 01103144103`,
    requirementsAr: `خبرة من 3 إلى 6 سنوات في شركات المقاولات والمشاريع الميدانية
بكالوريوس هندسة كهربائية
إجادة إعداد المخططات التنفيذية (Shop Drawings) والاعتمادات الفنية (Submittals)
إجادة البرامج الهندسية (AutoCAD / Revit MEP)
خبرة في استلام الأعمال الكهربائية وحل التعارضات الميدانية
التواصل عبر الواتساب: 01103144103`,
    isOpen: true,
  },
  {
    title: "Technical Office Engineer (Shop Drawings)",
    titleAr: "مهندس مكتب فني (Shop Drawings)",
    department: "Technical Office",
    departmentAr: "المكتب الفني",
    location: "Headquarters / Sites",
    locationAr: "المقر الرئيسي / مواقع المشاريع",
    type: "Full-Time",
    typeAr: "دوام كامل",
    description:
      "Prepare and review detailed Shop Drawings, resolve engineering clashes, and prepare technical submittals for projects.",
    descriptionAr:
      "إعداد ومراجعة المخططات التنفيذية التفصيلية (Shop Drawings) وحل التعارضات الهندسية وتقديم الاعتمادات الفنية (Submittals) للمشروع.",
    requirements: `خبرة من 3 إلى 10 سنوات في المكتب الفني بشركات المقاولات
بكالوريوس هندسة في التخصص المطلوب
إجادة إعداد المخططات التنفيذية (Shop Drawings) والاعتمادات الفنية (Submittals)
إجادة البرامج الهندسية (AutoCAD / Revit MEP)
دقة عالية وحل التعارضات بين التخصصات المختلفة
التواصل عبر الواتساب: 01103144103`,
    requirementsAr: `خبرة من 3 إلى 10 سنوات في المكتب الفني بشركات المقاولات
بكالوريوس هندسة في التخصص المطلوب
إجادة إعداد المخططات التنفيذية (Shop Drawings) والاعتمادات الفنية (Submittals)
إجادة البرامج الهندسية (AutoCAD / Revit MEP)
دقة عالية وحل التعارضات بين التخصصات المختلفة
التواصل عبر الواتساب: 01103144103`,
    isOpen: true,
  },
  {
    title: "Senior Technical Office Engineer",
    titleAr: "مهندس مكتب فني أول (Senior Technical Office Engineer)",
    department: "Technical Office",
    departmentAr: "المكتب الفني",
    location: "Headquarters / Sites",
    locationAr: "المقر الرئيسي / مواقع المشاريع",
    type: "Full-Time",
    typeAr: "دوام كامل",
    description:
      "Lead technical office tasks, prepare BOQ, payment certificates, and tenders, review shop drawings/submittals, and manage multidisciplinary coordination.",
    descriptionAr:
      "قيادة أعمال المكتب الفني، إعداد وحصر الكميات والمستخلصات والمناقصات، مراجعة وتدقيق المخططات والاعتمادات والتنسيق بين التخصصات والموقع.",
    requirements: `خبرة من 3 إلى 10 سنوات في المكتب الفني بشركات المقاولات
بكالوريوس هندسة في التخصص المطلوب
خبرة سابقة في شركات المقاولات والمشاريع الميدانية
إجادة إعداد المخططات التنفيذية (Shop Drawings) والاعتمادات الفنية (Submittals)
إجادة البرامج الهندسية (AutoCAD / Revit MEP)
مهارات قيادة وتنسيق عالية مع الاستشاري والموردين
التواصل عبر الواتساب: 01103144103`,
    requirementsAr: `خبرة من 3 إلى 10 سنوات في المكتب الفني بشركات المقاولات
بكالوريوس هندسة في التخصص المطلوب
خبرة سابقة في شركات المقاولات والمشاريع الميدانية
إجادة إعداد المخططات التنفيذية (Shop Drawings) والاعتمادات الفنية (Submittals)
إجادة البرامج الهندسية (AutoCAD / Revit MEP)
مهارات قيادة وتنسيق عالية مع الاستشاري والموردين
التواصل عبر الواتساب: 01103144103`,
    isOpen: true,
  },
];

async function main() {
  console.log("Removing previous job postings...");
  await prisma.jobPosting.deleteMany({});

  console.log("Adding new job postings...");
  for (const job of newJobs) {
    const created = await prisma.jobPosting.create({ data: job });
    console.log(`✅ Created: ${created.titleAr} (${created.id})`);
  }

  console.log("🎉 Job postings updated successfully!");
}

main()
  .catch((e) => {
    console.error("Error updating jobs:", e);
  })
  .finally(() => prisma.$disconnect());
