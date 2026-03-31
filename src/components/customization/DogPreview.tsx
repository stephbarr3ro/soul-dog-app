import React, { useState, useEffect, useRef } from 'react';
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

function buildUrl(folder: string, subfolder: string, file: string): string {
  return `${CDN}/${folder}/${subfolder}/${encodeURIComponent(file)}`;
}

// Preload a single image, returns a promise
function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed: ${src}`));
    img.src = src;
  });
}

interface DogPreviewProps {
  dog: Dog;
  size?: number;
}

export const DogPreview: React.FC<DogPreviewProps> = ({ dog, size = 300 }) => {
  const breedData = BREED_ASSETS[dog.breed];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Track the currently rendered combination to avoid flicker
  const [rendered, setRendered] = useState<string>('');
  const pendingRef = useRef<string>('');

  useEffect(() => {
    if (!breedData) return;

    const furFile    = breedData.furs[dog.furColor]       || Object.values(breedData.furs)[2];
    const eyeFile    = breedData.eyes[dog.eyeColor]       || Object.values(breedData.eyes)[0];
    const collarFile = breedData.collars[dog.collarColor] || Object.values(breedData.collars)[7];

    const eyeUrl    = buildUrl(breedData.folder, 'eye',    eyeFile);
    const furUrl    = buildUrl(breedData.folder, 'fur',    furFile);
    const collarUrl = buildUrl(breedData.folder, 'collar', collarFile);

    const combo = `${eyeUrl}|${furUrl}|${collarUrl}`;

    // Already rendered this combination
    if (rendered === combo) return;

    // Mark this as pending
    pendingRef.current = combo;

    // Load all 3 layers in parallel — only draw when ALL are ready
    Promise.all([
      preloadImage(eyeUrl).catch(() => null),
      preloadImage(furUrl).catch(() => null),
      preloadImage(collarUrl).catch(() => null),
    ]).then(([eyeImg, furImg, collarImg]) => {
      // If a newer request came in while loading, discard this one
      if (pendingRef.current !== combo) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, size, size);

      // Draw in order: eyes (bottom) → fur → collar (top)
      if (eyeImg)    ctx.drawImage(eyeImg,    0, 0, size, size);
      if (furImg)    ctx.drawImage(furImg,    0, 0, size, size);
      if (collarImg) ctx.drawImage(collarImg, 0, 0, size, size);

      setRendered(combo);
    });
  }, [dog.furColor, dog.eyeColor, dog.collarColor, dog.breed, size, breedData, rendered]);

  if (!breedData) return null;

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: 'block', maxWidth: '100%', margin: '0 auto' }}
    />
  );
};
