
"use client";

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ButterflyLogoProps {
  className?: string;
  width: number;
  height: number;
}

const ButterflyLogo = ({ className, width, height }: ButterflyLogoProps) => {
  const imageSrc = '/images/butterfly-logo.png';
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn('relative', className)}
      style={{ width: `${width}px`, height: `${height}px` }}
      role="img"
      aria-label="Butterfly Logo"
    >
      {!imageError ? (
        <Image
          src={imageSrc}
          alt="Butterfly Logo"
          width={width}
          height={height}
          className="object-contain"
          data-ai-hint="butterfly leopard"
          priority
          onError={() => {
            console.error(
              `Failed to load logo from: ${imageSrc}. Ensure the file exists at 'public${imageSrc}'.`
            );
            setImageError(true);
          }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-destructive text-destructive-foreground p-1 text-xs text-center">
          <p>Logo Error</p>
          <p>Expected: public{imageSrc}</p>
        </div>
      )}
    </div>
  );
};

export default ButterflyLogo;
