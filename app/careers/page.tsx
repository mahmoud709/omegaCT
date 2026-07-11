import { getOpenJobs } from "@/app/actions/careers";
import { getLocale } from "next-intl/server";
import { MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/app/data/site";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";

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
    title: isAr && j.titleAr ? j.titleAr : j.title,
    department: isAr && j.departmentAr ? j.departmentAr : j.department,
    location: isAr && j.locationAr ? j.locationAr : j.location,
    type: isAr && j.typeAr ? j.typeAr : j.type,
    description: isAr && j.descriptionAr ? j.descriptionAr : j.description,
    requirements: (isAr && j.requirementsAr ? j.requirementsAr : j.requirements)
      .split("\n")
      .map((r) => r.trim())
      .filter(Boolean),
  }));

  return (
    <>
      {/* Hero */}
      <section className="hero-small">
        <Image
          src={images.skyline}
          alt={isAr ? "الوظائف المتاحة" : "Careers at Omega"}
          fill
          priority
          className="object-cover"
          sizes="100vw"
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
            {
              title: isAr ? "بيئة عمل احترافية" : "Professional Environment",
              body: isAr ? "نعمل وفق أعلى معايير الجودة والسلامة المهنية" : "We operate to the highest standards of quality and professional safety.",
              icon: "🏗️",
            },
            {
              title: isAr ? "نمو ومسار مهني واضح" : "Clear Career Path",
              body: isAr ? "نستثمر في موظفينا ونساعدهم على التطور المستمر" : "We invest in our people and support continuous development.",
              icon: "📈",
            },
            {
              title: isAr ? "مشاريع ذات تأثير" : "Impactful Projects",
              body: isAr ? "شارك في بناء مشاريع تُشكّل ملامح مصر الحديثة" : "Contribute to projects that shape the face of modern Egypt.",
              icon: "🌆",
            },
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

      {/* Job Listings */}
      <section className="section bg-[var(--off-white)]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <p className="section-label">{isAr ? "الفرص الوظيفية" : "Open Positions"}</p>
            <h2 className="section-title">
              {isAr ? "وظائف شاغرة حالياً" : "Current Openings"}
            </h2>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-[var(--line)]">
              <p className="text-[var(--muted)] text-lg">
                {isAr ? "لا توجد وظائف متاحة حالياً. تحقق لاحقاً." : "No open positions at the moment. Check back soon."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map((job) => (
                <article
                  key={job.id}
                  className="bg-white rounded-xl border border-[var(--line)] p-8 shadow-[0_4px_24px_var(--shadow)] hover:shadow-[0_8px_40px_rgba(10,36,99,0.12)] transition-shadow"
                  dir={isAr ? "rtl" : "ltr"}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-xs font-semibold tracking-widest uppercase text-[var(--gold)] font-[var(--font-cinzel)]">
                          {job.department}
                        </span>
                        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                          {job.type}
                        </span>
                      </div>
                      <h2 className="font-serif text-2xl font-semibold text-[var(--dark-text)]">
                        {job.title}
                      </h2>
                      <p className="flex items-center gap-2 mt-2 text-sm text-(--muted)">
                        <MapPin size={14} className="text-[var(--gold)]" />
                        {job.location}
                      </p>
                      <p className="mt-4 text-[var(--muted)] leading-7 max-w-2xl">
                        {job.description}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <Link
                        href={`/apply/${job.id}`}
                        className="btn btn-gold whitespace-nowrap"
                      >
                        {isAr ? "قدّم الآن" : "Apply Now"}
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>

                  {job.requirements.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-(--line)">
                      <h3 className="text-sm font-semibold text-(--dark-text) mb-3">
                        {isAr ? "المتطلبات:" : "Requirements:"}
                      </h3>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {job.requirements.map((req: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, i: Key | null | undefined) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-(--muted)">
                            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-(--gold)" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
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
