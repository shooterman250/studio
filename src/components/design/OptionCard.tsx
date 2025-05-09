"use client";

import type { DesignOption } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Heart, Info } from "lucide-react";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface OptionCardProps {
  option: DesignOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const OptionCard = ({ option, isSelected, onSelect, onToggleFavorite }: OptionCardProps) => {
  const [isFavorite, setIsFavorite] = useState(option.isFavorite || false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card selection when clicking favorite
    setIsFavorite(!isFavorite);
    onToggleFavorite(option.id);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl bg-card/60 backdrop-blur-lg border-card-foreground/10",
        isSelected && "ring-2 ring-primary shadow-2xl"
      )}
      onClick={() => onSelect(option.id)}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(option.id)}
    >
      <CardHeader className="p-0 relative">
        <Image
          src={option.imageUrl}
          alt={option.name}
          width={400}
          height={300}
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={option.tags.join(' ') || "design item"}
        />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-1">{option.name}</CardTitle>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
            <CardDescription className="text-xs line-clamp-2">{option.description}</CardDescription>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                            <Info className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{option.description}</p>
                        {option.price && <p className="mt-1 font-semibold">Price: ${option.price.toFixed(2)}</p>}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <Button 
          variant={isSelected ? "default" : "outline"} 
          size="sm" 
          onClick={(e) => { e.stopPropagation(); onSelect(option.id); }}
          className="w-full"
        >
          {isSelected ? "Selected" : "Select"}
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleFavoriteToggle} 
                className={cn("ml-2 rounded-full", isFavorite && "text-red-500 hover:text-red-600")}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default OptionCard;
