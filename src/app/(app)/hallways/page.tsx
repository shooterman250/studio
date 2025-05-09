
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    generalWallFinishOptions as hallwayWallFinishOptions,
    generalFlooringOptions as hallwayFlooringOptions, // Note: Cement is listed, ensure it's in generalFlooringOptions
    generalLightingOptions as hallwayLightingOptions,
    hallwayStorageOptions
} from "@/types";
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";

export default function HallwaysPage() {
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
    updateProgress("hallways", newProgress);
    
    console.log("Selected hallway options:", Array.from(selectedOptions));

    toast({
      title: "Hallway Choices Saved",
      description: `You've selected ${selectedOptions.size} item(s). Progress updated.`,
    });
  };
  
  // Filter out carpet for hallways flooring if needed, or ensure generalFlooringOptions is appropriate
  const hallwaySpecificFlooringOptions = hallwayFlooringOptions.filter(opt => opt.id !== 'floor-carpet');


  const sections = [
    { title: "Wall Finish", description: "Choose finishes for your hallway walls.", options: hallwayWallFinishOptions, cols: 3 },
    { title: "Flooring", description: "Select durable and stylish flooring.", options: hallwaySpecificFlooringOptions, cols: 3 },
    { title: "Lighting", description: "Illuminate your hallways effectively.", options: hallwayLightingOptions, cols: 3 },
    { title: "Storage", description: "Consider storage solutions for hallways.", options: hallwayStorageOptions, cols: 3 },
  ];

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Hallway(s) Design
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Design welcoming and functional hallways and transitional spaces.
        </p>
      </header>

      <section className="max-w-7xl mx-auto space-y-12">
        {sections.map(section => (
          <Card key={section.title} className="bg-card/60 backdrop-blur-lg border border-card-foreground/10 shadow-lg">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              {section.description && <CardDescription>{section.description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${section.cols || 3} gap-6`}>
                {section.options.map((option) => (
                  <ItemSelectionCard
                    key={option.id}
                    item={option}
                    isSelected={selectedOptions.has(option.id)}
                    onSelect={handleOptionChange}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
            
        <div className="pt-4 flex justify-end">
          <Button className="w-full md:w-auto" onClick={handleSaveChanges}>
            Save Hallway Choices ({selectedOptions.size})
          </Button>
        </div>
      </section>
    </div>
  );
}

    