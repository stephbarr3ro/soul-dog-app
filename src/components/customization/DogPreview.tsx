import React from 'react';
import { Dog } from '@/src/store/useCustomizationStore';

const CDN = '/dogs';

// Map breed name to folder name
const BREED_FOLDER: Record<string, string> = {
  'Golden Retriever':    'golden-retriever',
  'Labrador':            'labrador',
  'French Bulldog':      'french-bulldog',
  'German Shepherd':     'german-shepherd',
  'Poodle':              'standard-poodle',
  'Bulldog':             'bulldog',
  'Beagle':              'beagle',
  'Rottweiler':          'rottweiler',
  'Dachshund':           'dachshund',
  'Corgi':               'corgi',
  'Australian Shepherd': 'australian-shepherd',
  'Husky':               'husky',
  'Doberman':            'doberman',
  'Pomeranian':          'pomeranian',
  'Chihuahua':           'chihuahua',
  'American Bully':      'american-bully',
  'Cocker Spaniel':      'cocker-spaniel',
  'Dalmatian':           'dalmatian',
  'Goldendoodle':        'goldendoodle',
  'Morkie':              'morkie',
  'Boxer':               'boxer',
};

// Map collar color names to file names
const COLLAR_FILE: Record<string, string> = {
  'Sky Blue': 'skyblue',
  'Red':      'red',
  'Green':    'green',
  'Yellow':   'yellow',
  'Orange':   'orange',
  'Purple':   'purple',
  'Pink':     'pink',
  'Navy':     'navy',
  'Black':    'black',
  'White':    'white',
};

// Map eye color names to file names
const EYE_FILE: Record<string, string> = {
  'Brown':      'brown',
  'Dark Brown': 'dark-brown',
  'Amber':      'amber',
  'Hazel':      'hazel',
  'Green':      'green',
  'Blue':       'blue',
  'Gray':       'gray',
  'Black':      'black',
};

const layer: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
};

export const DogPreview: React.FC<{ dog: Dog; size?: number }> = ({ dog, size = 300 }) => {
  const folder = BREED_FOLDER[dog.breed] || 'golden-retriever';
  const furFile    = dog.furColor?.toLowerCase().replace(/ /g, '-') || 'golden';
  const eyeFile    = EYE_FILE[dog.eyeColor] || 'brown';
  const collarFile = COLLAR_FILE[dog.collarColor] || 'red';

  const furUrl    = `${CDN}/${folder}/fur/${furFile}.webp`;
  const eyeUrl    = `${CDN}/${folder}/eye/${eyeFile}.webp`;
  const collarUrl = `${CDN}/${folder}/collar/${collarFile}.webp`;

  return (
    <div style={{ position: 'relative', width: size, height: size, maxWidth: '100%', margin: '0 auto' }}>
      <img src={furUrl}    alt="fur"    style={{ ...layer, zIndex: 10 }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
      <img src={eyeUrl}    alt="eyes"   style={{ ...layer, zIndex: 20 }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
      <img src={collarUrl} alt="collar" style={{ ...layer, zIndex: 30 }} onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
    </div>
  );
};
