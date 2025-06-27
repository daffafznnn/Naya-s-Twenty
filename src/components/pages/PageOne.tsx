'use client';

import CountdownTimer from '@/components/CountdownTimer';
import HeartIcon from '@/components/HeartIcon';
import { BIRTHDAY_TARGET_NAME } from '@/config';

const PageOne = () => {
  return (
    <div className="scrapbook-page">
      <h1 className="text-4xl md:text-5xl font-headline text-primary-foreground mb-4">
        Menuju Hari Spesialmu, {BIRTHDAY_TARGET_NAME}
      </h1>
      <CountdownTimer />
      <p className="text-xl md:text-2xl font-body text-accent mt-6">
        Waktu terus berjalan... dan bentar lagi, momen yang kita tunggu-tunggu akhirnya datang juga.
      </p>
      <div className="absolute bottom-4 right-4 font-headline text-sm text-primary-foreground/50">Page 1</div>
    </div>
  );
};

export default PageOne;
