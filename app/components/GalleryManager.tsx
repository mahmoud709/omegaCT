"use client";

import { useState, useTransition } from "react";
import { X, Loader2 } from "lucide-react";
import { removeGalleryImage } from "@/app/actions/projects";

export function GalleryManager({ projectId, galleryString }: { projectId: string, galleryString: string }) {
  const [isPending, startTransition] = useTransition();
  const [deletingImg, setDeletingImg] = useState<string | null>(null);

  const images = galleryString.split(",").filter(Boolean);

  if (images.length === 0) return null;

  const handleDelete = (img: string) => {
    setDeletingImg(img);
    startTransition(async () => {
      await removeGalleryImage(projectId, img);
      setDeletingImg(null);
    });
  };

  return (
    <div className="mt-4">
      <p className="text-xs font-semibold text-gray-700 mb-2">Current Gallery Images (Click X to delete):</p>
      <div className="flex flex-wrap gap-2">
        {images.map((img, idx) => {
          const isDeleting = isPending && deletingImg === img;
          return (
            <div key={idx} className="relative group">
              <img 
                src={img} 
                alt={`Gallery ${idx + 1}`} 
                className={`w-24 h-24 object-cover rounded border border-gray-200 transition-opacity ${isDeleting ? "opacity-50" : "opacity-100"}`} 
              />
              <button
                type="button"
                onClick={() => handleDelete(img)}
                disabled={isPending}
                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-100 disabled:bg-gray-400"
                title="Delete Image"
              >
                {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <X size={14} />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
