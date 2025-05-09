
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
  // SidebarTrigger // Not used here, but available from sidebar component
} from "@/components/ui/sidebar";
import ButterflyLogo from "@/components/common/Logo";
import { 
  Home, 
  Palette, 
  Sofa, 
  Lamp, 
  // Layers3, // Not used
  Star, 
  Sparkles, 
  Settings,
  LayoutGrid,
  CheckCircle,
  Bed, // Added Bed icon as an option
  type LucideIcon // Import LucideIcon type
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDesignProgress, type DesignStageKey } from "@/contexts/DesignProgressContext";

interface NavItemConfig {
  href: string;
  label: string;
  icon: LucideIcon;
  id: DesignStageKey | 'dashboard'; // 'dashboard' is a special case for items not tracked by DesignProgressContext in the same way
}

// Base configuration for navigation items
const navItemsConfig: NavItemConfig[] = [
  { href: "/designer", label: "Dashboard", icon: Home, id: "dashboard" },
  { href: "/room-setup", label: "Overall Style", icon: LayoutGrid, id: "room-setup" },
  { href: "/bedroom", label: "Bedroom", icon: Bed, id: "furniture" }, // Changed label, href, and icon
  { href: "/decor", label: "Decor & Lighting", icon: Lamp, id: "decor" },
  { href: "/finishes", label: "Colors & Finishes", icon: Palette, id: "finishes" },
  { href: "/summary", label: "Summary & Export", icon: CheckCircle, id: "summary" },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const { getStageProgress } = useDesignProgress();

  // Dynamically create navItems with progress from context
  const navItems = navItemsConfig.map(configItem => {
    let progress = 0;
    // 'dashboard' item might have a fixed progress or no progress bar.
    // Other items fetch their progress from the context.
    if (configItem.id !== 'dashboard') {
      progress = getStageProgress(configItem.id as DesignStageKey);
    } else {
      // Example: Dashboard could represent overall project completion or just stay 0
      // For now, let's assume dashboard itself doesn't show a progress bar from this system this way
      // or it could be a summary of all progresses, handled differently.
      // Based on original code, it had progress: 0.
    }
    // Specific logic for initial progress values if needed, though context handles it now.
    // For example, furniture had 50, decor 75, finishes 10 by default in original code.
    // These will now start at 0 from context and update as stages are completed.
    // If a specific item *always* starts with some base progress, that could be handled in initialProgress in context.
    
    // The original "Overall Style" default of 25% is now handled by updating context on save.
    // Other items like "Furniture" (50%), "Decor" (75%), "Finishes" (10%) will also start at 0
    // and need their respective pages to update the context.

    return {
      ...configItem,
      progress: progress,
    };
  });

  return (
    <Sidebar collapsible="icon" side="left" className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <ButterflyLogo width={32} height={32} />
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
                  {item.progress > 0 && item.id !== 'dashboard' && ( // Don't show badge for dashboard or if progress is 0
                    <SidebarMenuBadge className="group-data-[collapsible=icon]:hidden">
                      {item.progress}%
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuButton>
              </Link>
               {item.progress > 0 && item.id !== 'dashboard' && ( // Don't show progress bar for dashboard or if progress is 0
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
