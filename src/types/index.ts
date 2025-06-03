
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
  { id: 'biophilic', name: 'Biophilic', imageUrl: 'https://cdn.discordapp.com/attachments/1370568040256901200/1377359043160444968/IMG_1231.webp?ex=6838ad11&is=68375b91&hm=c36fefd1b33b36e688d5844339997a1cd0da443a70b98bc5c989e4463096e92e&', description: 'Nature-inspired, with natural elements.', dataAiHint: 'biophilic design interior' },
  { id: 'bohemian', name: 'Bohemian', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043156102152344/Bohemian.png?ex=6828f996&is=6827a816&hm=bac9a4dbf1a4fe7714c124a9f57e761114e2841477368caf206177230174599e&=&format=webp&quality=lossless&width=380&height=380', description: 'Eclectic, colorful, and free-spirited.', dataAiHint: 'bohemian interior' },
  { id: 'coastal', name: 'Coastal', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043156815446198/Coastal.png?ex=6828f996&is=6827a816&hm=eec376ebe01eac625acfc72b6d96228df4bb3705c85a5c3336ae7a708c702dd5&=&format=webp&quality=lossless&width=380&height=380', description: 'Light, airy, and beach-inspired.', dataAiHint: 'coastal interior' },
  { id: 'contemporary', name: 'Contemporary', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043157452984470/Contemporary.png?ex=6828f996&is=6827a816&hm=79ba96bcfb75a6b1b778edbea778fc72b77452a6bfa86817e19a8b6edde85453&=&format=webp&quality=lossless&width=380&height=380', description: 'Current, fluid, and ever-evolving.', dataAiHint: 'contemporary interior' },
  { id: 'country-farmhouse', name: 'Country / Farmhouse', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043011654778930/Country_Farmhouse.png?ex=6828f973&is=6827a7f3&hm=e2e82f92bf9a57ec0add74856fe88d27d63e01704cc86aae94b7ea5272c574e1&=&format=webp&quality=lossless&width=380&height=380', description: 'Warm, rustic, and inviting.', dataAiHint: 'farmhouse interior' },
  { id: 'industrial', name: 'Industrial', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043012279472169/Industrial.png?ex=6828f974&is=6827a7f4&hm=859e40b9764e038ce8f952133d5575402a14c6e8032256008347beb6505515f6&=&format=webp&quality=lossless&width=380&height=380', description: 'Raw, edgy, with exposed elements.', dataAiHint: 'industrial interior' },
  { id: 'japandi', name: 'Japandi', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043012824862840/Japandi.png?ex=6828f974&is=6827a7f4&hm=9cc6abd531984c322c5d79d55b08dac05cb26cad49ba42bc85cb097c89d49bda&=&format=webp&quality=lossless&width=380&height=380', description: 'Japanese minimalism meets Scandinavian function.', dataAiHint: 'japandi interior' },
  { id: 'mid-century', name: 'Mid-Century Modern', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043013378642064/Mid-Century.png?ex=6828f974&is=6827a7f4&hm=0a441405db4f152d2d97e04618f88b99a882b03d7df6d7c0f2d8284239e82237&=&format=webp&quality=lossless&width=380&height=380', description: 'Retro, organic shapes, and functionality.', dataAiHint: 'midcentury modern interior' },
  { id: 'modern', name: 'Modern', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043013986549760/Modern.png?ex=682b9c74&is=682a4af4&hm=18c4de9386ecccb1790abe2b7863368716ccabe3dad2739fea23d07430e1f89b&=&format=webp&quality=lossless&width=774&height=774', description: 'Sleek, clean lines, and simplicity.', dataAiHint: 'modern interior' },
  { id: 'traditional', name: 'Traditional', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373043014427213985/Traditional.png?ex=6828f974&is=6827a7f4&hm=ded6dabe56a56d8076e54184c6534b7ca46cd4bd1c762db8a727b81ff2c8392f&=&format=webp&quality=lossless&width=380&height=380', description: 'Classic, timeless, and ornate.', dataAiHint: 'traditional interior' },
  { id: 'overall-style-upload', name: 'Upload your own Style', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1377057293576704122/Upload_Your_Inspo_Pics_Here.png?ex=6837940b&is=6836428b&hm=70a0e33c7a8b04e8eaca945fb88958f96ad16790d94be9e8efb3234923cc19eb&=&format=webp&quality=lossless&width=1450&height=1450', description: 'Upload an image of your desired style.', dataAiHint: 'custom style upload'},
].sort((a, b) => a.name.localeCompare(b.name));

export interface KeyElementOption extends BaseSelectionItem {}
export const keyElementOptions: KeyElementOption[] = [
  { id: 'accessible-inclusive', name: 'Accessible & Inclusive', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373028168042156083/Accessible.png?ex=6828eba0&is=68279a20&hm=5b9607c1fec3ab9ed510756f28f5c318ab4ebd52413ad8f59eebf601579506c8&=&format=webp&quality=lossless&width=1294&height=1294', description: 'Designed to be usable by people of all abilities.', dataAiHint: 'accessible interior' },
  { id: 'multi-generational-living', name: 'Multi-Generational Living', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373028168960704512/Multi-Generational_Living.png?ex=6828eba1&is=68279a21&hm=d9e5216321f92a2ca5a1e02c719b9a05359797510be4b4d364c0404c4ae37cee&=&format=webp&quality=lossless&width=1294&height=1294', description: 'Accommodates multiple generations living together comfortably.', dataAiHint: 'multi generational home' },
  { id: 'sustainable-eco-friendly', name: 'Sustainable & Eco-Friendly', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373028167559680131/Sustainable__Eco-Friendly.png?ex=6828eba0&is=68279a20&hm=9610fda9a992d6282427e9742cbcddf24d1c2a21eec7624fb5dc2bbb4f961efa&=&format=webp&quality=lossless&width=1294&height=1294', description: 'Focus on environmentally conscious materials and practices.', dataAiHint: 'eco friendly home' },
  { id: 'technology-integrated-smart-home', name: 'Technology Integrated Smart Home', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373028168436289596/Smart_Technology_Integrated_Home.png?ex=6828eba0&is=68279a20&hm=4cb693ecfd007534ab730595edfe901a68b8d4bfe912f2360ee31ce2b58d88c1&=&format=webp&quality=lossless&width=1294&height=1294', description: 'Incorporates smart devices and automation for convenience and efficiency.', dataAiHint: 'smart home technology' },
  { id: 'key-element-upload', name: 'Upload your own Element', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1377057293576704122/Upload_Your_Inspo_Pics_Here.png?ex=6837940b&is=6836428b&hm=70a0e33c7a8b04e8eaca945fb88958f96ad16790d94be9e8efb3234923cc19eb&=&format=webp&quality=lossless&width=1450&height=1450', description: 'Upload an image of your key element.', dataAiHint: 'custom element upload'},
].sort((a, b) => a.name.localeCompare(b.name));


// Kitchen Options
export interface KitchenCabinetOption extends BaseSelectionItem {}
export const kitchenCabinetOptions: KitchenCabinetOption[] = [
  { id: 'k-cab-arched', name: 'Arched', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1376296310801567805/Arched_Kitchen_Cabinets.png?ex=68400412&is=683eb292&hm=da8e6a4a10e9d431bf6e6577814612d14bdd42c04a28712d9b6144798255c7a3&=&format=webp&quality=lossless&width=1310&height=1310', dataAiHint: 'arched kitchen cabinet' },
  { id: 'k-cab-flat', name: 'Flat Panel', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1376296311221125271/Flat_Panel_Kitchen_Cabinets.png?ex=68400412&is=683eb292&hm=f32fb84b898266c1ffc8810147ec217983a6771686c5d0c7997d77c92b1400c9&=&format=webp&quality=lossless&width=1310&height=1310', dataAiHint: 'flat panel kitchen' },
  { id: 'k-cab-glass', name: 'Glass Front', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1376296311627710595/Glass_Kitchen_Cabinets.png?ex=68400413&is=683eb293&hm=6e1b8f747c65a66f295ce938ed0fc0a80b9b2f9df2bcd13d4c42d055c7c8d2e2&=&format=webp&quality=lossless&width=1310&height=1310', dataAiHint: 'glass kitchen cabinet' },
  { id: 'k-cab-open', name: 'Open Shelving', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1376296312018043082/Open_Shelving_Kitchen.png?ex=68400413&is=683eb293&hm=b5e4c39d614646829f0ad7cfdf48a62a0e9e17fa57f26a33d2a9a2ea1e6357a4&=&format=webp&quality=lossless&width=1310&height=1310', dataAiHint: 'open kitchen shelving' },
  { id: 'k-cab-raised', name: 'Raised Panel', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1376296312491737248/Raised_Panel_Kitchen_Cabinets.png?ex=68400413&is=683eb293&hm=f481d2b879559d43c8eee2051c396d40bd625acd5ff3513055df35884d496a70&=&format=webp&quality=lossless&width=1310&height=1310', dataAiHint: 'raised panel kitchen' },
  { id: 'k-cab-shaker', name: 'Shaker', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1376296312965955694/Shaker_Kitchen_Cabinets.png?ex=68400413&is=683eb293&hm=b44076445cf4ac8b1acd117a4d4d0cef43f1dd4215fb9cca941607ab502cb26e&=&format=webp&quality=lossless&width=1310&height=1310', dataAiHint: 'shaker kitchen cabinet' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenWorktopOption extends BaseSelectionItem {}
export const kitchenWorktopOptions: KitchenWorktopOption[] = [
  { id: 'k-worktop-butcher', name: 'Butcher Block', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1374884016880095284/Butcher_Block_Countertop.png?ex=682fac05&is=682e5a85&hm=f0704f3153e0d1c71b2d46e39d73287b0290cbe491b46ac2294099a92f921527&=&format=webp&quality=lossless&width=938&height=938', dataAiHint: 'butcher block countertop' },
  { id: 'k-worktop-concrete', name: 'Cement/Concrete', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1374884017450651789/Cement_Countertop.png?ex=682fac05&is=682e5a85&hm=6abc03501a1505b1ecb2ce1cd95e4b04353957fff978c3a88758465bc80f4fbe&=&format=webp&quality=lossless&width=938&height=938', dataAiHint: 'concrete countertop kitchen' },
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
    { id: 'k-hardware-black', name: 'Black', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375593364006768781/Black_Hardware.png?ex=683240a7&is=6830ef27&hm=2830262b856fec603120b88cb07c27452edc82780ab79caf86d652471a1d5d97&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'black kitchen hardware' },
    { id: 'k-hardware-bronze', name: 'Bronze/Brass', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375593364631715943/Bronze_Hardware.png?ex=683240a7&is=6830ef27&hm=4177f52f28623de71d59273380346486ac2f323d210ca099cbdf73c2cf0495a6&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'bronze kitchen hardware' },
    { id: 'k-hardware-chrome', name: 'Chrome/Nickel/Stainless Steel', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375593367009759232/Silver_Hardware.png?ex=683240a7&is=6830ef27&hm=4b853e37738ebd330e34b376f4d4d032f74084545ad48f8b74462adf52e428bb&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'chrome kitchen hardware' },
    { id: 'k-hardware-crystal', name: 'Crystal or Glass', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375593365353009363/Glass_or_Crystal_Hardware.png?ex=683240a7&is=6830ef27&hm=91c4a653cb32ecd65ca17fcbe2dc7a2422339c92137e094273b84d49575d9fdf&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'crystal hardware' },
    { id: 'k-hardware-gold', name: 'Gold', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375593365873361007/Gold_Hardware.png?ex=683240a7&is=6830ef27&hm=cf59ab4c6a8e1bf89f27596e18c6a533076880f70492ace8b64a34bc3ed9daed&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'gold kitchen hardware' },
    { id: 'k-hardware-handleless', name: 'Handleless/Flat', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375593366443790386/Handleless_or_No_Hardware.png?ex=683240a7&is=6830ef27&hm=957398c15f7ebb285eacbd669aa86946b470c9d69495b1f21cb1acaf02c79b7e&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'handleless kitchen' },
    { id: 'k-hardware-multitone', name: 'Multi-Toned/Abstract', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375593367404019904/Two-Tone_Hardware_1.png?ex=683240a8&is=6830ef28&hm=15dc307d7eddf30c8b6e2a3460233c3290780601a16440f3bc0e799abc2e4d54&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'abstract hardware' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenSinkTypeOption extends BaseSelectionItem {}
export const kitchenSinkTypeOptions: KitchenSinkTypeOption[] = [
    { id: 'k-sink-double', name: 'Double Bowl', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375999164474724413/Double_Bowl.png?ex=6833ba95&is=68326915&hm=e64b92397b9662b205e8aac297f8351fb8cc4afc17848c9182f8d5b3b4b3352c&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'double bowl kitchen sink' },
    { id: 'k-sink-dropin', name: 'Drop-In (Top-Mount)', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1377359043160444968/IMG_1231.webp?ex=683bf8d1&is=683aa751&hm=bc6d319755d8285d2faa8be2987a8e527dfcf6b5bddd9b0c2bcafbc0f1b2c8af&=&format=webp&width=1174&height=1174', dataAiHint: 'drop in kitchen sink' },
    { id: 'k-sink-farmhouse', name: 'Farmhouse', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'farmhouse kitchen sink' },
    { id: 'k-sink-undermount', name: 'Undermount', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'undermount kitchen sink' },
    { id: 'k-sink-workstation', name: 'Workstation', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'workstation kitchen sink' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenBacksplashOption extends BaseSelectionItem {}
export const kitchenBacksplashOptions: KitchenBacksplashOption[] = [
    { id: 'k-backsplash-stone', name: 'Carved Stone', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1374906764000100452/Carved_Stone_Kitchen_Backsplash.png?ex=682fc135&is=682e6fb5&hm=b782f324e58bb8c82c64c321cb5df312a80c2d7c55b366f9a674444cf3a5bee9&=&format=webp', dataAiHint: 'carved stone backsplash' },
    { id: 'k-backsplash-ceramic', name: 'Ceramic Tile', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'ceramic tile backsplash' },
    { id: 'k-backsplash-glass', name: 'Glass Sheet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'glass sheet backsplash' },
    { id: 'k-backsplash-metal', name: 'Metal Tile', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'metal tile backsplash' },
    { id: 'k-backsplash-natural', name: 'Natural Stone', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'natural stone backsplash' },
    { id: 'k-backsplash-porcelain', name: 'Porcelain Tile', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'porcelain tile backsplash' },
].sort((a, b) => a.name.localeCompare(b.name));

// General Options (used across multiple rooms)
export interface GeneralWallFinishOption extends BaseSelectionItem {}
export const generalWallFinishOptions: GeneralWallFinishOption[] = [
  { id: 'wall-accent', name: 'Accent Wall', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'accent wall' },
  { id: 'wall-brick', name: 'Exposed Brick / Stone Veneer', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'exposed brick wall' },
  { id: 'wall-paint', name: 'Paint', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'painted wall room' },
  { id: 'wall-paneling', name: 'Paneling (Wood/MDF)', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'wood paneling wall' },
  { id: 'wall-wallpaper', name: 'Wallpaper', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'wallpaper room' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface GeneralFlooringOption extends BaseSelectionItem {}
export const generalFlooringOptions: GeneralFlooringOption[] = [
  { id: 'floor-carpet', name: 'Carpet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'carpet flooring room' },
  { id: 'floor-concrete', name: 'Concrete', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'concrete floor room' },
  { id: 'floor-hardwood', name: 'Hardwood', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'hardwood floor room' },
  { id: 'floor-laminate', name: 'Laminate', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'laminate flooring room' },
  { id: 'floor-stone', name: 'Natural Stone Tile', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'stone tile floor' },
  { id: 'floor-porcelain', name: 'Porcelain/Ceramic Tile', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'tile floor room' },
  { id: 'floor-vinyl', name: 'Vinyl/Luxury Vinyl Tile (LVT)', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'vinyl floor room' },
  { id: 'floor-bamboo', name: 'Bamboo/Cork', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'bamboo cork floor' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface GeneralLightingOption extends BaseSelectionItem {}
export const generalLightingOptions: GeneralLightingOption[] = [
  { id: 'light-chandelier', name: 'Chandelier(s)', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375962940846641262/Bathroom_Chandelier_.png?ex=683398d9&is=68324759&hm=de9e16a0a9447f3f1fbf45a8263d4319a8ae22e038a8cd4757be9ccfe7fb1e8f&=&format=webp&quality=lossless&width=1206&height=1206', dataAiHint: 'chandelier lighting room' },
  { id: 'light-concealed', name: 'Concealed/Cove Lighting', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375960953760399370/Concealed_or_Cove_Lighting.png?ex=683396ff&is=6832457f&hm=90b594575063c593995c80556f54b6152415e5114e5d1b48dd209a6a01e08c2d&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'cove lighting room' },
  { id: 'light-pendant', name: 'Pendant Light(s)', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375960954302496799/Bathroom_Pendant_Light.png?ex=683396ff&is=6832457f&hm=b366df8d7df3b6919381049a029e1b08d1b81aa8281dd9908b7fd38b85a8bf9b&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'pendant light room' },
  { id: 'light-recessed-cylinder', name: 'Recessed/Cylinder Lighting', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375960955074084924/Recessed_or_Cylinder_Light.png?ex=683396ff&is=6832457f&hm=43f16488c9a19304575e1f5125e924527c7034e036f00e66671c0ab8c6f90789&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'recessed lighting room' },
  { id: 'light-track', name: 'Track Lighting', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'track lighting room' },
  { id: 'light-wallsconce', name: 'Wall Sconce(s)', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375960954688503909/Bathroom_Wall_Sconce_Light_.png?ex=683396ff&is=6832457f&hm=50647836e4989e0dd1c51ead974f585aa673a9d8dfd137602586a589c2c51617&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'wall sconce room' },
  { id: 'light-niche', name: 'Niche/Under Cabinet Lighting', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375960953307365489/Niche_Lighting_or_Under_Cabinet_Lighting.png?ex=683396ff&is=6832457f&hm=1dd86d84b26578ac4272bb0751f66c7e35b15674e2f66356b1e1ae4df702660e&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'niche lighting under cabinet' },
].sort((a, b) => a.name.localeCompare(b.name));


// Bathroom Specific Options
export interface BathroomMasterBathTubOption extends BaseSelectionItem {}
export const bathroomMasterBathTubOptions: BathroomMasterBathTubOption[] = [
  { id: 'bm-tub-alcove', name: 'Alcove', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169924974247987/Bathroom_Alcove_Tub.png?ex=6830b64b&is=682f64cb&hm=6481cd8fa84c74a57b801c536e835d4d4c33498d0a92ca45a282e292181a0886&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'alcove bathtub' },
  { id: 'bm-tub-freestanding', name: 'Freestanding', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169925863682139/Bathroom_Freestanding_Tub.png?ex=6830b64b&is=682f64cb&hm=b9537512c074bbdf2d1b70dd6fd2d066210a6e370a857255344bca54b7e7f806&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'freestanding bathtub' },
  { id: 'bm-tub-jacuzzi', name: 'Jacuzzi/Whirlpool', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169926136299600/Bathroom_Jacuzzi_Tub.png?ex=6830b64b&is=682f64cb&hm=0cf22a01a72fd0292e43e1a1f29127662b067dd0ae6d423581424905269f9d71&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'jacuzzi bathtub' },
  { id: 'bm-tub-no', name: 'No Bathtub', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'no bathtub' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomMasterShowerOption extends BaseSelectionItem {}
export const bathroomMasterShowerOptions: BathroomMasterShowerOption[] = [
  { id: 'bm-shower-frameless', name: 'Frameless Glass', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375181278623170620/Bathroom_Frameless_Glass_Shower.png?ex=6830c0b1&is=682f6f31&hm=0b3a17954e2331e854139202f06d0e486a6296dd4e05b6a6a87e60665e177295&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'frameless glass shower' },
  { id: 'bm-shower-walkin', name: 'Walk-In Shower', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375181279000690778/Bathroom_Walk-In_Shower.png?ex=6830c0b1&is=682f6f31&hm=3c36a61deac41851807d318f2e5cc7ac8103e622c89519a2e709c0593d15e29f&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'walk in shower' },
  { id: 'bm-shower-wetroom', name: 'Wet Room Style', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375181279420284959/Bathroom_Wet_Room_Shower.png?ex=6830c0b1&is=682f6f31&hm=350c289f0a48707cc27944e50365c9e646443c2b1617d605a09665f61d2286a1&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'wet room shower' },
  { id: 'bm-shower-no', name: 'No Separate Shower', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'no shower' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomMasterSinkOption extends BaseSelectionItem {}
export const bathroomMasterSinkOptions: BathroomMasterSinkOption[] = [
  { id: 'bm-sink-console-s', name: 'Console Sink', imageUrl: 'https://media.discordapp.net/attachments/1374539386368167948/1374541051578024126/Console.png?ex=682e6c9c&is=682d1b1c&hm=9d427df1e7f3690029dd359522e2359d172c7fa8603e20f8cc5b32b1568523f5&=&format=webp&quality=lossless&width=1242&height=1242', dataAiHint: 'console sink bathroom' },
  { id: 'bm-sink-pedestal-s', name: 'Pedestal Sink', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169925398855740/Bathroom_Pedestal_Sink.png?ex=6830b64b&is=682f64cb&hm=18d41acbb8d6906f0a02879fd3a6df35a9e11fd6f31118021371f63b36502ba2&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'pedestal sink bathroom' },
  { id: 'bm-sink-undermount-s', name: 'Undermount Sink', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'undermount sink bathroom' },
  { id: 'bm-sink-vessel-s', name: 'Vessel Sink', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169926527975434/Bathroom_Vessel_Sink.png?ex=6830b64b&is=682f64cb&hm=1214b2ee0dade3fc7266cc4d46528f46deff43697c36f30ae531a96ff361fec1&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'vessel sink bathroom' },
  { id: 'bm-sink-wallmount-s', name: 'Wall-Mounted Sink', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169926934958090/Bathroom_Wall-Mounted_Sink.png?ex=6830b64c&is=682f64cc&hm=5c7250cd7582bac748cba56f1bb8b387fc7d3c522ccec7ac91514e0bb9c944f5&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'wall mounted sink bathroom' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomToiletOption extends BaseSelectionItem {}
export const bathroomToiletOptions: BathroomToiletOption[] = [
  { id: 'bath-toilet-wallhung', name: 'Wall-Hung Toilet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'wall hung toilet' },
  { id: 'bath-toilet-onepiece', name: 'One-Piece Toilet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'one piece toilet' },
  { id: 'bath-toilet-twopiece', name: 'Two-Piece Toilet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'two piece toilet' },
  { id: 'bath-toilet-smart', name: 'Smart Toilet with Bidet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'smart toilet bidet' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomHardwareFinishOption extends BaseSelectionItem {}
export const bathroomHardwareFinishOptions: BathroomHardwareFinishOption[] = [
  { id: 'bath-hardware-black', name: 'Black', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375593364006768781/Black_Hardware.png?ex=683240a7&is=6830ef27&hm=2830262b856fec603120b88cb07c27452edc82780ab79caf86d652471a1d5d97&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'black bathroom hardware' },
  { id: 'bath-hardware-bronze', name: 'Bronze/Brass', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375593364631715943/Bronze_Hardware.png?ex=683240a7&is=6830ef27&hm=4177f52f28623de71d59273380346486ac2f323d210ca099cbdf73c2cf0495a6&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'bronze bathroom hardware' },
  { id: 'bath-hardware-chrome', name: 'Chrome/Nickel', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375593367009759232/Silver_Hardware.png?ex=683240a7&is=6830ef27&hm=4b853e37738ebd330e34b376f4d4d032f74084545ad48f8b74462adf52e428bb&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'chrome bathroom hardware' },
  { id: 'bath-hardware-gold', name: 'Gold', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375593365873361007/Gold_Hardware.png?ex=683240a7&is=6830ef27&hm=cf59ab4c6a8e1bf89f27596e18c6a533076880f70492ace8b64a34bc3ed9daed&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'gold bathroom hardware' },
  { id: 'bath-hardware-handleless', name: 'Handleless or Flat', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375593366443790386/Handleless_or_No_Hardware.png?ex=683240a7&is=6830ef27&hm=957398c15f7ebb285eacbd669aa86946b470c9d69495b1f21cb1acaf02c79b7e&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'handleless bathroom' },
  { id: 'bath-hardware-multitone', name: 'Multi-Tone or Abstract', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375593367404019904/Two-Tone_Hardware_1.png?ex=683240a8&is=6830ef28&hm=15dc307d7eddf30c8b6e2a3460233c3290780601a16440f3bc0e799abc2e4d54&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'multitone bathroom hardware' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomStorageOption extends BaseSelectionItem {}
export const bathroomStorageOptions: BathroomStorageOption[] = [
  { id: 'bath-store-customvanity', name: 'Custom Vanity', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'custom bathroom vanity' },
  { id: 'bath-store-floating', name: 'Floating Shelves', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'floating bathroom shelves' },
  { id: 'bath-store-medicine', name: 'Medicine Cabinet', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'medicine cabinet' },
  { id: 'bath-store-recessed', name: 'Recessed Niche', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'recessed bathroom niche' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomHalfSinkOption extends BaseSelectionItem {}
export const bathroomHalfSinkOptions: BathroomHalfSinkOption[] = [
  { id: 'bh-sink-console', name: 'Console Sink', imageUrl: 'https://media.discordapp.net/attachments/1374539386368167948/1374541051578024126/Console.png?ex=682e6c9c&is=682d1b1c&hm=9d427df1e7f3690029dd359522e2359d172c7fa8603e20f8cc5b32b1568523f5&=&format=webp&quality=lossless&width=1242&height=1242', dataAiHint: 'console sink half bath' },
  { id: 'bh-sink-pedestal', name: 'Pedestal Sink', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169925398855740/Bathroom_Pedestal_Sink.png?ex=6830b64b&is=682f64cb&hm=18d41acbb8d6906f0a02879fd3a6df35a9e11fd6f31118021371f63b36502ba2&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'pedestal sink half bath' },
  { id: 'bh-sink-undermount', name: 'Undermount Sink', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'undermount sink half bath' },
  { id: 'bh-sink-vessel', name: 'Vessel Sink', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169926527975434/Bathroom_Vessel_Sink.png?ex=6830b64b&is=682f64cb&hm=1214b2ee0dade3fc7266cc4d46528f46deff43697c36f30ae531a96ff361fec1&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'vessel sink half bath' },
  { id: 'bh-sink-wallmount', name: 'Wall-Mounted Sink', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169926934958090/Bathroom_Wall-Mounted_Sink.png?ex=6830b64c&is=682f64cc&hm=5c7250cd7582bac748cba56f1bb8b387fc7d3c522ccec7ac91514e0bb9c944f5&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'wall sink half bath' },
].sort((a, b) => a.name.localeCompare(b.name));


// Bedroom Options
export interface BedroomWardrobeOption extends BaseSelectionItem {}
export const bedroomWardrobeOptions: BedroomWardrobeOption[] = [
  { id: 'bed-wardrobe-freestanding', name: 'Freestanding Wardrobe', imageUrl: 'https://placehold.co/400x300.png', description: 'A standalone wardrobe unit.', dataAiHint: 'freestanding wardrobe' },
  { id: 'bed-wardrobe-fitted', name: 'Fitted Wardrobe', imageUrl: 'https://placehold.co/400x300.png', description: 'Built-in wardrobe, custom fit.', dataAiHint: 'fitted wardrobe' },
  { id: 'bed-wardrobe-walkin', name: 'Walk-in Closet', imageUrl: 'https://placehold.co/400x300.png', description: 'A small room for clothes storage.', dataAiHint: 'walk in closet' },
  { id: 'bed-wardrobe-open', name: 'Open Wardrobe System', imageUrl: 'https://placehold.co/400x300.png', description: 'Shelves and rails without doors.', dataAiHint: 'open wardrobe' },
].sort((a, b) => a.name.localeCompare(b.name));


// Utility/Laundry Room Options
export interface UtilityWasherDryerLayoutOption extends BaseSelectionItem {}
export const utilityWasherDryerLayoutOptions: UtilityWasherDryerLayoutOption[] = [
  { id: 'util-wd-stacked', name: 'Stacked', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'stacked washer dryer' },
  { id: 'util-wd-side', name: 'Side-by-Side', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'side by side washer dryer' },
  { id: 'util-wd-allinone', name: 'All-In-One Combo', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'combo washer dryer' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface UtilityStorageOption extends BaseSelectionItem {}
export const utilityStorageOptions: UtilityStorageOption[] = [
  { id: 'util-store-cabinets', name: 'Cabinets (Upper/Lower)', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'laundry room cabinets' },
  { id: 'util-store-shelving', name: 'Open Shelving', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'laundry room shelving' },
  { id: 'util-store-drying', name: 'Drying Rack/Rod', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'laundry drying rack' },
  { id: 'util-store-sink', name: 'Utility Sink', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'utility sink laundry' },
].sort((a, b) => a.name.localeCompare(b.name));


// Living Room Options
export interface LivingRoomStorageOption extends BaseSelectionItem {}
export const livingRoomStorageOptions: LivingRoomStorageOption[] = [
  { id: 'lr-store-builtins', name: 'Built-In Units', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'living room builtins' },
  { id: 'lr-store-console', name: 'Console/Media Unit', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'living room media console' },
  { id: 'lr-store-shelving', name: 'Bookcases/Shelving', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'living room bookcase' },
  { id: 'lr-store-ottoman', name: 'Storage Ottoman/Bench', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'storage ottoman living room' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface LivingRoomFireplaceOption extends BaseSelectionItem {}
export const livingRoomFireplaceOptions: LivingRoomFireplaceOption[] = [
  { id: 'lr-fire-traditional', name: 'Traditional (Wood/Gas)', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'traditional fireplace' },
  { id: 'lr-fire-electric', name: 'Electric', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'electric fireplace' },
  { id: 'lr-fire-wallmount', name: 'Wall-Mounted', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'wall mount fireplace' },
  { id: 'lr-fire-no', name: 'No Fireplace', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'no fireplace' },
].sort((a, b) => a.name.localeCompare(b.name));


// Home Office Options
export interface HomeOfficeStorageOption extends BaseSelectionItem {}
export const homeOfficeStorageOptions: HomeOfficeStorageOption[] = [
  { id: 'ho-store-bookcase', name: 'Bookcases', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'office bookcase' },
  { id: 'ho-store-cabinets', name: 'Filing Cabinets', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'office filing cabinet' },
  { id: 'ho-store-shelving', name: 'Wall Shelving', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'office wall shelves' },
  { id: 'ho-store-desk', name: 'Desk with Integrated Storage', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'office desk storage' },
].sort((a, b) => a.name.localeCompare(b.name));


// Hallway Options
export interface HallwayStorageOption extends BaseSelectionItem {}
export const hallwayStorageOptions: HallwayStorageOption[] = [
  { id: 'hall-store-console', name: 'Console Table', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'hallway console table' },
  { id: 'hall-store-hooks', name: 'Coat Hooks/Rack', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'hallway coat rack' },
  { id: 'hall-store-bench', name: 'Storage Bench', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'hallway storage bench' },
  { id: 'hall-store-shelves', name: 'Narrow Shelving Unit', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'hallway narrow shelves' },
].sort((a, b) => a.name.localeCompare(b.name));

