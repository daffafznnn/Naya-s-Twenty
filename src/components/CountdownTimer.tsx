
'use client';

import { useState, useEffect } from 'react';
import { BIRTHDAY_DATE, BIRTHDAY_TARGET_NAME } from '@/config';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft | null => {
    const difference = +BIRTHDAY_DATE - +new Date();
    if (difference <= 0) {
      return null; 
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!timeLeft) {
    return (
      <div className="text-center p-4 bg-primary/20 rounded-lg shadow-md">
        <p className="text-2xl font-headline text-accent">Momen Spesial {BIRTHDAY_TARGET_NAME} Telah Tiba!</p>
        <p className="text-lg font-body text-primary-foreground">Selamat Ulang Tahun yang ke-20! 🎉</p>
      </div>
    );
  }

  return (
    <div className="text-center p-6 bg-primary/30 rounded-xl shadow-xl my-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-primary-foreground">
        {(Object.keys(timeLeft) as Array<keyof TimeLeft>).map((interval) => (
          <div key={interval} className="flex flex-col items-center p-3 bg-background/70 rounded-lg shadow-inner">
            <span className="text-4xl md:text-5xl font-headline text-accent">
              {timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : timeLeft[interval]}
            </span>
            <span className="text-sm font-body uppercase tracking-wider text-primary-foreground/80">
              {interval}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
