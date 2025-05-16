
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Settings, UserCircle2, Menu, LogOut } from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import ButterflyLogo from "@/components/common/Logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AppHeader = () => {
  const { isMobile: isMobileFromContext } = useSidebar();
  const [hasMounted, setHasMounted] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ title: "Signed Out", description: "You have been successfully signed out." });
      router.push('/'); // Redirect to landing page after sign out
    } catch (error) {
      console.error("Sign out error:", error);
      toast({ title: "Error", description: "Failed to sign out.", variant: "destructive" });
    }
  };

  const renderAuthSection = () => {
    if (!hasMounted) { // Avoid rendering auth-dependent UI until client has mounted
      return (
        <>
          <Button variant="ghost" size="sm" asChild className="text-sm">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button variant="default" size="sm" asChild className="text-sm">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </>
      );
    }
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserCircle2 className="h-5 w-5" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">My Account</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/designer')}> {/* Or a dedicated profile page */}
              <LayoutGrid className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {/* router.push('/settings') */ toast({title: "Coming Soon!", description: "Settings page is under construction."})}}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      return (
        <>
          <Button variant="ghost" size="sm" asChild className="text-sm">
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button variant="default" size="sm" asChild className="text-sm">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </>
      );
    }
  };


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
           {/* Placeholder for Bell and Settings icons if not part of user dropdown */}
           {/* <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button> */}
          {renderAuthSection()}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
