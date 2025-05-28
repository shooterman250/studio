
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
  useSidebar,
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
import { useMemo } from "react";

const iconMap: Record<string, LucideIcon> = {
  Home, DollarSign, LayoutGrid, ChefHat, WashingMachine,
  Armchair, Bed, Bath, Briefcase, Waypoints, Settings,
};

const AppSidebar = () => {
  const pathname = usePathname();
  const { getStageProgress, getUserRoomSelections } = useDesignProgress();
  const { isMobile, setOpenMobile } = useSidebar();
  const userRoomSelections = getUserRoomSelections();

  const handleMenuItemClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const dynamicNavItems = useMemo(() => {
    const alwaysInclude: DesignStageKey[] = ["overall-budget", "overall-style"];
    
    let filteredConfig = baseNavItemsConfig.filter(item => 
      item.id === 'dashboard' || 
      alwaysInclude.includes(item.id as DesignStageKey) ||
      (userRoomSelections.size > 0 && userRoomSelections.has(item.id)) ||
      (userRoomSelections.size === 0 && item.id !== 'dashboard' && item.id !== 'settings') // Show all designable if none selected yet
    );

    // Ensure "Overall Budget" and "Overall Style" are right after "Dashboard" if they exist
    const dashboardItem = filteredConfig.find(item => item.id === 'dashboard');
    const budgetItem = filteredConfig.find(item => item.id === 'overall-budget');
    const styleItem = filteredConfig.find(item => item.id === 'overall-style');

    const otherItems = filteredConfig.filter(item => 
        item.id !== 'dashboard' && 
        item.id !== 'overall-budget' && 
        item.id !== 'overall-style'
    );

    const finalNavOrder: BaseNavItemConfig[] = [];
    if (dashboardItem) finalNavOrder.push(dashboardItem);
    if (budgetItem) finalNavOrder.push(budgetItem);
    if (styleItem) finalNavOrder.push(styleItem);
    
    // Add selected rooms in their original order from baseNavItemsConfig
    baseNavItemsConfig.forEach(baseItem => {
        if (otherItems.some(otherItem => otherItem.id === baseItem.id)) {
            finalNavOrder.push(baseItem);
        }
    });
    
    filteredConfig = finalNavOrder;


    return filteredConfig.map(configItem => {
      const IconComponent = iconMap[configItem.iconName] || Waypoints;
      let progress = 0;
      if (configItem.id !== 'dashboard' && configItem.id !== 'settings') {
        progress = getStageProgress(configItem.id as DesignStageKey);
      }
      return { ...configItem, icon: IconComponent, progress };
    });
  }, [userRoomSelections, getStageProgress]);


  const footerItems = footerNavItemsConfig.map(configItem => ({
    ...configItem,
    icon: iconMap[configItem.iconName] || Settings,
  }));

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
          {dynamicNavItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton 
                  className={cn(pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground")}
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  onClick={handleMenuItemClick}
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
                  onClick={handleMenuItemClick} 
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
