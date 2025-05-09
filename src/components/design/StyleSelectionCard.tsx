
"use client";

import type { DesignStyle } from "@/types";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StyleSelectionCardProps {
  styleItem: DesignStyle;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const StyleSelectionCard = ({ styleItem, isSelected, onSelect }: StyleSelectionCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl bg-card/60 backdrop-blur-lg border-card-foreground/10 cursor-pointer",
        isSelected && "ring-2 ring-primary shadow-2xl"
      )}
      onClick={() => onSelect(styleItem.id)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(styleItem.id)}
    >
      <CardHeader className="p-0 relative">
        <Image
          src={styleItem.imageUrl}
          alt={styleItem.name}
          width={400}
          height={300}
          className="aspect-[4/3] w-full object-cover"
          data-ai-hint={styleItem.dataAiHint || styleItem.name.toLowerCase()}
        />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold text-center">{styleItem.name}</CardTitle>
        {styleItem.description && (
            <p className="text-xs text-muted-foreground mt-1 text-center line-clamp-2">{styleItem.description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StyleSelectionCard;
