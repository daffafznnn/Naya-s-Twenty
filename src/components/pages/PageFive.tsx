'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle, PauseCircle, AlertTriangle, Headphones } from 'lucide-react';
import HeartIcon from '@/components/HeartIcon';
import * as Tone from 'tone';

const PageFive = () => {
  const [audioPlayer, setAudioPlayer] = useState<Tone.Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const player = new Tone.Player({
      url: "/audio/naya_message.mp3", 
      autostart: false,
      onload: () => {
        setIsAudioReady(true);
        setError(null);
      },
      onerror: (err) => {
        console.error("Error loading audio:", err);
        setError("Gagal memuat pesan suara. Pastikan file audio ada.");
        setIsAudioReady(false);
      }
    }).toDestination();
    
    player.onstop = () => setIsPlaying(false);
    setAudioPlayer(player);

    return () => {
      player?.dispose();
    };
  }, []);

  const togglePlay = async () => {
    if (!audioPlayer || !isAudioReady) return;

    if (Tone.context.state !== 'running') {
      await Tone.start();
    }

    if (isPlaying) {
      audioPlayer.stop();
      setIsPlaying(false);
    } else {
      try {
        await audioPlayer.start();
        setIsPlaying(true);
      } catch (e) {
        console.error("Error playing audio:", e);
        setError("Tidak bisa memutar audio. Coba lagi.");
      }
    }
  };
  // Function to increase the volume
  const adjustVolume = (value: number) => {
    if (audioPlayer) {
      audioPlayer.volume.value = value;
    }
  };

  // Set a slightly higher volume when player is ready
  useEffect(() => {
    if (audioPlayer && isAudioReady) {
      // Increase by 6dB (makes it about 2x louder)
      adjustVolume(6);
    }
  }, [audioPlayer, isAudioReady]);

  return (
    <div className="scrapbook-page">
      <h2 className="text-3xl md:text-4xl font-headline text-primary-foreground mb-6">Sedikit dari Apa yang Aku Rasain</h2>
      
      <div className="bg-white/80 p-6 rounded-lg shadow-xl max-w-lg text-gray-700 text-left space-y-4 font-body text-lg leading-relaxed relative border-2 border-dashed border-primary">
        <p>
          "Naya, sekarang kamu 20. Tapi jujur aja, di mataku kamu tetap orang yang bikin aku nyaman dari hari pertama kita deket.
          Terima kasih udah selalu ada. Dan selamat ulang tahun, ya."
          <HeartIcon className="w-5 h-5 inline-block text-accent animate-heartBeat" />
          <HeartIcon className="w-5 h-5 inline-block text-red-400 animate-heartBeat" style={{animationDelay: '0.2s'}} />
        </p>
        <p className="text-right font-semibold not-italic text-primary-foreground/80">- Dari seseorang yang sayang kamu, setiap hari</p>
      </div>

      <div className="mt-8">
        {error && (
          <div className="flex items-center text-red-600 bg-red-100 p-3 rounded-md mb-4">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        <Button 
          onClick={togglePlay} 
          disabled={!isAudioReady || !!error}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-headline px-6 py-3 text-lg rounded-lg shadow-md"
          aria-label={isPlaying ? "Pause personal message" : "Play personal message"}
        >
          {isPlaying ? <PauseCircle className="mr-2 h-6 w-6" /> : <Headphones className="mr-2 h-6 w-6" />}
          {isPlaying ? "Jeda Pesan Suara" : "Dengerin Pesan Dariku"}
        </Button>
        {!isAudioReady && !error && <p className="text-sm text-muted-foreground mt-2">Memuat pesan suara...</p>}
      </div>

      <div className="absolute bottom-4 right-4 font-headline text-sm text-primary-foreground/50">Page 5</div>
    </div>
  );
};

export default PageFive;
