
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
        src="https://media.discordapp.net/attachments/1370568040256901200/1370582735122468954/butterfly_logo.png?ex=682897e4&is=68274664&hm=d1efad37b54995ce17b2917059ef5d7f3786ab33798c045302dc9cb1476519ca&=&format=webp&quality=lossless&width=1502&height=1502"
        alt="Interactive Designs Logo"
        layout="fill"
        objectFit="contain"
        priority // Add priority for LCP elements like logos on landing pages
      />
    </div>
  );
};

export default ButterflyLogo;
