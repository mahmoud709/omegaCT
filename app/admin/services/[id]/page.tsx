import { updateService } from "@/app/actions/services";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { notFound } from "next/navigation";
import { SubmitButton } from "@/app/components/SubmitButton";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const service = await prisma.service.findUnique({ where: { id: resolvedParams.id } });

  if (!service) {
    notFound();
  }

  const updateServiceWithId = updateService.bind(null, service.id);

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <Link href="/admin/services" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Services
      </Link>
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Service</h1>
        <p className="text-gray-500 mt-1">Update expertise offering in English and Arabic.</p>
      </header>

      <form action={updateServiceWithId} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-900">Service Title (English) *</label>
              <input type="text" id="title" name="title" defaultValue={service.title} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" placeholder="e.g. General Contracting" />
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="titleAr" className="block text-sm font-medium text-gray-900">Service Title (Arabic)</label>
              <input type="text" id="titleAr" name="titleAr" defaultValue={service.titleAr} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none text-right" placeholder="e.g. المقاولات العامة" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="summary" className="block text-sm font-medium text-gray-900">Short Summary (English) *</label>
              <input type="text" id="summary" name="summary" defaultValue={service.summary} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" placeholder="A brief 1-sentence description." />
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="summaryAr" className="block text-sm font-medium text-gray-900">Short Summary (Arabic)</label>
              <input type="text" id="summaryAr" name="summaryAr" defaultValue={service.summaryAr} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none text-right" placeholder="وصف قصير" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-900">Full Description (English) *</label>
              <textarea id="description" name="description" defaultValue={service.description} rows={4} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none resize-none" placeholder="Detailed description..."></textarea>
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="descriptionAr" className="block text-sm font-medium text-gray-900">Full Description (Arabic)</label>
              <textarea id="descriptionAr" name="descriptionAr" defaultValue={service.descriptionAr} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none resize-none text-right" placeholder="وصف تفصيلي..."></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="scope" className="block text-sm font-medium text-gray-900">Scope Items (English) *</label>
              <textarea id="scope" name="scope" defaultValue={service.scope} rows={3} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none resize-none" placeholder="Comma separated: Civil Works, MEP..."></textarea>
            </div>
            <div className="space-y-2" dir="rtl">
              <label htmlFor="scopeAr" className="block text-sm font-medium text-gray-900">Scope Items (Arabic)</label>
              <textarea id="scopeAr" name="scopeAr" defaultValue={service.scopeAr} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none resize-none text-right" placeholder="مفصولة بفاصلة: أعمال مدنية، كهروميكانيكية..."></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="icon" className="block text-sm font-medium text-gray-900">Lucide Icon Name</label>
              <input type="text" id="icon" name="icon" defaultValue={service.icon} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-900">Upload Header Image (Optional)</label>
              <input type="file" id="image" name="image" accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none bg-white" />
              <p className="text-xs text-gray-500">Leave empty to keep the current image.</p>
              {service.image && (
                <div className="mt-2 w-24 h-16 bg-cover bg-center rounded border border-gray-200" style={{ backgroundImage: `url(${service.image})` }} />
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-5 border-t border-gray-200 flex justify-end">
          <SubmitButton className="flex items-center gap-2 bg-[var(--gold)] hover:bg-yellow-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
            <Save size={18} /> Update Service
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
