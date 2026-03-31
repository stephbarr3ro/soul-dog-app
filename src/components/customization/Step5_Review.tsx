import React from 'react';
import { ShoppingBag, Check, Sparkles } from 'lucide-react';
import { useCustomizationStore } from '@/src/store/useCustomizationStore';
import { cn } from '@/src/lib/utils';

export const Step5_Review = () => {
  const { edition, children, dogs, storyTitle, coverColor, giftWrapping } = useCustomizationStore();

  const basePrice = edition === 'classic' ? 45 : 89;
  const giftWrapPrice = giftWrapping ? 8 : 0;
  const total = basePrice + giftWrapPrice;

  const SummaryItem = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
      <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      <span className="text-navy font-bold">{value}</span>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gold">
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">The Final Step</span>
        </div>
        <h2 className="text-5xl font-display text-navy leading-tight">Review Your <br/><span className="italic">Creation</span></h2>
        <p className="text-navy/60 text-lg leading-relaxed max-w-md">
          A masterpiece in the making. Please review your details before we begin the magic.
        </p>
      </div>
      
      <div className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-navy/5 border border-gray-100 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
          <ShoppingBag className="w-40 h-40" />
        </div>

        <div className="space-y-2 mb-12 relative z-10">
          <SummaryItem label="Edition" value={edition === 'classic' ? 'Classic Edition' : 'True Likeness Edition'} />
          <SummaryItem label="Story Title" value={storyTitle} />
          <SummaryItem label="Children" value={`${children.length} (${children.map(c => c.name || 'Unnamed').join(', ')})`} />
          <SummaryItem label="Dogs" value={`${dogs.length} (${dogs.map(d => d.name || 'Unnamed').join(', ')})`} />
          <SummaryItem label="Cover Color" value={coverColor} />
          <SummaryItem label="Gift Wrap" value={giftWrapping ? 'Yes (+$8)' : 'No'} />
        </div>

        <div className="flex justify-between items-center pt-10 border-t border-gray-100 relative z-10">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-navy/40 uppercase tracking-[0.3em]">Total Investment</span>
            <p className="text-4xl font-display text-navy">Your Legacy Book</p>
          </div>
          <span className="text-5xl font-display text-gold">${total}</span>
        </div>
      </div>

      <div className="bg-navy/5 p-8 rounded-[2rem] border border-navy/10 flex items-start gap-6">
        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold shrink-0">
          <Check className="w-5 h-5" />
        </div>
        <p className="text-xs text-navy/40 leading-relaxed italic uppercase tracking-widest">
          By proceeding to checkout, you'll be redirected to our secure Shopify portal. Your customization details are preserved and ready for our artists.
        </p>
      </div>
    </div>
  );
};
