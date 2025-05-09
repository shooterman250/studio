"use client";

import type { Category, DesignOption } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import OptionCard from "./OptionCard";
import { useState, useCallback } from "react";
import { Sofa, Lamp, Palette, Ruler, Armchair, Bed, PaintRoller, type LucideIcon, Package } from "lucide-react"; // Example icons

interface CategoryAccordionProps {
  categories: Category[];
}

// Map icon names (strings) to actual LucideIcon components
const iconMap: Record<string, LucideIcon> = {
  Sofa,
  Lamp,
  Palette,
  Ruler,
  Armchair,
  Bed,
  PaintRoller,
  Package, // Default icon if specific one not found
};


const CategoryAccordion = ({ categories }: CategoryAccordionProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string | null>>({}); // { categoryId: optionId }
  const [favoriteOptions, setFavoriteOptions] = useState<string[]>([]);

  const handleSelectOption = useCallback((categoryId: string, optionId: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [categoryId]: prev[categoryId] === optionId ? null : optionId,
    }));
  }, []);

  const handleToggleFavorite = useCallback((optionId: string) => {
    setFavoriteOptions(prev => 
      prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId]
    );
  }, []);

  if (!categories || categories.length === 0) {
    return <p className="text-center text-muted-foreground py-8">No categories available at the moment.</p>;
  }

  return (
    <Accordion type="multiple" className="w-full space-y-4" defaultValue={categories.map(c => c.id).slice(0,1)}>
      {categories.map((category) => {
        const IconComponent = category.icon ? iconMap[category.icon] || iconMap.Package : iconMap.Package; // Fallback to a default icon
        return (
          <AccordionItem value={category.id} key={category.id} className="border bg-card/50 backdrop-blur-md shadow-md rounded-lg overflow-hidden border-card-foreground/10">
            <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
              <div className="flex items-center gap-3">
                {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                <span>{category.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 border-t border-card-foreground/10">
              {category.description && <p className="text-muted-foreground mb-4">{category.description}</p>}
              {category.options.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {category.options.map((option) => (
                    <OptionCard
                      key={option.id}
                      option={{...option, isFavorite: favoriteOptions.includes(option.id)}}
                      isSelected={selectedOptions[category.id] === option.id}
                      onSelect={() => handleSelectOption(category.id, option.id)}
                      onToggleFavorite={() => handleToggleFavorite(option.id)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">No options available in this category yet.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default CategoryAccordion;
