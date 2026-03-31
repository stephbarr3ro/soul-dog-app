import React, { useEffect, useRef } from 'react';
import { Child } from '@/src/store/useCustomizationStore';

const CDN = '/children';

const HAIR_MAP: Record<string, Record<string, string>> = {
  boy: {
    'Short & Straight': 'short-straight.webp',
    'Short & Curly':    'short-curly.webp',
    'Short & Wavy':     'short-wavy.webp',
    'Crew Cut':         'crew-cut.webp',
    'Buzz Cut':         'buzz-cut.webp',
    'Side Part':        'side-part.webp',
    'Messy/Textured':   'messy-textured.webp',
    'Afro':             'afro.webp',
    'Locs':             'locs.webp',
    'Mohawk':           'mohawk.webp',
    'Undercut':         'undercut.webp',
    'Medium Length':    'medium-length.webp',
  },
  girl: {
    'Long & Straight': 'long-straight.webp',
    'Long & Wavy':     'long-wavy.webp',
    'Long & Curly':    'long-curly.webp',
    'Braids':          'braids.webp',
    'Pigtails':        'pigtails.webp',
    'Ponytail':        'ponytail.webp',
    'Bun':             'bun.webp',
    'Bob':             'bob.webp',
    'Pixie Cut':       'pixie-cut.webp',
    'Afro':            'afro.webp',
    'Locs':            'locs.webp',
    'Short & Straight':'short-straight.webp',
  },
};

function load(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export const ChildPreview: React.FC<{ child: Child; size?: number }> = ({ child, size = 300 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const abortRef  = useRef(false);

  const gender   = child.gender === 'Boy' ? 'boy' : 'girl';
  const bodyUrl  = `${CDN}/body/${gender}.webp`;
  const eyeUrl   = `${CDN}/eyes/brown.webp`;
  const hairFile = HAIR_MAP[gender][child.hairStyle] || Object.values(HAIR_MAP[gender])[0];
  const hairUrl  = `${CDN}/hair/${gender}/${hairFile}`;

  useEffect(() => {
    abortRef.current = false;

    Promise.all([
      load(eyeUrl),
      load(bodyUrl).then(img => img || load(`${CDN}/body/boy.webp`)),
      load(hairUrl),
    ]).then(([eyeImg, bodyImg, hairImg]) => {
      if (abortRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, size, size);

      if (eyeImg)  ctx.drawImage(eyeImg,  0, 0, size, size);
      if (bodyImg) ctx.drawImage(bodyImg, 0, 0, size, size);
      if (hairImg) ctx.drawImage(hairImg, 0, 0, size, size);
    });

    return () => { abortRef.current = true; };
  }, [child.gender, child.hairStyle, size, gender, bodyUrl, eyeUrl, hairUrl]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: 'block', maxWidth: '100%', margin: '0 auto' }}
    />
  );
};
