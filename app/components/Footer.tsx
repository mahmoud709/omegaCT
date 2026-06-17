import { BriefcaseBusiness, Camera, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { brand, navItems, offices, services } from "../data/site";
import { Logo } from "./Logo";

const navKeys = ["home", "about", "services", "projects", "partners", "contact"] as const;

export function Footer() {
  const footer = useTranslations("Footer");
  const nav = useTranslations("Navigation");
  const servicesT = useTranslations("Services");

  return (
    <footer className="border-t-4 border-[var(--gold)] bg-[var(--navy)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1.4fr] lg:px-8">
        <div className="space-y-5">
          <Logo light />
          <p className="max-w-sm text-sm leading-7 text-white/70">
            {footer("summary", { year: brand.established })}
          </p>
          <div className="flex gap-3">
            {[BriefcaseBusiness, Camera, Share2].map((Icon, index) => (
              <a
                key={index}
                href="#"
                aria-label="Social link"
                className="grid size-10 place-items-center rounded border border-white/15 text-[var(--gold)] transition hover:border-[var(--gold)] hover:bg-white/10"
              >
                <Icon size={18} />
              </a>
            ))}
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
            {offices.map((office) => (
              <p key={office.city} className="flex gap-3">
                <MapPin className="mt-1 shrink-0 text-[var(--gold)]" size={16} />
                <span>
                  <strong className="block text-white">{office.city}</strong>
                  {office.address}
                </span>
              </p>
            ))}
            <p className="flex gap-3">
              <Phone className="mt-1 shrink-0 text-[var(--gold)]" size={16} />
              <span>
                {brand.phone} | {brand.mobile}
              </span>
            </p>
            <p className="flex gap-3">
              <Mail className="mt-1 shrink-0 text-[var(--gold)]" size={16} />
              <span>{brand.email}</span>
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
