
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
  // The image should be placed in `public/Images/MAIN LOGO.png`
  // and will be accessed via `/Images/MAIN LOGO.png`. 
  const [imageError, setImageError] = useState(false);
  const imagePath = '/Images/MAIN LOGO.png'; // New logo path
  return (
    <div
      className={cn('relative', className)}
      style={{ width: `${width}px`, height: `${height}px` }}
      role="img"
      aria-label="Company Logo" // Changed from Butterfly Logo to Company Logo
    >
      {!imageError ? (
        <Image
          src={imagePath} // Use the direct path to the local image
          alt="Company Logo" // Changed from Butterfly Logo
          width={width}
          height={height}
          className="object-contain"
          data-ai-hint="main logo" // Updated hint for the main logo
          priority // Keep priority as logos are often LCP
          onError={() => {
            console.error(
              `Failed to load logo from: ${imagePath}. Please ensure the image exists at this location.`
            );
            setImageError(true);
          }}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-destructive text-destructive-foreground p-1 text-xs text-center"> 
          <p>Logo Display Error</p>
          <p>Expected: public/Images/MAIN LOGO.png</p>
          <p className="mt-1 text-xxs">Please ensure 'public/Images/MAIN LOGO.png' exists.</p>
        </div>
      )}
    </div>
  );
};

export default ButterflyLogo;

