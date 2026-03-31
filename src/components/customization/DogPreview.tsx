import React from 'react';
import { Dog } from '@/src/store/useCustomizationStore';

const CDN = 'https://stephbarr3ro.github.io/book-assets';

const BREED_ASSETS: Record<string, {
  furs: Record<string, string>;
  eyes: Record<string, string>;
  collars: Record<string, string>;
  folder: string;
}> = {
  'Golden Retriever': {
    folder: 'golden-retriever',
    furs: {
      'Cream':       'dogs_golden-retriever_fur_cream.webp',
      'White':       'dogs_golden-retriever_fur_cream.webp',
      'Golden':      'dogs_golden-retriever_fur_golden.webp',
      'Tan':         'dogs_golden-retriever_fur_light-golden.webp',
      'Dark Golden': 'dogs_golden-retriever_fur_dark-golden.webp',
      'Rich Dark':   'dogs_golden-retriever_fur_rich-dark-golden.webp',
      'Red':         'dogs_golden-retriever_fur_red-golden.webp',
      'Brown':       'dogs_golden-retriever_fur_dark-golden.webp',
      'Black':       'dogs_golden-retriever_fur_rich-dark-golden.webp',
    },
    eyes: {
      'Brown':      'dogs:golden-retriever:eyes:brown.webp',
      'Dark Brown': 'dogs:golden-retriever:eyes:dark-brown.webp',
      'Amber':      'dogs:golden-retriever:eyes:amber.webp',
      'Hazel':      'dogs:golden-retriever:eyes:hanzel.webp',
      'Green':      'dogs:golden-retriever:eyes:green.webp',
      'Blue':       'dogs:golden-retriever:eyes:blue.webp',
      'Gray':       'dogs:golden-retriever:eyes:gray.webp',
      'Black':      'dogs:golden-retriever:eyes:black.webp',
    },
    collars: {
      'Navy':   'dogs:golden-retriever:collar:navy.webp',
      'Red':    'dogs:golden-retriever:collar:red.webp',
      'Forest': 'dogs:golden-retriever:collar:green.webp',
      'Purple': 'dogs:golden-retriever:collar:purple.webp',
      'Pink':   'dogs:golden-retriever:collar:pink.webp',
      'Orange': 'dogs:golden-retriever:collar:orange.webp',
      'Black':  'dogs:golden-retriever:collar:black.webp',
      'Gold':   'dogs:golden-retriever:collar:yellow.webp',
      'Teal':   'dogs:golden-retriever:collar:green.webp',
    },
  },
};

export const DogPreview: React.FC<{ dog: Dog; size?: number }> = ({ dog, size = 300 }) => {
  const breedData = BREED_ASSETS[dog.breed];
  if (!breedData) return null;

  const furFile    = breedData.furs[dog.furColor]       || Object.values(breedData.furs)[0];
  const eyeFile    = breedData.eyes[dog.eyeColor]       || Object.values(breedData.eyes)[0];
  const collarFile = breedData.collars[dog.collarColor] || Object.values(breedData.collars)[0];

  const url = (folder: string, file: string) =>
    `${CDN}/${breedData.folder}/${folder}/${encodeURIComponent(file)}`;

  const layer: React.CSSProperties = {
    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain',
  };

  return (
    <div style={{ position: 'relative', width: size, height: size, maxWidth: '100%', margin: '0 auto' }}>
      <img src={url('eye', eyeFile)}    alt="eyes"   style={{ ...layer, zIndex: 10 }} onError={e => (e.currentTarget.style.display='none')} />
      <img src={url('fur', furFile)}    alt="fur"    style={{ ...layer, zIndex: 20 }} onError={e => (e.currentTarget.style.display='none')} />
      <img src={url('collar', collarFile)} alt="collar" style={{ ...layer, zIndex: 30 }} onError={e => (e.currentTarget.style.display='none')} />
    </div>
  );
};
