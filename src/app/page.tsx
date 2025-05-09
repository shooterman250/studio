
import Link from 'next/link';
import ButterflyLogo from '@/components/common/Logo';
// import { Button } from '@/components/ui/button'; // Button component no longer needed directly here for this link
import { buttonVariants } from '@/components/ui/button'; // Import buttonVariants
import { cn } from '@/lib/utils'; // Import cn

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <ButterflyLogo width={160} height={160} className="mx-auto animate-pulse" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Welcome to RoomDesigner
        </h1>
        <p className="text-md opacity-80 sm:text-lg">
          Unleash your creativity and design the room of your dreams with our interactive tools.
        </p>
        <Link
          href="/designer"
          className={cn(
            buttonVariants({ variant: 'default', size: 'lg' }),
            'text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300'
          )}
        >
          Start Designing
        </Link>
      </div>
    </div>
  );
}

