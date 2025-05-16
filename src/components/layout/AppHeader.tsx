
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Settings, UserCircle2, Menu } from "lucide-react"; // Added Menu for SidebarTrigger if not already there
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import ButterflyLogo from "@/components/common/Logo";
import { ModeToggle } from "@/components/mode-toggle";

const AppHeader = () => {
  // isMobileFromContext will be `false` on the server and initial client render (due to useIsMobile's default)
  const { isMobile: isMobileFromContext } = useSidebar();
  
  // State to track if the component has mounted on the client
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    setHasMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md md:px-6">
      {!hasMounted ? (
        // On the server, and initial client render before useEffect runs,
        // isMobileFromContext is false. So, render the desktop Link.
        // This ensures the server and initial client HTML match.
        <Link href="/designer" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <ButterflyLogo width={24} height={24} />
          <span className="sr-only">Interactive Room Designer</span>
        </Link>
      ) : isMobileFromContext ? (
        // After mounting, if it's actually mobile, render the trigger.
        <SidebarTrigger />
      ) : (
        // After mounting, if it's not mobile, render the desktop Link.
        <Link href="/designer" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <ButterflyLogo width={24} height={24} />
          <span className="sr-only">Interactive Room Designer</span>
        </Link>
      )}
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserCircle2 className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
