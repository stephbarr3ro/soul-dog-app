import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCustomizationStore } from '@/src/store/useCustomizationStore';
import { Step0_Edition } from '@/src/components/customization/Step0_Edition';
import { Step1_Children } from '@/src/components/customization/Step1_Children';
import { Step2_Dogs } from '@/src/components/customization/Step2_Dogs';
import { Step3_StoryTitle } from '@/src/components/customization/Step3_StoryTitle';
import { Step4_FinalTouches } from '@/src/components/customization/Step4_FinalTouches';
import { Step5_Review } from '@/src/components/customization/Step5_Review';
import { LivePreview } from '@/src/components/customization/LivePreview';
import { cn } from '@/src/lib/utils';
import { createCheckoutAndRedirect, getProductByHandle } from '@/src/lib/shopify';

const STEPS = [
  { id: 'edition',  label: 'Edition'  },
  { id: 'children', label: 'Children' },
  { id: 'dogs',     label: 'Dogs'     },
  { id: 'story',    label: 'Story'    },
  { id: 'final',    label: 'Final'    },
  { id: 'review',   label: 'Review'   },
];

export const Customize = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { edition, setEdition, children, dogs, storyTitle, coverColor, dedication, giftWrapping } = useCustomizationStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const editionParam = searchParams.get('edition');
    if (editionParam === 'classic' || editionParam === 'true-likeness') {
      setEdition(editionParam);
      setCurrentStep(1);
    }
  }, [searchParams, setEdition]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      handleAddToCart();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/');
    }
  };

  const handleAddToCart = async () => {
    setIsProcessing(true);
    try {
      const productHandle = edition === 'classic' ? 'classic-edition' : 'true-likeness-edition';
      const product = await getProductByHandle(productHandle);
      if (!product) throw new Error('Product not found');

      const customProperties: Record<string, string> = {
        'Edition': edition === 'classic' ? 'Classic Edition' : 'True Likeness Edition',
        'Story Title': storyTitle,
        'Cover Color': coverColor,
        'Dedication': dedication,
        'Gift Wrapping': giftWrapping ? 'Yes' : 'No',
      };

      children.forEach((child, i) => {
        customProperties[`Child ${i + 1} Name`] = child.name;
        customProperties[`Child ${i + 1} Gender`] = child.gender;
        customProperties[`Child ${i + 1} Age`] = child.ageRange;
      });

      dogs.forEach((dog, i) => {
        customProperties[`Dog ${i + 1} Name`] = dog.name;
        customProperties[`Dog ${i + 1} Breed`] = dog.breed;
        customProperties[`Dog ${i + 1} Fur`] = dog.furColor;
        customProperties[`Dog ${i + 1} Collar`] = dog.collarColor;
      });

      const lineItems = [{
        variantId: product.variants[0].id,
        quantity: 1,
        customAttributes: Object.entries(customProperties).map(([key, value]) => ({ key, value })),
      }];

      await createCheckoutAndRedirect(lineItems);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Could not connect to Shopify. Please check your configuration.');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <Step0_Edition />;
      case 1: return <Step1_Children />;
      case 2: return <Step2_Dogs />;
      case 3: return <Step3_StoryTitle />;
      case 4: return <Step4_FinalTouches />;
      case 5: return <Step5_Review />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">

      {/* LEFT — Form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-16 overflow-y-auto max-h-screen scrollbar-hide">

        {/* Step indicator */}
        <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          {STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col gap-3 min-w-[80px]">
                <div className={cn(
                  "h-1 rounded-full transition-all duration-700",
                  currentStep === index ? "bg-navy w-full" :
                  currentStep > index ? "bg-gold w-full" : "bg-gray-100 w-8"
                )} />
                <span className={cn(
                  "text-[9px] font-bold uppercase tracking-[0.3em] transition-colors",
                  currentStep === index ? "text-navy" : "text-gray-300"
                )}>
                  {step.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Step content */}
        <div className="max-w-xl mx-auto pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Mobile preview — inline below form */}
          <div className="md:hidden mt-10 rounded-3xl bg-navy overflow-hidden" style={{ minHeight: 360 }}>
            <LivePreview className="w-full py-10 px-6" step={currentStep} />
          </div>
        </div>

        {/* Navigation */}
        <div className="fixed bottom-0 left-0 w-full md:w-1/2 bg-white/90 backdrop-blur-2xl border-t border-gray-100 p-6 flex gap-4 z-40">
          <button onClick={handleBack} className="px-8 py-4 rounded-full border border-gray-200 font-bold text-navy/40 hover:border-navy hover:text-navy transition-all flex items-center gap-2 text-xs uppercase tracking-widest">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button onClick={handleNext} disabled={isProcessing} className={cn(
            "flex-1 px-8 py-4 rounded-full bg-navy text-cream font-bold hover:bg-gold transition-all flex items-center justify-center gap-3 shadow-2xl text-xs uppercase tracking-widest",
            isProcessing && "opacity-70 cursor-not-allowed"
          )}>
            {isProcessing ? (
              <>Processing... <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-4 h-4 border-2 border-cream border-t-transparent rounded-full" /></>
            ) : currentStep === STEPS.length - 1 ? (
              <>Complete & Checkout <ShoppingBag className="w-4 h-4" /></>
            ) : (
              <>Continue <ChevronRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>

      {/* RIGHT — Preview (desktop only) */}
      <div className="hidden md:flex w-1/2 bg-navy items-center justify-center p-12 lg:p-24 relative overflow-hidden sticky top-0 h-screen">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 to-transparent" />
        </div>
        <LivePreview className="w-full h-full relative z-10" step={currentStep} />
      </div>
    </div>
  );
};
