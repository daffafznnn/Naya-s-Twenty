'use client';

import { useEffect, useState } from 'react';
import type { Options } from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';
import * as Tone from 'tone';

interface ConfettiButtonProps {
  buttonText?: string;
  confettiOptions?: Options;
  soundUrl?: string;
}

const ConfettiButton: React.FC<ConfettiButtonProps> = ({
  buttonText = "Reveal Surprise!",
  confettiOptions,
  soundUrl = "/audio/confetti_sound.mp3" // Placeholder
}) => {
  const [confetti, setConfetti] = useState<((opts: Options) => void) | null>(null);
  const [confettiSound, setConfettiSound] = useState<Tone.Player | null>(null);
  const [isAudioReady, setIsAudioReady] = useState(false);

  useEffect(() => {
    import('canvas-confetti').then((module) => {
      setConfetti(() => module.default);
    });
    
    const player = new Tone.Player(soundUrl).toDestination();
    player.volume.value = -2; // Slightly lower volume for SFX
    
    Tone.loaded().then(() => {
      setConfettiSound(player);
      setIsAudioReady(true);
    }).catch(err => console.error("Error loading confetti sound:", err));

    return () => {
      player?.dispose();
    };
  }, [soundUrl]);

  const triggerConfetti = async () => {
    if (!confetti) return;

    if (Tone.context.state !== 'running') {
      await Tone.start();
    }

    if (confettiSound && isAudioReady && confettiSound.state !== "started") {
      try {
        await confettiSound.start();
      } catch (error) {
        console.error("Error playing confetti sound:", error);
      }
    }
    
    const defaults: Options = {
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FFD1DC', '#F08080', '#FFFFFF', '#FFC0CB', '#FA8072'], // Pastel pink, romantic red, white
    };

    confetti({ ...defaults, ...confettiOptions });
  };

  return (
    <Button
      onClick={triggerConfetti}
      disabled={!confetti || !isAudioReady}
      className="bg-accent hover:bg-accent/90 text-accent-foreground font-headline px-6 py-3 text-lg rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 my-4"
      aria-label="Trigger confetti and sound"
    >
      <Gift className="mr-2 h-5 w-5" />
      {buttonText}
    </Button>
  );
};

export default ConfettiButton;
