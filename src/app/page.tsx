
"use client";

import Link from 'next/link';
import ButterflyLogo from '@/components/common/Logo';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <ButterflyLogo width={320} height={320} className="mx-auto animate-pulse" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Welcome To Your Personal Design Hub
        </h1>
        <p className="text-md opacity-80 sm:text-lg">
          Unleash your creativity and design the room of your dreams with our interactive tools.
        </p>
        {mounted ? (
          <Link
            href="/designer"
            className={cn(
              buttonVariants({ variant: 'default', size: 'lg' }),
              // The user previously requested this button background to be #99847A.
              // The 'default' variant in globals.css for buttons is currently:
              // "bg-card text-primary-foreground hover:bg-card/[.90]"
              // --card is 20 12% 62% (#9E918A) which is close to #99847A
              // Custom classes for specific sizing and look:
              'text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300'
            )}
          >
            Start Designing
          </Link>
        ) : (
          // Placeholder to prevent layout shift and avoid rendering potentially mismatched component on initial load
          <div
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium", // Base structure
              "text-lg px-10 py-6 shadow-lg", // Sizing and appearance from custom classes
              "bg-muted text-muted-foreground animate-pulse" // Placeholder styling
            )}
            aria-hidden="true"
          >
            Start Designing
          </div>
        )}
      </div>
    </div>
  );
}

