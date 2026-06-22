import { FolderKanban, Users, ImageIcon, Languages } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const cards = [
    { title: "Manage Projects", desc: "Add, edit, and organize all your contracting projects.", icon: FolderKanban, href: "/admin/projects", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Clients & Partners", desc: "Update your marquee with new client logos and names.", icon: Users, href: "/admin/clients", color: "text-green-600", bg: "bg-green-50" },
    { title: "Hero Images", desc: "Change the massive background slider on the homepage.", icon: ImageIcon, href: "/admin/hero", color: "text-purple-600", bg: "bg-purple-50" },
    { title: "Website Text (CMS)", desc: "Translate and edit every piece of text on the website.", icon: Languages, href: "/admin/translations", color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="max-w-5xl">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome to Omega CMS</h1>
        <p className="mt-2 text-gray-500">Manage all your content, images, and projects dynamically.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href} className="group block p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[var(--gold)] transition-colors">{card.title}</h2>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
