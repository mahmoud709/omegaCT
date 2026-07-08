import { getHeroSlides, createHeroSlide, deleteHeroSlide, moveHeroSlide } from "@/app/actions/hero";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { SubmitButton } from "@/app/components/SubmitButton";

export default async function HeroManager() {
  const slides = await getHeroSlides();

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Hero Images</h1>
        <p className="text-gray-500 mt-1">Manage the massive background slider images on the homepage.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Slide</h2>
            <form action={createHeroSlide} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-900">Upload Hero Image *</label>
                <input type="file" id="image" name="image" accept="image/*" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] focus:border-[var(--gold)] outline-none transition bg-white" />
                <p className="text-xs text-gray-500">Image will securely upload to Cloudinary. Please wait a few seconds after clicking add.</p>
              </div>
              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-900 mb-1">Order (Number)</label>
                <input type="number" id="order" name="order" required defaultValue="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--gold)] outline-none" />
              </div>
              <SubmitButton className="w-full flex justify-center items-center gap-2 bg-[var(--gold)] hover:bg-yellow-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors">
                <Plus size={18} /> Add Slide
              </SubmitButton>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="grid gap-4">
            {slides.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
                No hero slides found. Add one on the left.
              </div>
            ) : (
              slides.map((slide, index) => {
                const moveUpAction = moveHeroSlide.bind(null, slide.id, "up");
                const moveDownAction = moveHeroSlide.bind(null, slide.id, "down");
                const deleteAction = deleteHeroSlide.bind(null, slide.id);
                return (
                  <div key={slide.id} className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-3 shadow-sm hover:border-gray-300 transition-colors">
                    <div 
                      className="w-24 h-14 bg-cover bg-center rounded border border-gray-200 shrink-0"
                      style={{ backgroundImage: `url(${slide.imagePath})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 font-mono text-xs truncate" title={slide.imagePath}>
                        {slide.imagePath.split('/').pop()}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Order: {slide.order}</p>
                    </div>
                    
                    <div className="flex items-center gap-1 shrink-0">
                      <div className="flex flex-col gap-1 mr-2">
                        <form action={moveUpAction}>
                          <button type="submit" disabled={index === 0} className="p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-30 disabled:hover:bg-transparent">
                            <ChevronUp size={16} />
                          </button>
                        </form>
                        <form action={moveDownAction}>
                          <button type="submit" disabled={index === slides.length - 1} className="p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-30 disabled:hover:bg-transparent">
                            <ChevronDown size={16} />
                          </button>
                        </form>
                      </div>

                      <form action={deleteAction}>
                        <button type="submit" className="p-2.5 text-gray-400 hover:text-red-600 transition-colors bg-gray-50 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
