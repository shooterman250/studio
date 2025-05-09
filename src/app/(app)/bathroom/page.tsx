
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    bathroomStyleOptions,
    bathroomMasterBathTubOptions,
    bathroomMasterShowerOptions,
    bathroomMasterSinkOptions,
    bathroomToiletOptions, // General toilet options
    bathroomHardwareFinishOptions, // General hardware
    bathroomStorageOptions, // General storage
    generalLightingOptions as bathroomLightingOptions, // General lighting
    bathroomHalfSinkOptions, // Specific for half-bath
    // Jack & Jill option could be a toggle or a separate set of options if needed
} from "@/types";
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
      description: `You've selected ${selectedOptions.size} item(s) for the bathroom(s). Progress updated.`,
    });
  };

  // Define sections for Master Bath and Half Bath
  const masterBathSections = [
    { title: "Master Bath: Style", options: bathroomStyleOptions, cols: 3 },
    { title: "Master Bath: Bath Tub", options: bathroomMasterBathTubOptions, cols: 3 },
    { title: "Master Bath: Shower", options: bathroomMasterShowerOptions, cols: 3 },
    { title: "Master Bath: Sink (Single/Double)", options: bathroomMasterSinkOptions, cols: 3 },
    { title: "Master Bath: Toilet", options: bathroomToiletOptions, cols: 3 },
    { title: "Master Bath: Hardware Finish", options: bathroomHardwareFinishOptions, cols: 3 },
    { title: "Master Bath: Storage", options: bathroomStorageOptions, cols: 3 },
    { title: "Master Bath: Lighting", options: bathroomLightingOptions, cols: 3 },
  ];

  const halfBathSections = [
    { title: "Half-Bath: Sink", options: bathroomHalfSinkOptions, cols: 3 },
    { title: "Half-Bath: Toilet", options: bathroomToiletOptions, cols: 3 }, // Using general toilet options
    { title: "Half-Bath: Hardware Finish", options: bathroomHardwareFinishOptions, cols: 3 }, // Using general hardware
    { title: "Half-Bath: Storage", options: bathroomStorageOptions.slice(0,3), cols: 3 }, // Example: subset of storage
    { title: "Half-Bath: Lighting", options: bathroomLightingOptions.slice(0,3), cols: 3 }, // Example: subset of lighting
  ];
  // TODO: Add Jack & Jill option if specified as a separate section or toggle

  return (
    <div className="min-h-full p-4 md:p-8 bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Bathroom(s) Customization
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg opacity-80 sm:text-xl">
          Design your master and half bathrooms by selecting your preferences.
        </p>
      </header>

      <section className="max-w-7xl mx-auto space-y-12">
        {/* Master Bath Sections */}
        <Card className="bg-card/60 backdrop-blur-lg border border-card-foreground/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Master Bathroom</CardTitle>
            <CardDescription>Configure your main bathroom space.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {masterBathSections.map(section => (
              <div key={section.title}>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">{section.title}</h3>
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
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Half Bath Sections */}
        <Card className="bg-card/60 backdrop-blur-lg border border-card-foreground/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Half-Bath (Powder Room)</CardTitle>
            <CardDescription>Configure your guest bathroom or powder room.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {halfBathSections.map(section => (
              <div key={section.title}>
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">{section.title}</h3>
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
              </div>
            ))}
          </CardContent>
        </Card>
        
        <div className="pt-4 flex justify-end">
          <Button className="w-full md:w-auto" onClick={handleSaveChanges}>
            Save Bathroom Choices ({selectedOptions.size})
          </Button>
        </div>
      </section>
    </div>
  );
}

    