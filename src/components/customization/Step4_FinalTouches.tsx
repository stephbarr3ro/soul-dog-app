import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useCustomizationStore } from '@/src/store/useCustomizationStore';
import { cn } from '@/src/lib/utils';

const COVER_COLORS = [
  { name: "Midnight Navy", hex: "#1B1F3B" },
  { name: "Forest Green", hex: "#2D5016" },
  { name: "Deep Burgundy", hex: "#6B1B2A" },
  { name: "Royal Purple", hex: "#3D1A6E" }
];

export const Step4_FinalTouches = () => {
  const { coverColor, setCoverColor, dedication, setDedication, giftWrapping, setGiftWrapping } = useCustomizationStore();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gold">
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">The Finishing Touches</span>
        </div>
        <h2 className="text-5xl font-display text-navy leading-tight">Final <br/><span className="italic">Details</span></h2>
        <p className="text-navy/60 text-lg leading-relaxed max-w-md">
          The small things that make your story truly yours.
        </p>
      </div>

      {/* Cover Color */}
      <div className="space-y-6">
        <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Book Cover Color</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {COVER_COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => setCoverColor(color.name)}
              className={cn(
                "group relative aspect-square rounded-[2rem] border-4 transition-all duration-700 overflow-hidden",
                coverColor === color.name ? "border-gold scale-105 shadow-2xl" : "border-white hover:border-gold/30 hover:shadow-xl"
              )}
              style={{ backgroundColor: color.hex }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-navy/20 backdrop-blur-[2px]">
                <span className="text-[9px] font-bold text-white uppercase tracking-[0.2em]">
                  {color.name}
                </span>
              </div>
              <div className={cn(
                "absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
                coverColor === color.name ? "bg-gold text-cream scale-100 rotate-0" : "bg-white/20 text-transparent scale-50 rotate-45"
              )}>
                <Check className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dedication */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Dedication Message</label>
          <span className="text-[10px] text-navy/20 uppercase tracking-widest italic">Printed inside your book</span>
        </div>
        <textarea
          value={dedication}
          onChange={(e) => setDedication(e.target.value)}
          placeholder="Write a heartfelt message to be printed on the first page..."
          className="w-full h-36 p-6 rounded-[2rem] border border-gray-100 focus:border-gold outline-none transition-all resize-none bg-gray-50/30 text-navy font-medium placeholder:text-navy/20 leading-relaxed"
        />
      </div>

      {/* Gift Wrapping */}
      <button
        onClick={() => setGiftWrapping(!giftWrapping)}
        className={cn(
          "w-full p-8 rounded-[2.5rem] border transition-all flex items-center justify-between group relative overflow-hidden",
          giftWrapping ? "border-gold bg-white shadow-2xl scale-[1.01]" : "border-gray-100 bg-white hover:border-gold/30 hover:shadow-xl"
        )}
      >
        <div className="flex items-center gap-8 text-left relative z-10">
          <div className={cn(
            "w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-500",
            giftWrapping ? "bg-gold border-gold text-cream shadow-lg" : "border-gray-100 group-hover:border-gold/30"
          )}>
            {giftWrapping && <Check className="w-5 h-5" />}
          </div>
          <div className="space-y-1">
            <p className="font-display text-xl text-navy">Add Gift Wrapping</p>
            <p className="text-[10px] font-bold text-navy/30 uppercase tracking-widest">Arrives ready to be gifted</p>
          </div>
        </div>
        <div className="text-right relative z-10">
          <span className={cn(
            "text-2xl font-display transition-colors",
            giftWrapping ? "text-gold" : "text-navy/20"
          )}>
            +$8
          </span>
        </div>

        {/* Subtle Decorative Element */}
        {giftWrapping && (
          <div className="absolute left-0 top-0 w-1 h-full bg-gold" />
        )}
      </button>
    </div>
  );
};
