
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { designStyles } from "@/types";
import StyleSelectionCard from "@/components/design/StyleSelectionCard";
import { useDesignProgress } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";


export default function OverallStylePage() {
  const [selectedStyles, setSelectedStyles] = useState<Set<string>>(new Set());
  const { updateProgress } = useDesignProgress();
  const { toast } = useToast();

  const handleStyleChange = (styleId: string) => {
    setSelectedStyles(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(styleId)) {
        newSelected.delete(styleId);
      } else {
        newSelected.add(styleId);
      }
      return newSelected;
    });
  };

  const handleSaveChanges = () => {
    // Update progress in context
    const newProgress = selectedStyles.size > 0 ? 25 : 0;
    updateProgress("room-setup", newProgress);
    
    console.log("Selected styles:", Array.from(selectedStyles));
    // Here you would typically send this data to a backend or update a global state

    toast({
      title: "Styles Saved",
      description: `You've selected ${selectedStyles.size} style(s). Progress updated.`,
    });
  };

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Overall Style
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Choose one or more design styles that best represent your vision for the room.
        </p>
      </header>

      <section className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-card/60 backdrop-blur-lg border border-card-foreground/10 shadow-lg">
          <CardHeader>
            <CardTitle>Select Your Design Styles</CardTitle>
            <CardDescription>You can pick multiple styles that appeal to you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {designStyles.map((style) => (
                <StyleSelectionCard
                  key={style.id}
                  styleItem={style}
                  isSelected={selectedStyles.has(style.id)}
                  onSelect={handleStyleChange}
                />
              ))}
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button className="w-full md:w-auto" onClick={handleSaveChanges}>
                Save Styles ({selectedStyles.size})
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
