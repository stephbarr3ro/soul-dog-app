import React from 'react';
import { useCustomizationStore } from '@/src/store/useCustomizationStore';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const EDITIONS = [
  {
    id: 'classic' as const,
    title: 'Classic Edition',
    price: '$45',
    description: 'Perfectly crafted from our library of hand-drawn illustrations.',
  },
  {
    id: 'true-likeness' as const,
    title: 'True Likeness Edition',
    price: '$89',
    badge: 'MOST POPULAR CHOICE',
    description: 'Hand-drawn illustrations of YOUR exact family from a photo.',
  },
];

export const Step0_Edition = () => {
  const { edition, setEdition } = useCustomizationStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gold">
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">The Beginning</span>
        </div>
        <h2 className="text-5xl font-display text-navy leading-tight">
          Choose Your <br /><span className="italic">Story Edition</span>
        </h2>
        <p className="text-navy/60 text-lg leading-relaxed max-w-md">
          Select the level of personalization for your unique legacy book.
        </p>
      </div>

      <div className="space-y-4">
        {EDITIONS.map((ed) => (
          <motion.button
            key={ed.id}
            onClick={() => setEdition(ed.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              'w-full text-left p-8 rounded-[2rem] border-2 transition-all duration-500 relative overflow-hidden',
              edition === ed.id
                ? 'border-gold bg-white shadow-2xl shadow-gold/10'
                : 'border-gray-100 bg-white/50 opacity-60 hover:opacity-80'
            )}
          >
            {ed.badge && (
              <span className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] mb-2 block">
                {ed.badge}
              </span>
            )}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className={cn(
                  'text-2xl font-display',
                  edition ===
cat > src/components/customization/Step2_Dogs.tsx << 'ENDOFFILE'
import React from 'react';
import { Plus, Minus, Camera, Sparkles, ArrowRight } from 'lucide-react';
import { useCustomizationStore, Dog } from '@/src/store/useCustomizationStore';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { uploadPhoto } from '@/src/lib/supabase';

const DOG_BREEDS = {
  "Most Popular": ["Golden Retriever", "Labrador", "French Bulldog", "German Shepherd", "Poodle", "Bulldog", "Beagle", "Rottweiler", "Dachshund", "Corgi", "Australian Shepherd", "Yorkshire Terrier", "Boxer", "Shih Tzu", "Husky", "Doberman", "Schnauzer"],
  "Designer / Mixed": ["Goldendoodle", "Labradoodle", "Morkie", "Chihuahua"],
  "Small Breeds": ["Pomeranian", "Dalmatian", "American Bully", "Cocker Spaniel"],
};

const BREED_FURS: Record<string, { name: string; hex: string }[]> = {
  'Golden Retriever': [
    { name: 'Cream',            hex: '#F5E6C8' },
    { name: 'Light Golden',     hex: '#E8C87A' },
    { name: 'Golden',           hex: '#D4A843' },
    { name: 'Dark Golden',      hex: '#B8841A' },
    { name: 'Rich Dark Golden', hex: '#9A6A0A' },
    { name: 'Red Golden',       hex: '#C05A20' },
    { name: 'Brown',            hex: '#7A4A1A' },
    { name: 'Black',            hex: '#2A2018' },
  ],
  'default': [
    { name: 'White',  hex: '#FFFFFF' },
    { name: 'Cream',  hex: '#F5F5DC' },
    { name: 'Golden', hex: '#DAA520' },
    { name: 'Brown',  hex: '#8B4513' },
    { name: 'Black',  hex: '#1A1A1A' },
  ],
};

const EYE_COLORS = [
  { name: 'Brown',      hex: '#8B5E1A' },
  { name: 'Dark Brown', hex: '#4A2E0A' },
  { name: 'Amber',      hex: '#C8941A' },
  { name: 'Hazel',      hex: '#9A7830' },
  { name: 'Green',      hex: '#4A7A2A' },
  { name: 'Blue',       hex: '#3A6AA8' },
  { name: 'Gray',       hex: '#6A7A88' },
  { name: 'Black',      hex: '#1E1410' },
];

const COLLAR_COLORS = [
  { name: 'Sky Blue', hex: '#87CEEB' },
  { name: 'Red',      hex: '#E53935' },
  { name: 'G
cat > src/components/customization/Step2_Dogs.tsx << 'ENDOFFILE'
import React from 'react';
import { Plus, Minus, Camera, Sparkles, ArrowRight } from 'lucide-react';
import { useCustomizationStore, Dog } from '@/src/store/useCustomizationStore';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { uploadPhoto } from '@/src/lib/supabase';

const DOG_BREEDS = {
  "Most Popular": ["Golden Retriever", "Labrador", "French Bulldog", "German Shepherd", "Poodle", "Bulldog", "Beagle", "Rottweiler", "Dachshund", "Corgi", "Australian Shepherd", "Yorkshire Terrier", "Boxer", "Shih Tzu", "Husky", "Doberman", "Schnauzer"],
  "Designer / Mixed": ["Goldendoodle", "Labradoodle", "Morkie", "Chihuahua"],
  "Small Breeds": ["Pomeranian", "Dalmatian", "American Bully", "Cocker Spaniel"],
};

const BREED_FURS: Record<string, { name: string; hex: string }[]> = {
  'Golden Retriever': [
    { name: 'Cream',            hex: '#F5E6C8' },
    { name: 'Light Golden',     hex: '#E8C87A' },
    { name: 'Golden',           hex: '#D4A843' },
    { name: 'Dark Golden',      hex: '#B8841A' },
    { name: 'Rich Dark Golden', hex: '#9A6A0A' },
    { name: 'Red Golden',       hex: '#C05A20' },
    { name: 'Brown',            hex: '#7A4A1A' },
    { name: 'Black',            hex: '#2A2018' },
  ],
  'default': [
    { name: 'White',  hex: '#FFFFFF' },
    { name: 'Cream',  hex: '#F5F5DC' },
    { name: 'Golden', hex: '#DAA520' },
    { name: 'Brown',  hex: '#8B4513' },
    { name: 'Black',  hex: '#1A1A1A' },
  ],
};

const EYE_COLORS = [
  { name: 'Brown',      hex: '#8B5E1A' },
  { name: 'Dark Brown', hex: '#4A2E0A' },
  { name: 'Amber',      hex: '#C8941A' },
  { name: 'Hazel',      hex: '#9A7830' },
  { name: 'Green',      hex: '#4A7A2A' },
  { name: 'Blue',       hex: '#3A6AA8' },
  { name: 'Gray',       hex: '#6A7A88' },
  { name: 'Black',      hex: '#1E1410' },
];

const COLLAR_COLORS = [
  { name: 'Sky Blue', hex: '#87CEEB' },
  { name: 'Red',      hex: '#E53935' },
  { name: 'Green',    hex: '#43A047' },
  { name: 'Yellow',   hex: '#FDD835' },
  { name: 'Orange',   hex: '#FB8C00' },
  { name: 'Purple',   hex: '#8E24AA' },
  { name: 'Pink',     hex: '#E91E8C' },
  { name: 'Navy',     hex: '#1A237E' },
  { name: 'Black',    hex: '#212121' },
  { name: 'White',    hex: '#F0EDE6' },
];

export const Step2_Dogs = () => {
  const { dogs, addDog, removeDog, updateDog, edition, setEdition } = useCustomizationStore();
  const [isUploading, setIsUploading] = React.useState<string | null>(null);

  const handlePhotoUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(id);
    const url = await uploadPhoto(file, 'dogs');
    if (url) updateDog(id, { photo: url });
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
        <p className="text-navy/60 text-lg leading-relaxed max-w-md">Capture the unique spirit of your furry best friends.</p>
      </div>

      <AnimatePresence mode="popLayout">
        {dogs.map((dog, index) => {
          const furOptions = BREED_FURS[dog.breed] || BREED_FURS['default'];
          return (
            <motion.div key={dog.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-navy/5 border border-gray-100 relative">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-navy text-cream flex items-center justify-center font-display text-lg">{index + 1}</div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-navy/40">Dog Details</span>
                </div>
                {dogs.length > 1 && (
                  <button onClick={() => removeDog(dog.id)} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-400 transition-all">
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid gap-8">
                {/* Name */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Dog's Name</label>
                  <input type="text" value={dog.name} onChange={(e) => updateDog(dog.id, { name: e.target.value })} placeholder="Enter dog's name" className="w-full p-5 rounded-2xl border border-gray-100 focus:border-gold outline-none text-navy font-medium placeholder:text-navy/20 bg-gray-50/30" />
                </div>

                {/* Breed */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Breed</label>
                  <div className="relative">
                    <select value={dog.breed} onChange={(e) => updateDog(dog.id, { breed: e.target.value, furColor: (BREED_FURS[e.target.value] || BREED_FURS['default'])[0].name })} className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/30 text-navy font-medium outline-none focus:border-gold appearance-none">
                      {Object.entries(DOG_BREEDS).map(([group, breeds]) => (
                        <optgroup key={group} label={group}>
                          {breeds.map((b) => <option key={b} value={b}>{b}</option>)}
                        </optgroup>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-navy/20"><ArrowRight className="w-4 h-4 rotate-90" /></div>
                  </div>
                </div>

                {/* Fur */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Fur Color</label>
                  <div className="flex flex-wrap gap-3">
                    {furOptions.map((color) => (
                      <button key={color.name} onClick={() => updateDog(dog.id, { furColor: color.name })} className={cn("w-10 h-10 rounded-full border-2 transition-all hover:scale-110", dog.furColor === color.name ? "border-gold scale-110 shadow-xl" : "border-white shadow-sm")} style={{ background: color.hex }} title={color.name} />
                    ))}
                  </div>
                </div>

                {/* Eyes */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Eye Color</label>
                  <div className="flex flex-wrap gap-3">
                    {EYE_COLORS.map((color) => (
                      <button key={color.name} onClick={() => updateDog(dog.id, { eyeColor: color.name })} className={cn("w-10 h-10 rounded-full border-2 transition-all hover:scale-110", dog.eyeColor === color.name ? "border-gold scale-110 shadow-xl" : "border-white shadow-sm")} style={{ background: color.hex }} title={color.name} />
                    ))}
                  </div>
                </div>

                {/* Collar */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Collar Color</label>
                  <div className="flex flex-wrap gap-3">
                    {COLLAR_COLORS.map((color) => (
                      <button key={color.name} onClick={() => updateDog(dog.id, { collarColor: color.name })} className={cn("w-10 h-10 rounded-full border-2 transition-all hover:scale-110", dog.collarColor === color.name ? "border-gold scale-110 shadow-xl" : "border-white shadow-sm")} style={{ backgroundColor: color.hex }} title={color.name} />
                    ))}
                  </div>
                </div>

                {/* Photo upload */}
                {edition === 'true-likeness' && (
                  <div className="pt-4 space-y-3">
                    <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Reference Photo</label>
                    <div className="relative">
                      <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(dog.id, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" disabled={isUploading === dog.id} />
                      <div className={cn("border-2 border-dashed rounded-[2rem] p-8 text-center transition-all group bg-gray-50/50", isUploading === dog.id ? "border-gold bg-gold/5" : "border-gray-100 hover:border-gold hover:bg-white")}>
                        {dog.photo ? (
                          <img src={dog.photo} alt="Preview" className="w-24 h-24 object-cover rounded-2xl shadow-xl mx-auto mb-4" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-4">
                            <Camera className="w-6 h-6 text-gold" />
                          </div>
                        )}
                        <p className="text-[11px] font-bold text-navy/40 uppercase tracking-widest">{isUploading === dog.id ? "Uploading..." : dog.photo ? "Change Photo" : "Upload Reference Photo"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {dogs.length < 3 && (
        <button onClick={addDog} className="w-full py-8 rounded-[2rem] border-2 border-dashed border-gold/20 text-gold font-bold flex items-center justify-center gap-3 hover:bg-gold/5 hover:border-gold transition-all group">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform"><Plus className="w-5 h-5" /></div>
          <span className="uppercase tracking-[0.2em] text-[11px]">Add Another Dog</span>
        </button>
      )}
    </div>
  );
};
