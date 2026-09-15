import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fullTimeAr = "دوام كامل";
const marsaAlamJobs = [
  {
    jobCode: "OMG-MA-CEM-001",
    title: "Civil Execution Manager",
    titleAr: "مدير تنفيذ مدني",
    department: "Construction",
    departmentAr: "التنفيذ",
    location: "Marsa Alam, Red Sea",
    locationAr: "مرسى علم، البحر الأحمر",
    type: "Full-time",
    typeAr: fullTimeAr,
    experience: "10+ Years",
    experienceAr: "10 سنوات فأكثر",
    vacancies: 1,
    isOpen: true,
    isFeatured: true,
    applicationDeadline: null,
    description:
      "Omega Contracting & Trading is seeking a Civil Execution Manager to manage and control all civil construction and site execution activities for a project in Marsa Alam. The role is responsible for supervising site teams and subcontractors, monitoring productivity and progress, coordinating with other disciplines, and ensuring that all civil works are executed according to approved drawings, specifications, quality requirements, and project schedule.",
    descriptionAr:
      "تبحث شركة أوميجا للمقاولات والتجارة عن مدير تنفيذ مدني لإدارة ومتابعة جميع أعمال التنفيذ المدنية بمشروع في مرسى علم. تشمل المسؤوليات الإشراف على فرق الموقع والمقاولين ومتابعة الإنتاجية والتقدم والتنسيق مع باقي التخصصات وضمان تنفيذ الأعمال طبقاً للرسومات والمواصفات ومعايير الجودة والبرنامج الزمني للمشروع.",
    responsibilities: [
      "Manage daily civil construction and site execution activities.",
      "Supervise site engineers, supervisors, subcontractors, and construction crews.",
      "Coordinate civil works with architectural, MEP, technical office, and other project disciplines.",
      "Review construction drawings and ensure correct site implementation.",
      "Monitor productivity and progress against the approved construction schedule.",
      "Resolve site execution and coordination issues.",
      "Ensure efficient utilization of manpower, materials, and equipment.",
      "Monitor workmanship and compliance with project quality requirements.",
      "Report execution progress, risks, constraints, and site requirements to the Project Manager.",
      "Ensure works are executed in accordance with approved method statements and specifications.",
    ].join("\n"),
    responsibilitiesAr: [
      "إدارة أعمال التنفيذ والإنشاءات المدنية اليومية بالموقع.",
      "الإشراف على مهندسي الموقع والمشرفين والمقاولين وفرق التنفيذ.",
      "التنسيق بين الأعمال المدنية والمعمارية والكهروميكانيكية والمكتب الفني وباقي تخصصات المشروع.",
      "مراجعة رسومات التنفيذ والتأكد من تطبيقها بشكل صحيح بالموقع.",
      "متابعة الإنتاجية وتقدم الأعمال مقارنة بالبرنامج الزمني المعتمد.",
      "حل مشكلات التنفيذ والتنسيق بالموقع.",
      "ضمان الاستخدام الفعال للعمالة والمواد والمعدات.",
      "متابعة جودة التنفيذ والتأكد من الالتزام بمتطلبات الجودة بالمشروع.",
      "رفع تقارير تقدم الأعمال والمخاطر والمعوقات واحتياجات الموقع إلى مدير المشروع.",
      "التأكد من تنفيذ الأعمال وفقاً لطرق التنفيذ والمواصفات المعتمدة.",
    ].join("\n"),
    requirements: [
      "Minimum 10 years of relevant civil construction and site execution experience.",
      "Strong practical knowledge of structural and civil construction activities.",
      "Proven experience managing site engineers, supervisors, subcontractors, and construction teams.",
      "Strong ability to read and coordinate construction drawings.",
      "Good planning, leadership, coordination, and problem-solving skills.",
      "Strong understanding of quality and site execution requirements.",
      "Willingness to work full-time on site in Marsa Alam.",
    ].join("\n"),
    requirementsAr: [
      "خبرة لا تقل عن 10 سنوات في أعمال التنفيذ والإنشاءات المدنية.",
      "خبرة عملية قوية في الأعمال الإنشائية والمدنية.",
      "خبرة في إدارة مهندسي الموقع والمشرفين والمقاولين وفرق التنفيذ.",
      "القدرة على قراءة وتنسيق الرسومات التنفيذية بكفاءة.",
      "مهارات قوية في التخطيط والقيادة والتنسيق وحل المشكلات.",
      "فهم جيد لمتطلبات الجودة والتنفيذ بالمواقع.",
      "الاستعداد للعمل بدوام كامل في موقع المشروع بمرسى علم.",
    ].join("\n"),
    education: "Bachelor's Degree in Civil Engineering",
    educationAr: "بكالوريوس هندسة مدنية",
    preferredExperience:
      "Previous experience in hotels, resorts, hospitality developments, or Red Sea projects is highly preferred.",
    preferredExperienceAr:
      "يفضل بشدة وجود خبرة سابقة في مشروعات الفنادق أو المنتجعات أو المشروعات السياحية أو مشروعات البحر الأحمر.",
  },
  {
    jobCode: "OMG-MA-ARC-001",
    title: "Architect",
    titleAr: "مهندس معماري",
    department: "Architecture",
    departmentAr: "الهندسة المعمارية",
    location: "Marsa Alam, Red Sea",
    locationAr: "مرسى علم، البحر الأحمر",
    type: "Full-time",
    typeAr: fullTimeAr,
    experience: "5+ Years",
    experienceAr: "5 سنوات فأكثر",
    vacancies: 1,
    isOpen: true,
    isFeatured: true,
    applicationDeadline: null,
    description:
      "Omega Contracting & Trading is seeking an Architect to supervise and coordinate architectural and finishing works for a project in Marsa Alam. The role will ensure that architectural works are executed accurately according to approved drawings, specifications, materials, design requirements, and project quality standards.",
    descriptionAr:
      "تبحث شركة أوميجا للمقاولات والتجارة عن مهندس معماري للإشراف والتنسيق على الأعمال المعمارية وأعمال التشطيبات بمشروع في مرسى علم، مع ضمان تنفيذ الأعمال طبقاً للرسومات والمواصفات والخامات ومتطلبات التصميم ومعايير الجودة المعتمدة بالمشروع.",
    responsibilities: [
      "Supervise architectural and finishing works on site.",
      "Review architectural drawings, shop drawings, and related technical documents.",
      "Ensure site execution complies with approved designs and specifications.",
      "Coordinate architectural works with civil, structural, and MEP disciplines.",
      "Review materials and finishing requirements before implementation.",
      "Identify and resolve architectural coordination and execution issues.",
      "Monitor subcontractor performance and quality of finishing works.",
      "Coordinate technical clarifications with the Technical Office and project management.",
      "Inspect completed works and ensure compliance with required architectural and quality standards.",
    ].join("\n"),
    responsibilitiesAr: [
      "الإشراف على الأعمال المعمارية وأعمال التشطيبات بالموقع.",
      "مراجعة الرسومات المعمارية والرسومات التنفيذية والمستندات الفنية ذات الصلة.",
      "التأكد من مطابقة التنفيذ بالموقع للتصميمات والمواصفات المعتمدة.",
      "التنسيق بين الأعمال المعمارية والمدنية والإنشائية والكهروميكانيكية.",
      "مراجعة الخامات ومتطلبات التشطيبات قبل التنفيذ.",
      "تحديد وحل مشكلات التنسيق والتنفيذ المعماري.",
      "متابعة أداء المقاولين وجودة أعمال التشطيبات.",
      "التنسيق مع المكتب الفني وإدارة المشروع بشأن الاستفسارات والمتطلبات الفنية.",
      "فحص الأعمال المنفذة والتأكد من مطابقتها للمعايير المعمارية ومتطلبات الجودة.",
    ].join("\n"),
    requirements: [
      "Minimum 5 years of relevant architectural and finishing experience.",
      "Practical experience in site architectural and finishing works.",
      "Strong knowledge of architectural drawings, shop drawings, materials, and finishing activities.",
      "Good knowledge of coordination between architectural, civil, and MEP works.",
      "Strong site follow-up, coordination, and problem-solving skills.",
      "Ability to monitor subcontractors and finishing quality.",
      "Willingness to work full-time on site in Marsa Alam.",
    ].join("\n"),
    requirementsAr: [
      "خبرة لا تقل عن 5 سنوات في الأعمال المعمارية وأعمال التشطيبات.",
      "خبرة عملية في الإشراف على الأعمال المعمارية والتشطيبات بالمواقع.",
      "معرفة قوية بالرسومات المعمارية والرسومات التنفيذية والخامات وأعمال التشطيبات.",
      "معرفة جيدة بالتنسيق بين الأعمال المعمارية والمدنية والكهروميكانيكية.",
      "مهارات قوية في المتابعة بالموقع والتنسيق وحل المشكلات.",
      "القدرة على متابعة المقاولين وجودة أعمال التشطيبات.",
      "الاستعداد للعمل بدوام كامل في موقع المشروع بمرسى علم.",
    ].join("\n"),
    education: "Bachelor's Degree in Architecture or Architectural Engineering",
    educationAr: "بكالوريوس هندسة معمارية أو عمارة",
    preferredExperience:
      "Previous experience in hotels, resorts, hospitality projects, high-quality finishing works, or Red Sea projects is highly preferred.",
    preferredExperienceAr:
      "يفضل بشدة وجود خبرة سابقة في مشروعات الفنادق أو المنتجعات أو المشروعات السياحية أو أعمال التشطيبات عالية الجودة أو مشروعات البحر الأحمر.",
  },
];

async function main() {
  const seeded = [];

  for (const job of marsaAlamJobs) {
    const existing = await prisma.jobPosting.findFirst({
      where: {
        OR: [
          { jobCode: job.jobCode },
          { title: job.title, location: job.location },
        ],
      },
      select: { id: true },
    });

    const saved = existing
      ? await prisma.jobPosting.update({
          where: { id: existing.id },
          data: job,
        })
      : await prisma.jobPosting.create({ data: job });

    seeded.push(saved);
    console.log(`${existing ? "Updated" : "Created"} ${saved.jobCode}: ${saved.title} (${saved.id})`);
  }

  console.log(`Seeded ${seeded.length} Marsa Alam jobs.`);
}

main()
  .catch((error) => {
    console.error("Failed to seed Marsa Alam jobs:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
