
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, User } from "lucide-react"; 
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import ButterflyLogo from "@/components/common/Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AppHeader = () => {
  const { isMobile: isMobileFromContext } = useSidebar();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md md:px-6">
      {!hasMounted ? (
        <Link 
          href="/designer" 
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          suppressHydrationWarning={true}
        >
          <ButterflyLogo width={24} height={24} />
          <span className="sr-only">Interactive Room Designer</span>
        </Link>
      ) : isMobileFromContext ? (
        <SidebarTrigger />
      ) : (
        <Link 
          href="/designer" 
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          suppressHydrationWarning={true}
        >
          <ButterflyLogo width={24} height={24} />
          <span className="sr-only">Interactive Room Designer</span>
        </Link>
      )}
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/client-info">
                    <User className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Client Profile</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Client Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
