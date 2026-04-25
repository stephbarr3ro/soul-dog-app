import React from 'react';
import { Plus, Minus, Camera, Sparkles, ArrowRight } from 'lucide-react';
import { useCustomizationStore } from '@/src/store/useCustomizationStore';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { uploadPhoto } from '@/src/lib/supabase';


const AVAILABLE_BREEDS = new Set([
  'Golden Retriever', 'Labrador', 'French Bulldog', 'German Shepherd', 'Poodle',
  'Bulldog', 'Beagle', 'Rottweiler', 'Dachshund', 'Corgi', 'Australian Shepherd',
  'Boxer', 'Husky', 'Doberman', 'Goldendoodle', 'Morkie',
  'Chihuahua', 'Pomeranian', 'Cocker Spaniel', 'American Bully', 'Dalmatian',
  'Labradoodle', 'Pitbull', 'Miniature Schnauzer', 'Shih Tzu',
  'Yorkshire Terrier', 'Akita', 'Bernedoodle', 'Bernese Mountain Dog',
  'Border Collie', 'Boston Terrier', 'Cavapoo', 'Chow Chow',
  'Great Dane', 'Jack Russell Terrier', 'Maltese', 'Newfoundland',
  'Pug', 'Samoyed', 'Saint Bernard',
  'Italian Greyhound', 'Papillon', 'Sheepadoodle', 'Irish Setter',
  'English Springer Spaniel', 'Belgian Malinois', 'Rhodesian Ridgeback',
  'Vizsla', 'Weimaraner', 'Schnauzer',
]);

const DOG_BREEDS: Record<string, string[]> = {
  "Most Popular": [
    "Golden Retriever", "Labrador", "French Bulldog", "German Shepherd", "Poodle",
    "Bulldog", "Beagle", "Rottweiler", "Dachshund", "Corgi", "Australian Shepherd",
    "Yorkshire Terrier", "Boxer", "Shih Tzu", "Husky", "Doberman",
    "Schnauzer", "Pitbull", "Border Collie", "Pug", "Akita",
  ],
  "Designer / Mixed": [
    "Goldendoodle", "Morkie", "Labradoodle", "Bernedoodle", "Cavapoo",
    "Cockapoo", "Maltipoo", "Pomsky", "Sheepadoodle", "Aussiedoodle",
    "Schnoodle", "Yorkipoo", "Cavachon", "Springerdoodle", "Bordoodle",
  ],
  "Medium & Large": [
    "American Bully", "Dalmatian", "Bernese Mountain Dog", "Great Dane", "Newfoundland",
    "Saint Bernard", "Samoyed", "Weimaraner", "Vizsla", "Rhodesian Ridgeback",
    "Belgian Malinois", "Whippet", "Irish Setter", "Cane Corso", "Mastiff",
    "Bloodhound", "Basset Hound", "Alaskan Malamute", "English Springer Spaniel", "Chow Chow",
  ],
  "Small Breeds": [
    "Chihuahua", "Pomeranian", "Cocker Spaniel", "Maltese", "Bichon Frise",
    "Cavalier King Charles", "Boston Terrier", "Jack Russell Terrier", "Miniature Schnauzer",
    "Lhasa Apso", "Papillon", "Pekingese", "Italian Greyhound", "Miniature Pinscher",
    "Brussels Griffon", "Toy Poodle", "Affenpinscher", "West Highland Terrier",
    "Cairn Terrier", "Norwich Terrier",
  ],
};

const BREED_FURS: Record<string, { name: string; file: string }[]> = {
  'Golden Retriever':    [{name:'Cream',file:'cream'},{name:'Light Golden',file:'light-golden'},{name:'Golden',file:'golden'},{name:'Dark Golden',file:'dark-golden'},{name:'Rich Dark Golden',file:'rich-dark-golden'},{name:'Red Golden',file:'red-golden'}],
  'Labrador':            [{name:'Black',file:'black'},{name:'Chocolate',file:'chocolate'},{name:'Yellow',file:'yellow'}],
  'French Bulldog':      [{name:'Brindle',file:'brindle'},{name:'Brindle Black',file:'brindle-black'},{name:'Fawn',file:'fawn'},{name:'Fawn Black Mask',file:'fawn-black-mask'},{name:'Cream',file:'cream'},{name:'Blue',file:'blue'},{name:'White',file:'white'},{name:'Black And Tan',file:'black-and-tan'},{name:'Merle Black',file:'merle-black'},{name:'Merle Blue',file:'merle-blue'},{name:'Merle Chocolate',file:'merle-chocolate'},{name:'Pied White Black',file:'pied-white-black'},{name:'Pied White Blue',file:'pied-white-blue'},{name:'Pied White Red',file:'pied-white-red'}],
  'German Shepherd':     [{name:'Black And Tan',file:'black-and-tan'},{name:'Black And Red',file:'black-and-red'},{name:'Black And Cream',file:'black-and-cream'},{name:'Black And Silver',file:'black-and-silver'},{name:'Black',file:'black'},{name:'Sable',file:'sable'}],
  'Poodle':              [{name:'Black',file:'black'},{name:'White',file:'white'},{name:'Apricot',file:'apricot'},{name:'Brown',file:'brown'},{name:'Gray',file:'gray'},{name:'Cream',file:'cream'},{name:'Red',file:'red'}],
  'Bulldog':             [{name:'Brindle',file:'brindle'},{name:'Fawn',file:'fawn'},{name:'White',file:'white'},{name:'Red',file:'red'},{name:'Chocolate',file:'chocolate'},{name:'Black And White',file:'black-and-white'},{name:'Black And Tan',file:'black-and-tan'},{name:'Piebald',file:'piebald'},{name:'Smut',file:'smut'}],
  'Beagle':              [{name:'Tricolor',file:'tricolor'},{name:'Brown And White',file:'brown-and-white'},{name:'Tan And White',file:'tan-and-white'},{name:'Red And White',file:'red-and-white'},{name:'Lemon And White',file:'lemon-and-white'},{name:'Brown Tan White',file:'brown-tan-white'}],
  'Rottweiler':          [{name:'Black And Red',file:'black-and-red'}],
  'Dachshund':           [{name:'Red',file:'red'},{name:'Brown',file:'brown'},{name:'Black And Tan',file:'black-and-tan'},{name:'Black And Cream',file:'black-and-cream'},{name:'Brown And Tan',file:'brown-and-tan'}],
  'Corgi':               [{name:'Red',file:'red'},{name:'Fawn',file:'fawn'},{name:'Sable',file:'sable'},{name:'Tricolor Black And Red',file:'tricolor-black-and-red'},{name:'Tricolor Black And Tan',file:'tricolor-black-and-tan'},{name:'Tricolor Fawn',file:'tricolor-fawn'}],
  'Australian Shepherd': [{name:'Blue Merle',file:'blue-merle'},{name:'Red Merle',file:'red-merle'},{name:'Black',file:'black'},{name:'Red',file:'red'},{name:'Tricolor',file:'tricolor'},{name:'Black Bicolor',file:'black-bicolor'}],
  'Boxer':               [{name:'Fawn',file:'fawn'},{name:'Brindle',file:'brindle'},{name:'White',file:'white'},{name:'Fawn Red',file:'fawn-red'}],
  'Husky':               [{name:'Black',file:'black'},{name:'Gray',file:'gray'},{name:'Red',file:'red'},{name:'Sable',file:'sable'},{name:'White',file:'white'}],
  'Doberman':            [{name:'Black',file:'black'},{name:'Brown',file:'brown'},{name:'Blue',file:'blue'},{name:'Fawn',file:'fawn'}],
  'Pomeranian':          [{name:'Gold',file:'gold'},{name:'Cream',file:'cream'},{name:'Black',file:'black'},{name:'White',file:'white'},{name:'Sable',file:'sable'}],
  'Chihuahua':           [{name:'Fawn',file:'fawn'},{name:'Black',file:'black'},{name:'White',file:'white'},{name:'Black And Tan',file:'black-and-tan'}],
  'American Bully':      [{name:'Black',file:'black'},{name:'Fawn',file:'fawn'},{name:'Chocolate',file:'chocolate'},{name:'Blue',file:'blue'},{name:'Sable',file:'sable'},{name:'Pure Blue',file:'pure-blue'}],
  'Cocker Spaniel':      [{name:'Gold',file:'gold'},{name:'Black',file:'black'},{name:'Chocolate',file:'chocolate'},{name:'Red',file:'red'},{name:'Black And White',file:'black-and-white'},{name:'Blue Roan',file:'blue-roan'},{name:'Brown And White',file:'brown-and-white'},{name:'Brown Roan',file:'brown-roan'},{name:'Ginger And White',file:'ginger-and.white'},{name:'Lemon And White',file:'lemon-and-white'},{name:'Orange Roan',file:'orange-roan'},{name:'Tricolor',file:'tricolor'}],
  'Dalmatian':           [{name:'Black Spotted',file:'black-spotted'},{name:'Liver Spotted',file:'liver-spotted'}],
  'Goldendoodle':        [{name:'Gold',file:'gold'},{name:'Apricot',file:'apricot'},{name:'Cream',file:'cream'},{name:'Chocolate',file:'chocolate'},{name:'Red',file:'red'}],
  'Morkie':              [{name:'Black And Tan',file:'black-and-tan'},{name:'White',file:'white'},{name:'Black And White',file:'black-and-white'},{name:'Black',file:'black'},{name:'White And Gray',file:'white-and-gray'},{name:'Black And Brown',file:'black-and-brown'},{name:'Blue And Tan',file:'blue-and-tan'},{name:'Gray And Tan',file:'gray-and-tan'},{name:'Biewer',file:'biewer'}],
  'Labradoodle':         [{name:'Gold',file:'gold'},{name:'Chalk',file:'chalk'},{name:'Chocolate',file:'chocolate'},{name:'Black',file:'black'}],
  'Pitbull':             [{name:'Fawn',file:'fawn'},{name:'Blue Nose',file:'blue-nose'},{name:'Red Nose',file:'red-nose'},{name:'Gray',file:'gray'}],
  'Miniature Schnauzer': [{name:'Salt & Pepper',file:'salt-and-pepper'},{name:'Black',file:'black'},{name:'Solid Black',file:'black-pure'}],
  'Shih Tzu':            [{name:'Gold',file:'gold'},{name:'White',file:'white'},{name:'Black',file:'black'},{name:'White And Gold',file:'white-and-gold'},{name:'Black And White',file:'black-and-white'},{name:'Gray And White',file:'gray-and-white'},{name:'Red And White',file:'red-and-white'},{name:'Tricolor',file:'tricolor'}],
  'Yorkshire Terrier':   [{name:'Black And Tan',file:'black-and-tan'},{name:'Blue And Tan',file:'blue-and-tan'},{name:'Black And Gold',file:'black-and-gold'},{name:'Chocolate',file:'chocolate'},{name:'Beige',file:'beige'}],
  'Akita':               [{name:'Red Fawn',file:'red-fawn'},{name:'Red',file:'red'},{name:'Sesame',file:'sesame'},{name:'White',file:'white'},{name:'Black',file:'black'}],
  'Bernedoodle':         [{name:'Tricolor',file:'tricolor'},{name:'Black And White',file:'black-and-white'},{name:'Phantom',file:'phantom'},{name:'Sable',file:'sable'},{name:'Chocolate',file:'chocolate'},{name:'Blue Merle',file:'blue-merle'},{name:'Brown Merle',file:'brown-merle'}],
  'Bernese Mountain Dog':[{name:'Tricolor',file:'tricolor'},{name:'Tuxedo',file:'tuxedo'},{name:'Black',file:'black'},{name:'Tan',file:'tan'},{name:'White',file:'white'}],
  'Border Collie':       [{name:'Black',file:'black'},{name:'Tricolor',file:'tricolor'},{name:'Red',file:'red'},{name:'Blue',file:'blue'},{name:'Lilac',file:'lilac'},{name:'Tricolor Brown',file:'tricolor-brown'}],
  'Boston Terrier':      [{name:'Black',file:'black'},{name:'Brindle',file:'brindle'}],
  'Cavapoo':             [{name:'Gold',file:'gold'},{name:'Blenheim',file:'blenheim'},{name:'Cream',file:'cream'},{name:'Red',file:'red'},{name:'Phantom',file:'phantom'},{name:'Tricolor',file:'tricolor'},{name:'Bicolor Brown',file:'bicolor-brown'}],
  'Chow Chow':           [{name:'Red',file:'red'},{name:'Black',file:'black'},{name:'Cream',file:'cream'},{name:'Cinnamon',file:'cinnamon'}],
  'Great Dane':          [{name:'Fawn',file:'fawn'},{name:'Black',file:'black'},{name:'Brindle',file:'brindle'},{name:'Blue',file:'blue'},{name:'Harlequin',file:'harlequin'},{name:'Mantle',file:'mantle'}],
  'Jack Russell Terrier':[{name:'Black And White',file:'black-and-white'},{name:'Fawn',file:'fawn'},{name:'Tricolor',file:'tricolor'}],
  'Maltese':             [{name:'White',file:'white'},{name:'Beige',file:'beige'}],
  'Newfoundland':        [{name:'Black',file:'black'},{name:'Black And White',file:'black-and-white'},{name:'Chocolate',file:'chocolate'},{name:'Gray',file:'gray'}],
  'Pug':                 [{name:'Fawn',file:'fawn'},{name:'Black',file:'black'},{name:'Gray',file:'gray'}],
  'Samoyed':             [{name:'White',file:'white'},{name:'Cream',file:'cream'},{name:'White Cream',file:'white-cream'}],
  'Saint Bernard':       [{name:'Brown And White',file:'brown-and-white'}],
  'Italian Greyhound':   [{name:'Gray',file:'gray'},{name:'Fawn',file:'fawn'},{name:'Black',file:'black'},{name:'Isabella',file:'isabella'}],
  'Papillon':            [{name:'Black And White',file:'black-and-white'},{name:'Sable',file:'sable'},{name:'Lemon',file:'lemon'},{name:'Tricolor',file:'tricolor'}],
  'Sheepadoodle':        [{name:'Black And White',file:'black-and-white'},{name:'Gray',file:'gray'},{name:'Tricolor',file:'tricolor'},{name:'Merle Chocolate',file:'merle-chocolate'}],
  'Irish Setter':        [{name:'Mahogany',file:'mahogany'}],
  'English Springer Spaniel': [{name:'Black And White',file:'black-and-white'},{name:'Liver And White',file:'liver-and-white'},{name:'Blue Roan',file:'blue-roan'},{name:'Liver Roan',file:'liver-roan'},{name:'Tricolor Black',file:'tricolor-black'},{name:'Tricolor Liver',file:'tricolor-liver'}],
  'Belgian Malinois':    [{name:'Fawn',file:'fawn'},{name:'Red',file:'red'},{name:'Black',file:'black'}],
  'Rhodesian Ridgeback': [{name:'Red Wheaten',file:'red-wheaten'},{name:'Light Wheaten',file:'light-wheaten'}],
  'Vizsla':              [{name:'Fawn',file:'fawn'},{name:'Gold Ginger',file:'gold-ginger'},{name:'Dark Gold',file:'dark-gold'}],
  'Weimaraner':          [{name:'Mouse Grey',file:'mouse-grey'},{name:'Dark Grey',file:'dark-grey'},{name:'Roe Grey',file:'roe-grey'}],
  'Schnauzer':           [{name:'Salt & Pepper',file:'salt-and-pepper'},{name:'Black',file:'black'},{name:'Black And White',file:'black-and-white'},{name:'White',file:'white'}],
  'default':             [{name:'Brown',file:'brown'},{name:'Black',file:'black'},{name:'White',file:'white'}],
};

const EYE_COLORS = [
  { name: 'Brown', hex: '#8B5E1A' }, { name: 'Dark Brown', hex: '#4A2E0A' },
  { name: 'Amber', hex: '#C8941A' }, { name: 'Hazel', hex: '#9A7830' },
  { name: 'Green', hex: '#4A7A2A' }, { name: 'Blue', hex: '#3A6AA8' },
  { name: 'Gray', hex: '#6A7A88' }, { name: 'Black', hex: '#1E1410' },
];

const COLLAR_COLORS = [
  { name: 'Sky Blue', hex: '#87CEEB' }, { name: 'Red', hex: '#E53935' },
  { name: 'Green', hex: '#43A047' }, { name: 'Yellow', hex: '#FDD835' },
  { name: 'Orange', hex: '#FB8C00' }, { name: 'Purple', hex: '#8E24AA' },
  { name: 'Pink', hex: '#E91E8C' }, { name: 'Navy', hex: '#1A237E' },
  { name: 'Black', hex: '#212121' }, { name: 'White', hex: '#F5F5F5' },
];

export const Step2_Dogs = () => {
  const { dogs, addDog, removeDog, updateDog, edition } = useCustomizationStore();
  const [isUploading, setIsUploading] = React.useState<string | null>(null);
  const isTrueLikeness = edition === 'true-likeness';

  const handlePhotoUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(id);
    const url = await uploadPhoto(file, 'dogs');
    if (url) updateDog(id, { photo: url });
    setIsUploading(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-gold">
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em]">The Companions</span>
        </div>
        <h2 className="text-5xl font-display text-navy leading-tight">Customize Your <br/><span className="italic">Dogs</span></h2>
        <p className="text-navy/60 text-lg leading-relaxed max-w-md">
          {isTrueLikeness
            ? "Upload a photo of your dog and our artists will hand-draw them perfectly."
            : "Capture the unique spirit of your furry best friends."}
        </p>
      </div>

      <AnimatePresence mode="popLayout">
        {dogs.map((dog, index) => {
          const furOptions = BREED_FURS[dog.breed] || BREED_FURS['default'];
          return (
            <motion.div key={dog.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-navy/5 border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-navy text-cream flex items-center justify-center font-display text-lg">{index + 1}</div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-navy/40">Dog Details</span>
                </div>
                {dogs.length > 1 && (
                  <button onClick={() => removeDog(dog.id)} className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-400 transition-all">
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid gap-8">
                {/* Name */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Dog's Name</label>
                  <input type="text" value={dog.name} onChange={(e) => updateDog(dog.id, { name: e.target.value })} placeholder="Enter dog's name" className="w-full p-5 rounded-2xl border border-gray-100 focus:border-gold outline-none text-navy font-medium placeholder:text-navy/20 bg-gray-50/30" />
                </div>

                {/* Breed */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Breed</label>
                  <div className="relative">
                    <select
                      value={dog.breed}
                      onChange={(e) => {
                        const breed = e.target.value;
                        if (!AVAILABLE_BREEDS.has(breed)) return;
                        updateDog(dog.id, { breed, furColor: (BREED_FURS[breed] || BREED_FURS['default'])[0].file });
                      }}
                      className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/30 text-navy font-medium outline-none focus:border-gold appearance-none"
                    >
                      {Object.entries(DOG_BREEDS).map(([group, breeds]) => (
                        <optgroup key={group} label={group}>
                          {breeds.map((b) => (
                            <option key={b} value={b} disabled={!AVAILABLE_BREEDS.has(b)}>
                              {AVAILABLE_BREEDS.has(b) ? b : `${b} (Coming Soon)`}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-navy/20"><ArrowRight className="w-4 h-4 rotate-90" /></div>
                  </div>
                </div>

                {/* Collar — always shown */}
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Collar Color</label>
                  <div className="flex flex-wrap gap-3">
                    {COLLAR_COLORS.map((color) => (
                      <button key={color.name} onClick={() => updateDog(dog.id, { collarColor: color.name })}
                        className={cn("w-10 h-10 rounded-full border-2 transition-all hover:scale-110", dog.collarColor === color.name ? "border-gold scale-110 shadow-xl" : "border-gray-200 shadow-sm")}
                        style={{ backgroundColor: color.hex }} title={color.name} />
                    ))}
                  </div>
                </div>

                {/* CLASSIC ONLY: Fur + Eye color */}
                {!isTrueLikeness && (
                  <>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Fur Color</label>
                      <div className="relative">
                        <select value={dog.furColor} onChange={(e) => updateDog(dog.id, { furColor: e.target.value })} className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50/30 text-navy font-medium outline-none focus:border-gold appearance-none">
                          {furOptions.map((color) => (
                            <option key={color.file} value={color.file}>{color.name}</option>
                          ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-navy/20"><ArrowRight className="w-4 h-4 rotate-90" /></div>
                      </div>
                    </div>

                    {/* Eye Color */}
                    <div className="space-y-3">
                      <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Eye Color</label>
                      <div className="flex flex-wrap gap-3">
                        {EYE_COLORS.map((color) => (
                          <button key={color.name} onClick={() => updateDog(dog.id, { eyeColor: color.name })}
                            className={cn("w-10 h-10 rounded-full border-2 transition-all hover:scale-110", dog.eyeColor === color.name ? "border-gold scale-110 shadow-xl" : "border-gray-200 shadow-sm")}
                            style={{ backgroundColor: color.hex }} title={color.name} />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* TRUE LIKENESS ONLY: Photo upload */}
                {isTrueLikeness && (
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-navy/40 uppercase tracking-[0.2em]">Dog Photo</label>
                    <label className="flex flex-col items-center justify-center w-full h-40 rounded-2xl border-2 border-dashed border-gray-200 cursor-pointer hover:border-gold transition-colors bg-gray-50/30">
                      {dog.photo ? (
                        <img src={dog.photo} alt="Dog" className="h-full w-full object-cover rounded-2xl" />
                      ) : isUploading === dog.id ? (
                        <span className="text-navy/40 text-sm">Uploading...</span>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-navy/30">
                          <Camera className="w-8 h-8" />
                          <span className="text-xs font-medium">Upload photo</span>
                        </div>
                      )}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(dog.id, e)} />
                    </label>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <button onClick={addDog} className="w-full py-5 rounded-[2rem] border-2 border-dashed border-gray-200 flex items-center justify-center gap-3 text-navy/40 hover:border-gold hover:text-gold transition-all font-medium">
        <Plus className="w-5 h-5" />
        <span>Add Another Dog</span>
      </button>
    </div>
  );
};

