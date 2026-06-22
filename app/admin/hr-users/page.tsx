import { getHRUsers } from "@/app/actions/hr-users";
import { ToggleActiveButton, DeleteHRUserButton } from "./HRUserButtons";
import Link from "next/link";
import { Plus, Edit, Shield, User } from "lucide-react";

export default async function HRUsersPage() {
  const users = await getHRUsers();

  return (
    <div className="max-w-5xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">HR Accounts</h1>
          <p className="text-gray-500 mt-1">Manage who can access the HR recruitment portal.</p>
        </div>
        <Link
          href="/admin/hr-users/new"
          className="flex items-center gap-2 bg-[var(--gold)] hover:bg-yellow-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus size={18} /> Create Account
        </Link>
      </header>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Accounts", value: users.length, color: "text-gray-900" },
          { label: "Active", value: users.filter((u: any) => u.isActive).length, color: "text-green-600" },
          { label: "Inactive", value: users.filter((u: any) => !u.isActive).length, color: "text-red-500" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Created</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                  No HR accounts yet. Create the first one!
                </td>
              </tr>
            ) : users.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--navy)] flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${
                    user.role === "MANAGER"
                      ? "bg-purple-50 text-purple-700 border-purple-100"
                      : "bg-blue-50 text-blue-700 border-blue-100"
                  }`}>
                    {user.role === "MANAGER" ? <Shield size={11} /> : <User size={11} />}
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <ToggleActiveButton id={user.id} isActive={user.isActive} />
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/hr-users/${user.id}`}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                      title="Edit account"
                    >
                      <Edit size={16} />
                    </Link>
                    <DeleteHRUserButton id={user.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <strong>Note:</strong> Deactivated accounts cannot log in to the HR portal. Use this instead of deleting
        when you want to temporarily suspend access.
      </div>
    </div>
  );
}
