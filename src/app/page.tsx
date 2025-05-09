
import Link from 'next/link';
import ButterflyLogo from '@/components/common/Logo';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <ButterflyLogo width={96} height={96} className="mx-auto animate-pulse" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Welcome to RoomDesigner
        </h1>
        <p className="text-lg opacity-80 sm:text-xl">
          Unleash your creativity and design the room of your dreams with our interactive tools.
        </p>
        <Link href="/designer" passHref>
          <Button size="lg" className="text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            Start Designing
          </Button>
        </Link>
      </div>
    </div>
  );
}
