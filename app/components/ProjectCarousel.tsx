"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, MapPin, Play, Pause } from "lucide-react";
import Link from "next/link";

type Project = {
  id: string;
  slug: string;
  name: string;
  location: string;
  category: string;
  status: string;
  details: string;
  role: string;
  image: string;
};

export function ProjectCarousel({ projects, viewDetailsLabel }: { projects: Project[]; viewDetailsLabel: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalProjects = projects.length;

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      // Handle LTR vs RTL scroll coordinates
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
    const nextIndex = activeIndex === 0 ? totalProjects - 1 : activeIndex - 1;
    scrollTo(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = activeIndex === totalProjects - 1 ? 0 : activeIndex + 1;
    scrollTo(nextIndex);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  useEffect(() => {
    if (isPlaying && totalProjects > 0) {
      autoplayTimerRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    }
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPlaying, activeIndex, totalProjects]);

  if (totalProjects === 0) return null;

  return (
    <div className="w-full space-y-8">
      {/* Scrollable Container */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar px-1 py-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {projects.map((project) => (
          <div 
            key={project.id || project.slug} 
            className="snap-start shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <Link href={`/projects/${project.slug}`} className="group block h-full">
              <article className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
                {/* Image container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500" 
                    style={{ backgroundImage: `url(${project.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80'})` }}
                  />
                  
                  {/* Category Badge overlay (top-left) */}
                  <span className="absolute top-4 left-4 bg-gray-900/85 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
                    {project.category}
                  </span>
                  
                  {/* Status Badge overlay (top-right) */}
                  <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full backdrop-blur-sm ${
                    project.status === "In Progress" || project.status === "تحت الإنشاء"
                      ? "bg-yellow-500/85 text-white" 
                      : "bg-green-600/85 text-white"
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                {/* Content body */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Location */}
                  <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-gray-400">
                    <MapPin size={14} className="text-[var(--gold)] shrink-0" />
                    {project.location}
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-[var(--gold)] transition-colors line-clamp-1">
                    {project.name}
                  </h3>
                  
                  {/* Details */}
                  <p className="mt-2.5 text-sm leading-relaxed text-gray-500 line-clamp-2 flex-1">
                    {project.details}
                  </p>
                  
                  {/* Card Footer Divider & Info */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs font-bold">
                    {/* Left: Role */}
                    <span className="text-gray-400 uppercase tracking-wider">
                      {project.role}
                    </span>
                    
                    {/* Right: Action */}
                    <span className="text-[var(--gold)] group-hover:text-yellow-600 transition-colors uppercase tracking-wider flex items-center gap-2">
                      {viewDetailsLabel}
                      <svg className="w-4 h-4 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation and autoplay controls at the bottom */}
      <div className="flex items-center justify-center gap-6 pt-2">
        {/* Prev Button */}
        <button 
          type="button" 
          onClick={handlePrev}
          className="p-2 border border-gray-200 hover:border-[var(--gold)] hover:text-[var(--gold)] text-gray-400 rounded-full transition-colors bg-white shadow-sm"
          title="Previous Project"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Dots Pagination */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalProjects }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? "w-8 bg-[var(--gold)]" 
                  : "w-2.5 bg-gray-200 hover:bg-gray-400"
              }`}
              title={`Go to project slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button 
          type="button" 
          onClick={handleNext}
          className="p-2 border border-gray-200 hover:border-[var(--gold)] hover:text-[var(--gold)] text-gray-400 rounded-full transition-colors bg-white shadow-sm"
          title="Next Project"
        >
          <ChevronRight size={16} />
        </button>

        {/* Play/Pause Autoplay */}
        <button 
          type="button" 
          onClick={togglePlay}
          className="p-2 border border-gray-200 hover:border-[var(--gold)] hover:text-[var(--gold)] text-gray-400 rounded-full transition-colors bg-white shadow-sm"
          title={isPlaying ? "Pause Autoplay" : "Play Autoplay"}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
    </div>
  );
}
