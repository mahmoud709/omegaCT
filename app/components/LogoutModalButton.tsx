"use client";
import { useState } from "react";
import { LogOut, X } from "lucide-react";

export function LogoutModalButton({
  type,
  className,
}: {
  type: "hr" | "admin";
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    if (type === "hr") {
      // Create a hidden form and submit it to POST /api/hr/logout
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/api/hr/logout";
      document.body.appendChild(form);
      form.submit();
    } else {
      // Basic Auth logout hack: redirect to a route that forces a 401
      window.location.href = "/api/admin/logout";
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={className || "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50 transition-colors w-full"}
      >
        <LogOut size={18} />
        <span className="flex-1 text-left">Sign Out</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl animate-[slideUp_0.2s_ease-out]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Sign Out</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-600 text-sm mb-6">
              Are you sure you want to sign out of your {type === "admin" ? "admin" : "HR"} account? You will need to enter your credentials again to access the dashboard.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <LogOut size={16} /> Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
