import { hrArabic } from "./language";
import { LanguageSwitch } from "./LanguageSwitch";
import { getHRSession } from "@/lib/hr-auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { LayoutDashboard, Users } from "lucide-react";
import { LogoutModalButton } from "../components/LogoutModalButton";

export default async function HRLayout({ children }: { children: React.ReactNode }) {
  const ar = await hrArabic();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // If we are on the login page, just render the login page full screen (no sidebar)
  if (pathname.startsWith("/hr/login")) {
    return <div dir={ar ? "rtl" : "ltr"} lang={ar ? "ar" : "en"}><div className="absolute top-4 end-4 z-10 text-white"><LanguageSwitch ar={ar} /></div>{children}</div>;
  }

  const session = await getHRSession();
  if (!session) redirect("/hr/login");

  return (
    <div className="flex h-screen bg-gray-50 font-sans" dir={ar ? "rtl" : "ltr"} lang={ar ? "ar" : "en"}>
      <aside className="w-64 bg-[var(--navy)] flex flex-col shadow-xl">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <div>
            <p className="text-[var(--gold)] text-xs font-semibold tracking-widest uppercase">Omega</p>
            <p className="text-white font-bold text-lg">{ar ? "بوابة الموارد البشرية" : "HR Portal"}</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {[
            { name: ar ? "لوحة التحكم" : "Dashboard", href: "/hr", icon: LayoutDashboard },
            { name: ar ? "طلبات التوظيف" : "Applications", href: "/hr/applications", icon: Users },
          ].map(({ name, href, icon: Icon }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors">
              <Icon size={18} />
              {name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="text-white/80 mb-4"><LanguageSwitch ar={ar} /></div>
          <p className="text-white/50 text-xs px-4 mb-2">{session.userName}</p>
          <LogoutModalButton
            type="hr" ar={ar}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
          />
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8 lg:p-10">{children}</main>
    </div>
  );
}
