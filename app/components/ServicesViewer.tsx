"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";
import * as Icons from "lucide-react";
import { createPortal } from "react-dom";
import { getOptimizedImageUrl } from "../utils/image";

interface Service {
  id: string;
  title: string;
  summary: string;
  description: string;
  scope: string[];
  icon: string;
  image: string | null;
}

interface ServicesViewerProps {
  services: Service[];
  learnMoreLabel: string;
  closeLabel?: string;
  serviceLabel?: string;
  scopeTitle?: string;
  overviewTitle?: string;
}

export function ServicesViewer({
  services,
  learnMoreLabel,
  closeLabel = "Close",
  serviceLabel = "Service",
  scopeTitle = "Scope of Work",
  overviewTitle = "Overview",
}: ServicesViewerProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      setMounted(false);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, []);

  const openModal = (service: Service) => {
    setSelectedService(service);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      {/* Grid of Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => {
          // @ts-ignore
          const Icon = Icons[service.icon] || Icons.Wrench;
          return (
            <div
              key={service.id}
              onClick={() => openModal(service)}
              className="cursor-pointer group h-full"
            >
              <article className="service-card h-full transition-all duration-300 hover:shadow-xl hover:border-[var(--gold)]/30 border border-transparent bg-white p-8 rounded-2xl flex flex-col justify-between">
                <div>
                  <Icon className="mb-6 text-[var(--gold)] group-hover:scale-110 transition-transform duration-300" size={34} />
                  <h3 className="font-serif text-2xl font-semibold text-[var(--dark-text)] group-hover:text-[var(--gold)] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-4 leading-7 text-[var(--muted)] line-clamp-3">
                    {service.summary}
                  </p>
                </div>
                <span className="text-link mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--gold)] group-hover:text-yellow-600 transition-colors">
                  {learnMoreLabel} <ArrowRight size={16} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </span>
              </article>
            </div>
          );
        })}
      </div>

      {/* Modal Dialog */}
      {selectedService && mounted && createPortal(
        <div 
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200"
          style={{ position: "fixed" }}
          onClick={closeModal}
        >
          {/* Close Button */}
          <button 
            onClick={closeModal}
            className="absolute top-6 right-6 md:top-8 md:right-8 z-[100000] p-3 bg-black/50 hover:bg-black/80 rounded-full text-white shadow-lg transition-colors border border-white/10 cursor-pointer"
          >
            <X size={24} />
          </button>

          <div 
            className="bg-white w-full max-w-7xl h-[90vh] md:h-[85vh] rounded-3xl overflow-hidden flex flex-col md:flex-row relative shadow-2xl mt-8 md:mt-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left side: Image */}
            <div className="w-full md:w-2/3 h-[40vh] md:h-full relative bg-gray-100 flex items-center justify-center">
              <Image 
                src={getOptimizedImageUrl(selectedService.image || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=80", 1600)} 
                alt={selectedService.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
                unoptimized={selectedService.image?.startsWith("http")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Right side: Info */}
            <div 
              className="w-full md:w-1/3 h-[50vh] md:h-full bg-white overflow-y-auto p-8 md:p-10 border-l rtl:border-l-0 rtl:border-r border-gray-100 flex flex-col justify-between"
              dir="auto"
            >
              <div>
                <div className="inline-block px-3 py-1 bg-yellow-50 text-[var(--gold)] text-xs font-bold tracking-wider uppercase rounded-full mb-6">
                  {serviceLabel}
                </div>
                
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                  {selectedService.title}
                </h3>

                {/* Description */}
                <div className="mb-8">
                  <h4 className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
                    {overviewTitle}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line text-left rtl:text-right">
                    {selectedService.description}
                  </p>
                </div>

                {/* Scope list */}
                {selectedService.scope && selectedService.scope.length > 0 && (
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-4">
                      {scopeTitle}
                    </h4>
                    <div className="space-y-3">
                      {selectedService.scope.map((item, idx) => (
                        <div key={idx} className="flex gap-3 text-sm text-gray-700">
                          <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--gold)]" size={16} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal footer Close Button */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full btn btn-gold justify-center py-3 text-sm"
                >
                  {closeLabel}
                </button>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}
