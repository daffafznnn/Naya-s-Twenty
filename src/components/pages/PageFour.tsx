'use client';

import ConfettiButton from '@/components/ConfettiButton';
import HeartIcon from '@/components/HeartIcon';

const PageFour = () => {
  const quotes = [
    "Ada hal-hal kecil yang selalu bikin aku inget kamu — kayak cara kamu ketawa atau ngomel pelan waktu ngambek.",
    "Nggak perlu momen spesial buat bikin hari jadi istimewa... asal ada kamu, udah cukup.",
    "Kadang aku lupa bilang, tapi sebenernya kamu selalu jadi bagian terbaik dari hariku.",
  ];

  return (
    <div className="scrapbook-page">
      <h2 className="text-3xl md:text-4xl font-headline text-primary-foreground mb-8">
        Beberapa Hal yang Pengen Aku Bilang
      </h2>
      
      <div className="space-y-6 mb-10 text-left">
        {quotes.map((quote, index) => (
          <div 
            key={index} 
            className={`sticky-note transform ${index % 2 === 0 ? 'rotate-[-1.5deg]' : 'rotate-[2deg]'} max-w-sm mx-auto shadow-lg hover:shadow-xl transition-shadow`}
          >
            <p className="text-lg font-body">
              “{quote}”
              <HeartIcon 
                className="w-4 h-4 inline-block ml-2 text-accent/80 animate-heartBeat" 
                style={{ animationDelay: `${index * 0.1}s` }} 
              />
            </p>
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 right-4 font-headline text-sm text-primary-foreground/50">Page 4</div>
    </div>
  );
};

export default PageFour;
