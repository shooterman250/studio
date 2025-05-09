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
