import { seedDatabase } from "@/app/actions/seed";
import { uploadWhoWeAreImage } from "@/app/actions/settings";
import { prisma } from "@/lib/prisma";
import { Database, Image as ImageIcon } from "lucide-react";
import { SubmitButton } from "./SubmitButton";

export default async function SettingsManager() {
  const translations = await prisma.translation.findMany({ where: { namespace: "Settings" } });
  const getImage = (k: string) => translations.find(t => t.key === k)?.en || "";

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">System Settings</h1>
        <p className="text-gray-500 mt-1">Manage database migrations and site-wide branding images.</p>
      </header>

      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm max-w-2xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Database size={24} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Migrate Existing Data</h2>
            <p className="text-gray-500 text-sm mt-1 mb-6 leading-relaxed">
              If your database is empty, you can click this button to automatically transfer all the existing Projects, Clients, Services, and Hero Images from the website's original code into your new database.
            </p>
            
            <form action={seedDatabase}>
              <button type="submit" className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
                <Database size={16} /> Run Data Migration
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <ImageIcon className="text-[var(--gold)]" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">"Who We Are" Section Images</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { key: "whoWeAre1", label: "Top Left Image (Blueprint)" },
            { key: "whoWeAre2", label: "Bottom Left Image (Interior)" },
            { key: "whoWeAre3", label: "Right Tall Image (Site)" }
          ].map((img) => (
            <div key={img.key} className="space-y-4">
              <h3 className="font-medium text-gray-900 text-sm">{img.label}</h3>
              {getImage(img.key) ? (
                <div 
                  className="w-full h-32 bg-cover bg-center rounded-lg border border-gray-200"
                  style={{ backgroundImage: `url(${getImage(img.key)})` }}
                />
              ) : (
                <div className="w-full h-32 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
                  Default Image Used
                </div>
              )}
              
              <form action={uploadWhoWeAreImage} className="flex flex-col gap-2">
                <input type="hidden" name="imageKey" value={img.key} />
                <input type="file" name="image" accept="image/*" required className="text-xs w-full" />
                <SubmitButton />
              </form>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
