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
  { id: 'biophilic', name: 'Biophilic', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380381128191643799/Overall_Style__Biophilic_.png?ex=6843ab9b&is=68425a1b&hm=dff5372c5b88b77398211548cedb4d593903b04d8373c1017604f3f827736599&=&format=webp&quality=lossless&width=1174&height=1174', description: 'Nature-inspired, with natural elements.', dataAiHint: 'biophilic design interior' },
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
  { id: 'k-cab-arched', name: 'Beadboard', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379968622331428925/Beadboard_Cabinet.png?ex=68422b6e&is=6840d9ee&hm=e885dad6aea26bc7a47595d49fa537152d6966d872fd5a9f5f59fb7685dc35f4&=&format=webp&quality=lossless&width=1174&height=1174', dataAiHint: 'arched kitchen cabinet' },
  { id: 'k-cab-flat', name: 'Flat Panel', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379969399913451691/Flat_Panel_Cabinet.png?ex=68422c27&is=6840daa7&hm=e8810449c1090d17de71140ba61499166dc5a0f5686b91bdaa30349c3df227b4&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'flat panel kitchen' },
  { id: 'k-cab-glass', name: 'Glass Front', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379969399531896922/Glass_Front_Cabinet.png?ex=68422c27&is=6840daa7&hm=6cd3c94f77f89c6574d5670bc78c669c3b5f72aee7a4acb415b4e44314723b27&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'glass kitchen cabinet' },
  { id: 'k-cab-open', name: 'Open Shelving', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379969399150346330/Open_Shelving_Kitchen_Cabinet.png?ex=68422c27&is=6840daa7&hm=1aa67981130f33e8f7a293566259ea6a38d9b6b8f26907613b043d305445f369&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'open kitchen shelving' },
  { id: 'k-cab-raised', name: 'Raised Panel', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379969398747562055/Raised_Panel_Cabinet.png?ex=68422c27&is=6840daa7&hm=d7555406628a1a4e607ef1609cf313cf886c07dc9d5090d23bc5367d18e6e81d&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'raised panel kitchen' },
  { id: 'k-cab-shaker', name: 'Shaker', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379969400404443236/Shaker_Cabinet.png?ex=68422c27&is=6840daa7&hm=d7f92f0fb0780f447c8d45c0b766d6528a715659c088508aa317e44c5ef2d753&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'shaker kitchen cabinet' },
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
    { id: 'k-sink-dropin', name: 'Drop-In (Top-Mount)', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1376292333812842626/Drop-In.png?ex=6840005e&is=683eaede&hm=3be19db686d08990c63b6a65d7a86db5eb4705f849991f378a490efbc16d9af8&=&format=webp&quality=lossless&width=1310&height=1310', dataAiHint: 'drop in kitchen sink' },
    { id: 'k-sink-farmhouse', name: 'Farmhouse', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1376292334223888426/Farmhouse.png?ex=6840005e&is=683eaede&hm=27f86e004526a189b95bacca2263312145d06bde047e373d1dc40e2f8870270e&=&format=webp&quality=lossless&width=1310&height=1310', dataAiHint: 'farmhouse kitchen sink' },
    { id: 'k-sink-undermount', name: 'Undermount', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1376292334630866975/Undermount_.png?ex=6840005e&is=683eaede&hm=325a6e6e2912a4d5b9d2127ed848be2140f1ee8316d46d487667ffc44b0c109e&=&format=webp&quality=lossless&width=1310&height=1310', dataAiHint: 'undermount kitchen sink' },
    { id: 'k-sink-workstation', name: 'Workstation', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1376292335104819260/Workstation.png?ex=6840005e&is=683eaede&hm=db327e23d5e04b38873690b68acca7418aad914fee58d25144db7598da8a76da&=&format=webp&quality=lossless&width=1310&height=1310', dataAiHint: 'workstation kitchen sink' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface KitchenBacksplashOption extends BaseSelectionItem {}
export const kitchenBacksplashOptions: KitchenBacksplashOption[] = [
    { id: 'k-backsplash-stone', name: 'Carved Stone', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512600966070343/Carved_Stone_Kitchen_Backsplash.png?ex=6841d43a&is=684082ba&hm=7ee3ce7e5a8be851893c5eeececaac8254d15bae8f29dfadf7a67cce633507eb&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'carved stone backsplash' },
 { id: 'k-backsplash-glass', name: 'Glass', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512601486037062/Glass_Kitchen_Backsplash_.png?ex=6841d43a&is=684082ba&hm=790d61dca4b0bca4656e2a1784cdc4c55fa4e0ad38d3c9a6285530f848070d5b&=&format=webp&quality=lossless&width=974&height=966', dataAiHint: 'glass backsplash' },
  { id: 'k-backsplash-matching', name: 'Matching Backsplash', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512601913987123/Matching_Backsplash_Worktop_Kitchen_Countertop.png?ex=6841d43a&is=684082ba&hm=93f15586a052005fda44843e7e013727ec8af5ef01054b0411377561ebdb1aab&=&format=webp&quality=lossless&width=966&height=966' },
 { id: 'k-backsplash-painted', name: 'Painted', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512602387808377/Painted_Kitchen_Backsplash.png?ex=6841d43a&is=684082ba&hm=5fd16ac01a98b5c12e0642ecf8f64130822a2222d9b27f3bb88882585e574b2c&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'painted backsplash' },
  { id: 'k-backsplash-stainless', name: 'Stainless Steel', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512603520536626/Stainless_Steel_Kitchen_Backsplash.png?ex=6841d43a&is=684082ba&hm=d3d9319186b98153bb7999bf56140375659d4d7c6a6d604f80ff201e0894ddf7&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'stainless steel backsplash' },
 { id: 'k-backsplash-tile', name: 'Tile', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512603998556180/Tile_Kitchen_Backsplash.png?ex=6841d43a&is=684082ba&hm=b486f14a81a48adc35d79c94dedba127e9223943f3f7d9d4ce527f8fc98edd55&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'tile backsplash' },
].sort((a, b) => a.name.localeCompare(b.name));






// General Options (used across multiple rooms)
export interface GeneralWallFinishOption extends BaseSelectionItem {}
export const generalWallFinishOptions: GeneralWallFinishOption[] = [
  { id: 'wall-brick', name: 'Exposed Brick / Stone Veneer', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512187541913743/Exposed_Brick_Wall.png?ex=68432557&is=6841d3d7&hm=900ced525bd6748ed86741c8642b8ee1a67afbf1bf144dd912850c4613fb85a4&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'exposed brick wall' },
  { id: 'wall-paint', name: 'Paint', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380381828791402558/Paint.png?ex=6843ac42&is=68425ac2&hm=f3e4784a41cbc076c64ff437dc769f2ae1d30d743e854e4436429f90c9bf7ef4&=&format=webp&quality=lossless&width=1174&height=1174', dataAiHint: 'painted wall room' },
  { id: 'wall-paneling', name: 'Paneling (Wood/MDF)', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512189756510408/Wood_Paneling.png?ex=68432558&is=6841d3d8&hm=108b0cb81936e1da44492d9d80fd3c1994bd3f3d323a5eadd4cfbfb361a04885&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'wood paneling wall' },
  { id: 'wall-wallpaper', name: 'Wallpaper', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512189206925352/Wallpaper.png?ex=68432558&is=6841d3d8&hm=bf3f7444fd37f6e0fa5525612d946fb823702c69943dce265c10ac3beb644e0a&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'wallpaper room' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface GeneralFlooringOption extends BaseSelectionItem {}
export const generalFlooringOptions: GeneralFlooringOption[] = [
  { id: 'floor-carpet', name: 'Carpet', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380939629431357660/Carpet_Flooring.png?ex=684eee40&is=684d9cc0&hm=49dacf44f270d22ccbe449fcacd1a3b678278011be62278aaed141d423fdb5f3&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'carpet flooring room' },
  { id: 'floor-concrete', name: 'Concrete', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379212483381821562/Cement_Flooring.png?ex=683f6b38&is=683e19b8&hm=27546ce9b7bc6ced4ff9bfca4c9ab514856a9db5125cf2504ff58f54360055d9&=&format=webp&quality=lossless&width=1310&height=1310', dataAiHint: 'concrete floor room' },
  { id: 'floor-hardwood', name: 'Hardwood', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379212490486845551/Wood_Flooring.png?ex=683f6b3a&is=683e19ba&hm=b618bf4f13672aaa22d211091234d0b4966adaaed766d315d6cc5fde96ef2998&=&format=webp&quality=lossless&width=1310&height=1310', dataAiHint: 'hardwood floor room' },
  { id: 'floor-laminate', name: 'Laminate', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380939628961337464/Laminate_Flooring.png?ex=684eee40&is=684d9cc0&hm=8b74b41178b09be67e53fb4db77456e5430b92618b658e0065adc38b58b1fd3e&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'laminate flooring room' },
  { id: 'floor-stone', name: 'Natural Stone Tile', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379212490038185984/Natural_Stone_Flooring_.png?ex=683f6b3a&is=683e19ba&hm=94a2ae86e298bb52229e099ecc9a119fcd3145db2a0e1d223de862be8ee5aa76&=&format=webp&quality=lossless&width=1310&height=1310', dataAiHint: 'stone tile floor' },
  { id: 'floor-marble', name: 'Marble', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380684986016858182/Marble_Flooring.png?ex=6844c698&is=68437518&hm=56430b897db14e6de3f587885c79e916c2d2e940beb7a46322f7dba96f9a1e62&=&format=webp&quality=lossless&width=1174&height=1174', dataAiHint: 'tile floor room' },
  { id: 'floor-vinyl', name: 'Luxury Vinyl', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380939628458148050/Luxury_Vinyl_Flooring.png?ex=684eee40&is=684d9cc0&hm=ba366f2bb3e8a0782f1765a203c55ce623967993518276f604df878ca36ea790&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'vinyl floor room' },
  { id: 'floor-bamboo', name: 'Bamboo', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383552456688140519/Bamboo_Flooring.png?ex=684f3522&is=684de3a2&hm=c98a9c9cc3dd75789aa911b748f0666900a8e3ac6a2a3078075b89059de4bc1e&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'bamboo floor' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface GeneralLightingOption extends BaseSelectionItem {}

export const generalLightingOptions: GeneralLightingOption[] = [
  {
    id: 'light-chandelier',
    name: 'Chandelier(s)',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383582128763310201/Chandelier_Statement_Light.png?ex=684f50c5&is=684dff45&hm=607307e72ee3f645fcd404eca1bc56fdd3a569a09ff832440990951863a023f0&=&format=webp&quality=lossless&width=1174&height=1174',
    dataAiHint: 'chandelier lighting room',
  },
  {
    id: 'light-pendant',
    name: 'Pendant Light(s)',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383583432038158490/Pendant_Lighting_.png?ex=684f51fb&is=684e007b&hm=d73c22534451ebecbb36d9e0f2d5ed6fa47e3eb8af88e0009e3c93d8953fc35c&=&format=webp&quality=lossless&width=1174&height=1174',
    dataAiHint: 'pendant light room',
  },
  {
    id: 'light-cylinder',
    name: 'Cylinder Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383581231232319538/Cylinder_Lighting_.png?ex=684f4fef&is=684dfe6f&hm=341393e32506180d9a92661e504cf75f6c9ec2bf8379ce2aa7c623e7173e2ba3&=&format=webp&quality=lossless&width=966&height=966',
    dataAiHint: 'cylinder lighting room',
  },
  {
    id: 'light-recessed',
    name: 'Recessed Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383581232801124452/Recessed_Lighting.png?ex=684f4fef&is=684dfe6f&hm=e4a507ad2745d790d0212c95a506e1a9270704b854a686b38508d642764f39c6&=&format=webp&quality=lossless&width=966&height=966',
    dataAiHint: 'recessed lighting room',
  },
  {
    id: 'light-wallsconce',
    name: 'Wall Sconce(s)',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383581233262362814/Wall_Sconce_Lighting.png?ex=684f4fef&is=684dfe6f&hm=73ce983263514ea42edb988314d31c4186ed1b266ea19d36f222651f4b01b0e6&=&format=webp&quality=lossless&width=966&height=966',
    dataAiHint: 'wall sconce room',
  },
  {
    id: 'light-niche',
    name: 'Niche Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383581232000008262/Niche_Lighting.png?ex=684f4fef&is=684dfe6f&hm=1fc0f0177f810657e89cb0fcd2deee796b27eba8338c8b050749ceb7aa8c4b29&=&format=webp&quality=lossless&width=966&height=966',
    dataAiHint: 'niche lighting under cabinet',
  },
  {
    id: 'light-under-cabinet',
    name: 'Under Cabinet Or Shelf Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1384651610780864582/Under_Cabinet_Kitchen_Lighting_.png?ex=685334cd&is=6851e34d&hm=3eb9fbbb15de59be4db80c04813eccf1a76c4c7e5c3ffd1b0dfde2aa3078581b&=&format=webp&quality=lossless&width=1518&height=1518',
    dataAiHint: 'under cabinet lighting shelf kitchen',
  },
  {
    id: 'light-toe-kick',
    name: 'Toe-Kick Lighting',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1384606995511771329/Toe-Kick_Lighting_.png?ex=68530b40&is=6851b9c0&hm=129cbd581fdd14c149a167471beb207118b7af14676413d33486e1072deac4d0&=&format=webp&quality=lossless&width=1310&height=1310',
    dataAiHint: 'toe-kick lighting floor base',
  },
].sort((a, b) => a.name.localeCompare(b.name));


// Bathroom Specific Options
export interface BathroomMasterBathTubOption extends BaseSelectionItem {}

export const bathroomMasterBathTubOptions: BathroomMasterBathTubOption[] = [
  { id: 'bm-tub-alcove', name: 'Alcove', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807233942687804/Alcove.png?ex=68500270&is=684eb0f0&hm=e3a4a0057976ff1eeaecc5ea24331ac45f2f89b10cc62cdb547738be31ae2569&=&format=webp&quality=lossless&width=968&height=968', dataAiHint: 'alcove bathtub' },
  { id: 'bm-tub-corner', name: 'Corner', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807240997507113/Corner_.png?ex=68500272&is=684eb0f2&hm=f32d86671e2e0d88524aac5006a194614719cabc1e6270dbe79f3fd0537d1a6d&=&format=webp&quality=lossless&width=968&height=968', dataAiHint: 'corner bathtub' },
  { id: 'bm-tub-clawfoot', name: 'Claw Foot', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807240498253865/Clawfoot.png?ex=68500272&is=684eb0f2&hm=4553967779362772f56df76bbe4a38a250602fa16949ccf59a211582176d79ff&=&format=webp&quality=lossless&width=968&height=968', dataAiHint: 'clawfoot bathtub' },
  { id: 'bm-tub-dropin', name: 'Drop-In', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807241781706834/Drop-In.png?ex=68500272&is=684eb0f2&hm=682ffae85786eadf1b64a1e4ed4bb9c168ce54f296ba32d3001ba26463bd26e4&=&format=webp&quality=lossless&width=968&height=968', dataAiHint: 'drop-in bathtub' },
  { id: 'bm-tub-freestanding', name: 'Freestanding', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807242289352745/Freestanding.png?ex=68500272&is=684eb0f2&hm=bba0e4354f0743df63d6ee45aaa01283ff70ad84e2c3d9dabf27439b41b4e95d&=&format=webp&quality=lossless&width=968&height=968', dataAiHint: 'freestanding bathtub' },
  { id: 'bm-tub-jacuzzi', name: 'Jacuzzi/Whirlpool', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807242746269746/Jacuzzi_.png?ex=68500272&is=684eb0f2&hm=1ff9b60c9e9f46412f501761b3136d1e4d0e6e3efc5e3f4a2d0469439ee83a7d&=&format=webp&quality=lossless&width=968&height=968', dataAiHint: 'jacuzzi bathtub' },
  { id: 'bm-tub-accessible', name: 'Accessible', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373807233078526033/Accessible.png?ex=68500270&is=684eb0f0&hm=d18bf9c2bd5caed954b99ce0bb1c351df8febbfd138e5ab2e227d4b4d53d2e21&=&format=webp&quality=lossless&width=968&height=968', dataAiHint: 'accessible' },
].sort((a, b) => a.name.localeCompare(b.name));


export interface BathroomMasterShowerOption extends BaseSelectionItem {}
export const bathroomMasterShowerOptions: BathroomMasterShowerOption[] = [
  { id: 'bm-shower-shower', name: 'Shower/Tub Combo', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383553309104934913/Shower__Bath_Tub_Combo.png?ex=684fdeae&is=684e8d2e&hm=b1543ad96295f2b750dd0e4d5f019b52cf08bb9df49d1a4e1812279b2e2f1570&=&format=webp&quality=lossless&width=968&height=968', dataAiHint: 'shower/tub combo shower' },
  { id: 'bm-shower-walkin', name: 'Walk-In Shower', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1381401776120401930/Walk-In_Shower.png?ex=684ff3e8&is=684ea268&hm=308933c8e1648971bc88ffee0053d0fe8b7bc89e4884cec886f21e09dac72424&=&format=webp&quality=lossless&width=1176&height=1176', dataAiHint: 'walk in shower' },
  { id: 'bm-shower-enclosed', name: 'Enclosed', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1381401551041466400/Enclosed_Shower.png?ex=684ff3b2&is=684ea232&hm=418fc4f38adf0c916c620cedf659e3b88f25c3836a36acf44599137f1e8946f2&=&format=webp&quality=lossless&width=1176&height=1176', dataAiHint: 'enclosed shower' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomMasterSinkOption extends BaseSelectionItem {}
export const bathroomMasterSinkOptions: BathroomMasterSinkOption[] = [
  { id: 'bm-sink-console-s', name: 'Single Console Sink', imageUrl: 'https://media.discordapp.net/attachments/1374539386368167948/1374541051578024126/Console.png?ex=682e6c9c&is=682d1b1c&hm=9d427df1e7f3690029dd359522e2359d172c7fa8603e20f8cc5b32b1568523f5&=&format=webp&quality=lossless&width=1242&height=1242', dataAiHint: 'single console sink bathroom' },
  { id: 'bm-sink-console-d', name: 'Double Console Sink', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380382691106750515/Double_Bathroom_Console_Sinks.png?ex=6843ad0f&is=68425b8f&hm=92348a1f5f91c02867e3780cf5a1dc0522513f33290248d941569daa7a25c181&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'double console sink' },
  { id: 'bm-sink-pedestal-s', name: 'Single Pedestal Sink', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169925398855740/Bathroom_Pedestal_Sink.png?ex=6830b64b&is=682f64cb&hm=18d41acbb8d6906f0a02879fd3a6df35a9e11fd6f31118021371f63b36502ba2&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'pedestal sink bathroom' },
  { id: 'bm-sink-pedestal-d', name: 'Double Pedestal Sink', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380382691521855609/Double_Bathroom_Pedestal_Sinks.png?ex=6843ad0f&is=68425b8f&hm=8ecc0b70d63430ca09e956136525f3446fd2bc3136e0d0fa4a1e649ed1803173&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'double pedestal sink' },
  { id: 'bm-sink-undermount-s', name: 'Single Undermount Sink', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380383956968542280/Bathroom_Undermount_Sink.png?ex=6843ae3d&is=68425cbd&hm=07fc32727282d2e516daeb99c8fb7358a65505b529d7e62e3322f7fd1dfb2763&=&format=webp&quality=lossless&width=1174&height=1174', dataAiHint: 'single undermount sink bathroom' },
  { id: 'bm-sink-undermount-d', name: 'Double Undermount Sink', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380382691915993148/Double_Bathroom_Undermount_Sinks.png?ex=6843ad10&is=68425b90&hm=f0e319badb51c8b88517d128ba39e3dbf0d6b14bee6c613fb36b8aa3a30726a6&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'double undermount sink' },
  { id: 'bm-sink-dropin-s', name: 'Single Drop-In Sink', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380383529816424550/Bathroom_Drop-In_Sink.png?ex=6843add7&is=68425c57&hm=b989fbf917b9ea15df2f27ccd2eb14314d2c5070c1291a59ac6e21a72e72f40f&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'single drop in sink bathroom' },
  { id: 'bm-sink-dropin-d', name: 'Double Drop-In Sink', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380383784884768910/Double_Bathroom_Drop-In_Sinks.jpeg?ex=6843ae14&is=68425c94&hm=0bd973dac5dd5a93001b7bbc5497e1b68f700a2fbbe713782b5baf79cd2615fb&=&format=webp&width=1280&height=1174', dataAiHint: 'double drop in sink' },
  { id: 'bm-sink-vessel-s', name: 'Single Vessel Sink', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169926527975434/Bathroom_Vessel_Sink.png?ex=6830b64b&is=682f64cb&hm=1214b2ee0dade3fc7266cc4d46528f46deff43697c36f30ae531a96ff361fec1&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'single vessel sink bathroom' },
  { id: 'bm-sink-vessel-d', name: 'Double Vessel Sink', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380382692343943189/Double_Bathroom_Vessel_Sinks.png?ex=6843ad10&is=68425b90&hm=cc1d487d41d8cc089ed7b93d9c7721b5d17c0db9e7b6f9165de38eded3cc8035&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'double vessel sink' },
  { id: 'bm-sink-wallmount-s', name: 'Single Wall-Mounted Sink', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169926934958090/Bathroom_Wall-Mounted_Sink.png?ex=6830b64c&is=682f64cc&hm=5c7250cd7582bac748cba56f1bb8b387fc7d3c522ccec7ac91514e0bb9c944f5&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'single wall mounted sink bathroom' },
  { id: 'bm-sink-wallmount-d', name: 'Double Wall-Mounted Sink', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380382692679352402/Double_Bathroom_Wall-Mounted_Sinks.png?ex=6843ad10&is=68425b90&hm=b94632abd3fae45a79bc528da81a1a0292d4d2c1021e5a6b0a94f6604ce1c2aa&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'double wall mounted sink' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomToiletOption extends BaseSelectionItem {}
export const bathroomToiletOptions: BathroomToiletOption[] = [
  { id: 'bath-toilet-wallhung', name: 'Wall-Hung Toilet', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512763230982176/Wall_Hung_Toilet.png?ex=685054e0&is=684f0360&hm=fa9172f71c4102ff54a19237e2410c50216b3cb5fb0d624f314240212c8b5fe5&=&format=webp&quality=lossless&width=968&height=968', dataAiHint: 'wall hung toilet' },
  { id: 'bath-toilet-onepiece', name: 'One-Piece Toilet', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512755119329430/One_Piece_Toilet.png?ex=6844775e&is=684325de&hm=ef12bce13b8564666d73c0af7db6933db3dbe9d9f9579705bf89b1129b60d03e&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'one piece toilet' },
  { id: 'bath-toilet-twopiece', name: 'Two-Piece Toilet', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512762757152859/Two_Piece_Toilet.png?ex=68447760&is=684325e0&hm=a4726e52dc227e3c46cc5fc43c7ab23f9b5e0309d65b25f8491a119535febdc1&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'two piece toilet' },
  { id: 'bath-toilet-bidet', name: 'Toilet with Bidet', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512756209713192/Toilet_With_Bidet.png?ex=6844775f&is=684325df&hm=a1c409978386b79f8f30538fe5c50d4f223e83bfb3cf7336dc0568fc49914f56&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'toilet bidet' },
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
  { id: 'bath-store-under-sink', name: 'Under Sink Storage', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512840972668938/Under-Sink_Bathroom_Storage.png?ex=68447773&is=684325f3&hm=b5fba67691d3f8e46aa79bb32c7298c1e085a8950ae44eb782e4f8a443e3da3e&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'under sink bathroom storage' },
  { id: 'bath-store-built-in', name: 'Built-In Shelving/Cabinets', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512840515358780/Built-In_Bathroom_Shelving_Cabinets.png?ex=68447773&is=684325f3&hm=beb36003deff4822218ae7884baa7292dedd56b84c87006318e3373e7bb8ade0&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'built-in bathroom cabinets/shelving' },
  { id: 'bath-store-medicine', name: 'Medicine Cabinet', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512840054116382/Bathroom_Medicine_Cabinet_Storage_1.png?ex=68447773&is=684325f3&hm=edff89b08a9933700b7bfd4cc228e87038925dbdf8ac0d21ba5ecdd4a11c32f5&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'medicine cabinet' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface BathroomHalfSinkOption extends BaseSelectionItem {}
export const bathroomHalfSinkOptions: BathroomHalfSinkOption[] = [
  { id: 'bh-sink-console', name: 'Console Sink', imageUrl: 'https://media.discordapp.net/attachments/1374539386368167948/1374541051578024126/Console.png?ex=682e6c9c&is=682d1b1c&hm=9d427df1e7f3690029dd359522e2359d172c7fa8603e20f8cc5b32b1568523f5&=&format=webp&quality=lossless&width=1242&height=1242', dataAiHint: 'console sink half bath' },
  { id: 'bh-sink-pedestal', name: 'Pedestal Sink', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169925398855740/Bathroom_Pedestal_Sink.png?ex=6830b64b&is=682f64cb&hm=18d41acbb8d6906f0a02879fd3a6df35a9e11fd6f31118021371f63b36502ba2&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'pedestal sink half bath' },
  { id: 'bh-sink-undermount', name: 'Undermount Sink', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1373814930234540032/Undermount.png?ex=684eb81b&is=684d669b&hm=2f52a3bc296719fe9fe4c9dc276443ce72e1e44457b4eac36c7ed8e7be7bbfd8&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'undermount sink half bath' },
  { id: 'bh-sink-vessel', name: 'Vessel Sink', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169926527975434/Bathroom_Vessel_Sink.png?ex=6830b64b&is=682f64cb&hm=1214b2ee0dade3fc7266cc4d46528f46deff43697c36f30ae531a96ff361fec1&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'vessel sink half bath' },
  { id: 'bh-sink-wallmount', name: 'Wall-Mounted Sink', imageUrl: 'https://media.discordapp.net/attachments/1374799696127721638/1375169926934958090/Bathroom_Wall-Mounted_Sink.png?ex=6830b64c&is=682f64cc&hm=5c7250cd7582bac748cba56f1bb8b387fc7d3c522ccec7ac91514e0bb9c944f5&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'wall sink half bath' },
].sort((a, b) => a.name.localeCompare(b.name));


// Bedroom Options
export interface BedroomWardrobeOption extends BaseSelectionItem {}

export const bedroomWardrobeOptions: BedroomWardrobeOption[] = [
  {
    id: 'bed-wardrobe-freestanding',
    name: 'Freestanding Wardrobe',
    imageUrl: 'https://placehold.co/400x300.png',
    dataAiHint: 'freestanding wardrobe',
  },
  {
    id: 'bed-wardrobe-walkin',
    name: 'Walk-In Closet',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1377374524860923914/Walk-In_Closet.png?ex=683ffbbd&is=683eaa3d&hm=fe6bc6a3d91be2d5d040d263d9b0bd1ffcb4701a33d844f3f6592116926cd7de&=&format=webp&quality=lossless&width=1310&height=1310',
    dataAiHint: 'walk in closet',
  },
  {
    id: 'bed-wardrobe-one-standard',
    name: 'One Standard Door',
    imageUrl: 'https://placehold.co/400x300.png?text=One+Standard+Door',
    dataAiHint: 'one door wardrobe',
  },
  {
    id: 'bed-wardrobe-two-standard',
    name: 'Two Standard Doors',
    imageUrl: 'https://placehold.co/400x300.png?text=Two+Standard+Doors',
    dataAiHint: 'two door wardrobe',
  },
  {
    id: 'bed-wardrobe-custom',
    name: 'Custom Closet',
    imageUrl: 'https://placehold.co/400x300.png?text=Custom+Closet',
    dataAiHint: 'custom closet',
  },
  {
    id: 'bed-wardrobe-bi-fold',
    name: 'Bi-Fold Doors',
    imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512343968485507/Bifold_Doors.png?ex=6843257c&is=6841d3fc&hm=d9277c1b91a87f6af05a7f691d4fb3f0b75c57cd02a3b1d0b40b19bd5eb1de95&=&format=webp&quality=lossless&width=966&height=966',
    dataAiHint: 'bi-fold doors',
  },
  {
    id: 'bed-wardrobe-fitted',
    name: 'Fitted Wardrobe',
    imageUrl: 'https://placehold.co/400x300.png?text=Fitted+Wardrobe',
    dataAiHint: 'fitted wardrobe',
  },
].sort((a, b) => a.name.localeCompare(b.name));



// Utility/Laundry Room Options
export interface UtilityWasherDryerLayoutOption extends BaseSelectionItem {}
export const utilityWasherDryerLayoutOptions: UtilityWasherDryerLayoutOption[] = [
  { id: 'util-wd-stacked', name: 'Stacked', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512693974896710/Stacked_Washer_and_Dryer_.png?ex=684fac10&is=684e5a90&hm=b85eaa0519d8b34f501e0682f572b8c32fcd207a9d421b66925e8f119e504a37&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'stacked washer dryer' },
  { id: 'util-wd-side', name: 'Side-by-Side', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512693542617179/Side-By-Side_Washer_and_Dryer.png?ex=684fac10&is=684e5a90&hm=88062f2b12205965c3094ebccda5e811c9fd5aea0f553c318536de406eb9032f&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'side by side washer dryer' },
  { id: 'util-wd-allinone', name: 'All-In-One Combo', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383917631924469760/All-In-One_Washer_and_Dryer.png?ex=6850893b&is=684f37bb&hm=0b72d3ce8594529445c958805c3cdc4f4314f348830fc35e0699c17529afdc6b&=&format=webp&quality=lossless&width=968&height=968', dataAiHint: 'combo washer dryer' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface UtilityStorageOption extends BaseSelectionItem {}
export const utilityStorageOptions: UtilityStorageOption[] = [
  { id: 'util-store-cabinets', name: 'Custom Cabinets', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383916414129410058/Built-In_Storage_Cabinets.png?ex=68508819&is=684f3699&hm=0fe63c0ba8ff0444a951ff65b22ac5dcdbc169ddf8037dfae84d57e8e72d12a5&=&format=webp&quality=lossless&width=968&height=968', dataAiHint: 'laundry room custom cabinets' },
  { id: 'util-store-freestanding', name: 'Freestanding Cabinets', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383916414594711702/Freestanding_Shelving_.png?ex=68508819&is=684f3699&hm=bebb3af4ab138d8ec4ff417642374bb80f338a8d6e0d801a22e2cd6aea998bc0&=&format=webp&quality=lossless&width=968&height=968', dataAiHint: 'laundry room freestanding cabinets' },
  { id: 'util-store-hidden', name: 'Hidden Hamper', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1383916415161077920/Hidden_Hamper_Laundry_Storage.png?ex=68508819&is=684f3699&hm=4f31f61b55d4f23c82017009b93ff99582bfb3d8221fbc5a99d33c1114f9b583&=&format=webp&quality=lossless&width=968&height=968', dataAiHint: 'laundry room hidden hamper' },
].sort((a, b) => a.name.localeCompare(b.name));


// Living Room Options
export interface LivingRoomStorageOption extends BaseSelectionItem {}
export const livingRoomStorageOptions: LivingRoomStorageOption[] = [
  { id: 'lr-store-builtins', name: 'Built-In Media Console', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1377379936460996710/Built-In_Units_Media.png?ex=684000c7&is=683eaf47&hm=1761903720996f21513871d366e6dee64c5f293c5e298d7525b5185da1efffd8&=&format=webp&quality=lossless&width=1310&height=1310', dataAiHint: 'living room builtins' },
  { id: 'lr-store-alcove', name: 'Alcove Shelving', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512040758181938/Alcove_Shelving.jpg?ex=68432534&is=6841d3b4&hm=4788059d9d56cff885c962d9c9d20454e241aaf3475695c7df21742813bf7b4c&=&format=webp&width=1112&height=1174', dataAiHint: 'living room alcove' },
  { id: 'lr-store-window', name: 'Window/Bench Seating', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512072915779684/Window_Seating_With_Storage_.png?ex=6843253c&is=6841d3bc&hm=5aa8b377e0e67853fb263636d53f84f6a64d9d3385401b901280915436a7d38f&=&format=webp&quality=lossless&width=1174&height=1174', dataAiHint: 'living room window bench seating' },
].sort((a, b) => a.name.localeCompare(b.name));

export interface LivingRoomFireplaceOption extends BaseSelectionItem {}
export const livingRoomFireplaceOptions: LivingRoomFireplaceOption[] = [
  { id: 'lr-fire-gas', name: 'Gas', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512969792065646/Gas.png?ex=68432612&is=6841d492&hm=d7cc0cba0cf12288f63e565beaa3df9fb2d1d0d3342917c502e44115be59793e&=&format=webp&quality=lossless&width=1114&height=966', dataAiHint: 'gas fireplace' },
  { id: 'lr-fire-electric', name: 'Electric', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512969448394974/Electric.png?ex=68432612&is=6841d492&hm=b4c9ddf84f14df8437d78cfab617d6817dd2280abc9b29a3dec5fd415a64c41c&=&format=webp&quality=lossless&width=1170&height=966', dataAiHint: 'electric fireplace' },
  { id: 'lr-fire-wood burning', name: 'Wood Burning', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512969792065646/Gas.png?ex=68432612&is=6841d492&hm=d7cc0cba0cf12288f63e565beaa3df9fb2d1d0d3342917c502e44115be59793e&=&format=webp&quality=lossless&width=1114&height=966', dataAiHint: 'wood burning fireplace' },
  { id: 'lr-fire-no', name: 'No Fireplace', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'no fireplace' },
];


// Home Office Options
export interface HomeOfficeStorageOption extends BaseSelectionItem {}
export const homeOfficeStorageOptions: HomeOfficeStorageOption[] = [
  { id: 'ho-store-bookcase', name: 'Built-In Bookcases', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380999078674038855/Built-In_Bookcase.png?ex=684fce5e&is=684e7cde&hm=4e1c11c2d3267e39b1aee576ccc6c8fc6c5c246d6ace85687d04004253c3215c&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'office built-in bookcase' },
  { id: 'ho-store-desk', name: 'Desk with Integrated Storage', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1380999078292230205/Integrated_Desk_With_Storage.png?ex=684fce5d&is=684e7cdd&hm=360a80ea10c344030a3bab04b0b9998578755b3e6a6e054cc9b13cf4a562f359&=&format=webp&quality=lossless&width=966&height=966', dataAiHint: 'office desk storage' },
].sort((a, b) => a.name.localeCompare(b.name));


// Hallway Options
export interface HallwayStorageOption extends BaseSelectionItem {}
export const hallwayStorageOptions: HallwayStorageOption[] = [
  { id: 'hall-store-console', name: 'Console Table', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'hallway console table' },
  { id: 'hall-store-linen', name: 'Linen Closet', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512503184392266/Hallway_Linen_Closet.png?ex=684fabe2&is=684e5a62&hm=7ae5f469210cb40167f6ccb6b4a282b8f1ed1a8cf46200951f6f36cb5243ddca&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'hallway linen closet' },
  { id: 'hall-store-niche', name: 'Niche Shelving', imageUrl: 'https://media.discordapp.net/attachments/1370568040256901200/1379512503708553226/Hallway_Shelving_.png?ex=684fabe2&is=684e5a62&hm=3efe22305760d0b640524c4ed751fc7e9f37e085c21f2488e0eb341176ad76d9&=&format=webp&quality=lossless&width=998&height=998', dataAiHint: 'hallway niche shelving' },
].sort((a, b) => a.name.localeCompare(b.name));

