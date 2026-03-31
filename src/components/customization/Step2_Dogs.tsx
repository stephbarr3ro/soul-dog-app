import React from 'react';
import { Plus, Minus, Camera, Sparkles, ArrowRight } from 'lucide-react';
import { useCustomizationStore, Dog } from '@/src/store/useCustomizationStore';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const DOG_BREEDS = {
  "Most Popular": ["Golden Retriever", "Labrador", "French Bulldog", "German Shepherd", "Poodle", "Bulldog", "Beagle", "Rottweiler", "Dachshund", "Corgi", "Australian Shepherd", "Yorkshire Terrier", "Boxer", "Shih Tzu", "Husky", "Doberman", "Schnauzer"],
  "Designer / Mixed": ["Goldendoodle", "Labradoodle", "Bernedoodle", "Cavapoo", "Cockapoo", "Morkie", "Maltipoo", "Pomsky"],
  "Medium & Large": ["Bernese Mountain Dog", "Great Dane", "Newfoundland", "Saint Bernard", "Samoyed", "Dalmatian", "Weimaraner"],
  "Small Breeds": ["Maltese", "Chihuahua", "Pomeranian", "Bichon Frise", "Cavalier King Charles", "Pug", "Boston Terrier"],
  "My Dog": ["Mixed Breed", "Other / Describe My Dog"]
};

const FUR_COLORS = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Cream", hex: "#F5F5DC" },
  { name: "Golden", hex: "#DAA520" },
  { name: "Tan", hex: "#D2B48C" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Red", hex: "#A52A2A" },
  { name: "Grey", hex: "#808080" },
  { name: "Black", hex: "#1A1A1A" },
  { name: "Black & Tan", hex: "linear-gradient(45deg, #1A1A1A 50%, #D2B48C 50%)" },
  { name: "Black & White", hex: "linear-gradient(45deg, #1A1A1A 50%, #FFFFFF 50%)" },
  { name: "Brown & White", hex: "linear-gradient(45deg, #8B4513 50%, #FFFFFF 50%)" },
  { name: "Brindle", hex: "repeating-linear-gradient(45deg, #8B4513, #8B4513 5px, #1A1A1A 5px, #1A1A1A 10px)" },
  { name: "Merle", hex: "radial-gradient(circle, #808080 20%, #1A1A1A 80%)" },
  { name: "Blue", hex: "#4682B4" },
  { name: "Apricot", hex: "#FBCEB1" },
  { name: "Chocolate", hex: "#7B3F00" }
];

const EYE_COLORS = ["Brown", "Blue", "Green", "Amber", "Hazel", "Gray", "Heterochromia (Two Colors)", "Dark Brown"];

const COLLAR_COLORS = [
  { name: "Navy", hex: "#1B1F3B" },
  { name: "Gold", hex: "#C9A84C" },
  { name: "Red", hex: "#B22222" },
  { name: "Forest", hex: "#2D5016" },
  { name: "Purple", hex: "#3D1A6E" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Teal", hex: "#008080" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Black", hex: "#1A1A1A" },
  { name: "Leather", hex: "#8B4513" }
];

import { uploadPhoto } from '@/src/lib/supabase';

export const Step2_Dogs = () => {
  const { dogs, addDog, removeDog, updateDog, edition, setEdition } = useCustomizationStore();
  const [isUploading, setIsUploading] = React.useState<string | null>(null);

  const handlePhotoUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(id);
    const url = await uploadPhoto(file, 'dogs');
    if (url) {
      updateDog(id, { photo: url });
    }
    setIsUploading(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gold">
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">The Companions</span>
        </div>
        <h2 className="text-5xl font-display text-navy leading-tight">Customize Your <br/><span className="italic">Soul Dogs</span></h2>
        <p className="text-navy/60 text-lg leading-relaxed max-w-md">
          Capture the unique spirit of your furry best friends in every illustration.
        </p>
      </div>

      <AnimatePresence mode="popLayout">
        {dogs.map((dog, index) => (
          <motion.div
            key={dog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-navy/5 border border-gray-100 relative group"
          >
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-navy text-cream flex items-center justify-center font-display text-lg">
                  {index + 1}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-navy/40">Dog Details</span>
              </div>
              {dogs.length > 1 && (
                <button
                  onClick={() => removeDog(dog.id)}
                  className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 hover:bg-burgundy hover:text-white hover:border-burgundy transition-all"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid gap-8">
              {/* Name */}
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Dog's Name</label>
                <input
                  type="text"
                  value={dog.name}
                  onChange={(e) => updateDog(dog.id, { name: e.target.value })}
                  placeholder="Enter dog's name"
                  className="w-full p-5 rounded-2xl border border-gray-100 focus:border-gold outline-none transition-all text-navy font-medium placeholder:text-navy/20 bg-gray-50/30"
                />
              </div>

              {/* Breed */}
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Breed</label>
                <div className="relative">
                  <select
                    value={dog.breed}
                    onChange={(e) => updateDog(dog.id, { breed: e.target.value })}
                    className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/30 text-navy font-medium outline-none focus:border-gold appearance-none"
                  >
                    {Object.entries(DOG_BREEDS).map(([group, breeds]) => (
                      <optgroup key={group} label={group}>
                        {breeds.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-navy/20">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Fur Color */}
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Fur Color</label>
                <div className="flex flex-wrap gap-3">
                  {FUR_COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => updateDog(dog.id, { furColor: color.name })}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all duration-500 hover:scale-110",
                        dog.furColor === color.name ? "border-gold scale-110 shadow-xl" : "border-white shadow-sm"
                      )}
                      style={{ background: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Eye Color */}
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Eye Color</label>
                <div className="relative">
                  <select
                    value={dog.eyeColor}
                    onChange={(e) => updateDog(dog.id, { eyeColor: e.target.value })}
                    className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/30 text-navy font-medium outline-none focus:border-gold appearance-none"
                  >
                    {EYE_COLORS.map((eye) => (
                      <option key={eye} value={eye}>{eye}</option>
                    ))}
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-navy/20">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                  </div>
                </div>
              </div>

              {/* Collar Color */}
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Collar Color</label>
                <div className="flex flex-wrap gap-3">
                  {COLLAR_COLORS.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => updateDog(dog.id, { collarColor: color.name })}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition-all duration-500 hover:scale-110",
                        dog.collarColor === color.name ? "border-gold scale-110 shadow-xl" : "border-white shadow-sm"
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Photo Upload (True Likeness Only) */}
              {edition === 'true-likeness' && (
                <div className="pt-4 space-y-3">
                  <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Reference Photo</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handlePhotoUpload(dog.id, e)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      disabled={isUploading === dog.id}
                    />
                    <div className={cn(
                      "border-2 border-dashed rounded-[2rem] p-8 text-center transition-all duration-700 group bg-gray-50/50",
                      isUploading === dog.id ? "border-gold bg-gold/5" : "border-gray-100 hover:border-gold hover:bg-white hover:shadow-2xl"
                    )}>
                      {isUploading === dog.id ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full mx-auto mb-4" />
                      ) : dog.photo ? (
                        <div className="relative w-24 h-24 mx-auto mb-4">
                          <img src={dog.photo} alt="Preview" className="w-full h-full object-cover rounded-2xl shadow-xl" />
                          <div className="absolute inset-0 bg-navy/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
                          <Camera className="w-6 h-6 text-gold" />
                        </div>
                      )}
                      <p className="text-[11px] font-bold text-navy/40 uppercase tracking-widest group-hover:text-navy transition-colors">
                        {isUploading === dog.id ? "Uploading..." : dog.photo ? "Change Reference Photo" : "Upload Reference Photo"}
                      </p>
                      <p className="text-[10px] text-navy/20 mt-2 uppercase tracking-widest">JPG, PNG up to 10MB</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {dogs.length < 3 && (
        <button
          onClick={addDog}
          className="w-full py-8 rounded-[2rem] border-2 border-dashed border-gold/20 text-gold font-bold flex items-center justify-center gap-3 hover:bg-gold/5 hover:border-gold transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          <span className="uppercase tracking-[0.2em] text-[11px]">Add Another Dog</span>
        </button>
      )}

      {/* Upsell Banner */}
      {edition === 'classic' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-10 rounded-[2.5rem] bg-navy text-cream relative overflow-hidden group shadow-2xl shadow-navy/20"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
            <Sparkles className="w-40 h-40" />
          </div>
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3 text-gold">
              <Sparkles className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Premium Upgrade</span>
            </div>
            <h3 className="text-3xl font-display leading-tight">Want a <span className="italic">Perfect Match?</span></h3>
            <p className="text-cream/60 text-sm leading-relaxed max-w-md">
              Upgrade to the True Likeness Edition. Our artists will hand-draw your dogs from a photo for an exact representation.
            </p>
            <button
              onClick={() => setEdition('true-likeness')}
              className="group flex items-center gap-3 text-gold font-bold text-[11px] uppercase tracking-[0.2em] hover:text-white transition-colors"
            >
              Upgrade Now
              <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
