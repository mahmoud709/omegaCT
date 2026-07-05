import { seedDatabase } from "@/app/actions/seed";
import { uploadWhoWeAreImage, updateCompanyProfile } from "@/app/actions/settings";
import { prisma } from "@/lib/prisma";
import { Database, Image as ImageIcon, Building2 } from "lucide-react";
import { SubmitButton } from "./SubmitButton";

export default async function SettingsManager() {
  let profile: any[] = [];
  let translations: any[] = [];
  try {
    translations = await prisma.translation.findMany({ where: { namespace: "Settings" } });
    profile = await prisma.translation.findMany({ where: { namespace: "CompanyProfile" } });
  } catch (e) {}
  const getImage = (k: string) => translations.find(t => t.key === k)?.en || "";
  const getProfile = (k: string) => profile.find(t => t.key === k)?.en || "";
  const getProfileAr = (k: string) => profile.find(t => t.key === k)?.ar || "";

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

      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <ImageIcon className="text-[var(--gold)]" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">Page Banner & Layout Images</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { key: "aboutBanner", label: "About Page Banner" },
            { key: "servicesBanner", label: "Services Page Banner" },
            { key: "projectsBanner", label: "Projects Page Banner" },
            { key: "contactBanner", label: "Contact Page Banner" },
            { key: "partnersBanner", label: "Partners Page Banner" },
            { key: "aboutBusiness", label: "About Page Business Image" },
            { key: "aboutTeam", label: "About Page Team Image" }
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

      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <Building2 className="text-[var(--gold)]" size={24} />
          <h2 className="text-xl font-semibold text-gray-900">Company Profile</h2>
        </div>
        
        <form action={updateCompanyProfile} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Company Logo</label>
              <input type="file" name="logo" accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none bg-white" />
              <p className="text-xs text-gray-500">Leave empty to keep the current logo. This will replace the SVG logo everywhere.</p>
              {getProfile("logo") && <img src={getProfile("logo")} alt="Logo" className="mt-2 h-12 object-contain bg-gray-900 rounded p-2" />}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Established Year</label>
              <input type="text" name="establishedEn" defaultValue={getProfile("established")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" placeholder="2003" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Phone Number</label>
              <input type="text" name="phoneEn" defaultValue={getProfile("phone")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" placeholder="+2 03-4690058" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Mobile Number</label>
              <input type="text" name="mobileEn" defaultValue={getProfile("mobile")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" placeholder="+2 010 69 771 773" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Primary Email</label>
              <input type="email" name="emailEn" defaultValue={getProfile("email")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" placeholder="info@omega-tc.com" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Chairman Name</label>
              <input type="text" name="chairmanEn" defaultValue={getProfile("chairman")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" placeholder="Eng. Sayed El-Feshawy" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Alexandria Office Address</label>
              <div className="flex gap-4">
                <input type="text" name="addressAlexEn" defaultValue={getProfile("addressAlex")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" placeholder="Address in English" />
                <input type="text" name="addressAlexAr" defaultValue={getProfileAr("addressAlex")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none text-right" placeholder="العنوان بالعربي" dir="rtl" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Cairo Office Address</label>
              <div className="flex gap-4">
                <input type="text" name="addressCairoEn" defaultValue={getProfile("addressCairo")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none" placeholder="Address in English" />
                <input type="text" name="addressCairoAr" defaultValue={getProfileAr("addressCairo")} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none text-right" placeholder="العنوان بالعربي" dir="rtl" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">Facebook URL</label>
              <input type="url" name="facebookEn" defaultValue={getProfile("facebook")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" placeholder="https://facebook.com/omega" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">LinkedIn URL</label>
              <input type="url" name="linkedinEn" defaultValue={getProfile("linkedin")} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" placeholder="https://linkedin.com/company/omega" />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button type="submit" className="px-6 py-3 bg-[var(--gold)] hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors shadow-sm">
              Save Company Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
