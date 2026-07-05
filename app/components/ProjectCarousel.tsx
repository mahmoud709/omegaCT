"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

export function ProjectCarousel({ images, projectName }: { images: string[], projectName: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth * 0.8;
      current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative group w-full overflow-hidden rounded-xl bg-gray-900 mt-12 mb-16 shadow-2xl">
      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-[50vh] md:h-[70vh] items-stretch bg-gray-900"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="snap-center shrink-0 w-full md:w-[85%] h-full flex items-center justify-center relative bg-gray-900"
          >
            <img 
              src={img} 
              alt={`${projectName} - view ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-[1.02]"
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      {images.length > 1 && (
        <>
          <button 
            onClick={() => scroll("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-black/70 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}
      
      {/* CSS to hide scrollbar for webkit */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </div>
  );
}
