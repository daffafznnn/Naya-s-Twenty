
'use client';

import ConfettiButton from '@/components/ConfettiButton';
import HeartIcon from '@/components/HeartIcon';

const PageFour = () => {
  const quotes = [
    "Senyummu adalah melodi terindah yang pernah kudengar, selalu terngiang.",
    "Bersamamu, hari biasa pun terasa seperti perayaan penuh warna.",
    "Kamu adalah bait terindah dalam puisi hidupku, yang tak pernah bosan kubaca.",
  ];

  return (
    <div className="scrapbook-page">
      <h2 className="text-3xl md:text-4xl font-headline text-primary-foreground mb-8">Bisikan Manis Untukmu...</h2>
      
      <div className="space-y-6 mb-10 text-left">
        {quotes.map((quote, index) => (
          <div key={index} className={`sticky-note transform ${index % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[1.5deg]'} max-w-sm mx-auto shadow-lg hover:shadow-xl transition-shadow`}>
            <p className="text-lg font-body italic">
              "{quote}"
              <HeartIcon className="w-4 h-4 inline-block ml-2 text-accent/80 animate-heartBeat" style={{animationDelay: `${index * 0.1}s`}}/>
            </p>
          </div>
        ))}
      </div>
      
      <ConfettiButton buttonText="Sentuh untuk Kejutan Manis!" />
      <div className="absolute bottom-4 right-4 font-headline text-sm text-primary-foreground/50">Page 4</div>
    </div>
  );
};

export default PageFour;
