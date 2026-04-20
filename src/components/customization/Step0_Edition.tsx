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
              'w-full text-left p-8 rounded-[2rem] border-2 transition-all duration-500',
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
                  edition === ed.id ? 'text-navy' : 'text-navy/40'
                )}>
                  {ed.title}
                </h3>
                <p className={cn(
                  'text-sm leading-relaxed max-w-sm',
                  edition === ed.id ? 'text-navy/60' : 'text-navy/30'
                )}>
                  {ed.description}
                </p>
              </div>
              <span className={cn(
                'text-3xl font-display ml-6',
                edition === ed.id ? 'text-gold' : 'text-navy/30'
              )}>
                {ed.price}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
