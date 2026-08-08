import { MessageCircle, Mail, Share2, Camera } from "lucide-react";
import { getCachedProfile } from "@/lib/getProfile";

export default async function CompanyPage() {
  let profileData: any = {};
  try {
    const profile = await getCachedProfile();
    profileData = profile.reduce((acc: any, item: any) => {
      acc[item.key] = item.ar || item.en;
      return acc;
    }, {});
  } catch (e) {
    console.error("Error fetching profile:", e);
  }

  const whatsapp = profileData.whatsapp || "https://wa.me/201069771773";
  const facebook = profileData.facebook || "https://facebook.com/omega";
  const instagram = profileData.instagram || "https://instagram.com/omega";
  const email = profileData.email || "info@omega-tc.com";
  const logoUrl = profileData.logo || "";

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        {/* Logo Section */}
        <div className="text-center mb-6">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="Omega Logo" 
              className="w-32 h-32 mx-auto mb-4 object-contain"
            />
          ) : (
            <div className="w-32 h-32 mx-auto mb-4 bg-blue-900 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">OMEGA</span>
            </div>
          )}
          <h1 className="text-blue-900 text-xl font-bold mb-1">
            شركة أوميجا للمقاولات والتجارة
          </h1>
          <p className="text-gray-600 text-sm">
            OMEGA CONTRACTING AND TRADING
          </p>
        </div>

        {/* Contact Section */}
        <div className="space-y-3">
          <p className="text-gray-800 text-center font-semibold mb-4">
            تواصل معنا عبر وسائل التواصل الاجتماعي
          </p>

          {/* WhatsApp */}
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-500 text-white rounded-xl p-4 hover:bg-green-600 transition-all duration-300 shadow-md"
          >
            <MessageCircle size={24} />
            <div className="flex-1">
              <p className="font-semibold">واتساب</p>
            </div>
          </a>

          {/* Facebook */}
          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-blue-600 text-white rounded-xl p-4 hover:bg-blue-700 transition-all duration-300 shadow-md"
          >
            <Share2 size={24} />
            <div className="flex-1">
              <p className="font-semibold">فيسبوك</p>
            </div>
          </a>

          {/* Instagram */}
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl p-4 hover:opacity-90 transition-all duration-300 shadow-md"
          >
            <Camera size={24} />
            <div className="flex-1">
              <p className="font-semibold">إنستجرام</p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 bg-white text-gray-800 border-2 border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-all duration-300 shadow-md"
          >
            <Mail size={24} />
            <div className="flex-1">
              <p className="font-semibold">البريد الإلكتروني</p>
              <p className="text-sm text-gray-600">{email}</p>
            </div>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6">
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} شركة أوميجا للمقاولات والتجارة
        </p>
      </div>
    </div>
  );
}
