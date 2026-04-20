import React from 'react';
import { Plus, Minus, Camera, Sparkles, ArrowRight } from 'lucide-react';
import { useCustomizationStore } from '@/src/store/useCustomizationStore';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { uploadPhoto } from '@/src/lib/supabase';

const DOG_BREEDS = {
  "Most Popular": ["Golden Retriever", "Labrador", "French Bulldog", "German Shepherd", "Poodle", "Bulldog", "Beagle", "Rottweiler", "Dachshund", "Corgi", "Australian Shepherd", "Boxer", "Husky", "Doberman", "Pomeranian", "Chihuahua"],
  "Designer / Mixed": ["Goldendoodle", "Morkie"],
  "Small Breeds": ["American Bully", "Cocker Spaniel", "Dalmatian"],
};

const BREED_FURS: Record<string, { name: string; hex: string }[]> = {
  'Golden Retriever':    [{ name:'Cream',hex:'#F5E6C8'},{ name:'Light Golden',hex:'#E8C87A'},{ name:'Golden',hex:'#D4A843'},{ name:'Dark Golden',hex:'#B8841A'},{ name:'Rich Dark Golden',hex:'#9A6A0A'},{ name:'Red Golden',hex:'#C05A20'}],
  'Labrador':            [{ name:'Black',hex:'#1A1A1A'},{ name:'Chocolate',hex:'#5C3317'},{ name:'Yellow',hex:'#E8C87A'}],
  'French Bulldog':      [{ name:'Brindle',hex:'#5C4033'},{ name:'Fawn',hex:'#C8A46E'},{ name:'Cream',hex:'#F5E6C8'},{ name:'Blue',hex:'#6B7B8D'},{ name:'White',hex:'#FFFFFF'},{ name:'Black And Tan',hex:'#2C1810'}],
  'German Shepherd':     [{ name:'Black And Tan',hex:'#2C1810'},{ name:'Black And Red',hex:'#3D1A0A'},{ name:'Sable',hex:'#8B7355'},{ name:'Black',hex:'#1A1A1A'},{ name:'Black And Cream',hex:'#4A3728'},{ name:'Black And Silver',hex:'#3D3D3D'}],
  'Poodle':              [{ name:'Black',hex:'#1A1A1A'},{ name:'White',hex:'#FFFFFF'},{ name:'Apricot',hex:'#D4956A'},{ name:'Brown',hex:'#8B4513'},{ name:'Gray',hex:'#808080'},{ name:'Cream',hex:'#F5E6C8'},{ name:'Red',hex:'#C0392B'}],
  'Bulldog':             [{ name:'Brindle',hex:'#5C4033'},{ name:'Fawn',hex:'#C8A46E'},{ name:'White',hex:'#FFFFFF'},{ name:'Red',hex:'#C0392B'},{ name:'Chocolate',hex:'#5C3317'},{ name:'Black And White',hex:'#2C2C2C'}],
  'Beagle':              [{ name:'Tricolor',hex:'#8B6914'},{ name:'Brown And White',hex:'#A0522D'},{ name:'Tan And White',hex:'#C8A46E'},{ name:'Red And White',hex:'#C0392B'},{ name:'Lemon And White',hex:'#F5DEB3'},{ name:'Brown Tan White',hex:'#8B4513'}],
  'Rottweiler':          [{ name:'Black And Red',hex:'#2C1810'}],
  'Dachshund':           [{ name:'Red',hex:'#C0392B'},{ name:'Brown',hex:'#8B4513'},{ name:'Black And Tan',hex:'#2C1810'},{ name:'Black And Cream',hex:'#4A3728'},{ name:'Brown And Tan',hex:'#6B3A2A'}],
  'Corgi':               [{ name:'Red',hex:'#C0392B'},{ name:'Fawn',hex:'#C8A46E'},{ name:'Sable',hex:'#8B7355'},{ name:'Tricolor Black And Red',hex:'#2C1810'},{ name:'Tricolor Black And Tan',hex:'#3D2B1A'},{ name:'Tricolor Fawn',hex:'#C8A46E'}],
  'Australian Shepherd': [{ name:'Blue Merle',hex:'#6B7B8D'},{ name:'Red Merle',hex:'#8B4513'},{ name:'Black',hex:'#1A1A1A'},{ name:'Red',hex:'#C0392B'},{ name:'Tricolor',hex:'#2C1810'},{ name:'Black Bicolor',hex:'#2C2C2C'}],
  'Boxer':               [{ name:'Fawn',hex:'#C8A46E'},{ name:'Brindle',hex:'#5C4033'},{ name:'White',hex:'#FFFFFF'},{ name:'Fawn Red',hex:'#C0392B'}],
  'Husky':               [{ name:'Black',hex:'#1A1A1A'},{ name:'Gray',hex:'#808080'},{ name:'Red',hex:'#C0392B'},{ name:'Sable',hex:'#8B7355'},{ name:'White',hex:'#FFFFFF'}],
  'Doberman':            [{ name:'Black',hex:'#1A1A1A'},{ name:'Brown',hex:'#8B4513'},{ name:'Blue',hex:'#6B7B8D'},{ name:'Fawn',hex:'#C8A46E'}],
  'Pomeranian':          [{ name:'Orange',hex:'#E8822A'},{ name:'Gold',hex:'#DAA520'},{ name:'Cream',hex:'#F5E6C8'},{ name:'Black',hex:'#1A1A1A'},{ name:'White',hex:'#FFFFFF'},{ name:'Sable',hex:'#8B7355'}],
  'Chihuahua':           [{ name:'Fawn',hex:'#C8A46E'},{ name:'Black',hex:'#1A1A1A'},{ name:'White',hex:'#FFFFFF'},{ name:'Black And Tan',hex:'#2C1810'}],
  'Goldendoodle':        [{ name:'Gold',hex:'#DAA520'},{ name:'Apricot',hex:'#D4956A'},{ name:'Cream',hex:'#F5E6C8'},{ name:'Chocolate',hex:'#5C3317'},{ name:'Red',hex:'#C0392B'}],
  'Morkie':              [{ name:'Black And Tan',hex:'#2C1810'},{ name:'White',hex:'#FFFFFF'},{ name:'Black And White',hex:'#2C2C2C'},{ name:'Black',hex:'#1A1A1A'},{ name:'White And Gray',hex:'#D3D3D3'},{ name:'Black And Brown',hex:'#3D1A0A'},{ name:'Blue And Tan',hex:'#6B7B8D'},{ name:'Gray And Tan',hex:'#808080'},{ name:'Biewer',hex:'#F5F5DC'}],
  'American Bully':      [{ name:'Black',hex:'#1A1A1A'},{ name:'Fawn',hex:'#C8A46E'},{ name:'Chocolate',hex:'#5C3317'},{ name:'Blue',hex:'#6B7B8D'},{ name:'Sable',hex:'#8B7355'},{ name:'Pure Blue',hex:'#4A5568'}],
  'Cocker Spaniel':      [{ name:'Gold',hex:'#DAA520'},{ name:'Black',hex:'#1A1A1A'},{ name:'Chocolate',hex:'#5C3317'},{ name:'Red',hex:'#C0392B'},{ name:'Blue Roan',hex:'#6B7B8D'},{ name:'Brown And White',hex:'#8B4513'},{ name:'Tricolor',hex:'#2C1810'}],
  'Dalmatian':           [{ name:'Black Spotted',hex:'#F5F5DC'},{ name:'Liver Spotted',hex:'#F5E6C8'}],
  'default':             [{ name:'Brown',hex:'#8B4513'},{ name:'Black',hex:'#1A1A1A'},{ name:'White',hex:'#FFFFFF'}],
};

const EYE_COLORS = [
  { name: 'Brown', hex: '#8B5E1A' }, { name: 'Dark Brown', hex: '#4A2E0A' },
  { name: 'Amber', hex: '#C8941A' }, { name: 'Hazel', hex: '#9A7830' },
  { name: 'Green', hex: '#4A7A2A' }, { name: 'Blue', hex: '#3A6AA8' },
  { name: 'Gray', hex: '#6A7A88' }, { name: 'Black', hex: '#1E1410' },
];

const COLLAR_COLORS = [
  { name: 'Sky Blue', hex: '#87CEEB' }, { name: 'Red', hex: '#E53935' },
  { name: 'Green', hex: '#43A047' }, { name: 'Yellow', hex: '#FDD835' },
  { name: 'Orange', hex: '#FB8C00' }, { name: 'Purple', hex: '#8E24AA' },
  { name: 'Pink', hex: '#E91E8C' }, { name: 'Navy', hex: '#1A237E' },
  { name: 'Black', hex: '#212121' }, { name: 'White', hex: '#F5F5F5' },
];

export const Step2_Dogs = () => {
  const { dogs, addDog, removeDog, updateDog, edition } = useCustomizationStore();
  const [isUploading, setIsUploading] = React.useState<string | null>(null);
  const isTrueLikeness = edition === 'true-likeness';

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
        <h2 className="text-5xl font-display text-navy leading-tight">Customize Your <br/><span className="italic">Dogs</span></h2>
        <p className="text-navy/60 text-lg leading-relaxed max-w-md">
          {isTrueLikeness
            ? "Upload a photo of your dog and our artists will hand-draw them perfectly."
            : "Capture the unique spirit of your furry best friends."}
        </p>
      </div>

      <AnimatePresence mode="popLayout">
        {dogs.map((dog, index) => {
          const furOptions = BREED_FURS[dog.breed] || BREED_FURS['default'];
          return (
            <motion.div key={dog.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-navy/5 border border-gray-100">
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

                {/* Collar — always shown */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Collar Color</label>
                  <div className="flex flex-wrap gap-3">
                    {COLLAR_COLORS.map((color) => (
                      <button key={color.name} onClick={() => updateDog(dog.id, { collarColor: color.name })}
                        className={cn("w-10 h-10 rounded-full border-2 transition-all hover:scale-110", dog.collarColor === color.name ? "border-gold scale-110 shadow-xl" : "border-gray-200 shadow-sm")}
                        style={{ backgroundColor: color.hex }} title={color.name} />
                    ))}
                  </div>
                </div>

                {/* CLASSIC ONLY: Fur + Eye color */}
                {!isTrueLikeness && (
                  <>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Fur Color</label>
                      <div className="grid grid-cols-2 gap-2">
                        {furOptions.map((color) => (
                          <button key={color.name} onClick={() => updateDog(dog.id, { furColor: color.name })}
                            className={cn("flex items-center gap-3 p-3 rounded-2xl border transition-all text-left", dog.furColor === color.name ? "border-gold bg-gold/5 shadow-md" : "border-gray-100 hover:border-gray-200 bg-white")}>
                            <span className="w-5 h-5 rounded-full flex-shrink-0 border border-black/10" style={{ background: color.hex }} />
                            <span className={cn("text-[12px] font-medium", dog.furColor === color.name ? "text-navy" : "text-navy/60")}>{color.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Eye Color</label>
                      <div className="flex flex-wrap gap-3">
                        {EYE_COLORS.map((color) => (
                          <button key={color.name} onClick={() => updateDog(dog.id, { eyeColor: color.name })}
                            className={cn("w-10 h-10 rounded-full border-2 transition-all hover:scale-110", dog.eyeColor === color.name ? "border-gold scale-110 shadow-xl" : "border-white shadow-sm")}
                            style={{ background: color.hex }} title={color.name} />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Photo — True Likeness only */}
                {isTrueLikeness && (
                  <div className="pt-4 space-y-3">
                    <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Reference Photo</label>
                    <div className="relative">
                      <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(dog.id, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" disabled={isUploading === dog.id} />
                      <div className={cn("border-2 border-dashed rounded-[2rem] p-8 text-center transition-all group bg-gray-50/50", isUploading === dog.id ? "border-gold" : "border-gray-100 hover:border-gold hover:bg-white")}>
                        {dog.photo ? (
                          <img src={dog.photo} alt="Preview" className="w-24 h-24 object-cover rounded-2xl shadow-xl mx-auto mb-4" />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-4"><Camera className="w-6 h-6 text-gold" /></div>
                        )}
                        <p className="text-[11px] font-bold text-navy/40 uppercase tracking-widest">{isUploading === dog.id ? "Uploading..." : dog.photo ? "Change Photo" : "Upload Reference Photo"}</p>
                        <p className="text-[10px] text-navy/20 mt-2 uppercase tracking-widest">JPG, PNG up to 10MB</p>
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
