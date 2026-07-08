"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Clock, MapPin, Building2, HardHat } from "lucide-react";
import { ImageCarousel } from "./ImageCarousel";

interface ProjectGalleryViewerProps {
  images: string[];
  project: {
    name: string;
    category: string;
    location: string;
    role: string;
    details: string;
  };
  labels: {
    category: string;
    location: string;
    role: string;
  };
}

export function ProjectGalleryViewer({ images, project, labels }: ProjectGalleryViewerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      {/* Gallery Display */}
      {images.length > 3 ? (
        <div className="relative group cursor-pointer" onClick={() => openModal(0)}>
          <div className="absolute inset-0 z-10 hidden group-hover:flex items-center justify-center bg-black/20 rounded-2xl backdrop-blur-[2px] transition-all">
            <span className="bg-white/90 text-black px-6 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition-transform">View Gallery</span>
          </div>
          <ImageCarousel images={images} projectName={project.name} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => openModal(idx)}
              className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative cursor-pointer group"
            >
              <div className="absolute inset-0 z-10 hidden group-hover:block bg-black/10 transition-colors" />
              <Image 
                src={img} 
                alt={`${project.name} gallery image ${idx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-7xl h-[90vh] md:h-[85vh] rounded-3xl overflow-hidden flex flex-col md:flex-row relative shadow-2xl">
            
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-50 p-2 bg-white/90 hover:bg-gray-100 rounded-full shadow-md transition-colors"
            >
              <X size={20} className="text-gray-700" />
            </button>

            {/* Left: Image Slider */}
            <div className="w-full md:w-2/3 h-[50vh] md:h-full relative bg-gray-100 flex items-center justify-center group">
              <Image 
                src={images[currentIndex]} 
                alt={`${project.name} preview`}
                fill
                className="object-cover md:object-contain"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
              />
              
              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 p-3 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 p-3 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Right: Project Details Panel */}
            <div className="w-full md:w-1/3 h-[40vh] md:h-full bg-white overflow-y-auto p-8 md:p-10 border-l rtl:border-l-0 rtl:border-r border-gray-100" dir="auto">
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold tracking-wider uppercase rounded-full mb-6">
                {project.category}
              </div>
              
              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2 leading-tight">
                {project.name}
              </h3>
              
              <div className="flex items-center text-gray-500 mb-8 font-medium">
                <MapPin size={16} className="mr-2 rtl:mr-0 rtl:ml-2 opacity-70" />
                <span>{project.location}</span>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-[var(--gold)]">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{labels.category}</p>
                    <p className="text-sm font-medium text-gray-900">{project.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-[var(--gold)]">
                    <HardHat size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">{labels.role}</p>
                    <p className="text-sm font-medium text-gray-900">{project.role}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line text-left rtl:text-right">
                  {project.details}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
