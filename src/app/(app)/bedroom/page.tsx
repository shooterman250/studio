
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { bedroomOptionsList } from "@/types"; // Import bedroom options
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";

export default function BedroomPage() {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const { updateProgress } = useDesignProgress();
  const { toast } = useToast();

  const handleOptionChange = (optionId: string) => {
    setSelectedOptions(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(optionId)) {
        newSelected.delete(optionId);
      } else {
        newSelected.add(optionId); // Allow multiple selections
      }
      return newSelected;
    });
  };

  const handleSaveChanges = () => {
    // Update progress in context for the "furniture" stage
    // Example: 25% progress if at least one option is selected.
    // This can be adjusted based on how many steps are in "Bedroom" selection.
    const newProgress = selectedOptions.size > 0 ? 25 : 0; 
    updateProgress("furniture", newProgress);
    
    console.log("Selected bedroom options:", Array.from(selectedOptions));
    // Here you would typically send this data to a backend or update a global state

    toast({
      title: "Bedroom Choices Saved",
      description: `You've selected ${selectedOptions.size} wardrobe/closet type(s). Progress updated.`,
    });
  };

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Bedroom Setup
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Select your preferred wardrobe or closet type(s) for the bedroom.
        </p>
      </header>

      <section className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-card/60 backdrop-blur-lg border border-card-foreground/10 shadow-lg">
          <CardHeader>
            <CardTitle>Choose Wardrobe/Closet Type(s)</CardTitle>
            <CardDescription>Select the option(s) that best fit your needs and space. You can select multiple.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"> {/* Adjusted grid to lg:grid-cols-2 for 4 items */}
              {bedroomOptionsList.map((option) => (
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
                Save Wardrobe Choice(s) ({selectedOptions.size})
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
