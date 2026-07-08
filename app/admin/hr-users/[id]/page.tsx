import { updateHRUser } from "@/app/actions/hr-users";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SubmitButton } from "@/app/components/SubmitButton";

const inp = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition text-sm";
const lbl = "block text-sm font-medium text-gray-900 mb-1.5";

export default async function EditHRUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await prisma.hrUser.findUnique({ where: { id } });
  if (!user) notFound();

  const updateWithId = updateHRUser.bind(null, id);

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/hr-users" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} /> Back to HR Accounts
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Account</h1>
        <p className="text-gray-500 mt-1">Editing: <strong>{user.name}</strong></p>
      </header>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 space-y-8">
        {/* Profile section */}
        <form action={updateWithId} className="space-y-5">
          <div>
            <label className={lbl}>Full Name *</label>
            <input type="text" name="name" defaultValue={user.name} required className={inp} />
          </div>

          <div>
            <label className={lbl}>Email Address *</label>
            <input type="email" name="email" defaultValue={user.email} required className={inp} />
          </div>

          <div>
            <label className={lbl}>Role *</label>
            <select name="role" defaultValue={user.role} className={inp}>
              <option value="RECRUITER">Recruiter — Can view & update applications</option>
              <option value="MANAGER">Manager — Full access</option>
            </select>
          </div>

          {/* Password change section */}
          <div className="pt-4 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-900 mb-3">Change Password</p>
            <p className="text-xs text-gray-400 mb-3">Leave blank to keep the current password.</p>
            <input
              type="password"
              name="newPassword"
              minLength={8}
              className={inp}
              placeholder="New password (min. 8 characters)"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link href="/admin/hr-users" className="px-5 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors text-sm">
              Cancel
            </Link>
            <SubmitButton className="px-5 py-2.5 bg-[var(--gold)] hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors text-sm">
              Save Changes
            </SubmitButton>
          </div>
        </form>

        {/* Account info */}
        <div className="pt-4 border-t border-gray-100 text-xs text-gray-400 space-y-1">
          <p>Account ID: <code className="bg-gray-100 px-1 py-0.5 rounded">{user.id}</code></p>
          <p>Created: {new Date(user.createdAt).toLocaleString()}</p>
          <p>Status: <span className={user.isActive ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>{user.isActive ? "Active" : "Inactive"}</span></p>
        </div>
      </div>
    </div>
  );
}
