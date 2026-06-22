"use client";

import { Trash2 } from "lucide-react";

export function DeleteProjectButton({ id }: { id: string }) {
  return (
    <button 
      type="submit" 
      onClick={(e) => {
        if (!confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
          e.preventDefault();
        }
      }}
      className="text-gray-400 hover:text-red-600 transition-colors" 
      title="Delete"
    >
      <Trash2 size={18} />
    </button>
  );
}
