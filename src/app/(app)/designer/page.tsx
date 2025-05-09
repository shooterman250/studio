
"use client";

import CategoryAccordion from "@/components/design/CategoryAccordion";
import type { Category } from "@/types";
import { useDesignProgress, type DesignStageKey, type SelectedDataItem } from "@/contexts/DesignProgressContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
// Icon components are now handled within CategoryAccordion or a similar client component

// Sample Data - In a real app, this would come from an API or state management
const sampleCategories: Category[] = [
  {
    id: "furniture",
    name: "Furniture Selection",
    icon: "Sofa", 
    description: "Choose the main furniture pieces for your room.",
    options: [
      { id: "sofa-1", name: "Modern Velvet Sofa", description: "A plush velvet sofa with clean lines.", imageUrl: "https://picsum.photos/seed/sofa1/400/300", tags: ["sofa", "modern", "living room"], price: 899.99, dataAiHint: "modern velvet sofa" },
      { id: "armchair-1", name: "Leather Wingback Chair", description: "Classic leather armchair for a cozy corner.", imageUrl: "https://picsum.photos/seed/armchair1/400/300", tags: ["armchair", "classic", "leather"], price: 450.00, dataAiHint: "leather wingback chair" },
      { id: "bed-1", name: "King Size Platform Bed", description: "Minimalist platform bed with wooden frame.", imageUrl: "https://picsum.photos/seed/bed1/400/300", tags: ["bed", "bedroom", "minimalist"], price: 600.00, dataAiHint: "king platform bed" },
      { id: "table-1", name: "Round Dining Table", description: "Seats 4, perfect for small spaces.", imageUrl: "https://picsum.photos/seed/table1/400/300", tags: ["table", "dining", "round"], price: 320.00, dataAiHint: "round dining table" },
    ],
  },
  {
    id: "lighting",
    name: "Lighting Fixtures",
    icon: "Lamp", 
    description: "Illuminate your space with stylish lighting options.",
    options: [
      { id: "lamp-1", name: "Industrial Floor Lamp", description: "Adjustable floor lamp with a metal shade.", imageUrl: "https://picsum.photos/seed/lamp1/400/300", tags: ["lamp", "industrial", "floor lamp"], price: 120.50, dataAiHint: "industrial floor lamp" },
      { id: "pendant-1", name: "Geometric Pendant Light", description: "Modern pendant light for over a dining table.", imageUrl: "https://picsum.photos/seed/pendant1/400/300", tags: ["pendant", "modern", "dining light"], price: 85.00, dataAiHint: "geometric pendant light" },
    ],
  },
  {
    id: "colors",
    name: "Wall Colors & Accents",
    icon: "Palette", 
    description: "Select paint colors and accent wall treatments.",
    options: [
      { id: "paint-1", name: "Soothing Sage Green", description: "A calming green for main walls.", imageUrl: "https://picsum.photos/seed/paint1/400/300?color=sage", tags: ["paint", "green", "wall color"], price: 45.00, dataAiHint: "sage green paint" },
      { id: "wallpaper-1", name: "Botanical Print Wallpaper", description: "Elegant wallpaper for an accent wall.", imageUrl: "https://picsum.photos/seed/wallpaper1/400/300?pattern=botanical", tags: ["wallpaper", "botanical", "accent wall"], price: 70.00, dataAiHint: "botanical wallpaper" },
    ],
  },
  {
    id: "decor",
    name: "Decorative Items",
    icon: "PaintRoller", 
    description: "Add personality with rugs, curtains, and art.",
    options: [
      { id: "rug-1", name: "Abstract Area Rug", description: "Colorful rug to tie the room together.", imageUrl: "https://picsum.photos/seed/rug1/400/300", tags: ["rug", "abstract", "colorful"], price: 250.00, dataAiHint: "abstract area rug" },
      { id: "curtains-1", name: "Linen Curtains", description: "Light and airy linen curtains.", imageUrl: "https://picsum.photos/seed/curtains1/400/300", tags: ["curtains", "linen", "window"], price: 90.00, dataAiHint: "linen curtains" },
    ],
  },
];

const stageDisplayNames: Record<DesignStageKey, string> = {
  "overall-budget": "Overall Budget",
  "overall-style": "Overall Style & Key Elements",
  "kitchen": "Kitchen",
  "utility-laundry-room": "Utility/Laundry Room",
  "living-room": "Living Room",
  "bedroom": "Bedroom(s)",
  "bathroom": "Bathroom(s)",
  "home-office": "Home Office",
  "hallways": "Hallway(s)",
  "decor": "Decor & Lighting",
  "finishes": "Colors & Finishes",
  "summary": "Summary", 
};

const SelectedItemDisplay = ({ item }: { item: SelectedDataItem }) => (
  <div className="flex items-start gap-3 p-3 border-b border-border/30 last:border-b-0 hover:bg-muted/20 transition-colors">
    {item.imageUrl && (
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={60} 
        height={45} 
        className="rounded-md object-cover aspect-[4/3] shadow-sm"
        data-ai-hint={item.dataAiHint || item.name.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(' ').slice(0,2).join(' ')}
      />
    )}
    <div className="flex-1">
      <p className="font-semibold text-sm text-card-foreground">{item.name}</p>
      {item.description && !item.value && <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>}
      {item.value !== undefined && (
         <p className="text-sm text-primary font-medium">
           {typeof item.value === 'number' ? `$${item.value.toLocaleString()}` : String(item.value)}
         </p>
      )}
    </div>
  </div>
);

const StageSelectionsCard = ({ stageKey, items }: { stageKey: DesignStageKey; items: SelectedDataItem[] }) => {
  if (!items || items.length === 0) return null;

  const displayName = stageDisplayNames[stageKey] || stageKey.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <Card className="bg-card/70 backdrop-blur-lg border border-card-foreground/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-card-foreground/5">
        <CardTitle className="text-xl">{displayName}</CardTitle>
        <CardDescription>Your selections for this stage.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        {items.length > 3 ? (
           <ScrollArea className="h-[210px]"> {/* Adjusted height for ~3 items visible + scroll */}
            <div className="divide-y divide-border/30">
              {items.map((item) => (
                <SelectedItemDisplay key={item.id || item.name} item={item} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="divide-y divide-border/30">
            {items.map((item) => (
              <SelectedItemDisplay key={item.id || item.name} item={item} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};


export default function DesignerPage() {
  const { getAllSelections } = useDesignProgress();
  const allSelections = getAllSelections();

  const activeStages = Object.entries(allSelections)
    .filter(([stageKey, items]) => stageKey !== "summary" && items.length > 0);
    
  return (
    <div 
      className="relative min-h-full p-4 md:p-8 bg-background text-foreground"
    >
      <div className="relative z-[1] isolate">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Interactive Room Designer
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
            Welcome! Start by selecting options from the categories below to visualize your perfect room.
            Use the sidebar to navigate through different stages of your design.
          </p>
        </header>

        <section className="max-w-5xl mx-auto">
          <CategoryAccordion categories={sampleCategories} />
        </section>

        <section className="mt-16 max-w-7xl mx-auto space-y-12">
          {activeStages.length > 0 ? (
            <>
              <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">
                Your Design Selections Overview
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {activeStages.map(([stageKey, items]) => (
                  <StageSelectionsCard key={stageKey} stageKey={stageKey as DesignStageKey} items={items} />
                ))}
              </div>
            </>
          ) : (
            <div className="mt-12 p-8 bg-card/60 backdrop-blur-lg border border-card-foreground/10 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-semibold mb-4 text-card-foreground">No Selections Yet</h2>
              <p className="text-muted-foreground">
                Your chosen design elements will appear here as you make selections in each category. 
                Navigate through the sidebar to customize different aspects of your space.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
