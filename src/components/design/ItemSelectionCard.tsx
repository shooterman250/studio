
"use client";

import type { BaseSelectionItem } from "@/types";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ItemSelectionCardProps {
  item: BaseSelectionItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const ItemSelectionCard = ({ item, isSelected, onSelect }: ItemSelectionCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl bg-card/60 backdrop-blur-lg border-card-foreground/10 cursor-pointer",
        isSelected && "ring-2 ring-primary shadow-2xl"
      )}
      onClick={() => onSelect(item.id)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect(item.id)}
    >
      <CardHeader className="p-0 relative">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={400}
          height={300}
          className="aspect-[4/3] w-full object-cover"
          data-ai-hint={item.dataAiHint || item.name.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(' ').slice(0,2).join(' ')}
        />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold text-center">{item.name}</CardTitle>
        {item.description && (
            <p className="text-xs text-muted-foreground mt-1 text-center line-clamp-2">{item.description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ItemSelectionCard;
