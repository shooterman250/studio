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

// Updated sample data for design styles
export const designStyles = [
  { id: 'biophilic', name: 'Biophilic' },
  { id: 'bohemian', name: 'Bohemian' },
  { id: 'coastal', name: 'Coastal' },
  { id: 'contemporary', name: 'Contemporary' },
  { id: 'country-farmhouse', name: 'Country / Farmhouse' },
  { id: 'industrial', name: 'Industrial' },
  { id: 'japandi', name: 'Japandi' },
  { id: 'mid-century-modern', name: 'Mid-Century Modern' },
  { id: 'modern', name: 'Modern' },
  { id: 'traditional', name: 'Traditional' },
];
