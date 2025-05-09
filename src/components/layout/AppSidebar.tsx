
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
} from "@/components/ui/sidebar";
import ButterflyLogo from "@/components/common/Logo";
import { 
  Home, 
  Palette, 
  Lamp, 
  Star, 
  Sparkles, 
  Settings,
  LayoutGrid,
  CheckCircle,
  Bed, 
  Armchair, 
  ChefHat,  
  Bath,     
  Layers,   
  PaintRoller,
  DollarSign, // For Overall Budget
  WashingMachine, // For Utility/Laundry Room
  Briefcase, // For Home Office
  Waypoints, // For Hallways
  type LucideIcon 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDesignProgress, type DesignStageKey } from "@/contexts/DesignProgressContext";

interface NavItemConfig {
  href: string;
  label: string;
  icon: LucideIcon;
  id: DesignStageKey | 'dashboard'; 
}

// Updated configuration for navigation items
const navItemsConfig: NavItemConfig[] = [
  { href: "/designer", label: "Dashboard", icon: Home, id: "dashboard" },
  { href: "/overall-budget", label: "Overall Budget", icon: DollarSign, id: "overall-budget"},
  { href: "/overall-style", label: "Overall Style", icon: LayoutGrid, id: "overall-style" }, // Renamed from room-setup
  { href: "/kitchen", label: "Kitchen", icon: ChefHat, id: "kitchen" },
  { href: "/utility-laundry-room", label: "Utility/Laundry", icon: WashingMachine, id: "utility-laundry-room"},
  { href: "/living-room", label: "Living Room", icon: Armchair, id: "living-room" },
  { href: "/bedroom", label: "Bedroom(s)", icon: Bed, id: "bedroom" }, // Renamed from furniture
  { href: "/bathroom", label: "Bathroom(s)", icon: Bath, id: "bathroom" },
  { href: "/home-office", label: "Home Office", icon: Briefcase, id: "home-office"},
  { href: "/hallways", label: "Hallway(s)", icon: Waypoints, id: "hallways"},
  // { href: "/decor", label: "Decor & Lighting", icon: Lamp, id: "decor" }, // Consider if these are now part of room-specific sections
  // { href: "/finishes", label: "Colors & Finishes", icon: Palette, id: "finishes" }, // Consider if these are now part of room-specific sections
  { href: "/summary", label: "Summary & Export", icon: CheckCircle, id: "summary" },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const { getStageProgress } = useDesignProgress();

  const navItems = navItemsConfig.map(configItem => {
    let progress = 0;
    if (configItem.id !== 'dashboard') {
      progress = getStageProgress(configItem.id as DesignStageKey);
    }
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
                  {item.progress > 0 && item.id !== 'dashboard' && ( 
                    <SidebarMenuBadge className="group-data-[collapsible=icon]:hidden">
                      {item.progress}%
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuButton>
              </Link>
               {item.progress > 0 && item.id !== 'dashboard' && ( 
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

    