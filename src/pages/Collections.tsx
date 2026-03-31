import React from 'react';
import { Layout } from '@/src/components/Layout';
import { Collections as CollectionsSection } from '@/src/pages/Home';

export const Collections = () => (
  <Layout>
    <div className="pt-20">
      <div className="text-center mb-12 px-6">
        <h1 className="text-4xl md:text-6xl font-display text-navy mb-4">Our Book Collections</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Choose the perfect way to celebrate your family's story. From our classic hand-drawn library to custom portraiture.</p>
      </div>
      <CollectionsSection />
    </div>
  </Layout>
);
