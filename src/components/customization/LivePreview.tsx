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

export const LivePreview = ({ className, finalStep = false }: { className?: string; finalStep?: boolean }) => {
  const { storyTitle, children, dogs, coverColor, edition, dedication } = useCustomizationStore();
  const bgColor = COVER_COLORS[coverColor as keyof typeof COVER_COLORS] || COVER_COLORS["Midnight Navy"];
  const hasDog = dogs.length > 0 && dogs[0].breed === 'Golden Retriever';

  if (!finalStep) {
    return (
      <div className={cn("flex flex-col items-center justify-center h-full", className)}>
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div key={i} animate={{ opacity: [0.05, 0.2, 0.05], y: [0, -20, 0] }} transition={{ duration: 6 + Math.random() * 8, repeat: Infinity }} className="absolute text-navy/20" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}>
                <Sparkles className="w-3 h-3" />
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-3xl shadow-2xl shadow-navy/10 p-6 flex flex-col items-center" style={{ width: 280 }}>
            <p className="text-[9px] font-bold text-navy/30 uppercase tracking-[0.3em] mb-4">Live Preview</p>

            {hasDog ? (
              <motion.div
                key={`${dogs[0].furColor}-${dogs[0].eyeColor}-${dogs[0].collarColor}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <DogPreview dog={dogs[0]} size={220} />
              </motion.div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-8 text-navy/10">
                <PawPrint className="w-20 h-20" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-navy/20">
                  {dogs.length > 0 ? dogs[0].breed : 'Your Dog Here'}
                </span>
              </div>
            )}

            {dogs.length > 0 && dogs[0].name && (
              <p className="text-[11px] font-display text-navy/60 italic mt-3">{dogs[0].name}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center h-full relative overflow-hidden", className)}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 to-transparent opacity-50" />
        {Array.from({ length: 10 }).map((_, i) => (
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
        className="w-full max-w-sm aspect-[3/4.2] rounded-r-[2.5rem] rounded-l-md relative"
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
            <h1 className="text-2xl font-display text-white leading-tight">{storyTitle || "Your Story Title"}</h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/40" />
              <Sparkles className="w-3 h-3 text-gold/60" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/40" />
            </div>
          </div>
          <div className="w-full rounded-2xl bg-white overflow-hidden flex items-center justify-center py-2">
            {hasDog ? <DogPreview dog={dogs[0]} size={160} /> : (
              <div className="py-6 text-navy/10"><PawPrint className="w-12 h-12 mx-auto" /></div>
            )}
          </div>
          <div className="space-y-1 w-full">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Featuring</p>
            <p className="text-gold font-display text-base italic">
              {children.length > 0 ? children.map(c => c.name || '...').join(' & ') : "..."}
            </p>
            {dogs.length > 0 && (
              <p className="text-gold/70 text-[10px] font-bold uppercase tracking-widest">
                & {dogs.map(d => d.name || '...').join(' & ')}
              </p>
            )}
            {dedication && (
              <p className="text-gold/50 text-[9px] italic mt-2 leading-relaxed px-2">{dedication}</p>
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
