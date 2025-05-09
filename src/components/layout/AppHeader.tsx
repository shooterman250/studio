"use client";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Settings, UserCircle2 } from "lucide-react";
import ButterflyLogo from "@/components/common/Logo";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

const AppHeader = () => {
  const { isMobile } = useSidebar();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md md:px-6">
      {isMobile && <SidebarTrigger />}
      {!isMobile && (
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <ButterflyLogo className="h-6 w-6" />
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
