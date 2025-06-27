"use client";

import { Star } from "lucide-react";
import HeartIcon from "@/components/HeartIcon";
import { BIRTHDAY_TARGET_NAME } from "@/config";

const FinalPage = () => {
  return (
    <div className="scrapbook-page items-center justify-center">
      <h2 className="text-4xl md:text-5xl font-headline text-accent mb-8">
        Untuk <span className="animate-pulse">{BIRTHDAY_TARGET_NAME}</span>,
        yang Selalu Spesial ✨
      </h2>

      <div className="flex space-x-2 mb-10">
        {[...Array(3)].map((_, i) => (
          <Star
            key={`star-${i}`}
            className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
            fill="currentColor"
          />
        ))}
        <HeartIcon
          className="w-10 h-10 md:w-12 md:h-12 text-primary animate-heartBeat"
          style={{ animationDelay: `0.1s` }}
        />
        {[...Array(3)].map((_, i) => (
          <Star
            key={`star2-${i}`}
            className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 animate-pulse"
            style={{ animationDelay: `${(i + 3) * 0.2}s` }}
            fill="currentColor"
          />
        ))}
      </div>

      <p className="text-xl md:text-2xl font-body text-primary-foreground/90 mb-10 leading-relaxed max-w-md">
        Selamat ulang tahun yang ke-20, Naya. Di hari spesial ini, aku cuma
        pengen kamu tahu — kamu itu berharga, banget. Terima kasih udah jadi
        bagian penting dari hidupku. Love u more than words can say.{" "}
        <HeartIcon
          className="inline-block w-6 h-6 text-red-500 animate-heartBeat"
          style={{ animationDelay: "0.2s" }}
        />
      </p>

      <div className="absolute bottom-4 right-4 font-headline text-sm text-primary-foreground/50">
        Terima kasih udah baca scrapbook ini! ^_^
      </div>
    </div>
  );
};

export default FinalPage;
