import { create } from 'zustand';

export type Edition = 'classic' | 'true-likeness';

export interface Child {
  id: string;
  name: string;
  gender: 'Boy' | 'Girl';
  ageRange: 'Baby' | 'Toddler' | '3-5' | '6-8' | '9-12';
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  eyeColor: string;
  glasses: boolean;
  freckles: boolean;
  photo?: string | null;
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  furColor: string;
  eyeColor: string;
  collarColor: string;
  photo?: string | null;
}

interface CustomizationState {
  edition: Edition;
  children: Child[];
  dogs: Dog[];
  storyTitle: string;
  coverColor: string;
  dedication: string;
  giftWrapping: boolean;

  setEdition: (edition: Edition) => void;
  addChild: () => void;
  removeChild: (id: string) => void;
  updateChild: (id: string, updates: Partial<Child>) => void;
  addDog: () => void;
  removeDog: (id: string) => void;
  updateDog: (id: string, updates: Partial<Dog>) => void;
  setStoryTitle: (title: string) => void;
  setCoverColor: (color: string) => void;
  setDedication: (message: string) => void;
  setGiftWrapping: (enabled: boolean) => void;
  reset: () => void;
}

const initialChild = (id: string): Child => ({
  id,
  name: '',
  gender: 'Boy',
  ageRange: '6-8',
  skinTone: 'tone-1',
  hairStyle: 'Short & Straight',
  hairColor: 'Blonde',
  eyeColor: 'Blue',
  glasses: false,
  freckles: false,
});

const initialDog = (id: string): Dog => ({
  id,
  name: '',
  breed: 'Golden Retriever',
  furColor: 'golden',
  eyeColor: 'Brown',
  collarColor: 'Navy',
});

export const useCustomizationStore = create<CustomizationState>((set) => ({
  edition: 'classic',
  children: [initialChild(crypto.randomUUID())],
  dogs: [initialDog(crypto.randomUUID())],
  storyTitle: 'Always With Me',
  coverColor: 'Midnight Navy',
  dedication: '',
  giftWrapping: false,

  setEdition: (edition) => set({ edition }),
  addChild: () => set((state) => {
    if (state.children.length >= 3) return state;
    return { children: [...state.children, initialChild(crypto.randomUUID())] };
  }),
  removeChild: (id) => set((state) => ({
    children: state.children.filter((c) => c.id !== id),
  })),
  updateChild: (id, updates) => set((state) => ({
    children: state.children.map((c) => (c.id === id ? { ...c, ...updates } : c)),
  })),
  addDog: () => set((state) => {
    if (state.dogs.length >= 3) return state;
    return { dogs: [...state.dogs, initialDog(crypto.randomUUID())] };
  }),
  removeDog: (id) => set((state) => ({
    dogs: state.dogs.filter((d) => d.id !== id),
  })),
  updateDog: (id, updates) => set((state) => ({
    dogs: state.dogs.map((d) => (d.id === id ? { ...d, ...updates } : d)),
  })),
  setStoryTitle: (storyTitle) => set({ storyTitle }),
  setCoverColor: (coverColor) => set({ coverColor }),
  setDedication: (dedication) => set({ dedication }),
  setGiftWrapping: (giftWrapping) => set({ giftWrapping }),
  reset: () => set({
    edition: 'classic',
    children: [initialChild(crypto.randomUUID())],
    dogs: [initialDog(crypto.randomUUID())],
    storyTitle: 'Always With Me',
    coverColor: 'Midnight Navy',
    dedication: '',
    giftWrapping: false,
  }),
}));
