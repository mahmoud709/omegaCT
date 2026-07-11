"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

interface ContactMapProps {
  alexLabel: string;
  cairoLabel: string;
}

export function ContactMap({ alexLabel, cairoLabel }: ContactMapProps) {
  const [activeTab, setActiveTab] = useState<"alex" | "cairo">("alex");

  const maps = {
    alex: {
      title: "Alexandria Office Map",
      q: "San Stefano Grand Plaza, Alexandria, Egypt",
    },
    cairo: {
      title: "Cairo Office Map",
      q: "Top 90 Mall, South 90th Street, Fifth Settlement, New Cairo, Egypt",
    },
  };

  const activeMap = maps[activeTab];

  return (
    <div className="space-y-6">
      {/* Tab Switcher buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setActiveTab("alex")}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-semibold transition-all duration-200 cursor-pointer ${
            activeTab === "alex"
              ? "bg-[var(--gold)] border-[var(--gold)] text-white shadow-md transform scale-[1.02]"
              : "border-gray-200 bg-white text-gray-600 hover:border-[var(--gold)] hover:text-[var(--gold)]"
          }`}
        >
          <MapPin size={16} />
          {alexLabel}
        </button>
        <button
          onClick={() => setActiveTab("cairo")}
          className={`flex items-center gap-2 px-5 py-3 rounded-lg border text-sm font-semibold transition-all duration-200 cursor-pointer ${
            activeTab === "cairo"
              ? "bg-[var(--gold)] border-[var(--gold)] text-white shadow-md transform scale-[1.02]"
              : "border-gray-200 bg-white text-gray-600 hover:border-[var(--gold)] hover:text-[var(--gold)]"
          }`}
        >
          <MapPin size={16} />
          {cairoLabel}
        </button>
      </div>

      {/* Map iframe container */}
      <div className="overflow-hidden rounded-xl border border-[var(--line)] shadow-[0_24px_70px_rgba(10,36,99,0.08)] bg-[var(--off-white)]">
        <iframe
          key={activeTab} // Force iframe reload when switching
          title={activeMap.title}
          src={`https://www.google.com/maps?q=${encodeURIComponent(activeMap.q)}&output=embed`}
          className="h-[350px] w-full md:h-[480px] border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}
