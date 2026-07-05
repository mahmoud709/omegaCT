import { getServices, deleteService } from "@/app/actions/services";
import Link from "next/link";
import { Plus, Trash2, Pencil } from "lucide-react";
import { DeleteServiceButton } from "./DeleteServiceButton";

export default async function ServicesManager() {
  const services = await getServices();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Services</h1>
          <p className="text-gray-500 mt-1">Manage the company expertise and service offerings.</p>
        </header>
        <Link href="/admin/services/new" className="flex items-center gap-2 bg-[var(--gold)] hover:bg-yellow-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
          <Plus size={18} /> Add Service
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-semibold">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Summary</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {services.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                  No services found. Click &quot;Add Service&quot; to create one.
                </td>
              </tr>
            ) : (
              services.map((service) => {
                const deleteAction = deleteService.bind(null, service.id);
                return (
                  <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{service.title}</td>
                    <td className="px-6 py-4 truncate max-w-xs">{service.summary}</td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <Link href={`/admin/services/${service.id}`} className="p-2 text-gray-400 hover:text-[var(--gold)] transition-colors" title="Edit">
                        <Pencil size={18} />
                      </Link>
                      <form action={deleteAction}>
                        <DeleteServiceButton id={service.id} />
                      </form>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
