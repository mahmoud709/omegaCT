import Link from "next/link";
import Image from "next/image";
import { getOptimizedImageUrl } from "../utils/image";

export function Logo({ light = false, src }: { light?: boolean, src?: string }) {
  const finalSrc = getOptimizedImageUrl(src || "/images/logo/logo33.png", 300);
  return (
    <Link href="/" className="group flex items-center" aria-label="Omega home">
      <Image
        src={finalSrc}
        alt="Omega Contracting and Trading"
        width={150}
        height={50}
        priority
        className={`h-7 sm:h-8 md:h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 ${
          light ? "brightness-0 invert opacity-90" : ""
        }`}
      />
    </Link>
  );
}
