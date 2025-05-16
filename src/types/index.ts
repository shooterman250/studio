
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
  { id: 'biophilic', name: 'Biophilic', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043155422679210/Biophilic.png?ex=6828f996&is=6827a816&hm=288b860b99c52764046b3d4da9450baa0b4faa9f219611a3fcbe7e616d0d2db3&=&format=webp&quality=lossless&width=380&height=380', description: 'Nature-inspired, with natural elements.', dataAiHint: 'biophilic design interior' },
  { id: 'bohemian', name: 'Bohemian', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1370577130659909744/Overall_Style__Modern_1.png?ex=682000ec&is=681eaf6c&hm=361ae221f9d5e4cb6304e6a83e428170a90143b626d3e7c634ec8acd0e0df2bd&=&format=webp&quality=lossless&width=1502&height=1502', description: 'Eclectic, colorful, and free-spirited.', dataAiHint: 'bohemian interior' },
  { id: 'coastal', name: 'Coastal', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043156815446198/Coastal.png?ex=6828f996&is=6827a816&hm=eec376ebe01eac625acfc72b6d96228df4bb3705c85a5c3336ae7a708c702dd5&=&format=webp&quality=lossless&width=380&height=380', description: 'Light, airy, and beach-inspired.', dataAiHint: 'coastal interior' },
  { id: 'contemporary', name: 'Contemporary', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043157452984470/Contemporary.png?ex=6828f996&is=6827a816&hm=79ba96bcfb75a6b1b778edbea778fc72b77452a6bfa86817e19a8b6edde85453&=&format=webp&quality=lossless&width=380&height=380', description: 'Current, fluid, and ever-evolving.', dataAiHint: 'contemporary interior' },
  { id: 'country-farmhouse', name: 'Country / Farmhouse', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043011654778930/Country_Farmhouse.png?ex=6828f973&is=6827a7f3&hm=e2e82f92bf9a57ec0add74856fe88d27d63e01704cc86aae94b7ea5272c574e1&=&format=webp&quality=lossless&width=380&height=380', description: 'Warm, rustic, and inviting.', dataAiHint: 'farmhouse interior' },
  { id: 'industrial', name: 'Industrial', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043012279472169/Industrial.png?ex=6828f974&is=6827a7f4&hm=859e40b9764e038ce8f952133d5575402a14c6e8032256008347beb6505515f6&=&format=webp&quality=lossless&width=380&height=380', description: 'Raw, edgy, with exposed elements.', dataAiHint: 'industrial interior' },
  { id: 'japandi', name: 'Japandi', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043012824862840/Japandi.png?ex=6828f974&is=6827a7f4&hm=9cc6abd531984c322c5d79d55b08dac05cb26cad49ba42bc85cb097c89d49bda&=&format=webp&quality=lossless&width=380&height=380', description: 'Japanese minimalism meets Scandinavian function.', dataAiHint: 'japandi interior' },
  { id: 'mid-century', name: 'Mid-Century Modern', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1370581583479967774/Overall_Style__Modern_7.png?ex=68200511&is=681eb391&hm=5db0d1db0f4d2e045829ab67089b4fbb7e2a9048d586878cb1130e8395e1aa84&=&format=webp&quality=lossless&width=1502&height=1502', description: 'Retro, organic shapes, and functionality.', dataAiHint: 'midcentury modern interior' },
  { id: 'modern', name: 'Modern', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1370571094762721280/Overall_Style__Modern.png?ex=68288d0c&is=68273b8c&hm=c0906f93b28f823c300716e59a6f73cc3375fb32acaa93692c3171199a3e5d9e&=&format=webp&quality=lossless&width=1502&height=1502', description: 'Sleek, clean lines, and simplicity.', dataAiHint: 'modern interior' },
  { id: 'traditional', name: 'Traditional', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1370582056014319727/Overall_Style__Modern_8.png?ex=68200582&is=681eb402&hm=b5cdc7992a1939df4e2e1a17193309263d5138b2edb4e399e5e79c6f51304e72&=&format=webp&quality=lossless&width=1502&height=1502', description: 'Classic, timeless, and ornate.', dataAiHint: 'traditional interior' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KeyElementOption extends BaseSelectionItem {}
export const keyElementOptions: KeyElementOption[] = [
  { id: 'accessible-inclusive', name: 'Accessible & Inclusive', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373028168042156083/Accessible.png?ex=6828eba0&is=68279a20&hm=5b9607c1fec3ab9ed510756f28f5c318ab4ebd52413ad8f59eebf601579506c8&=&format=webp&quality=lossless&width=1294&height=1294', description: 'Designed to be usable by people of all abilities.', dataAiHint: 'accessible interior' },
  { id: 'multi-generational-living', name: 'Multi-Generational Living', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373028168960704512/Multi-Generational_Living.png?ex=6828eba1&is=68279a21&hm=d9e5216321f92a2ca5a1e02c719b9a05359797510be4b4d364c0404c4ae37cee&=&format=webp&quality=lossless&width=1294&height=1294', description: 'Accommodates multiple generations living together comfortably.', dataAiHint: 'multi generational home' },
  { id: 'sustainable-eco-friendly', name: 'Sustainable & Eco-Friendly', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373028167559680131/Sustainable__Eco-Friendly.png?ex=6828eba0&is=68279a20&hm=9610fda9a992d6282427e9742cbcddf24d1c2a21eec7624fb5dc2bbb4f961efa&=&format=webp&quality=lossless&width=1294&height=1294', description: 'Focus on environmentally conscious materials and practices.', dataAiHint: 'eco friendly home' },
  { id: 'technology-integrated-smart-home', name: 'Technology Integrated Smart Home', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373028168436289596/Smart_Technology_Integrated_Home.png?ex=6828eba0&is=68279a20&hm=4cb693ecfd007534ab730595edfe901a68b8d4bfe912f2360ee31ce2b58d88c1&=&format=webp&quality=lossless&width=1294&height=1294', description: 'Incorporates smart devices and automation for convenience and efficiency.', dataAiHint: 'smart home technology' },
].sort((a, b) => a.name.localeCompare(b.name));


// Kitchen Options
export interface KitchenCabinetOption extends BaseSelectionItem {}
export const kitchenCabinetOptions: KitchenCabinetOption[] = [
  { id: 'k-cab-arched', name: 'Arched', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'arched kitchen cabinet' },
  { id: 'k-cab-flat', name: 'Flat Panel', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'flat panel kitchen' },
  { id: 'k-cab-glass', name: 'Glass Front', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'glass kitchen cabinet' },
  { id: 'k-cab-open', name: 'Open Shelving', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'open kitchen shelving' },
  { id: 'k-cab-raised', name: 'Raised Panel', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'raised panel kitchen' },
  { id: 'k-cab-shaker', name: 'Shaker', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'shaker kitchen cabinet' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenWorktopOption extends BaseSelectionItem {}
export const kitchenWorktopOptions: KitchenWorktopOption[] = [
  { id: 'k-worktop-butcher', name: 'Butcher Block', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'butcher block countertop' },
  { id: 'k-worktop-concrete', name: 'Concrete', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'concrete countertop kitchen' },
  { id: 'k-worktop-granite', name: 'Granite', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'granite countertop kitchen' },
  { id: 'k-worktop-marble', name: 'Marble', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'marble countertop kitchen' },
  { id: 'k-worktop-quartz', name: 'Quartz', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'quartz countertop kitchen' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenApplianceOption extends BaseSelectionItem {}
export const kitchenApplianceOptions: KitchenApplianceOption[] = [
  { id: 'k-app-freestanding', name: 'Freestanding', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'freestanding kitchen appliance' },
  { id: 'k-app-integrated', name: 'Integrated', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'integrated kitchen appliance' },
  { id: 'k-app-smart', name: 'Smart Appliances', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'smart kitchen appliance' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenHardwareFinishOption extends BaseSelectionItem {}
export const kitchenHardwareFinishOptions: KitchenHardwareFinishOption[] = [
    { id: 'k-hardware-black', name: 'Black', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'black kitchen hardware' },
    { id: 'k-hardware-bronze', name: 'Bronze/Brass', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'bronze kitchen hardware' },
    { id: 'k-hardware-chrome', name: 'Chrome/Nickel/Stainless Steel', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'chrome kitchen hardware' },
    { id: 'k-hardware-crystal', name: 'Crystal', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'crystal kitchen hardware' },
    { id: 'k-hardware-gold', name: 'Gold', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'gold kitchen hardware' },
    { id: 'k-hardware-handleless', name: 'Handleless/Flat', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'handleless kitchen' },
    { id: 'k-hardware-multitone', name: 'Multi-Tone/Abstract', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'abstract kitchen hardware' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenSinkTypeOption extends BaseSelectionItem {}
export const kitchenSinkTypeOptions: KitchenSinkTypeOption[] = [
    { id: 'k-sink-double', name: 'Double Bowl', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'double bowl kitchen sink' },
    { id: 'k-sink-dropin', name: 'Drop-In (Top-Mount)', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'drop in kitchen sink' },
    { id: 'k-sink-farmhouse', name: 'Farmhouse', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'farmhouse kitchen sink' },
    { id: 'k-sink-undermount', name: 'Undermount', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'undermount kitchen sink' },
    { id: 'k-sink-workstation', name: 'Workstation', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'workstation kitchen sink' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenBacksplashOption extends BaseSelectionItem {}
export const kitchenBacksplashOptions: KitchenBacksplashOption[] = [
    { id: 'k-backsplash-stone', name: 'Carved Stone', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'carved stone backsplash' },
    { id: 'k-backsplash-glass', name: 'Glass', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'glass kitchen backsplash' },
    { id: 'k-backsplash-matching', name: 'Matching Worktop/Countertop', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'matching countertop backsplash' },
    { id: 'k-backsplash-paint', name: 'Paint', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'painted kitchen backsplash' },
    { id: 'k-backsplash-stainless', name: 'Stainless Steel', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'stainless steel backsplash' },
    { id: 'k-backsplash-tiles', name: 'Tiles', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'kitchen tile backsplash' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface GeneralFlooringOption extends BaseSelectionItem {}
export const generalFlooringOptions: GeneralFlooringOption[] = [
    { id: 'floor-bamboo', name: 'Bamboo', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'bamboo flooring room' },
    { id: 'floor-carpet', name: 'Carpet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'carpet room floor' },
    { id: 'floor-cement', name: 'Cement/Concrete', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'cement concrete floor' },
    { id: 'floor-lvinyl', name: 'Luxury Vinyl', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'luxury vinyl flooring' },
    { id: 'floor-marble', name: 'Marble', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'marble flooring room' },
    { id: 'floor-nstone', name: 'Natural Stone', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'natural stone flooring' },
    { id: 'floor-wood', name: 'Wood', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'wood flooring room' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface GeneralLightingOption extends BaseSelectionItem {}
export const generalLightingOptions: GeneralLightingOption[] = [
    { id: 'light-chandelier', name: 'Chandelier(s)', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'chandelier lighting room' },
    { id: 'light-concealed', name: 'Concealed/Cove Lighting', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'concealed cove lighting' },
    { id: 'light-niche', name: 'Niche/Picture Lighting', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'niche picture lighting' },
    { id: 'light-pendant', name: 'Pendant(s)', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'pendant lighting room' },
    { id: 'light-recessed-cylinder', name: 'Recessed Cylinder', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'recessed cylinder lighting' },
    { id: 'light-recessed-flush', name: 'Recessed Flush', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'recessed flush lighting' },
    { id: 'light-wallsconce', name: 'Wall Sconce(s)', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'wall sconce lighting' },
].sort((a, b) => a.name.localeCompare(b.name));

// Utility/Laundry Room Options
export interface GeneralWallFinishOption extends BaseSelectionItem {}
export const generalWallFinishOptions: GeneralWallFinishOption[] = [
    { id: 'wall-exposed-brick', name: 'Exposed Brick / Stone Veneer', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'exposed brick wall' },
    { id: 'wall-paint', name: 'Paint', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'painted wall room' },
    { id: 'wall-textured', name: 'Textured (e.g., Venetian Plaster)', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'textured wall finish' },
    { id: 'wall-wallpaper', name: 'Wallpaper', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'wallpaper wall room' },
    { id: 'wall-paneling', name: 'Wood Paneling / Shiplap', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'wood paneling wall' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface UtilityWasherDryerLayoutOption extends BaseSelectionItem {}
export const utilityWasherDryerLayoutOptions: UtilityWasherDryerLayoutOption[] = [
    { id: 'util-wd-compact', name: 'Compact', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'compact laundry unit' },
    { id: 'util-wd-side', name: 'Side-By-Side', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'side by side laundry' },
    { id: 'util-wd-stacked', name: 'Stacked', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'stacked laundry unit' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface GeneralStorageOption extends BaseSelectionItem {}
export const utilityStorageOptions: GeneralStorageOption[] = [
    { id: 'util-store-builtin', name: 'Built-In Units', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'laundry built in storage' },
    { id: 'util-store-custom', name: 'Custom Storage Solutions', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'custom laundry storage' },
    { id: 'util-store-free', name: 'Free-Standing Cabinets', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'laundry freestanding cabinet' },
].sort((a, b) => a.name.localeCompare(b.name));

// Living Room Options
export interface LivingRoomFurnitureOption extends BaseSelectionItem {}
export const livingRoomOptionsList: LivingRoomFurnitureOption[] = [
  { id: 'lr-sofa-sectional', name: 'Sectional Sofa', imageUrl: 'https://placehold.co/400x300.png', description: 'Large, modular sofa for flexible seating.', dataAiHint: 'sectional sofa living' },
  { id: 'lr-sofa-loveseat', name: 'Loveseat', imageUrl: 'https://placehold.co/400x300.png', description: 'Cozy two-seater sofa.', dataAiHint: 'loveseat living room' },
  { id: 'lr-armchair', name: 'Armchair', imageUrl: 'https://placehold.co/400x300.png', description: 'Comfortable single-seat chair.', dataAiHint: 'armchair living room' },
  { id: 'lr-coffee-table', name: 'Coffee Table', imageUrl: 'https://placehold.co/400x300.png', description: 'Central table for drinks and decor.', dataAiHint: 'coffee table modern' },
  { id: 'lr-side-table', name: 'Side Table', imageUrl: 'https://placehold.co/400x300.png', description: 'Small table next to sofas/chairs.', dataAiHint: 'side table living' },
  { id: 'lr-tv-unit', name: 'TV Unit / Media Console', imageUrl: 'https://placehold.co/400x300.png', description: 'Stand for television and media devices.', dataAiHint: 'tv unit console' },
  { id: 'lr-bookcase', name: 'Bookcase / Shelving Unit', imageUrl: 'https://placehold.co/400x300.png', description: 'For books and display items.', dataAiHint: 'bookcase living room' },
  { id: 'lr-ottoman', name: 'Ottoman / Pouf', imageUrl: 'https://placehold.co/400x300.png', description: 'Footrest or extra seating.', dataAiHint: 'ottoman pouf' },
  { id: 'lr-rug', name: 'Area Rug', imageUrl: 'https://placehold.co/400x300.png', description: 'Defines the seating area and adds texture.', dataAiHint: 'area rug living' },
].sort((a, b) => a.name.localeCompare(b.name));


export interface LivingRoomStorageOption extends BaseSelectionItem {}
export const livingRoomStorageOptions: LivingRoomStorageOption[] = [
    { id: 'lr-store-alcove', name: 'Alcove Shelving', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'alcove shelving living' },
    { id: 'lr-store-builtin', name: 'Built-In Units (e.g., Media Center)', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'living room built in' },
    { id: 'lr-store-windowseat', name: 'Window Seating with Storage', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'window seat storage' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface LivingRoomFireplaceOption extends BaseSelectionItem {}
export const livingRoomFireplaceOptions: LivingRoomFireplaceOption[] = [
    { id: 'lr-fire-electric', name: 'Electric Fireplace', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'electric fireplace living' },
    { id: 'lr-fire-gas', name: 'Gas Fireplace', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'gas fireplace living' },
    { id: 'lr-fire-wood', name: 'Wood Burning Fireplace', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'wood burning fireplace' },
].sort((a, b) => a.name.localeCompare(b.name));

// Bedroom Options
export interface BedroomWardrobeOption extends BaseSelectionItem {}
export const bedroomWardrobeOptions: BedroomWardrobeOption[] = [
  { id: 'bed-wardrobe-bifold', name: 'Bifold Doors', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'bifold closet doors' },
  { id: 'bed-wardrobe-custom', name: 'Custom Built-In', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'custom built in closet' },
  { id: 'bed-wardrobe-standard', name: 'One/Two Standard Doors', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'standard closet doors' },
  { id: 'bed-wardrobe-walkin', name: 'Walk-In Closet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'walk in closet' },
].sort((a, b) => a.name.localeCompare(b.name));

// Bathroom Options (Master)
export interface BathroomStyleOption extends BaseSelectionItem {} // Same as OverallStyleOption, can reuse or make specific
export const bathroomStyleOptions = overallStyleOptions.sort((a, b) => a.name.localeCompare(b.name)); // Reuse for consistency and sort

export interface BathroomMasterBathTubOption extends BaseSelectionItem {}
export const bathroomMasterBathTubOptions: BathroomMasterBathTubOption[] = [
    { id: 'bm-tub-alcove', name: 'Alcove Tub', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'alcove bathtub' },
    { id: 'bm-tub-clawfoot', name: 'Claw Foot Tub', imageUrl: '/images/clawfoot.png', dataAiHint: 'clawfoot bathtub vintage' },
    { id: 'bm-tub-combo', name: 'Tub/Shower Combo', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'tub shower combination' },
    { id: 'bm-tub-corner', name: 'Corner Tub', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'corner bathtub' },
    { id: 'bm-tub-dropin', name: 'Drop-In Tub', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'drop in bathtub' },
    { id: 'bm-tub-freestanding', name: 'Freestanding Tub', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'freestanding bathtub luxury' },
    { id: 'bm-tub-walkin', name: 'Walk-In Tub', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'walk in bathtub accessible' },
    { id: 'bm-tub-whirlpool', name: 'Whirlpool/Jacuzzi Tub', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'jacuzzi whirlpool tub' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomMasterShowerOption extends BaseSelectionItem {}
export const bathroomMasterShowerOptions: BathroomMasterShowerOption[] = [
    { id: 'bm-shower-enclosed', name: 'Enclosed Shower', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'enclosed shower stall' },
    { id: 'bm-shower-combo', name: 'Shower/Tub Combo', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'shower tub combination' }, // Repeated for clarity if selected here
    { id: 'bm-shower-walkin', name: 'Walk-In Shower', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'walk in shower bathroom' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomMasterSinkOption extends BaseSelectionItem { type?: 'single' | 'double'; }
export const bathroomMasterSinkOptions: BathroomMasterSinkOption[] = [
    { id: 'bm-sink-console-d', name: 'Console Sink (Double)', imageUrl: 'https://placehold.co/400x300.png', type: 'double', dataAiHint: 'double console sink' },
    { id: 'bm-sink-console-s', name: 'Console Sink (Single)', imageUrl: 'https://placehold.co/400x300.png', type: 'single', dataAiHint: 'console bathroom sink' },
    { id: 'bm-sink-dropin-d', name: 'Drop-In Sink (Double)', imageUrl: 'https://placehold.co/400x300.png', type: 'double', dataAiHint: 'double drop in sink' },
    { id: 'bm-sink-dropin-s', name: 'Drop-In Sink (Single)', imageUrl: 'https://placehold.co/400x300.png', type: 'single', dataAiHint: 'drop in bathroom sink' },
    { id: 'bm-sink-pedestal-d', name: 'Pedestal Sink (Double)', imageUrl: 'https://placehold.co/400x300.png', type: 'double', dataAiHint: 'double pedestal sink' },
    { id: 'bm-sink-pedestal-s', name: 'Pedestal Sink (Single)', imageUrl: 'https://placehold.co/400x300.png', type: 'single', dataAiHint: 'pedestal bathroom sink' },
    { id: 'bm-sink-undermount-d', name: 'Undermount Sink (Double)', imageUrl: 'https://placehold.co/400x300.png', type: 'double', dataAiHint: 'double undermount sink' },
    { id: 'bm-sink-undermount-s', name: 'Undermount Sink (Single)', imageUrl: 'https://placehold.co/400x300.png', type: 'single', dataAiHint: 'undermount bathroom sink' },
    { id: 'bm-sink-vessel-d', name: 'Vessel Sink (Double)', imageUrl: 'https://placehold.co/400x300.png', type: 'double', dataAiHint: 'double vessel sink' },
    { id: 'bm-sink-vessel-s', name: 'Vessel Sink (Single)', imageUrl: 'https://placehold.co/400x300.png', type: 'single', dataAiHint: 'vessel bathroom sink' },
    { id: 'bm-sink-wallmount-d', name: 'Wall-Mount Sink (Double)', imageUrl: 'https://placehold.co/400x300.png', type: 'double', dataAiHint: 'double wall mount sink' },
    { id: 'bm-sink-wallmount-s', name: 'Wall-Mount Sink (Single)', imageUrl: 'https://placehold.co/400x300.png', type: 'single', dataAiHint: 'wall mount bathroom sink' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomToiletOption extends BaseSelectionItem {}
export const bathroomToiletOptions: BathroomToiletOption[] = [
  { id: 'toilet-onepiece', name: 'One Piece Toilet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'one piece toilet' },
  { id: 'toilet-twopiece', name: 'Two Piece Toilet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'two piece toilet' },
  { id: 'toilet-wallhung', name: 'Wall Hung Toilet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'wall hung toilet' },
  { id: 'toilet-touchless', name: 'Touchless Toilet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'touchless toilet modern' },
  { id: 'toilet-bidet', name: 'Toilet with Bidet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'bidet toilet combo' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomHardwareFinishOption extends BaseSelectionItem {}
export const bathroomHardwareFinishOptions: BathroomHardwareFinishOption[] = [
  { id: 'bath-hardware-chrome', name: 'Chrome/Nickel/Stainless Steel', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'chrome bathroom hardware' },
  { id: 'bath-hardware-gold', name: 'Gold', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'gold bathroom hardware' },
  { id: 'bath-hardware-black', name: 'Black', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'black bathroom hardware' },
  { id: 'bath-hardware-bronze', name: 'Bronze/Brass', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'bronze bathroom hardware' },
  { id: 'bath-hardware-crystal', name: 'Crystal', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'crystal bathroom hardware' },
  { id: 'bath-hardware-handleless', name: 'Handleless/Flat', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'handleless bathroom' },
  { id: 'bath-hardware-multitone', name: 'Multi-Toned/Abstract', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'abstract bathroom hardware' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomStorageOption extends BaseSelectionItem {}
export const bathroomStorageOptions: BathroomStorageOption[] = [
  { id: 'bath-store-builtinshelving', name: 'Built-In Shelving/Cabinets', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'bathroom built in shelving' },
  { id: 'bath-store-medicinecabinet', name: 'Medicine Cabinet/Unit', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'medicine cabinet bathroom' },
  { id: 'bath-store-niches', name: 'Niches', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'bathroom shower niche' },
  { id: 'bath-store-undersink', name: 'Under-Sink Storage', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'under sink storage bathroom' },
  { id: 'bath-store-customvanity', name: 'Custom Vanity', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'custom bathroom vanity' },
].sort((a, b) => a.name.localeCompare(b.name));

// Bathroom (Half-Bath) Options
export interface BathroomHalfSinkOption extends BaseSelectionItem {}
export const bathroomHalfSinkOptions: BathroomHalfSinkOption[] = [
    { id: 'bh-sink-console', name: 'Console Sink', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'console sink half' },
    { id: 'bh-sink-dropin', name: 'Drop-In Sink', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'drop in sink half' },
    { id: 'bh-sink-pedestal', name: 'Pedestal Sink', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'pedestal sink half' },
    { id: 'bh-sink-undermount', name: 'Undermount Sink', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'undermount sink half' },
    { id: 'bh-sink-vessel', name: 'Vessel Sink', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'vessel sink half' },
    { id: 'bh-sink-wallmount', name: 'Wall-Mount Sink', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'wall mount sink half' },
].sort((a, b) => a.name.localeCompare(b.name));

// Home Office Options
export interface HomeOfficeStorageOption extends BaseSelectionItem {}
export const homeOfficeStorageOptions: HomeOfficeStorageOption[] = [
  { id: 'ho-store-bookcase', name: 'Bookcase/Bookshelves', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'office bookcase' },
  { id: 'ho-store-builtin', name: 'Built-In Units', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'office built in storage' },
  { id: 'ho-store-custom', name: 'Custom Storage Solutions', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'custom office storage' },
  { id: 'ho-store-free', name: 'Free-Standing Cabinets', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'office freestanding cabinet' },
].sort((a, b) => a.name.localeCompare(b.name));

// Hallway Options
export interface HallwayStorageOption extends BaseSelectionItem {}
export const hallwayStorageOptions: HallwayStorageOption[] = [
  { id: 'hall-store-linen', name: 'Linen Closet/Drying Cupboard', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'linen closet hallway' },
  { id: 'hall-store-shelving', name: 'Shelving', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'hallway shelving unit' },
].sort((a, b) => a.name.localeCompare(b.name));

// General options for decor and finishes (can be expanded or made specific)
export interface DecorOption extends BaseSelectionItem {}
export const decorOptions: DecorOption[] = [
  { id: 'decor-art', name: 'Artwork', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'wall art decor' },
  { id: 'decor-plants', name: 'Indoor Plants', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'indoor plants room' },
  { id: 'decor-rugs', name: 'Rugs', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'decorative rugs' },
  { id: 'decor-mirrors', name: 'Mirrors', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'decorative mirrors' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface FinishOption extends BaseSelectionItem {}
export const finishOptions: FinishOption[] = [
  { id: 'finish-paint-neutral', name: 'Neutral Paint Colors', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'neutral paint wall' },
  { id: 'finish-paint-bold', name: 'Bold Accent Colors', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'bold accent wall' },
  { id: 'finish-wood-light', name: 'Light Wood Finishes', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'light wood finish' },
  { id: 'finish-wood-dark', name: 'Dark Wood Finishes', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'dark wood finish' },
  { id: 'finish-metal-matte', name: 'Matte Metal Finishes', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'matte metal finish' },
  { id: 'finish-metal-polished', name: 'Polished Metal Finishes', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'polished metal' },
].sort((a, b) => a.name.localeCompare(b.name));

    

  




    

    





    

    

    

    
