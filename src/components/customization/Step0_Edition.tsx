import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useCustomizationStore, Edition } from '@/src/store/useCustomizationStore';
import { cn } from '@/src/lib/utils';

export const Step0_Edition = () => {
  const { edition, setEdition } = useCustomizationStore();

  const options: { id: Edition; title: string; price: number; desc: string; premium?: boolean }[] = [
    {
      id: 'classic',
      title: 'Classic Edition',
      price: 45,
      desc: 'Perfectly crafted from our library of hand-drawn illustrations.',
    },
    {
      id: 'true-likeness',
      title: 'True Likeness Edition',
      price: 89,
      desc: 'Hand-drawn illustrations of YOUR exact family from a photo.',
      premium: true,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gold">
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">The Beginning</span>
        </div>
        <h2 className="text-5xl font-display text-navy leading-tight">Choose Your <br/><span className="italic">Story Edition</span></h2>
        <p className="text-navy/60 text-lg leading-relaxed max-w-md">
          Select the level of personalization for your unique legacy book.
        </p>
      </div>

      <div className="grid gap-4">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setEdition(opt.id)}
            className={cn(
              "p-6 rounded-[2rem] border transition-all relative overflow-hidden group text-left",
              edition === opt.id
                ? (opt.premium ? "border-gold bg-navy text-cream scale-[1.01]" : "border-gold bg-white scale-[1.01]")
                : "border-gray-100 bg-white hover:border-gold/40"
            )}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <h3 className={cn(
                  "font-display text-2xl transition-colors",
                  edition === opt.id ? (opt.premium ? "text-cream" : "text-navy") : "text-navy/40"
                )}>
                  {opt.title}
                </h3>
                {opt.premium && (
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
                    Most Popular Choice
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className={cn(
                  "text-2xl font-display",
                  edition === opt.id ? "text-gold" : "text-navy/20"
                )}>
                  ${opt.price}
                </span>
              </div>
            </div>

            <p className={cn(
              "text-sm leading-relaxed max-w-[80%] transition-colors",
              edition === opt.id ? (opt.premium ? "text-cream/60" : "text-navy/60") : "text-navy/20"
            )}>
              {opt.desc}
            </p>

            <div className={cn(
              "absolute bottom-8 right-8 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500",
              edition === opt.id 
                ? "bg-gold border-gold text-cream rotate-0 scale-100" 
                : "border-gray-100 text-transparent rotate-45 scale-75"
            )}>
              <Check className="w-5 h-5" />
            </div>

            {/* Subtle Gradient Overlay for Premium */}
            {opt.premium && edition === opt.id && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-3xl -mr-16 -mt-16 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
