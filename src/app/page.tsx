
'use client';

import { useState, useEffect, useCallback } from 'react';
import PageOne from '@/components/pages/PageOne';
import PageTwo from '@/components/pages/PageTwo';
import PageThree from '@/components/pages/PageThree';
import PageFour from '@/components/pages/PageFour';
import PageFive from '@/components/pages/PageFive';
import FinalPage from '@/components/pages/FinalPage';
import LoveBeadsBackground from '@/components/LoveBeadsBackground';
import CountdownTimer from '@/components/CountdownTimer';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Heart, Gift } from 'lucide-react';
import * as Tone from 'tone';
import { useToast } from "@/hooks/use-toast";
import { BIRTHDAY_DATE, BIRTHDAY_TARGET_NAME } from '@/config';

const totalPages = 6;

export default function ScrapbookApp() {
  const isDDayOrAfter = useCallback(() => new Date() >= BIRTHDAY_DATE, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [isMuted, setIsMuted] = useState(true);
  const [bgMusicPlayer, setBgMusicPlayer] = useState<Tone.Player | null>(null);
  const [pageTurnSfxPlayer, setPageTurnSfxPlayer] = useState<Tone.Player | null>(null);
  const [hasInteractedForEntry, setHasInteractedForEntry] = useState(false); // Renamed for clarity
  const [audioContextStarted, setAudioContextStarted] = useState(false);
  const { toast } = useToast();

  const ensureAudioContext = useCallback(async () => {
    if (Tone.context.state !== 'running') {
      try {
        await Tone.start();
        setAudioContextStarted(true);
        console.log("AudioContext started by scrapbook app.");
      } catch (e) {
        console.error("Error starting AudioContext:", e);
        toast({
          title: "Audio Error",
          description: "Could not start audio. Please interact with the page again.",
          variant: "destructive",
        });
        return false;
      }
    } else {
       setAudioContextStarted(true);
    }
    return true;
  }, [toast]);

  useEffect(() => {
    const musicPlayer = new Tone.Player({
      url: "/audio/background_music.mp3",
      loop: true,
      autostart: false,
      volume: -12,
    }).toDestination();
    setBgMusicPlayer(musicPlayer);

    const sfxPlayer = new Tone.Player({
      url: "/audio/page-turn.mp3",
      autostart: false,
      volume: -5,
    }).toDestination();
    setPageTurnSfxPlayer(sfxPlayer);
    
    Tone.loaded().then(() => {
      console.log("Core audio assets loaded.");
    }).catch(err => console.error("Error preloading core audio:", err));

    return () => {
      musicPlayer?.dispose();
      sfxPlayer?.dispose();
    };
  }, []);
  
  const handleEntryInteraction = async () => {
    setHasInteractedForEntry(true);
    const contextReady = await ensureAudioContext();
    if (contextReady && bgMusicPlayer && !isMuted && bgMusicPlayer.state !== "started") {
      try {
        await bgMusicPlayer.start();
      } catch (e) {
        console.error("Error starting background music on initial interaction:", e);
      }
    }
  };

  const toggleMute = async () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    const contextReady = await ensureAudioContext();

    if (bgMusicPlayer && contextReady) {
      if (newMutedState) {
        bgMusicPlayer.stop();
      } else {
        if (bgMusicPlayer.state !== "started") {
          try {
            await bgMusicPlayer.start();
          } catch (e) {
            console.error("Error starting background music on unmute:", e);
          }
        }
      }
    }
  };

  const playPageTurnSound = async () => {
    if (pageTurnSfxPlayer && !isMuted) {
      const contextReady = await ensureAudioContext();
      if (contextReady && pageTurnSfxPlayer.state !== "started") {
         try {
            await pageTurnSfxPlayer.start();
          } catch (e) {
            console.error("Error playing page turn sfx:", e);
          }
      }
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      playPageTurnSound();
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      playPageTurnSound();
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') nextPage();
      if (event.key === 'ArrowLeft') prevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isMuted, audioContextStarted, hasInteractedForEntry]); // Added hasInteractedForEntry


  const renderPage = () => {
    switch (currentPage) {
      case 1: return <PageOne />;
      case 2: return <PageTwo />;
      case 3: return <PageThree />;
      case 4: return <PageFour />;
      case 5: return <PageFive />;
      case 6: return <FinalPage />;
      default: return <PageOne />;
    }
  };

  const showGateScreen = !isDDayOrAfter() || (isDDayOrAfter() && !hasInteractedForEntry);

  if (showGateScreen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/30 via-background to-accent/20 text-foreground p-6 text-center">
        <LoveBeadsBackground />
        <Gift className="w-24 h-24 text-accent mb-6 animate-bounce" />
        <h1 className="text-4xl md:text-5xl font-headline text-primary-foreground mb-4">
          {isDDayOrAfter() 
            ? `Selamat Datang di Dunia Ajaib ${BIRTHDAY_TARGET_NAME}!` 
            : `Menghitung Mundur ke Hari Spesial ${BIRTHDAY_TARGET_NAME}!`}
        </h1>
        
        <CountdownTimer />

        {isDDayOrAfter() ? (
          <>
            <p className="text-lg md:text-xl font-body text-primary-foreground/80 my-6 max-w-md">
              Hari yang dinanti telah tiba! Bukalah lembaran baru penuh cinta & tawa.
            </p>
            <Button
              onClick={handleEntryInteraction}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-headline px-10 py-5 text-2xl rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
              aria-label={`Start ${BIRTHDAY_TARGET_NAME}'s Birthday Scrapbook Experience`}
            >
              Masuki Duniamu! <Heart className="inline-block ml-2 w-5 h-5" />
            </Button>
            <p className="mt-6 text-sm text-muted-foreground">Psst... nyalakan suara untuk pengalaman penuh!</p>
          </>
        ) : (
          <p className="text-lg md:text-xl font-body text-primary-foreground/80 my-6 max-w-md">
            Sabar ya... sedikit lagi menuju hari spesialmu. Kejutan indah menantimu di sini!
          </p>
        )}
      </div>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/5 text-foreground overflow-hidden p-2" onClick={ensureAudioContext}>
      <LoveBeadsBackground />
      <div className="w-full flex-grow flex items-center justify-center pt-16 pb-24 md:pt-20 md:pb-28">
        <div key={currentPage} className="animate-fadeIn w-full px-2 flex justify-center">
          {renderPage()}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center p-3 md:p-5 bg-background/80 backdrop-blur-sm shadow-2xl border-t border-primary/30 z-50">
        <Button 
          onClick={prevPage} 
          disabled={currentPage === 1} 
          variant="ghost" 
          size="lg" 
          aria-label="Previous Page"
          className="text-primary-foreground hover:text-accent disabled:opacity-30 rounded-full p-3"
        >
          <ChevronLeft size={36} strokeWidth={1.5}/>
        </Button>
        <span className="font-headline text-lg text-primary-foreground">
          {currentPage} / {totalPages}
        </span>
        <Button 
          onClick={nextPage} 
          disabled={currentPage === totalPages} 
          variant="ghost" 
          size="lg" 
          aria-label="Next Page"
          className="text-primary-foreground hover:text-accent disabled:opacity-30 rounded-full p-3"
        >
          <ChevronRight size={36} strokeWidth={1.5}/>
        </Button>
      </div>

      <Button
        onClick={toggleMute}
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 md:top-6 md:right-6 z-50 text-primary-foreground hover:text-accent bg-background/80 backdrop-blur-sm rounded-full p-3 shadow-lg"
        aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {isMuted ? <VolumeX size={28} strokeWidth={1.5}/> : <Volume2 size={28} strokeWidth={1.5}/>}
      </Button>
    </main>
  );
}
