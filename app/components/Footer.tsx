import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import { brand, navItems, offices, services } from "../data/site";
import { Logo } from "./Logo";
import { getCachedProfile } from "@/lib/getProfile";

const navKeys = ["home", "about", "services", "projects", "partners", "careers", "contact"] as const;

export async function Footer() {
  const footer = await getTranslations("Footer");
  const nav = await getTranslations("Navigation");
  const servicesT = await getTranslations("Services");
  const locale = await getLocale();

  let profile: any[] = [];
  try {
    profile = await getCachedProfile();
  } catch(e){}
  
  const getP = (k: string) => {
    const item = profile.find(t => t.key === k);
    if (!item) return "";
    return (locale === "ar" && item.ar) ? item.ar : item.en;
  };

  const established = getP("established") || brand.established;
  const phone = getP("phone") || brand.phone;
  const mobile = getP("mobile") || brand.mobile;
  const email = getP("email") || brand.email;
  const facebook = getP("facebook") || brand.facebook;
  const linkedin = getP("linkedin") || brand.linkedin;
  const instagram = getP("instagram") || brand.instagram;

  const alexAddress = getP("addressAlex") || offices[0].address;
  const cairoAddress = getP("addressCairo") || offices[1].address;
  const logoUrl = getP("logo") || undefined;

  return (
    <footer className="border-t-4 border-[var(--gold)] bg-[var(--navy)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1.4fr] lg:px-8">
        <div className="space-y-5">
          <Logo light src={logoUrl} />
          <p className="max-w-sm text-sm leading-7 text-white/70">
            {footer("summary", { year: established })}
          </p>
          <div className="flex gap-3">
            {facebook && facebook !== "#" && (
              <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-10 place-items-center rounded border border-white/15 text-[var(--gold)] transition hover:border-[var(--gold)] hover:bg-white/10">
                <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            )}
            {instagram && instagram !== "#" && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded border border-white/15 text-[var(--gold)] transition hover:border-[var(--gold)] hover:bg-white/10">
                <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            )}
            {linkedin && linkedin !== "#" && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-10 place-items-center rounded border border-white/15 text-[var(--gold)] transition hover:border-[var(--gold)] hover:bg-white/10">
                <svg className="size-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="footer-heading">{footer("quickLinks")}</h3>
          <ul className="space-y-3">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <Link className="footer-link" href={item.href}>
                  {nav(navKeys[index])}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-heading">{footer("services")}</h3>
          <ul className="space-y-3">
            {services.slice(0, 5).map((service) => (
              <li key={service.titleKey}>
                <Link className="footer-link" href="/services">
                  {servicesT(service.titleKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-heading">{footer("contactInfo")}</h3>
          <div className="space-y-4 text-sm leading-6 text-white/70">
            <p className="flex gap-3">
              <MapPin className="mt-1 shrink-0 text-[var(--gold)]" size={16} />
              <span>
                <strong className="block text-white">{locale === "ar" ? "مكتب الإسكندرية" : "Alexandria Office"}</strong>
                {alexAddress}
              </span>
            </p>
            <p className="flex gap-3">
              <MapPin className="mt-1 shrink-0 text-[var(--gold)]" size={16} />
              <span>
                <strong className="block text-white">{locale === "ar" ? "مكتب القاهرة" : "Cairo Office"}</strong>
                {cairoAddress}
              </span>
            </p>
            
            <p className="flex gap-3">
              <Phone className="mt-1 shrink-0 text-[var(--gold)]" size={16} />
              <span>{phone} | {mobile}</span>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-1 shrink-0 text-[var(--gold)]" size={16} />
              <a href={`mailto:${email}`} className="hover:text-[var(--gold)] transition-colors">
                {email}
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs uppercase tracking-[0.18em] text-white/55">
        {footer("rights")}
      </div>
    </footer>
  );
}
