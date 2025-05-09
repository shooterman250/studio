
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
  // SidebarSeparator, // Not used currently
} from "@/components/ui/sidebar";
import ButterflyLogo from "@/components/common/Logo";
import { 
  Home, 
  LayoutGrid,
  Bed, 
  Armchair, 
  ChefHat,  
  Bath,     
  DollarSign, 
  WashingMachine, 
  Briefcase, 
  Waypoints, 
  Settings,
  type LucideIcon 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useDesignProgress, type DesignStageKey } from "@/contexts/DesignProgressContext";
import { baseNavItemsConfig, footerNavItemsConfig, type BaseNavItemConfig } from "@/config/navigation";

// Icon map to resolve string names to actual Lucide components
const iconMap: Record<string, LucideIcon> = {
  Home,
  DollarSign,
  LayoutGrid,
  ChefHat,
  WashingMachine,
  Armchair,
  Bed,
  Bath,
  Briefcase,
  Waypoints,
  Settings,
};

const AppSidebar = () => {
  const pathname = usePathname();
  const { getStageProgress } = useDesignProgress();

  const mapConfigToNavItems = (config: BaseNavItemConfig[]) => {
    return config.map(configItem => {
      const IconComponent = iconMap[configItem.iconName] || Waypoints; // Fallback icon
      let progress = 0;
      if (configItem.id !== 'dashboard' && configItem.id !== 'settings') {
        progress = getStageProgress(configItem.id as DesignStageKey);
      }
      return {
        ...configItem,
        icon: IconComponent, // Actual icon component
        progress: progress,
      };
    });
  };

  const navItems = mapConfigToNavItems(baseNavItemsConfig);
  const footerItems = mapConfigToNavItems(footerNavItemsConfig);

  return (
    <Sidebar collapsible="icon" side="left" className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <ButterflyLogo width={32} height={32} />
          <h1 className="text-xl font-semibold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
            Interactive Designs
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
                  {item.progress > 0 && item.id !== 'dashboard' && item.id !== 'settings' && ( 
                    <SidebarMenuBadge className="group-data-[collapsible=icon]:hidden">
                      {item.progress}%
                    </SidebarMenuBadge>
                  )}
                </SidebarMenuButton>
              </Link>
               {item.progress > 0 && item.id !== 'dashboard' && item.id !== 'settings' && ( 
                <Progress 
                  value={item.progress} 
                  className="mt-1 h-1 w-[calc(100%-1rem)] mx-auto group-data-[collapsible=icon]:hidden" 
                  aria-label={`${item.label} completion ${item.progress}%`}
                />
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
      </SidebarContent>
      <SidebarFooter className="p-4 mt-auto">
        <SidebarMenu>
          {footerItems.map((item) => (
             <SidebarMenuItem key={item.label}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton 
                  className={cn(pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground")}
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
