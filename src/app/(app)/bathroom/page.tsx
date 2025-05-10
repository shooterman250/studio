
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    bathroomStyleOptions,
    bathroomMasterBathTubOptions,
    bathroomMasterShowerOptions,
    bathroomMasterSinkOptions,
    bathroomToiletOptions, 
    bathroomHardwareFinishOptions, 
    bathroomStorageOptions, 
    generalLightingOptions as bathroomLightingOptions, 
    bathroomHalfSinkOptions, 
    type BaseSelectionItem
} from "@/types";
import ItemSelectionCard from "@/components/design/ItemSelectionCard";
import { useDesignProgress, type SelectedDataItem } from "@/contexts/DesignProgressContext";
import { useToast } from "@/hooks/use-toast";
import { useRouter, usePathname } from "next/navigation";
import { baseNavItemsConfig } from "@/config/navigation";
import { ArrowRight } from "lucide-react";

export default function BathroomPage() {
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());
  const [hasSavedSinceLastChange, setHasSavedSinceLastChange] = useState(false);
  const { updateStageSelections } = useDesignProgress();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

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
    setHasSavedSinceLastChange(false);
  };
  
  const masterBathSections: Array<{ title: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Master Bath: Style", options: bathroomStyleOptions, cols: 3 },
    { title: "Master Bath: Bath Tub", options: bathroomMasterBathTubOptions, cols: 3 },
    { title: "Master Bath: Shower", options: bathroomMasterShowerOptions, cols: 3 },
    { title: "Master Bath: Sink (Single/Double)", options: bathroomMasterSinkOptions, cols: 3 },
    { title: "Master Bath: Toilet", options: bathroomToiletOptions, cols: 3 },
    { title: "Master Bath: Hardware Finish", options: bathroomHardwareFinishOptions, cols: 3 },
    { title: "Master Bath: Storage", options: bathroomStorageOptions, cols: 3 },
    { title: "Master Bath: Lighting", options: bathroomLightingOptions, cols: 3 },
  ];

  const halfBathSections: Array<{ title: string; options: BaseSelectionItem[]; cols?: number }> = [
    { title: "Half-Bath: Sink", options: bathroomHalfSinkOptions, cols: 3 },
    { title: "Half-Bath: Toilet", options: bathroomToiletOptions, cols: 3 }, 
    { title: "Half-Bath: Hardware Finish", options: bathroomHardwareFinishOptions, cols: 3 }, 
    { title: "Half-Bath: Storage", options: bathroomStorageOptions.slice(0,3), cols: 3 }, 
    { title: "Half-Bath: Lighting", options: bathroomLightingOptions.slice(0,3), cols: 3 }, 
  ];

  const allPageSections = [...masterBathSections, ...halfBathSections];

  const handleSaveChanges = () => {
    const totalOptionsOnPage = allPageSections.reduce((sum, section) => sum + section.options.length, 0);
    const newProgress = selectedOptions.size > 0 ? Math.min(100, Math.round((selectedOptions.size / totalOptionsOnPage) * 100)) : 0;
    
    const allSelectedItems: SelectedDataItem[] = [];
    allPageSections.forEach(section => {
      section.options.forEach(option => {
        if (selectedOptions.has(option.id)) {
          allSelectedItems.push({
            id: option.id,
            name: option.name,
            imageUrl: option.imageUrl,
            description: option.description,
            dataAiHint: option.dataAiHint || option.name.toLowerCase().replace(/[^a-z0-9\s]/gi, '').split(' ').slice(0,2).join(' ')
          });
        }
      });
    });
    
    updateStageSelections("bathroom", newProgress, allSelectedItems);
    setHasSavedSinceLastChange(true);
    
    toast({
      title: "Bathroom Choices Saved",
      description: `You've selected ${allSelectedItems.length} item(s) for the bathroom(s). Progress updated to ${newProgress}%.`,
    });
  };

  const designStagesNavConfig = baseNavItemsConfig.filter(item => item.id !== 'dashboard' && item.id !== 'settings');
  const currentIndex = designStagesNavConfig.findIndex(item => item.href === pathname);
  const nextStage = currentIndex !== -1 && currentIndex < designStagesNavConfig.length - 1 ? designStagesNavConfig[currentIndex + 1] : null;

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
        
        <div className="pt-4 flex flex-col sm:flex-row justify-end gap-2">
          <Button className="w-full sm:w-auto" onClick={handleSaveChanges}>
            Save Bathroom Choices ({selectedOptions.size})
          </Button>
          {nextStage && (
            <Button
              onClick={() => router.push(nextStage.href)}
              variant="outline"
              className="w-full sm:w-auto"
              disabled={!hasSavedSinceLastChange}
            >
              Next Section ({nextStage.label})
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
