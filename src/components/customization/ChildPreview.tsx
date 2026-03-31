import React from 'react';
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

const layer: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
};

export const ChildPreview: React.FC<{ child: Child; size?: number }> = ({ child, size = 300 }) => {
  const gender   = child.gender === 'Boy' ? 'boy' : 'girl';
  const bodyUrl  = `${CDN}/body/${gender}.webp`;
  const eyeUrl   = `${CDN}/eyes/brown.webp`;
  const hairFile = HAIR_MAP[gender][child.hairStyle] || Object.values(HAIR_MAP[gender])[0];
  const hairUrl  = `${CDN}/hair/${gender}/${hairFile}`;

  return (
    <div style={{ position: 'relative', width: size, height: size, maxWidth: '100%', margin: '0 auto' }}>
      <img src={bodyUrl} alt="body" style={{ ...layer, zIndex: 10 }} />
      <img src={eyeUrl}  alt="eyes" style={{ ...layer, zIndex: 20 }} />
      <img src={hairUrl} alt="hair" style={{ ...layer, zIndex: 30 }} />
    </div>
  );
};
// Tue Mar 31 19:11:34 CEST 2026
// reconnected Tue Mar 31 19:17:51 CEST 2026
