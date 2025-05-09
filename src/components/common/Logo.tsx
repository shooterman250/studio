import type { SVGProps } from 'react';

const ButterflyLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100" // Increased viewBox for more detail
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1" // Adjusted stroke width
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-labelledby="butterflyLogoTitle"
    {...props}
    className={`h-8 w-8 text-primary ${props.className || ''}`}
  >
    <title id="butterflyLogoTitle">Butterfly Logo</title>
    {/* Simplified butterfly shape with more detail inspired by image */}
    {/* Left Wing */}
    <path d="M50 10 C 20 20, 10 50, 10 50 C 10 80, 30 90, 50 90" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" />
    {/* Right Wing */}
    <path d="M50 10 C 80 20, 90 50, 90 50 C 90 80, 70 90, 50 90" fill="hsl(var(--primary))" stroke="hsl(var(--foreground))" />

    {/* Body */}
    <ellipse cx="50" cy="50" rx="5" ry="25" fill="hsl(var(--foreground))" />
    
    {/* Antennae */}
    <line x1="50" y1="25" x2="40" y2="5" strokeWidth="1.5" stroke="hsl(var(--foreground))" />
    <line x1="50" y1="25" x2="60" y2="5" strokeWidth="1.5" stroke="hsl(var(--foreground))" />
    <circle cx="40" cy="5" r="2" fill="hsl(var(--foreground))" />
    <circle cx="60" cy="5" r="2" fill="hsl(var(--foreground))" />

    {/* Spots - representative, not exact */}
    {/* Left Wing Spots */}
    <circle cx="30" cy="35" r="3" fill="hsl(var(--foreground))" opacity="0.7" />
    <circle cx="20" cy="60" r="4" fill="hsl(var(--foreground))" opacity="0.7" />
    <circle cx="35" cy="75" r="3.5" fill="hsl(var(--foreground))" opacity="0.7" />
    <circle cx="25" cy="40" r="2" fill="hsl(var(--card-foreground))" opacity="0.5" />
    <circle cx="18" cy="70" r="2.5" fill="hsl(var(--card-foreground))" opacity="0.5" />

    {/* Right Wing Spots */}
    <circle cx="70" cy="35" r="3" fill="hsl(var(--foreground))" opacity="0.7" />
    <circle cx="80" cy="60" r="4" fill="hsl(var(--foreground))" opacity="0.7" />
    <circle cx="65" cy="75" r="3.5" fill="hsl(var(--foreground))" opacity="0.7" />
    <circle cx="75" cy="40" r="2" fill="hsl(var(--card-foreground))" opacity="0.5" />
    <circle cx="82" cy="70" r="2.5" fill="hsl(var(--card-foreground))" opacity="0.5" />
  </svg>
);

export default ButterflyLogo;
