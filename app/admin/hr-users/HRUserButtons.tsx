"use client";
import { toggleHRUserActive, deleteHRUser } from "@/app/actions/hr-users";
import { useTransition } from "react";
import { Power, Trash2, Loader2 } from "lucide-react";

export function ToggleActiveButton({ id, isActive }: { id: string; isActive: boolean }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      onClick={() => startTransition(() => toggleHRUserActive(id, !isActive))}
      disabled={pending}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
        isActive
          ? "bg-green-50 text-green-700 hover:bg-red-50 hover:text-red-600 border border-green-100 hover:border-red-100"
          : "bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-green-700 border border-gray-200 hover:border-green-100"
      }`}
      title={isActive ? "Click to deactivate" : "Click to activate"}
    >
      {pending ? <Loader2 size={12} className="animate-spin" /> : <Power size={12} />}
      {isActive ? "Active" : "Inactive"}
    </button>
  );
}

export function DeleteHRUserButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      onClick={() => {
        if (confirm("Delete this HR account permanently? This cannot be undone.")) {
          startTransition(() => deleteHRUser(id));
        }
      }}
      disabled={pending}
      className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
      title="Delete account"
    >
      {pending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}
