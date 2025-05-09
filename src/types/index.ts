
import type { LucideIcon } from 'lucide-react';

export interface DesignOption {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  price?: number; // Optional price
  isFavorite?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string; // Changed from LucideIcon to string
  options: DesignOption[];
}

// Base Selection Item
export interface BaseSelectionItem {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  dataAiHint?: string;
}

// Overall Style
export interface OverallStyleOption extends BaseSelectionItem {}
export const overallStyleOptions: OverallStyleOption[] = [
  { id: 'modern', name: 'Modern', imageUrl: 'https://picsum.photos/seed/modernstyle/400/300', description: 'Sleek, clean lines, and simplicity.', dataAiHint: 'modern interior' },
  { id: 'contemporary', name: 'Contemporary', imageUrl: 'https://picsum.photos/seed/contemporarystyle/400/300', description: 'Current, fluid, and ever-evolving.', dataAiHint: 'contemporary interior' },
  { id: 'traditional', name: 'Traditional', imageUrl: 'https://picsum.photos/seed/traditionalstyle/400/300', description: 'Classic, timeless, and ornate.', dataAiHint: 'traditional interior' },
  { id: 'industrial', name: 'Industrial', imageUrl: 'https://picsum.photos/seed/industrialstyle/400/300', description: 'Raw, edgy, with exposed elements.', dataAiHint: 'industrial interior' },
  { id: 'country-farmhouse', name: 'Country/Farmhouse', imageUrl: 'https://picsum.photos/seed/farmhousestyle/400/300', description: 'Warm, rustic, and inviting.', dataAiHint: 'farmhouse interior' },
  { id: 'coastal', name: 'Coastal', imageUrl: 'https://picsum.photos/seed/coastalstyle/400/300', description: 'Light, airy, and beach-inspired.', dataAiHint: 'coastal interior' },
  { id: 'mid-century', name: 'Mid-Century Modern', imageUrl: 'https://picsum.photos/seed/midcenturystyle/400/300', description: 'Retro, organic shapes, and functionality.', dataAiHint: 'midcentury modern interior' },
  { id: 'japandi', name: 'Japandi', imageUrl: 'https://picsum.photos/seed/japandistyle/400/300', description: 'Japanese minimalism meets Scandinavian function.', dataAiHint: 'japandi interior' },
  { id: 'bohemian', name: 'Bohemian', imageUrl: 'https://picsum.photos/seed/bohemianstyle/400/300', description: 'Eclectic, colorful, and free-spirited.', dataAiHint: 'bohemian interior' },
  { id: 'biophilic', name: 'Biophilic', imageUrl: 'https://picsum.photos/seed/biophilicstyle/400/300', description: 'Nature-inspired, with natural elements.', dataAiHint: 'biophilic design interior' },
];

export interface KeyElementOption extends BaseSelectionItem {}
export const keyElementOptions: KeyElementOption[] = [
  { id: 'sustainable-eco-friendly', name: 'Sustainable & Eco-Friendly', imageUrl: 'https://picsum.photos/seed/sustainablehome/400/300', description: 'Focus on environmentally conscious materials and practices.', dataAiHint: 'eco friendly home' },
  { id: 'technology-integrated-smart-home', name: 'Technology Integrated Smart Home', imageUrl: 'https://picsum.photos/seed/smarthometech/400/300', description: 'Incorporates smart devices and automation for convenience and efficiency.', dataAiHint: 'smart home technology' },
  { id: 'accessible-inclusive', name: 'Accessible & Inclusive', imageUrl: 'https://picsum.photos/seed/accessibledesign/400/300', description: 'Designed to be usable by people of all abilities.', dataAiHint: 'accessible interior' },
  { id: 'multi-generational-living', name: 'Multi-Generational Living', imageUrl: 'https://picsum.photos/seed/multigenhome/400/300', description: 'Accommodates multiple generations living together comfortably.', dataAiHint: 'multi generational home' },
];


// Kitchen Options
export interface KitchenCabinetOption extends BaseSelectionItem {}
export const kitchenCabinetOptions: KitchenCabinetOption[] = [
  { id: 'k-cab-shaker', name: 'Shaker', imageUrl: 'https://picsum.photos/seed/shakercabinet/400/300', dataAiHint: 'shaker kitchen cabinet' },
  { id: 'k-cab-raised', name: 'Raised Panel', imageUrl: 'https://picsum.photos/seed/raisedpanelcabinet/400/300', dataAiHint: 'raised panel kitchen' },
  { id: 'k-cab-flat', name: 'Flat Panel', imageUrl: 'https://picsum.photos/seed/flatpanelcabinet/400/300', dataAiHint: 'flat panel kitchen' },
  { id: 'k-cab-arched', name: 'Arched', imageUrl: 'https://picsum.photos/seed/archedcabinet/400/300', dataAiHint: 'arched kitchen cabinet' },
  { id: 'k-cab-glass', name: 'Glass Front', imageUrl: 'https://picsum.photos/seed/glasscabinet/400/300', dataAiHint: 'glass kitchen cabinet' },
  { id: 'k-cab-open', name: 'Open Shelving', imageUrl: 'https://picsum.photos/seed/openshelving/400/300', dataAiHint: 'open kitchen shelving' },
];

export interface KitchenWorktopOption extends BaseSelectionItem {}
export const kitchenWorktopOptions: KitchenWorktopOption[] = [
  { id: 'k-worktop-quartz', name: 'Quartz', imageUrl: 'https://picsum.photos/seed/quartzworktop/400/300', dataAiHint: 'quartz countertop kitchen' },
  { id: 'k-worktop-granite', name: 'Granite', imageUrl: 'https://picsum.photos/seed/graniteworktop/400/300', dataAiHint: 'granite countertop kitchen' },
  { id: 'k-worktop-marble', name: 'Marble', imageUrl: 'https://picsum.photos/seed/marbleworktop/400/300', dataAiHint: 'marble countertop kitchen' },
  { id: 'k-worktop-butcher', name: 'Butcher Block', imageUrl: 'https://picsum.photos/seed/butcherblock/400/300', dataAiHint: 'butcher block countertop' },
  { id: 'k-worktop-concrete', name: 'Concrete', imageUrl: 'https://picsum.photos/seed/concreteworktop/400/300', dataAiHint: 'concrete countertop kitchen' },
];

export interface KitchenApplianceOption extends BaseSelectionItem {}
export const kitchenApplianceOptions: KitchenApplianceOption[] = [
  { id: 'k-app-integrated', name: 'Integrated', imageUrl: 'https://picsum.photos/seed/integratedappliance/400/300', dataAiHint: 'integrated kitchen appliance' },
  { id: 'k-app-freestanding', name: 'Freestanding', imageUrl: 'https://picsum.photos/seed/freestandingappliance/400/300', dataAiHint: 'freestanding kitchen appliance' },
  { id: 'k-app-smart', name: 'Smart Appliances', imageUrl: 'https://picsum.photos/seed/smartappliance/400/300', dataAiHint: 'smart kitchen appliance' },
];

export interface KitchenHardwareFinishOption extends BaseSelectionItem {}
export const kitchenHardwareFinishOptions: KitchenHardwareFinishOption[] = [
    { id: 'k-hardware-chrome', name: 'Chrome/Nickel/Stainless Steel', imageUrl: 'https://picsum.photos/seed/chromehardware/400/300', dataAiHint: 'chrome kitchen hardware' },
    { id: 'k-hardware-gold', name: 'Gold', imageUrl: 'https://picsum.photos/seed/goldhardware/400/300', dataAiHint: 'gold kitchen hardware' },
    { id: 'k-hardware-black', name: 'Black', imageUrl: 'https://picsum.photos/seed/blackhardware/400/300', dataAiHint: 'black kitchen hardware' },
    { id: 'k-hardware-bronze', name: 'Bronze/Brass', imageUrl: 'https://picsum.photos/seed/bronzehardware/400/300', dataAiHint: 'bronze kitchen hardware' },
    { id: 'k-hardware-crystal', name: 'Crystal', imageUrl: 'https://picsum.photos/seed/crystalhardware/400/300', dataAiHint: 'crystal kitchen hardware' },
    { id: 'k-hardware-handleless', name: 'Handle-less/Flat', imageUrl: 'https://picsum.photos/seed/handlelesskitchen/400/300', dataAiHint: 'handleless kitchen' },
    { id: 'k-hardware-multitone', name: 'Multi-Tone/Abstract', imageUrl: 'https://picsum.photos/seed/multitonehardware/400/300', dataAiHint: 'abstract kitchen hardware' },
];

export interface KitchenSinkTypeOption extends BaseSelectionItem {}
export const kitchenSinkTypeOptions: KitchenSinkTypeOption[] = [
    { id: 'k-sink-undermount', name: 'Undermount', imageUrl: 'https://picsum.photos/seed/undermountsink/400/300', dataAiHint: 'undermount kitchen sink' },
    { id: 'k-sink-dropin', name: 'Drop-In (Top-Mount)', imageUrl: 'https://picsum.photos/seed/dropinsink/400/300', dataAiHint: 'drop in kitchen sink' },
    { id: 'k-sink-farmhouse', name: 'Farmhouse', imageUrl: 'https://picsum.photos/seed/farmhousesink/400/300', dataAiHint: 'farmhouse kitchen sink' },
    { id: 'k-sink-workstation', name: 'Workstation', imageUrl: 'https://picsum.photos/seed/workstationsink/400/300', dataAiHint: 'workstation kitchen sink' },
    { id: 'k-sink-double', name: 'Double Bowl', imageUrl: 'https://picsum.photos/seed/doublebowlsink/400/300', dataAiHint: 'double bowl kitchen sink' },
];

export interface KitchenBacksplashOption extends BaseSelectionItem {}
export const kitchenBacksplashOptions: KitchenBacksplashOption[] = [
    { id: 'k-backsplash-tiles', name: 'Tiles', imageUrl: 'https://picsum.photos/seed/tilebacksplash/400/300', dataAiHint: 'kitchen tile backsplash' },
    { id: 'k-backsplash-glass', name: 'Glass', imageUrl: 'https://picsum.photos/seed/glassbacksplash/400/300', dataAiHint: 'glass kitchen backsplash' },
    { id: 'k-backsplash-stainless', name: 'Stainless Steel', imageUrl: 'https://picsum.photos/seed/stainlessbacksplash/400/300', dataAiHint: 'stainless steel backsplash' },
    { id: 'k-backsplash-matching', name: 'Matching Worktop/Countertop', imageUrl: 'https://picsum.photos/seed/matchingbacksplash/400/300', dataAiHint: 'matching countertop backsplash' },
    { id: 'k-backsplash-paint', name: 'Paint', imageUrl: 'https://picsum.photos/seed/paintbacksplash/400/300', dataAiHint: 'painted kitchen backsplash' },
    { id: 'k-backsplash-stone', name: 'Carved Stone', imageUrl: 'https://picsum.photos/seed/stonebacksplash/400/300', dataAiHint: 'carved stone backsplash' },
];

export interface GeneralFlooringOption extends BaseSelectionItem {}
export const generalFlooringOptions: GeneralFlooringOption[] = [
    { id: 'floor-lvinyl', name: 'Luxury Vinyl', imageUrl: 'https://picsum.photos/seed/luxuryvinylfloor/400/300', dataAiHint: 'luxury vinyl flooring' },
    { id: 'floor-nstone', name: 'Natural Stone', imageUrl: 'https://picsum.photos/seed/naturalstonefloor/400/300', dataAiHint: 'natural stone flooring' },
    { id: 'floor-wood', name: 'Wood', imageUrl: 'https://picsum.photos/seed/woodflooring/400/300', dataAiHint: 'wood flooring room' },
    { id: 'floor-marble', name: 'Marble', imageUrl: 'https://picsum.photos/seed/marbleflooring/400/300', dataAiHint: 'marble flooring room' },
    { id: 'floor-bamboo', name: 'Bamboo', imageUrl: 'https://picsum.photos/seed/bambooflooring/400/300', dataAiHint: 'bamboo flooring room' },
    { id: 'floor-cement', name: 'Cement/Concrete', imageUrl: 'https://picsum.photos/seed/cementflooring/400/300', dataAiHint: 'cement concrete floor' },
    { id: 'floor-carpet', name: 'Carpet', imageUrl: 'https://picsum.photos/seed/carpetflooring/400/300', dataAiHint: 'carpet room floor' },
];

export interface GeneralLightingOption extends BaseSelectionItem {}
export const generalLightingOptions: GeneralLightingOption[] = [
    { id: 'light-recessed-flush', name: 'Recessed Flush', imageUrl: 'https://picsum.photos/seed/recessedflushlight/400/300', dataAiHint: 'recessed flush lighting' },
    { id: 'light-recessed-cylinder', name: 'Recessed Cylinder', imageUrl: 'https://picsum.photos/seed/recessedcylinderlight/400/300', dataAiHint: 'recessed cylinder lighting' },
    { id: 'light-chandelier', name: 'Chandelier(s)', imageUrl: 'https://picsum.photos/seed/chandelierlight/400/300', dataAiHint: 'chandelier lighting room' },
    { id: 'light-pendant', name: 'Pendant(s)', imageUrl: 'https://picsum.photos/seed/pendantlight/400/300', dataAiHint: 'pendant lighting room' },
    { id: 'light-wallsconce', name: 'Wall Sconce(s)', imageUrl: 'https://picsum.photos/seed/wallsconcelight/400/300', dataAiHint: 'wall sconce lighting' },
    { id: 'light-niche', name: 'Niche/Picture Lighting', imageUrl: 'https://picsum.photos/seed/nichelighing/400/300', dataAiHint: 'niche picture lighting' },
    { id: 'light-concealed', name: 'Concealed/Cove Lighting', imageUrl: 'https://picsum.photos/seed/concealedlighting/400/300', dataAiHint: 'concealed cove lighting' },
];

// Utility/Laundry Room Options
export interface GeneralWallFinishOption extends BaseSelectionItem {}
export const generalWallFinishOptions: GeneralWallFinishOption[] = [
    { id: 'wall-paint', name: 'Paint', imageUrl: 'https://picsum.photos/seed/wallpaintfinish/400/300', dataAiHint: 'painted wall room' },
    { id: 'wall-wallpaper', name: 'Wallpaper', imageUrl: 'https://picsum.photos/seed/wallpaperfinish/400/300', dataAiHint: 'wallpaper wall room' },
    { id: 'wall-textured', name: 'Textured (e.g., Venetian Plaster)', imageUrl: 'https://picsum.photos/seed/texturedwallfinish/400/300', dataAiHint: 'textured wall finish' },
    { id: 'wall-paneling', name: 'Wood Paneling / Shiplap', imageUrl: 'https://picsum.photos/seed/woodpanelingwall/400/300', dataAiHint: 'wood paneling wall' },
    { id: 'wall-exposed-brick', name: 'Exposed Brick / Stone Veneer', imageUrl: 'https://picsum.photos/seed/exposedbrickwall/400/300', dataAiHint: 'exposed brick wall' },
];

export interface UtilityWasherDryerLayoutOption extends BaseSelectionItem {}
export const utilityWasherDryerLayoutOptions: UtilityWasherDryerLayoutOption[] = [
    { id: 'util-wd-side', name: 'Side-By-Side', imageUrl: 'https://picsum.photos/seed/sidebysidewd/400/300', dataAiHint: 'side by side laundry' },
    { id: 'util-wd-stacked', name: 'Stacked', imageUrl: 'https://picsum.photos/seed/stackedwd/400/300', dataAiHint: 'stacked laundry unit' },
    { id: 'util-wd-compact', name: 'Compact', imageUrl: 'https://picsum.photos/seed/compactwd/400/300', dataAiHint: 'compact laundry unit' },
];

export interface GeneralStorageOption extends BaseSelectionItem {}
export const utilityStorageOptions: GeneralStorageOption[] = [
    { id: 'util-store-builtin', name: 'Built-In Units', imageUrl: 'https://picsum.photos/seed/builtinlaundrystorage/400/300', dataAiHint: 'laundry built in storage' },
    { id: 'util-store-free', name: 'Free-Standing Cabinets', imageUrl: 'https://picsum.photos/seed/freestandinglaundrycabinet/400/300', dataAiHint: 'laundry freestanding cabinet' },
    { id: 'util-store-custom', name: 'Custom Storage Solutions', imageUrl: 'https://picsum.photos/seed/customlaundrystorage/400/300', dataAiHint: 'custom laundry storage' },
];

// Living Room Options
export interface LivingRoomStorageOption extends BaseSelectionItem {}
export const livingRoomStorageOptions: LivingRoomStorageOption[] = [
    { id: 'lr-store-builtin', name: 'Built-In Units (e.g., Media Center)', imageUrl: 'https://picsum.photos/seed/lrbuiltinunits/400/300', dataAiHint: 'living room built in' },
    { id: 'lr-store-alcove', name: 'Alcove Shelving', imageUrl: 'https://picsum.photos/seed/lralkcoveshelving/400/300', dataAiHint: 'alcove shelving living' },
    { id: 'lr-store-windowseat', name: 'Window Seating with Storage', imageUrl: 'https://picsum.photos/seed/lrwindowseatstorage/400/300', dataAiHint: 'window seat storage' },
];

export interface LivingRoomFireplaceOption extends BaseSelectionItem {}
export const livingRoomFireplaceOptions: LivingRoomFireplaceOption[] = [
    { id: 'lr-fire-gas', name: 'Gas Fireplace', imageUrl: 'https://picsum.photos/seed/gasfireplace/400/300', dataAiHint: 'gas fireplace living' },
    { id: 'lr-fire-electric', name: 'Electric Fireplace', imageUrl: 'https://picsum.photos/seed/electricfireplace/400/300', dataAiHint: 'electric fireplace living' },
    { id: 'lr-fire-wood', name: 'Wood Burning Fireplace', imageUrl: 'https://picsum.photos/seed/woodfireplace/400/300', dataAiHint: 'wood burning fireplace' },
];

// Bedroom Options
export interface BedroomWardrobeOption extends BaseSelectionItem {}
export const bedroomWardrobeOptions: BedroomWardrobeOption[] = [
  { id: 'bed-wardrobe-walkin', name: 'Walk-In Closet', imageUrl: 'https://picsum.photos/seed/walkincloset/400/300', dataAiHint: 'walk in closet' },
  { id: 'bed-wardrobe-standard', name: 'One/Two Standard Doors', imageUrl: 'https://picsum.photos/seed/standardclosetdoors/400/300', dataAiHint: 'standard closet doors' },
  { id: 'bed-wardrobe-bifold', name: 'Bifold Doors', imageUrl: 'https://picsum.photos/seed/bifoldclosetdoors/400/300', dataAiHint: 'bifold closet doors' },
  { id: 'bed-wardrobe-custom', name: 'Custom Built-In', imageUrl: 'https://picsum.photos/seed/custombuiltincloset/400/300', dataAiHint: 'custom built in closet' },
];

// Bathroom Options (Master)
export interface BathroomStyleOption extends BaseSelectionItem {} // Same as OverallStyleOption, can reuse or make specific
export const bathroomStyleOptions = overallStyleOptions; // Reuse for consistency

export interface BathroomMasterBathTubOption extends BaseSelectionItem {}
export const bathroomMasterBathTubOptions: BathroomMasterBathTubOption[] = [
    { id: 'bm-tub-alcove', name: 'Alcove Tub', imageUrl: 'https://picsum.photos/seed/alcovetub/400/300', dataAiHint: 'alcove bathtub' },
    { id: 'bm-tub-dropin', name: 'Drop-In Tub', imageUrl: 'https://picsum.photos/seed/dropintub/400/300', dataAiHint: 'drop in bathtub' },
    { id: 'bm-tub-freestanding', name: 'Freestanding Tub', imageUrl: 'https://picsum.photos/seed/freestandingtub/400/300', dataAiHint: 'freestanding bathtub luxury' },
    { id: 'bm-tub-clawfoot', name: 'Claw Foot Tub', imageUrl: 'https://picsum.photos/seed/clawfoottub/400/300', dataAiHint: 'clawfoot bathtub vintage' },
    { id: 'bm-tub-corner', name: 'Corner Tub', imageUrl: 'https://picsum.photos/seed/cornertub/400/300', dataAiHint: 'corner bathtub' },
    { id: 'bm-tub-whirlpool', name: 'Whirlpool/Jacuzzi Tub', imageUrl: 'https://picsum.photos/seed/jacuzzitub/400/300', dataAiHint: 'jacuzzi whirlpool tub' },
    { id: 'bm-tub-walkin', name: 'Walk-In Tub', imageUrl: 'https://picsum.photos/seed/walkintub/400/300', dataAiHint: 'walk in bathtub accessible' },
    { id: 'bm-tub-combo', name: 'Tub/Shower Combo', imageUrl: 'https://picsum.photos/seed/tubshowercombo/400/300', dataAiHint: 'tub shower combination' },
];

export interface BathroomMasterShowerOption extends BaseSelectionItem {}
export const bathroomMasterShowerOptions: BathroomMasterShowerOption[] = [
    { id: 'bm-shower-walkin', name: 'Walk-In Shower', imageUrl: 'https://picsum.photos/seed/walkinshowerdesign/400/300', dataAiHint: 'walk in shower bathroom' },
    { id: 'bm-shower-enclosed', name: 'Enclosed Shower', imageUrl: 'https://picsum.photos/seed/enclosedshower/400/300', dataAiHint: 'enclosed shower stall' },
    { id: 'bm-shower-combo', name: 'Shower/Tub Combo', imageUrl: 'https://picsum.photos/seed/showertubcombo/400/300', dataAiHint: 'shower tub combination' }, // Repeated for clarity if selected here
];

export interface BathroomMasterSinkOption extends BaseSelectionItem { type?: 'single' | 'double'; }
export const bathroomMasterSinkOptions: BathroomMasterSinkOption[] = [
    { id: 'bm-sink-undermount-s', name: 'Undermount Sink (Single)', imageUrl: 'https://picsum.photos/seed/undermountsinksingle/400/300', type: 'single', dataAiHint: 'undermount bathroom sink' },
    { id: 'bm-sink-undermount-d', name: 'Undermount Sink (Double)', imageUrl: 'https://picsum.photos/seed/undermountsinkdouble/400/300', type: 'double', dataAiHint: 'double undermount sink' },
    { id: 'bm-sink-dropin-s', name: 'Drop-In Sink (Single)', imageUrl: 'https://picsum.photos/seed/dropinsinksingle/400/300', type: 'single', dataAiHint: 'drop in bathroom sink' },
    { id: 'bm-sink-dropin-d', name: 'Drop-In Sink (Double)', imageUrl: 'https://picsum.photos/seed/dropinsinkdouble/400/300', type: 'double', dataAiHint: 'double drop in sink' },
    { id: 'bm-sink-vessel-s', name: 'Vessel Sink (Single)', imageUrl: 'https://picsum.photos/seed/vesselsinksingle/400/300', type: 'single', dataAiHint: 'vessel bathroom sink' },
    { id: 'bm-sink-vessel-d', name: 'Vessel Sink (Double)', imageUrl: 'https://picsum.photos/seed/vesselsinkdouble/400/300', type: 'double', dataAiHint: 'double vessel sink' },
    { id: 'bm-sink-wallmount-s', name: 'Wall Mount Sink (Single)', imageUrl: 'https://picsum.photos/seed/wallmountsinksingle/400/300', type: 'single', dataAiHint: 'wall mount bathroom sink' },
    { id: 'bm-sink-wallmount-d', name: 'Wall Mount Sink (Double)', imageUrl: 'https://picsum.photos/seed/wallmountsinkdouble/400/300', type: 'double', dataAiHint: 'double wall mount sink' },
    { id: 'bm-sink-pedestal-s', name: 'Pedestal Sink (Single)', imageUrl: 'https://picsum.photos/seed/pedestalsinksingle/400/300', type: 'single', dataAiHint: 'pedestal bathroom sink' },
    { id: 'bm-sink-pedestal-d', name: 'Pedestal Sink (Double)', imageUrl: 'https://picsum.photos/seed/pedestalsinkdouble/400/300', type: 'double', dataAiHint: 'double pedestal sink' },
    { id: 'bm-sink-console-s', name: 'Console Sink (Single)', imageUrl: 'https://picsum.photos/seed/consolesinksingle/400/300', type: 'single', dataAiHint: 'console bathroom sink' },
    { id: 'bm-sink-console-d', name: 'Console Sink (Double)', imageUrl: 'https://picsum.photos/seed/consolesinkdouble/400/300', type: 'double', dataAiHint: 'double console sink' },
];

export interface BathroomToiletOption extends BaseSelectionItem {}
export const bathroomToiletOptions: BathroomToiletOption[] = [
    { id: 'toilet-onepiece', name: 'One Piece Toilet', imageUrl: 'https://picsum.photos/seed/onepiecetoilet/400/300', dataAiHint: 'one piece toilet' },
    { id: 'toilet-twopiece', name: 'Two Piece Toilet', imageUrl: 'https://picsum.photos/seed/twopiecetoilet/400/300', dataAiHint: 'two piece toilet' },
    { id: 'toilet-wallhung', name: 'Wall Hung Toilet', imageUrl: 'https://picsum.photos/seed/wallhungtoilet/400/300', dataAiHint: 'wall hung toilet' },
    { id: 'toilet-touchless', name: 'Touchless Toilet', imageUrl: 'https://picsum.photos/seed/touchlesstoilet/400/300', dataAiHint: 'touchless smart toilet' },
    { id: 'toilet-bidet', name: 'Toilet With Bidet', imageUrl: 'https://picsum.photos/seed/bidetoilet/400/300', dataAiHint: 'toilet bidet combo' },
];
export const bathroomHardwareFinishOptions = kitchenHardwareFinishOptions; // Reuse
export interface BathroomStorageOption extends BaseSelectionItem {}
export const bathroomStorageOptions: BathroomStorageOption[] = [
    { id: 'bstore-builtin', name: 'Built-In Shelving/Cabinets', imageUrl: 'https://picsum.photos/seed/bathbuiltinshelving/400/300', dataAiHint: 'bathroom built in shelving' },
    { id: 'bstore-medicine', name: 'Medicine Cabinet/Unit', imageUrl: 'https://picsum.photos/seed/bathmedicinecabinet/400/300', dataAiHint: 'bathroom medicine cabinet' },
    { id: 'bstore-niches', name: 'Niches', imageUrl: 'https://picsum.photos/seed/bathniches/400/300', dataAiHint: 'bathroom shower niche' },
    { id: 'bstore-undersink', name: 'Under-Sink Storage', imageUrl: 'https://picsum.photos/seed/bathundersinkstorage/400/300', dataAiHint: 'under sink bathroom storage' },
    { id: 'bstore-customvanity', name: 'Custom Vanity', imageUrl: 'https://picsum.photos/seed/bathcustomvanity/400/300', dataAiHint: 'custom bathroom vanity' },
];

// Bathroom Options (Half-Bath) - Sinks, Toilets, Hardware, Storage, Lighting can reuse master options or be specific
export const bathroomHalfSinkOptions: BathroomMasterSinkOption[] = bathroomMasterSinkOptions.filter(s => s.type === 'single' || !s.type); // Typically single sinks
export const bathroomHalfToiletOptions = bathroomToiletOptions;
export const bathroomHalfHardwareFinishOptions = bathroomHardwareFinishOptions;
export const bathroomHalfStorageOptions = bathroomStorageOptions; // Or a subset
export const bathroomHalfLightingOptions = generalLightingOptions;


// Home Office Options
export interface HomeOfficeStorageOption extends BaseSelectionItem {}
export const homeOfficeStorageOptions: HomeOfficeStorageOption[] = [
    { id: 'ho-store-builtin', name: 'Built-In Units / Bookcase', imageUrl: 'https://picsum.photos/seed/hobookcase/400/300', dataAiHint: 'home office bookcase' },
    { id: 'ho-store-free', name: 'Free-Standing Cabinets', imageUrl: 'https://picsum.photos/seed/hofreestandingcabinet/400/300', dataAiHint: 'home office cabinet' },
    { id: 'ho-store-custom', name: 'Custom Storage Solutions', imageUrl: 'https://picsum.photos/seed/hocustomstorage/400/300', dataAiHint: 'custom office storage' },
];

// Hallway Options
export interface HallwayStorageOption extends BaseSelectionItem {}
export const hallwayStorageOptions: HallwayStorageOption[] = [
    { id: 'hall-store-linen', name: 'Linen Closet/Drying Cupboard', imageUrl: 'https://picsum.photos/seed/linencloset/400/300', dataAiHint: 'hallway linen closet' },
    { id: 'hall-store-shelving', name: 'Shelving', imageUrl: 'https://picsum.photos/seed/hallwayshelving/400/300', dataAiHint: 'hallway shelving unit' },
];


// --- LEGACY / COMBINED (To be phased out or mapped if still used directly) ---
export const designStyles: OverallStyleOption[] = overallStyleOptions; // Alias for compatibility

export const bedroomOptionsList: BedroomWardrobeOption[] = bedroomWardrobeOptions; // Alias for compatibility

export interface LivingRoomOption extends BaseSelectionItem {}
export const livingRoomOptionsList: LivingRoomOption[] = [ // This might be too generic now
  {
    id: "lr-sectional-sofa",
    name: "Sectional Sofa",
    imageUrl: "https://picsum.photos/seed/sectional/400/300",
    description: "Large, multi-piece sofa ideal for spacious living rooms.",
    dataAiHint: "sectional sofa"
  },
  {
    id: "lr-loveseat",
    name: "Loveseat",
    imageUrl: "https://picsum.photos/seed/loveseat/400/300",
    description: "A cozy two-seater sofa, perfect for smaller spaces.",
    dataAiHint: "loveseat sofa"
  },
];

export interface KitchenOption extends BaseSelectionItem {}
export const kitchenOptionsList: KitchenOption[] = [ // This might be too generic now
   {
    id: "k-shaker-cabinets",
    name: "Shaker Cabinets",
    imageUrl: "https://picsum.photos/seed/shakercabinets/400/300",
    description: "Classic and versatile cabinet style with a simple, clean look.",
    dataAiHint: "shaker kitchen cabinets"
  },
  {
    id: "k-kitchen-island",
    name: "Kitchen Island",
    imageUrl: "https://picsum.photos/seed/kitchenisland/400/300",
    description: "A central workspace, storage, and potential seating area.",
    dataAiHint: "kitchen island design"
  },
];

export interface BathroomOption extends BaseSelectionItem {}
export const bathroomOptionsList: BathroomOption[] = [ // This might be too generic now
  {
    id: "b-single-vanity",
    name: "Single Vanity",
    imageUrl: "https://picsum.photos/seed/singlevanity/400/300",
    description: "A compact vanity with one sink, suitable for smaller bathrooms.",
    dataAiHint: "single bathroom vanity"
  },
  {
    id: "b-walk-in-shower",
    name: "Walk-in Shower",
    imageUrl: "https://picsum.photos/seed/walkinshower/400/300",
    description: "A spacious, doorless shower area, often with glass panels.",
    dataAiHint: "walkin shower design"
  },
];

export const flooringOptionsList: GeneralFlooringOption[] = generalFlooringOptions; // Alias for compatibility
export const wallFinishOptionsList: GeneralWallFinishOption[] = generalWallFinishOptions; // Alias for compatibility

export const roomTypes = [
  { id: 'living-room', name: 'Living Room' },
  { id: 'bedroom', name: 'Bedroom' },
  { id: 'kitchen', name: 'Kitchen' },
  { id: 'dining-room', name: 'Dining Room' },
  { id: 'office', name: 'Office' },
  { id: 'bathroom', name: 'Bathroom' },
  { id: 'utility-laundry-room', name: 'Utility/Laundry Room'},
  { id: 'home-office', name: 'Home Office'},
  { id: 'hallway', name: 'Hallway'},
];

    