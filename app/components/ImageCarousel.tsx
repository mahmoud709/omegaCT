"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";

export function ImageCarousel({ images, projectName }: { images: string[]; projectName: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const totalImages = images.length;
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 768) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(totalImages / itemsPerPage);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const index = Math.round(Math.abs(scrollLeft) / clientWidth);
      setActiveIndex(index);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const isRTL = document.dir === "rtl";
      const scrollPos = index * clientWidth * (isRTL ? -1 : 1);
      scrollContainerRef.current.scrollTo({
        left: scrollPos,
        behavior: "smooth"
      });
      setActiveIndex(index);
    }
  };

  const handlePrev = () => {
    const nextIndex = activeIndex === 0 ? totalPages - 1 : activeIndex - 1;
    scrollTo(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = activeIndex === totalPages - 1 ? 0 : activeIndex + 1;
    scrollTo(nextIndex);
  };

  const togglePlay = () => setIsPlaying((prev) => !prev);

  useEffect(() => {
    if (isPlaying && totalPages > 1) {
      autoplayTimerRef.current = setInterval(() => handleNext(), 4000);
    }
    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isPlaying, activeIndex, totalPages]);

  if (totalImages === 0) return null;

  return (
    <div className="w-full space-y-8">
      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar px-1 py-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {images.map((img, index) => (
          <div 
            key={index} 
            className="snap-start shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100 relative">
              <Image 
                src={img} 
                alt={`${projectName} gallery image ${index + 1}`} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      <div className="flex items-center justify-center gap-6 pt-2">
        <button type="button" onClick={handlePrev} className="p-2 border border-gray-200 hover:border-[var(--gold)] hover:text-[var(--gold)] text-gray-400 rounded-full transition-colors bg-white shadow-sm"><ChevronLeft size={16} /></button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? "w-8 bg-[var(--gold)]" : "w-2.5 bg-gray-200 hover:bg-gray-400"}`}
            />
          ))}
        </div>
        <button type="button" onClick={handleNext} className="p-2 border border-gray-200 hover:border-[var(--gold)] hover:text-[var(--gold)] text-gray-400 rounded-full transition-colors bg-white shadow-sm"><ChevronRight size={16} /></button>
        <button type="button" onClick={togglePlay} className="p-2 border border-gray-200 hover:border-[var(--gold)] hover:text-[var(--gold)] text-gray-400 rounded-full transition-colors bg-white shadow-sm">
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
    </div>
  );
}
