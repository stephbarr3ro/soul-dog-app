import React from 'react';
import { useCustomizationStore } from '@/src/store/useCustomizationStore';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { PawPrint, Sparkles } from 'lucide-react';
import { DogPreview } from './DogPreview';

const COVER_COLORS = {
  "Midnight Navy": "#1B1F3B",
  "Forest Green": "#2D5016",
  "Deep Burgundy": "#6B1B2A",
  "Royal Purple": "#3D1A6E"
};

export const LivePreview = ({ className }: { className?: string }) => {
  const { storyTitle, children, dogs, coverColor, edition } = useCustomizationStore();
  const bgColor = COVER_COLORS[coverColor as keyof typeof COVER_COLORS] || COVER_COLORS["Midnight Navy"];

  return (
    <div className={cn("flex flex-col items-center justify-center h-full relative overflow-hidden", className)}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 to-transparent opacity-50" />
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={i} animate={{ opacity: [0.1, 0.4, 0.1], y: [0, -40, 0] }} transition={{ duration: 5 + Math.random() * 10, repeat: Infinity }} className="absolute text-white/20" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}>
            <Sparkles className="w-3 h-3" />
          </motion.div>
        ))}
      </div>

      <motion.div
        key={coverColor}
        initial={{ rotateY: -30, opacity: 0, scale: 0.8 }}
        animate={{ rotateY: -5, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 20 }}
        className="w-full max-w-sm aspect-[3/4.2] rounded-r-[2.5rem] rounded-l-md relative group"
        style={{ backgroundColor: bgColor, boxShadow: `inset 15px 0 30px rgba(0,0,0,0.3), 30px 40px 80px rgba(0,0,0,0.5)` }}
      >
        <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-black/30 to-transparent rounded-l-md" />

        <div className="p-8 h-full flex flex-col items-center justify-between text-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 border border-white/10 text-white/40 px-4 py-1.5 rounded-full text-[8px] font-bold tracking-[0.3em] uppercase bg-white/5">
              <span className="w-1 h-1 bg-gold rounded-full animate-pulse" />
              {edition === 'true-likeness' ? 'True Likeness Edition' : 'Classic Edition'}
            </div>
          </div>

          <div className="space-y-3 w-full">
            <h1 className="text-2xl font-display text-white leading-tight">
              {storyTitle || "Your Story Title"}
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/40" />
              <Sparkles className="w-3 h-3 text-gold/60" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/40" />
            </div>
          </div>

          <div className="w-full rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center py-2">
            {dogs.length > 0 && dogs[0].breed === 'Golden Retriever' ? (
              <DogPreview dog={dogs[0]} size={200} />
            ) : (
              <div className="flex flex-col items-center gap-2 py-6 text-white/10">
                <PawPrint className="w-16 h-16" />
                <span className="text-[8px] font-bold uppercase tracking-[0.5em]">
                  {dogs.length > 0 ? dogs[0].breed : 'Soul Dog Stories'}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Featuring</p>
            <p className="text-white/80 font-display text-base italic">
              {children.length > 0 ? children.map(c => c.name || '...').join(' & ') : "..."}
            </p>
            {dogs.length > 0 && (
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                & {dogs.map(d => d.name || '...').join(' & ')}
              </p>
            )}
          </div>

          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-40">
            <span className="text-[10px] font-display text-white">S</span>
          </div>
        </div>
        <div className="absolute top-[2%] right-[-4px] w-1 h-[96%] bg-white/10 rounded-full blur-[1px]" />
      </motion.div>

      <div className="mt-8 flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 border border-white/10">
        <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Join 2,400+ happy families</p>
      </div>
    </div>
  );
};
