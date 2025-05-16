
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react"; // Settings might be used by sidebar, Bell removed
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
// Removed: import { Button } from "@/components/ui/button";
import ButterflyLogo from "@/components/common/Logo";
import { ModeToggle } from "@/components/mode-toggle";
// Removed AuthContext, auth, signOut, UserCircle2, LogOut, LayoutGrid, DropdownMenu related imports
// Removed useRouter, useToast as they were only for auth actions here

const AppHeader = () => {
  const { isMobile: isMobileFromContext } = useSidebar();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Removed handleSignOut function
  // Removed renderAuthSection function

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
          {/* Removed renderAuthSection() call */}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
