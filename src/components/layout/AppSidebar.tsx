
"use client";

import Link from "next/link";
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarSeparator,
  SidebarTrigger
} from "@/components/ui/sidebar";
import ButterflyLogo from "@/components/common/Logo";
import { 
  Home, 
  Palette, 
  Sofa, 
  Lamp, 
  Layers3, 
  Star, 
  Sparkles, 
  Settings,
  LayoutGrid,
  CheckCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/designer", label: "Dashboard", icon: Home, progress: 0 }, // Updated href
  { href: "/room-setup", label: "Room Setup", icon: LayoutGrid, progress: 25 },
  { href: "/furniture", label: "Furniture", icon: Sofa, progress: 50 },
  { href: "/decor", label: "Decor & Lighting", icon: Lamp, progress: 75 },
  { href: "/finishes", label: "Colors & Finishes", icon: Palette, progress: 10 },
  { href: "/summary", label: "Summary & Export", icon: CheckCircle, progress: 0 },
];

const AppSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" side="left" className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <ButterflyLogo className="h-8 w-8" />
          <h1 className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            RoomDesigner
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton 
                  className={cn(pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground")}
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  {item.progress > 0 && (
                    <SidebarMenuBadge className="group-data-[collapsible=icon]:hidden">
                      {item.progress}%
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuButton>
              </Link>
               {item.progress > 0 && (
                <Progress 
                  value={item.progress} 
                  className="mt-1 h-1 w-[calc(100%-1rem)] mx-auto group-data-[collapsible=icon]:hidden" 
                  aria-label={`${item.label} completion ${item.progress}%`}
                />
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        <SidebarSeparator className="my-4" />

        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Favorites">
                    <Star className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">Favorites</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Mood Boards">
                    <Sparkles className="h-5 w-5" />
                    <span className="group-data-[collapsible=icon]:hidden">Mood Boards</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>

      </SidebarContent>
      <SidebarFooter className="p-4 mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings className="h-5 w-5" />
              <span className="group-data-[collapsible=icon]:hidden">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
