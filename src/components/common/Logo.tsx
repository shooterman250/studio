
"use client";

import { cn } from '@/lib/utils';

interface ButterflyLogoProps {
  className?: string;
  width: number;
  height: number;
}

const ButterflyLogo = ({ className, width, height }: ButterflyLogoProps) => {
  return (
    <div
      className={cn('rounded-full', className)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#99847A', // Apply the specified color
      }}
      role="img" // Keep role for now, can be adjusted if it's purely decorative
      aria-label="Company Logo" // Adjust label if it's no longer a "butterfly"
    >
      {/* Content of the circle, can be empty or have initials/icon later */}
    </div>
  );
};

export default ButterflyLogo;
