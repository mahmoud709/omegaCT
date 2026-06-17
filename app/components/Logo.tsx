import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="Omega home">
      <span
        className={`grid size-11 place-items-center rounded-full border text-lg font-semibold transition-transform duration-300 group-hover:scale-105 ${
          light
            ? "border-[var(--gold)] text-[var(--gold)]"
            : "border-[var(--gold)] bg-white text-[var(--gold)]"
        }`}
      >
        Ω
      </span>
      <span className="leading-none">
        <span
          className={`block font-serif text-2xl font-semibold uppercase ${
            light ? "text-white" : "text-[var(--dark-text)]"
          }`}
        >
          Omega
        </span>
        <span
          className={`font-label text-[0.62rem] uppercase tracking-[0.34em] ${
            light ? "text-white/75" : "text-[var(--gold)]"
          }`}
        >
          Contracting
        </span>
      </span>
    </Link>
  );
}
