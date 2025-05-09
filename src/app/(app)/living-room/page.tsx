
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    generalWallFinishOptions as livingRoomWallFinishOptions,
    generalFlooringOptions as livingRoomFlooringOptions,
    generalLightingOptions as livingRoomLightingOptions,
    livingRoomStorageOptions,
    livingRoomFireplaceOptions,
    livingRoomOptionsList // For main furniture like sofas, if still applicable
} from "@/types"; 
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";

export default function LivingRoomPage() {
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
    updateProgress("living-room", newProgress);
    
    console.log("Selected living room options:", Array.from(selectedOptions));

    toast({
      title: "Living Room Choices Saved",
      description: `You've selected ${selectedOptions.size} item(s) for the living room. Progress updated.`,
    });
  };

  const sections = [
    { title: "Main Furniture", description: "Select core furniture pieces like sofas and chairs.", options: livingRoomOptionsList, cols: 3 }, // Existing generic furniture
    { title: "Wall Finish", description: "Choose finishes for your living room walls.", options: livingRoomWallFinishOptions, cols: 3 },
    { title: "Flooring", description: "Select flooring for the living room.", options: livingRoomFlooringOptions, cols: 3 },
    { title: "Lighting", description: "Select lighting fixtures.", options: livingRoomLightingOptions, cols: 3 },
    { title: "Storage", description: "Choose storage solutions.", options: livingRoomStorageOptions, cols: 3 },
    { title: "Fireplace", description: "Select a fireplace type.", options: livingRoomFireplaceOptions, cols: 3 },
  ];

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Living Room Customization
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Personalize your living space by choosing options for each element below.
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
            Save Living Room Choices ({selectedOptions.size})
          </Button>
        </div>
      </section>
    </div>
  );
}

    