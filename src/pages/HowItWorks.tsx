import React from 'react';
import { Layout } from '@/src/components/Layout';
import { HowItWorks as HowItWorksSection } from '@/src/pages/Home';
import { BookOpen } from 'lucide-react';

export const HowItWorks = () => (
  <Layout>
    <div className="pt-20">
      <div className="text-center mb-12 px-6">
        <h1 className="text-4xl md:text-6xl font-display text-navy mb-4">How It Works</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Creating your personalized book is a magical journey. Here is how we bring your story to life.</p>
      </div>
      <HowItWorksSection />
      
      {/* Additional detailed steps if needed */}
      <section className="py-24 px-6 md:px-12 bg-cream">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-display text-navy mb-4">1. Choose Your Edition</h3>
              <p className="text-gray-600 leading-relaxed">Select between our Classic Edition, featuring our extensive library of pre-illustrated breeds and characters, or our True Likeness Edition for a 100% unique, hand-drawn portrait of your family.</p>
            </div>
            <div className="flex-1 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 w-full">
               <div className="aspect-video bg-gray-50 rounded-2xl flex items-center justify-center text-4xl">
                 <BookOpen className="w-12 h-12 text-navy/20" />
               </div>
            </div>
          </div>
          {/* ... more steps ... */}
        </div>
      </section>
    </div>
  </Layout>
);
