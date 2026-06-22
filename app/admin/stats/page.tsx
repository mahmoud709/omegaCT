import { getStatsData, updateStats } from "@/app/actions/stats";
import { Save } from "lucide-react";

export default async function StatsManager() {
  const stats = await getStatsData();

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Homepage Stats</h1>
        <p className="text-gray-500 mt-1">Update the four statistical numbers shown on the homepage.</p>
      </header>

      <form action={updateStats} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-4 p-5 border border-gray-100 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-900">Years of Excellence</h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Number</label>
                <input type="number" name="yearsValue" defaultValue={stats.yearsValue} className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[var(--gold)]" />
              </div>
              <div className="w-20">
                <label className="block text-xs font-medium text-gray-500 mb-1">Suffix</label>
                <input type="text" name="yearsSuffix" defaultValue={stats.yearsSuffix} className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[var(--gold)]" />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-5 border border-gray-100 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-900">Projects Completed</h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Number</label>
                <input type="number" name="projectsValue" defaultValue={stats.projectsValue} className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[var(--gold)]" />
              </div>
              <div className="w-20">
                <label className="block text-xs font-medium text-gray-500 mb-1">Suffix</label>
                <input type="text" name="projectsSuffix" defaultValue={stats.projectsSuffix} className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[var(--gold)]" />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-5 border border-gray-100 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-900">Luxury Clients</h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Number</label>
                <input type="number" name="clientsValue" defaultValue={stats.clientsValue} className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[var(--gold)]" />
              </div>
              <div className="w-20">
                <label className="block text-xs font-medium text-gray-500 mb-1">Suffix</label>
                <input type="text" name="clientsSuffix" defaultValue={stats.clientsSuffix} className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[var(--gold)]" />
              </div>
            </div>
          </div>

          <div className="space-y-4 p-5 border border-gray-100 rounded-lg bg-gray-50">
            <h3 className="font-semibold text-gray-900">Quality Commitment</h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">Number</label>
                <input type="number" name="qualityValue" defaultValue={stats.qualityValue} className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[var(--gold)]" />
              </div>
              <div className="w-20">
                <label className="block text-xs font-medium text-gray-500 mb-1">Suffix</label>
                <input type="text" name="qualitySuffix" defaultValue={stats.qualitySuffix} className="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[var(--gold)]" />
              </div>
            </div>
          </div>

        </div>
        <div className="bg-gray-50 border-t border-gray-200 p-5 px-8 flex justify-end">
          <button type="submit" className="flex items-center gap-2 bg-[var(--gold)] hover:bg-yellow-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
            <Save size={18} /> Save Stats
          </button>
        </div>
      </form>
    </div>
  );
}
