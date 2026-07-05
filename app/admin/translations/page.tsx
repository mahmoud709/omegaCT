import { getTranslations, upsertTranslation, deleteTranslation } from "@/app/actions/translations";
import { Plus, Trash2 } from "lucide-react";

export default async function TranslationsManager() {
  const translations = await getTranslations();

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Website Text (CMS)</h1>
        <p className="text-gray-500 mt-1">Override any text on the website dynamically for both English and Arabic.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add / Update Text Override</h2>
            <form action={upsertTranslation} className="space-y-4">
              <div>
                <label htmlFor="namespace" className="block text-sm font-medium text-gray-900 mb-1">Namespace *</label>
                <input type="text" id="namespace" name="namespace" required placeholder="e.g. Home" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" />
              </div>
              <div>
                <label htmlFor="key" className="block text-sm font-medium text-gray-900 mb-1">Translation Key *</label>
                <input type="text" id="key" name="key" required placeholder="e.g. spotlightTitle" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" />
              </div>
              <div>
                <label htmlFor="en" className="block text-sm font-medium text-gray-900 mb-1">English Text *</label>
                <textarea id="en" name="en" required rows={3} placeholder="Obsidier Towers" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none resize-none"></textarea>
              </div>
              <div>
                <label htmlFor="ar" className="block text-sm font-medium text-gray-900 mb-1">Arabic Text *</label>
                <textarea id="ar" name="ar" required rows={3} placeholder="أبراج أوبسيدير" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none resize-none text-right" dir="rtl"></textarea>
              </div>
              <button type="submit" className="w-full flex justify-center items-center gap-2 bg-[var(--gold)] hover:bg-yellow-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                <Plus size={18} /> Save Text
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-900 font-semibold">
                <tr>
                  <th className="px-6 py-4 w-1/4">Location (NS / Key)</th>
                  <th className="px-6 py-4 w-1/3">English</th>
                  <th className="px-6 py-4 w-1/3 text-right">Arabic</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {translations.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                      No dynamic text overrides found. Add one to override the default JSON files!
                    </td>
                  </tr>
                ) : (
                  translations.map((t) => {
                    const deleteAction = deleteTranslation.bind(null, t.id);
                    return (
                      <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="block font-medium text-gray-900">{t.namespace}</span>
                          <span className="block font-mono text-xs text-gray-400 mt-1">{t.key}</span>
                        </td>
                        <td className="px-6 py-4">{t.en}</td>
                        <td className="px-6 py-4 text-right font-arabic" dir="rtl">{t.ar}</td>
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
