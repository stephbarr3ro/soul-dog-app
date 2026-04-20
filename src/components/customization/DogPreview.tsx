import React, { useEffect, useRef } from 'react';
import { Dog } from '@/src/store/useCustomizationStore';
const CDN='/dogs';
const BREED_FOLDER:Record<string,string>={'Golden Retriever':'golden-retriever','Labrador':'labrador','French Bulldog':'french-bulldog','German Shepherd':'german-shepherd','Poodle':'standard-poodle','Bulldog':'bulldog','Beagle':'beagle','Rottweiler':'rottweiler','Dachshund':'dachshund','Corgi':'corgi','Australian Shepherd':'australian-shepherd','Boxer':'boxer','Husky':'husky','Doberman':'doberman','Pomeranian':'pomeranian','Chihuahua':'chihuahua','American Bully':'american-bully','Cocker Spaniel':'cocker-spaniel','Dalmatian':'dalmatian','Goldendoodle':'goldendoodle','Morkie':'morkie'};
const COLLAR_FILE:Record<string,string>={'Sky Blue':'skyblue','Red':'red','Green':'green','Yellow':'yellow','Orange':'orange','Purple':'purple','Pink':'pink','Navy':'navy','Black':'black','White':'white'};
const EYE_FILE:Record<string,string>={'Brown':'brown','Dark Brown':'dark-brown','Amber':'amber','Hazel':'hazel','Green':'green','Blue':'blue','Gray':'gray','Black':'black'};
function loadImg(src:string):Promise<HTMLImageElement|null>{return new Promise(resolve=>{const img=new window.Image();img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src=src;});}
export const DogPreview:React.FC<{dog:Dog;size?:number}>=({dog,size=300})=>{
const canvasRef=useRef<HTMLCanvasElement>(null);
const abortRef=useRef(false);
const folder=BREED_FOLDER[dog.breed]||'golden-retriever';
const eyeUrl=`${CDN}/${folder}/eye/${EYE_FILE[dog.eyeColor]||'brown'}.webp`;
const furUrl=`${CDN}/${folder}/fur/${dog.furColor||'golden'}.webp`;
const collarUrl=`${CDN}/${folder}/collar/${COLLAR_FILE[dog.collarColor]||'red'}.webp`;
useEffect(()=>{
abortRef.current=false;
Promise.all([loadImg(eyeUrl),loadImg(furUrl),loadImg(collarUrl)]).then(([eyeImg,furImg,collarImg])=>{
if(abortRef.current)return;
const canvas=canvasRef.current;if(!canvas)return;
const ctx=canvas.getContext('2d');if(!ctx)return;
ctx.clearRect(0,0,size,size);
if(eyeImg)ctx.drawImage(eyeImg,0,0,size,size);
if(furImg)ctx.drawImage(furImg,0,0,size,size);
if(collarImg)ctx.drawImage(collarImg,0,0,size,size);
});
return()=>{abortRef.current=true;};
},[dog.breed,dog.furColor,dog.eyeColor,dog.collarColor,size,eyeUrl,furUrl,collarUrl]);
return(<canvas ref={canvasRef} width={size} height={size} style={{display:'block',maxWidth:'100%',margin:'0 auto'}}/>);
};
