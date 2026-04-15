import React from 'react';
import { Child } from '@/src/store/useCustomizationStore';

const CDN = '/children';

const HAIR_STYLES_BOY = [
  'Short & Straight', 'Short & Curly', 'Short & Wavy', 'Crew Cut',
  'Buzz Cut', 'Side Part', 'Messy/Textured', 'Afro', 'Locs',
  'Mohawk', 'Undercut', 'Medium Length'
];

const HAIR_STYLES_GIRL = [
  'Long & Straight', 'Long & Wavy', 'Long & Curly', 'Braids',
  'Pigtails', 'Ponytail', 'Bun', 'Bob', 'Pixie Cut', 'Afro', 'Locs', 'Short & Straight'
];

const HAIR_FILE_MAP: Record<string, string> = {
  'Medium & Straight': 'medium-straight',
  'Short & Curly':    'short-curly',
  'Short & Wavy':     'short-wavy',
  'Crew Cut':         'crew-cut',
  'Buzz Cut':         'buzz-cut',
  'Side Part':        'side-part',
  'Messy/Textured':   'messy-textured',
  'Afro':             'afro',
  'Locs':             'locs',
  'Mohawk':           'mohawk',
  'Undercut':         'undercut',
  'Medium Length':    'medium-length',
  'Long & Straight':  'long-straight',
  'Medium & Straight': 'medium-straight',
  'Long & Wavy':      'long-wavy',
  'Long & Curly':     'long-curly',
  'Braids':           'braids',
  'Pigtails':         'pigtails',
  'Ponytail':         'ponytail',
  'Bun':              'bun',
  'Bob':              'bob',
  'Pixie Cut':        'pixie-cut',
};

const HAIR_COLOR_MAP: Record<string, string> = {
  'Blonde':       'blonde',
  'Light Brown':  'light-brown',
  'Brown':        'brown',
  'Black':        'black',
  'Ginger':       'ginger',
};

const EYE_MAP: Record<string, string> = {
  'Brown':         'brown.webp',
  'Dark Brown':    'dark-brown.webp',
  'Amber':         'amber.webp',
  'Hazel':         'hazel.webp',
  'Green':         'green.webp',
  'Blue':          'blue.webp',
  'Gray':          'gray.webp',
  'Black':         'black.webp',
  'Honey':         'honey.webp',
  'Light Blue':    'light-blue.webp',
  'Vibrant Green': 'vibrant-green.webp',
};

function getBodyUrl(gender: string, skinTone: string): string {
  const num = parseInt(skinTone?.replace('tone-', ''));
  if (!isNaN(num) && num >= 1 && num <= 12) {
    return `${CDN}/body/${gender}-tone-${num}.webp`;
  }
  return `${CDN}/body/${gender}.webp`;
}

function getHairUrl(gender: string, hairStyle: string, hairColor: string): string {
  const styleFile = HAIR_FILE_MAP[hairStyle] || 'short-straight';
  const colorFile = HAIR_COLOR_MAP[hairColor] || 'brown';
  return `${CDN}/hair/${gender}/${styleFile}-${colorFile}.webp`;
}

const layer: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
};

export const ChildPreview: React.FC<{ child: Child; size?: number }> = ({ child, size = 300 }) => {
  const gender      = child.gender === 'Boy' ? 'boy' : 'girl';
  const bodyUrl     = getBodyUrl(gender, child.skinTone);
  const eyeUrl      = `${CDN}/eyes/${EYE_MAP[child.eyeColor] || 'brown.webp'}`;
  const hairUrl     = getHairUrl(gender, child.hairStyle, child.hairColor);
  const frecklesUrl = `${CDN}/accessories/freckles.webp`;
  const glassesUrl  = `${CDN}/accessories/glasses.webp`;

  return (
    <div style={{ position: 'relative', width: size, height: size, maxWidth: '100%', margin: '0 auto' }}>
      <img src={bodyUrl} alt="body" style={{ ...layer, zIndex: 10 }} />
      <img src={eyeUrl}  alt="eyes" style={{ ...layer, zIndex: 20 }} />
      <img src={hairUrl} alt="hair" style={{ ...layer, zIndex: 30 }} />
      {child.freckles && <img src={frecklesUrl} alt="freckles" style={{ ...layer, zIndex: 40 }} />}
      {child.glasses  && <img src={glassesUrl}  alt="glasses"  style={{ ...layer, zIndex: 50 }} />}
    </div>
  );
};
