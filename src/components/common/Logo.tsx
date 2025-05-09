import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ButterflyLogoProps {
  className?: string;
  width: number;
  height: number;
  // Alt text could be a prop if it needs to be dynamic
}

const ButterflyLogo = ({ className, width, height }: ButterflyLogoProps) => {
  // The user should place their 'butterfly-logo.png' in the 'public/images/' directory.
  const imageSrc = '/images/butterfly-logo.png'; 

  return (
    <div 
      className={cn('relative', className)} 
      style={{ width: `${width}px`, height: `${height}px` }}
      role="img"
      aria-label="Butterfly Logo"
    >
      <Image
        src={imageSrc}
        alt="Butterfly Logo"
        width={width}
        height={height}
        className="object-contain" // Ensures the image fits well within the bounds maintaining aspect ratio
        data-ai-hint="butterfly leopard" // Updated hint based on image
        priority // Prioritize loading for logos often in LCP
      />
    </div>
  );
};

export default ButterflyLogo;
