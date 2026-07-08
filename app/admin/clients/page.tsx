import { getClients, createClient, deleteClient } from "@/app/actions/clients";
import { Plus, Trash2 } from "lucide-react";
import { SubmitButton } from "@/app/components/SubmitButton";

export default async function ClientsManager() {
  const clients = await getClients();

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Clients & Partners</h1>
        <p className="text-gray-500 mt-1">Manage the clients displayed in the moving marquee on your homepage.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Client</h2>
            <form action={createClient} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">Client Name *</label>
                <input type="text" id="name" name="name" required placeholder="e.g. Hilton Hotels" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" />
              </div>
              <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-900 mb-1">Logo Image Path (Optional)</label>
                <input type="text" id="logo" name="logo" placeholder="/images/clients/hilton.png" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" />
                <p className="text-xs text-gray-500 mt-1">If blank, only the name text will show up.</p>
              </div>
              <SubmitButton className="w-full flex justify-center items-center gap-2 bg-[var(--gold)] hover:bg-yellow-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                <Plus size={18} /> Add Client
              </SubmitButton>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-semibold">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Logo Path</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {clients.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-gray-500">
                      No clients found. Add your first one!
                    </td>
                  </tr>
                ) : (
                  clients.map((client) => {
                    const deleteAction = deleteClient.bind(null, client.id);
                    return (
                      <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{client.name}</td>
                        <td className="px-6 py-4 font-mono text-xs">{client.logo || "No Logo (Text Only)"}</td>
                        <td className="px-6 py-4 text-right">
                          <form action={deleteAction}>
                            <button type="submit" className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                              <Trash2 size={18} />
                            </button>
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
      </div>
    </div>
  );
}
