import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useCustomizationStore } from '@/src/store/useCustomizationStore';
import { cn } from '@/src/lib/utils';

const TITLES = [
  "Always With Me",
  "You Never Really Left",
  "The Stars Keep Your Spot",
  "I'll Find You Again"
];

export const Step3_StoryTitle = () => {
  const { storyTitle, setStoryTitle } = useCustomizationStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gold">
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">The Narrative</span>
        </div>
        <h2 className="text-5xl font-display text-navy leading-tight">Select Your <br/><span className="italic">Story Title</span></h2>
        <p className="text-navy/60 text-lg leading-relaxed max-w-md">
          Choose the title that best captures the essence of your family's journey.
        </p>
      </div>

      <div className="grid gap-4">
        {TITLES.map((title) => (
          <button
            key={title}
            onClick={() => setStoryTitle(title)}
            className={cn(
              "p-8 rounded-[2.5rem] border transition-all flex justify-between items-center group relative overflow-hidden",
              storyTitle === title
                ? "border-gold bg-white shadow-2xl scale-[1.01]"
                : "border-gray-100 bg-white hover:border-gold/30 hover:shadow-xl"
            )}
          >
            <div className="relative z-10">
              <span className={cn(
                "text-2xl font-display transition-all duration-500",
                storyTitle === title ? "text-navy" : "text-navy/20 group-hover:text-navy/40"
              )}>
                {title}
              </span>
            </div>

            <div className={cn(
              "w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 relative z-10",
              storyTitle === title 
                ? "bg-gold border-gold text-cream rotate-0 scale-100" 
                : "border-gray-100 text-transparent rotate-45 scale-75"
            )}>
              <Check className="w-5 h-5" />
            </div>

            {/* Subtle Decorative Element */}
            {storyTitle === title && (
              <div className="absolute left-0 top-0 w-1 h-full bg-gold" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
