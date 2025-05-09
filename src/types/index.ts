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

// Sample data for styles
export const designStyles = [
  { id: 'modern', name: 'Modern' },
  { id: 'traditional', name: 'Traditional' },
  { id: 'scandinavian', name: 'Scandinavian' },
  { id: 'bohemian', name: 'Bohemian' },
  { id: 'industrial', name: 'Industrial' },
  { id: 'farmhouse', name: 'Farmhouse' },
];

