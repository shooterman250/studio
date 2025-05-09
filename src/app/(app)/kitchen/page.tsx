
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    overallStyleOptions as kitchenStyleOptions, // Reusing overall styles for kitchen style
    kitchenCabinetOptions,
    kitchenWorktopOptions,
    kitchenApplianceOptions,
    kitchenHardwareFinishOptions,
    kitchenSinkTypeOptions,
    kitchenBacksplashOptions,
    generalFlooringOptions as kitchenFlooringOptions, // Using general flooring for kitchen
    generalLightingOptions as kitchenLightingOptions // Using general lighting for kitchen
} from "@/types";
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";

export default function KitchenPage() {
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
    const newProgress = selectedOptions.size > 0 ? 25 : 0; // Simplified progress
    updateProgress("kitchen", newProgress);
    
    console.log("Selected kitchen options:", Array.from(selectedOptions));

    toast({
      title: "Kitchen Choices Saved",
      description: `You've selected ${selectedOptions.size} item(s) for the kitchen. Progress updated.`,
    });
  };

  const sections = [
    { title: "Kitchen Style", description: "Select the overall style for your kitchen.", options: kitchenStyleOptions, cols: 3 },
    { title: "Cabinets", description: "Choose your preferred cabinet style.", options: kitchenCabinetOptions, cols: 3 },
    { title: "Worktop/Countertop", description: "Select materials for your countertops.", options: kitchenWorktopOptions, cols: 3 },
    { title: "Appliances", description: "Choose appliance integration types.", options: kitchenApplianceOptions, cols: 3 },
    { title: "Appliance/Hardware Finish", description: "Select finishes for hardware and appliances.", options: kitchenHardwareFinishOptions, cols: 3 },
    { title: "Sink Type", description: "Choose your sink configuration.", options: kitchenSinkTypeOptions, cols: 3 },
    { title: "Backsplash", description: "Select backsplash materials.", options: kitchenBacksplashOptions, cols: 3 },
    { title: "Flooring", description: "Choose flooring for the kitchen.", options: kitchenFlooringOptions, cols: 3 },
    { title: "Lighting", description: "Select lighting fixtures.", options: kitchenLightingOptions, cols: 3 },
  ];

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Kitchen Customization
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Design your dream kitchen by selecting options for each category below. You can select multiple items.
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
            Save Kitchen Choices ({selectedOptions.size})
          </Button>
        </div>
      </section>
    </div>
  );
}

    