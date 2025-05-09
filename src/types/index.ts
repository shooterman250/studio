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

// Sample data for room types
export const roomTypes = [
  { id: 'living-room', name: 'Living Room' },
  { id: 'bedroom', name: 'Bedroom' },
  { id: 'kitchen', name: 'Kitchen' },
  { id: 'dining-room', name: 'Dining Room' },
  { id: 'office', name: 'Office' },
  { id: 'bathroom', name: 'Bathroom' },
];

export interface BaseSelectionItem {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  dataAiHint?: string;
}

export interface DesignStyle extends BaseSelectionItem {
  // DesignStyle specific properties can go here if any
}

// Updated sample data for design styles
export const designStyles: DesignStyle[] = [
  { 
    id: 'biophilic', 
    name: 'Biophilic', 
    imageUrl: 'https://picsum.photos/seed/biophilic/400/300', 
    description: 'Inspired by nature, emphasizing natural light, vegetation, and organic forms.',
    dataAiHint: 'biophilic interior' 
  },
  { 
    id: 'bohemian', 
    name: 'Bohemian', 
    imageUrl: 'https://picsum.photos/seed/bohemian/400/300', 
    description: 'Free-spirited and eclectic, featuring vibrant colors, patterns, and textures.',
    dataAiHint: 'bohemian decor'
  },
  { 
    id: 'coastal', 
    name: 'Coastal', 
    imageUrl: 'https://picsum.photos/seed/coastal/400/300', 
    description: 'Light, airy, and reminiscent of the beach, with cool colors and natural materials.',
    dataAiHint: 'coastal living'
  },
  { 
    id: 'contemporary', 
    name: 'Contemporary', 
    imageUrl: 'https://picsum.photos/seed/contemporary/400/300', 
    description: 'Focuses on current trends, often with clean lines, neutral palettes, and simplicity.',
    dataAiHint: 'contemporary design'
  },
  { 
    id: 'country-farmhouse', 
    name: 'Country / Farmhouse', 
    imageUrl: 'https://picsum.photos/seed/farmhouse/400/300', 
    description: 'Warm, rustic, and inviting, with vintage elements and natural wood.',
    dataAiHint: 'farmhouse style'
  },
  { 
    id: 'industrial', 
    name: 'Industrial', 
    imageUrl: 'https://picsum.photos/seed/industrial/400/300', 
    description: 'Raw and edgy, showcasing exposed brick, metal, and utilitarian fixtures.',
    dataAiHint: 'industrial loft'
  },
  { 
    id: 'japandi', 
    name: 'Japandi', 
    imageUrl: 'https://picsum.photos/seed/japandi/400/300', 
    description: 'A hybrid of Japanese minimalism and Scandinavian functionality, emphasizing simplicity and craftsmanship.',
    dataAiHint: 'japandi home'
  },
  { 
    id: 'mid-century-modern', 
    name: 'Mid-Century Modern', 
    imageUrl: 'https://picsum.photos/seed/midcentury/400/300', 
    description: 'Characterized by iconic furniture pieces from the mid-20th century, organic shapes, and functionality.',
    dataAiHint: 'midcentury modern'
  },
  { 
    id: 'modern', 
    name: 'Modern', 
    imageUrl: 'https://picsum.photos/seed/modern/400/300', 
    description: 'Sleek and uncluttered, with an emphasis on simplicity, neutral colors, and geometric forms.',
    dataAiHint: 'modern interior'
  },
  { 
    id: 'traditional', 
    name: 'Traditional', 
    imageUrl: 'https://picsum.photos/seed/traditional/400/300', 
    description: 'Classic and timeless, featuring ornate details, rich colors, and symmetrical arrangements.',
    dataAiHint: 'traditional room'
  },
];

export interface BedroomOption extends BaseSelectionItem {
  // BedroomOption specific properties can go here if any
}

export const bedroomOptionsList: BedroomOption[] = [
  {
    id: "wardrobe-bifold",
    name: "Wardrobe/Closet: Bifold Doors",
    imageUrl: "https://picsum.photos/seed/bifoldcloset/400/300",
    description: "Space-saving bifold doors for your wardrobe or closet.",
    dataAiHint: "bifold closet"
  },
  {
    id: "wardrobe-custom",
    name: "Wardrobe/Closet: Custom/Built-In",
    imageUrl: "https://picsum.photos/seed/customcloset/400/300",
    description: "A tailor-made wardrobe or closet integrated into your room.",
    dataAiHint: "built-in wardrobe"
  },
  {
    id: "wardrobe-standard",
    name: "Wardrobe/Closet: One/Two Standard Doors",
    imageUrl: "https://picsum.photos/seed/standardcloset/400/300",
    description: "Classic wardrobe with one or two standard hinged doors.",
    dataAiHint: "standard wardrobe"
  },
  {
    id: "wardrobe-walkin",
    name: "Wardrobe/Closet: Walk-In",
    imageUrl: "https://picsum.photos/seed/walkincloset/400/300",
    description: "A spacious walk-in closet for ample storage.",
    dataAiHint: "walk-in closet"
  },
];


export interface LivingRoomOption extends BaseSelectionItem {}

export const livingRoomOptionsList: LivingRoomOption[] = [
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
  {
    id: "lr-coffee-table",
    name: "Coffee Table",
    imageUrl: "https://picsum.photos/seed/coffeetable/400/300",
    description: "Central table for drinks, books, and decor.",
    dataAiHint: "living coffee table"
  },
  {
    id: "lr-tv-unit",
    name: "TV & Media Unit",
    imageUrl: "https://picsum.photos/seed/tvunit/400/300",
    description: "Stylish storage and display for your entertainment system.",
    dataAiHint: "media unit console"
  },
  {
    id: "lr-accent-chair",
    name: "Accent Chair",
    imageUrl: "https://picsum.photos/seed/accentchairlr/400/300",
    description: "A statement chair to add personality and extra seating.",
    dataAiHint: "accent chair living"
  },
];

export interface KitchenOption extends BaseSelectionItem {}

export const kitchenOptionsList: KitchenOption[] = [
  {
    id: "k-shaker-cabinets",
    name: "Shaker Cabinets",
    imageUrl: "https://picsum.photos/seed/shakercabinets/400/300",
    description: "Classic and versatile cabinet style with a simple, clean look.",
    dataAiHint: "shaker kitchen cabinets"
  },
  {
    id: "k-flat-panel-cabinets",
    name: "Flat-Panel Cabinets",
    imageUrl: "https://picsum.photos/seed/flatpanelcabinets/400/300",
    description: "Modern, minimalist cabinets with smooth, unadorned surfaces.",
    dataAiHint: "modern kitchen cabinets"
  },
  {
    id: "k-quartz-countertops",
    name: "Quartz Countertops",
    imageUrl: "https://picsum.photos/seed/quartzcounter/400/300",
    description: "Durable, low-maintenance engineered stone countertops.",
    dataAiHint: "quartz kitchen countertops"
  },
  {
    id: "k-granite-countertops",
    name: "Granite Countertops",
    imageUrl: "https://picsum.photos/seed/granitecounter/400/300",
    description: "Natural stone countertops known for their unique patterns.",
    dataAiHint: "granite kitchen countertops"
  },
  {
    id: "k-subway-tile-backsplash",
    name: "Subway Tile Backsplash",
    imageUrl: "https://picsum.photos/seed/subwaytile/400/300",
    description: "Timeless rectangular tiles for a clean and classic backsplash.",
    dataAiHint: "subway tile backsplash"
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

export const bathroomOptionsList: BathroomOption[] = [
  {
    id: "b-single-vanity",
    name: "Single Vanity",
    imageUrl: "https://picsum.photos/seed/singlevanity/400/300",
    description: "A compact vanity with one sink, suitable for smaller bathrooms.",
    dataAiHint: "single bathroom vanity"
  },
  {
    id: "b-double-vanity",
    name: "Double Vanity",
    imageUrl: "https://picsum.photos/seed/doublevanity/400/300",
    description: "A larger vanity with two sinks, ideal for shared bathrooms.",
    dataAiHint: "double bathroom vanity"
  },
  {
    id: "b-walk-in-shower",
    name: "Walk-in Shower",
    imageUrl: "https://picsum.photos/seed/walkinshower/400/300",
    description: "A spacious, doorless shower area, often with glass panels.",
    dataAiHint: "walkin shower design"
  },
  {
    id: "b-freestanding-tub",
    name: "Freestanding Tub",
    imageUrl: "https://picsum.photos/seed/freestandingtub/400/300",
    description: "A standalone bathtub that acts as a luxurious focal point.",
    dataAiHint: "freestanding bathtub"
  },
  {
    id: "b-porcelain-tiles",
    name: "Porcelain Tiles",
    imageUrl: "https://picsum.photos/seed/porcelaintiles/400/300",
    description: "Durable and water-resistant tiles for floors and walls.",
    dataAiHint: "porcelain bathroom tiles"
  },
];

export interface FlooringOption extends BaseSelectionItem {}

export const flooringOptionsList: FlooringOption[] = [
  {
    id: "f-hardwood",
    name: "Hardwood Flooring",
    imageUrl: "https://picsum.photos/seed/hardwoodfloor/400/300",
    description: "Classic and durable wood flooring available in various species.",
    dataAiHint: "hardwood room floor"
  },
  {
    id: "f-laminate",
    name: "Laminate Flooring",
    imageUrl: "https://picsum.photos/seed/laminatefloor/400/300",
    description: "Cost-effective and mimics wood, stone, or tile.",
    dataAiHint: "laminate room floor"
  },
  {
    id: "f-vinyl-plank",
    name: "Luxury Vinyl Plank (LVP)",
    imageUrl: "https://picsum.photos/seed/vinylplank/400/300",
    description: "Waterproof and durable, often resembling wood or stone.",
    dataAiHint: "vinyl plank floor"
  },
  {
    id: "f-ceramic-tile",
    name: "Ceramic/Porcelain Tile",
    imageUrl: "https://picsum.photos/seed/tilefloor/400/300",
    description: "Durable and water-resistant, ideal for kitchens and bathrooms.",
    dataAiHint: "ceramic tile floor"
  },
  {
    id: "f-carpet",
    name: "Carpet",
    imageUrl: "https://picsum.photos/seed/carpetfloor/400/300",
    description: "Soft and warm underfoot, available in many styles and colors.",
    dataAiHint: "room carpet texture"
  },
];

export interface WallFinishOption extends BaseSelectionItem {}

export const wallFinishOptionsList: WallFinishOption[] = [
  {
    id: "wf-neutral-paint",
    name: "Neutral Paint Colors",
    imageUrl: "https://picsum.photos/seed/neutralpaint/400/300",
    description: "Versatile shades like beige, gray, or white for a calm backdrop.",
    dataAiHint: "neutral wall paint"
  },
  {
    id: "wf-bold-paint",
    name: "Bold Accent Paint",
    imageUrl: "https://picsum.photos/seed/boldpaint/400/300",
    description: "Vibrant colors to create a focal point or add personality.",
    dataAiHint: "bold accent wall"
  },
  {
    id: "wf-wallpaper-accent",
    name: "Accent Wallpaper",
    imageUrl: "https://picsum.photos/seed/accentwallpaper/400/300",
    description: "Patterned or textured wallpaper for one or more accent walls.",
    dataAiHint: "designer accent wallpaper"
  },
  {
    id: "wf-wood-paneling",
    name: "Wood Paneling / Shiplap",
    imageUrl: "https://picsum.photos/seed/woodpaneling/400/300",
    description: "Adds texture and warmth with wooden planks or panels.",
    dataAiHint: "wood paneling wall"
  },
  {
    id: "wf-exposed-brick",
    name: "Exposed Brick / Stone Veneer",
    imageUrl: "https://picsum.photos/seed/exposedbrick/400/300",
    description: "Creates an industrial or rustic look with brick or stone.",
    dataAiHint: "exposed brick wall"
  },
];
