"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Wait 2 seconds before starting fade out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      
      // Remove from DOM after fade animation completes (800ms)
      setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-800 ease-in-out ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center overflow-hidden w-full px-8">
        {/* Logo Animation */}
        <div className="splash-logo-container flex flex-col items-center">
          <div className="relative w-48 h-48 md:w-56 md:h-56 mb-8">
            <Image 
              src="/images/logo/logo33.png" 
              alt="Omega Logo" 
              fill 
              className="object-contain"
              sizes="(max-width: 768px) 192px, 224px"
              priority
            />
          </div>
        </div>

        {/* Minimalist Progress Bar */}
        <div className="w-48 md:w-56 h-[1px] bg-gray-200 overflow-hidden splash-progress-track mb-6">
          <div className="h-full bg-[var(--gold)] splash-progress-bar" />
        </div>

        {/* Subtitle with staggered fade-in */}
        <h2 className="splash-subtitle text-[var(--navy)] uppercase tracking-[0.3em] text-xs md:text-sm font-medium">
          Constructing <span className="text-[var(--gold)]">&</span> Trading
        </h2>
      </div>

      <style jsx global>{`
        .splash-logo-container {
          opacity: 0;
          animation: elegantReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .splash-progress-track {
          opacity: 0;
          animation: fadeUp 0.8s ease-out 0.5s forwards;
        }

        .splash-progress-bar {
          width: 0%;
          animation: loadProgress 1.5s cubic-bezier(0.77, 0, 0.175, 1) 0.5s forwards;
        }

        .splash-subtitle {
          opacity: 0;
          animation: fadeIn 1s ease-out 0.8s forwards;
        }

        @keyframes elegantReveal {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes loadProgress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
