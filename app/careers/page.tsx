import { getOpenJobs } from "@/app/actions/careers";
import { getLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/app/data/site";
import { getOptimizedImageUrl } from "@/app/utils/image";
import { JobCard } from "./JobModal";

export const metadata = {
  title: "Careers | Omega Contracting & Trading",
  description: "Join the Omega team. Explore open positions and build a career in Egypt's leading construction group.",
};

export default async function CareersPage() {
  const locale = await getLocale();
  const isAr = locale === "ar";
  const rawJobs = await getOpenJobs();

  const jobs = rawJobs.map((j) => ({
    ...j,
    requirements: (j.requirements ?? "")
      .split("\n").map((r) => r.trim()).filter(Boolean),
    requirementsAr: (j.requirementsAr ?? "")
      .split("\n").map((r) => r.trim()).filter(Boolean),
  }));

  return (
    <>
      {/* Hero */}
      <section className="hero-small">
        <Image
          src={getOptimizedImageUrl(images.skyline, 1920)}
          alt={isAr ? "الوظائف المتاحة" : "Careers at Omega"}
          fill priority className="object-cover" sizes="100vw"
          unoptimized={images.skyline?.startsWith("http")}
        />
        <div className="hero-scrim" />
        <div className="relative mx-auto flex min-h-[62vh] max-w-7xl flex-col justify-end px-5 pb-20 pt-32 lg:px-8">
          <div className="max-w-3xl animate-fade-up">
            <p className="section-label text-[var(--gold-light)]">
              {isAr ? "انضم إلى فريقنا" : "Join Our Team"}
            </p>
            <h1 className="font-serif text-5xl font-semibold leading-tight text-white md:text-7xl">
              {isAr ? "الوظائف المتاحة" : "Careers at Omega"}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
              {isAr
                ? "ابنِ مستقبلك المهني مع مجموعة أوميجا للمقاولات والتجارة — حيث تلتقي الخبرة بالطموح."
                : "Build your career with Omega Contracting & Trading — where expertise meets ambition."}
            </p>
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="border-y border-[var(--line)] bg-white px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3">
          {[
            { title: isAr ? "بيئة عمل احترافية" : "Professional Environment", body: isAr ? "نعمل وفق أعلى معايير الجودة والسلامة المهنية" : "We operate to the highest standards of quality and professional safety.", icon: "🏗️" },
            { title: isAr ? "نمو ومسار مهني واضح" : "Clear Career Path", body: isAr ? "نستثمر في موظفينا ونساعدهم على التطور المستمر" : "We invest in our people and support continuous development.", icon: "📈" },
            { title: isAr ? "مشاريع ذات تأثير" : "Impactful Projects", body: isAr ? "شارك في بناء مشاريع تُشكّل ملامح مصر الحديثة" : "Contribute to projects that shape the face of modern Egypt.", icon: "🌆" },
          ].map((v) => (
            <div key={v.title} className="flex gap-4 items-start">
              <span className="text-4xl">{v.icon}</span>
              <div>
                <h3 className="font-semibold text-[var(--dark-text)]">{v.title}</h3>
                <p className="text-sm text-[var(--muted)] mt-1 leading-6">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Job Listings — 3-column grid */}
      <section className="section bg-[var(--off-white)]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="section-label">{isAr ? "الفرص الوظيفية" : "Open Positions"}</p>
            <h2 className="section-title">{isAr ? "وظائف شاغرة حالياً" : "Current Openings"}</h2>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-[var(--line)]">
              <p className="text-[var(--muted)] text-lg">
                {isAr ? "لا توجد وظائف متاحة حالياً. تحقق لاحقاً." : "No open positions at the moment. Check back soon."}
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} isAr={isAr} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[linear-gradient(120deg,var(--navy),var(--blue))] px-5 py-20 text-white lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col items-center text-center gap-6">
          <p className="section-label text-[var(--gold-light)]">
            {isAr ? "لم تجد ما يناسبك؟" : "Don't See a Fit?"}
          </p>
          <h2 className="font-serif text-4xl font-semibold md:text-5xl">
            {isAr ? "أرسل لنا طلبك على أي حال" : "Send Us Your CV Anyway"}
          </h2>
          <p className="max-w-xl text-white/75">
            {isAr
              ? "نحن دائماً نبحث عن المواهب. أرسل سيرتك الذاتية وسنتواصل معك عند توفر فرصة مناسبة."
              : "We're always looking for talented people. Send your CV and we'll reach out when the right opportunity opens up."}
          </p>
          <Link href="/contact" className="btn btn-gold">
            {isAr ? "تواصل معنا" : "Get in Touch"}
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  );
}
