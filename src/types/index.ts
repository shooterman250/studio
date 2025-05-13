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
  { id: 'biophilic', name: 'Biophilic', imageUrl: `https://media.discordapp.net/attachments/1370568040256901200/1370575695373144224/Overall_Style_biophilic.png?ex=681fff95&is=681eae15&hm=6f4dd846c8ae50357502831443826168a87d8f6019ce6aa736e95b64031c209b&=&format=webp&quality=lossless&width=700&height=700`, description: 'Nature-inspired, with natural elements.', dataAiHint: 'biophilic design interior' },
  { id: 'bohemian', name: 'Bohemian', imageUrl: `https://media.discordapp.net/attachments/1370568040256901200/1370577130659909744/Overall_Style__Modern_1.png?ex=682000ec&is=681eaf6c&hm=361ae221f9d5e4cb6304e6a83e428170a90143b626d3e7c634ec8acd0e0df2bd&=&format=webp&quality=lossless&width=1502&height=1502`, description: 'Eclectic, colorful, and free-spirited.', dataAiHint: 'bohemian interior' },
  { id: 'coastal', name: 'Coastal', imageUrl: `https://media.discordapp.net/attachments/1370568040256901200/1370577942286962748/Overall_Style__Modern_2.png?ex=682001ad&is=681eb02d&hm=fde310c7c8f3b0fede4adb9135dccad019330a4675713158407b7f0ec66399e3&=&format=webp&quality=lossless&width=1502&height=1502`, description: 'Light, airy, and beach-inspired.', dataAiHint: 'coastal interior' },
  { id: 'contemporary', name: 'Contemporary', imageUrl: `https://media.discordapp.net/attachments/1370568040256901200/1370578507385536512/Overall_Style__Modern_3.png?ex=68200234&is=681eb0b4&hm=b2da99066e67481579998805cee745d8dec60c6f31368b90bb3db8d8f5978445&=&format=webp&quality=lossless&width=1502&height=1502`, description: 'Current, fluid, and ever-evolving.', dataAiHint: 'contemporary interior' },
  { id: 'country-farmhouse', name: 'Country/Farmhouse', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1370579139647635568/Overall_Style__Modern_4.png?ex=682002cb&is=681eb14b&hm=3bfa965e4187d7976a06a8af73990201d9377b47595de89416f186005cea78fe&=&format=webp&quality=lossless&width=1502&height=1502', description: 'Warm, rustic, and inviting.', dataAiHint: 'farmhouse interior' },
  { id: 'industrial', name: 'Industrial', imageUrl: `https://media.discordapp.net/attachments/1370568040256901200/1370579979011887294/Overall_Style__Modern_5.png?ex=68200393&is=681eb213&hm=a18a1ddcc056c147ca0aea9ef95972d4af2bda9673386b7dbdccf9b71f590892&=&format=webp&quality=lossless&width=1502&height=1502`, description: 'Raw, edgy, with exposed elements.', dataAiHint: 'industrial interior' },
  { id: 'japandi', name: 'Japandi', imageUrl: `https://media.discordapp.net/attachments/1370568040256901200/1370580542021697597/Overall_Style__Modern_6.png?ex=68200419&is=681eb299&hm=aa4d7defe15b2d42ec30eda99f6fc73d51029b5b48cfceb0d9756ba410f6ebbf&=&format=webp&quality=lossless&width=1502&height=1502`, description: 'Japanese minimalism meets Scandinavian function.', dataAiHint: 'japandi interior' },
  { id: 'mid-century', name: 'Mid-Century Modern', imageUrl: `https://media.discordapp.net/attachments/1370568040256901200/1370581583479967774/Overall_Style__Modern_7.png?ex=68200511&is=681eb391&hm=5db0d1db0f4d2e045829ab67089b4fbb7e2a9048d586878cb1130e8395e1aa84&=&format=webp&quality=lossless&width=1502&height=1502`, description: 'Retro, organic shapes, and functionality.', dataAiHint: 'midcentury modern interior' },
  { id: 'modern', name: 'Modern', imageUrl: `https://media.discordapp.net/attachments/1370568040256901200/1370571094762721280/Overall_Style__Modern.png?ex=681ffb4c&is=681ea9cc&hm=d81265ac83733784dd6d0fbf8136f1d512c4222cdbe20de4167c4b9a09eb6312&=&format=webp&quality=lossless&width=1502&height=1502`, description: 'Sleek, clean lines, and simplicity.', dataAiHint: 'modern interior' },
  { id: 'traditional', name: 'Traditional', imageUrl: `https://media.discordapp.net/attachments/1370568040256901200/1370582056014319727/Overall_Style__Modern_8.png?ex=68200582&is=681eb402&hm=b5cdc7992a1939df4e2e1a17193309263d5138b2edb4e399e5e79c6f51304e72&=&format=webp&quality=lossless&width=1502&height=1502`, description: 'Classic, timeless, and ornate.', dataAiHint: 'traditional interior' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KeyElementOption extends BaseSelectionItem {}
export const keyElementOptions: KeyElementOption[] = [
  { id: 'accessible-inclusive', name: 'Accessible & Inclusive', imageUrl: 'https://picsum.photos/seed/accessibledesign/400/300', description: 'Designed to be usable by people of all abilities.', dataAiHint: 'accessible interior' },
  { id: 'multi-generational-living', name: 'Multi-Generational Living', imageUrl: 'https://picsum.photos/seed/multigenhome/400/300', description: 'Accommodates multiple generations living together comfortably.', dataAiHint: 'multi generational home' },
  { id: 'sustainable-eco-friendly', name: 'Sustainable & Eco-Friendly', imageUrl: 'https://picsum.photos/seed/sustainablehome/400/300', description: 'Focus on environmentally conscious materials and practices.', dataAiHint: 'eco friendly home' },
  { id: 'technology-integrated-smart-home', name: 'Technology Integrated Smart Home', imageUrl: 'https://picsum.photos/seed/smarthometech/400/300', description: 'Incorporates smart devices and automation for convenience and efficiency.', dataAiHint: 'smart home technology' },
].sort((a, b) => a.name.localeCompare(b.name));


// Kitchen Options
export interface KitchenCabinetOption extends BaseSelectionItem {}
export const kitchenCabinetOptions: KitchenCabinetOption[] = [
  { id: 'k-cab-arched', name: 'Arched', imageUrl: 'https://picsum.photos/seed/archedcabinet/400/300', dataAiHint: 'arched kitchen cabinet' },
  { id: 'k-cab-flat', name: 'Flat Panel', imageUrl: 'https://picsum.photos/seed/flatpanelcabinet/400/300', dataAiHint: 'flat panel kitchen' },
  { id: 'k-cab-glass', name: 'Glass Front', imageUrl: 'https://picsum.photos/seed/glasscabinet/400/300', dataAiHint: 'glass kitchen cabinet' },
  { id: 'k-cab-open', name: 'Open Shelving', imageUrl: 'https://picsum.photos/seed/openshelving/400/300', dataAiHint: 'open kitchen shelving' },
  { id: 'k-cab-raised', name: 'Raised Panel', imageUrl: 'https://picsum.photos/seed/raisedpanelcabinet/400/300', dataAiHint: 'raised panel kitchen' },
  { id: 'k-cab-shaker', name: 'Shaker', imageUrl: 'https://picsum.photos/seed/shakercabinet/400/300', dataAiHint: 'shaker kitchen cabinet' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenWorktopOption extends BaseSelectionItem {}
export const kitchenWorktopOptions: KitchenWorktopOption[] = [
  { id: 'k-worktop-butcher', name: 'Butcher Block', imageUrl: 'https://picsum.photos/seed/butcherblock/400/300', dataAiHint: 'butcher block countertop' },
  { id: 'k-worktop-concrete', name: 'Concrete', imageUrl: 'https://picsum.photos/seed/concreteworktop/400/300', dataAiHint: 'concrete countertop kitchen' },
  { id: 'k-worktop-granite', name: 'Granite', imageUrl: 'https://picsum.photos/seed/graniteworktop/400/300', dataAiHint: 'granite countertop kitchen' },
  { id: 'k-worktop-marble', name: 'Marble', imageUrl: 'https://picsum.photos/seed/marbleworktop/400/300', dataAiHint: 'marble countertop kitchen' },
  { id: 'k-worktop-quartz', name: 'Quartz', imageUrl: 'https://picsum.photos/seed/quartzworktop/400/300', dataAiHint: 'quartz countertop kitchen' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenApplianceOption extends BaseSelectionItem {}
export const kitchenApplianceOptions: KitchenApplianceOption[] = [
  { id: 'k-app-freestanding', name: 'Freestanding', imageUrl: 'https://picsum.photos/seed/freestandingappliance/400/300', dataAiHint: 'freestanding kitchen appliance' },
  { id: 'k-app-integrated', name: 'Integrated', imageUrl: 'https://picsum.photos/seed/integratedappliance/400/300', dataAiHint: 'integrated kitchen appliance' },
  { id: 'k-app-smart', name: 'Smart Appliances', imageUrl: 'https://picsum.photos/seed/smartappliance/400/300', dataAiHint: 'smart kitchen appliance' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenHardwareFinishOption extends BaseSelectionItem {}
export const kitchenHardwareFinishOptions: KitchenHardwareFinishOption[] = [
    { id: 'k-hardware-black', name: 'Black', imageUrl: 'https://picsum.photos/seed/blackhardware/400/300', dataAiHint: 'black kitchen hardware' },
    { id: 'k-hardware-bronze', name: 'Bronze/Brass', imageUrl: 'https://picsum.photos/seed/bronzehardware/400/300', dataAiHint: 'bronze kitchen hardware' },
    { id: 'k-hardware-chrome', name: 'Chrome/Nickel/Stainless Steel', imageUrl: 'https://picsum.photos/seed/chromehardware/400/300', dataAiHint: 'chrome kitchen hardware' },
    { id: 'k-hardware-crystal', name: 'Crystal', imageUrl: 'https://picsum.photos/seed/crystalhardware/400/300', dataAiHint: 'crystal kitchen hardware' },
    { id: 'k-hardware-gold', name: 'Gold', imageUrl: 'https://picsum.photos/seed/goldhardware/400/300', dataAiHint: 'gold kitchen hardware' },
    { id: 'k-hardware-handleless', name: 'Handle-less/Flat', imageUrl: 'https://picsum.photos/seed/handlelesskitchen/400/300', dataAiHint: 'handleless kitchen' },
    { id: 'k-hardware-multitone', name: 'Multi-Tone/Abstract', imageUrl: 'https://picsum.photos/seed/multitonehardware/400/300', dataAiHint: 'abstract kitchen hardware' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenSinkTypeOption extends BaseSelectionItem {}
export const kitchenSinkTypeOptions: KitchenSinkTypeOption[] = [
    { id: 'k-sink-double', name: 'Double Bowl', imageUrl: 'https://picsum.photos/seed/doublebowlsink/400/300', dataAiHint: 'double bowl kitchen sink' },
    { id: 'k-sink-dropin', name: 'Drop-In (Top-Mount)', imageUrl: 'https://picsum.photos/seed/dropinsink/400/300', dataAiHint: 'drop in kitchen sink' },
    { id: 'k-sink-farmhouse', name: 'Farmhouse', imageUrl: 'https://picsum.photos/seed/farmhousesink/400/300', dataAiHint: 'farmhouse kitchen sink' },
    { id: 'k-sink-undermount', name: 'Undermount', imageUrl: 'https://picsum.photos/seed/undermountsink/400/300', dataAiHint: 'undermount kitchen sink' },
    { id: 'k-sink-workstation', name: 'Workstation', imageUrl: 'https://picsum.photos/seed/workstationsink/400/300', dataAiHint: 'workstation kitchen sink' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenBacksplashOption extends BaseSelectionItem {}
export const kitchenBacksplashOptions: KitchenBacksplashOption[] = [
    { id: 'k-backsplash-stone', name: 'Carved Stone', imageUrl: 'https://picsum.photos/seed/stonebacksplash/400/300', dataAiHint: 'carved stone backsplash' },
    { id: 'k-backsplash-glass', name: 'Glass', imageUrl: 'https://picsum.photos/seed/glassbacksplash/400/300', dataAiHint: 'glass kitchen backsplash' },
    { id: 'k-backsplash-matching', name: 'Matching Worktop/Countertop', imageUrl: 'https://picsum.photos/seed/matchingbacksplash/400/300', dataAiHint: 'matching countertop backsplash' },
    { id: 'k-backsplash-paint', name: 'Paint', imageUrl: 'https://picsum.photos/seed/paintbacksplash/400/300', dataAiHint: 'painted kitchen backsplash' },
    { id: 'k-backsplash-stainless', name: 'Stainless Steel', imageUrl: 'https://picsum.photos/seed/stainlessbacksplash/400/300', dataAiHint: 'stainless steel backsplash' },
    { id: 'k-backsplash-tiles', name: 'Tiles', imageUrl: 'https://picsum.photos/seed/tilebacksplash/400/300', dataAiHint: 'kitchen tile backsplash' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface GeneralFlooringOption extends BaseSelectionItem {}
export const generalFlooringOptions: GeneralFlooringOption[] = [
    { id: 'floor-bamboo', name: 'Bamboo', imageUrl: 'https://picsum.photos/seed/bambooflooring/400/300', dataAiHint: 'bamboo flooring room' },
    { id: 'floor-carpet', name: 'Carpet', imageUrl: 'https://picsum.photos/seed/carpetflooring/400/300', dataAiHint: 'carpet room floor' },
    { id: 'floor-cement', name: 'Cement/Concrete', imageUrl: 'https://picsum.photos/seed/cementflooring/400/300', dataAiHint: 'cement concrete floor' },
    { id: 'floor-lvinyl', name: 'Luxury Vinyl', imageUrl: 'https://picsum.photos/seed/luxuryvinylfloor/400/300', dataAiHint: 'luxury vinyl flooring' },
    { id: 'floor-marble', name: 'Marble', imageUrl: 'https://picsum.photos/seed/marbleflooring/400/300', dataAiHint: 'marble flooring room' },
    { id: 'floor-nstone', name: 'Natural Stone', imageUrl: 'https://picsum.photos/seed/naturalstonefloor/400/300', dataAiHint: 'natural stone flooring' },
    { id: 'floor-wood', name: 'Wood', imageUrl: 'https://picsum.photos/seed/woodflooring/400/300', dataAiHint: 'wood flooring room' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface GeneralLightingOption extends BaseSelectionItem {}
export const generalLightingOptions: GeneralLightingOption[] = [
    { id: 'light-chandelier', name: 'Chandelier(s)', imageUrl: 'https://picsum.photos/seed/chandelierlight/400/300', dataAiHint: 'chandelier lighting room' },
    { id: 'light-concealed', name: 'Concealed/Cove Lighting', imageUrl: 'https://picsum.photos/seed/concealedlighting/400/300', dataAiHint: 'concealed cove lighting' },
    { id: 'light-niche', name: 'Niche/Picture Lighting', imageUrl: 'https://picsum.photos/seed/nichelighing/400/300', dataAiHint: 'niche picture lighting' },
    { id: 'light-pendant', name: 'Pendant(s)', imageUrl: 'https://picsum.photos/seed/pendantlight/400/300', dataAiHint: 'pendant lighting room' },
    { id: 'light-recessed-cylinder', name: 'Recessed Cylinder', imageUrl: 'https://picsum.photos/seed/recessedcylinderlight/400/300', dataAiHint: 'recessed cylinder lighting' },
    { id: 'light-recessed-flush', name: 'Recessed Flush', imageUrl: 'https://picsum.photos/seed/recessedflushlight/400/300', dataAiHint: 'recessed flush lighting' },
    { id: 'light-wallsconce', name: 'Wall Sconce(s)', imageUrl: 'https://picsum.photos/seed/wallsconcelight/400/300', dataAiHint: 'wall sconce lighting' },
].sort((a, b) => a.name.localeCompare(b.name));

// Utility/Laundry Room Options
export interface GeneralWallFinishOption extends BaseSelectionItem {}
export const generalWallFinishOptions: GeneralWallFinishOption[] = [
    { id: 'wall-exposed-brick', name: 'Exposed Brick / Stone Veneer', imageUrl: 'https://picsum.photos/seed/exposedbrickwall/400/300', dataAiHint: 'exposed brick wall' },
    { id: 'wall-paint', name: 'Paint', imageUrl: 'https://picsum.photos/seed/wallpaintfinish/400/300', dataAiHint: 'painted wall room' },
    { id: 'wall-textured', name: 'Textured (e.g., Venetian Plaster)', imageUrl: 'https://picsum.photos/seed/texturedwallfinish/400/300', dataAiHint: 'textured wall finish' },
    { id: 'wall-wallpaper', name: 'Wallpaper', imageUrl: 'https://picsum.photos/seed/wallpaperfinish/400/300', dataAiHint: 'wallpaper wall room' },
    { id: 'wall-paneling', name: 'Wood Paneling / Shiplap', imageUrl: 'https://picsum.photos/seed/woodpanelingwall/400/300', dataAiHint: 'wood paneling wall' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface UtilityWasherDryerLayoutOption extends BaseSelectionItem {}
export const utilityWasherDryerLayoutOptions: UtilityWasherDryerLayoutOption[] = [
    { id: 'util-wd-compact', name: 'Compact', imageUrl: 'https://picsum.photos/seed/compactwd/400/300', dataAiHint: 'compact laundry unit' },
    { id: 'util-wd-side', name: 'Side-By-Side', imageUrl: 'https://picsum.photos/seed/sidebysidewd/400/300', dataAiHint: 'side by side laundry' },
    { id: 'util-wd-stacked', name: 'Stacked', imageUrl: 'https://picsum.photos/seed/stackedwd/400/300', dataAiHint: 'stacked laundry unit' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface GeneralStorageOption extends BaseSelectionItem {}
export const utilityStorageOptions: GeneralStorageOption[] = [
    { id: 'util-store-builtin', name: 'Built-In Units', imageUrl: 'https://picsum.photos/seed/builtinlaundrystorage/400/300', dataAiHint: 'laundry built in storage' },
    { id: 'util-store-custom', name: 'Custom Storage Solutions', imageUrl: 'https://picsum.photos/seed/customlaundrystorage/400/300', dataAiHint: 'custom laundry storage' },
    { id: 'util-store-free', name: 'Free-Standing Cabinets', imageUrl: 'https://picsum.photos/seed/freestandinglaundrycabinet/400/300', dataAiHint: 'laundry freestanding cabinet' },
].sort((a, b) => a.name.localeCompare(b.name));

// Living Room Options
export interface LivingRoomStorageOption extends BaseSelectionItem {}
export const livingRoomStorageOptions: LivingRoomStorageOption[] = [
    { id: 'lr-store-alcove', name: 'Alcove Shelving', imageUrl: 'https://picsum.photos/seed/lralkcoveshelving/400/300', dataAiHint: 'alcove shelving living' },
    { id: 'lr-store-builtin', name: 'Built-In Units (e.g., Media Center)', imageUrl: 'https://picsum.photos/seed/lrbuiltinunits/400/300', dataAiHint: 'living room built in' },
    { id: 'lr-store-windowseat', name: 'Window Seating with Storage', imageUrl: 'https://picsum.photos/seed/lrwindowseatstorage/400/300', dataAiHint: 'window seat storage' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface LivingRoomFireplaceOption extends BaseSelectionItem {}
export const livingRoomFireplaceOptions: LivingRoomFireplaceOption[] = [
    { id: 'lr-fire-electric', name: 'Electric Fireplace', imageUrl: 'https://picsum.photos/seed/electricfireplace/400/300', dataAiHint: 'electric fireplace living' },
    { id: 'lr-fire-gas', name: 'Gas Fireplace', imageUrl: 'https://picsum.photos/seed/gasfireplace/400/300', dataAiHint: 'gas fireplace living' },
    { id: 'lr-fire-wood', name: 'Wood Burning Fireplace', imageUrl: 'https://picsum.photos/seed/woodfireplace/400/300', dataAiHint: 'wood burning fireplace' },
].sort((a, b) => a.name.localeCompare(b.name));

// Bedroom Options
export interface BedroomWardrobeOption extends BaseSelectionItem {}
export const bedroomWardrobeOptions: BedroomWardrobeOption[] = [
  { id: 'bed-wardrobe-bifold', name: 'Bifold Doors', imageUrl: 'https://picsum.photos/seed/bifoldclosetdoors/400/300', dataAiHint: 'bifold closet doors' },
  { id: 'bed-wardrobe-custom', name: 'Custom Built-In', imageUrl: 'https://picsum.photos/seed/custombuiltincloset/400/300', dataAiHint: 'custom built in closet' },
  { id: 'bed-wardrobe-standard', name: 'One/Two Standard Doors', imageUrl: 'https://picsum.photos/seed/standardclosetdoors/400/300', dataAiHint: 'standard closet doors' },
  { id: 'bed-wardrobe-walkin', name: 'Walk-In Closet', imageUrl: 'https://picsum.photos/seed/walkincloset/400/300', dataAiHint: 'walk in closet' },
].sort((a, b) => a.name.localeCompare(b.name));

// Bathroom Options (Master)
export interface BathroomStyleOption extends BaseSelectionItem {} // Same as OverallStyleOption, can reuse or make specific
export const bathroomStyleOptions = overallStyleOptions.sort((a, b) => a.name.localeCompare(b.name)); // Reuse for consistency and sort

export interface BathroomMasterBathTubOption extends BaseSelectionItem {}
export const bathroomMasterBathTubOptions: BathroomMasterBathTubOption[] = [
    { id: 'bm-tub-alcove', name: 'Alcove Tub', imageUrl: 'https://picsum.photos/seed/alcovetub/400/300', dataAiHint: 'alcove bathtub' },
    { id: 'bm-tub-clawfoot', name: 'Claw Foot Tub', imageUrl: 'https://picsum.photos/seed/clawfoottub/400/300', dataAiHint: 'clawfoot bathtub vintage' },
    { id: 'bm-tub-combo', name: 'Tub/Shower Combo', imageUrl: 'https://picsum.photos/seed/tubshowercombo/400/300', dataAiHint: 'tub shower combination' },
    { id: 'bm-tub-corner', name: 'Corner Tub', imageUrl: 'https://picsum.photos/seed/cornertub/400/300', dataAiHint: 'corner bathtub' },
    { id: 'bm-tub-dropin', name: 'Drop-In Tub', imageUrl: 'https://picsum.photos/seed/dropintub/400/300', dataAiHint: 'drop in bathtub' },
    { id: 'bm-tub-freestanding', name: 'Freestanding Tub', imageUrl: 'https://picsum.photos/seed/freestandingtub/400/300', dataAiHint: 'freestanding bathtub luxury' },
    { id: 'bm-tub-walkin', name: 'Walk-In Tub', imageUrl: 'https://picsum.photos/seed/walkintub/400/300', dataAiHint: 'walk in bathtub accessible' },
    { id: 'bm-tub-whirlpool', name: 'Whirlpool/Jacuzzi Tub', imageUrl: 'https://picsum.photos/seed/jacuzzitub/400/300', dataAiHint: 'jacuzzi whirlpool tub' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomMasterShowerOption extends BaseSelectionItem {}
export const bathroomMasterShowerOptions: BathroomMasterShowerOption[] = [
    { id: 'bm-shower-enclosed', name: 'Enclosed Shower', imageUrl: 'https://picsum.photos/seed/enclosedshower/400/300', dataAiHint: 'enclosed shower stall' },
    { id: 'bm-shower-combo', name: 'Shower/Tub Combo', imageUrl: 'https://picsum.photos/seed/showertubcombo/400/300', dataAiHint: 'shower tub combination' }, // Repeated for clarity if selected here
    { id: 'bm-shower-walkin', name: 'Walk-In Shower', imageUrl: 'https://picsum.photos/seed/walkinshowerdesign/400/300', dataAiHint: 'walk in shower bathroom' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomMasterSinkOption extends BaseSelectionItem { type?: 'single' | 'double'; }
export const bathroomMasterSinkOptions: BathroomMasterSinkOption[] = [
    { id: 'bm-sink-console-d', name: 'Console Sink (Double)', imageUrl: 'https://picsum.photos/seed/consolesinkdouble/400/300', type: 'double', dataAiHint: 'double console sink' },
    { id: 'bm-sink-console-s', name: 'Console Sink (Single)', imageUrl: 'https://picsum.photos/seed/consolesinksingle/400/300', type: 'single', dataAiHint: 'console bathroom sink' },
    { id: 'bm-sink-dropin-d', name: 'Drop-In Sink (Double)', imageUrl: 'https://picsum.photos/seed/dropinsinkdouble/400/300', type: 'double', dataAiHint: 'double drop in sink' },
    { id: 'bm-sink-dropin-s', name: 'Drop-In Sink (Single)', imageUrl: 'https://picsum.photos/seed/dropinsinksingle/400/300', type: 'single', dataAiHint: 'drop in bathroom sink' },
    { id: 'bm-sink-pedestal-d', name: 'Pedestal Sink (Double)', imageUrl: 'https://picsum.photos/seed/pedestalsinkdouble/400/300', type: 'double', dataAiHint: 'double pedestal sink' },
    { id: 'bm-sink-pedestal-s', name: 'Pedestal Sink (Single)', imageUrl: 'https://picsum.photos/seed/pedestalsinksingle/400/300', type: 'single', dataAiHint: 'pedestal bathroom sink' },
    { id: 'bm-sink-undermount-d', name: 'Undermount Sink (Double)', imageUrl: 'https://picsum.photos/seed/undermountsinkdouble/400/300', type: 'double', dataAiHint: 'double undermount sink' },
    { id: 'bm-sink-undermount-s', name: 'Undermount Sink (Single)', imageUrl: 'https://picsum.photos/seed/undermountsinksingle/400/300', type: 'single', dataAi