
import type { DesignStageKey } from "@/contexts/DesignProgressContext";

export interface BaseNavItemConfig {
  href: string;
  label: string;
  iconName: string; // Store icon name as string
  id: DesignStageKey | 'dashboard' | 'settings'; 
}

// This list defines the order for "Next Section" navigation
export const baseNavItemsConfig: BaseNavItemConfig[] = [
  { href: "/designer", label: "Dashboard", iconName: "Home", id: "dashboard" },
  { href: "/overall-budget", label: "Overall Budget", iconName: "DollarSign", id: "overall-budget"},
  { href: "/overall-style", label: "Overall Style", iconName: "LayoutGrid", id: "overall-style" }, 
  { href: "/kitchen", label: "Kitchen", iconName: "ChefHat", id: "kitchen" },
  { href: "/utility-laundry-room", label: "Utility/Laundry", iconName: "WashingMachine", id: "utility-laundry-room"},
  { href: "/living-room", label: "Living Room", iconName: "Armchair", id: "living-room" },
  { href: "/bedroom", label: "Bedroom(s)", iconName: "Bed", id: "bedroom" }, 
  { href: "/bathroom", label: "Bathroom(s)", iconName: "Bath", id: "bathroom" },
  { href: "/home-office", label: "Home Office", iconName: "Briefcase", id: "home-office"},
  { href: "/hallways", label: "Hallway(s)", iconName: "Waypoints", id: "hallways"},
];

export const footerNavItemsConfig: BaseNavItemConfig[] = [
    { href: "/settings", label: "Settings", iconName: "Settings", id: "settings" },
];

// Helper to get only the designable room stages
export const designableRoomStages: BaseNavItemConfig[] = baseNavItemsConfig.filter(item => 
  item.id !== 'dashboard' && 
  item.id !== 'settings' && 
  item.id !== 'overall-budget' && 
  item.id !== 'overall-style'
);
