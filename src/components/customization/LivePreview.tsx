import React from 'react';
import { useCustomizationStore } from '@/src/store/useCustomizationStore';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { PawPrint, Sparkles, User } from 'lucide-react';
import { DogPreview } from './DogPreview';

const COVER_COLORS = {
  "Midnight Navy": "#1B1F3B",
  "Forest Green":  "#2D5016",
  "Deep Burgundy": "#6B1B2A",
  "Royal Purple":  "#3D1A6E"
};

const BookCover = () => {
  const { storyTitle, children, dogs, coverColor, edition, dedication } = useCustomizationStore();
  const bgColor = COVER_COLORS[coverColor as keyof typeof COVER_COLORS] || COVER_COLORS["Midnight Navy"];
  const hasDog = dogs.length > 0 && dogs[0].breed === 'Golden Retriever';

  return (
    <motion.div
      key={coverColor}
      initial={{ rotateY: -30, opacity: 0, scale: 0.9 }}
      animate={{ rotateY: -5, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="w-full max-w-[280px] aspect-[3/4.2] rounded-r-[2.5rem] rounded-l-md relative mx-auto"
      style={{ backgroundColor: bgColor, boxShadow: `inset 15px 0 30px rgba(0,0,0,0.3), 30px 40px 80px rgba(0,0,0,0.5)` }}
    >
      <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-black/30 to-transparent rounded-l-md" />
      <div className="p-6 h-full flex flex-col items-center justify-between text-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 border border-white/10 text-white/40 px-3 py-1 rounded-full text-[7px] font-bold tracking-[0.3em] uppercase bg-white/5">
            <span className="w-1 h-1 bg-gold rounded-full animate-pulse" />
            {edition === 'true-likeness' ? 'True Likeness' : 'Classic Edition'}
          </div>
        </div>
        <div className="space-y-2 w-full">
          <h1 className="text-xl font-display text-white leading-tight">{storyTitle || "Your Story Title"}</h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/40" />
            <Sparkles className="w-2 h-2 text-gold/60" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
        </div>
        <div className="w-full rounded-xl bg-white overflow-hidden flex items-center justify-center" style={{ minHeight: 120 }}>
          {hasDog ? (
            <DogPreview dog={dogs[0]} size={120} />
          ) : (
            <div className="py-4 text-navy/10"><PawPrint className="w-10 h-10 mx-auto" /></div>
          )}
        </div>
        <div className="space-y-1 w-full">
          <p className="text-[8px] font-bold text-white/30 uppercase tracking-[0.2em]">Featuring</p>
          <p className="text-gold font-display text-sm italic">
            {children.length > 0 && children[0].name ? children.map(c => c.name).join(' & ') : "Your child's name"}
            {dogs.length > 0 && dogs[0].name ? ' & ' + dogs.map(d => d.name || '...').join(' & ') : ''}
          </p>
          {dedication && (
            <p className="text-gold/40 text-[8px] italic mt-1 px-1">{dedication}</p>
          )}
        </div>
        <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center opacity-40">
          <span className="text-[8px] font-display text-white">S</span>
        </div>
      </div>
      <div className="absolute top-[2%] right-[-4px] w-1 h-[96%] bg-white/10 rounded-full blur-[1px]" />
    </motion.div>
  );
};

interface LivePreviewProps {
  className?: string;
  step?: number;
  compact?: boolean; // for use inside the form on mobile
}

export const LivePreview = ({ className, step = 0, compact = false }: LivePreviewProps) => {
  const { dogs } = useCustomizationStore();
  const hasDog = dogs.length > 0 && dogs[0].breed === 'Golden Retriever';
  const previewSize = compact ? 260 : 340;

  // Step 0: no preview
  if (step === 0) return null;

  // Steps 3, 4, 5: show book
  if (step === 3 || step === 4 || step === 5) {
    return (
      <div className={cn("flex flex-col items-center justify-center h-full relative overflow-hidden", className)}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-navy/40 to-transparent opacity-50" />
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div key={i} animate={{ opacity: [0.1, 0.3, 0.1], y: [0, -30, 0] }} transition={{ duration: 6 + Math.random() * 8, repeat: Infinity }} className="absolute text-white/20" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}>
              <Sparkles className="w-3 h-3" />
            </motion.div>
          ))}
        </div>
        <div className="relative z-10 w-full flex flex-col items-center gap-8">
          <BookCover />
          <div className="flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 border border-white/10">
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Join 2,400+ happy families</p>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: children placeholder
  if (step === 1) {
    return (
      <div className={cn("flex items-center justify-center h-full", className)}>
        <div className="bg-white rounded-3xl shadow-2xl shadow-navy/10 p-8 flex flex-col items-center" style={{ width: previewSize }}>
          <p className="text-[9px] font-bold text-navy/30 uppercase tracking-[0.3em] mb-6">Live Preview</p>
          <div className="flex flex-col items-center gap-4 py-10 text-navy/10">
            <User className="w-28 h-28" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-navy/20">Your child will appear here</span>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: dog compositor
  return (
    <div className={cn("flex items-center justify-center h-full", className)}>
      <div className="bg-white rounded-3xl shadow-2xl shadow-navy/10 p-6 flex flex-col items-center" style={{ width: previewSize }}>
        <p className="text-[9px] font-bold text-navy/30 uppercase tracking-[0.3em] mb-4">Live Preview</p>
        {hasDog ? (
          <DogPreview dog={dogs[0]} size={previewSize - 48} />
        ) : (
          <div className="flex flex-col items-center gap-3 py-10 text-navy/10">
            <PawPrint className="w-24 h-24" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-navy/20">
              {dogs.length > 0 ? dogs[0].breed : 'Your Dog Here'}
            </span>
          </div>
        )}
        {dogs.length > 0 && dogs[0].name && (
          <p className="text-[12px] font-display text-navy/60 italic mt-3">{dogs[0].name}</p>
        )}
      </div>
    </div>
  );
};
