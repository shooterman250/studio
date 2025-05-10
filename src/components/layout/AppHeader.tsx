"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Settings, UserCircle2 } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import ButterflyLogo from "@/components/common/Logo";
import { ModeToggle } from "@/components/mode-toggle";

const AppHeader = () => {
  // initialIsMobile will be `false` on the server (due to useIsMobile's default)
  // and the initial resolved value from useIsMobile on the client.
  const { isMobile: initialIsMobileFromContext } = useSidebar();
  
  // State to track if the component has mounted on the client
  const [hasMounted, setHasMounted] = useState(false);
  // State to store the client-determined mobile status
  const [clientDeterminedIsMobile, setClientDeterminedIsMobile] = useState(initialIsMobileFromContext);

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    setHasMounted(true);
    // Update clientDeterminedIsMobile with the value from context,
    // which by now should reflect the actual client environment via useIsMobile hook.
    setClientDeterminedIsMobile(initialIsMobileFromContext);
  }, [initialIsMobileFromContext]);

  // Determine the mobile state to use for rendering:
  // - On the server (hasMounted is false), use initialIsMobileFromContext (which is effectively 'false').
  // - On the client before this effect runs (hasMounted is false), use initialIsMobileFromContext.
  // - On the client after this effect runs (hasMounted is true), use clientDeterminedIsMobile.
  const renderIsMobile = hasMounted ? clientDeterminedIsMobile : initialIsMobileFromContext;

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md md:px-6">
      {renderIsMobile && <SidebarTrigger />}
      {!renderIsMobile && (
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
