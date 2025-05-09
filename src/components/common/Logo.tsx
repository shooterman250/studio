
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
  // Changed to use a placeholder to "fix" the error of the local file not being found.
  // This will prevent the "Logo Error Expected: public/images/butterfly-logo.png" message.
  const imageSrc = `https://picsum.photos/seed/butterflylogo/${width}/${height}`;
  const originalIntendedSrc = '/images/butterfly-logo.png'; // Keep for context if placeholder fails

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
          alt="Butterfly Logo" // Alt text remains, as picsum is serving as the logo placeholder
          width={width}
          height={height}
          className="object-contain"
          data-ai-hint="butterfly leopard" // This hint is for the intended final image
          priority
          onError={() => {
            console.error(
              `Failed to load placeholder logo from: ${imageSrc}. The intended logo was 'public${originalIntendedSrc}'.`
            );
            setImageError(true);
          }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-destructive text-destructive-foreground p-1 text-xs text-center">
          <p>Logo Display Error</p>
          {/* Updated error message to be more specific if the placeholder itself fails */}
          <p>Placeholder failed: {imageSrc}</p>
          <p>Intended: public{originalIntendedSrc}</p>
          <p className="mt-1 text-xxs">Please ensure 'public{originalIntendedSrc}' exists or check network for placeholder.</p>
        </div>
      )}
    </div>
  );
};

export default ButterflyLogo;

