"use client";

import { useActionState, useEffect } from "react";
import { loginAdmin } from "../actions/admin-auth";
import { Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[#E5B869] text-[#0A2463] rounded-lg py-3.5 font-bold hover:bg-[#d4a85c] hover:shadow-lg transition-all flex justify-center items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <div className="size-5 border-2 border-[#0A2463] border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          Secure Login
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </>
      )}
    </button>
  );
}

export default function AdminLoginPage() {
  // @ts-ignore
  const [state, formAction] = useActionState(async (prevState: any, formData: FormData) => {
    try {
      await loginAdmin(formData);
      return { error: null };
    } catch (e: any) {
      return { error: e.message };
    }
  }, { error: null });

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden" dir="ltr">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#E5B869] opacity-10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0A2463] opacity-5 rounded-full blur-[100px]" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center">
          <Link href="/" className="inline-block text-3xl font-bold tracking-widest text-[#E5B869]">
            OMEGA <span className="text-[#0A2463] text-sm tracking-normal">CMS</span>
          </Link>
          <h2 className="mt-6 text-3xl font-serif font-bold text-[#0A2463]">
            Admin Portal Access
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please authenticate to manage Omega's content.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-10 px-6 shadow-[0_12px_40px_rgba(10,36,99,0.08)] rounded-2xl sm:px-10 border border-gray-100">
            
            <div className="flex justify-center mb-8">
              <div className="size-16 bg-[#F3F4F6] rounded-full flex items-center justify-center text-[#0A2463]">
                <ShieldCheck size={32} />
              </div>
            </div>

            <form action={formAction} className="space-y-6">
              {state?.error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 text-center animate-in fade-in slide-in-from-top-2">
                  {state.error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="text-gray-400" size={18} />
                  </div>
                  <input
                    name="username"
                    type="text"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E5B869] focus:border-[#E5B869] transition-all bg-gray-50 hover:bg-white text-gray-900"
                    placeholder="Enter admin username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={18} />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E5B869] focus:border-[#E5B869] transition-all bg-gray-50 hover:bg-white text-gray-900"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="pt-2">
                <SubmitButton />
              </div>
            </form>

            <div className="mt-8 text-center text-xs text-gray-400">
              Secured by Omega Technical Contracting
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
