import React, { useState, useEffect, useRef } from 'react';
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

const EYE_MAP: Record<string, string> = {
  'Brown':      'brown.webp',
  'Dark Brown': 'brown.webp',
  'Amber':      'brown.webp',
  'Hazel':      'brown.webp',
  'Green':      'brown.webp',
  'Blue':       'brown.webp',
  'Gray':       'brown.webp',
  'Black':      'brown.webp',
};

function preloadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function applyTintedBody(ctx: CanvasRenderingContext2D, bodyImg: HTMLImageElement, size: number, skinColor: string) {
  // Draw body to offscreen canvas and tint it
  const offscreen = document.createElement('canvas');
  offscreen.width = size;
  offscreen.height = size;
  const octx = offscreen.getContext('2d')!;

  // Draw body
  octx.drawImage(bodyImg, 0, 0, size, size);

  // Apply skin color tint using multiply
  octx.globalCompositeOperation = 'multiply';
  octx.fillStyle = skinColor;
  octx.fillRect(0, 0, size, size);

  // Clip to body shape
  octx.globalCompositeOperation = 'destination-in';
  octx.drawImage(bodyImg, 0, 0, size, size);

  // Draw tinted body onto main canvas
  ctx.drawImage(offscreen, 0, 0);
}

export const ChildPreview: React.FC<{ child: Child; size?: number }> = ({ child, size = 300 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendered, setRendered] = useState('');
  const pendingRef = useRef('');

  const gender = child.gender === 'Boy' ? 'boy' : 'girl';
  // Fallback to boy body if girl doesn't exist yet
  const bodyUrl  = `${CDN}/body/${gender}.webp`;
  const boyBodyUrl = `${CDN}/body/boy.webp`;
  const eyeFile  = EYE_MAP[child.eyeColor] || 'brown.webp';
  const eyeUrl   = `${CDN}/eyes/${eyeFile}`;
  const hairFile = HAIR_MAP[gender][child.hairStyle] || Object.values(HAIR_MAP[gender])[0];
  const hairUrl  = `${CDN}/hair/${gender}/${hairFile}`;
  const skinColor = '#D3936F';

  useEffect(() => {
    const combo = `${gender}|${eyeFile}|${hairFile}`;
    if (rendered === combo) return;
    pendingRef.current = combo;

    Promise.all([
      preloadImage(bodyUrl).then(img => img || preloadImage(boyBodyUrl)),
      preloadImage(eyeUrl),
      preloadImage(hairUrl),
    ]).then(([bodyImg, eyeImg, hairImg]) => {
      if (pendingRef.current !== combo) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, size, size);
      ctx.globalCompositeOperation = 'source-over';

      // Layer order: eyes first → tinted body → hair
      if (eyeImg)  ctx.drawImage(eyeImg, 0, 0, size, size);
      if (bodyImg) applyTintedBody(ctx, bodyImg, size, skinColor);
      if (hairImg) ctx.drawImage(hairImg, 0, 0, size, size);

      setRendered(combo);
    });
  }, [child.gender, child.eyeColor, child.hairStyle, size, gender, eyeFile, hairFile, bodyUrl, boyBodyUrl, eyeUrl, hairUrl, rendered]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      style={{ display: 'block', maxWidth: '100%', margin: '0 auto' }}
    />
  );
};
