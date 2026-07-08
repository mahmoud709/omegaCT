import { createHRUser } from "@/app/actions/hr-users";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { SubmitButton } from "@/app/components/SubmitButton";

const inp = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition text-sm";
const lbl = "block text-sm font-medium text-gray-900 mb-1.5";

export default function NewHRUserPage() {
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/hr-users" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} /> Back to HR Accounts
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create HR Account</h1>
        <p className="text-gray-500 mt-1">Give a team member access to the recruitment portal.</p>
      </header>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
        <form action={createHRUser} className="space-y-5">
          <div>
            <label className={lbl}>Full Name *</label>
            <input type="text" name="name" required className={inp} placeholder="e.g. Sara Hassan" />
          </div>

          <div>
            <label className={lbl}>Email Address *</label>
            <input type="email" name="email" required className={inp} placeholder="sara@omega-tc.com" />
          </div>

          <div>
            <label className={lbl}>Role *</label>
            <select name="role" className={inp}>
              <option value="RECRUITER">Recruiter — Can view & update applications</option>
              <option value="MANAGER">Manager — Full access</option>
            </select>
          </div>

          <div>
            <label className={lbl}>Password * <span className="text-gray-400 font-normal">(min. 8 characters)</span></label>
            <input type="password" name="password" required minLength={8} className={inp} placeholder="••••••••••" />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Link href="/admin/hr-users" className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors text-sm">
              Cancel
            </Link>
            <SubmitButton className="px-5 py-2.5 bg-[var(--gold)] hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors text-sm">
              Create Account
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
