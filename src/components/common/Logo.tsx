import type { SVGProps } from 'react';

const ButterflyLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-labelledby="butterflyLogoTitle"
    {...props}
    className={`h-8 w-8 text-primary ${props.className || ''}`}
  >
    <title id="butterflyLogoTitle">Butterfly Logo</title>
    {/* Simplified butterfly shape */}
    <path d="M12 6C7.5 6 4 9.5 4 14c0 2.5 1.5 4.7 3.7 5.6.1.1.3.1.4 0 .2-.1.3-.3.3-.5 0-1-.1-1.4-.4-1.6-1.2-2.6-3-2.6-5 0-3.9 3.1-7 7-7s7 3.1 7 7c0 2-1 3.8-2.6 5-.3.3-.9.4-1.4.4-.1 0-.2.2-.3.5 0 .1.1.1.2.1.2 0 .3 0 .4-.1C18.5 18.7 20 16.5 20 14c0-4.5-3.5-8-8-8z" />
    <path d="M12 10c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm0 4c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" />
    <path d="M9 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    <path d="M15 4c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </svg>
);

export default ButterflyLogo;
