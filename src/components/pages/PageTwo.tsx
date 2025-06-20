
'use client';

import Image from 'next/image';
import HeartIcon from '@/components/HeartIcon';

const PageTwo = () => {
  return (
    <div className="scrapbook-page">
      <h2 className="text-3xl md:text-4xl font-headline text-primary-foreground mb-8">Potret Kisah Kita</h2>
      
      <div className="relative mb-8">
        <div className="tilted-image transform -rotate-6">
          <Image 
            src="https://placehold.co/300x400.png" 
            alt="Foto Kita Berdua" 
            width={280} 
            height={380}
            className="rounded-lg shadow-2xl border-4 border-white"
            data-ai-hint="couple photo candid"
          />
          <div className="tape -top-3 -left-3 transform -rotate-45"></div>
          <div className="tape -bottom-3 -right-3 transform rotate-[135deg] bg-accent/50"></div>
        </div>
      </div>
      
      <div className="sticky-note transform rotate-3 shadow-xl">
        <p className="text-lg md:text-xl font-body text-center">
          "Dalam setiap senyummu, ada cerita favoritku."
          <HeartIcon className="w-5 h-5 inline-block ml-1 text-red-500 animate-heartBeat" style={{animationDelay: '0.2s'}}/>
        </p>
      </div>
      <div className="absolute bottom-4 right-4 font-headline text-sm text-primary-foreground/50">Page 2</div>
    </div>
  );
};

export default PageTwo;
