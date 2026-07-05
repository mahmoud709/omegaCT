"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { navItems } from "../data/site";

const navKeys = ["home", "about", "services", "projects", "partners", "contact"] as const;

export function Header({ logoUrl }: { logoUrl?: string }) {
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = isScrolled || isOpen || pathname !== "/";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/95 shadow-[0_14px_40px_rgba(10,36,99,0.08)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo light={!solid} src={logoUrl} />

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item, index) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${active ? "is-active" : ""} ${
                  solid ? "text-[var(--dark-text)]" : "text-white"
                }`}
              >
                {t(navKeys[index])}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher solid={solid} />
          <Link href="/contact" className="btn btn-gold">
            {t("contactUs")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className={`grid size-11 place-items-center rounded border transition ${
            solid
              ? "border-[var(--line)] text-[var(--dark-text)]"
              : "border-white/40 text-white"
          } lg:hidden`}
          aria-label={t("toggle")}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-[var(--line)] bg-white transition-[max-height] duration-300 lg:hidden ${
          isOpen ? "max-h-[460px]" : "max-h-0 border-transparent"
        }`}
      >
        <nav className="mx-auto grid max-w-7xl gap-2 px-5 py-5">
          <div className="px-3 pb-3">
            <LanguageSwitcher solid />
          </div>
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`rounded px-3 py-3 text-sm font-semibold uppercase tracking-[0.16em] ${
                pathname === item.href
                  ? "bg-[var(--off-white)] text-[var(--gold)]"
                  : "text-[var(--dark-text)]"
              }`}
            >
              {t(navKeys[index])}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
