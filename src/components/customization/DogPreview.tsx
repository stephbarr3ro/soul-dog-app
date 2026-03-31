import React from 'react';
import { Dog } from '@/src/store/useCustomizationStore';

const CDN = 'https://stephbarr3ro.github.io/book-assets';

const BREED_ASSETS: Record<string, {
  folder: string;
  furs: Record<string, string>;
  eyes: Record<string, string>;
  collars: Record<string, string>;
}> = {
  'Golden Retriever': {
    folder: 'golden-retriever',
    furs: {
      'Cream':            'dogs_golden-retriever_fur_cream.webp',
      'Light Golden':     'dogs_golden-retriever_fur_light-golden.webp',
      'Golden':           'dogs_golden-retriever_fur_golden.webp',
      'Dark Golden':      'dogs_golden-retriever_fur_dark-golden.webp',
      'Rich Dark Golden': 'dogs_golden-retriever_fur_rich-dark-golden.webp',
      'Red Golden':       'dogs_golden-retriever_fur_red-golden.webp',
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
      'Sky Blue': 'dogs:golden-retriever:collar:skyblue',
      'Red':      'dogs:golden-retriever:collar:red.webp',
      'Green':    'dogs:golden-retriever:collar:green.webp',
      'Yellow':   'dogs:golden-retriever:collar:yellow.webp',
      'Orange':   'dogs:golden-retriever:collar:orange.webp',
      'Purple':   'dogs:golden-retriever:collar:purple.webp',
      'Pink':     'dogs:golden-retriever:collar:pink.webp',
      'Navy':     'dogs:golden-retriever:collar:navy.webp',
      'Black':    'dogs:golden-retriever:collar:black.webp',
      'White':    'dogs:golden-retriever:collar:whitewebp',
    },
  },
};

export const DogPreview: React.FC<{ dog: Dog; size?: number }> = ({ dog, size = 300 }) => {
  const breedData = BREED_ASSETS[dog.breed];
  if (!breedData) return null;

  const furFile    = breedData.furs[dog.furColor]       || Object.values(breedData.furs)[2];
  const eyeFile    = breedData.eyes[dog.eyeColor]       || Object.values(breedData.eyes)[0];
  const collarFile = breedData.collars[dog.collarColor] || Object.values(breedData.collars)[0];

  const url = (subfolder: string, file: string) =>
    `${CDN}/${breedData.folder}/${subfolder}/${encodeURIComponent(file)}`;

  const layer: React.CSSProperties = {
    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain',
  };

  return (
    <div style={{ position: 'relative', width: size, height: size, maxWidth: '100%', margin: '0 auto' }}>
      <img src={url('eye', eyeFile)}    alt="eyes"   style={{ ...layer, zIndex: 10 }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
      <img src={url('fur', furFile)}    alt="fur"    style={{ ...layer, zIndex: 20 }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
      <img src={url('collar', collarFile)} alt="collar" style={{ ...layer, zIndex: 30 }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
    </div>
  );
};
