import React from 'react';
import { useCustomizationStore } from '@/src/store/useCustomizationStore';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { PawPrint, Sparkles } from 'lucide-react';

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
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 to-transparent opacity-50" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
        
        {/* Floating Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.1, 0.4, 0.1],
              y: [0, -40, 0],
              x: [0, 20, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute text-white/20"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
          >
            <Sparkles className="w-3 h-3" />
          </motion.div>
        ))}
      </div>

      <motion.div
        key={coverColor}
        initial={{ rotateY: -30, opacity: 0, scale: 0.8, x: -50 }}
        animate={{ rotateY: -5, opacity: 1, scale: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20, duration: 1.5 }}
        className="w-full max-w-sm aspect-[3/4.2] rounded-r-[2.5rem] rounded-l-md relative shadow-[0_80px_120px_-20px_rgba(0,0,0,0.6)] group perspective-1000"
        style={{
          backgroundColor: bgColor,
          transformStyle: "preserve-3d",
          boxShadow: `
            inset 15px 0 30px rgba(0,0,0,0.3),
            inset -2px 0 5px rgba(255,255,255,0.1),
            30px 40px 80px rgba(0,0,0,0.5)
          `
        }}
      >
        {/* Spine Detail */}
        <div className="absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-black/30 via-black/10 to-transparent rounded-l-md" />
        <div className="absolute top-0 left-4 w-[1px] h-full bg-white/5" />
        <div className="absolute top-0 left-6 w-[1px] h-full bg-white/5" />

        <div className="p-10 h-full flex flex-col items-center justify-between text-center relative z-10">
          {/* Edition Badge */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 border border-white/10 text-white/40 px-4 py-1.5 rounded-full text-[8px] font-bold tracking-[0.3em] uppercase backdrop-blur-md bg-white/5">
              <span className="w-1 h-1 bg-gold rounded-full animate-pulse" />
              {edition === 'true-likeness' ? 'True Likeness Edition' : 'Classic Edition'}
            </div>
          </div>
          
          {/* Title Section */}
          <div className="space-y-4 w-full">
            <h1 className="text-3xl md:text-4xl font-display text-white leading-tight tracking-tight">
              {storyTitle || "Your Story Title"}
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-gold/40" />
              <Sparkles className="w-4 h-4 text-gold/60" />
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-gold/40" />
            </div>
          </div>

          {/* Dedication Preview */}
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Featuring</p>
            <p className="text-white/80 font-display text-lg italic">
              {children.length > 0 ? children.map(c => c.name || '...').join(' & ') : "..."}
            </p>
            {dogs.length > 0 && (
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                & {dogs.map(d => d.name || '...').join(' & ')}
              </p>
            )}
          </div>

          {/* Illustration/Photo Window */}
          <div className="w-full aspect-[4/3] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative group/img shadow-inner">
             {edition === 'true-likeness' && (children[0]?.photo || dogs[0]?.photo) ? (
               <div className="flex gap-1 w-full h-full p-2">
                 {children[0]?.photo && (
                   <motion.img 
                     initial={{ scale: 1.2, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     src={children[0].photo} 
                     alt="Child" 
                     className="flex-1 h-full object-cover rounded-xl shadow-2xl" 
                   />
                 )}
                 {dogs[0]?.photo && (
                   <motion.img 
                     initial={{ scale: 1.2, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     src={dogs[0].photo} 
                     alt="Dog" 
                     className="flex-1 h-full object-cover rounded-xl shadow-2xl" 
                   />
                 )}
               </div>
             ) : (
               <div className="flex flex-col items-center gap-4 text-white/5 group-hover/img:text-white/10 transition-colors duration-700">
                 <PawPrint className="w-24 h-24" />
                 <span className="text-[8px] font-bold uppercase tracking-[0.5em]">Soul Dog Stories</span>
               </div>
             )}
             
             {/* Glass overlay on image */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </div>

          {/* Footer Logo */}
          <div className="pt-4">
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-40">
              <span className="text-[10px] font-display text-white">S</span>
            </div>
          </div>
        </div>

        {/* Page Edge Detail */}
        <div className="absolute top-[2%] right-[-4px] w-1 h-[96%] bg-white/10 rounded-full blur-[1px]" />
      </motion.div>
      
      <div className="mt-12 flex items-center gap-4 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
        <div className="flex -space-x-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-navy bg-gray-200 overflow-hidden">
              <img src={`https://picsum.photos/seed/user${i}/40/40`} alt="User" referrerPolicy="no-referrer" />
            </div>
          ))}
        </div>
        <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">
          Join 2,400+ happy families
        </p>
      </div>
    </div>
  );
};
