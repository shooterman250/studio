
"use client";

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface ButterflyLogoProps {
  className?: string;
  width: number;
  height: number;
}

const ButterflyLogo = ({ className, width, height }: ButterflyLogoProps) => {
  return (
    <div
      className={cn('relative', className)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      role="img"
      aria-label="Company Logo"
    >
      <Image
        src="https://media.discordapp.net/attachments/1370568040256901200/1370582735122468954/butterfly_logo.png?ex=68200624&is=681eb4a4&hm=857aa242c852f51e2691ade9087a798c239d804caf79d4e04b0e1903c57337e9&=&format=webp&quality=lossless&width=1502&height=1502"
        alt="Interactive Designs Logo"
        layout="fill"
        objectFit="contain"
        priority // Add priority for LCP elements like logos on landing pages
      />
    </div>
  );
};

export default ButterflyLogo;
