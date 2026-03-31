import React from 'react';
import { Plus, Minus, Camera, Info, Sparkles, ArrowRight } from 'lucide-react';
import { useCustomizationStore } from '@/src/store/useCustomizationStore';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { uploadPhoto } from '@/src/lib/supabase';

const HAIR_STYLES = {
  Girl: ["Long & Straight", "Long & Wavy", "Long & Curly", "Braids", "Pigtails", "Ponytail", "Bun", "Bob", "Pixie Cut", "Afro", "Locs", "Short & Straight"],
  Boy: ["Short & Straight", "Short & Curly", "Short & Wavy", "Crew Cut", "Buzz Cut", "Side Part", "Messy/Textured", "Afro", "Locs", "Mohawk", "Undercut", "Medium Length"]
};

const SKIN_TONES = [
  "#FCE6D7", "#FBD9C3", "#F9C9A9", "#F7B990", "#E8A078", "#D68D66",
  "#C47A54", "#B26742", "#8E4F30", "#6B3A1F", "#482612", "#251205"
];

const HAIR_COLORS = [
  { name: "Blonde", hex: "#E9C17B" }, { name: "Golden", hex: "#D4A017" },
  { name: "Light Brown", hex: "#A0785A" }, { name: "Medium Brown", hex: "#785032" },
  { name: "Dark Brown", hex: "#4B321E" }, { name: "Black", hex: "#1A1A1A" },
  { name: "Red", hex: "#B22222" }, { name: "Auburn", hex: "#8B4513" },
  { name: "White", hex: "#F5F5F5" }, { name: "Grey", hex: "#808080" },
  { name: "Salt & Pepper", hex: "#404040" }, { name: "Blue", hex: "#0000FF" },
  { name: "Pink", hex: "#FFC0CB" }, { name: "Purple", hex: "#800080" },
  { name: "Green", hex: "#008000" }, { name: "Teal", hex: "#008080" }
];

const EYE_COLORS = ["Blue", "Brown", "Green", "Hazel", "Gray", "Amber", "Dark Brown", "Light Blue", "Vibrant Green", "Honey"];

const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

export const Step1_Children = () => {
  const { children, addChild, removeChild, updateChild, edition, setEdition } = useCustomizationStore();
  const [isUploading, setIsUploading] = React.useState<string | null>(null);
  const isTrueLikeness = edition === 'true-likeness';

  const handlePhotoUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(id);
    const url = await uploadPhoto(file, 'children');
    if (url) updateChild(id, { photo: url });
    setIsUploading(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gold">
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Personalization</span>
        </div>
        <h2 className="text-5xl font-display text-navy leading-tight">Customize Your <br/><span className="italic">Little Ones</span></h2>
        <p className="text-navy/60 text-lg leading-relaxed max-w-md">
          {isTrueLikeness
            ? "Upload a photo of your child and our artists will hand-draw them perfectly."
            : "Every detail matters. Choose the features that best represent your child."}
        </p>
      </div>

      <AnimatePresence mode="popLayout">
        {children.map((child, index) => (
          <motion.div key={child.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-navy/5 border border-gray-100">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-navy text-cream flex items-center justify-center font-display text-lg">{index + 1}</div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-navy/40">Child Details</span>
              </div>
              {children.length > 1 && (
                <button onClick={() => removeChild(child.id)} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-400 transition-all">
                  <Minus className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid gap-8">
              {/* Name */}
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Name</label>
                <input type="text" value={child.name} onChange={(e) => updateChild(child.id, { name: e.target.value })} placeholder="Enter child's name" className="w-full p-5 rounded-2xl border border-gray-100 focus:border-gold outline-none text-navy font-medium placeholder:text-navy/20 bg-gray-50/30" />
              </div>

              {/* Gender & Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Gender</label>
                  <div className="flex bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100">
                    {['Girl', 'Boy'].map((g) => (
                      <button key={g} onClick={() => updateChild(child.id, { gender: g as 'Girl' | 'Boy', hairStyle: HAIR_STYLES[g as 'Girl' | 'Boy'][0] })}
                        className={cn("flex-1 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all", child.gender === g ? "bg-white text-navy shadow-lg" : "text-navy/30 hover:text-navy/60")}>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Age Range</label>
                  <div className="relative">
                    <select value={child.ageRange} onChange={(e) => updateChild(child.id, { ageRange: e.target.value as any })} className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/30 text-navy font-medium outline-none focus:border-gold appearance-none">
                      {['Baby', 'Toddler', '3-5', '6-8', '9-12'].map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-navy/20"><ArrowRight className="w-4 h-4 rotate-90" /></div>
                  </div>
                </div>
              </div>

              {/* CLASSIC ONLY: Skin Tone, Hair, Eyes, Toggles */}
              {!isTrueLikeness && (
                <>
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Skin Tone</label>
                    <div className="flex flex-wrap gap-3">
                      {SKIN_TONES.map((tone, i) => (
                        <button key={i} onClick={() => updateChild(child.id, { skinTone: `tone-${i + 1}` })}
                          className={cn("w-10 h-10 rounded-full border-2 transition-all hover:scale-110", child.skinTone === `tone-${i + 1}` ? "border-gold scale-110 shadow-xl" : "border-white shadow-sm")}
                          style={{ backgroundColor: tone }} />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-navy/30 italic mt-2">
                      <Info className="w-3 h-3" />
                      <span>Recommendation: Choose a shade lighter for the best print quality.</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Hair Style</label>
                    <div className="relative">
                      <select value={child.hairStyle} onChange={(e) => updateChild(child.id, { hairStyle: e.target.value })} className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/30 text-navy font-medium outline-none focus:border-gold appearance-none">
                        {HAIR_STYLES[child.gender].map((style) => <option key={style} value={style}>{style}</option>)}
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-navy/20"><ArrowRight className="w-4 h-4 rotate-90" /></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Hair Color</label>
                    <div className="flex flex-wrap gap-3">
                      {HAIR_COLORS.map((color) => (
                        <button key={color.name} onClick={() => updateChild(child.id, { hairColor: color.name })}
                          className={cn("w-10 h-10 rounded-full border-2 transition-all hover:scale-110", child.hairColor === color.name ? "border-gold scale-110 shadow-xl" : "border-white shadow-sm")}
                          style={{ backgroundColor: color.hex }} title={color.name} />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Eye Color</label>
                    <div className="relative">
                      <select value={child.eyeColor} onChange={(e) => updateChild(child.id, { eyeColor: e.target.value })} className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/30 text-navy font-medium outline-none focus:border-gold appearance-none">
                        {EYE_COLORS.map((eye) => <option key={eye} value={eye}>{eye}</option>)}
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-navy/20"><ArrowRight className="w-4 h-4 rotate-90" /></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 pt-2">
                    {[{ key: 'glasses', label: 'Glasses', val: child.glasses }, { key: 'freckles', label: 'Freckles', val: child.freckles }].map(({ key, label, val }) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" checked={val} onChange={(e) => updateChild(child.id, { [key]: e.target.checked } as any)} className="hidden" />
                        <div className={cn("w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all", val ? "bg-gold border-gold text-white shadow-lg" : "border-gray-100 group-hover:border-gold/30")}>
                          {val && <Check className="w-4 h-4" />}
                        </div>
                        <span className="text-[11px] font-bold text-navy uppercase tracking-widest">{label}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}

              {/* Photo upload — True Likeness only */}
              {isTrueLikeness && (
                <div className="pt-4 space-y-3">
                  <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Reference Photo</label>
                  <div className="relative">
                    <input type="file" accept="image/*" onChange={(e) => handlePhotoUpload(child.id, e)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" disabled={isUploading === child.id} />
                    <div className={cn("border-2 border-dashed rounded-[2rem] p-8 text-center transition-all group bg-gray-50/50", isUploading === child.id ? "border-gold bg-gold/5" : "border-gray-100 hover:border-gold hover:bg-white")}>
                      {isUploading === child.id ? (
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full mx-auto mb-4" />
                      ) : child.photo ? (
                        <img src={child.photo} alt="Preview" className="w-24 h-24 object-cover rounded-2xl shadow-xl mx-auto mb-4" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-4"><Camera className="w-6 h-6 text-gold" /></div>
                      )}
                      <p className="text-[11px] font-bold text-navy/40 uppercase tracking-widest">{isUploading === child.id ? "Uploading..." : child.photo ? "Change Reference Photo" : "Upload Reference Photo"}</p>
                      <p className="text-[10px] text-navy/20 mt-2 uppercase tracking-widest">JPG, PNG up to 10MB</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {children.length < 3 && (
        <button onClick={addChild} className="w-full py-8 rounded-[2rem] border-2 border-dashed border-gold/20 text-gold font-bold flex items-center justify-center gap-3 hover:bg-gold/5 hover:border-gold transition-all group">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:scale-110 transition-transform"><Plus className="w-5 h-5" /></div>
          <span className="uppercase tracking-[0.2em] text-[11px]">Add Another Child</span>
        </button>
      )}

      {edition === 'classic' && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 p-10 rounded-[2.5rem] bg-navy text-cream relative overflow-hidden shadow-2xl shadow-navy/20">
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3 text-gold"><Sparkles className="w-5 h-5" /><span className="text-[10px] font-bold uppercase tracking-[0.4em]">Premium Upgrade</span></div>
            <h3 className="text-3xl font-display leading-tight">Want a <span className="italic">Perfect Match?</span></h3>
            <p className="text-cream/60 text-sm leading-relaxed max-w-md">Upgrade to the True Likeness Edition. Our artists will hand-draw your children from a photo for an exact representation.</p>
            <button onClick={() => setEdition('true-likeness')} className="group flex items-center gap-3 text-gold font-bold text-[11px] uppercase tracking-[0.2em] hover:text-white transition-colors">
              Upgrade Now
              <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-all"><ArrowRight className="w-4 h-4" /></div>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
