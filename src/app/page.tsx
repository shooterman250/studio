
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
          Your Style, Your Needs. Captured and organized in one seamless space.
        </p>
        {mounted ? (
          <Link
            href="/overall-budget" // CHANGED from /client-info
            className={cn(
              buttonVariants({ variant: 'default', size: 'lg' }),
              'text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300'
            )}
          >
            Start Designing
          </Link>
        ) : (
          <div
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium", 
              "text-lg px-10 py-6 shadow-lg", 
              "bg-muted text-muted-foreground animate-pulse" 
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
