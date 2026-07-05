import { getContactMessages, deleteContactMessage, markContactMessageRead } from "@/app/actions/contact";
import { Mail, MailOpen, Trash2, Calendar, MapPin, Building2, Phone, Briefcase } from "lucide-react";

export default async function AdminMessagesPage() {
  const messages = await getContactMessages();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Contact Messages</h1>
        <p className="text-gray-500 mt-1">Review and manage client inquiries submitted through the contact form.</p>
      </header>

      {messages.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-16 text-center shadow-sm">
          <Mail className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900">No messages found</h3>
          <p className="text-gray-500 mt-1">When clients submit the contact form, their submissions will show up here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {messages.map((msg) => {
            const toggleReadAction = markContactMessageRead.bind(null, msg.id, !msg.isRead);
            const deleteAction = deleteContactMessage.bind(null, msg.id);
            return (
              <div 
                key={msg.id} 
                className={`bg-white border rounded-xl shadow-sm transition-all duration-200 overflow-hidden ${
                  msg.isRead ? "border-gray-200 opacity-80" : "border-yellow-200 bg-yellow-50/10 ring-1 ring-yellow-100"
                }`}
              >
                {/* Header Info */}
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-gray-100">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold text-gray-900">{msg.name}</h2>
                      {!msg.isRead && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          New
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500">
                      <a href={`mailto:${msg.email}`} className="hover:text-[var(--gold)] font-medium transition-colors">
                        {msg.email}
                      </a>
                      {msg.phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone size={14} className="text-gray-400" /> {msg.phone}
                        </span>
                      )}
                      {msg.company && (
                        <span className="flex items-center gap-1.5">
                          <Building2 size={14} className="text-gray-400" /> {msg.company}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-gray-400" /> 
                        {new Date(msg.createdAt).toLocaleDateString("en-US", {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {msg.projectType && (
                        <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-lg">
                          <Briefcase size={12} className="text-gray-400" /> {msg.projectType}
                        </span>
                      )}
                      {msg.location && (
                        <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-lg">
                          <MapPin size={12} className="text-gray-400" /> {msg.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-start">
                    <form action={toggleReadAction}>
                      <button 
                        type="submit" 
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                          msg.isRead 
                            ? "border-gray-200 text-gray-500 hover:bg-gray-50" 
                            : "border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100"
                        }`}
                        title={msg.isRead ? "Mark as Unread" : "Mark as Read"}
                      >
                        {msg.isRead ? (
                          <>
                            <Mail size={14} /> Mark Unread
                          </>
                        ) : (
                          <>
                            <MailOpen size={14} /> Mark Read
                          </>
                        )}
                      </button>
                    </form>

                    <form action={deleteAction}>
                      <button 
                        type="submit" 
                        className="p-1.5 border border-gray-200 text-gray-400 hover:text-red-600 hover:border-red-200 rounded-lg transition-colors"
                        title="Delete Message"
                      >
                        <Trash2 size={16} />
                      </button>
                    </form>
                  </div>
                </div>

              {/* Message Body */}
              <div className="p-6 md:p-8 bg-gray-50/50">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
              </div>
            </div>
          })}
        </div>
      )}
    </div>
  );
}
