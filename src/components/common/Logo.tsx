
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
  const [imageError, setImageError] = useState(false);
  const imagePath = '/Images/butterfly_logo.svg'; // New logo path

  return (
    <div
      className={cn('relative', className)}
      style={{ width: `${width}px`, height: `${height}px` }}
      role="img"
      aria-label="Company Logo"
    >
      {!imageError ? (
        <Image
          src={imagePath} 
          alt="Company Logo"
          width={width}
          height={height}
          className="object-contain"
          data-ai-hint="butterfly logo" // Updated hint for the butterfly logo
          priority 
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
          <p>Expected: public{imagePath}</p>
          <p className="mt-1 text-xxs">Please ensure 'public{imagePath}' exists.</p>
        </div>
      )}
    </div>
  );
};

export default ButterflyLogo;
