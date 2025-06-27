'use client';

import Image from 'next/image';

const PageThree = () => {
  return (
    <div className="scrapbook-page">
      <h2 className="text-3xl md:text-4xl font-headline text-primary-foreground mb-6">
        Potongan Momen Kita
      </h2>
      <p className="font-body text-lg text-primary-foreground/80 mb-8 max-w-md">
        Beberapa cuplikan yang mungkin nggak sempurna, tapi selalu berhasil bikin kita ketawa atau senyum sendiri pas ke inget.
      </p>
      
      <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-md w-full">
        <div className="tilted-image transform rotate-3">
          <Image 
            src="https://i.ibb.co/kgkzt6dC/IMG-20250606-WA0067.jpg" 
            alt="Wajah Kocak 1" 
            width={180} 
            height={180}
            className="rounded-md shadow-lg border-2 border-white object-cover aspect-square"
            data-ai-hint="silly face selfie"
          />
           <div className="tape -top-2 -right-2 transform rotate-45 bg-pink-300/70"></div>
        </div>
        <div className="tilted-image transform -rotate-2">
          <Image 
            src="https://i.ibb.co/wDH5mJ0/IMG-20250608-WA0024.jpg" 
            alt="Makanan Favorit Bareng" 
            width={180} 
            height={180}
            className="rounded-md shadow-lg border-2 border-white object-cover aspect-square"
            data-ai-hint="favorite food shared"
          />
        </div>
        <div className="tilted-image transform rotate-1 col-span-2">
           <Image 
            src="https://i.ibb.co/gMbBBw2S/IMG-20250515-WA0015.jpg" 
            alt="Pemandangan Favorit" 
            width={380} 
            height={180}
            className="rounded-md shadow-lg border-2 border-white object-cover"
            data-ai-hint="beautiful scenery together"
          />
           <div className="tape -bottom-2 -left-2 transform -rotate-[30deg] bg-yellow-300/70"></div>
        </div>
      </div>

      <div className="sticky-note transform -rotate-4 mt-6 self-start ml-4 md:ml-0">
        <p className="text-md font-body">
          Inget nggak pas ini? Random banget tapi lucu wkwkwk 😂
        </p>
      </div>

      <div className="absolute bottom-4 right-4 font-headline text-sm text-primary-foreground/50">Page 3</div>
    </div>
  );
};

export default PageThree;
