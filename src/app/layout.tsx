
import type { Metadata } from 'next';
// import { Inter } from 'next/font/google'; // Using Inter as a fallback, Geist is defined below
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
// import { SidebarProvider } from '@/components/ui/sidebar';
// import AppSidebar from '@/components/layout/AppSidebar';
// import AppHeader from '@/components/layout/AppHeader';
import { ThemeProvider } from '@/components/theme-provider'; // Assuming ThemeProvider for dark mode toggle

// Using Geist from the original scaffold
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Interactive Room Designer',
  description: 'Design your dream room interactively.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        suppressHydrationWarning // Added to mitigate body-specific hydration issues
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geistSans.variable, 
          geistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light" // Changed from "dark" to "light"
          enableSystem
          disableTransitionOnChange
        >
          {/* SidebarProvider, AppSidebar, and AppHeader are moved to (app)/layout.tsx */}
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

