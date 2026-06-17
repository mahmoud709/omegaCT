import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center" aria-label="Omega home">
      <img
        src="/images/logo/logo32.png"
        alt="Omega Contracting and Trading"
        // Mobile: h-7 (28px) to h-8 (32px). Desktop: md:h-10 (40px) to lg:h-12 (48px)
        className={`h-7 sm:h-8 md:h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
          light ? "brightness-0 invert opacity-90" : ""
        }`}
      />
    </Link>
  );
}
