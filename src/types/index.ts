
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
  { id: 'biophilic', name: 'Biophilic', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043155422679210/Biophilic.png?ex=682b9c96&is=682a4b16&hm=70d9f3993cc847e4a298610610118d7f6f038cb8e9160a96fb837aee964a622d&=&format=webp&quality=lossless&width=774&height=774', description: 'Nature-inspired, with natural elements.', dataAiHint: 'biophilic design interior' },
  { id: 'bohemian', name: 'Bohemian', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043156102152344/Bohemian.png?ex=6828f996&is=6827a816&hm=bac9a4dbf1a4fe7714c124a9f57e761114e2841477368caf206177230174599e&=&format=webp&quality=lossless&width=380&height=380', description: 'Eclectic, colorful, and free-spirited.', dataAiHint: 'bohemian interior' },
  { id: 'coastal', name: 'Coastal', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043156815446198/Coastal.png?ex=6828f996&is=6827a816&hm=eec376ebe01eac625acfc72b6d96228df4bb3705c85a5c3336ae7a708c702dd5&=&format=webp&quality=lossless&width=380&height=380', description: 'Light, airy, and beach-inspired.', dataAiHint: 'coastal interior' },
  { id: 'contemporary', name: 'Contemporary', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043157452984470/Contemporary.png?ex=6828f996&is=6827a816&hm=79ba96bcfb75a6b1b778edbea778fc72b77452a6bfa86817e19a8b6edde85453&=&format=webp&quality=lossless&width=380&height=380', description: 'Current, fluid, and ever-evolving.', dataAiHint: 'contemporary interior' },
  { id: 'country-farmhouse', name: 'Country / Farmhouse', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043011654778930/Country_Farmhouse.png?ex=6828f973&is=6827a7f3&hm=e2e82f92bf9a57ec0add74856fe88d27d63e01704cc86aae94b7ea5272c574e1&=&format=webp&quality=lossless&width=380&height=380', description: 'Warm, rustic, and inviting.', dataAiHint: 'farmhouse interior' },
  { id: 'industrial', name: 'Industrial', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043012279472169/Industrial.png?ex=6828f974&is=6827a7f4&hm=859e40b9764e038ce8f952133d5575402a14c6e8032256008347beb6505515f6&=&format=webp&quality=lossless&width=380&height=380', description: 'Raw, edgy, with exposed elements.', dataAiHint: 'industrial interior' },
  { id: 'japandi', name: 'Japandi', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043012824862840/Japandi.png?ex=6828f974&is=6827a7f4&hm=9cc6abd531984c322c5d79d55b08dac05cb26cad49ba42bc85cb097c89d49bda&=&format=webp&quality=lossless&width=380&height=380', description: 'Japanese minimalism meets Scandinavian function.', dataAiHint: 'japandi interior' },
  { id: 'mid-century', name: 'Mid-Century Modern', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043013378642064/Mid-Century.png?ex=6828f974&is=6827a7f4&hm=0a441405db4f152d2d97e04618f88b99a882b03d7df6d7c0f2d8284239e82237&=&format=webp&quality=lossless&width=380&height=380', description: 'Retro, organic shapes, and functionality.', dataAiHint: 'midcentury modern interior' },
  { id: 'modern', name: 'Modern', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043013986549760/Modern.png?ex=6828f974&is=6827a7f4&hm=0bf5bd709b8600477c543611e11dbc25d3e65ee2c44d91bb5a4f655869b01c37&=&format=webp&quality=lossless&width=380&height=380', description: 'Sleek, clean lines, and simplicity.', dataAiHint: 'modern interior' },
  { id: 'traditional', name: 'Traditional', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043014427213985/Traditional.png?ex=6828f974&is=6827a7f4&hm=ded6dabe56a56d8076e54184c6534b7ca46cd4bd1c762db8a727b81ff2c8392f&=&format=webp&quality=lossless&width=380&height=380', description: 'Classic, timeless, and ornate.', dataAiHint: 'traditional interior' },
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
  { id: 'k-worktop-butcher', name: 'Butcher Block', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1374884016880095284/Butcher_Block_Countertop.png?ex=682fac05&is=682e5a85&hm=f0704f3153e0d1c71b2d46e39d73287b0290cbe491b46ac2294099a92f921527&=&format=webp&quality=lossless&width=938&height=938', dataAiHint: 'butcher block countertop' },
  { id: 'k-worktop-concrete', name: 'Concrete', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1374884017450651789/Cement_Countertop.png?ex=682fac05&is=682e5a85&hm=6abc03501a1505b1ecb2ce1cd95e4b04353957fff978c3a88758465bc80f4fbe&=&format=webp&quality=lossless&width=938&height=938', dataAiHint: 'concrete countertop kitchen' },
  { id: 'k-worktop-granite', name: 'Granite', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1374884017962487898/Granite_Countertop.png?ex=682fac05&is=682e5a85&hm=7795ee8f45047623a6f174d2b43009d2283fdb80b4193072d5c1f20936fe007a&=&format=webp&quality=lossless&width=938&height=938', dataAiHint: 'granite countertop kitchen' },
  { id: 'k-worktop-marble', name: 'Marble', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1374884018415210607/Marble_Countertop_.png?ex=682fac06&is=682e5a86&hm=e1f2d978260cb83a94e5d421e43ec4ca715f12792400cfea99bca0605959de02&=&format=webp&quality=lossless&width=938&height=938', dataAiHint: 'marble countertop kitchen' },
  { id: 'k-worktop-quartz', name: 'Quartz', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1374884018813927595/Quartz_Countertop.png?ex=682fac06&is=682e5a86&hm=88cb69d5c4e1e09fa4783ce63e5c220c599d6ded9e78e646c1d998d935f0f1fa&=&format=webp&quality=lossless&width=938&height=938', dataAiHint: 'quartz countertop kitchen' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenApplianceOption extends BaseSelectionItem {}
export const kitchenApplianceOptions: KitchenApplianceOption[] = [
  { id: 'k-app-finish-black', name: 'Black', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1374800577728610445/Black_Kitchen_Appliances_Finish.png?ex=682f5e50&is=682e0cd0&hm=8a1a609c4190eba8d5c9a07670ae165d5f99e1e172c5992d0ad82daf1fbb017b&=&format=webp&quality=lossless&width=936&height=936', dataAiHint: 'black kitchen appliance' },
  { id: 'k-app-finish-color', name: 'Color (e.g. Red, Blue)', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1374800578235990057/Color_Option_Kitchen_Appliances_Finish.png?ex=682f5e50&is=682e0cd0&hm=84b8d312dcdc06a95dc838788ec05e61776ee5b0e3e0113059519a00b10a4fc6&=&format=webp&quality=lossless&width=936&height=936', dataAiHint: 'colored kitchen appliance' },
  { id: 'k-app-fingerprint', name: 'Fingerprint Resistant', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1374879872211484822/Fingerprint_Resistant_Kitchen_Appliances_.png?ex=682fa829&is=682e56a9&hm=150eb835dd091eafe427b9a8e9f15fdf4e24a9e6e8e499bb9cd702e432630807&=&format=webp&quality=lossless&width=938&height=938', dataAiHint: 'fingerprint resistant appliance' },
  { id: 'k-app-freestanding', name: 'Freestanding', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'freestanding kitchen appliance' },
  { id: 'k-app-integrated', name: 'Integrated', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'integrated kitchen appliance' },
  { id: 'k-app-smart', name: 'Smart Appliances', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1374800579712516166/Smart_Kitchen_Appliances.png?ex=682f5e50&is=682e0cd0&hm=9173c4f0087ca8f89c74eff564c75e90db95e3a1e8b89ac2502834baf7df6d3d&=&format=webp&quality=lossless&width=938&height=938', dataAiHint: 'smart kitchen appliance' },
  { id: 'k-app-finish-stainless', name: 'Stainless Steel', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1374879872597622814/Stainless_Steel_Kitchen_Appliances_Finish.png?ex=682fa829&is=682e56a9&hm=46ec1416f3e83c14c9d65bf32ae52e03031f4bbcbc6b32fc77f6185c4a911c64&=&format=webp&quality=lossless&width=938&height=938', dataAiHint: 'stainless steel appliance' },
  { id: 'k-app-finish-white', name: 'White', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1374800580664492032/White_Kitchen_Appliances_Finish.png?ex=682f5e50&is=682e0cd0&hm=fd34cd3e885a173ef264aef563c5ce4cdfcc9d7dd8807f293dd8bb7e2e7cfedd&=&format=webp&quality=lossless&width=936&height=936', dataAiHint: 'white kitchen appliance' },
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
    { id: 'floor-bamboo', name: 'Bamboo', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373801632185319464/Bamboo.png?ex=682bbbf9&is=682a6a79&hm=268441e7532ff6b2eb1ae95c39d7e356bbb68947759e50754dbeba608864423b&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'bamboo flooring room' },
    { id: 'floor-carpet', name: 'Carpet', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373801629505294346/Carpet.png?ex=682bbbf8&is=682a6a78&hm=801ae93da5f045cb51d442b0f7484daf279c68eb9a9bcc60b6a13069dc19d61b&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'carpet room floor' },
    { id: 'floor-cement', name: 'Cement/Concrete', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373801630192893972/Cement.png?ex=682bbbf8&is=682a6a78&hm=c2c539223e8997fd2cb9c199e470351cd28fc010ce07383bd58af6ce110dd0b9&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'cement concrete floor' },
    { id: 'floor-lvinyl', name: 'Luxury Vinyl', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373801630612455434/Laminate_Vinyl_.png?ex=682bbbf8&is=682a6a78&hm=8929435d1b1b1cca849ab64d7094b13128026d240add61b82cad5cb7d0f226a0&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'luxury vinyl flooring' },
    { id: 'floor-marble', name: 'Marble', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373801632743166093/Marble.png?ex=682bbbf9&is=682a6a79&hm=e5efe6e147490d8ea77555a6180084a180979627f646371662fe568aef7e6810&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'marble flooring room' },
    { id: 'floor-nstone', name: 'Natural Stone', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373801631027822713/Natural_Stone.png?ex=682bbbf8&is=682a6a78&hm=2317e226944ec4084adf5e22d712b946e11ee9c3e2c183f6d349e3e2a134b6a2&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'natural stone flooring' },
    { id: 'floor-wood', name: 'Wood', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373801631635869877/Wood.png?ex=682bbbf8&is=682a6a78&hm=ff33cf172eee23d5189aba70ae46546ead5bb7a83b08d6d9f6a7eb6c2d0e2f01&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'wood flooring room' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface GeneralLightingOption extends BaseSelectionItem {}
export const generalLightingOptions: GeneralLightingOption[] = [
    { id: 'light-chandelier', name: 'Chandelier(s)', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'chandelier lighting room' },
    { id: 'light-concealed', name: 'Concealed/Cove Lighting', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'concealed cove lighting' },
    { id: 'light-niche', name: 'Niche/Picture Lighting', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'niche picture lighting' },
    { id: 'light-pendant', name: 'Pendant(s)', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'pendant lighting room' },
    { id: 'light-recessed-cylinder', name: 'Recessed Cylinder', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'recessed cylinder lighting' },
    { id: 'light-recessed-flush', name: 'Recessed Flush', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373806275061616760/Recessed_Flush.jpg?ex=682bc04c&is=682a6ecc&hm=0c36da07e211067d4c66f7569f1da9f3c4d4e6a8aa1c476e1c8ee38b94634e38&=&format=webp&width=713&height=774', dataAiHint: 'recessed flush lighting' },
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
  { id: 'util-wd-compact', name: 'All-In-One', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'all in one laundry' },
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
  { id: 'bed-wardrobe-custom', name: 'Custom Closet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'custom closet' },
  { id: 'bed-wardrobe-one-door', name: 'One Standard Door', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'one standard closet' },
  { id: 'bed-wardrobe-two-doors', name: 'Two Standard Doors', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'two standard closet' },
  { id: 'bed-wardrobe-walkin', name: 'Walk-In Closet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'walk in closet' },
].sort((a, b) => a.name.localeCompare(b.name));

// Bathroom Options (Master)
export interface BathroomStyleOption extends BaseSelectionItem {} // Same as OverallStyleOption, can reuse or make specific
export const bathroomStyleOptions = overallStyleOptions.sort((a, b) => a.name.localeCompare(b.name)); // Reuse for consistency and sort

export interface BathroomMasterBathTubOption extends BaseSelectionItem {}
export const bathroomMasterBathTubOptions: BathroomMasterBathTubOption[] = [
    { id: 'bm-tub-alcove', name: 'Alcove Tub', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807233942687804/Alcove.png?ex=682bc130&is=682a6fb0&hm=1c6bda820c46a0da5be4dd785f52e11dac26f78074c5e761ba5d536d919ba523&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'alcove bathtub' },
    { id: 'bm-tub-clawfoot', name: 'Claw Foot Tub', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807240498253865/Clawfoot.png?ex=682bc132&is=682a6fb2&hm=b260cf3822c5e655dee454986892f471c6c9f70251ee9e7370dbb3babbe71063&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'clawfoot bathtub vintage' },
    { id: 'bm-tub-combo', name: 'Tub/Shower Combo', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807240036745296/Bath_Shower_Combo.png?ex=682bc132&is=682a6fb2&hm=ed76a2283a3ee578ca333e1eb3f3b1cedef1b450405a0114657966ed5d11f154&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'tub shower combination' },
    { id: 'bm-tub-corner', name: 'Corner Tub', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807240997507113/Corner_.png?ex=682bc132&is=682a6fb2&hm=6f0a29fdeb4a384031439ecd216cea4d9fe4eea1c4bfd648f61fbcc7ddabbb1f&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'corner bathtub' },
    { id: 'bm-tub-dropin', name: 'Drop-In Tub', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807241781706834/Drop-In.png?ex=682bc132&is=682a6fb2&hm=4e5b55903e6f9b36c9df8341021635c5e07b69a4a659af69ff96e1153c89ea3e&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'drop in bathtub' },
    { id: 'bm-tub-freestanding', name: 'Freestanding Tub', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807242289352745/Freestanding.png?ex=682bc132&is=682a6fb2&hm=14b1df8000b39d86e44a01ff03d69c3d2c0bdd260086522db6ac14f97ccb1054&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'freestanding bathtub luxury' },
    { id: 'bm-tub-walkin', name: 'Walk-In Tub', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807233078526033/Accessible.png?ex=682bc130&is=682a6fb0&hm=23775b0006f4a6a8915bb549aff176e7fade5177dd056f6be00c036ad1da13ab&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'walk in bathtub accessible' },
    { id: 'bm-tub-whirlpool', name: 'Whirlpool/Jacuzzi Tub', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807242746269746/Jacuzzi_.png?ex=682bc132&is=682a6fb2&hm=63e0c7558d33f996495d5ded2b8ba63ad06409ffc3fcbfce062a5f95c75ef551&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'jacuzzi whirlpool tub' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomMasterShowerOption extends BaseSelectionItem {}
export const bathroomMasterShowerOptions: BathroomMasterShowerOption[] = [
    { id: 'bm-shower-enclosed', name: 'Enclosed Shower', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'enclosed shower stall' },
    { id: 'bm-shower-combo', name: 'Shower/Tub Combo', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807240036745296/Bath_Shower_Combo.png?ex=682bc132&is=682a6fb2&hm=ed76a2283a3ee578ca333e1eb3f3b1cedef1b450405a0114657966ed5d11f154&=&format=webp&quality=lossless&width=774&height=774', dataAiHint: 'shower tub combination' }, // Repeated for clarity if selected here
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
  { id: 'bath-hardware-crystal', name: 'Crystal or Glass', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'crystal bathroom hardware' },
  { id: 'bath-hardware-handleless', name: 'Handleless/Flat', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'handleless bathroom' },
  { id: 'bath-hardware-multitone', name: 'Multi-Toned/Abstract', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'abstract bathroom hardware' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomStorageOption extends BaseSelectionItem {}
export const bathroomStorageOptions: BathroomStorageOption[] = [
  { id: 'bath-store-builtinshelving', name: 'Built-In Shelving/Cabinets', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'bathroom built in shelving' },
  { id: 'bath-store-medicinecabinet', name: 'Medicine Cabinet Storage', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'medicine cabinet bathroom' },
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
  

    

    





    

    




    

    











    

