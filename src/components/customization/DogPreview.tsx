import React, { useEffect, useRef, useState } from 'react';
import { Dog } from '@/src/store/useCustomizationStore';

const CDN = '/dogs';

const BREED_FOLDER: Record<string, string> = {
  'Golden Retriever': 'golden-retriever', 'Labrador': 'labrador',
  'French Bulldog': 'french-bulldog', 'German Shepherd': 'german-shepherd',
  'Poodle': 'standard-poodle', 'Bulldog': 'bulldog', 'Beagle': 'beagle',
  'Rottweiler': 'rottweiler', 'Dachshund': 'dachshund', 'Corgi': 'corgi',
  'Australian Shepherd': 'australian-shepherd', 'Boxer': 'boxer', 'Husky': 'husky',
  'Doberman': 'doberman', 'Pomeranian': 'pomeranian', 'Chihuahua': 'chihuahua',
  'American Bully': 'american-bully', 'Cocker Spaniel': 'cocker-spaniel',
  'Dalmatian': 'dalmatian', 'Goldendoodle': 'goldendoodle', 'Morkie': 'morkie',
};

const COLLAR_FILE: Record<string, string> = {
  'Sky Blue': 'skyblue', 'Red': 'red', 'Green': 'green', 'Yellow': 'yellow',
  'Orange': 'orange', 'Purple': 'purple', 'Pink': 'pink', 'Navy': 'navy',
  'Black': 'black', 'White': 'white',
};

const EYE_FILE: Record<string, string> = {
  'Brown': 'brown', 'Dark Brown': 'dark-brown', 'Amber': 'amber', 'Hazel': 'hazel',
  'Green': 'green', 'Blue': 'blue', 'Gray': 'gray', 'Black': 'black',
};

// Module-level cache survives re-renders and component remounts
const imgCache = new Map<string, HTMLImageElement | null>();

function loadImg(src: string): Promise<HTMLImageElement | null> {
  if (imgCache.has(src)) return Promise.resolve(imgCache.get(src) ?? null);
  return new Promise(resolve => {
    const img = new window.Image();
    img.onload  = () => { imgCache.set(src, img);  resolve(img);   };
    img.onerror = () => { imgCache.set(src, null); resolve(null);  };
    img.src = src;
  });
}

export const DogPreview: React.FC<{ dog: Dog; size?: number }> = ({ dog, size = 300 }) => {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const renderIdRef = useRef(0);
  const [visible, setVisible] = useState(false);

  const folder    = BREED_FOLDER[dog.breed] || 'golden-retriever';
  const furUrl    = `${CDN}/${folder}/fur/${dog.furColor || 'golden'}.webp`;
  const eyeUrl    = `${CDN}/${folder}/eye/${EYE_FILE[dog.eyeColor]   || 'brown'}.webp`;
  const collarUrl = `${CDN}/${folder}/collar/${COLLAR_FILE[dog.collarColor] || 'red'}.webp`;

  useEffect(() => {
    const id = ++renderIdRef.current;

    Promise.all([loadImg(furUrl), loadImg(eyeUrl), loadImg(collarUrl)])
      .then(([furImg, eyeImg, collarImg]) => {
        if (id !== renderIdRef.current) return; // stale render — a newer one is in flight
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Compose layers on an offscreen canvas so the visible canvas
        // never shows a blank intermediate state
        const off = document.createElement('canvas');
        off.width  = size;
        off.height = size;
        const offCtx = off.getContext('2d')!;
        if (furImg)    offCtx.drawImage(furImg,    0, 0, size, size); // base body
        if (eyeImg)    offCtx.drawImage(eyeImg,    0, 0, size, size); // eye color overlay
        if (collarImg) offCtx.drawImage(collarImg, 0, 0, size, size); // collar overlay

        ctx.clearRect(0, 0, size, size);
        ctx.drawImage(off, 0, 0); // atomic swap — no blank frame on visible canvas
        setVisible(true);
      });
  }, [furUrl, eyeUrl, collarUrl, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{
        display: 'block',
        maxWidth: '100%',
        margin: '0 auto',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.2s ease',
      }}
    />
  );
};
