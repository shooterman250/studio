
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { bathroomOptionsList } from "@/types";
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";

export default function BathroomPage() {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const { updateProgress } = useDesignProgress();
  const { toast } = useToast();

  const handleOptionChange = (optionId: string) => {
    setSelectedOptions(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(optionId)) {
        newSelected.delete(optionId);
      } else {
        newSelected.add(optionId);
      }
      return newSelected;
    });
  };

  const handleSaveChanges = () => {
    const newProgress = selectedOptions.size > 0 ? 25 : 0;
    updateProgress("bathroom", newProgress);
    
    console.log("Selected bathroom options:", Array.from(selectedOptions));

    toast({
      title: "Bathroom Choices Saved",
      description: `You've selected ${selectedOptions.size} item(s) for the bathroom. Progress updated.`,
    });
  };

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Bathroom Setup
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Select your preferred fixtures and fittings for the bathroom. You can select multiple.
        </p>
      </header>

      <section className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-card/60 backdrop-blur-lg border border-card-foreground/10 shadow-lg">
          <CardHeader>
            <CardTitle>Choose Bathroom Fixtures</CardTitle>
            <CardDescription>Select vanities, showers, tubs, and tiles for your bathroom.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bathroomOptionsList.map((option) => (
                <ItemSelectionCard
                  key={option.id}
                  item={option}
                  isSelected={selectedOptions.has(option.id)}
                  onSelect={handleOptionChange}
                />
              ))}
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button className="w-full md:w-auto" onClick={handleSaveChanges} disabled={selectedOptions.size === 0}>
                Save Bathroom Choices ({selectedOptions.size})
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
