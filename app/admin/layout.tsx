import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LogoutModalButton } from "../components/LogoutModalButton";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Image as ImageIcon, 
  Languages, 
  Settings,
  Wrench,
  BarChart,
  BriefcaseBusiness,
  UserCog
} from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let newAppsCount = 0;
  try { newAppsCount = await prisma.jobApplication.count({ where: { status: "NEW" } }); } catch {}
  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderKanban },
    { name: "Clients & Partners", href: "/admin/clients", icon: Users },
    { name: "Services", href: "/admin/services", icon: Wrench },
    { name: "Careers", href: "/admin/careers", icon: BriefcaseBusiness, badge: newAppsCount },
    { name: "HR Accounts", href: "/admin/hr-users", icon: UserCog },
    { name: "Stats", href: "/admin/stats", icon: BarChart },
    { name: "Hero Banner", href: "/admin/hero", icon: ImageIcon },
    { name: "Translations", href: "/admin/translations", icon: Languages },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans" dir="ltr">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <Link href="/" className="text-xl font-bold tracking-widest text-[var(--gold)]">
            OMEGA <span className="text-gray-900 text-sm tracking-normal">CMS</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <Icon size={18} className="text-gray-500" />
                <span className="flex-1">{link.name}</span>
                {(link as any).badge > 0 && (
                  <span className="bg-blue-500 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[20px] text-center">{(link as any).badge}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <LogoutModalButton type="admin" />
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="text-xs text-gray-500 text-center">
            Omega Contracting Dashboard
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        {children}
      </main>
    </div>
  );
}
