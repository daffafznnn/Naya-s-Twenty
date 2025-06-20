
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PartyPopper, Music, AlertTriangle, Star } from 'lucide-react';
import HeartIcon from '@/components/HeartIcon';
import * as Tone from 'tone';
import { BIRTHDAY_TARGET_NAME } from '@/config';

const FinalPage = () => {
  const [audioPlayer, setAudioPlayer] = useState<Tone.Player | null>(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const player = new Tone.Player({
      url: "/audio/surprise_soundtrack.mp3", 
      autostart: false,
      loop: true,
      onload: () => {
        setIsAudioReady(true);
        setError(null);
      },
      onerror: (err) => {
        console.error("Error loading surprise audio:", err);
        setError("Gagal memuat musik kejutan.");
        setIsAudioReady(false);
      }
    }).toDestination();
    player.volume.value = -8;
    setAudioPlayer(player);

    return () => {
      player?.dispose();
    };
  }, []);

  const revealSurprise = async () => {
    if (!audioPlayer || !isAudioReady) return;

    if (Tone.context.state !== 'running') {
      await Tone.start();
    }
    
    setHasInteracted(true);
    try {
      if (audioPlayer.state !== "started") {
        await audioPlayer.start();
      }
    } catch (e) {
      console.error("Error playing surprise audio:", e);
      setError("Tidak bisa memutar musik kejutan.");
    }
  };

  return (
    <div className="scrapbook-page items-center justify-center">
      <h2 className="text-4xl md:text-5xl font-headline text-accent mb-8">
        Puncak Perayaan untuk <span className="animate-pulse">{BIRTHDAY_TARGET_NAME}!</span>
      </h2>
      
      <div className="flex space-x-2 mb-10">
        {[...Array(3)].map((_, i) => (
          <Star 
            key={`star-${i}`} 
            className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 animate-pulse" 
            style={{animationDelay: `${i * 0.2}s`}} 
            fill="currentColor"
          />
        ))}
         <HeartIcon 
            className="w-10 h-10 md:w-12 md:h-12 text-primary animate-heartBeat" 
            style={{animationDelay: `0.1s`}} 
          />
        {[...Array(3)].map((_, i) => (
          <Star 
            key={`star2-${i}`} 
            className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 animate-pulse" 
            style={{animationDelay: `${(i+3) * 0.2}s`}} 
            fill="currentColor"
          />
        ))}
      </div>

      <p className="text-xl md:text-2xl font-body text-primary-foreground/90 mb-10 leading-relaxed max-w-md">
        Selamat ulang tahun yang ke-20, cintaku! Semoga semesta merayakanmu hari ini dan selamanya. Aku di sini, selalu untukmu.
      </p>

      {!hasInteracted && (
        <>
          {error && (
            <div className="flex items-center text-red-600 bg-red-100 p-3 rounded-md mb-4">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <p className="text-sm">{error}</p>
            </div>
          )}
          <Button 
            onClick={revealSurprise} 
            disabled={!isAudioReady || !!error}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-headline px-8 py-4 text-xl rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200"
            aria-label="Reveal final surprise and play music"
          >
            <PartyPopper className="mr-2 h-6 w-6" />
            Rayakan Momen Ini!
          </Button>
          {!isAudioReady && !error && <p className="text-sm text-muted-foreground mt-2">Memuat kejutan terakhir...</p>}
        </>
      )}

      {hasInteracted && isAudioReady && !error && (
        <div className="mt-6 flex items-center text-lg font-body text-green-700 bg-green-100 p-4 rounded-lg shadow">
          <Music className="mr-3 h-6 w-6" />
          <span>Melodi kebahagiaanmu sedang mengalun... Resapi setiap detiknya!</span>
        </div>
      )}
      <div className="absolute bottom-4 right-4 font-headline text-sm text-primary-foreground/50">Kisah kita baru dimulai...</div>
    </div>
  );
};

export default FinalPage;
